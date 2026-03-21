import { createClient } from '@supabase/supabase-client';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Supabase env vars missing');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkTable() {
    const { error } = await supabase.from('jobs').select('id').limit(1);
    if (error) {
        console.log('Error querying jobs table:', error.message);
        if (error.code === 'PGRST116' || error.code === '42P01') {
            console.log('Table "jobs" truly DOES NOT EXIST.');
        }
    } else {
        console.log('Table "jobs" exists.');
    }
}

checkTable();
