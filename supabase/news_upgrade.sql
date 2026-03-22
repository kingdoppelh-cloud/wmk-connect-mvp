-- Activity Feed Upgrade Schema

-- 1. Add columns to news_posts
ALTER TABLE public.news_posts 
ADD COLUMN IF NOT EXISTS image_url TEXT,
ADD COLUMN IF NOT EXISTS likes_count INTEGER DEFAULT 0;

-- 2. Create table for tracking likes (per session/user)
CREATE TABLE IF NOT EXISTS public.news_likes (
    post_id UUID REFERENCES public.news_posts(id) ON DELETE CASCADE,
    session_id TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    PRIMARY KEY (post_id, session_id)
);

-- 3. Security (RLS)
ALTER TABLE public.news_likes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can like posts" ON public.news_likes FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can remove own like" ON public.news_likes FOR DELETE USING (true);
CREATE POLICY "Anyone can view likes" ON public.news_likes FOR SELECT USING (true);

-- 4. Trigger to update likes_count on news_posts
CREATE OR REPLACE FUNCTION update_news_likes_count()
RETURNS TRIGGER AS $$
BEGIN
    IF (TG_OP = 'INSERT') THEN
        UPDATE public.news_posts 
        SET likes_count = likes_count + 1
        WHERE id = NEW.post_id;
    ELSIF (TG_OP = 'DELETE') THEN
        UPDATE public.news_posts 
        SET likes_count = likes_count - 1
        WHERE id = OLD.post_id;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_news_like ON public.news_likes;
CREATE TRIGGER on_news_like
AFTER INSERT OR DELETE ON public.news_likes
FOR EACH ROW EXECUTE FUNCTION update_news_likes_count();
