-- WMK Connect Master Showcase Setup (V1.3 FIXED - Standalone)
-- Provides a full-featured company profile for demonstration

-- 1. Ensure required tables exist
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

CREATE TABLE IF NOT EXISTS public.analytics_events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE,
    event_type TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

DO $$
DECLARE
    schwan_id UUID := '11111111-1111-1111-1111-111111111111';
BEGIN
    -- 1. Ensure company exists with FULL profile
    INSERT INTO public.companies (
        id, name, category, description, website_url, phone, whatsapp, 
        coordinates, is_premium, address, image, gallery, email
    ) VALUES (
        schwan_id,
        'Gasthaus zum Schwan',
        'Gastronomie',
        'Tradition trifft Moderne. Genießen Sie regionale Köstlichkeiten in unserem historischen Gasthaus am Marktplatz. Seit über 100 Jahren die erste Adresse für Gastlichkeit im WMK.',
        'https://gasthaus-schwan.de',
        '+4917612345678',
        '4917612345678',
        ARRAY[51.2692, 9.9806],
        true,
        'Marktplatz 5, 37242 Bad Sooden-Allendorf',
        'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=1000',
        ARRAY[
            'https://images.unsplash.com/photo-1550966842-1e96195c659e?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800'
        ],
        'admin@gasthaus-schwan.de'
    ) ON CONFLICT (id) DO UPDATE SET
        is_premium = true,
        gallery = EXCLUDED.gallery,
        whatsapp = EXCLUDED.whatsapp,
        description = EXCLUDED.description;

    -- 2. Add multiple JOBS for swiping potential
    DELETE FROM public.jobs WHERE company_id = schwan_id; -- Cleanup old ones

    INSERT INTO public.jobs (company_id, title, category, description, salary_range, job_type, is_active, image_url)
    VALUES 
    (schwan_id, 'Oberkellner / Service-Chef (m/w/d)', 'Gastronomie', 'Führen Sie unser Serviceteam und begeistern Sie unsere Gäste mit Charme und Professionalität.', '3.200€ - 4.500€', 'Vollzeit', true, 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800'),
    (schwan_id, 'Jungkoch (m/w/d)', 'Gastronomie', 'Unterstütze unser Küchenteam bei der Zubereitung regionaler Spezialitäten.', '2.800€ - 3.400€', 'Vollzeit', true, 'https://images.unsplash.com/photo-1512485694743-9c9538b4e6e0?auto=format&fit=crop&q=80&w=800'),
    (schwan_id, 'Aushilfe Service (Wochenende)', 'Gastronomie', 'Perfekt für Studenten! Unterstütze uns in den Stoßzeiten am Wochenende.', '15€ / Std.', 'Minijob', true, 'https://images.unsplash.com/photo-1550966842-1e96195c659e?auto=format&fit=crop&q=80&w=800');

    -- 3. Simulate some Analytics Data
    INSERT INTO public.analytics_events (company_id, event_type)
    SELECT schwan_id, 'profile_view' FROM generate_series(1, 42);
    
    INSERT INTO public.analytics_events (company_id, event_type)
    SELECT schwan_id, 'click_whatsapp' FROM generate_series(1, 12);

END $$;
