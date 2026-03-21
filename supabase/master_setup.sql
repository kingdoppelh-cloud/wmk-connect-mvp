-- 1. Create Jobs Table if missing
CREATE TABLE IF NOT EXISTS public.jobs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    salary_range TEXT,
    job_type TEXT DEFAULT 'Vollzeit',
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    is_active BOOLEAN DEFAULT true
);

-- 2. Ensure RLS is active
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

-- 3. Delete existing policies to avoid conflicts
DROP POLICY IF EXISTS "Anyone can view active jobs" ON public.jobs;
DROP POLICY IF EXISTS "Authenticated users can manage jobs" ON public.jobs;

-- 4. Create Policies
CREATE POLICY "Anyone can view active jobs" ON public.jobs FOR SELECT USING (is_active = true);
CREATE POLICY "Authenticated users can manage jobs" ON public.jobs FOR ALL USING (auth.role() = 'authenticated');

-- 5. Seed missing companies (with stable UUIDs)
INSERT INTO public.companies (id, name, category, description, website_url, phone, whatsapp, coordinates, is_premium, address, image)
VALUES 
('22222222-2222-2222-2222-222222222222', 'Friseur Schnittpunkt', 'Friseure', 'Ihr Experte für moderne Haarschnitte und Farben.', 'https://schnittpunkt-bsa.de', '+4956521234', '4956521234', '[51.2715, 9.9825]', false, 'Werrastraße 10, 37242 Bad Sooden-Allendorf', 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=1000'),
('33333333-3333-3333-3333-333333333333', 'Elektro Meyer', 'Handwerk', 'Elektroinstallationen und Reparaturen aller Art.', 'https://elektro-meyer.de', '+4956529988', '4956529988', '[51.2730, 9.9850]', true, 'Industriestraße 5, 37242 Bad Sooden-Allendorf', 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000'),
('44444444-4444-4444-4444-444444444444', 'Cafe am Markt', 'Gastronomie', 'Frischer Kuchen und Kaffeespezialitäten.', 'https://cafe-am-markt.de', '+4956524455', '4956524455', '[51.2718, 9.9820]', false, 'Marktplatz 1, 37242 Bad Sooden-Allendorf', 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=1000')
ON CONFLICT (id) DO NOTHING;

-- 6. Seed a sample job (linked to Gasthaus zum Schwan - assuming ID 1 exists or using Name link if we had a function)
-- Since we don't know the exact UUID of 'Gasthaus zum Schwan' in your DB, we'll try to find it.
DO $$
DECLARE
    schwan_id UUID;
BEGIN
    SELECT id INTO schwan_id FROM public.companies WHERE name = 'Gasthaus zum Schwan' LIMIT 1;
    IF schwan_id IS NOT NULL THEN
        INSERT INTO public.jobs (company_id, title, category, description, salary_range, job_type, is_active)
        VALUES (schwan_id, 'Servicemitarbeiter (m/w/d)', 'Gastronomie', 'Wir suchen Unterstützung für unser Team! Erfahrung erwünscht, aber kein Muss.', '2.500€ - 3.200€', 'Vollzeit', true)
        ON CONFLICT DO NOTHING;
    END IF;
END $$;
