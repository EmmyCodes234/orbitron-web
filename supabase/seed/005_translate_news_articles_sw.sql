-- Translate News Articles to Swahili for PANASA Website

-- =============================================
-- 1. CLEAN UP EXISTING DATA WITH NULL DATES
-- =============================================

-- Delete any existing Swahili articles with NULL dates to prevent constraint violations
DELETE FROM public.news WHERE language = 'sw' AND date IS NULL;

-- =============================================
-- 2. INSERT SWAHILI TRANSLATIONS OF NEWS ARTICLES
-- =============================================

-- Add Swahili translation of Ghana WESPAC article
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
    'Ghana inakaribisha Dunia: Accra itakuwa mwenyeji wa Mabingwa wa Dunia ya Scrabble 2025',
    'Mawasiliano ya PANASA',
    'Novemba 2025',
    'Jamii ya kimataifa ya Scrabble inajitayarisha kwa hatua ya kihistoria mwezi huu wa Novemba wakati Accra, Ghana, inaandaa kulishika Mabingwa ya Kiingereza ya Washindaji wa Scrabble (WESPAC).',
    'ACCRA, GHANA—Jamii ya kimataifa ya Scrabble inajitayarisha kwa hatua ya kihistoria mwezi huu wa Novemba wakati Accra, Ghana, inaandaa kulishika *Mabingwa ya Kiingereza ya Washindaji wa Scrabble (WESPAC)*. Hii ni mara ya kwanza Ghana itakapokuwa nchi mwenyeji wa tukio hili la heshima, ushahidi wa kuongezeka kwa nchi katika ulimwengu wa Scrabble wa ushindani.

Kuanzia Novemba 11 hadi 16, jiji la Accra litakuwa kitovu cha mchezo wa maneno wa kiwango cha juu. Mashindano yatawashirikisha wachezaji bora zaidi ulimwenguni, wote wakiungana kwa tuzo ya mwisho na haki za kujigamba. Tukio kuu litakuwa na michezo 32 kwa siku nne, ikikamilishwa na hatima ya Saba Bora siku ya Novemba 16.

Shirikisho la Scrabble la Ghana (SCAG), lililofungwa na Rais Haruna Adamu, limefanya kazi kwa bidii kuleta WESPAC kwenda Accra. Ingawa Mabingwa ya Timu ya Dunia yameahirishwa hadi tarehe ya baadaye, msisimko unabaki wa juu kwa lengo jipya kwenye tukio kuu na ratiba iliyojazwa kwa mashindano ya upande.

"Sikukuu ya Scrabble" ya siku tisa ni zaidi ya mchezo tu; ni sherehe ya utamaduni na jamii. Waandinishaji wamepanga matukio kadhaa ya upande yenye majina ya kienyeji, ikiwa ni pamoja na mashindano ya "Akwaaba" (Karibu) na Changamoto ya "Sika" (Dhahabu). Matukio haya yatatokea nafasi kwa wachezaji ambao hawajastahili kwa mabingwa kuu bado waweze kushiriki katika kitendo.

Kuwa mwenyeji wa WESPAC ni mafanikio ya alama kwa Ghana na jamii yote ya Scrabble ya Afrika. Inatoa nafasi nzuri ya kuonyesha utalent, ushirika na shauku ya bara hili kwa hadhira ya kimataifa. Hesabu ya muda imewekwa rasmi kwa kile kinachotarajiwa kuwa mabingwa yasiwezekana kusahau.',
    'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=400&fit=crop&crop=center&q=80',
    true,
    NOW(),
    NOW(),
    'sw'
);

-- Add Swahili translation of African Youth Scrabble Championship article
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
    'Baadaye ya Scrabble ya Kiafrika inang''aa kwa kuwa Nigeria inachukua vichwa vyote vya Mabingwa ya Vijana',
    'Kamati ya Vijana ya PANASA',
    'Oktoba 2025',
    'Mabingwa ya Vijana ya Scrabble ya Kiafrika huko Nairobi yalikuwa onyesho la nguvu za kubuni kwa vijana wa bara hili, na Timu ya Nigeria ikichukua vichwa vyote vilivyopatikana.',
    'NAIROBI, KENYA—*Mabingwa ya Vijana ya Scrabble ya Kiafrika (AYSC)*, ambayo yaliisha hivi karibuni huko Nairobi, yalikuwa onyesho la nguvu za kubuni kwa vijana wa bara hili. Katika onyesho la ajabu la ustadi, **Timu ya Nigeria** ilichukua vichwa vyote vilivyopatikana, ikithibitisha tena hadhi yake kama nguvu kubwa katika Scrabble ya vijana.

Mashindano, ambayo yalishirikisha wachezaji vijana 138 kutoka nchi tano, yalikuwa mafanikio makubwa. Yalikuwa yameundwa ili kuonyesha ubora wa mtu binafsi na wa timu katika aina mbili: Chini ya miaka 15 na Chini ya miaka 19.

Aina ya Chini ya miaka 15 ilikuwa mali ya *Sophia Ekeruche* ya Nigeria, ambaye alitoa utendaji usio na dosari, akishinda michezo yake yote 18. Utendaji wake usio na kushindwa haukuwa ushahidi tu wa utalent wake binafsi bali pia ishara ya mipango ya kina na inayoongezeka kwa vijana katika nchi yake ya asili. Akiwa karibu naye alikuwa Kingsley Odhiambo wa Kenya na Hassan Olojoku wa Nigeria, ambao walizunguka vichwa vitatu vya juu.

