import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';

export function usePushNotifications() {
    const [permission, setPermission] = useState<NotificationPermission>('default');
    const [isSubscribed, setIsSubscribed] = useState(false);

    useEffect(() => {
        if ('Notification' in window) {
            setPermission(Notification.permission);
        }
    }, []);

    const subscribe = async () => {
        if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
            console.warn('Push messaging is not supported');
            return;
        }

        try {
            const result = await Notification.requestPermission();
            setPermission(result);

            if (result === 'granted') {
                const registration = await navigator.serviceWorker.ready;

                // Note: In a real app, you'd need a VAPID public key here
                // For this MVP, we simulate the storage of subscription info
                const subscription = await registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: 'BIdyM...placeholder...key'
                });

                if (subscription) {
                    await supabase.from('push_subscriptions').insert([{
                        subscription_json: subscription.toJSON()
                    }]);
                    setIsSubscribed(true);
                }
            }
        } catch (e) {
            console.error('Push subscription failed', e);
        }
    };

    return { permission, isSubscribed, subscribe };
}
