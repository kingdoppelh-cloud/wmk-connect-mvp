-- Community Rewards System Setup

-- 1. Table for current point balances
CREATE TABLE IF NOT EXISTS public.user_points (
    session_id TEXT PRIMARY KEY,
    points INTEGER DEFAULT 0,
    last_updated TIMESTAMPTZ DEFAULT now()
);

-- 2. Table for point transaction history (Audit log)
CREATE TABLE IF NOT EXISTS public.point_transactions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id TEXT NOT NULL REFERENCES public.user_points(session_id) ON DELETE CASCADE,
    amount INTEGER NOT NULL,
    source_event TEXT NOT NULL, -- 'profile_view', 'interaction', 'rsvp'
    company_id UUID REFERENCES public.companies(id),
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. RLS Setup
ALTER TABLE public.user_points ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.point_transactions ENABLE ROW LEVEL SECURITY;

-- Allow public access by session_id (simplified for anonymous tracking)
CREATE POLICY "Anyone can view own points" ON public.user_points
    FOR SELECT USING (true);

CREATE POLICY "Anyone can view own transactions" ON public.point_transactions
    FOR SELECT USING (true);

-- 4. Function to award points (Atomic)
CREATE OR REPLACE FUNCTION award_points(
    target_session_id TEXT,
    point_amount INTEGER,
    event_name TEXT,
    target_company_id UUID DEFAULT NULL
)
RETURNS INTEGER AS $$
DECLARE
    current_balance INTEGER;
BEGIN
    -- Ensure entry in user_points exists
    INSERT INTO public.user_points (session_id, points)
    VALUES (target_session_id, 0)
    ON CONFLICT (session_id) DO NOTHING;

    -- Update balance
    UPDATE public.user_points
    SET points = points + point_amount,
        last_updated = now()
    WHERE session_id = target_session_id
    RETURNING points INTO current_balance;

    -- Log transaction
    INSERT INTO public.point_transactions (session_id, amount, source_event, company_id)
    VALUES (target_session_id, point_amount, event_name, target_company_id);

    RETURN current_balance;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
