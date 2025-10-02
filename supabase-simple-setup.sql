-- PANASA Website - Simple Database Setup
-- Start with just the players table to get the ratings page working

-- =============================================
-- 1. DROP EXISTING POLICIES AND TABLES (if they exist)
-- =============================================

-- Drop existing policies
DROP POLICY IF EXISTS "Allow public read access to players" ON public.players;
DROP POLICY IF EXISTS "Allow public read access to federations" ON public.federations;
DROP POLICY IF EXISTS "Allow public read access to published news" ON public.news;
DROP POLICY IF EXISTS "Allow public read access to published events" ON public.events;
DROP POLICY IF EXISTS "Allow public read access to published resources" ON public.resources;

-- Drop existing tables
DROP TABLE IF EXISTS public.players CASCADE;
DROP TABLE IF EXISTS public.federations CASCADE;
DROP TABLE IF EXISTS public.news CASCADE;
DROP TABLE IF EXISTS public.events CASCADE;
DROP TABLE IF EXISTS public.resources CASCADE;

-- =============================================
-- 2. CREATE PLAYERS TABLE
-- =============================================

CREATE TABLE public.players (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nick TEXT NOT NULL UNIQUE,
    country TEXT NOT NULL,
    name TEXT NOT NULL,
    games INTEGER NOT NULL DEFAULT 0,
    rating INTEGER NOT NULL DEFAULT 1000,
    last_played DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS and create policy
ALTER TABLE public.players ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to players" ON public.players
    FOR SELECT USING (true);

-- Create indexes
CREATE INDEX players_rating_idx ON public.players (rating DESC);
CREATE INDEX players_country_idx ON public.players (country);
CREATE INDEX players_name_idx ON public.players (name);

-- =============================================
-- 3. CREATE FEDERATIONS TABLE
-- =============================================

CREATE TABLE public.federations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    country TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    president TEXT NOT NULL,
    secretary TEXT,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT NOT NULL,
    website TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS and create policy
ALTER TABLE public.federations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to federations" ON public.federations
    FOR SELECT USING (true);

-- =============================================
-- 4. CREATE NEWS TABLE
-- =============================================

CREATE TABLE public.news (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    summary TEXT,
    content TEXT NOT NULL,
    author TEXT NOT NULL,
    image_url TEXT,
    published BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS and create policy
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to published news" ON public.news
    FOR SELECT USING (published = true);

-- Create index
CREATE INDEX news_published_created_at_idx ON public.news (published, created_at DESC);

-- =============================================
-- 5. CREATE EVENTS TABLE
-- =============================================

CREATE TABLE public.events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    location TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    image_url TEXT,
    registration_url TEXT,
    published BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS and create policy
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to published events" ON public.events
    FOR SELECT USING (published = true);

-- Create index
CREATE INDEX events_published_start_date_idx ON public.events (published, start_date DESC);

-- =============================================
-- 6. UPDATE TRIGGERS
-- =============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers
CREATE TRIGGER update_players_updated_at BEFORE UPDATE ON public.players
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_federations_updated_at BEFORE UPDATE ON public.federations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_news_updated_at BEFORE UPDATE ON public.news
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON public.events
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- SUCCESS MESSAGE
-- =============================================

DO $$
BEGIN
    RAISE NOTICE 'PANASA database setup completed successfully!';
    RAISE NOTICE 'Tables created: players, federations, news, events';
    RAISE NOTICE 'All tables have public read access enabled';
    RAISE NOTICE 'You can now run insert-players.sql to add player data';
END $$;