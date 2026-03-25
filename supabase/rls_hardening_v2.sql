-- WMK Connect RLS Hardening Script V2 (Robust Version)
-- This script ensures all data is protected and only manageable by owners

-- 0. Ensure tables exist before applying RLS
CREATE TABLE IF NOT EXISTS public.companies (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT,
    description TEXT,
    website_url TEXT,
    phone TEXT,
    whatsapp TEXT,
    email TEXT,
    image TEXT,
    is_premium BOOLEAN DEFAULT false,
    coordinates JSONB,
    address TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.jobs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    salary_range TEXT,
    job_type TEXT DEFAULT 'Vollzeit',
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    is_active BOOLEAN DEFAULT true
);

CREATE TABLE IF NOT EXISTS public.events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    event_date TIMESTAMPTZ NOT NULL,
    location_override TEXT,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.news_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    image_url TEXT,
    type TEXT DEFAULT 'news',
    created_at TIMESTAMPTZ DEFAULT now(),
    expires_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS public.analytics_events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    event_type TEXT NOT NULL,
    company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id TEXT, -- References auth.uid()::text or similar
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    data JSONB DEFAULT '{}'::jsonb,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 1. Companies Table Hardening
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='companies' AND column_name='owner_id') THEN
        ALTER TABLE public.companies ADD COLUMN owner_id UUID REFERENCES auth.users(id);
    END IF;
END $$;

ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;

-- Drop generic policies if they exist
DROP POLICY IF EXISTS "Public Read Access" ON public.companies;
DROP POLICY IF EXISTS "Admin Insert Access" ON public.companies;
DROP POLICY IF EXISTS "Admin Update Access" ON public.companies;
DROP POLICY IF EXISTS "Admin Delete Access" ON public.companies;
DROP POLICY IF EXISTS "Enable all for anyone" ON public.companies;

CREATE POLICY "Public Read Access" ON public.companies FOR SELECT USING (true);
CREATE POLICY "Owners can update their own company" ON public.companies FOR UPDATE USING (auth.uid() = owner_id);
CREATE POLICY "System can insert companies" ON public.companies FOR INSERT WITH CHECK (auth.uid() = owner_id OR auth.role() = 'service_role');

-- 2. Jobs Table Hardening
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can view active jobs" ON public.jobs;
DROP POLICY IF EXISTS "Authenticated users can manage jobs" ON public.jobs;
DROP POLICY IF EXISTS "Owners can manage their jobs" ON public.jobs;

CREATE POLICY "Anyone can view active jobs" ON public.jobs FOR SELECT USING (is_active = true);
CREATE POLICY "Owners can manage their jobs" ON public.jobs FOR ALL 
    USING (company_id IN (SELECT id FROM public.companies WHERE owner_id = auth.uid()))
    WITH CHECK (company_id IN (SELECT id FROM public.companies WHERE owner_id = auth.uid()));

-- 3. Events Table Hardening
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can view events" ON public.events;
DROP POLICY IF EXISTS "Owners can manage their events" ON public.events;

CREATE POLICY "Anyone can view events" ON public.events FOR SELECT USING (true);
CREATE POLICY "Owners can manage their events" ON public.events FOR ALL 
    USING (company_id IN (SELECT id FROM public.companies WHERE owner_id = auth.uid()))
    WITH CHECK (company_id IN (SELECT id FROM public.companies WHERE owner_id = auth.uid()));

-- 4. News Posts Table Hardening
ALTER TABLE public.news_posts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can read news posts" ON public.news_posts;
DROP POLICY IF EXISTS "Users can manage their own news posts" ON public.news_posts;
DROP POLICY IF EXISTS "Owners can manage their news posts" ON public.news_posts;

CREATE POLICY "Anyone can read news posts" ON public.news_posts FOR SELECT USING (true);
CREATE POLICY "Owners can manage their news posts" ON public.news_posts FOR ALL 
    USING (company_id IN (SELECT id FROM public.companies WHERE owner_id = auth.uid()))
    WITH CHECK (company_id IN (SELECT id FROM public.companies WHERE owner_id = auth.uid()));

-- 5. Analytics Events Hardening (Sensitive)
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Service role can do all" ON public.analytics_events;
DROP POLICY IF EXISTS "Owners can view their analytics" ON public.analytics_events;
DROP POLICY IF EXISTS "Public can insert analytics" ON public.analytics_events;

CREATE POLICY "Owners can view their analytics" ON public.analytics_events FOR SELECT 
    USING (company_id IN (SELECT id FROM public.companies WHERE owner_id = auth.uid()));

CREATE POLICY "Public can insert analytics" ON public.analytics_events FOR INSERT 
    WITH CHECK (true); -- Allow anonymous tracking of views/clicks

-- 6. Notifications cleanup (ensure RLS)
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view their own notifications" ON public.notifications;
CREATE POLICY "Users can view their own notifications" ON public.notifications FOR SELECT 
    USING (user_id = auth.uid()::text OR user_id IS NULL);
