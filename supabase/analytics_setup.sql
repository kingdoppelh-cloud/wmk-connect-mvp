-- Analytics for B2B Dashboard
-- This table tracks every time a user views a profile or clicks an action button

CREATE TABLE public.analytics_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
    event_type TEXT NOT NULL, -- 'profile_view', 'click_whatsapp', 'click_phone', 'click_email', 'click_website'
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Set up Row Level Security
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- Allow ANYONE to insert an event (we want public tracking of anonymous visitors)
CREATE POLICY "Ermöglicht jedem Insert auf Analytics"
ON public.analytics_events
FOR INSERT TO public
WITH CHECK (true);

-- Allow authenticated users (Admins / Premium Partners) to READ analytics
CREATE POLICY "Ermöglicht Admins Lesezugriff auf Analytics"
ON public.analytics_events
FOR SELECT TO authenticated
USING (true);
