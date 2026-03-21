-- Add is_featured column to jobs table
ALTER TABLE public.jobs ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;

-- Policy update (optional but good for clarity)
-- The existing "Authenticated users can manage jobs" policy already covers ALL actions.
