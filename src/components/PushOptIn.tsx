import React, { useState, useEffect } from 'react';
import { Bell, X, CheckCircle2 } from 'lucide-react';
import { supabase } from '../utils/supabase';

export const PushOptIn: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [permissionStatus, setPermissionStatus] = useState<NotificationPermission | null>(null);

    useEffect(() => {
        // Check if Notifications are supported
        if (!('Notification' in window)) {
            return;
        }

        // Delay the prompt slightly so it's not too aggressive
        const timer = setTimeout(() => {
            if (Notification.permission === 'default') {
                setIsVisible(true);
            }
            setPermissionStatus(Notification.permission);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    const requestPermission = async () => {
        try {
            const permission = await Notification.requestPermission();
            setPermissionStatus(permission);
            if (permission === 'granted') {
                // Register for push notifications
                const registration = await navigator.serviceWorker.ready;
                const subscription = await registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array(import.meta.env.VITE_VAPID_PUBLIC_KEY || '')
                });

                // Store subscription in Supabase
                await supabase.from('push_subscriptions').insert([{
                    subscription_json: subscription
                }]);

                setTimeout(() => setIsVisible(false), 2000); // Hide after success message
            } else {
                setIsVisible(false);
            }
        } catch (error) {
            console.error('Error requesting notification permission:', error);
            setIsVisible(false);
        }
    };

    /** Helper to convert VAPID key */
    function urlBase64ToUint8Array(base64String: string) {
        if (!base64String) return new Uint8Array(0);
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/-/g, '+')
            .replace(/_/g, '/');

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-24 left-4 right-4 md:left-auto md:right-8 md:bottom-8 md:w-96 z-50 animate-in slide-in-from-bottom-8 fade-in duration-500">
            <div className="bg-slate-900 rounded-[2rem] p-6 shadow-2xl border border-slate-800 relative overflow-hidden">
                <button
                    onClick={() => setIsVisible(false)}
                    className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
                >
                    <X size={20} />
                </button>

                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center shrink-0">
                        {permissionStatus === 'granted' ? (
                            <CheckCircle2 className="text-accent" size={24} />
                        ) : (
                            <Bell className="text-accent animate-bounce" size={24} />
                        )}
                    </div>
                    <div>
                        <h3 className="text-white font-black text-lg mb-1 leading-tight">
                            {permissionStatus === 'granted' ? 'Erfolgreich aktiviert!' : 'Bleib auf dem Laufenden!'}
                        </h3>
                        <p className="text-slate-400 text-sm leading-relaxed mb-4">
                            {permissionStatus === 'granted'
                                ? 'Du erhältst nun Benachrichtigungen zu neuen Jobs und Angeboten in deiner Nähe.'
                                : 'Erfahre sofort von neuen Jobs und Premium-Angeboten der Firmen im WMK.'}
                        </p>

                        {permissionStatus !== 'granted' && (
                            <div className="flex gap-2">
                                <button
                                    onClick={requestPermission}
                                    className="flex-1 bg-accent text-white py-2.5 rounded-xl font-bold text-sm hover:scale-105 active:scale-95 transition-all"
                                >
                                    Aktivieren
                                </button>
                                <button
                                    onClick={() => setIsVisible(false)}
                                    className="px-4 py-2.5 text-slate-300 text-sm font-medium hover:text-white transition-colors"
                                >
                                    Später
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
