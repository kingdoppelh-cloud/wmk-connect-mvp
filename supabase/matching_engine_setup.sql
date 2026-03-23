-- AI Matching Engine Setup (Version 1.3)

-- 0. Prep Jobs Table
ALTER TABLE public.jobs ADD COLUMN IF NOT EXISTS embedding vector(768);

-- 1. Create Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    full_name TEXT,
    bio TEXT,
    skills TEXT[] DEFAULT '{}',
    user_type TEXT CHECK (user_type IN ('handyman', 'company')) DEFAULT 'handyman',
    embedding vector(768),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 3. RLS Policies
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles 
    FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- 4. Trigger to update updated_at
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

-- 5. Trigger for automatic Profile Embeddings
CREATE OR REPLACE FUNCTION handle_profile_embedding()
RETURNS TRIGGER AS $$
DECLARE
    content_to_vector TEXT;
BEGIN
    -- Combine bio and skills for embedding
    content_to_vector := COALESCE(NEW.bio, '') || ' ' || array_to_string(NEW.skills, ' ');
    
    IF content_to_vector IS NOT NULL AND content_to_vector != ' ' THEN
        NEW.embedding := public.generate_embedding(content_to_vector);
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tr_index_profile_embeddings ON public.profiles;
CREATE TRIGGER tr_index_profile_embeddings
    BEFORE INSERT OR UPDATE OF bio, skills ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION handle_profile_embedding();

-- 6. RPC: Match Jobs to a specific User Profile
CREATE OR REPLACE FUNCTION match_jobs_to_profile(
    target_user_id UUID,
    match_threshold FLOAT DEFAULT 0.3,
    match_count INT DEFAULT 5
)
RETURNS TABLE (
    id UUID,
    company_id UUID,
    title TEXT,
    category TEXT,
    description TEXT,
    salary_range TEXT,
    job_type TEXT,
    image_url TEXT,
    similarity FLOAT
) AS $$
DECLARE
    user_embedding vector(768);
BEGIN
    -- Get the user's profile embedding
    SELECT embedding INTO user_embedding FROM public.profiles WHERE user_id = target_user_id;

    IF user_embedding IS NULL THEN
        RETURN;
    END IF;

    RETURN QUERY
    SELECT
        j.id,
        j.company_id,
        j.title,
        j.category,
        j.description,
        j.salary_range,
        j.job_type,
        j.image_url,
        1 - (j.embedding <=> user_embedding) AS similarity
    FROM public.jobs j
    WHERE 1 - (j.embedding <=> user_embedding) > match_threshold
        AND j.is_active = true
    ORDER BY similarity DESC
    LIMIT match_count;
END;
$$ LANGUAGE plpgsql STABLE;

-- 7. RPC: Match Profiles to a specific Job (for Companies)
CREATE OR REPLACE FUNCTION match_profiles_to_job(
    target_job_id UUID,
    match_threshold FLOAT DEFAULT 0.3,
    match_count INT DEFAULT 5
)
RETURNS TABLE (
    id UUID,
    user_id UUID,
    full_name TEXT,
    bio TEXT,
    skills TEXT[],
    similarity FLOAT
) AS $$
DECLARE
    job_embedding vector(768);
BEGIN
    -- Get the job's embedding
    SELECT embedding INTO job_embedding FROM public.jobs WHERE id = target_job_id;

    IF job_embedding IS NULL THEN
        RETURN;
    END IF;

    RETURN QUERY
    SELECT
        p.id,
        p.user_id,
        p.full_name,
        p.bio,
        p.skills,
        1 - (p.embedding <=> job_embedding) AS similarity
    FROM public.profiles p
    WHERE 1 - (p.embedding <=> job_embedding) > match_threshold
        AND p.user_type = 'handyman'
    ORDER BY similarity DESC
    LIMIT match_count;
END;
$$ LANGUAGE plpgsql STABLE;

-- 8. Trigger for automatic Job Embeddings
CREATE OR REPLACE FUNCTION handle_job_embedding()
RETURNS TRIGGER AS $$
DECLARE
    content_to_vector TEXT;
BEGIN
    -- Combine title and description for embedding
    content_to_vector := NEW.title || ' ' || NEW.description;
    
    IF content_to_vector IS NOT NULL THEN
        NEW.embedding := public.generate_embedding(content_to_vector);
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tr_index_job_embeddings ON public.jobs;
CREATE TRIGGER tr_index_job_embeddings
    BEFORE INSERT OR UPDATE OF title, description ON public.jobs
    FOR EACH ROW EXECUTE FUNCTION handle_job_embedding();

-- 9. Auto-create Profile on Signup Trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (user_id, full_name, user_type)
    VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', 'handyman');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger should be on auth.users (requires superuser or specific setup, 
-- but usually handled via Supabase Dashboard settings or SQL)
-- Note: Creating trigger on auth schema usually needs caution.
-- DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
-- CREATE TRIGGER on_auth_user_created
--   AFTER INSERT ON auth.users
--   FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
