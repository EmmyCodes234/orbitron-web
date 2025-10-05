// This file exports all mock data used in the application

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
    title: 'Ghana Welcomes the World: Accra to Host the 2025 World Scrabble Championship',
    author: 'Kwame Asante',
    date: 'November 2025',
    created_at: '2025-01-15T10:00:00Z',
    summary: 'The Ghana Scrabble Association has been selected to host the prestigious 2025 World Scrabble Championship, bringing together players from over 40 countries.',
    content: 'In a historic moment for African Scrabble, the Ghana Scrabble Association has been chosen to host the 2025 World Scrabble Championship in Accra. This marks the first time the championship will be held on the African continent, showcasing the growing strength of African players in the international Scrabble community. The tournament is expected to attract over 200 players from more than 40 countries, competing for the coveted title of World Scrabble Champion. The event will take place at the Accra International Conference Centre from March 10-20, 2025.',
    image: '/news1.jpg',
    language: 'en'
  },
  {
    id: '2',
    title: 'Future of African Scrabble Shines Bright as Nigeria Sweeps Youth Championship Titles',
    author: 'Adewale Johnson',
    date: 'October 2025',
    created_at: '2025-01-10T14:30:00Z',
    summary: 'Nigerian players dominated the recent African Youth Scrabble Championship, claiming all top positions and signaling a bright future for the sport on the continent.',
    content: 'The 2025 African Youth Scrabble Championship concluded with an unprecedented sweep by Nigerian players, who claimed all top positions in both individual and team categories. This remarkable achievement highlights the strength of youth development programs in Nigeria and bodes well for the future of African Scrabble. The championship, held in Cape Town, South Africa, featured 85 participants from 15 African countries. The top three individual winners were all from Nigeria: 16-year-old Amara Okonkwo claimed first place, followed by 15-year-old Chika Eze in second, and 17-year-old Tunde Adeyemi in third. The Nigerian team also secured the team championship title. "This is a testament to the investment we\'ve made in our youth programs," said Nigerian Scrabble Federation President Adewale Johnson. "We believe these young champions will lead African Scrabble to even greater heights in the coming years."',
    image: '/news2.jpg',
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
    title: 'Le Ghana accueille le monde : Accra organisera le Championnat mondial de Scrabble 2025',
    author: 'Kwame Asante',
    date: 'Novembre 2025',
    created_at: '2025-01-15T10:00:00Z',
    summary: 'L\'Association de Scrabble du Ghana a été sélectionnée pour organiser le prestigieux Championnat mondial de Scrabble 2025, réunissant des joueurs de plus de 40 pays.',
    content: 'Dans un moment historique pour le Scrabble africain, l\'Association de Scrabble du Ghana a été choisie pour organiser le Championnat mondial de Scrabble 2025 à Accra. Cela marque la première fois que le championnat se tiendra sur le continent africain, mettant en valeur la force croissante des joueurs africains dans la communauté internationale de Scrabble. Le tournoi devrait attirer plus de 200 joueurs de plus de 40 pays, en compétition pour le titre convoité de Champion du monde de Scrabble. L\'événement se déroulera au Centre international de conférences d\'Accra du 10 au 20 mars 2025.',
    image: '/news1.jpg',
    language: 'fr'
  },
  {
    id: '2',
    title: 'L\'avenir du Scrabble africain brille de mille feux alors que le Nigeria remporte tous les titres du Championnat de la jeunesse',
    author: 'Adewale Johnson',
    date: 'Octobre 2025',
    created_at: '2025-01-10T14:30:00Z',
    summary: 'Les joueurs nigérians ont dominé le récent Championnat africain de Scrabble chez les jeunes, remportant toutes les premières places et signalant un avenir prometteur pour le sport sur le continent.',
    content: 'Le Championnat africain de Scrabble chez les jeunes 2025 s\'est terminé avec un succès sans précédent des joueurs nigérians, qui ont remporté toutes les premières places dans les catégories individuelles et par équipes. Cette réalisation remarquable met en évidence la force des programmes de développement de la jeunesse au Nigeria et présage un bel avenir pour le Scrabble africain. Le championnat, organisé au Cap, en Afrique du Sud, a réuni 85 participants de 15 pays africains. Les trois premiers individuels étaient tous du Nigeria : Amara Okonkwo, 16 ans, a remporté la première place, suivie de Chika Eze, 15 ans, en deuxième place, et de Tunde Adeyemi, 17 ans, en troisième place. L\'équipe nigériane a également remporté le titre de championne par équipe. "C\'est un témoignage de l\'investissement que nous avons fait dans nos programmes de jeunesse", a déclaré le président de la Fédération nigériane de Scrabble, Adewale Johnson. "Nous croyons que ces jeunes champions mèneront le Scrabble africain vers des sommets encore plus élevés dans les années à venir."',
    image: '/news2.jpg',
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
    title: 'Ghana inakaribisha Dunia: Accra itakuwa mwenyeji wa Mabingwa wa Dunia ya Scrabble 2025',
    author: 'Kwame Asante',
    date: 'Novemba 2025',
    created_at: '2025-01-15T10:00:00Z',
    summary: 'Shirikisho la Scrabble la Ghana limechaguliwa kuandaa Mabingwa ya Dunia ya Scrabble 2025, ikileta pamoja wachezaji kutoka nchi zaidi ya 40.',
    content: 'Katika hatua ya kihistoria kwa ajili ya Scrabble ya Kiafrika, Shirikisho la Scrabble la Ghana limechaguliwa kuandaa Mabingwa ya Dunia ya Scrabble 2025 huko Accra. Hii ni mara ya kwanza mabingwa yatakuwa nchini Afrika, kuonyesha nguvu inayoongezeka ya wachezaji wa Kiafrika katika jamii ya kimataifa ya Scrabble. Mashindano yanatarajiwa kuvutia wachezaji zaidi ya 200 kutoka nchi zaidi ya 40, wanaungana kwa ajili ya kichwa cha Mabingwa ya Dunia ya Scrabble. Tukio litafanyika katika Kitovu cha Mikutano cha Kimataifa cha Accra kuanzia Machi 10 hadi 20, 2025.',
    image: '/news1.jpg',
    language: 'sw'
  },
  {
    id: '2',
    title: 'Baadaye ya Scrabble ya Kiafrika inang\'aa kwa kuwa Nigeria inachukua vichwa vyote vya Mabingwa ya Vijana',
    author: 'Adewale Johnson',
    date: 'Oktoba 2025',
    created_at: '2025-01-10T14:30:00Z',
    summary: 'Wachezaji wa Nigeria walidominia Mabingwa ya Vijana ya Scrabble ya Kiafrika ya hivi karibuni, wakichukua nafasi zote za juu na kuashiria siku njema kwa mchezo huo bara nzima.',
    content: 'Mabingwa ya Vijana ya Scrabble ya Kiafrika ya 2025 yalifungwa kwa ushindi usiokuwa na mfano wa wachezaji wa Nigeria, ambao walichukua nafasi zote za juu katika kategoria za mtu binafsi na timu. Ufanikio huu wa ajabu unaonyesha nguvu za mipango ya maendeleo ya vijana huko Nigeria na inaonekana vizuri kwa ajili ya Scrabble ya Kiafrika. Mabingwa, yaliyofanyika huko Cape Town, Afrika Kusini, yalishirikisha washiriki 85 kutoka nchi 15 za Kiafrika. Washindi watatu wa kwanza walikuwa wote kutoka Nigeria: Amara Okonkwo, mwenye umri wa miaka 16, alishinda nafasi ya kwanza, akiwa na Chika Eze, mwenye umri wa miaka 15, katika nafasi ya pili, na Tunde Adeyemi, mwenye umri wa miaka 17, katika nafasi ya tatu. Timu ya Nigeria pia ilishinda kichwa cha mabingwa ya timu. "Hii ni ushahidi wa uwekezaji tuliofanya katika mipango yetu ya vijana," alisema Rais wa Shirikisho la Scrabble la Nigeria Adewale Johnson. "Tunaamini kuwa viongozi hawa vijana watapeleka Scrabble ya Kiafrika hadi kwenye viwango vya juu zaidi katika miaka ijayo."',
    image: '/news2.jpg',
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