import React, { useState } from 'react';

export const AppInstallBanner: React.FC = () => {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-lg z-40">
            <div className="bg-tertiary dark:bg-blue-900 text-white p-4 rounded-xl shadow-2xl flex items-center justify-between border border-white/10 dark:border-white/5 backdrop-blur-sm relative">
                <button
                    onClick={() => setIsVisible(false)}
                    className="absolute -top-2 -right-2 bg-slate-800 dark:bg-slate-700 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-slate-700 dark:hover:bg-slate-600"
                >
                    ✕
                </button>
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#1b3b5a] dark:bg-slate-800 rounded-lg flex items-center justify-center border border-white/30">
                        <span className="text-xs font-black uppercase tracking-tighter text-white">WMK</span>
                    </div>
                    <div>
                        <p className="font-bold text-sm">Connect App installieren</p>
                        <p className="text-[10px] opacity-70">Jobs und News direkt aufs Handy.</p>
                    </div>
                </div>
                <button className="bg-secondary dark:bg-red-500 text-white px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider hover:bg-slate-50 hover:text-secondary dark:hover:bg-slate-200 dark:hover:text-red-600 transition-colors">
                    Holen
                </button>
            </div>
        </div>
    );
};
