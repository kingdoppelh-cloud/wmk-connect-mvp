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
                        alt="Modern office workplace"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAN3hYYJGprA9e8T3TljgFWd_et5WYMD1q_ELMCGehT35PSw2CWG4JCUzDwId8VKrPckmHrxeC4O6i90GwqiaLXMP6jUOlUopleCpfksKjjJdlAnrV9T96TD3qT8hpNYkORhjQAjbNdyBBkoXKXT2nNlmvTc0k-OIrYDyRf6xgQD1ePytBECVBYQl1nenu9qLgP8Mxjelptqcrh6js5Z3mT7pzwy8O0Y_Vi5H71jYzXO4vwDdvVB4v7HPA4mY6Q8yxIFjGU7IAgUSk"
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
