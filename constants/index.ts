// This file exports all mock data used in the application
export { CHATBASE_CONFIG } from './chatbase';

export const MOCK_EVENTS = [
  {
    id: '1',
    title: 'WESPAC 2025 - World English Scrabble Championship',
    date: '2025-11-12',
    location: 'Accra, Ghana',
    description: 'The prestigious World English Scrabble Championship featuring players from English-speaking nations worldwide. Main event runs November 12-16, 2025.',
    image: '/event1.jpg'
  },
  {
    id: '2',
    title: 'PANASA Championship 2025',
    date: '2025-03-15',
    location: 'Lagos, Nigeria',
    description: 'The premier Pan-African Scrabble championship featuring players from across the continent.',
    image: '/event2.jpg'
  },
  {
    id: '3',
    title: 'Youth Scrabble Tournament',
    date: '2025-06-20',
    location: 'Accra, Ghana',
    description: 'A tournament dedicated to nurturing the next generation of African Scrabble champions.',
    image: '/event3.jpg'
  }
];

export const MOCK_NEWS = [
  // English articles
  {
    id: '1',
    title: 'Accra Prepares to Welcome the World for WESPA Championship 2025',
    author: 'PANASA',
    date: 'November 2025',
    created_at: '2025-01-15T10:00:00Z',
    summary: 'The global scrabble elite will converge on Accra as Ghana hosts the highly anticipated WESPA 2025 Scrabble Championship.',
    content: 'ACCRA, GHANA – The global scrabble elite will converge on Accra as Ghana hosts the highly anticipated WESPA 2025 Scrabble Championship. This premier tournament, a pinnacle event in the international scrabble calendar, will be held from November 12th to 16th, 2025, at the prestigious The Palms by Eagles in Airport City. The Scrabble Association of Ghana (SCAG), in collaboration with the World English-Language Scrabble Players\' Association (WESPA), is organizing what promises to be a world-class event. The championship boasts a significant prize pool of $34,000, attracting the very best players from around the globe to compete for the coveted world title. The main championship will be the culmination of a week-long festival of scrabble. The action kicks off with the World Team Scrabble Championship (WTSC) from November 8th to 10th. Players will also have opportunities to participate in various side events, including the "Akwaaba" (Early Bird) Challenge on November 10th and a Last Chance Qualifier on November 11th for those making a final bid to enter the main event. The selection of Ghana as the host nation is a testament to the country\'s growing influence in the international scrabble community and its capacity to host major global tournaments. The Local Organising Committee (LOC) has been working diligently to ensure a memorable experience for all participants, showcasing Ghanaian hospitality and culture.',
    image: '/kofiBingo.png',
    language: 'en'
  },
  {
    id: '2',
    title: 'Team Nigeria Dominates at the 2nd African Youth Scrabble Championship in Kenya',
    author: 'PANASA',
    date: 'August 2025',
    created_at: '2025-01-10T14:30:00Z',
    summary: 'Team Nigeria has once again asserted its dominance in the world of youth scrabble, delivering a stellar performance at the just-concluded 2nd African Youth Scrabble Championship (AYSC).',
    content: 'NAIROBI, KENYA – Team Nigeria has once again asserted its dominance in the world of youth scrabble, delivering a stellar performance at the just-concluded 2nd African Youth Scrabble Championship (AYSC). The tournament, a premier event organized by the Pan African Scrabble Association (PANASA), was held from August 14th to 17th, 2025, at the Brighton International School in Syokimau, Machakos County. The Nigerian contingent, showcasing exceptional talent and strategic prowess, swept the top honors in both the Under-15 and Under-19 categories. In the Under-15 division, Nigeria\'s Sophia Ekeruche emerged as the champion, demonstrating remarkable skill and composure throughout the competition. The Nigerian team in this category also secured the overall team gold, fending off strong challenges from host nation Kenya and a competitive team from Ghana. The Under-19 category witnessed a thrilling contest, with Nigeria\'s Prestige Archibong, who won the U-15 title at the inaugural championship, claiming the top prize. The Nigerian players in this age group also clinched the team title, solidifying the nation\'s position as the powerhouse of youth scrabble in Africa. The championship brought together the most promising young scrabble players from across the continent, providing a platform for them to hone their skills and compete at an international level. The successful hosting of the event in Kenya highlights the growing popularity and development of scrabble across Africa. The victorious Team Nigeria is expected to receive a hero\'s welcome upon their return, with their outstanding performance bringing pride and honor to the nation.',
    image: '/ayscbanner.png',
    language: 'en'
  },
  {
    id: '3',
    title: 'Blitzkrieg Triumphs at Triumvirate Showdown in Nairobi',
    author: 'Juma Mwangi',
    date: 'September 2025',
    created_at: '2025-01-05T09:15:00Z',
    summary: 'Kenyan player dominates the fast-paced Triumvirate Blitz Tournament, showcasing the growing popularity of speed Scrabble across Africa.',
    content: 'In a thrilling display of wordplay speed and precision, Kenyan Scrabble ace Samuel "Blitzkrieg" Ochieng dominated the Triumvirate Blitz Tournament held in Nairobi last weekend. The tournament, which featured 60 players from 12 African countries, showcased the growing popularity of speed Scrabble across the continent. Ochieng, known for his lightning-fast play style, secured victory with a perfect 15-0 record across all matches. "Blitz Scrabble requires a different mindset," Ochieng explained after his victory. "You have to trust your instincts and play the percentages. It\'s chess at 100 miles per hour." The tournament used a unique format where players competed in three simultaneous games, rotating between boards every five minutes. This format, known as Triumvirate, tests not only word knowledge but also strategic thinking and adaptability. Players from Uganda and Tanzania took second and third places respectively, with several upsets throughout the weekend keeping spectators on the edge of their seats. The success of the event has prompted PANASA to consider making the Triumvirate format a regular feature in future tournaments.',
    image: '/news3.jpg',
    language: 'en'
  },
  // French articles
  {
    id: '1',
    title: 'Accra se prépare à accueillir le monde pour le Championnat WESPA 2025',
    author: 'PANASA',
    date: 'Novembre 2025',
    created_at: '2025-01-15T10:00:00Z',
    summary: 'L\'élite mondiale du scrabble convergera vers Accra alors que le Ghana accueille le très attendu Championnat WESPA 2025.',
    content: 'ACCRA, GHANA – L\'élite mondiale du scrabble convergera vers Accra alors que le Ghana accueille le très attendu Championnat WESPA 2025. Ce tournoi prestigieux, événement phare du calendrier international du scrabble, se tiendra du 12 au 16 novembre 2025 au prestigieux The Palms by Eagles dans la ville d\'Airport. L\'Association de Scrabble du Ghana (SCAG), en collaboration avec l\'Association mondiale des joueurs de Scrabble en langue anglaise (WESPA), organise ce qui s\'annonce comme un événement de classe mondiale. Le championnat dispose d\'un important fonds de prix de 34 000 dollars, attirant les meilleurs joueurs du monde entier pour rivaliser pour le précieux titre mondial. Le championnat principal sera le point culminant d\'un festival de scrabble d\'une semaine. L\'action commence avec le Championnat mondial de Scrabble par équipes (WTSC) du 8 au 10 novembre. Les joueurs auront également l\'opportunité de participer à divers événements annexes, notamment le défi "Akwaaba" (Early Bird) le 10 novembre et un qualificatif de dernière chance le 11 novembre pour ceux qui font une dernière tentative pour entrer dans l\'événement principal. Le choix du Ghana comme pays hôte témoigne de l\'influence croissante du pays dans la communauté internationale du scrabble et de sa capacité à organiser de grands tournois mondiaux. Le Comité d\'organisation local (LOC) travaille diligemment pour garantir une expérience mémorable à tous les participants, mettant en valeur l\'hospitalité et la culture ghanéennes.',
    image: '/kofiBingo.png',
    language: 'fr'
  },
  {
    id: '2',
    title: 'L\'équipe du Nigeria domine le 2e Championnat africain de Scrabble chez les jeunes au Kenya',
    author: 'PANASA',
    date: 'Août 2025',
    created_at: '2025-01-10T14:30:00Z',
    summary: 'L\'équipe du Nigeria a une fois de plus affirmé sa domination dans le monde du scrabble jeunesse, délivrant une performance exceptionnelle lors du 2e Championnat africain de Scrabble chez les jeunes (AYSC) qui vient de s\'achever.',
    content: 'NAIROBI, KENYA – L\'équipe du Nigeria a une fois de plus affirmé sa domination dans le monde du scrabble jeunesse, délivrant une performance exceptionnelle lors du 2e Championnat africain de Scrabble chez les jeunes (AYSC) qui vient de s\'achever. Le tournoi, événement majeur organisé par l\'Association pan-africaine de Scrabble (PANASA), s\'est tenu du 14 au 17 août 2025 au Brighton International School à Syokimau, dans le comté de Machakos. La délégation nigériane, montrant un talent exceptionnel et une maîtrise stratégique, a remporté les principales distinctions dans les catégories Under-15 et Under-19. Dans la division Under-15, Sophia Ekeruche du Nigeria est sortie victorieuse, démontrant des compétences et un sang-froid remarquables tout au long de la compétition. L\'équipe nigériane dans cette catégorie a également remporté l\'or de l\'équipe, repoussant les défis forts de la nation hôte Kenya et d\'une équipe compétitive du Ghana. La catégorie Under-19 a été le théâtre d\'une compétition passionnante, avec Prestige Archibong du Nigeria, qui avait remporté le titre U-15 lors du championnat inaugural, qui a décroché le premier prix. Les joueurs nigérians de ce groupe d\'âge ont également remporté le titre d\'équipe, consolidant la position de la nation en tant que force dominante du scrabble jeunesse en Afrique. Le championnat a réuni les joueurs de scrabble juniors les plus prometteurs du continent, leur offrant une plateforme pour perfectionner leurs compétences et rivaliser à un niveau international. Le succès de l\'organisation de l\'événement au Kenya souligne la popularité croissante et le développement du scrabble en Afrique. L\'équipe victorieuse du Nigeria devrait recevoir un accueil de héros à son retour, sa performance exceptionnelle apportant fierté et honneur à la nation.',
    image: '/ayscbanner.png',
    language: 'fr'
  },
  {
    id: '3',
    title: 'Blitzkrieg triomphe au Triumvirate Showdown à Nairobi',
    author: 'Juma Mwangi',
    date: 'Septembre 2025',
    created_at: '2025-01-05T09:15:00Z',
    summary: 'Un joueur kényan domine le tournoi de Blitz Triumvirate, illustrant la popularité croissante du Scrabble rapide en Afrique.',
    content: 'Dans une démonstration passionnante de rapidité et de précision dans le jeu de mots, l\'as du Scrabble kényan Samuel "Blitzkrieg" Ochieng a dominé le tournoi de Blitz Triumvirate organisé à Nairobi le week-end dernier. Le tournoi, qui comptait 60 joueurs de 12 pays africains, a mis en évidence la popularité croissante du Scrabble rapide sur le continent. Ochieng, connu pour son style de jeu ultra-rapide, a remporté la victoire avec un record parfait de 15-0 dans tous les matchs. "Le Scrabble Blitz nécessite une mentalité différente", a expliqué Ochieng après sa victoire. "Vous devez faire confiance à vos instincts et jouer selon les probabilités. C\'est comme des échecs à 100 miles à l\'heure." Le tournoi utilisait un format unique où les joueurs disputaient trois parties simultanées, en passant d\'un plateau à l\'autre toutes les cinq minutes. Ce format, appelé Triumvirate, teste non seulement la connaissance des mots, mais aussi la pensée stratégique et l\'adaptabilité. Les joueurs d\'Ouganda et de Tanzanie ont terminé respectivement deuxièmes et troisièmes, avec plusieurs surprises tout au long du week-end qui ont tenu les spectateurs en haleine. Le succès de l\'événement a incité la PANASA à envisager de faire du format Triumvirate une caractéristique régulière des tournois futurs.',
    image: '/news3.jpg',
    language: 'fr'
  },
  // Swahili articles
  {
    id: '1',
    title: 'Accra Inajitayarisha Kukaribisha Dunia kwa Mabingwa ya WESPA 2025',
    author: 'PANASA',
    date: 'Novemba 2025',
    created_at: '2025-01-15T10:00:00Z',
    summary: 'Wachezaji bora wa scrabble duniani watakuja Accra wakati Ghana inapopokea Mabingwa ya WESPA 2025.',
    content: 'ACCRA, GHANA – Wachezaji bora wa scrabble duniani watakuja Accra wakati Ghana inapopokea Mabingwa ya WESPA 2025. Mashindano haya ya kipekee, ambayo ni tukio kuu kwenye kalenda ya scrabble ya kimataifa, yatafanyika kuanzia Novemba 12 hadi 16, 2025, katika eneo la kipekee la The Palms by Eagles mjini Airport. Shirikisho la Scrabble la Ghana (SCAG), kwa ushirikiano na Shirikisho la Kimataifa la Wachezaji Scrabble Kwa Lugha ya Kiingereza (WESPA), inaandaa tukio ambalo inatarajiwa kuwa la kiwango cha dunia. Mabingwa haya yanajivunia zawadi ya $34,000, yakivutia wachezaji bora zaidi kutoka duniani kote kwa ajili ya kushindana kwa kichwa cha mbingu cha dunia. Mabingwa ya kawaida yatakuwa mwisho wa sherehe ya wiki nzima ya scrabble. Shindano huanza na Mabingwa ya Timu ya Dunia (WTSC) kuanzia Novemba 8 hadi 10. Wachezaji pia watakuwa na nafasi ya kushiriki katika matukio mbalimbali ya upande, ikiwa ni pamoja na changamoto ya "Akwaaba" (Early Bird) tarehe 10 Novemba na Stadi ya Mwisho tarehe 11 Novemba kwa wale wanaotafuta nafasi ya mwisho ya kuingia katika tukio kuu. Uchaguzi wa Ghana kama nchi mwenyeji ni ushidi wa ushawishi wake unaokua katika jamii ya scrabble ya kimataifa na uwezo wake wa kuandaa mashindano makubwa ya kimataifa. Kamati ya Kuandaa Sherehe (LOC) imekuwa ikifanya kazi kwa bidii kuhakikisha uzoefu wa kumbukwa kwa washiriki wote, ikionyesha mapenzi na utamaduni wa Ghana.',
    image: '/kofiBingo.png',
    language: 'sw'
  },
  {
    id: '2',
    title: 'Timu ya Nigeria Inadominia katika Mabingwa ya Pili ya Vijana ya Scrabble ya Kiafrika huko Kenya',
    author: 'PANASA',
    date: 'Agosti 2025',
    created_at: '2025-01-10T14:30:00Z',
    summary: 'Timu ya Nigeria imeimarisha tena uthibitishaji wake katika ulimwengu wa scrabble ya vijana, huku ikitoa utendaji wa kipekee katika Mabingwa ya Pili ya Vijana ya Scrabble ya Kiafrika (AYSC) yaliyofunga karibuni.',
    content: 'NAIROBI, KENYA – Timu ya Nigeria imeimarisha tena uthibitishaji wake katika ulimwengu wa scrabble ya vijana, huku ikitoa utendaji wa kipekee katika Mabingwa ya Pili ya Vijana ya Scrabble ya Kiafrika (AYSC) yaliyofunga karibuni. Mabingwa haya, ambayo ni tukio kuu lililoandaliwa na Shirikisho la Pan Afrika la Scrabble (PANASA), yalifanyika kuanzia Agosti 14 hadi 17, 2025, katika Chuo cha Brighton International huko Syokimau, Wilaya ya Machakos. Umoja wa Nigeria, ukionyesha ustadi wa kipekee na ujuzi wa kimkakati, ulichukua vyama vyote vya juu katika kategoria za Chini ya miaka 15 na Chini ya miaka 19. Katika sehemu ya Chini ya miaka 15, Sophia Ekeruche wa Nigeria aliongeza kichwa cha mabingwa, akionyesha ustadi wa kushangaza na utulivu wa kipekee kote katika ushindani. Timu ya Nigeria katika kategoria hii pia ilishinda dhahabu ya timu kwa ujumla, huku ikikabiliana na changamoto kubwa kutoka kwa nchi mwenyeji Kenya na timu yenye nguvu ya Ghana. Kategoria ya Chini ya miaka 19 ilishuhudia ushindani wa kusisimua, na Prestige Archibong wa Nigeria, ambaye alishinda kichwa cha mabingwa cha U-15 katika mabingwa ya kwanza, alidai tuzo kuu. Wachezaji wa Nigeria katika kundi hili la umri pia walishinda kichwa cha timu, ikithibitisha nafasi ya nchi hiyo kama nguvu kuu ya scrabble ya vijana barani Afrika. Mabingwa haya yalileta pamoja wachezaji scrabble vijana wa ahadi zaidi barani Afrika nzima, wakipewa jukwaa la kuimarisha ujuzi wao na kushindana kwa kiwango cha kimataifa. Ufanisi wa kuandaa tukio huko Kenya unaonyesha umaarufu na maendeleo ya scrabble barani Afrika. Timu ya Nigeria iliyoshinda inatarajiwa kupokea karibu ya shangwe ya mashujaa wao kurudi, utendaji wao bora ukiileta fahari na heshima kwa nchi hiyo.',
    image: '/ayscbanner.png',
    language: 'sw'
  },
  {
    id: '3',
    title: 'Blitzkrieg inashinda kwenye Triumvirate Showdown huko Nairobi',
    author: 'Juma Mwangi',
    date: 'Septemba 2025',
    created_at: '2025-01-05T09:15:00Z',
    summary: 'Mchezaji wa Kenya anadominia Tourno ya Blitz ya Triumvirate, kuonyesha umaarufu unaoongezeka wa Scrabble ya kasi katika Afrika.',
    content: 'Katika onyesho la kusisimua la kasi ya mchezo wa maneno na usahihi, mshindi wa Scrabble wa Kenya Samuel "Blitzkrieg" Ochieng alidominia Tourno ya Blitz ya Triumvirate iliyofanyika huko Nairobi wiki iliyopita. Tourno, ambayo ilishirikisha wachezaji 60 kutoka nchi 12 za Kiafrika, ilionyesha umaarufu unaoongezeka wa Scrabble ya kasi katika bara hilo. Ochieng, aliyejulikana kwa mtindo wake wa kucheza wa radi, alishinda kwa rekodi isiyo na dosari ya 15-0 katika mechi zote. "Scrabble ya Blitz inahitaji mtizamo tofauti," Ochieng alieleza baada ya ushindi wake. "Lazima uwe na imani na maoni yako na ucheze kwa asilimia. Ni kama mchezo wa king\'amizo kwa maili 100 kwa saa." Tourno ilizitumia muundo wa kipekee ambapo wachezaji walishindana katika michezo mitatu kwa wakati mmoja, wakibadilishana kati ya vibao kila dakika tano. Muundo huu, unaojulikana kama Triumvirate, hujaribu siyo maarifa ya maneno tu bali pia fikira ya kimkakati na ubadilikanaji. Wachezaji kutoka Uganda na Tanzania walichukua nafasi ya pili na ya tatu kwa mtiririko, na mapinduzi kadhaa kote wiki iliyopita ilishikilia watazamaji kwenye viti vyao. Ufanikio wa tukio hili umewapiga teua PANASA kufikiria kufanya muundo wa Triumvirate kuwa sehemu ya kawaida ya mashindano ya baadaye.',
    image: '/news3.jpg',
    language: 'sw'
  }
];

export const MOCK_PLAYERS = [
  {
    nick: 'LexiconLion',
    country: 'Nigeria',
    name: 'Chinwe Okoro',
    games: 127,
    rating: 1845,
    lastPlayed: '20250115'
  },
  {
    nick: 'WordWizard',
    country: 'Ghana',
    name: 'Kwame Asante',
    games: 98,
    rating: 1789,
    lastPlayed: '20250114'
  },
  {
    nick: 'ScrabbleSage',
    country: 'Kenya',
    name: 'Juma Mwangi',
    games: 112,
    rating: 1765,
    lastPlayed: '20250113'
  },
  {
    nick: 'TileTamer',
    country: 'South Africa',
    name: 'Pieter van der Merwe',
    games: 89,
    rating: 1723,
    lastPlayed: '20250112'
  },
  {
    nick: 'LetterLion',
    country: 'Uganda',
    name: 'Moses Okello',
    games: 76,
    rating: 1698,
    lastPlayed: '20250111'
  }
];