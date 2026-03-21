import React from 'react';
import { BarChart3, Rocket, Zap, Star, ArrowRight, ShieldCheck, X, Briefcase } from 'lucide-react';

interface PartnerBenefitsProps {
    onClose: () => void;
    onContact: () => void;
}

export const PartnerBenefits: React.FC<PartnerBenefitsProps> = ({ onClose, onContact }) => {
    return (
        <div className="fixed inset-0 z-[300] bg-white overflow-y-auto font-sans animate-in slide-in-from-bottom-full duration-500">
            {/* Nav */}
            <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center text-white">
                        <Rocket size={18} />
                    </div>
                    <span className="font-black tracking-tighter text-slate-900 uppercase">Partner Hub</span>
                </div>
                <button onClick={onClose} className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors">
                    <X size={20} />
                </button>
            </nav>

            {/* Hero */}
            <section className="px-6 pt-12 pb-20 text-center relative overflow-hidden">
                <div className="absolute -top-24 -left-24 w-64 h-64 bg-accent/5 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

                <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full mb-8">
                    <Zap className="text-accent" size={16} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Boost your Business</span>
                </div>

                <h1 className="text-5xl font-black text-slate-900 leading-[0.9] tracking-tighter mb-6 uppercase italic">
                    Wachse im <br /> <span className="text-accent">WMK Connect.</span>
                </h1>
                <p className="text-slate-500 text-lg mb-10 max-w-sm mx-auto font-medium">
                    Präsentiere dein Unternehmen, finde Talente und verstehe deine Kunden – alles in einer App.
                </p>

                <div className="flex flex-col gap-4">
                    <button
                        onClick={onContact}
                        className="w-full py-5 bg-slate-950 text-white rounded-[2rem] font-black uppercase text-sm tracking-widest shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                    >
                        Jetzt Partner werden
                        <ArrowRight size={20} />
                    </button>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Keine Einrichtungsgebühr • Monatlich kündbar</p>
                </div>
            </section>

            {/* Features Grid */}
            <section className="px-6 py-20 bg-slate-50 rounded-[4rem]">
                <h2 className="text-3xl font-black text-slate-900 mb-12 tracking-tighter uppercase italic text-center">Deine <span className="text-accent">Vorteile.</span></h2>

                <div className="grid grid-cols-1 gap-8">
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 group hover:-translate-y-1 transition-transform">
                        <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-6">
                            <BarChart3 className="text-accent" size={28} />
                        </div>
                        <h3 className="text-xl font-black text-slate-900 mb-3 uppercase tracking-tight italic">Echtzeit Analytics</h3>
                        <p className="text-slate-500 text-sm leading-relaxed font-medium">Sieh genau, wie viele Nutzer dein Profil besuchen, dich anrufen oder deine Website aufrufen.</p>
                    </div>

                    <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 group hover:-translate-y-1 transition-transform">
                        <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6">
                            <Briefcase className="text-blue-600" size={28} />
                        </div>
                        <h3 className="text-xl font-black text-slate-900 mb-3 uppercase tracking-tight italic">Premium Recruiting</h3>
                        <p className="text-slate-500 text-sm leading-relaxed font-medium">Schalte unbegrenzt Stellenanzeigen im Swipe-Format und erhalte Bewerbungen direkt per WhatsApp.</p>
                    </div>

                    <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 group hover:-translate-y-1 transition-transform">
                        <div className="w-14 h-14 bg-amber-500/10 rounded-2xl flex items-center justify-center mb-6">
                            <Star className="text-amber-500" size={28} />
                        </div>
                        <h3 className="text-xl font-black text-slate-900 mb-3 uppercase tracking-tight italic">Top Platzierung</h3>
                        <p className="text-slate-500 text-sm leading-relaxed font-medium">Dein Unternehmen erscheint oben in der Suche und wird Nutzern in der Nähe aktiv vorgeschlagen.</p>
                    </div>
                </div>
            </section>

            {/* Social Proof / Trust */}
            <section className="px-6 py-20">
                <div className="bg-slate-950 p-10 rounded-[3rem] text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 blur-3xl rounded-full"></div>
                    <h3 className="text-white text-3xl font-black mb-8 leading-none tracking-tighter uppercase italic">Bereit für<br />den <span className="text-accent">nächsten Schritt?</span></h3>

                    <div className="flex flex-col gap-6 items-center">
                        <div className="flex -space-x-3 mb-2">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-950 bg-slate-800 overflow-hidden">
                                    <img src={`https://i.pravatar.cc/100?u=${i}`} alt="User" />
                                </div>
                            ))}
                            <div className="w-10 h-10 rounded-full border-2 border-slate-950 bg-accent flex items-center justify-center text-[10px] font-black text-white">+12</div>
                        </div>
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em] mb-4">Bereits 24 Partner im WMK</p>

                        <button
                            onClick={onContact}
                            className="bg-white text-slate-950 px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-2xl hover:scale-105 active:scale-95 transition-all"
                        >
                            Interesse bekunden
                        </button>
                        <p className="text-slate-500 text-[10px] italic">Unverbindliche Anfrage</p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="px-6 py-12 border-t border-slate-100 bg-slate-50">
                <div className="grid grid-cols-2 gap-8 mb-12">
                    <div>
                        <h4 className="font-black text-slate-900 text-[10px] uppercase tracking-widest mb-4">Kontakt</h4>
                        <p className="text-slate-500 text-xs font-medium">WMK Connect Team</p>
                        <p className="text-slate-500 text-xs font-medium mt-1">Sontra, Hessen</p>
                    </div>
                    <div>
                        <h4 className="font-black text-slate-900 text-[10px] uppercase tracking-widest mb-4">Rechtliches</h4>
                        <p className="text-slate-500 text-xs font-medium underline">Impressum</p>
                        <p className="text-slate-500 text-xs font-medium mt-2 underline">Datenschutz</p>
                    </div>
                </div>
                <div className="flex items-center justify-between pt-8 border-t border-slate-200">
                    <span className="text-[9px] text-slate-400 font-bold uppercase">© 2026 WMK CONNECT</span>
                    <ShieldCheck className="text-slate-300" size={16} />
                </div>
            </footer>
        </div>
    );
};