Katika mgawanyo wa Chini ya miaka 19, *Prestige Archibong*, pia kutoka Nigeria, alishinda mabingwa. Ushindi wa Archibong ulikuwa mapambano makali dhidi ya mwenzake Abdulqudus Aliu, lakini hatimaye alishinda kwa alama ya juu zaidi. Inayozingatia, Archibong, ambaye alishinda kichwa cha Chini ya miaka 15 miaka miwili iliyopita, sasa amethibitisha utulivu wake na ustadi kwa kiwango cha juu zaidi cha ushindani.

Zaidi ya ushindi wa mtu binafsi, Timu ya Nigeria ilipata taji za timu katika mgawanyo wa Chini ya miaka 15 na Chini ya miaka 19, na Ghana na Kenya zikishindana kwa nafasi za jukwaa. Kiwango hiki cha ushiriki na mafanikio kutoka nchi nyingi kinavyoonyesha kuvutia kwa zaidi na maendeleo ya Scrabble katika bara nzima.

Mabingwa ya Vijana ya Scrabble ya Kiafrika yafuatayo yamepangwa kwa 2027 huko Ghana, yakitumainiwa kuwa tukio hata kubwa zaidi.',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop&crop=center&q=80',
    true,
    NOW() - INTERVAL '10 days',
    NOW() - INTERVAL '10 days',
    'sw'
);

-- Add Swahili translation of Blitzkrieg article
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
    'Blitzkrieg inashinda kwenye Triumvirate Showdown huko Nairobi',
    'Kamati ya Mashindano ya PANASA',
    'Septemba 2025',
    'Kikombe cha Rais cha PANASA kilianzisha muundo mpya wa kusisimua wa timu, na Timu ya Blitzkrieg ikibainika kama washindi wa kwanza wa Triumvirate Showdown.',
    'NAIROBI, KENYA—Kikombe cha Rais cha Shirikisho la Pan Afrika la Scrabble (PANASA), kilichoitwa *Triumvirate Showdown*, kilifungwa huko Nairobi, kikitoa muundo mpya wa kusisimua na ku coronation **Timu ya Blitzkrieg** kama washindi wake wa kwanza. Mashindano haya ya kipekee yalikuwa tofauti na mtindo wa kawaida wa kucheza mtu binafsi, yakipinga timu za watu watatu kwa kila mwingine katika mfululizo wa mapambano makali.

Kwa siku tatu za ushindani mkali, ilikuwa *Blitzkrieg* ambayo ilionekana bainifu, ikionyesha ushirikiano wa ajabu na kina cha kimkakati. Timu, iliyojumuisha *Allan Oyende (GM)*, **Cyril Umebiye**, na **Nicholas Mbugua**, ilifanikiwa kushinda ushindi mkubwa katika mzunguko wa Mabingwa kwa rekodi nzuri ya 9–6. Utendaji wao haukuwa tu kuhusu kushinda michezo; walipata pia tope kubwa ya +1132, kuonyesha walivyoweza si tu kushinda washindani bali kuwacheza kabisa.

Ingawa Blitzkrieg ilichukua nafasi ya juu, mashindano yalionyesha utalent katika mgawanyo wote. Tukio hilo lilikuwa limegawanywa katika ngazi tano tofauti—Mabingwa, Changamoto, Sahani, Bakuli, na Kijiti—ili kuhakikisha michezo yenye ushindani kwa kila timu. Muundo huu, alama ya kawaida ya *Triumvirate Showdown*, ulishika nguvu ya juu na ushindani mkali.

Baadhi ya utendaji wa kuvutia zilizojumuisha *Timu ya Mavericks* katika mzunguko wa Changamoto, ambayo ilishinda michezo 12 kati ya 15 zao, na *Timu ya Wazito*, ambayo ilidominia mzunguko wa Bakuli kwa rekodi karibu isiwezekana ya 12–3. Kila mzunguko ulikuwa na hadithi yake ya ushindi mkali na kushindwa kwa ukaribu.

Tukio hilo, ambalo lilifanyika huko Nairobi, lilileta pamoja wachezaji kutoka bara nzima la Afrika na zaidi, ikirekebisha jamii ya Scrabble na kuweka kiwango cha juu kwa mashindano ya baadaye ya timu. Utekelezaji unaofanana wa muundo huu mpya unaonyesha mwelekeo unaotumainiwa kwa mchezo, ukizingatia siyo utalent binafsi tu bali pia mkakati wa kushirikiana. Wachezaji na wafanikio wote wanaendelea kusubiri kwa hamu wakati wa pili watakaposhirikiana kwa utukufu.',
    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop&crop=center&q=80',
    true,
    NOW() - INTERVAL '20 days',
    NOW() - INTERVAL '20 days',
    'sw'
);

-- =============================================
-- 3. VERIFICATION
-- =============================================

-- Show all Swahili news articles after update
SELECT 
    id,
    title,
    author,
    date,
    created_at,
    language,
    LENGTH(content) as content_length
FROM public.news
WHERE language = 'sw'
ORDER BY created_at DESC;

-- Count Swahili articles
SELECT COUNT(*) as total_swahili_articles FROM public.news WHERE published = true AND language = 'sw';

-- Success message
DO $$
DECLARE
    article_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO article_count FROM public.news WHERE published = true AND language = 'sw';
    
    RAISE NOTICE '✅ Swahili news articles translated successfully!';
    RAISE NOTICE '📰 Total published Swahili articles: %', article_count;
    RAISE NOTICE '🇰🇪 Ready for Swahili website display!';
END $$;