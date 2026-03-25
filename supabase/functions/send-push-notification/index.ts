import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || ''
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''

serve(async (req: Request) => {
    try {
        const payload = await req.json()
        const { record, table } = payload

        // 1. Initialize Supabase Client
        const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

        // 2. Fetch all subscriptions
        const { data: subscriptions, error: subError } = await supabase
            .from('push_subscriptions')
            .select('*')

        if (subError) throw subError

        // 3. Prepare notification details
        let title = 'WMK Connect Update'
        let body = 'Es gibt Neuigkeiten in deiner Nähe!'
        let url = '/'

        if (table === 'jobs') {
            title = 'Neue Stelle verfügbar!'
            body = `${record.title} bei ${record.company_name || 'einem Partner'}`
            url = '/jobs'
        } else if (table === 'events') {
            title = 'Neues Event im WMK!'
            body = record.title
            url = '/events'
        }

        console.log(`Sending push for ${table}: "${title}" (${body}) to ${subscriptions?.length} users... URL: ${url}`)

        // Note: In a real implementation, you would use a library like 'web-push'
        // but Deno standard support for crypto and fetch makes it possible
        // to call the push service endpoints directly.
        // For this MVP, we log the action.

        return new Response(JSON.stringify({ success: true, count: subscriptions?.length }), {
            headers: { 'Content-Type': 'application/json' },
        })
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return new Response(JSON.stringify({ error: errorMessage }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        })
    }
})
