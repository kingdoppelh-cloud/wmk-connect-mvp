import React, { useState, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const HeroSwipe: React.FC = () => {
    const navigate = useNavigate();
    const [clickCount, setClickCount] = useState(0);
    const lastClickTime = useRef<number>(0);

    const handleLogoClick = () => {
        const now = Date.now();
        if (now - lastClickTime.current > 2000) {
            setClickCount(1);
        } else {
            const newCount = clickCount + 1;
            if (newCount >= 5) {
                navigate('/admin');
                setClickCount(0);
            } else {
                setClickCount(newCount);
            }
        }
        lastClickTime.current = now;
    };

    const handleSwipe = () => {
        const event = new CustomEvent('open-swipe-jobs', { detail: 'open-general' });
        window.dispatchEvent(event);
    };

    return (
        <div className="space-y-4 md:space-y-6">
            <label className="sr-only">Hero Section</label>
            {/* Logo Splash — Optimiertes, nicht-gestrecktes Logo */}
            <div className="flex items-center justify-center py-6 overflow-visible">
                <img
                    src="/logo.png"
                    alt="WMK Connect"
                    onClick={handleLogoClick}
                    style={{
                        maxHeight: '280px',
                        width: 'auto',
                        maxWidth: '85vw',
                        objectFit: 'contain',
                        mixBlendMode: 'multiply',
                    }}
                    className="animate-in fade-in duration-1000 cursor-pointer select-none"
                    loading="lazy"
                />
            </div>

            {/* Hero Card */}
            <section className="relative group overflow-hidden rounded-xl h-[360px] md:h-[500px] flex items-end">
                <div className="absolute inset-0 z-0">
                    <img
                        alt="Modernes Büro-Ambiente"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent"></div>
                </div>
                <div className="relative z-10 p-6 md:p-12 max-w-2xl w-full">
                    <p className="text-white/80 uppercase tracking-widest font-bold text-xs mb-2 md:mb-3">Deine Zukunft im Kreis</p>
                    <h2 className="text-3xl md:text-6xl font-black text-white mb-4 md:mb-6 tracking-tight leading-tight">Swipe-Jobs entdecken</h2>
                    <p className="text-white/90 text-sm md:text-lg mb-5 md:mb-8 font-medium leading-relaxed hidden sm:block">
                        Finde die besten Karrierechancen in deiner Region mit nur einem Swipe. Schnell, einfach und direkt.
                    </p>
                    <button
                        onClick={handleSwipe}
                        className="w-full sm:w-auto bg-secondary dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-500 text-white px-6 md:px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg"
                    >
                        Jetzt swipen
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </section>
        </div>
    );
};
