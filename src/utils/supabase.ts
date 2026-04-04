import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const hasSupabaseConfig = !!supabaseUrl && !!supabaseAnonKey;

if (!hasSupabaseConfig && import.meta.env.MODE === 'development') {
    console.error(
        '[WMK Connect] ⚠️  Supabase nicht konfiguriert!\n' +
        'Kopiere .env.example zu .env und fülle VITE_SUPABASE_URL\n' +
        'und VITE_SUPABASE_ANON_KEY aus.'
    );
}

export const supabase = createClient(
    supabaseUrl ?? 'http://localhost:54321',  // lokaler Supabase-Fallback
    supabaseAnonKey ?? 'local-dev-key'
);
