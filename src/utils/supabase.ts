import { createClient } from '@supabase/supabase-js';

// Hardcoded for MVP 1.0 Production to override any old Vercel Env Vars
const PROD_URL = 'https://ednlbgioxlndddlofenu.supabase.co';
const PROD_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkbmxiZ2lveGxuZGRkbG9mZW51Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQwNDA3OTEsImV4cCI6MjA4OTYxNjc5MX0.1KIyDwEInl8lfF7BIf6YWSupR-06VtmoRX8lcuUvKnY';

export const hasSupabaseConfig = true;

export const supabase = createClient(PROD_URL, PROD_KEY);
