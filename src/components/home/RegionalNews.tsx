import React from 'react';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const RegionalNews: React.FC = () => {
    const navigate = useNavigate();

    return (
        <section className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <p className="text-secondary font-bold uppercase tracking-widest text-xs">Aktuelles</p>
                    <h2 className="text-4xl font-black text-primary tracking-tight">Regionale News</h2>
                </div>
                <button
                    onClick={() => navigate('/news')}
                    className="text-primary font-bold border-b-2 border-primary pb-1 flex items-center gap-2 text-sm"
                >
                    Alle Artikel <ExternalLink className="w-4 h-4" />
                </button>
            </div>
            <div className="grid lg:grid-cols-2 gap-8">
                {/* Feature Card */}
                <div className="bg-white rounded-xl overflow-hidden shadow-sm flex flex-col">
                    <div className="h-64 overflow-hidden relative">
                        <img
                            alt="Digitalisierung im Handwerk"
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200"
                        />
                        <span className="absolute top-4 left-4 bg-secondary text-white px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest">
                            Top News
                        </span>
                    </div>
                    <div className="p-8">
                        <time className="text-slate-500 text-xs font-bold uppercase tracking-widest">12. OKT 2026</time>
                        <h3 className="text-2xl font-black text-primary mt-3 mb-4 leading-tight">
                            Zukunftsdialog: Digitalisierung im Handwerk
                        </h3>
                        <p className="text-slate-600 leading-relaxed">
                            Wie lokale Betriebe von der neuen Vernetzung profitieren und welche Fördermittel jetzt im Kreis bereitstehen.
                        </p>
                        <button
                            onClick={() => navigate('/news')}
                            className="mt-6 text-primary font-bold flex items-center gap-2 hover:gap-4 transition-all"
                        >
                            Weiterlesen <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Secondary News List */}
                <div className="space-y-6">
                    <div className="flex gap-6 items-center group cursor-pointer bg-surface-container-low/50 p-4 rounded-xl hover:bg-surface-container-low transition-colors" onClick={() => navigate('/news')}>
                        <div className="w-32 h-24 shrink-0 rounded-lg overflow-hidden border border-slate-200">
                            <img alt="Gründerzentrum" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=400" />
                        </div>
                        <div>
                            <time className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">08. OKT 2026</time>
                            <h4 className="text-lg font-bold text-primary mt-1 leading-tight">Neues Gründerzentrum in Eschwege eröffnet</h4>
                        </div>
                    </div>
                    <div className="flex gap-6 items-center group cursor-pointer bg-surface-container-low/50 p-4 rounded-xl hover:bg-surface-container-low transition-colors" onClick={() => navigate('/news')}>
                        <div className="w-32 h-24 shrink-0 rounded-lg overflow-hidden border border-slate-200">
                            <img alt="Fachkräftemangel" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=400" />
                        </div>
                        <div>
                            <time className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">05. OKT 2026</time>
                            <h4 className="text-lg font-bold text-primary mt-1 leading-tight">Fachkräftemangel: Strategien für den Mittelstand</h4>
                        </div>
                    </div>
                    <div className="flex gap-6 items-center group cursor-pointer bg-surface-container-low/50 p-4 rounded-xl hover:bg-surface-container-low transition-colors" onClick={() => navigate('/news')}>
                        <div className="w-32 h-24 shrink-0 rounded-lg overflow-hidden border border-slate-200">
                            <img alt="Remote Work" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" src="https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?auto=format&fit=crop&q=80&w=400" />
                        </div>
                        <div>
                            <time className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">01. OKT 2026</time>
                            <h4 className="text-lg font-bold text-primary mt-1 leading-tight">Remote Work: Trends im ländlichen Raum</h4>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
