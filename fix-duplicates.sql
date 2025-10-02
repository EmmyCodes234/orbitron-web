-- Fix Duplicate Players in PANASA Database
-- This script identifies and removes duplicate player entries

-- =============================================
-- 1. FIND DUPLICATE PLAYERS
-- =============================================

-- Find players with similar names (case-insensitive)
SELECT 
    name,
    country,
    COUNT(*) as duplicate_count,
    STRING_AGG(nick, ', ') as nicks,
    STRING_AGG(rating::text, ', ') as ratings
FROM public.players 
GROUP BY name, country
HAVING COUNT(*) > 1
ORDER BY name;

-- Find exact name duplicates
SELECT 
    name,
    STRING_AGG(nick, ', ') as nicks,
    STRING_AGG(rating::text, ', ') as ratings,
    COUNT(*) as duplicate_count
FROM public.players 
GROUP BY name, country
HAVING COUNT(*) > 1
ORDER BY name;

-- =============================================
-- 2. SPECIFIC FIX FOR SEGUN DUROJAIYE
-- =============================================

-- Show current Segun Durojaiye entries
SELECT * FROM public.players 
WHERE name ILIKE '%segun%duro%' 
ORDER BY rating DESC;

-- Keep the higher-rated entry and remove duplicates
-- First, let's see what we have:
DO $$
DECLARE
    duplicate_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO duplicate_count
    FROM public.players 
    WHERE name ILIKE '%segun%duro%';
    
    RAISE NOTICE 'Found % entries for Segun Durojaiye variants', duplicate_count;
END $$;

-- Remove the lower-rated duplicate (keep SDUR2 with rating 1964, remove SDUR with rating 1996)
-- Wait, that seems backwards - let's keep the higher rating
DELETE FROM public.players 
WHERE nick = 'SDUR2' 
AND name = 'Segun Durojaiye' 
AND rating = 1964;

-- Update the remaining entry to have consistent data
UPDATE public.players 
SET 
    nick = 'SDUR',
    name = 'Segun Durojaiye',
    rating = 1996,
    games = 114
WHERE name ILIKE '%segun%duro%';

-- =============================================
-- 3. GENERAL DUPLICATE CLEANUP
-- =============================================

-- Remove duplicates keeping the highest-rated version of each player
WITH ranked_players AS (
    SELECT 
        *,
        ROW_NUMBER() OVER (
            PARTITION BY LOWER(name), country 
            ORDER BY rating DESC, games DESC, created_at ASC
        ) as rn
    FROM public.players
)
DELETE FROM public.players 
WHERE id IN (
    SELECT id 
    FROM ranked_players 
    WHERE rn > 1
);

-- =============================================
-- 4. PREVENT FUTURE DUPLICATES
-- =============================================

-- Create a unique constraint on name + country (case-insensitive)
-- First, let's create a function for case-insensitive comparison
CREATE OR REPLACE FUNCTION lower_name_country(name TEXT, country TEXT) 
RETURNS TEXT AS $$
BEGIN
    RETURN LOWER(name) || '|' || LOWER(country);
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Create a unique index to prevent future duplicates
CREATE UNIQUE INDEX IF NOT EXISTS players_unique_name_country_idx 
ON public.players (lower_name_country(name, country));

-- =============================================
-- 5. VERIFICATION
-- =============================================

-- Verify no duplicates remain
SELECT 
    name,
    country,
    COUNT(*) as count
FROM public.players 
GROUP BY LOWER(name), country
HAVING COUNT(*) > 1
ORDER BY name;

-- Show final count
SELECT 
    COUNT(*) as total_players,
    COUNT(DISTINCT LOWER(name) || country) as unique_players
FROM public.players;

-- Show Segun Durojaiye final entry
SELECT * FROM public.players 
WHERE name ILIKE '%segun%duro%';

-- Success message
DO $$
DECLARE
    total_count INTEGER;
    segun_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO total_count FROM public.players;
    SELECT COUNT(*) INTO segun_count FROM public.players WHERE name ILIKE '%segun%duro%';
    
    RAISE NOTICE 'Duplicate cleanup completed!';
    RAISE NOTICE 'Total players: %', total_count;
    RAISE NOTICE 'Segun Durojaiye entries: %', segun_count;
END $$;