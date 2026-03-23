-- 1. Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. Add embedding columns
ALTER TABLE public.jobs ADD COLUMN IF NOT EXISTS embedding vector(1536);
ALTER TABLE public.companies ADD COLUMN IF NOT EXISTS embedding vector(1536);

-- 3. Create HNSW indexes for better performance
CREATE INDEX IF NOT EXISTS jobs_embedding_idx ON public.jobs 
USING hnsw (embedding vector_cosine_ops);

CREATE INDEX IF NOT EXISTS companies_embedding_idx ON public.companies 
USING hnsw (embedding vector_cosine_ops);

-- 4. RPC function for matching jobs
CREATE OR REPLACE FUNCTION match_jobs(
  query_embedding vector(1536),
  match_threshold float,
  match_count int
)
RETURNS TABLE (
  id UUID,
  company_id UUID,
  title TEXT,
  description TEXT,
  similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    jobs.id,
    jobs.company_id,
    jobs.title,
    jobs.description,
    1 - (jobs.embedding <=> query_embedding) AS similarity
  FROM jobs
  WHERE 1 - (jobs.embedding <=> query_embedding) > match_threshold
  ORDER BY jobs.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

-- 5. RPC function for matching companies
CREATE OR REPLACE FUNCTION match_companies(
  query_embedding vector(1536),
  match_threshold float,
  match_count int
)
RETURNS TABLE (
  id UUID,
  name TEXT,
  description TEXT,
  similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    companies.id,
    companies.name,
    companies.description,
    1 - (companies.embedding <=> query_embedding) AS similarity
  FROM companies
  WHERE 1 - (companies.embedding <=> query_embedding) > match_threshold
  ORDER BY companies.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;
