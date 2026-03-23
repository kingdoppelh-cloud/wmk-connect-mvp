import type { Company } from '../data/companies';

export interface NewsPost {
    id: string;
    company_id: string;
    content: string;
    image_url?: string;
    likes_count: number;
    type: 'news' | 'offer' | 'event' | 'special';
    created_at: string;
    expires_at?: string;
    company?: {
        name: string;
        image: string;
    };
    is_liked?: boolean;
}

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
    | 'job_view'
    | 'email_click';

export interface AnalyticsEvent {
    id: string;
    company_id: string;
    session_id: string;
    event_type: AnalyticsEventType;
    metadata: any;
    created_at: string;
}

export interface Job {
    id: string;
    company_id: string;
    title: string;
    category: string;
    description: string;
    salary_range: string;
    job_type: string;
    image_url?: string;
    created_at?: string;
    is_active: boolean;
    is_featured?: boolean;
    company?: {
        name: string;
        image: string;
        whatsapp: string;
        coordinates?: number[];
    };
}

export { type Company };
