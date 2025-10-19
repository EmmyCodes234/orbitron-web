-- Update News Articles for PANASA Website

-- Clear existing articles and add new Ghana WESPAC article

-- =============================================
-- 1. BACKUP EXISTING NEWS (Optional - for safety)
-- =============================================

-- Show current news articles before deletion
SELECT 
    id,
    title,
    author,
    date,
    created_at
FROM public.news
ORDER BY created_at DESC;

-- =============================================
-- 2. CLEAR EXISTING NEWS ARTICLES
-- =============================================

-- Delete all existing news articles
DELETE FROM public.news;

-- Reset the sequence if needed (optional)
-- This ensures new articles start with clean IDs
-- ALTER SEQUENCE news_id_seq RESTART WITH 1;

-- =============================================
-- 3. INSERT NEW GHANA WESPAC ARTICLE
-- =============================================

INSERT INTO public.news (
    title,
    author,
    date,
    summary,
    content,
    image,
    published,
    created_at,
    updated_at,
    language
) VALUES (
    'Ghana Welcomes the World: Accra to Host the 2025 World Scrabble Championship',
    'PANASA Communications',
    'November 2025',
    'The global Scrabble community is gearing up for a historic moment this November as Accra, Ghana, prepares to host the World English Scrabble Players Association Championship (WESPAC) for the first time.',
    'ACCRA, GHANA—The global Scrabble community is gearing up for a historic moment this November as Accra, Ghana, prepares to host the *World English Scrabble Players Association Championship (WESPAC)*. This marks the first time Ghana will serve as the host nation for the prestigious event, a testament to the country''s rising prominence in the world of competitive Scrabble.

From November 11th to 16th, the city of Accra will become the epicenter for top-tier wordplay. The tournament is set to attract the world''s best players, all competing for the ultimate prize and bragging rights. The main event will feature 32 games played over four days, culminating in a dramatic Best of Seven final on November 16th.

The Scrabble Association of Ghana (SCAG), led by President Haruna Adamu, has worked tirelessly to bring WESPAC to Accra. While the World Team Scrabble Championship has been postponed to a future date, the excitement remains high with a new focus on the main event and a packed schedule of side tournaments.

The nine-day "Scrabble fiesta" is about more than just a game; it''s a celebration of culture and community. The organizers have planned several side events with local names, including the "Akwaaba" (Welcome) tournament and the "Sika" (Gold) Challenge. These events will offer opportunities for players who didn''t qualify for the main championship to still be a part of the action.

Hosting WESPAC is a landmark achievement for Ghana and the entire African Scrabble community. It provides an incredible opportunity to showcase the continent''s talent, organization, and passion for the game to a global audience. The countdown is officially on for what promises to be an unforgettable championship.',
    'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=400&fit=crop&crop=center&q=80',
    true,
    NOW(),
    NOW(),
    'en'
);

-- =============================================
-- 4. ADD YOUTH CHAMPIONSHIP ARTICLE
-- =============================================

