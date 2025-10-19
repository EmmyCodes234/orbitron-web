import { supabase } from '../supabaseClient';
import { MOCK_EVENTS, MOCK_NEWS, MOCK_PLAYERS } from '../../constants/index';
import { MOCK_FEDERATIONS } from '../../data/federationsData';

// Define the player interface that matches our data structure
export interface Player {
  nick: string;
  country: string;
  name: string;
  games: number;
  rating: number;
  lastPlayed: string;
}

// Define the Supabase player type
interface SupabasePlayer {
  id: string;
  nick: string;
  country: string;
  name: string;
  games: number;
  rating: number;
  last_played: string;
  created_at: string;
  updated_at: string;
}

// Define the contact submission interface
export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

// Real-time subscription types
export type SubscriptionCallback<T> = (data: T[]) => void;
export type SubscriptionErrorCallback = (error: Error) => void;

// Player operations
export const getPlayers = async (): Promise<Player[] | null> => {
  try {
    // Check if supabase client is available
    if (!supabase) {
      return null;
    }
    
    const { data, error } = await supabase
      .from('players')
      .select('*')
      .order('rating', { ascending: false });
    
    if (error) {
      console.error('Error fetching players from Supabase:', error);
      return null;
    }
    
    if (!data || data.length === 0) {
      return null;
    }
    
    return data.map((player: any) => ({
      nick: player.nick,
      country: player.country,
      name: player.name,
      games: player.games,
      rating: player.rating,
      lastPlayed: player.last_played || ''
    }));
  } catch (error) {
    console.error('Error fetching players:', error);
    return null;
  }
};

// Contact submission operations
export const submitContactForm = async (submission: Omit<ContactSubmission, 'id' | 'created_at'>): Promise<boolean> => {
  try {
    // Check if supabase client is available
    if (!supabase) {
      console.error('Supabase client not available - check your environment variables');
      return false;
    }
    
    const { error } = await (supabase.from('contact_submissions') as any)
      .insert({
        name: submission.name,
        email: submission.email,
        message: submission.message,
        created_at: new Date().toISOString()
      });
    
    if (error) {
      console.error('Error submitting contact form:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return false;
  }
};

// Get contact submissions (for admin panel)
export const getContactSubmissions = async (): Promise<ContactSubmission[] | null> => {
  try {
    // Check if supabase client is available
    if (!supabase) {
      console.error('Supabase client not available - check your environment variables');
      return null;
    }
    
    const { data, error } = await (supabase.from('contact_submissions') as any)
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching contact submissions:', error);
      return null;
    }
    
    return data as ContactSubmission[];
  } catch (error) {
    console.error('Error fetching contact submissions:', error);
    return null;
  }
};

// Subscribe to real-time player updates
export const subscribeToPlayers = (
  callback: SubscriptionCallback<Player>,
  errorCallback?: SubscriptionErrorCallback
) => {
  if (!supabase) {
    // If Supabase is not available, use mock data with periodic updates
    const interval = setInterval(() => {
      callback(MOCK_PLAYERS);
    }, 30000); // Update every 30 seconds
    
    return () => clearInterval(interval);
  }
  
  const subscription = supabase
    .channel('players-changes')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'players',
      },
      (payload) => {
        // Fetch updated data
        getPlayers().then(data => {
          if (data) {
            callback(data);
          }
        }).catch(error => {
          if (errorCallback) {
            errorCallback(error);
          }
        });
      }
    )
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'players',
      },
      (payload) => {
        // Fetch updated data
        getPlayers().then(data => {
          if (data) {
            callback(data);
          }
        }).catch(error => {
          if (errorCallback) {
            errorCallback(error);
          }
        });
      }
    )
    .on(
      'postgres_changes',
      {
        event: 'DELETE',
        schema: 'public',
        table: 'players',
      },
      (payload) => {
        // Fetch updated data
        getPlayers().then(data => {
          if (data) {
            callback(data);
          }
        }).catch(error => {
          if (errorCallback) {
            errorCallback(error);
          }
        });
      }
    )
    .subscribe();

  return () => {
    supabase?.removeChannel(subscription);
  };
};

// Event operations
export const getEvents = async (): Promise<any[] | null> => {
  try {
    // Check if supabase client is available
    if (!supabase) {
      return MOCK_EVENTS;
    }
    
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      // Fallback to mock data
      return MOCK_EVENTS;
    }
    
    return data;
  } catch (error) {
    // Fallback to mock data
    return MOCK_EVENTS;
  }
};

