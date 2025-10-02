-- Quick Fix for Segun Durojaiye Duplicate
-- This script specifically handles the SDUR/SDUR2 duplicate issue

-- =============================================
-- 1. CHECK CURRENT STATE
-- =============================================

-- Show current Segun Durojaiye entries
SELECT 
    nick,
    name,
    rating,
    games,
    last_played,
    created_at
FROM public.players 
WHERE name ILIKE '%segun%duro%' 
ORDER BY rating DESC;

-- =============================================
-- 2. REMOVE THE DUPLICATE
-- =============================================

-- Remove the lower-rated entry (SDUR2 with rating 1964)
-- Keep SDUR with rating 1996 as it's higher
DELETE FROM public.players 
WHERE nick = 'SDUR2' 
  AND name = 'Segun Durojaiye' 
  AND rating = 1964;

-- =============================================
-- 3. VERIFY THE FIX
-- =============================================

-- Check that only one entry remains
SELECT 
    nick,
    name,
    rating,
    games,
    last_played
FROM public.players 
WHERE name ILIKE '%segun%duro%';

-- Show total count after cleanup
SELECT COUNT(*) as total_players FROM public.players;

-- Success message
DO $$
DECLARE
    segun_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO segun_count 
    FROM public.players 
    WHERE name ILIKE '%segun%duro%';
    
    IF segun_count = 1 THEN
        RAISE NOTICE '✅ Success! Segun Durojaiye duplicate removed. Only 1 entry remains.';
    ELSE
        RAISE NOTICE '⚠️ Warning! Found % entries for Segun Durojaiye. Expected 1.', segun_count;
    END IF;
END $$;