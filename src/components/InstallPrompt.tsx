import React, { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';

export const InstallPrompt: React.FC = () => {
    const [deviceInfo, setDeviceInfo] = useState({
        isIOS: false,
        isStandalone: false,
        isVisible: false
    });

    useEffect(() => {
        // Detect iOS
        const userAgent = window.navigator.userAgent.toLowerCase();
        const isIOSDevice = /iphone|ipad|ipod/.test(userAgent);

        // Detect if app is already installed (standalone mode)
        const isDisplayStandalone = window.matchMedia('(display-mode: standalone)').matches;
        // Also check iOS specific standalone
        const isIOSStandalone = (window.navigator as Navigator & { standalone?: boolean }).standalone === true;

        const isStandaloneDevice = isDisplayStandalone || isIOSStandalone;

        // Show prompt if on mobile and not installed, and user hasn't dismissed it recently
        const dismissedStr = localStorage.getItem('wmk_install_dismissed');
        let dismissedRecently = false;

        if (dismissedStr) {
            const dismissedAt = parseInt(dismissedStr, 10);
            // Hide for 7 days if dismissed
            if (Date.now() - dismissedAt < 7 * 24 * 60 * 60 * 1000) {
                dismissedRecently = true;
            } else {
                localStorage.removeItem('wmk_install_dismissed'); // Expired
            }
        }

        const shouldShow = (isIOSDevice || /android/.test(userAgent)) && !isStandaloneDevice && !dismissedRecently;

        // Wrap in setTimeout to ensure it's not synchronous in the effect
        setTimeout(() => {
            setDeviceInfo({
                isIOS: isIOSDevice,
                isStandalone: isStandaloneDevice,
                isVisible: false // Initial false, then timer sets to true
            });

            if (shouldShow) {
                // Slight delay so it doesn't pop up instantly and aggressively
                setTimeout(() => {
                    setDeviceInfo(prev => ({ ...prev, isVisible: true }));
                }, 3000);
            }
        }, 0);
    }, []);

    const { isIOS, isStandalone, isVisible } = deviceInfo;

    const handleDismiss = () => {
        setDeviceInfo(prev => ({ ...prev, isVisible: false }));
        localStorage.setItem('wmk_install_dismissed', Date.now().toString());
    };

    if (!isVisible || isStandalone) return null;

    return (
        <div className="fixed bottom-24 sm:bottom-6 left-4 right-4 z-50 max-w-sm mx-auto animate-in slide-in-from-bottom duration-500">
            <div className="bg-slate-900 text-white rounded-2xl shadow-2xl p-4 flex items-center justify-between gap-4 border border-slate-700 relative overflow-hidden">
                <div className="flex items-center gap-3 relative z-10">
                    <div className="bg-white/10 p-2 rounded-xl backdrop-blur-md">
                        <Download size={20} className="text-accent" />
                    </div>
                    <div>
                        <h4 className="font-bold text-sm text-white">WMK Connect App</h4>
                        <p className="text-[11px] text-slate-300 font-medium mt-0.5 leading-tight">
                            {isIOS
                                ? "Tippe unten auf 'Teilen' und dann 'Zum Home-Bildschirm' 📱"
                                : "Als App installieren für den schnellsten Zugriff. 🚀"}
                        </p>
                    </div>
                </div>
                <button
                    onClick={handleDismiss}
                    className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors rounded-full relative z-10 -mr-1"
                >
                    <X size={16} />
                </button>

                {/* Decoration */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-accent/20 blur-2xl rounded-full -mr-10 -mt-10" />
            </div>
        </div>
    );
};