export const getEventById = async (id: string): Promise<any | null> => {
  try {
    // Check if supabase client is available
    if (!supabase) {
      return MOCK_EVENTS.find(event => event.id === id) || null;
    }
    
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      // Fallback to mock data
      return MOCK_EVENTS.find(event => event.id === id) || null;
    }
    
    return data;
  } catch (error) {
    // Fallback to mock data
    return MOCK_EVENTS.find(event => event.id === id) || null;
  }
};

// Subscribe to real-time event updates
export const subscribeToEvents = (
  callback: SubscriptionCallback<any>,
  errorCallback?: SubscriptionErrorCallback
) => {
  if (!supabase) {
    // If Supabase is not available, use mock data with periodic updates
    const interval = setInterval(() => {
      callback(MOCK_EVENTS);
    }, 30000); // Update every 30 seconds
    
    return () => clearInterval(interval);
  }
  
  const subscription = supabase
    .channel('events-changes')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'events',
      },
      (payload) => {
        // Fetch updated data
        getEvents().then(data => {
          if (data) {
            callback(data);
          }
        }).catch(error => {
          if (errorCallback) {
            errorCallback(error);
          }
        });
      }
    )
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'events',
      },
      (payload) => {
        // Fetch updated data
        getEvents().then(data => {
          if (data) {
            callback(data);
          }
        }).catch(error => {
          if (errorCallback) {
            errorCallback(error);
          }
        });
      }
    )
    .on(
      'postgres_changes',
      {
        event: 'DELETE',
        schema: 'public',
        table: 'events',
      },
      (payload) => {
        // Fetch updated data
        getEvents().then(data => {
          if (data) {
            callback(data);
          }
        }).catch(error => {
          if (errorCallback) {
            errorCallback(error);
          }
        });
      }
    )
    .subscribe();

  return () => {
    supabase?.removeChannel(subscription);
  };
};

// News operations
export const getNews = async (language: string = 'en'): Promise<any[] | null> => {
  try {
    // Check if supabase client is available
    if (!supabase) {
      // Return mock data when Supabase is not available
      const filteredNews = MOCK_NEWS.filter(article => article.language === language);
      // If no articles found for specific language, fall back to English
      return filteredNews.length > 0 ? filteredNews : MOCK_NEWS.filter(article => article.language === 'en');
    }
    
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .eq('published', true)
      .eq('language', language)
      .order('created_at', { ascending: false });
    
    if (error) {
      // Fallback to mock data
      const filteredNews = MOCK_NEWS.filter(article => article.language === language);
      return filteredNews.length > 0 ? filteredNews : MOCK_NEWS.filter(article => article.language === 'en');
    }
    
    // If no data found for specific language, try English as fallback
    if (!data || data.length === 0) {
      const { data: englishData, error: englishError } = await supabase
        .from('news')
        .select('*')
        .eq('published', true)
        .eq('language', 'en')
        .order('created_at', { ascending: false });
      
      if (!englishError && englishData && englishData.length > 0) {
        return englishData;
      }
    }
    
    return data;
  } catch (error) {
    // Fallback to mock data
    const filteredNews = MOCK_NEWS.filter(article => article.language === language);
    return filteredNews.length > 0 ? filteredNews : MOCK_NEWS.filter(article => article.language === 'en');
  }
};

export const getNewsById = async (id: string, language: string = 'en'): Promise<any | null> => {
  try {
    // Check if supabase client is available
    if (!supabase) {
      // Filter mock data by language and id
      const article = MOCK_NEWS.find(news => news.id === id && news.language === language) || 
                     MOCK_NEWS.find(news => news.id === id && news.language === 'en');
      return article || null;
    }
    
    // First try to find article in the requested language
    let { data, error } = await supabase
      .from('news')
      .select('*')
      .eq('id', id)
      .eq('published', true)
      .eq('language', language)
      .single();
    
    // If not found, try English as fallback
    if (error || !data) {
      const { data: englishData, error: englishError } = await supabase
        .from('news')
        .select('*')
        .eq('id', id)
        .eq('published', true)
        .eq('language', 'en')
        .single();
      
      if (!englishError && englishData) {
        return englishData;
      }
    }
    
    if (error) {
      // Fallback to mock data
      const article = MOCK_NEWS.find(news => news.id === id && news.language === language) || 
                     MOCK_NEWS.find(news => news.id === id && news.language === 'en');
      return article || null;
    }
    
    return data;
  } catch (error) {
    // Fallback to mock data
    const article = MOCK_NEWS.find(news => news.id === id && news.language === language) || 
                   MOCK_NEWS.find(news => news.id === id && news.language === 'en');
    return article || null;
  }
};

