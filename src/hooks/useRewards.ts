import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';

export function useRewards() {
    const [points, setPoints] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(true);
    const sessionId = localStorage.getItem('wmk_session_id') || 'guest';

    const fetchPoints = async () => {
        try {
            const { data, error } = await supabase
                .from('user_points')
                .select('points')
                .eq('session_id', sessionId)
                .maybeSingle();

            if (error) throw error;
            setPoints(data?.points || 0);
        } catch (e) {
            console.error('Error fetching points', e);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPoints();

        // Subscribe to real-time changes
        const channel = supabase
            .channel('point_updates')
            .on('postgres_changes', {
                event: 'UPDATE',
                schema: 'public',
                table: 'user_points',
                filter: `session_id=eq.${sessionId}`
            }, (payload) => {
                setPoints(payload.new.points);
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const earnPoints = async (amount: number, eventName: string, companyId?: string) => {
        try {
            const { data, error } = await supabase.rpc('award_points', {
                target_session_id: sessionId,
                point_amount: amount,
                event_name: eventName,
                target_company_id: companyId
            });

            if (error) throw error;
            // The state will update via real-time subscription or we can set it here
            if (data !== null) setPoints(data);
            return data;
        } catch (e) {
            console.error('Failed to earn points', e);
            return null;
        }
    };

    return { points, isLoading, earnPoints, refreshPoints: fetchPoints };
}
