-- Dieser Trigger sendet jeden neuen Lead automatisch an die 'send-push-notification' Edge Function.

-- 1. Helper Function fuer den Webhook (falls nicht schon via UI angelegt)
create or replace function public.handle_new_lead_push()
returns trigger
language plpgsql
security definer
as $$
declare
  payload jsonb;
begin
  payload := jsonb_build_object(
    'record', row_to_json(NEW),
    'table', 'leads',
    'type', 'INSERT'
  );

  -- Hier rufen wir die Edge Function auf.
  -- HINWEIS: Du musst den URL-Platzhalter durch deine tatsächliche Function URL ersetzen
  -- oder den Webhook einfach über das Supabase Dashboard (Database -> Webhooks) anlegen.
  
  perform
    net.http_post(
      url := 'https://[YOUR_PROJECT_REF].supabase.co/functions/v1/send-push-notification',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer [YOUR_SERVICE_ROLE_KEY]'
      ),
      body := payload
    );

  return NEW;
end;
$$;

-- 2. Der eigentliche Trigger
drop trigger if exists on_new_lead_created on public.leads;
create trigger on_new_lead_created
  after insert on public.leads
  for each row
  execute function public.handle_new_lead_push();

-- WICHTIG: Die 'net' Extension muss aktiviert sein.
-- CREATE EXTENSION IF NOT EXISTS "net";
