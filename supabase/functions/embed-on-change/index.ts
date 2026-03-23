import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const payload = await req.json()
        console.log('Payload received:', payload)

        const { record, table, type, query } = payload

        // MODE 1: Search Query Embedding
        if (query) {
            const apiKey = Deno.env.get('OPENAI_API_KEY')
            if (!apiKey) throw new Error('Missing OPENAI_API_KEY')

            const openAIResponse = await fetch('https://api.openai.com/v1/embeddings', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    input: query,
                    model: 'text-embedding-3-small',
                }),
            })

            const openAIData = await openAIResponse.json()
            if (openAIData.error) throw new Error(openAIData.error.message)

            return new Response(JSON.stringify({ embedding: openAIData.data[0].embedding }), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 200,
            })
        }

        // MODE 2: Webhook Indizierung (Insert/Update)
        if (type !== 'INSERT' && type !== 'UPDATE') {
            return new Response(JSON.stringify({ message: 'Irrelevant change type' }), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 200,
            })
        }

        const id = record.id
        const textToEmbed = table === 'jobs'
            ? `${record.title}. ${record.description}`
            : `${record.name}. ${record.description}`

        if (!textToEmbed) {
            return new Response(JSON.stringify({ error: 'No text to embed' }), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 400,
            })
        }

        // Call OpenAI to get embedding
        const apiKey = Deno.env.get('OPENAI_API_KEY')
        if (!apiKey) throw new Error('Missing OPENAI_API_KEY')

        const openAIResponse = await fetch('https://api.openai.com/v1/embeddings', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                input: textToEmbed,
                model: 'text-embedding-3-small',
            }),
        })

        const openAIData = await openAIResponse.json()
        if (openAIData.error) throw new Error(openAIData.error.message)

        const embedding = openAIData.data[0].embedding

        // Update the record in Supabase
        const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
        const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        const supabase = createClient(supabaseUrl, supabaseServiceKey)

        const { error: updateError } = await supabase
            .from(table)
            .update({ embedding })
            .eq('id', id)

        if (updateError) throw updateError

        return new Response(JSON.stringify({ success: true, id }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
        })

    } catch (error) {
        console.error('Error:', error.message)
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 500,
        })
    }
})
