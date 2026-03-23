-- 1. Create Analytics Events Table
CREATE TABLE IF NOT EXISTS public.analytics_events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    event_type TEXT NOT NULL,
    company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Indexes for Performance
CREATE INDEX IF NOT EXISTS idx_analytics_events_company_id ON public.analytics_events(company_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_type ON public.analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON public.analytics_events(created_at);

-- 3. RLS
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can insert analytics_events" ON public.analytics_events;
CREATE POLICY "Public can insert analytics_events" ON public.analytics_events
    FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Companies can view own analytics_events" ON public.analytics_events;
CREATE POLICY "Companies can view own analytics_events" ON public.analytics_events
    FOR SELECT USING (true); -- For now simplified, in prod check company ownership

-- 4. Merchant Intelligence RPC
CREATE OR REPLACE FUNCTION get_merchant_intelligence(
    target_company_id UUID,
    days_back INTEGER DEFAULT 7
)
RETURNS JSONB AS $$
DECLARE
    result JSONB;
    weekly_views JSONB;
    top_jobs JSONB;
    engagement_stats JSONB;
BEGIN
    -- Get daily profile views for the chart
    SELECT jsonb_agg(d) INTO weekly_views
    FROM (
        SELECT 
            TO_CHAR(date_series, 'DD.MM') as date,
            COALESCE(count(ae.id), 0) as views
        FROM GENERATE_SERIES(NOW() - (days_back || ' days')::INTERVAL, NOW(), '1 day') AS date_series
        LEFT JOIN analytics_events ae ON ae.created_at::DATE = date_series::DATE 
            AND ae.company_id = target_company_id 
            AND ae.event_type = 'profile_view'
        GROUP BY date_series
        ORDER BY date_series ASC
    ) d;

    -- Get top 3 jobs by views
    SELECT jsonb_agg(j) INTO top_jobs
    FROM (
        SELECT 
            ae.metadata->>'job_title' as title,
            COUNT(*) as views
        FROM analytics_events ae
        WHERE ae.company_id = target_company_id 
          AND ae.event_type = 'job_view'
          AND ae.metadata->>'job_title' IS NOT NULL
        GROUP BY ae.metadata->>'job_title'
        ORDER BY views DESC
        LIMIT 3
    ) j;

    -- Engagement totals
    SELECT jsonb_build_object(
        'calls', COUNT(*) FILTER (WHERE event_type = 'call_click'),
        'web_clicks', COUNT(*) FILTER (WHERE event_type = 'website_click'),
        'wa_clicks', COUNT(*) FILTER (WHERE event_type = 'whatsapp_click')
    ) INTO engagement_stats
    FROM analytics_events
    WHERE company_id = target_company_id;

    result := jsonb_build_object(
        'weekly_views', weekly_views,
        'top_jobs', top_jobs,
        'engagement', engagement_stats
    );

    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
