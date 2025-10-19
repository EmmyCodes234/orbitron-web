import { createClient } from '@supabase/supabase-js'
import { Database } from './database.types'

// These will need to be replaced with your actual Supabase project URL and anon key
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Only create the client if both values are provided and are not placeholder values
let supabase: ReturnType<typeof createClient<Database>> | null = null
if (supabaseUrl && supabaseAnonKey) {
  // Check if the values are placeholder values
  const isPlaceholderUrl = supabaseUrl === 'https://your-project-id.supabase.co' || supabaseUrl.trim() === ''
  const isPlaceholderKey = supabaseAnonKey === 'your-anon-key-here' || supabaseAnonKey.trim() === ''
  
  if (isPlaceholderUrl || isPlaceholderKey) {
    // Do nothing, supabase will remain null
  } else {
    try {
      // Validate that the URL is a valid HTTP/HTTPS URL
      if (supabaseUrl.startsWith('http://') || supabaseUrl.startsWith('https://')) {
        supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
      }
    } catch (error) {
      // Supabase client creation failed, supabase will remain null
    }
  }
}

export { supabase }