-- Create jobs table
CREATE TABLE IF NOT EXISTS public.jobs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    salary_range TEXT,
    job_type TEXT DEFAULT 'Vollzeit', -- Vollzeit, Teilzeit, Minijob
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    is_active BOOLEAN DEFAULT true
);

-- Enable RLS
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view active jobs
CREATE POLICY "Anyone can view active jobs" ON public.jobs
    FOR SELECT USING (is_active = true);

-- Policy: Company owners can manage their own jobs
-- (We use the same logic as companies table, but jobs are linked via company_id)
-- Note: In a real app, we'd check against auth.uid() and a profiles/members table.
-- For now, we allow authenticated users to insert/update (simplification for MVP dashboard)
CREATE POLICY "Authenticated users can manage jobs" ON public.jobs
    FOR ALL USING (auth.role() = 'authenticated');
