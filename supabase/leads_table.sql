-- Supabase SQL: Erstellt die Tabelle für eingehende Kunden-Leads (Firma eintragen / Profil übernehmen)

create table if not exists public.leads (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  company_name text not null,
  contact_name text not null,
  email text not null,
  phone text,
  message text,
  lead_type text not null default 'new_entry', -- 'new_entry' oder 'claim_profile'
  claimed_company_id uuid references public.companies(id) on delete set null,
  status text not null default 'new' -- 'new', 'contacted', 'won', 'lost'
);

-- RLS aktivieren
alter table public.leads enable row level security;

-- Policy: Jeder (auch anonyme Nutzer) darf ein Lead-Formular absenden
create policy "Anyone can insert leads" 
  on public.leads 
  for insert 
  with check (true);

-- Policy: Nur authentifizierte Admins dürfen Leads lesen/bearbeiten
create policy "Admins can view and edit leads" 
  on public.leads 
  for all 
  using ( auth.role() = 'authenticated' )
  with check ( auth.role() = 'authenticated' );