// Subscribe to real-time news updates
export const subscribeToNews = (
  callback: SubscriptionCallback<any>,
  errorCallback?: SubscriptionErrorCallback,
  language: string = 'en'
) => {
  if (!supabase) {
    // If Supabase is not available, use mock data with periodic updates
    const interval = setInterval(() => {
      // Filter mock data by language
      const filteredNews = MOCK_NEWS.filter(article => article.language === language);
      callback(filteredNews.length > 0 ? filteredNews : MOCK_NEWS.filter(article => article.language === 'en'));
    }, 30000); // Update every 30 seconds
    
    return () => clearInterval(interval);
  }
  
  const subscription = supabase
    .channel('news-changes')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'news',
      },
      (payload) => {
        // Fetch updated data
        getNews(language).then(data => {
          if (data) {
            callback(data);
          }
        }).catch(error => {
          if (errorCallback) {
            errorCallback(error);
          }
        });
      }
    )
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'news',
      },
      (payload) => {
        // Fetch updated data
        getNews(language).then(data => {
          if (data) {
            callback(data);
          }
        }).catch(error => {
          if (errorCallback) {
            errorCallback(error);
          }
        });
      }
    )
    .on(
      'postgres_changes',
      {
        event: 'DELETE',
        schema: 'public',
        table: 'news',
      },
      (payload) => {
        // Fetch updated data
        getNews(language).then(data => {
          if (data) {
            callback(data);
          }
        }).catch(error => {
          if (errorCallback) {
            errorCallback(error);
          }
        });
      }
    )
    .subscribe();

  return () => {
    supabase?.removeChannel(subscription);
  };
};

// Federation operations
export const getFederations = async (): Promise<any[] | null> => {
  try {
    // Check if supabase client is available
    if (!supabase) {
      // Return mock data when Supabase is not available
      return MOCK_FEDERATIONS;
    }
    
    const { data, error } = await supabase
      .from('federations')
      .select('*')
      .order('country', { ascending: true });
    
    if (error) {
      console.error('Error fetching federations from Supabase:', error);
      // Return mock data as fallback
      return MOCK_FEDERATIONS;
    }
    
    // If no data from Supabase, return mock data
    if (!data || data.length === 0) {
      return MOCK_FEDERATIONS;
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching federations:', error);
    // Return mock data as fallback
    return MOCK_FEDERATIONS;
  }
};

// Subscribe to real-time federation updates
export const subscribeToFederations = (
  callback: SubscriptionCallback<any>,
  errorCallback?: SubscriptionErrorCallback
) => {
  if (!supabase) {
    // If Supabase is not available, use mock data with periodic updates
    const interval = setInterval(() => {
      callback(MOCK_FEDERATIONS);
    }, 30000); // Update every 30 seconds
    
    return () => clearInterval(interval);
  }
  
  const subscription = supabase
    .channel('federations-changes')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'federations',
      },
      (payload) => {
        // Fetch updated data
        getFederations().then(data => {
          if (data) {
            callback(data);
          }
        }).catch(error => {
          if (errorCallback) {
            errorCallback(error);
          }
        });
      }
    )
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'federations',
      },
      (payload) => {
        // Fetch updated data
        getFederations().then(data => {
          if (data) {
            callback(data);
          }
        }).catch(error => {
          if (errorCallback) {
            errorCallback(error);
          }
        });
      }
    )
    .on(
      'postgres_changes',
      {
        event: 'DELETE',
        schema: 'public',
        table: 'federations',
      },
      (payload) => {
        // Fetch updated data
        getFederations().then(data => {
          if (data) {
            callback(data);
          }
        }).catch(error => {
          if (errorCallback) {
            errorCallback(error);
          }
        });
      }
    )
    .subscribe();

  return () => {
    supabase?.removeChannel(subscription);
  };
};