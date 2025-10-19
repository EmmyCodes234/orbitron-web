-- PANASA Website Database Setup
-- This script creates tables and RLS policies for public read access

-- =============================================
-- 1. PLAYERS TABLE
-- =============================================

-- Create players table
CREATE TABLE IF NOT EXISTS public.players (
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

-- Enable RLS on players table
ALTER TABLE public.players ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access to players
CREATE POLICY "Allow public read access to players" ON public.players
    FOR SELECT USING (true);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS players_rating_idx ON public.players (rating DESC);
CREATE INDEX IF NOT EXISTS players_country_idx ON public.players (country);
CREATE INDEX IF NOT EXISTS players_name_idx ON public.players (name);

-- =============================================
-- 2. FEDERATIONS TABLE
-- =============================================

-- Create federations table
CREATE TABLE IF NOT EXISTS public.federations (
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

-- Enable RLS on federations table
ALTER TABLE public.federations ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access to federations
CREATE POLICY "Allow public read access to federations" ON public.federations
    FOR SELECT USING (true);

-- =============================================
-- 3. NEWS TABLE
-- =============================================

-- Create news table
CREATE TABLE IF NOT EXISTS public.news (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    summary TEXT,
    content TEXT NOT NULL,
    author TEXT NOT NULL,
    image_url TEXT,
    published BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on news table
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access to published news only
CREATE POLICY "Allow public read access to published news" ON public.news
    FOR SELECT USING (published = true);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS news_published_created_at_idx ON public.news (published, created_at DESC);

-- =============================================
-- 4. EVENTS TABLE
-- =============================================

-- Create events table
CREATE TABLE IF NOT EXISTS public.events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    location TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    image_url TEXT,
    registration_url TEXT,
    published BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on events table
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access to published events only
CREATE POLICY "Allow public read access to published events" ON public.events
    FOR SELECT USING (published = true);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS events_published_start_date_idx ON public.events (published, start_date DESC);

-- =============================================
-- 5. RESOURCES TABLE (Optional)
-- =============================================

-- Create resources table
CREATE TABLE IF NOT EXISTS public.resources (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    file_url TEXT,
    external_url TEXT,
    published BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on resources table
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access to published resources only
CREATE POLICY "Allow public read access to published resources" ON public.resources
    FOR SELECT USING (published = true);

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

-- Create triggers for updated_at
CREATE TRIGGER update_players_updated_at BEFORE UPDATE ON public.players
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_federations_updated_at BEFORE UPDATE ON public.federations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_news_updated_at BEFORE UPDATE ON public.news
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON public.events
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_resources_updated_at BEFORE UPDATE ON public.resources
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- NOTES:
-- =============================================
-- 1. All tables have RLS enabled with public read access
-- 2. No authentication required for SELECT operations
-- 3. Only published content is visible for news, events, and resources
-- 4. Players and federations are always visible
-- 5. Indexes are created for better query performance
-- 6. Auto-updating timestamps are implemented
-- 
-- To insert data, you'll need to use the Supabase dashboard
-- or create additional policies for INSERT/UPDATE operations
-- with proper authentication if needed for admin functions.