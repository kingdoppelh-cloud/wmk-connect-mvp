import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../utils/supabase';

export interface Notification {
    id: string;
    company_id: string;
    type: 'news' | 'event';
    title: string;
    content: string;
    link: string;
    is_read: boolean;
    created_at: string;
    company?: {
        name: string;
        logo_url: string;
    };
}

export function useNotifications() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const sessionId = localStorage.getItem('wmk_session_id') || 'guest';

    const fetchNotifications = useCallback(async () => {
        try {
            const { data, error } = await supabase
                .from('notifications')
                .select(`
                    *
                `)
                .eq('user_id', sessionId)
                .order('created_at', { ascending: false })
                .limit(20);

            if (error) throw error;
            setNotifications(data || []);
            setUnreadCount((data || []).filter(n => !n.is_read).length);
        } catch (err) {
            console.error('Error fetching notifications:', err);
        } finally {
            setIsLoading(false);
        }
    }, [sessionId]);

    const markAsRead = async (id: string) => {
        try {
            const { error } = await supabase
                .rpc('mark_notification_as_read', { notification_id: id });

            if (error) throw error;

            setNotifications(prev => prev.map(n =>
                n.id === id ? { ...n, is_read: true } : n
            ));
            setUnreadCount(prev => Math.max(0, prev - 1));
        } catch (err) {
            console.error('Error marking notification as read:', err);
        }
    };

    const markAllAsRead = async () => {
        try {
            const unreadIds = notifications.filter(n => !n.is_read).map(n => n.id);
            if (unreadIds.length === 0) return;

            const { error } = await supabase
                .from('notifications')
                .update({ is_read: true })
                .in('id', unreadIds);

            if (error) throw error;

            setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
            setUnreadCount(0);
        } catch (err) {
            console.error('Error marking all as read:', err);
        }
    };

    useEffect(() => {
        fetchNotifications();

        // Subscribe to changes
        const channel = supabase
            .channel('public:notifications')
            .on('postgres_changes', {
                event: 'INSERT',
                schema: 'public',
                table: 'notifications',
                filter: `user_id=eq.${sessionId}`
            }, () => {
                fetchNotifications();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [fetchNotifications, sessionId]);

    return {
        notifications,
        unreadCount,
        isLoading,
        markAsRead,
        markAllAsRead,
        refresh: fetchNotifications
    };
}
