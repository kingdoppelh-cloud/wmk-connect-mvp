-- 1. Admins-Tabelle anlegen
CREATE TABLE IF NOT EXISTS admins (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

-- RLS für admins
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admins can read own row" ON admins
  FOR SELECT USING (auth.uid() = user_id);

-- 2. Companies Policies
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read companies" ON companies
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Admins write companies" ON companies
  FOR ALL TO authenticated USING (
    EXISTS (SELECT 1 FROM admins WHERE user_id = auth.uid())
    OR (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
  );

-- 3. Jobs Policies
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read jobs" ON jobs
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Owner writes own jobs" ON jobs
  FOR ALL TO authenticated USING (
    -- Entweder Admin
    EXISTS (SELECT 1 FROM admins WHERE user_id = auth.uid())
    OR (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
    -- Oder Besitzer der Firma (falls owner_id existiert)
    -- OR company_id IN (SELECT id FROM companies WHERE owner_id = auth.uid())
  );
