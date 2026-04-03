import React from 'react';
import { ArrowRight } from 'lucide-react';

export const HeroSwipe: React.FC = () => {
    const handleSwipe = () => {
        const event = new CustomEvent('open-swipe-jobs', { detail: 'open-general' });
        window.dispatchEvent(event);
    };

    return (
        <div className="space-y-6">
            {/* Logo Splash — 60vh premium hero without box-shadow artifact */}
            <div className="-mx-6 bg-surface dark:bg-slate-900 flex items-center justify-center animate-in fade-in duration-1000">
                <img
                    src="/logo.png"
                    alt="WMK Connect"
                    style={{ height: '60vh', width: 'auto', maxWidth: '95vw' }}
                    className="object-contain mix-blend-multiply dark:mix-blend-screen dark:invert"
                />
            </div>

            {/* Hero Card */}
            <section className="relative group overflow-hidden rounded-xl h-[500px] flex items-end">
                <div className="absolute inset-0 z-0">
                    <img
                        alt="Modernes Büro-Ambiente"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent"></div>
                </div>
                <div className="relative z-10 p-8 md:p-12 max-w-2xl">
                    <p className="text-white/80 uppercase tracking-widest font-bold text-xs mb-3">Deine Zukunft im Kreis</p>
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-none">Swipe-Jobs entdecken</h1>
                    <p className="text-white/90 text-lg mb-8 font-medium leading-relaxed">
                        Finde die besten Karrierechancen in deiner Region mit nur einem Swipe. Schnell, einfach und direkt.
                    </p>
                    <button
                        onClick={handleSwipe}
                        className="bg-secondary dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-500 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-3 transition-all active:scale-95 shadow-lg"
                    >
                        Jetzt swipen
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </section>
        </div>
    );
};
