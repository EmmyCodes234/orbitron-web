const sw = {
  // Navigation
  navigation: {
    home: 'Nyumbani',
    about: 'Kuhusu',
    ratings: 'Daraja',
    events: 'Matukio',
    news: 'Habari',
    federations: 'Shirikisho',
    resources: 'Rasilimali',
    gallery: 'Matunzio',
    contact: 'Wasiliana',
    admin: 'Msimamizi',
    payments: 'Malipo',
    activity: 'Shughuli',
    support: 'Msaada',
    tools: 'Zana'
  },

  // Homepage
  home: {
    title: 'Nyumba ya Scrabble katika Afrika',
    subtitle: 'Kituo rasmi cha jamii ya Scrabble katika Afrika nzima. Kuunganisha wachezaji, kuendeleza ubora, na kusherehekea nguvu za maneno.',
    playerRankings: 'Daraja za Wachezaji',
    findFederation: 'Tafuta Shirikisho Lako',
    memberNations: 'Nchi Zetu Wanachama',
    countries: 'Nchi',
    players: 'Wachezaji',
    years: 'Miaka',
    worldChampions: 'Mshindi wa Dunia wa Scrabble',
    latestNews: 'Habari Mpya',
    upcomingEvents: 'Matukio Yajayo',
    viewAll: 'Tazama Zote'
  },

  // Tools Page
  tools: {
    title: 'Zana za Scrabble',
    panasaBot: {
      description: 'Shirikiana na msaidizi wetu wa Scrabble unaotumia AI kwa sheria, mikakati na uthibitishaji wa maneno.',
      launch: 'Anzisha PANASA Bot'
    },
    wordChecker: {
      title: 'Chombo cha Kuthibitisha Maneno',
      heading: 'Thibitisha Maneno ya Scrabble',
      description: 'Angalia kama neno ni halali katika kamusi ya CSW24',
      cardDescription: 'Thibitisha kama neno ni halali katika kamusi rasmi ya Scrabble',
      placeholder: 'Ingiza neno...',
      check: 'Angalia',
      checking: 'Inaangalia...',
      poweredBy: 'Inaendeshwa na kamusi ya CSW24 (Collins Scrabble Words 2024)',
      processing: 'Inachakata...',
      launch: 'Anzisha Kikangalizi cha Maneno'
    },
    anagramSolver: {
      title: 'Kisuluhishi cha Mpangilio wa Herufi',
      heading: 'Suluhisha Anagramu za Scrabble',
      description: 'Pata maneno yote halali yanayoweza kutengenezwa kwa herufi zilizotolewa',
      cardDescription: 'Gundua maneno yote yanayowezekana kutoka kwa seti ya herufi',
      placeholder: 'Ingiza herufi...',
      blankTileHint: 'Tumia "?" kwa vigae vya kubwa',
      solve: 'Suluhisha',
      solving: 'Inasuluhisha...',
      results: 'Matokeo',
      letter: 'herufi{count, plural, one {} other {s}}',
      words: 'maneno',
      noWordsFound: 'Hakuna maneno halali yaliyopatikana',
      poweredBy: 'Inaendeshwa na kamusi ya CSW24 (Collins Scrabble Words 2024)',
      processing: 'Inachakata...',
      launch: 'Anzisha Kisuluhishi cha Anagramu'
    },
    dictionary: {
      title: 'Kamusi',
      description: 'Zana zote zinaendeshwa na kamusi rasmi ya Collins Scrabble Words 2024 (CSW24) yenye zaidi ya maneno 270,000.',
      poweredBy: 'Inaendeshwa na kamusi ya CSW24 (Collins Scrabble Words 2024)'
    }
  },

  // Ratings Page
  ratings: {
    title: 'Daraja za Wachezaji',
    subtitle: 'Daraja rasmi za wachezaji wa PANASA na takwimu',
    searchPlaceholder: 'Tafuta wachezaji...',
    allCountries: 'Nchi Zote',
    show: 'Onyesha',
    results: 'Inaonyesha {start} - {end} kati ya wachezaji {total}',
    filtered: '(imechujwa kutoka kwa jumla ya {total})',
    clearFilters: 'Futa vichujio vyote',
    rank: '#',
    player: 'Mchezaji',
    rating: 'Daraja',
    country: 'Nchi',
    games: 'Michezo',
    lastPlayed: 'Mchezo wa Mwisho',
    noPlayers: 'Hakuna wachezaji waliopatikana kulingana na vigezo vyako.',
    noResultsFound: 'Hakuna wachezaji waliopatikana kwa "{term}"',
    noResultsSuggestions: 'Jaribu kutafuta:',
    suggestionDifferentSpelling: 'Tahajia tofauti',
    suggestionPlayerNickname: 'Jina la utani la mchezaji',
    suggestionClearFilters: 'Futa vichujio',
    showingAll: 'Inaonyesha matokeo yote {count}',
    firstPage: 'Ukurasa wa kwanza',
    previousPage: 'Ukurasa uliopita',
    nextPage: 'Ukurasa unaofuata',
    lastPage: 'Ukurasa wa mwisho',
    page: 'Ukurasa',
    noSuggestions: 'Hakuna mapendekezo yanayopatikana'
  },

  // Events Page
  events: {
    title: 'Matukio Yajayo',
    subtitle: 'Endelea na taarifa za mashindano, makambo yote ya PANASA, na matukio ya Scrabble katika Afrika nzima.',
    noEvents: 'Hakuna matukio yajayo kwa sasa. Angalia tena hivi karibuni kwa masasisho.',
    eventDetails: 'Maelezo ya Tukio',
    date: 'Tarehe',
    location: 'Mahali',
    description: 'Maelezo',
    organizer: 'Mwandalizi',
    contact: 'Mawasiliano',
    website: 'Tovuti',
    register: 'Jisajili kwa Tukio',
    backToEvents: 'Rudi kwa matukio yote',
    eventNotFound: 'Tukio halijapatikana'
  },

  // News Page
  news: {
    title: 'Habari na Matangazo',
    subtitle: 'Endelea na taarifa za habari na matangazo ya hivi karibuni kutoka kwa PANASA.',
    noNews: 'Hakuna makala ya habari yanayopatikana kwa sasa.',
    articleNotFound: 'Makala haipatikani',
    author: 'Mwandishi',
    published: 'Imechapishwa',
    readFullStory: 'Soma Habari Kamili',
    backToNews: 'Rudi kwa habari zote'
  },

  // Federations Page
  federations: {
    title: 'Shirikisho',
    subtitle: 'Unganisha na shirikisho za wanachama wa PANASA katika Afrika nzima. Kila shirikisho hulinda shughuli za Scrabble katika nchi zao na kutumika kama lango kuingia kwa mchezo wa ushindani.',
    searchLabel: 'Tafuta Shirikisho',
    searchPlaceholder: 'Tafuta kwa nchi au jina la shirikisho...',
    noFederations: 'Hakuna shirikisho zilizopatikana kulingana na utafutaji wako.',
    noData: 'Hakuna data ya shirikisho inayopatikana kwa sasa.',
    fetchError: 'Hitilafu imetokea wakati wa kuleta data ya shirikisho. Tafadhali jaribu tena baadaye.',
    president: 'Rais',
    secretary: 'Katibu',
    email: 'Barua pepe',
    phone: 'Simu',
    address: 'Anwani',
    website: 'Tovuti',
    viewDetails: 'Tazama Maelezo'
  },

  // Resources Page
  resources: {
    title: 'Rasilimali',
    subtitle: 'Vifaa vya elimu, vitabu vya sheria, na rasilimali kwa wachezaji na wapanga mashindano ya Scrabble.',
    download: 'Pakua',
    fileSize: 'Ukubwa wa Faili',
    lastUpdated: 'Imesasishwa Mwisho',
    underConstruction: 'Chini ya Ujenzi',
    comingSoon: 'Tunafanya kazi kwenye kukusanya mkusanyiko wa kina wa rasilimali kwa jamii ya PANASA, ikiwa ni pamoja na sheria rasmi, viongozi vya mashindano, na vifaa vya elimu.',
    checkBack: 'Tafadhali angalia tena hivi karibuni kwa masasisho!',
    officialRules: 'Sheria Rasmi',
    rulesDescription: 'Vitabu vya sheria kamili na kanuni za mashindano',
    wordLists: 'Orodha za Maneno',
    wordListsDescription: 'Kamusi rasmi na vyanzo vya maneno',
    tournamentResources: 'Rasilimali za Mashindano',
    tournamentResourcesDescription: 'Vifaa kwa wapanga na maafisa wa mashindano'
  },

  // Gallery Page
  gallery: {
    title: 'Matunzio',
    subtitle: 'Picha kutoka kwa matukio, mashindano, na shughuli za jamii za PANASA katika Afrika nzima.',
    noPhotos: 'Hakuna picha zinazopatikana katika matunzio kwa sasa.',
    underConstruction: 'Chini ya Ujenzi',
    comingSoon: 'Tunafanya kazi kwenye kujenga matunzio ya kushangaza ili kuonyesha vipindi bora kutoka kwa matukio ya PANASA, mashindano, na shughuli za jamii katika Afrika nzima.',
    checkBack: 'Tafadhali angalia tena hivi karibuni kwa masasisho!',
    tournamentHighlights: 'Vipindi vya Mashindano',
    tournamentDescription: 'Moments za kusisimua kutoka kwa Mabingwa wa PANASA na mashindano ya kanda',
    communityEvents: 'Matukio ya Jamii',
    communityDescription: 'Warsha, kipindi cha mafunzo, na programu za kufikia jamii',
    playerSpotlights: 'Mwangaza wa Wachezaji',
    playerDescription: 'Wasifu na mafanikio ya wachezaji bora wa Scrabble'
  },

  // Contact Page
  contact: {
    title: 'Wasiliana Nasi',
    subtitle: 'Je, una maswali kuhusu mashindano, daraja, au shughuli za PANASA? Wasiliana nasi. Tuko hapa kusaidia jamii ya Scrabble ya Afrika kuendelea.',
    getInTouch: 'Wasiliana Nasi',
    generalInquiries: 'Maswali ya Jumla',
    phone: 'Simu',
    address: 'Anwani',
    officeHours: 'Saa za Ofisi',
    memberFederations: 'Shirikisho za Wanachama wa PANASA',
    federationInquiries: 'Kwa maswali mahususi ya nchi, tafadhali wasiliana na shirikisho lako la Scrabble la ndani.',
    viewAllFederations: 'Tazama Shirikisho Zote',
    fullName: 'Jina Kamili',
    emailAddress: 'Anwani ya Barua Pepe',
    message: 'Ujumbe',
    sendMessage: 'Tuma Ujumbe',
    sending: 'Inatuma...',
    messageSent: 'Ujumbe wako umetumwa kwa mafanikio!',
    sendError: 'Hitilafu imetokea wakati wa kutuma ujumbe wako. Tafadhali jaribu tena.',
    missingFields: 'Tafadhali jaza sehemu zote zinazohitajika.',
    invalidEmail: 'Tafadhali ingiza anwani ya barua pepe inayofaa.'
  },

  // Admin Page
  admin: {
    title: 'Dashibodi ya Msimamizi',
    loginTitle: 'Kuingia kwa Msimamizi',
    username: 'Jina la Mtumiaji',
    password: 'Nenosiri',
    login: 'Ingia',
    logout: 'Toka',
    invalidCredentials: 'Kitambulisho batili. Tafadhali jaribu tena.',
    welcome: 'Karibu kwenye Dashibodi ya Msimamizi ya PANASA. Hapa unaweza kusimamia yote yaliyomo kwenye tovuti.',
    managePlayers: 'Simamia daraja na maelezo ya wachezaji',
    manageEvents: 'Simamia matukio na mashindano yajayo',
    manageNews: 'Simamia makala ya habari na matangazo',
    manageFederations: 'Simamia maelezo ya shirikisho'
  },

  // Search
  search: {
    placeholder: 'Tafuta wachezaji, habari, matukio...',
    mobilePlaceholder: 'Tafuta...',
    noResults: 'Hakuna matokeo yaliyopatikana',
    tryDifferentKeywords: 'Jaribu maneno tofauti au angalia tahajia yako',
    searchResults: 'Matokeo ya Utafutaji',
    foundResults: 'Imepata matokeo {count} kwa "{query}"',
    suggestions: {
      players: 'Daraja za Wachezaji',
      playersDesc: 'Tazama daraja zote za wachezaji',
      events: 'Matukio Yajayo',
      eventsDesc: 'Angalia mashindano yajayo',
      news: 'Habari Mpya',
      newsDesc: 'Soma matangazo ya hivi karibuni',
      federations: 'Shirikisho',
      federationsDesc: 'Tafuta shirikisho lako la ndani'
    }
  },

  // About Page
  about: {
    title: 'Kuhusu PANASA',
    whoWeAre: 'Sisi Nani',
    introduction: 'PANASA ni shirika la michezo la kimataifa, shirika lisilo la kiserikali lenye hadhi yake ya kisheria. Sisi ni mwili rasmi unaodhibiti mchezo wa Scrabble katika bara la Afrika nzima, ukijumuisha vyama vyote vya kitaifa vya Scrabble vya Afrika ambavyo hushiriki katika Mashindano ya Dunia ya Scrabble (WSC) na vinatambuliwa na Bodi ya Dunia ya Scrabble (WSB).',
    leadershipPhoto: 'Picha ya Uongozi wa PANASA',
    placeholderPhoto: 'Sehemu ya picha rasmi ya kikundi',
    meetTheTeam: 'Kutana na Timu',
    leadershipDescription: 'Viongozi wenye dedikesheni wanaoendeleza PANASA',
    lesterMorrisBio: 'Mtu wa Liberia anayependa maendeleo ya Scrabble katika Liberia. Mtendaji, mfanyabiashara na mkulima anayejitolea kukuza mchezo huu katika taifa zima.',
    adekoyejoBio: 'Mshauri wa Mitihani ya Programu kwa kazi, uongozi wake umewaletea umakini mpya na ubunifu kwenye Scrabble ya Kiafrika tangu alichaguliwa Oktoba 2022. Amesimamia miradi muhimu, ikijumuisha uzinduzi wa Kikombe cha Rais cha PANASA na ujumbe wa kihistoria wa Scrabble kama mchezo wa maonyesho katika Michezo ya Kiafrika. Mchezaji anayetumika na mwenye kiwango cha juu, yeye amejitolea kuongeza msingi wa mchezo na kuanzisha miundo kwa ajili ya maendeleo ya vijana wa Kiafrika katika bara nzima.',
    umarFaruqBio: 'Mwenyeji wa Zamani wa Kamati ya Ustawi, Mwenyeji wa Zamani wa Idara ya Kiufundi, na Afisa wa Daraja wa Shirikisho la Scrabble la Nigeria (NSF), na kwa sasa anatumika kama Afisa wa Daraja wa Shirikisho la Pan Afrika la Scrabble (PANASA). Kama Afisa Mkuu wa Uendeshaji wa Kituo cha IBI Yola, anapeleka kliniki na mashindano ya Scrabble ambayo yanaboresha ulishe, mawazo ya kihitari na ushirikiano wa jamii. Ana shauku ya maendeleo ya vijana, anatumia Scrabble kama chombo cha nguvu cha elimu, uongozi na ukuaji wa kijamii.',
    firstBlackChampion: 'Mtu wa kwanza na pekee kwa sasa kushinda Mabingwa ya Dunia ya Scrabble ya Kiingereza (WESPAC) huko Perth, Australia mwaka 2015.',
    vicePresident1: 'Makamu wa Rais 1',
    vicePresident2: 'Makamu wa Rais 2',
    treasurer: 'Mhazini',
    directors: 'Wakurugenzi',
    tournamentDirector: 'Mkurugenzi wa Mashindano',
    technicalDirector: 'Mkurugenzi wa Kiufundi',
    president: 'Rais',
    ratingsOfficer: 'Afisa wa Daraja',
    viewFullProfile: 'Tazama wasifu kamili',
    founded1994: 'Ilianzishwa mwaka wa 1994',
    bornFromVision: 'PANASA ilizaliwa kutoka kwa maono ya kuunganisha jamii za Scrabble za Afrika. Wazo la Kiongozi wa Afrika ya Scrabble kilikuwa cha Kenya Amateur Scrabble Association (sasa Scrabble Kenya), kwa msaada kamili kutoka Scrabble Association of Nigeria (sasa Nigeria Scrabble Federation) na vyama vingine vya Scrabble katika Afrika nzima.',
    mainObjective: 'Lengo kuu la shirikisho lilikuwa kukuza mchezo wa Scrabble katika Afrika na kupanga mashindano ya kila miaka miwili ya Scrabble kati ya nchi wanachama. Toleo la',
    africanChampionship: '14 la Mabingwa wa Afrika',
    heldInLusaka: 'limefanyika Lusaka, Zambia kutoka 21-24 Oktoba 2022.',
    foundingMembers1994: 'Wanachama wa Kuanzia (1994)',
    threeCountries: 'Kulikuwa na nchi tatu tu zilizokuwa zimehudhuria mkutano wa kwanza wa PANASA.',
    foundingMeeting: 'Mkutano wa Kuanzia 1994',
    historicalPhoto: 'Picha ya kihistoria',
    metricsSayItAll: 'Takwimu Zetu Zinasema Yote',
    successSeries: 'Mafanikio ni Mfululizo wa Usengenye!',
    memberCountries: 'Nchi Wanachama 12',
    acrossAfrica: 'Katika bara la Afrika nzima',
    registeredPlayers: 'Wachezaji Waliosajiliwa 15,000+',
    tournamentParticipants: 'Washiriki wa mashindano',
    worldChampions: 'Mshindi wa Dunia 1',
    producedIn2015: 'Afrika ilizalisha mwaka 2015',
    yearsStrong: 'Miaka Imara 29',
    since1994: 'Tangu kuanzia mwaka 1994',
    scrabbleMillions: 'Scrabble inachezwa katika mamilioni ya nyumba katika bara la Afrika nzima. Takwimu hizi zinawakilisha aspekti ya ushindani iliyopangwa ya mchezo katika Afrika.',
    tournamentAction: 'Vitendo vya Mashindano',
    playersAction: 'Wachezaji Katika Kitendo',
    championshipMoments: 'Nyakati za Mabingwa',
    currentlyConsists: 'PANASA kwa sasa inajumuisha',
    twelveMemberCountries: 'nchi kumi na mbili (12) wanachama',
    acrossContinent: 'katika bara la Afrika nzima:',
    africaMap: 'Ramani ya Afrika',
    showingMemberCountries: 'Inaonyesha nchi wanachama za PANASA',
    interactiveMap: 'Ramani inayotumika',
    ourChampionships: 'Mabingwa Yetu',
    biAnnualChampionship: 'Mabingwa ya Afrika kwa Miaka Mbili',
    premierChampionship: 'Mashindano ya kipekee ya bara yanayounganisha wachezaji bora zaidi kutoka Afrika nzima.',
    eastCentralChampionship: 'Mabingwa ya Afrika ya Mashariki na Kati',
    regionalChampionshipEast: 'Mashindano ya kanda kwa mataifa ya Afrika ya Mashariki na Kati.',
    westAfricaChampionship: 'Mabingwa ya Afrika ya Magharibi',
    regionalChampionshipWest: 'Mashindano ya kanda kwa mataifa ya Afrika ya Magharibi.',
    youthChampionship: 'Mabingwa ya Vijana wa Afrika',
    developingNextGeneration: 'Kukuza kizazi kijacho cha mabingwa wa Scrabble wa Afrika.',
    presidentsCup: "Kikombe cha Rais",
    eliteTournament: 'Mashindano ya kiwango cha juu yaliyoongezwa kwenye kalenda ya PANASA mwaka 2023.',
    additionalTournaments: 'Zaidi ya hayo, mashindano kadhaa yanapangwa na mataifa wanachama katika nchi zao mbalimbali kila mwaka.',
    worldChampionAchievement: 'Mafanikio ya Mshindi wa Dunia',
    africaProduced: 'Afrika ilizalisha Mshindi wa Dunia wa Scrabble mwaka 2015',
    historicMilestone: ', ikishangaza hatua ya kihistoria kwa bara na kuonyesha utalent na kujitolea wa wachezaji wa Scrabble wa Afrika kwenye jukwaa la kimataifa.',
    worldChampion2015: 'Mshindi wa Dunia 2015',
    victoryCelebration: 'Picha ya sherehe ya ushindi'
  },

  // Footer
  footer: {
    description: 'Kituo rasmi cha Shirikisho la Pan Afrika la Scrabble. Kukuza ubora katika Scrabble katika Afrika nzima.',
    navigation: 'Urambazaji',
    connect: 'Unganisha',
    copyright: 'Shirikisho la Pan Afrika la Scrabble. Haki zote zimehifadhiwa.'
  },

  // Common
  loading: 'Inapakia...',
  error: 'Hitilafu imetokea. Tafadhali jaribu tena.',
  goBack: 'Rudi Nyuma',
  close: 'Funga',

  // ASC Page
  asc: {
    title: 'Mabingwa ya Scrabble ya Afrika',
    badge: 'Historia na Utukufu',
    description: 'Mabingwa ya Scrabble ya Afrika (ASC) ni mashindano ya bara ya kwanza yaliyoandaliwa na Shirikisho la Scrabble la Pan-Afrika (PANASA). Tangu kuanzishwa kwake mwaka 1994, imekuwa uwanja wa vita wa mwisho kwa mafundi wa maneno bora wa bara.',
    highlights: 'Vipengele Muhimu',
    hallOfFame: 'Ukumbi wa Umaarufu',
    totalEditions: 'Jumla ya Matoleo: {count}',
    schedulingNote: 'Mwongozo wa Ratiba: Mashindano hufanyika kwa kawaida kila baada ya miaka miwili. Pengo lilitokea kati ya 2018 na 2022 kutokana na janga la COVID-19.',
    backToHome: 'Rudi Nyumbani',
    table: {
      edition: 'Tol.',
      year: 'Mwaka',
      winner: 'Mshindi',
      country: 'Nchi',
      host: 'Mwenyeji'
    },
    cards: {
      edition: 'Toleo la {edition}',
      winner: 'Mshindi',
      country: 'Nchi',
      host: 'Mwenyeji'
    },
    highlightsList: {
      nigeriaDominance: {
        title: "Utawala wa Nigeria",
        content: "Wachezaji wa Nigeria wameshinda matoleo 14 kati ya 15 yaliyofanyika hadi sasa, wakiimarisha hadhi yao kama nguvu ya Scrabble ya Afrika."
      },
      multipleChampions: {
        title: "Mabingwa wa Mara Nyingi",
        content: "Dennis Ikekeregor (2004, 2006) na Wellington Jighere (2008, 2010) ni wachezaji pekee walioshinda taji mara mbili."
      },
      trevorHovelmeier: {
        title: "Trevor Hovelmeier",
        content: "Anabaki kuwa mtu asiye Mnigeria pekee aliyewahi kushinda taji la kibinafsi la Afrika, akilinyakua kwa Afrika Kusini mwaka 2002."
      },
      youngestChampion: {
        title: "Bingwa Mdogo Zaidi",
        content: "Oluwatimilehin Doko aliweka historia kwa kuwa mshindi mdogo zaidi aliposhinda toleo la 15 nchini Kigali, Rwanda, akiwa na umri wa miaka 24."
      }
    },
    timeline: {
      title: 'Mabingwa wa Afrika',
      subtitle: 'Kuheshimu hadithi walioshinda Mabingwa ya Scrabble ya Afrika.',
      viewHistory: 'Tazama Historia Kamili',
      host: 'Mwenyeji:'
    }
  },

  // Payments Page
  payments: {
    title: 'Malipo ya Mashindano na Maombi ya Daraja',
    subtitle: 'Dhibiti malipo ya mashindano na omba daraja za PANASA kwa matukio yako',
    paymentPortal: 'Lango la Malipo',
    ratingApplication: 'Maombi ya Daraja',
    tournamentPayments: 'Malipo ya Mashindano',
    paymentDescription: 'Fanya malipo salama kwa mashindano na matukio ya PANASA. Malipo yote yanashughulikiwa kwa usalama na risiti zitatumwa kwa barua pepe yako.',
    howItWorks: 'Jinsi Inavyofanya Kazi',
    step1: 'Chagua mashindano unayotaka kulipa',
    step2: 'Ingiza kiasi cha malipo na maelezo yako',
    step3: 'Kamilisha mchakato salama wa malipo',
    makePayment: 'Fanya Malipo',
    tournamentName: 'Jina la Mashindano',
    enterTournament: 'Ingiza jina la mashindano',
    amount: 'Kiasi',
    playerName: 'Jina la Mchezaji',
    enterPlayerName: 'Ingiza jina lako kamili',
    processPayment: 'Shughulikia Malipo',
    ratingDescription: 'Omba daraja rasmi za PANASA kwa shindano lako la Scrabble. Timu yetu itakagua ombi lako na kuwasiliana nawe kwa hatua zinazofuata.',
    organizerName: 'Jina la Mwandalizi',
    enterOrganizer: 'Ingiza jina la mwandalizi',
    email: 'Anwani ya Barua Pepe',
    enterEmail: 'Ingiza anwani yako ya barua pepe',
    eventName: 'Jina la Tukio',
    enterEvent: 'Ingiza jina la tukio',
    startDate: 'Tarehe ya Kuanza',
    endDate: 'Tarehe ya Kumaliza',
    location: 'Mahali',
    enterLocation: 'Ingiza mahali pa tukio',
    expectedParticipants: 'Washiriki Waliotarajiwa',
    enterParticipants: 'Ingiza idadi ya washiriki waliotarajiwa',
    additionalInfo: 'Maelezo ya Ziada',
    enterAdditionalInfo: 'Toa maelezo yoyote ya ziada kuhusu tukio lako',
    agreeToTerms: 'Ninakubali',
    termsAndConditions: 'Sheria na Masharti',
    submitApplication: 'Wasilisha Maombi'
  }
};

export default sw;