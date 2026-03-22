import { supabase } from '../utils/supabase';

export type AnalyticsEventType =
    | 'profile_view'
    | 'whatsapp_click'
    | 'website_click'
    | 'route_click'
    | 'news_click'
    | 'event_click'
    | 'rsvp_action'
    | 'click_phone'
    | 'open_swipe_jobs'
    | 'email_click';

export function useAnalytics() {
    const sessionId = localStorage.getItem('wmk_session_id') || 'guest';

    const trackEvent = async (companyId: string, eventType: AnalyticsEventType, metadata: any = {}) => {
        try {
            const { error } = await supabase.from('analytics').insert([{
                company_id: companyId,
                session_id: sessionId,
                event_type: eventType,
                metadata: {
                    ...metadata,
                    timestamp: new Date().toISOString(),
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
