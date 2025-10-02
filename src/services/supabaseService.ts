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
    
    return data.map((player: SupabasePlayer) => ({
      nick: player.nick,
      country: player.country,
      name: player.name,
      games: player.games,
      rating: player.rating,
      lastPlayed: player.last_played ? new Date(player.last_played).toISOString().slice(0, 10).replace(/-/g, '') : ''
    }));
  } catch (error) {
    console.error('Error fetching players:', error);
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
export const getNews = async (): Promise<any[] | null> => {
  try {
    // Check if supabase client is available
    if (!supabase) {
      return MOCK_NEWS;
    }
    
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false });
    
    if (error) {
      // Fallback to mock data
      return MOCK_NEWS;
    }
    
    return data;
  } catch (error) {
    // Fallback to mock data
    return MOCK_NEWS;
  }
};

export const getNewsById = async (id: string): Promise<any | null> => {
  try {
    // Check if supabase client is available
    if (!supabase) {
      return MOCK_NEWS.find(news => news.id === id) || null;
    }
    
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .eq('id', id)
      .eq('published', true)
      .single();
    
    if (error) {
      // Fallback to mock data
      return MOCK_NEWS.find(news => news.id === id) || null;
    }
    
    return data;
  } catch (error) {
    // Fallback to mock data
    return MOCK_NEWS.find(news => news.id === id) || null;
  }
};

// Subscribe to real-time news updates
export const subscribeToNews = (
  callback: SubscriptionCallback<any>,
  errorCallback?: SubscriptionErrorCallback
) => {
  if (!supabase) {
    // If Supabase is not available, use mock data with periodic updates
    const interval = setInterval(() => {
      callback(MOCK_NEWS);
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
        getNews().then(data => {
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
        getNews().then(data => {
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
        getNews().then(data => {
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

// Resource operations (if you want to move resources to Supabase in the future)
export const getResources = async (): Promise<any[] | null> => {
  // For now, we'll return null since resources are still in constants
  // You can implement this later if you want to move resources to Supabase
  return null;
};