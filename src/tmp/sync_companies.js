import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// Manual URL and Key from .env or supabase.ts
const supabaseUrl = 'https://ednlbgioxlndddlofenu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkbmxiZ2lveGxuZGRkbG9mZW51Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQwNDA3OTEsImV4cCI6MjA4OTYxNjc5MX0.1KIyDwEInl8lfF7BIf6YWSupR-06VtmoRX8lcuUvKnY';

const supabase = createClient(supabaseUrl, supabaseKey);

// Mock company data (simplified from companies.ts)
const localCompanies = [
    {
        id: '22222222-2222-2222-2222-222222222222',
        name: 'Friseur Schnittpunkt',
        category: 'Friseure',
        description: 'Ihr Experte für moderne Haarschnitte und Farben.',
        website_url: 'https://schnittpunkt-bsa.de',
        phone: '+4956521234',
        whatsapp: '4956521234',
        coordinates: [51.2715, 9.9825],
        opening_hours: { "1": "09:00-18:00", "2": "09:00-18:00", "3": "09:00-18:00", "4": "09:00-18:00", "5": "09:00-18:00", "6": "08:00-13:00" },
        is_premium: false,
        address: 'Werrastraße 10, 37242 Bad Sooden-Allendorf',
        image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=1000'
    },
    {
        id: '33333333-3333-3333-3333-333333333333',
        name: 'Elektro Meyer',
        category: 'Handwerk',
        description: 'Elektro installationen und Reparaturen aller Art.',
        website_url: 'https://elektro-meyer.de',
        phone: '+4956529988',
        whatsapp: '4956529988',
        coordinates: [51.2730, 9.9850],
        opening_hours: { "1": "08:00-16:00", "2": "08:00-16:00", "3": "08:00-16:00", "4": "08:00-16:00", "5": "08:00-16:00", "6": "08:00-14:00" },
        is_premium: true,
        address: 'Industriestraße 5, 37242 Bad Sooden-Allendorf',
        image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000'
    },
    {
        id: '44444444-4444-4444-4444-444444444444',
        name: 'Cafe am Markt',
        category: 'Gastronomie',
        description: 'Frischer Kuchen und Kaffeespezialitäten.',
        website_url: 'https://cafe-am-markt.de',
        phone: '+4956524455',
        whatsapp: '4956524455',
        coordinates: [51.2718, 9.9820],
        opening_hours: { "0": "13:00-18:00", "2": "09:00-18:00", "3": "09:00-18:00", "4": "09:00-18:00", "5": "09:00-18:00", "6": "09:00-18:00" },
        is_premium: false,
        address: 'Marktplatz 1, 37242 Bad Sooden-Allendorf',
        image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=1000'
    }
];

async function sync() {
    console.log('Starting sync...');
    for (const company of localCompanies) {
        const { id, ...data } = company;
        console.log(`Upserting ${company.name}...`);
        const { error } = await supabase.from('companies').upsert(company);
        if (error) console.error(`Error for ${company.name}:`, error.message);
        else console.log(`Successfully synced ${company.name}`);
    }
    console.log('Sync finished.');
}

sync();
