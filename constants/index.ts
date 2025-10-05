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
  {
    id: '1',
    title: 'Ghana Welcomes the World: Accra to Host the 2025 World Scrabble Championship',
    author: 'Kwame Asante',
    created_at: '2025-01-15T10:00:00Z',
    summary: 'The Ghana Scrabble Association has been selected to host the prestigious 2025 World Scrabble Championship, bringing together players from over 40 countries.',
    content: 'In a historic moment for African Scrabble, the Ghana Scrabble Association has been chosen to host the 2025 World Scrabble Championship in Accra. This marks the first time the championship will be held on the African continent, showcasing the growing strength of African players in the international Scrabble community. The tournament is expected to attract over 200 players from more than 40 countries, competing for the coveted title of World Scrabble Champion. The event will take place at the Accra International Conference Centre from March 10-20, 2025.',
    image: '/news1.jpg'
  },
  {
    id: '2',
    title: 'Future of African Scrabble Shines Bright as Nigeria Sweeps Youth Championship Titles',
    author: 'Adewale Johnson',
    created_at: '2025-01-10T14:30:00Z',
    summary: 'Nigerian players dominated the recent African Youth Scrabble Championship, claiming all top positions and signaling a bright future for the sport on the continent.',
    content: 'The 2025 African Youth Scrabble Championship concluded with an unprecedented sweep by Nigerian players, who claimed all top positions in both individual and team categories. This remarkable achievement highlights the strength of youth development programs in Nigeria and bodes well for the future of African Scrabble. The championship, held in Cape Town, South Africa, featured 85 participants from 15 African countries. The top three individual winners were all from Nigeria: 16-year-old Amara Okonkwo claimed first place, followed by 15-year-old Chika Eze in second, and 17-year-old Tunde Adeyemi in third. The Nigerian team also secured the team championship title. "This is a testament to the investment we\'ve made in our youth programs," said Nigerian Scrabble Federation President Adewale Johnson. "We believe these young champions will lead African Scrabble to even greater heights in the coming years."',
    image: '/news2.jpg'
  },
  {
    id: '3',
    title: 'Blitzkrieg Triumphs at Triumvirate Showdown in Nairobi',
    author: 'Juma Mwangi',
    created_at: '2025-01-05T09:15:00Z',
    summary: 'Kenyan player dominates the fast-paced Triumvirate Blitz Tournament, showcasing the growing popularity of speed Scrabble across Africa.',
    content: 'In a thrilling display of wordplay speed and precision, Kenyan Scrabble ace Samuel "Blitzkrieg" Ochieng dominated the Triumvirate Blitz Tournament held in Nairobi last weekend. The tournament, which featured 60 players from 12 African countries, showcased the growing popularity of speed Scrabble across the continent. Ochieng, known for his lightning-fast play style, secured victory with a perfect 15-0 record across all matches. "Blitz Scrabble requires a different mindset," Ochieng explained after his victory. "You have to trust your instincts and play the percentages. It\'s chess at 100 miles per hour." The tournament used a unique format where players competed in three simultaneous games, rotating between boards every five minutes. This format, known as Triumvirate, tests not only word knowledge but also strategic thinking and adaptability. Players from Uganda and Tanzania took second and third places respectively, with several upsets throughout the weekend keeping spectators on the edge of their seats. The success of the event has prompted PANASA to consider making the Triumvirate format a regular feature in future tournaments.',
    image: '/news3.jpg'
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