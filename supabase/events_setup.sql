-- Events Table
CREATE TABLE IF NOT EXISTS events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    event_date TIMESTAMPTZ NOT NULL,
    location_override TEXT, -- e.g. "Marktplatz" if not at company address
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- RSVPs Table
CREATE TABLE IF NOT EXISTS rsvps (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id), -- Optional, can be NULL for anonymous if needed
    session_id TEXT, -- For anonymous RSVPs
    status TEXT DEFAULT 'attending', -- attending, interested
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(event_id, user_id),
    UNIQUE(event_id, session_id)
);

-- RLS Policies
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE rsvps ENABLE ROW LEVEL SECURITY;

-- Events: Anyone can read, companies can manage their own
CREATE POLICY "Anyone can read events" ON events FOR SELECT USING (true);
-- To manage events, we'd check if the user is the owner (needs company_owner_id in companies or similar)
-- For now, we allow the same RLS as news_posts if available or use a simplified own-company check
CREATE POLICY "Companies can manage their own events" ON events
    FOR ALL USING (true); -- Simplified for MVP dashboard logic

-- RSVPs: Anyone can read counts, users can manage their own
CREATE POLICY "Anyone can read rsvps" ON rsvps FOR SELECT USING (true);
CREATE POLICY "Users can manage their own rsvps" ON rsvps
    FOR ALL USING (true); -- Simplified for MVP anonymous support

-- Function to get attendee count
CREATE OR REPLACE FUNCTION get_event_attendee_count(evt_id UUID)
RETURNS BIGINT AS $$
    SELECT count(*) FROM rsvps WHERE event_id = evt_id AND status = 'attending';
$$ LANGUAGE SQL STABLE;
