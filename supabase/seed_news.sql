-- Seed News Posts for "Gasthaus zum Schwan"
-- First, get the ID of Gasthaus zum Schwan
DO $$
DECLARE
    company_id UUID;
BEGIN
    SELECT id INTO company_id FROM public.companies WHERE name = 'Gasthaus zum Schwan' LIMIT 1;

    IF company_id IS NOT NULL THEN
        -- Delete existing to avoid duplicates if re-run
        DELETE FROM public.news_posts WHERE company_id = company_id;

        -- Insert fresh posts
        INSERT INTO public.news_posts (company_id, content, type, created_at)
        VALUES 
            (company_id, 'Frühlingserwachen im Schwan! 🌸 Ab sofort servieren wir frischen Spargel aus der Region mit hausgemachter Sauce Hollandaise. Kommt vorbei!', 'offer', now() - interval '2 hours'),
            (company_id, 'Nächsten Freitag: Live-Jazz Abend im Biergarten! 🎷 Reserviert euch rechtzeitig einen Tisch unter 0661 12345.', 'event', now() - interval '1 day'),
            (company_id, 'Wir suchen Verstärkung! Schaut mal in unsere Jobs rein - wir suchen ab sofort eine Servicekraft (m/w/d).', 'news', now() - interval '3 days');
    END IF;
END $$;
