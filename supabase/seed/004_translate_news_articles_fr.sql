-- Translate News Articles to French for PANASA Website

-- =============================================
-- 1. CLEAN UP EXISTING DATA WITH NULL DATES
-- =============================================

-- Delete any existing French articles with NULL dates to prevent constraint violations
DELETE FROM public.news WHERE language = 'fr' AND date IS NULL;

-- =============================================
-- 2. INSERT FRENCH TRANSLATIONS OF NEWS ARTICLES
-- =============================================

-- Add French translation of Ghana WESPAC article
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
    'Le Ghana accueille le monde : Accra organisera le Championnat mondial de Scrabble 2025',
    'Communications PANASA',
    'Novembre 2025',
    'La communauté mondiale de Scrabble se prépare pour un moment historique en novembre prochain alors qu''Accra, au Ghana, se prépare à accueillir le Championnat mondial de l''Association mondiale des joueurs de Scrabble en anglais (WESPAC).',
    'ACCRA, GHANA—La communauté mondiale de Scrabble se prépare pour un moment historique en novembre prochain alors qu''Accra, au Ghana, se prépare à accueillir le *Championnat mondial de l''Association mondiale des joueurs de Scrabble en anglais (WESPAC)*. Cela marque la première fois que le Ghana accueillera cette prestigieuse compétition, un témoignage de la montée en puissance du pays dans le monde du Scrabble compétitif.

Du 11 au 16 novembre, la ville d''Accra deviendra le centre névralgique du jeu de mots de haut niveau. Le tournoi attirera les meilleurs joueurs du monde entier, tous en compétition pour le prix ultime et le droit de se targuer d''être le meilleur. L''événement principal comportera 32 parties jouées sur quatre jours, culminant dans une finale au meilleur des sept le 16 novembre.

L''Association de Scrabble du Ghana (SCAG), dirigée par le président Haruna Adamu, a travaillé sans relâche pour amener le WESPAC à Accra. Bien que le Championnat mondial par équipes ait été reporté à une date ultérieure, l''excitation reste intense avec un nouveau focus sur l''événement principal et un calendrier chargé de tournois annexes.

Le « festival de Scrabble » de neuf jours est plus qu''un simple jeu ; c''est une célébration de la culture et de la communauté. Les organisateurs ont prévu plusieurs événements annexes aux noms locaux, notamment le tournoi « Akwaaba » (Bienvenue) et le Défi « Sika » (Or). Ces événements offriront des opportunités aux joueurs qui ne se sont pas qualifiés pour le championnat principal de participer quand même à l''action.

Accueillir le WESPAC est une réalisation remarquable pour le Ghana et l''ensemble de la communauté africaine de Scrabble. Cela offre une occasion incroyable de présenter le talent, l''organisation et la passion du continent pour le jeu à un public mondial. Le compte à rebours est officiellement lancé pour ce championnat qui promet d''être inoubliable.',
    'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=400&fit=crop&crop=center&q=80',
    true,
    NOW(),
    NOW(),
    'fr'
);

-- Add French translation of African Youth Scrabble Championship article
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
    'L''avenir du Scrabble africain brille de mille feux alors que le Nigeria remporte tous les titres du Championnat de la jeunesse',
    'Comité de la jeunesse PANASA',
    'Octobre 2025',
    'Le Championnat africain de Scrabble chez les jeunes à Nairobi s''est révélé être une démonstration puissante du talent naissant du continent, avec l''équipe du Nigeria remportant tous les titres disponibles.',
    'NAIROBI, KENYA—Le *Championnat africain de Scrabble chez les jeunes (AYSC)*, qui s''est récemment terminé à Nairobi, s''est révélé être une démonstration puissante du talent naissant du continent. Dans une démonstration remarquable de compétences, **l''équipe du Nigeria** a remporté tous les titres disponibles, confirmant ainsi son statut de force dominante dans le Scrabble chez les jeunes.

Le tournoi, qui a attiré 138 jeunes joueurs de cinq pays, a connu un grand succès. Il était structuré pour mettre en valeur l''excellence individuelle et collective dans deux catégories : Moins de 15 ans et Moins de 19 ans.

La catégorie Moins de 15 ans est revenue à *Sophia Ekeruche* du Nigeria, qui a livré une performance impeccable, gagnant ses 18 parties. Son parcours sans défaite témoignait non seulement de son talent individuel, mais aussi d''un signe de développement approfondi et croissant des programmes pour la jeunesse dans son pays d''origine. Juste derrière elle arrivaient Kingsley Odhiambo du Kenya et Hassan Olojoku du Nigeria, qui complétaient le top 3.

