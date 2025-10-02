-- Fix Segun Durojaiye Duplicate - Exact Fix
-- Based on the Supabase data showing two SDUR entries

-- =============================================
-- 1. SHOW CURRENT STATE
-- =============================================

-- Show the exact duplicates we see
SELECT 
    id,
    nick,
    name,
    rating,
    games,
    last_played
FROM public.players 
WHERE nick = 'SDUR'
ORDER BY rating DESC;

-- =============================================
-- 2. REMOVE THE LOWER-RATED DUPLICATE
-- =============================================

-- Remove the entry with rating 1964 (lower rating)
-- Keep the entry with rating 1996 (higher rating)
DELETE FROM public.players 
WHERE nick = 'SDUR' 
  AND rating = 1964;

-- =============================================
-- 3. STANDARDIZE THE REMAINING ENTRY
-- =============================================

-- Update the remaining entry to have consistent spelling
UPDATE public.players 
SET name = 'Segun Durojaiye'
WHERE nick = 'SDUR' 
  AND rating = 1996;

-- =============================================
-- 4. VERIFICATION
-- =============================================

-- Check that only one SDUR entry remains
SELECT 
    nick,
    name,
    rating,
    games,
    last_played
FROM public.players 
WHERE nick = 'SDUR';

-- Count total players after cleanup
SELECT COUNT(*) as total_players FROM public.players;

-- Success message
DO $$
DECLARE
    sdur_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO sdur_count 
    FROM public.players 
    WHERE nick = 'SDUR';
    
    IF sdur_count = 1 THEN
        RAISE NOTICE '✅ SUCCESS: Segun Durojaiye duplicate fixed!';
        RAISE NOTICE '   - Removed lower-rated entry (1964)';
        RAISE NOTICE '   - Kept higher-rated entry (1996)';
        RAISE NOTICE '   - Standardized name spelling';
    ELSE
        RAISE NOTICE '⚠️  WARNING: Expected 1 SDUR entry, found %', sdur_count;
    END IF;
END $$;