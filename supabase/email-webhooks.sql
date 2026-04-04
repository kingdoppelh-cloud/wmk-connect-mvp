-- WMK Connect: Finalized Automation SQL for Noble Emails
-- Run these in your Supabase SQL Editor

-- 1. Infrastructure Setup
CREATE EXTENSION IF NOT EXISTS "http" WITH SCHEMA "extensions";

-- Create matches table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  candidate_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(candidate_id, company_id)
);

-- 2. Welcome Email Trigger Function
CREATE OR REPLACE FUNCTION public.handle_new_user_welcome()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM
    net.http_post(
      url := 'https://ednlbgioxlndddlofenu.supabase.co/functions/v1/send-templated-email',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkbmxiZ2lveGxuZGRkbG9mZW51Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDA0MDc5MSwiZXhwIjoyMDg5NjE2NzkxfQ.5VOuOFMSdASeUvyxvYpvKEnZFbJVCG1i9KC_DhMFKYM'
      ),
      body := jsonb_build_object(
        'to', NEW.email,
        'templateId', 'welcome',
        'subject', 'Willkommen bei WMK Connect!',
        'context', jsonb_build_object(
          'user_name', COALESCE(NEW.full_name, 'Handwerker')
        )
      )
    );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Match Success Notification Function
CREATE OR REPLACE FUNCTION public.handle_new_match_notification()
RETURNS TRIGGER AS $$
DECLARE
  candidate_email text;
  candidate_name text;
  comp_name text;
BEGIN
  -- Fetch candidate details from profiles
  SELECT email, full_name INTO candidate_email, candidate_name FROM profiles WHERE id = NEW.candidate_id;
  -- Fetch company name from companies
  SELECT name INTO comp_name FROM companies WHERE id = NEW.company_id;

  IF candidate_email IS NOT NULL THEN
    PERFORM
      net.http_post(
        url := 'https://ednlbgioxlndddlofenu.supabase.co/functions/v1/send-templated-email',
        headers := jsonb_build_object(
          'Content-Type', 'application/json',
          'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkbmxiZ2lveGxuZGRkbG9mZW51Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDA0MDc5MSwiZXhwIjoyMDg5NjE2NzkxfQ.5VOuOFMSdASeUvyxvYpvKEnZFbJVCG1i9KC_DhMFKYM'
        ),
        body := jsonb_build_object(
          'to', candidate_email,
          'templateId', 'match',
          'subject', 'Du hast ein neues Match!',
          'context', jsonb_build_object(
            'user_name', COALESCE(candidate_name, 'Handwerker'),
            'company_name', COALESCE(comp_name, 'WMK Partner'),
            'user_image_url', 'https://wmk-connect-mvp.vercel.app/logo-red.png'
          )
        )
      );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. Activate Triggers
DROP TRIGGER IF EXISTS on_auth_user_created ON public.profiles;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION handle_new_user_welcome();

DROP TRIGGER IF EXISTS on_match_success ON public.matches;
CREATE TRIGGER on_match_success
  AFTER INSERT ON public.matches
  FOR EACH ROW EXECUTE FUNCTION handle_new_match_notification();
