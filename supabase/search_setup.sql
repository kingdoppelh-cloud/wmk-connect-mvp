-- Enable Full-Text Search for WMK Connect

-- 1. Updates for Companies Table
ALTER TABLE public.companies 
ADD COLUMN IF NOT EXISTS fts tsvector GENERATED ALWAYS AS (
  to_tsvector('german', coalesce(name, '') || ' ' || coalesce(category, '') || ' ' || coalesce(description, ''))
) STORED;

CREATE INDEX IF NOT EXISTS companies_fts_idx ON public.companies USING GIN (fts);

-- 2. Updates for Jobs Table
ALTER TABLE public.jobs 
ADD COLUMN IF NOT EXISTS fts tsvector GENERATED ALWAYS AS (
  to_tsvector('german', coalesce(title, '') || ' ' || coalesce(category, '') || ' ' || coalesce(description, ''))
) STORED;

CREATE INDEX IF NOT EXISTS jobs_fts_idx ON public.jobs USING GIN (fts);

-- 3. Search RSS/Function helper (Optional but good for scalability)
-- This allows calling a single search function if needed.
-- For now, we use standard Supabase '.search()' or filter 'fts' column.
