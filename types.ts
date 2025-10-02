
export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  registrationLink: string;
  image: string;
}

export interface NewsArticle {
  id: string;
  title:string;
  author: string;
  date: string;
  summary: string;
  content: string;
  image: string;
}

export interface Player {
  rank: number;
  name: string;
  country: string;
  rating: number;
  tournamentsPlayed: number;
}

export interface Resource {
    id: string;
    title: string;
    description: string;
    link: string;
    type: 'PDF' | 'DOC' | 'LINK';
}