Dans la division Moins de 19 ans, *Prestige Archibong*, également du Nigeria, a remporté le championnat. La victoire d''Archibong était un combat acharné contre son compatriote Abdulqudus Aliu, mais il a finalement prévalu avec un score cumulatif supérieur. Il convient de noter qu''Archibong, qui avait remporté le titre Moins de 15 ans il y a deux ans, a maintenant prouvé sa constance et son habileté à un niveau de compétition plus élevé.

Au-delà des triomphes individuels, l''équipe du Nigeria a remporté les couronnes d''équipe dans les divisions Moins de 15 ans et Moins de 19 ans, avec le Ghana et le Kenya se disputant les places du podium. Ce niveau de participation et de réussite de plusieurs pays souligne l''intérêt croissant et le développement du Scrabble à travers le continent.

Le prochain Championnat africain de Scrabble chez les jeunes est prévu pour 2027 au Ghana, promettant d''être un événement encore plus grand.',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop&crop=center&q=80',
    true,
    NOW() - INTERVAL '10 days',
    NOW() - INTERVAL '10 days',
    'fr'
);

-- Add French translation of Blitzkrieg article
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
    'Blitzkrieg triomphe au Triumvirate Showdown à Nairobi',
    'Comité des tournois PANASA',
    'Septembre 2025',
    'La Coupe du Président PANASA a introduit un nouveau format d''équipe passionnant, avec l''équipe Blitzkrieg émergeant comme les premiers champions du Triumvirate Showdown.',
    'NAIROBI, KENYA—La Coupe du Président de la Fédération pan-africaine de Scrabble (PANASA), surnommée le *Triumvirate Showdown*, s''est terminée à Nairobi, offrant un nouveau format passionnant et couronnant **l''équipe Blitzkrieg** comme ses premiers champions. Ce tournoi unique s''écartait du style de jeu individuel traditionnel, opposant des équipes de trois joueurs dans une série de batailles intenses.

Pendant trois jours de compétition féroce, c''est *Blitzkrieg* qui s''est démarquée, montrant une coopération incroyable et une profondeur stratégique. L''équipe, composée d''*Allan Oyende (GM)*, **Cyril Umebiye** et **Nicholas Mbugua**, a réussi à remporter une victoire dominante dans le tour rond avec un record fantastique de 9–6. Leur performance n''était pas seulement question de gagner des parties ; ils ont également accumulé une énorme différence de +1132, montrant qu''ils pouvaient non seulement battre les adversaires mais les surpasser complètement.

Alors que Blitzkrieg occupait la première place, le tournoi a mis en valeur des talents dans toutes les divisions. L''événement était divisé en cinq niveaux différents—Championnat, Challenger, Plate, Bowl et Wooden Spoon—pour assurer des parties compétitives pour chaque équipe. Cette structure, une marque distinctive du *Triumvirate Showdown*, maintenait l''énergie élevée et la rivalité forte.

Parmi les performances notables, on peut citer *l''équipe Mavericks* dans le tour Challenger, qui a gagné 12 de ses 15 matchs, et *l''équipe Wazito*, qui a dominé le tour Bowl avec un record presque parfait de 12–3. Chaque tour avait sa propre histoire de victoires acharnées et de défaites étroites.

L''événement, qui s''est déroulé à Nairobi, a rassemblé des joueurs du continent africain et d''ailleurs, renforçant la communauté de Scrabble et fixant une barre élevée pour les tournois futurs basés sur l''équipe. L''exécution réussie de ce nouveau format signale une direction prometteuse pour le sport, se concentrant non seulement sur le génie individuel mais sur la stratégie collaborative. Les joueurs et les fans attendent déjà avec impatience la prochaine fois où ils pourront s''unir pour la gloire.',
    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop&crop=center&q=80',
    true,
    NOW() - INTERVAL '20 days',
    NOW() - INTERVAL '20 days',
    'fr'
);

-- =============================================
-- 3. VERIFICATION
-- =============================================

-- Show all French news articles after update
SELECT 
    id,
    title,
    author,
    date,
    created_at,
    language,
    LENGTH(content) as content_length
FROM public.news
WHERE language = 'fr'
ORDER BY created_at DESC;

-- Count French articles
SELECT COUNT(*) as total_french_articles FROM public.news WHERE published = true AND language = 'fr';

-- Success message
DO $$
DECLARE
    article_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO article_count FROM public.news WHERE published = true AND language = 'fr';
    
    RAISE NOTICE '✅ French news articles translated successfully!';
    RAISE NOTICE '📰 Total published French articles: %', article_count;
    RAISE NOTICE '🇫🇷 Ready for French website display!';
END $$;