import { Event, NewsArticle, Player, Resource } from './types';

// Updated mock events to match Supabase schema
export const MOCK_EVENTS: any[] = [
  {
    id: 'wsc-2025',
    title: 'Ghana Welcomes the World: Accra to Host the 2025 World Scrabble Championship',
    date: 'November 15-22, 2025',
    location: 'Accra, Ghana',
    description: 'The prestigious World Scrabble Championship returns to Africa for the first time in over a decade. With players from 42 nations registered, anticipation builds for what promises to be a historic tournament. The event will be held at the luxurious Labadi Beach Hotel, with preliminary rounds beginning November 15th.',
    registration_link: '#',
    image: '/kofiBingo.png',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'aysc-2024',
    title: 'Future of African Scrabble Shines Bright as Nigeria Sweeps Youth Championship Titles',
    date: 'April 28, 2024',
    location: 'Kampala, Uganda',
    description: 'In a stunning display of skill and determination, Nigerian players dominated the inaugural African Youth Scrabble Championship. David Ojih emerged as the overall champion, while teammates Sarah Mohammed and Michael Adeyemi claimed second and third places respectively. The event saw participation from 18 African nations, highlighting the growing strength of youth Scrabble across the continent.',
    registration_link: '#',
    image: '/ayscbanner.png',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'triumvirate-2024',
    title: 'Blitzkrieg Triumphs at Triumvirate Showdown in Nairobi',
    date: 'April 25, 2024',
    location: 'Nairobi, Kenya',
    description: 'In a thrilling finale that kept spectators on the edge of their seats, Wellington Jighere emerged victorious at the highly anticipated Triumvirate Showdown. The tournament, which featured the top three seeds in a round-robin format, showcased some of the most intense Scrabble action ever witnessed on the African circuit. Jighere\'s win solidifies his position as the undisputed king of African Scrabble.',
    registration_link: '#',
    image: '/triumvirate.png',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
];

// Updated mock news to match Supabase schema
export const MOCK_NEWS: any[] = [
  {
    id: 'wsc-2025',
    title: 'Ghana Welcomes the World: Accra to Host the 2025 World Scrabble Championship',
    author: 'PANASA Communications',
    date: 'September 15, 2024',
    summary: 'The Pan African Scrabble Association is proud to announce that the 2025 World Scrabble Championship will be held in Accra, Ghana. This marks the first time in over a decade that the championship returns to the African continent.',
    content: 'The Pan African Scrabble Association is proud to announce that the 2025 World Scrabble Championship will be held in Accra, Ghana. This marks the first time in over a decade that the championship returns to the African continent.\n\nThe tournament will take place from November 15-22, 2025, at the prestigious Labadi Beach Hotel. With players from over 40 nations expected to participate, anticipation is building for what promises to be a historic event.\n\n"This is a momentous occasion for African Scrabble," said PANASA President Adekoyejo Adegbesan. "Hosting the World Championship on our continent not only celebrates our rich Scrabble heritage but also showcases the world-class facilities and hospitalityatility that Africa has to offer."\n\nRegistration details and tournament information will be released in the coming months. Stay tuned to our website and social media channels for updates.',
    image: '/kofiBingo.png',
    published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'aysc-2024',
    title: 'Future of African Scrabble Shines Bright as Nigeria Sweeps Youth Championship Titles',
    author: 'PANASA Youth Development',
    date: 'April 28, 2024',
    summary: 'In a stunning display of skill and determination, Nigerian players dominated the inaugural African Youth Scrabble Championship. David Ojih emerged as the overall champion, while teammates Sarah Mohammed and Michael Adeyemi claimed second and third places respectively.',
    content: 'In a stunning display of skill and determination, Nigerian players dominated the inaugural African Youth Scrabble Championship. David Ojih emerged as the overall champion, while teammates Sarah Mohammed and Michael Adeyemi claimed second and third places respectively.\n\nThe event, held in Kampala, Uganda, saw participation from 18 African nations, highlighting the growing strength of youth Scrabble across the continent.\n\n"This tournament has exceeded all our expectations," said PANASA Youth Coordinator Grace Atinuke. "The level of play was exceptional, and it\'s clear that the future of African Scrabble is in excellent hands."\n\nThe championship featured players aged 12-18 and included both individual and team competitions. The success of the event has already led to discussions about expanding the youth program across the continent.\n\nPANASA plans to make the African Youth Scrabble Championship an annual event, with the next tournament scheduled for 2025 in a yet-to-be-determined location.',
    image: '/ayscbanner.png',
    published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'triumvirate-2024',
    title: 'Blitzkrieg Triumphs at Triumvirate Showdown in Nairobi',
    author: 'PANASA Press Corps',
    date: 'April 25, 2024',
    summary: 'In a thrilling finale that kept spectators on the edge of their seats, Wellington Jighere emerged victorious at the highly anticipated Triumvirate Showdown. The tournament featured the top three seeds in a round-robin format.',
    content: 'In a thrilling finale that kept spectators on the edge of their seats, Wellington Jighere emerged victorious at the highly anticipated Triumvirate Showdown. The tournament, which featured the top three seeds in a round-robin format, showcased some of the most intense Scrabble action ever witnessed on the African circuit.\n\nJighere\'s win solidifies his position as the undisputed king of African Scrabble. The tournament featured a new format where the top three players competed in a round-robin style event, with each player facing the others multiple times.\n\n"This was a completely different experience from traditional tournaments," said Jighere after his victory. "The intensity was incredible, and having such a focused field really pushed everyone to their limits."\n\nThe event was held at the Nairobi Scrabble Center and attracted over 500 spectators over the three-day tournament. Plans are already underway to make this an annual event, with next year\'s tournament expected to feature an expanded field of top players.',
    image: '/triumvirate.png',
    published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
];

// Updated mock players to match Supabase schema
export const MOCK_PLAYERS: any[] = [
  {
    id: '1',
    nick: 'Welly',
    country: 'NG',
    name: 'Wellington Jighere',
    games: 89,
    rating: 2150,
    last_played: '2024-09-15',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    nick: 'AllanO',
    country: 'KE',
    name: 'Allan Oyende',
    games: 76,
    rating: 2125,
    last_played: '2024-09-10',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    nick: 'EnochN',
    country: 'NG',
    name: 'Enoch Nwali',
    games: 54,
    rating: 2110,
    last_played: '2024-09-05',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '4',
    nick: 'CharlesT',
    country: 'GH',
    name: 'Charles Tachie',
    games: 68,
    rating: 2098,
    last_played: '2024-09-12',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '5',
    nick: 'GitongaN',
    country: 'KE',
    name: 'Gitonga Nderitu',
    games: 81,
    rating: 2085,
    last_played: '2024-09-08',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '6',
    nick: 'NsikakE',
    country: 'NG',
    name: 'Nsikak Etim',
    games: 92,
    rating: 2077,
    last_played: '2024-09-14',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '7',
    nick: 'PatrickL',
    country: 'KE',
    name: 'Patrick Litunya',
    games: 65,
    rating: 2060,
    last_played: '2024-09-03',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '8',
    nick: 'StanleyN',
    country: 'KE',
    name: 'Stanley Njoroge',
    games: 59,
    rating: 2051,
    last_played: '2024-09-01',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '9',
    nick: 'EtaK',
    country: 'NG',
    name: 'Eta Karo',
    games: 101,
    rating: 2045,
    last_played: '2024-09-13',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '10',
    nick: 'ChristianM',
    country: 'GH',
    name: 'Christian Mensah',
    games: 51,
    rating: 2030,
    last_played: '2024-09-07',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
];

// Chatbase API Configuration
export const CHATBASE_CONFIG = {
  // Your Chatbase API key
  API_KEY: 'a0422b95-e042-489e-afb2-dfc4c77387c9',
  
  // Your Chatbase chatbot ID
  CHATBOT_ID: '6J5SNA3NVgeGUft4Yrsah',
  
  // Chatbase API endpoint
  API_URL: 'https://www.chatbase.co/api/v1/chat',
  
  // Enable streaming for real-time responses
  STREAMING_ENABLED: true,
};

// Updated mock resources to match Supabase schema (if needed in future)
export const MOCK_RESOURCES: any[] = [
  {
    id: 'rules-2024',
    title: 'PANASA Official Tournament Rules 2024',
    description: 'The complete and updated rulebook for all PANASA-sanctioned events.',
    link: '/panasa-official-rules-2024.pdf',
    type: 'PDF',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'ratings-guide',
    title: 'Guide to the New Rating System',
    description: 'An explanation of how the new player rating system works.',
    link: '/rating-system-guide.pdf',
    type: 'PDF',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'bylaws',
    title: 'PANASA Constitution & Bylaws',
    description: 'The governing documents of the Pan African Scrabble Association.',
    link: '/panasa-bylaws.docx',
    type: 'DOC',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'wsc-words',
    title: 'Official Word Source',
    description: 'Link to the Collins Scrabble Words (CSW21) dictionary used in tournaments.',
    link: 'https://scrabbleplayers.org/w/NASPA_Word_List',
    type: 'LINK',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];