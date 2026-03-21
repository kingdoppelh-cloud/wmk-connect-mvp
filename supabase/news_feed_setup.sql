-- Create news_posts table
CREATE TABLE IF NOT EXISTS public.news_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    image_url TEXT,
    type TEXT DEFAULT 'news' CHECK (type IN ('news', 'offer', 'event', 'special')),
    created_at TIMESTAMPTZ DEFAULT now(),
    expires_at TIMESTAMPTZ
);

-- Enable RLS
ALTER TABLE public.news_posts ENABLE ROW LEVEL SECURITY;

-- Policies
-- Anyone can read active posts
CREATE POLICY "Anyone can read news posts" 
ON public.news_posts FOR SELECT 
USING (true);

-- Only authenticated users matching the company can insert/update/delete
CREATE POLICY "Users can manage their own news posts" 
ON public.news_posts FOR ALL
TO authenticated
USING (
    company_id IN (
        SELECT id FROM public.companies WHERE email = auth.jwt()->>'email'
    )
)
WITH CHECK (
    company_id IN (
        SELECT id FROM public.companies WHERE email = auth.jwt()->>'email'
    )
);

-- Index for performance
CREATE INDEX IF NOT EXISTS idx_news_posts_company_id ON public.news_posts(company_id);
CREATE INDEX IF NOT EXISTS idx_news_posts_created_at ON public.news_posts(created_at DESC);
