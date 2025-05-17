import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client with hardcoded values for debugging
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''; 

// Log for debugging
console.log('Supabase Client - Using URL:', supabaseUrl);
console.log('Supabase Client - Key exists:', !!supabaseAnonKey);

// Create a single supabase client for the entire app
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
