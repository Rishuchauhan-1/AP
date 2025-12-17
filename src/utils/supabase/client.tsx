import { createClient } from '@supabase/supabase-js@2.39.3';
import { projectId, publicAnonKey } from './info';

// Create a singleton Supabase client for the browser
let supabaseInstance: ReturnType<typeof createClient> | null = null;

export function getSupabaseClient() {
  if (!supabaseInstance) {
    const supabaseUrl = `https://${projectId}.supabase.co`;
    supabaseInstance = createClient(supabaseUrl, publicAnonKey);
  }
  return supabaseInstance;
}
