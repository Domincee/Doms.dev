import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim();
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();

if (!supabaseUrl || !supabaseAnonKey) {
console.error('Missing Supabase env vars', {
url: supabaseUrl,
hasKey: !!supabaseAnonKey,
available: Object.keys(import.meta.env),
});
throw new Error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. Did you create .env.local at project root and restart dev server?');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);