import { supabase } from '../utils/supabase';
import type { AnalyticsEventType } from '../types';

export function useAnalytics() {

    const trackEvent = async (companyId: string, eventType: AnalyticsEventType, metadata: any = {}) => {
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
    };

    return { trackEvent };
}
