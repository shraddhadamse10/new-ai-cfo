import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(https://ecdylxpeciuqabuayfcv.supabase.co,eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVjZHlseHBlY2l1cWFidWF5ZmN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkwMjY2MDYsImV4cCI6MjA2NDYwMjYwNn0.1Zt9PmAPVfNo6_SEuOntBUo5VzavqNUM0cy6vXDiItg);
