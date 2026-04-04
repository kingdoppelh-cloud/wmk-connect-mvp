import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
    // Handle CORS
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const { to, templateId, context, subject } = await req.json()

        if (!to || !templateId) {
            throw new Error('Missing "to" or "templateId"')
        }

        // 1. Map templateId to file
        const templateMap: Record<string, string> = {
            'welcome': 'welcome-email.html',
            'match': 'new-match-email.html',
            'message': 'new-message-email.html',
            'job-alert': 'job-alert-email.html',
            'password-reset': 'password-reset-email.html'
        }

        const fileName = templateMap[templateId]
        if (!fileName) {
            throw new Error(`Invalid templateId: ${templateId}`)
        }

        // 2. Load Template
        // Note: In Deno Deploy / Supabase Edge Functions, we read from the same folder or a subfolder
        // We assume the directory structure:
        // /send-templated-email/index.ts
        // /_templates/welcome-email.html
        const templatePath = `./../_templates/${fileName}`
        let html: string;

        try {
            html = await Deno.readTextFile(new URL(templatePath, import.meta.url))
        } catch (e) {
            console.error(`Failed to read template at ${templatePath}`, e)
            throw new Error(`Template not found: ${templateId}`)
        }

        // 3. Inject Context (Replace placeholders)
        // Supports {{ key }} syntax
        Object.entries(context || {}).forEach(([key, value]) => {
            const placeholder = new RegExp(`{{\\s*${key}\\s*}}`, 'g')
            html = html.replace(placeholder, String(value))
        });

        // 4. Send via Resend
        console.log(`Sending "${templateId}" email to ${to}...`)

        const res = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${RESEND_API_KEY}`,
            },
            body: JSON.stringify({
                from: 'WMK Connect <updates@wmk-connect.com>', // Note: Needs verified domain in Resend
                to: [to],
                subject: subject || 'WMK Connect Update',
                html: html,
            }),
        })

        const resData = await res.json()

        if (!res.ok) {
            console.error('Resend API Error:', resData)
            throw new Error(resData.message || 'Failed to send email via Resend')
        }

        return new Response(JSON.stringify({ success: true, data: resData }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
        })

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400,
        })
    }
})
