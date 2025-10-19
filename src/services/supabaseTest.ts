import { supabase } from '../supabaseClient';

// Simple test function to verify Supabase client is working
export const testSupabaseConnection = async () => {
  try {
    if (!supabase) {
      console.log('Supabase client is not initialized');
      return false;
    }
    
    // Try a simple query to test the connection
    const { data, error } = await supabase
      .from('rating_applications')
      .select('id')
      .limit(1);
    
    if (error) {
      console.log('Supabase connection test failed:', error);
      return false;
    }
    
    console.log('Supabase connection test successful');
    return true;
  } catch (error) {
    console.log('Supabase connection test error:', error);
    return false;
  }
};