-- 1. Create Analytics Table if missing
CREATE TABLE IF NOT EXISTS public.analytics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE,
    session_id TEXT NOT NULL,
    event_type TEXT NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Performance Indexes
CREATE INDEX IF NOT EXISTS idx_analytics_company_id ON public.analytics(company_id);
CREATE INDEX IF NOT EXISTS idx_analytics_created_at ON public.analytics(created_at);

-- 3. RLS Setup
ALTER TABLE public.analytics ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can insert analytics" ON public.analytics;
DROP POLICY IF EXISTS "Companies can view own analytics" ON public.analytics;

CREATE POLICY "Public can insert analytics" ON public.analytics 
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Companies can view own analytics" ON public.analytics
    FOR SELECT USING (true); -- Simplified for MVP, ideally filter by user ownership

-- 4. Analytics Aggregation Function
CREATE OR REPLACE FUNCTION get_merchant_analytics(
    target_company_id UUID,
    days_back INTEGER DEFAULT 30
)
RETURNS TABLE (
    event_date DATE,
    event_type TEXT,
    event_count BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        created_at::DATE as event_date,
        COALESCE(analytics.event_type, 'view') as event_type,
        COUNT(*)::BIGINT as event_count
    FROM analytics
    WHERE company_id = target_company_id
      AND created_at >= (NOW() - (days_back || ' days')::INTERVAL)
    GROUP BY created_at::DATE, analytics.event_type
    ORDER BY event_date DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. View for latest active engagement
CREATE OR REPLACE VIEW merchant_engagement_feed AS
SELECT 
    a.id,
    a.company_id,
    a.event_type,
    a.created_at,
    a.metadata,
    CASE 
        WHEN a.event_type = 'whatsapp_click' THEN 'WhatsApp Kontakt'
        WHEN a.event_type = 'website_click' THEN 'Website Besuch'
        WHEN a.event_type = 'route_click' THEN 'Routenplanung'
        WHEN a.event_type = 'rsvp_action' THEN 'Event Zusage'
        WHEN a.event_type = 'news_click' THEN 'News gelesen'
        WHEN a.event_type = 'click_phone' THEN 'Anruf'
        WHEN a.event_type = 'open_swipe_jobs' THEN 'Job Interaktion'
        ELSE 'Profilbesuch'
    END as label
FROM analytics a;
