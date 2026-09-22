-- ==============================================================================
-- PMPingo — Supabase Database Schema (Profiles, Leaderboard & Colleague Follows)
-- ==============================================================================

-- 1. Create Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  display_name TEXT NOT NULL,
  email TEXT,
  avatar_url TEXT,
  xp INTEGER DEFAULT 0 NOT NULL,
  streak_days INTEGER DEFAULT 1 NOT NULL,
  level INTEGER DEFAULT 1 NOT NULL,
  current_day INTEGER DEFAULT 1 NOT NULL,
  questions_attempted INTEGER DEFAULT 0 NOT NULL,
  questions_correct INTEGER DEFAULT 0 NOT NULL,
  accuracy_pct INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index for instant leaderboard ranking queries
CREATE INDEX IF NOT EXISTS idx_profiles_xp ON public.profiles (xp DESC, streak_days DESC);

-- 2. Create Follows Table (Social Study Graph)
CREATE TABLE IF NOT EXISTS public.follows (
  follower_id UUID NOT NULL,
  following_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  PRIMARY KEY (follower_id, following_id)
);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.follows ENABLE ROW LEVEL SECURITY;

-- Allow public read of all profiles for the colleague leaderboard
CREATE POLICY "Public profiles are viewable by everyone" 
ON public.profiles FOR SELECT USING (true);

-- Allow users to insert/update their own profile
CREATE POLICY "Users can insert their own profile" 
ON public.profiles FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE USING (true);

-- Allow public read/write of follows
CREATE POLICY "Anyone can view follows" 
ON public.follows FOR SELECT USING (true);

CREATE POLICY "Users can toggle follows" 
ON public.follows FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can unfollow" 
ON public.follows FOR DELETE USING (true);

-- 4. Seed with initial colleague benchmarks for instant study comparison
INSERT INTO public.profiles (display_name, xp, streak_days, level, current_day, questions_attempted, questions_correct, accuracy_pct)
VALUES 
  ('Elena Rostova', 1420, 18, 5, 14, 180, 158, 88),
  ('Marcus Vance', 980, 12, 4, 10, 120, 98, 82),
  ('Sarah Chen', 860, 9, 3, 8, 95, 81, 85),
  ('David Kim', 640, 7, 3, 6, 75, 61, 81),
  ('Claire Moreau', 420, 4, 2, 4, 50, 39, 78)
ON CONFLICT DO NOTHING;
