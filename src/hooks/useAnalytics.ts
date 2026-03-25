import { useCallback } from 'react';
import { supabase } from '../utils/supabase';
import type { AnalyticsEventType } from '../types';

export function useAnalytics() {

    const trackEvent = useCallback(async (companyId: string, eventType: AnalyticsEventType, metadata: Record<string, unknown> = {}) => {
        try {
            const { error } = await supabase.from('analytics_events').insert([{
                company_id: companyId,
                event_type: eventType,
                metadata: {
                    ...metadata,
                    userAgent: navigator.userAgent
                }
            }]);

            if (error) throw error;
        } catch (err) {
            console.error('Analytics tracking failed:', err);
        }
    }, []);

    return { trackEvent };
}
