import React from 'react';
import { useNavigate } from 'react-router-dom';

export const NotFound: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
            <div className="w-24 h-24 bg-surface-container-lowest text-primary rounded-3xl flex items-center justify-center shadow-lg mb-8 animate-bounce-slow">
                <span className="material-symbols-outlined text-5xl">explore_off</span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary mb-4 block">Error Code 404</span>
            <h1 className="text-5xl md:text-7xl font-headline font-bold tracking-[-0.02em] text-primary mb-6">Hoppla!<br />Seite nicht gefunden</h1>
            <p className="text-on-surface opacity-60 max-w-md mx-auto text-lg mb-10 leading-relaxed">
                Der Link, dem du gefolgt bist, ist möglicherweise defekt oder die Seite wurde entfernt.
            </p>
            <button
                onClick={() => navigate('/')}
                className="px-8 py-4 bg-primary text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2 group mx-auto"
            >
                <span className="material-symbols-outlined text-lg group-hover:-translate-x-1 transition-transform">arrow_back</span>
                Zurück zur Startseite
            </button>
        </div>
    );
};
