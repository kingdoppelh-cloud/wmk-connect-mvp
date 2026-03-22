-- Notifications Table
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id TEXT, -- Can be Supabase User ID or anonymous session ID
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (type IN ('news', 'event')),
    title TEXT NOT NULL,
    content TEXT,
    link TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Allow users to see their own notifications
CREATE POLICY "Users can view their own notifications"
ON notifications FOR SELECT
USING (true); -- Simplified for MVP/Anonymous sessions. In production, use auth.uid() or session validation.

-- Allow system/edge functions to insert notifications (Service Role)
-- Merhcants don't insert directly into notifications usually, it happens via trigger or hook.

-- Function to handle marking as read
CREATE OR REPLACE FUNCTION mark_notification_as_read(notification_id UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE notifications SET is_read = TRUE WHERE id = notification_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create notifications when news or events are posted
-- This is the "Intelligent" part.

CREATE OR REPLACE FUNCTION notify_followers_on_activity()
RETURNS TRIGGER AS $$
DECLARE
    follower_record RECORD;
    activity_type TEXT;
    activity_title TEXT;
    activity_content TEXT;
    activity_link TEXT;
BEGIN
    -- Determine activity type and details
    IF TG_TABLE_NAME = 'news_posts' THEN
        activity_type := 'news';
        activity_title := 'Neuigkeiten von ' || (SELECT name FROM companies WHERE id = NEW.company_id);
        activity_content := LEFT(NEW.content, 100);
        activity_link := 'feed';
    ELSIF TG_TABLE_NAME = 'events' THEN
        activity_type := 'event';
        activity_title := 'Neues Event: ' || NEW.title;
        activity_content := 'Am ' || TO_CHAR(NEW.event_date, 'DD.MM.YYYY');
        activity_link := 'events';
    END IF;

    -- Insert notification for each follower
    FOR follower_record IN (SELECT user_id FROM follows WHERE company_id = NEW.company_id) LOOP
        INSERT INTO notifications (user_id, company_id, type, title, content, link)
        VALUES (follower_record.user_id, NEW.company_id, activity_type, activity_title, activity_content, activity_link);
    END LOOP;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Triggers
DROP TRIGGER IF EXISTS on_news_post_created ON news_posts;
CREATE TRIGGER on_news_post_created
AFTER INSERT ON news_posts
FOR EACH ROW EXECUTE FUNCTION notify_followers_on_activity();

DROP TRIGGER IF EXISTS on_event_created ON events;
CREATE TRIGGER on_event_created
AFTER INSERT ON events
FOR EACH ROW EXECUTE FUNCTION notify_followers_on_activity();
