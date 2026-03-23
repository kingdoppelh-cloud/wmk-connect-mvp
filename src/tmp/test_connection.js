import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

console.log('Testing with URL:', supabaseUrl);

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
    try {
        const { data, error } = await supabase.from('companies').select('count', { count: 'exact', head: true });
        if (error) {
            console.error('Connection Error:', error.message);
            if (error.message.includes('api key')) {
                console.error('CRITICAL: The API Key is indeed invalid for this URL.');
            }
        } else {
            console.log('Connection Successful! Found companies:', data);
        }
    } catch (err) {
        console.error('Unexpected error:', err);
    }
}

testConnection();