-- Add the African Youth Scrabble Championship article as second story
INSERT INTO public.news (
    title,
    author,
    date,
    summary,
    content,
    image,
    published,
    created_at,
    updated_at,
    language
) VALUES (
    'Future of African Scrabble Shines Bright as Nigeria Sweeps Youth Championship Titles',
    'PANASA Youth Committee',
    'October 2025',
    'The African Youth Scrabble Championship in Nairobi proved to be a powerful showcase of the continent''s burgeoning talent, with Team Nigeria sweeping all available titles.',
    'NAIROBI, KENYA—The *African Youth Scrabble Championship (AYSC)*, which recently concluded in Nairobi, proved to be a powerful showcase of the continent''s burgeoning talent. In a remarkable display of skill, **Team Nigeria** swept all available titles, reaffirming its status as a powerhouse in youth Scrabble.

The tournament, which drew 138 young players from five countries, was a major success. It was structured to highlight both individual and team excellence across two categories: Under-15 and Under-19.

The Under-15 category belonged to *Sophia Ekeruche* of Nigeria, who delivered a flawless performance, winning all 18 of her games. Her undefeated run was not only a testament to her individual talent but also a sign of the deep and growing youth development programs in her home country. Following closely behind were Kenya''s Kingsley Odhiambo and Nigeria''s Hassan Olojoku, who rounded out the top three.

In the Under-19 division, *Prestige Archibong*, also from Nigeria, clinched the championship. Archibong''s victory was a hard-fought battle against his compatriot, Abdulqudus Aliu, but he ultimately prevailed with a superior cumulative score. Notably, Archibong, who won the Under-15 title two years ago, has now proven his consistency and skill at a higher level of competition.

Beyond the individual triumphs, Team Nigeria secured the team crowns in both the Under-15 and Under-19 divisions, with Ghana and Kenya putting up strong competition to secure the podium spots. This level of participation and achievement from multiple countries highlights the growing interest and development of Scrabble across the continent. 

The next African Youth Scrabble Championship is scheduled for 2027 in Ghana, promising to be an even bigger event.',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop&crop=center&q=80',
    true,
    NOW() - INTERVAL '10 days',
    NOW() - INTERVAL '10 days',
    'en'
),
(
    'Blitzkrieg Triumphs at Triumvirate Showdown in Nairobi',
    'PANASA Tournament Committee',
    'September 2025',
    'The PANASA President''s Cup introduced a thrilling new team format, with Team Blitzkrieg emerging as the first champions of the Triumvirate Showdown.',
    'NAIROBI, KENYA—The Pan African Scrabble Federation (PANASA) President''s Cup, dubbed the *Triumvirate Showdown*, wrapped up in Nairobi, delivering a thrilling new format and crowning **Team Blitzkrieg** as its first champions. This unique tournament broke from the traditional individual-play style, pitting teams of three against each other in a series of intense battles.

Over three days of fierce competition, it was *Blitzkrieg* who stood out, showing incredible teamwork and strategic depth. The team, made up of *Allan Oyende (GM)*, **Cyril Umebiye**, and **Nicholas Mbugua**, managed to secure a dominant victory in the Championship round with a fantastic 9–6 record. Their performance wasn''t just about winning games; they also racked up a huge +1132 spread, showing they could not only beat opponents but completely outplay them.

While Blitzkrieg took the top spot, the tournament showcased talent across all divisions. The event was split into five different tiers—Championship, Challenger, Plate, Bowl, and Wooden Spoon—to ensure competitive games for every team. This structure, a hallmark of the *Triumvirate Showdown*, kept the energy high and the rivalry strong.

Some notable standout performances included *Team Mavericks* in the Challenger round, who won 12 of their 15 matches, and *Team Wazito*, who dominated the Bowl round with a nearly perfect 12–3 record. Each round had its own story of hard-fought victories and narrow defeats.

The event, which took place in Nairobi, brought together players from across the African continent and beyond, strengthening the Scrabble community and setting a high bar for future team-based tournaments. The successful execution of this new format signals a promising new direction for the sport, focusing not just on individual genius but on collaborative strategy. The players and fans alike are already looking forward to the next time they can team up for glory.',
    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop&crop=center&q=80',
    true,
    NOW() - INTERVAL '20 days',
    NOW() - INTERVAL '20 days',
    'en'
);

-- =============================================
-- 5. VERIFICATION
-- =============================================

-- Show all news articles after update
SELECT 
    id,
    title,
    author,
    date,
    created_at,
    LENGTH(content) as content_length
FROM public.news
ORDER BY created_at DESC;

-- Count articles
SELECT COUNT(*) as total_articles FROM public.news WHERE published = true;

-- Success message
DO $$
DECLARE
    article_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO article_count FROM public.news WHERE published = true;
    
    RAISE NOTICE '✅ News articles updated successfully!';
    RAISE NOTICE '📰 Total published articles: %', article_count;
    RAISE NOTICE '🇬🇭 Featured article: Ghana WESPAC 2025';
    RAISE NOTICE '🎉 Ready for website display!';
END $$;