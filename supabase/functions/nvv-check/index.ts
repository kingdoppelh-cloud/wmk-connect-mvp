import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

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
        const { userLat, userLon, companyLat, companyLon } = await req.json()

        if (!userLat || !userLon || !companyLat || !companyLon) {
            throw new Error('Missing coordinates')
        }

        const API_KEY = Deno.env.get('NVV_API_KEY') || 'NVV' // Fallback for testing if public
        const ENDPOINT = 'https://auskunft.nvv.de/vvtria/trias'

        // Construct TRIAS XML
        const xmlRequest = `<?xml version="1.0" encoding="UTF-8"?>
<Trias version="1.1" xmlns="http://www.vdv.de/trias" xmlns:siri="http://www.siri.org.uk/siri" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <ServiceRequest>
        <siri:RequestTimestamp>${new Date().toISOString()}</siri:RequestTimestamp>
        <siri:RequestorRef>${API_KEY}</siri:RequestorRef>
        <TripRequest>
            <Origin>
                <LocationRef>
                    <GeoPosition>
                        <Longitude>${userLon}</Longitude>
                        <Latitude>${userLat}</Latitude>
                    </GeoPosition>
                </LocationRef>
            </Origin>
            <Destination>
                <LocationRef>
                    <GeoPosition>
                        <Longitude>${companyLon}</Longitude>
                        <Latitude>${companyLat}</Latitude>
                    </GeoPosition>
                </LocationRef>
            </Destination>
            <Params>
                <NumberOfResults>1</NumberOfResults>
                <IncludeIntermediateStops>false</IncludeIntermediateStops>
            </Params>
        </TripRequest>
    </ServiceRequest>
</Trias>`

        const response = await fetch(ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/xml',
            },
            body: xmlRequest,
        })

        const xmlText = await response.text()

        // Basic Extraction (since parsing XML in Edge Functions without large libs is easier via regex for specific values)
        const lineNameMatch = xmlText.match(/<PublishedLineName>(.*?)<\/PublishedLineName>/)
        const stopNameMatch = xmlText.match(/<StopPointName>(.*?)<\/StopPointName>/) || xmlText.match(/<LocationName>(.*?)<\/LocationName>/)
        const departureTimeMatch = xmlText.match(/<TimetabledTime>(.*?)<\/TimetabledTime>/)

        // Calculate minutes from now
        let diffMinutes = 0
        if (departureTimeMatch) {
            const depTime = new Date(departureTimeMatch[1])
            const now = new Date()
            diffMinutes = Math.round((depTime.getTime() - now.getTime()) / 60000)
        }

        const result = {
            line: lineNameMatch ? lineNameMatch[1] : '?',
            stop: stopNameMatch ? stopNameMatch[1] : 'Nähe Standort',
            departureMinutes: diffMinutes > 0 ? diffMinutes : 0,
            rawTime: departureTimeMatch ? departureTimeMatch[1] : null,
            success: !!departureTimeMatch
        }

        return new Response(JSON.stringify(result), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
        })

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message, success: false }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400,
        })
    }
})
