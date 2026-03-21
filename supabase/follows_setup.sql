-- Following Table
CREATE TABLE IF NOT EXISTS follows (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(user_id, company_id)
);

-- Push Subscriptions Table
CREATE TABLE IF NOT EXISTS push_subscriptions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    subscription_json JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS Policies
ALTER TABLE follows ENABLE ROW LEVEL SECURITY;
ALTER TABLE push_subscriptions ENABLE ROW LEVEL SECURITY;

-- Follows: Anyone can read counts, users can read their own, users can insert their own
CREATE POLICY "Anyone can read follow counts" ON follows FOR SELECT USING (true);
CREATE POLICY "Users can manage their own follows" ON follows 
    FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Push Subscriptions: Users can only manage their own
CREATE POLICY "Users can manage their own push subs" ON push_subscriptions
    FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Function to get follower count
CREATE OR REPLACE FUNCTION get_follower_count(comp_id UUID)
RETURNS BIGINT AS $$
    SELECT count(*) FROM follows WHERE company_id = comp_id;
$$ LANGUAGE SQL STABLE;
