-- Simple Duplicate Fix for PANASA Database
-- This script safely removes duplicate players

-- =============================================
-- 1. FIND DUPLICATES (READ-ONLY QUERIES)
-- =============================================

-- Find duplicate names
SELECT 
    name,
    country,
    COUNT(*) as duplicate_count,
    STRING_AGG(nick, ', ') as all_nicks,
    STRING_AGG(rating::text, ', ') as all_ratings
FROM public.players 
GROUP BY name, country
HAVING COUNT(*) > 1
ORDER BY duplicate_count DESC, name;

-- =============================================
-- 2. SPECIFIC CHECK FOR SEGUN DUROJAIYE
-- =============================================

-- Show all Segun Durojaiye entries
SELECT 
    id,
    nick,
    name,
    rating,
    games,
    last_played,
    created_at
FROM public.players 
WHERE name ILIKE '%segun%' AND name ILIKE '%duro%'
ORDER BY rating DESC;

-- =============================================
-- 3. SAFE DUPLICATE REMOVAL
-- =============================================

-- Remove specific duplicate: Keep SDUR (higher rating), remove SDUR2
DELETE FROM public.players 
WHERE nick = 'SDUR2' 
  AND name = 'Segun Durojaiye';

-- =============================================
-- 4. GENERAL DUPLICATE CLEANUP
-- =============================================

-- Remove duplicates keeping the highest-rated version
-- This uses a safe approach with explicit IDs
WITH duplicate_players AS (
    SELECT 
        id,
        name,
        country,
        rating,
        ROW_NUMBER() OVER (
            PARTITION BY name, country 
            ORDER BY rating DESC, games DESC, created_at ASC
        ) as row_num
    FROM public.players
),
players_to_delete AS (
    SELECT id 
    FROM duplicate_players 
    WHERE row_num > 1
)
DELETE FROM public.players 
WHERE id IN (SELECT id FROM players_to_delete);

-- =============================================
-- 5. VERIFICATION
-- =============================================

-- Check for remaining duplicates
SELECT 
    name,
    country,
    COUNT(*) as count,
    STRING_AGG(nick, ', ') as nicks
FROM public.players 
GROUP BY name, country
HAVING COUNT(*) > 1
ORDER BY name;

-- Final player count
SELECT COUNT(*) as total_unique_players FROM public.players;

-- Verify Segun Durojaiye fix
SELECT 
    nick,
    name,
    rating,
    games
FROM public.players 
WHERE name ILIKE '%segun%' AND name ILIKE '%duro%';

-- Success message
DO $$
DECLARE
    total_count INTEGER;
    duplicate_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO total_count FROM public.players;
    
    SELECT COUNT(*) INTO duplicate_count FROM (
        SELECT name, country
        FROM public.players 
        GROUP BY name, country
        HAVING COUNT(*) > 1
    ) duplicates;
    
    RAISE NOTICE '✅ Cleanup completed!';
    RAISE NOTICE 'Total players: %', total_count;
    RAISE NOTICE 'Remaining duplicates: %', duplicate_count;
    
    IF duplicate_count = 0 THEN
        RAISE NOTICE '🎉 All duplicates successfully removed!';
    END IF;
END $$;