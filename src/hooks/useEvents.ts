import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';

export interface Event {
    id: string;
    company_id: string;
    title: string;
    description: string;
    event_date: string;
    location_override?: string;
    image_url?: string;
    created_at: string;
    company?: {
        name: string;
        image: string;
    };
    attendee_count?: number;
    user_status?: 'attending' | 'none';
}

export function useEvents(companyId?: string) {
    const [events, setEvents] = useState<Event[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchEvents = async () => {
        setIsLoading(true);
        try {
            let query = supabase
                .from('events')
                .select('*, company:companies(name, image)')
                .order('event_date', { ascending: true });

            if (companyId) {
                query = query.eq('company_id', companyId);
            }

            const { data, error } = await query;

            if (error) throw error;

            // Fetch attendee counts and user status for each event
            const sessionId = localStorage.getItem('wmk_session_id') || 'anon';

            const eventsWithCounts = await Promise.all((data || []).map(async (evt) => {
                const { data: count } = await supabase.rpc('get_event_attendee_count', { evt_id: evt.id });
                const { data: rsvp } = await supabase
                    .from('rsvps')
                    .select('status')
                    .eq('event_id', evt.id)
                    .eq('session_id', sessionId)
                    .maybeSingle();

                return {
                    ...evt,
                    attendee_count: Number(count || 0),
                    user_status: rsvp?.status || 'none'
                };
            }));

            setEvents(eventsWithCounts);
        } catch (e) {
            console.error('Error fetching events', e);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, [companyId]);

    const addEvent = async (eventData: Partial<Event>) => {
        const { data, error } = await supabase
            .from('events')
            .insert([eventData])
            .select()
            .single();

        if (error) throw error;
        await fetchEvents();
        return data;
    };

    const toggleRSVP = async (eventId: string, currentStatus: string) => {
        const sessionId = localStorage.getItem('wmk_session_id') || 'anon';

        if (currentStatus === 'attending') {
            await supabase
                .from('rsvps')
                .delete()
                .eq('event_id', eventId)
                .eq('session_id', sessionId);
        } else {
            await supabase
                .from('rsvps')
                .insert([{
                    event_id: eventId,
                    session_id: sessionId,
                    status: 'attending'
                }]);
        }
        await fetchEvents();
    };

    return { events, isLoading, addEvent, toggleRSVP, refreshEvents: fetchEvents };
}
