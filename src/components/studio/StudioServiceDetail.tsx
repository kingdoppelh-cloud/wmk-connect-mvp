import React from 'react';
import { Link } from 'react-router-dom';

export const StudioServiceDetail: React.FC = () => {
    return (
        <div className="pb-24 md:pb-0 bg-white min-h-screen selection:bg-[#b9000b]/20">
            {/* Header / Intro */}
            <header className="pt-24 pb-16 px-6 lg:px-24">
                <div className="container mx-auto">
                    <Link to="/studio" className="inline-flex items-center gap-2 text-slate-400 hover:text-[#b9000b] transition-colors mb-12 group">
                        <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">arrow_back</span>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Zurück zum Studio</span>
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                        <div className="lg:col-span-8 space-y-8">
                            <div className="flex items-center gap-4">
                                <span className="w-12 h-[1px] bg-[#b9000b]"></span>
                                <span className="text-[#b9000b] font-black uppercase text-[10px] tracking-[0.4em]">Premium Modul</span>
                            </div>
                            <h1 className="text-6xl lg:text-9xl font-headline font-black tracking-tighter leading-[0.85] text-slate-950">
                                Web-Redesign <br /><span className="italic">(Premium)</span>
                            </h1>
                            <p className="text-2xl text-slate-600 max-w-2xl leading-relaxed font-medium pt-4">
                                Wir bauen keine Webseiten. Wir erschaffen digitale Repräsentationen, die Ihre Markenidentität atmen und Konversionen erzwingen.
                            </p>
                        </div>
                        <div className="lg:col-span-4 pt-4 lg:pt-20">
                            <div className="bg-slate-50 p-10 rounded-[40px] border border-slate-100 space-y-8">
                                <div className="space-y-1">
                                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Investition ab</div>
                                    <div className="text-4xl font-headline font-black text-slate-950 tracking-tighter">2.500 € <span className="text-xl text-[#b9000b] font-medium">*</span></div>
                                </div>
                                <button className="w-full bg-[#b9000b] text-white py-6 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-2xl shadow-[#b9000b]/20 active:scale-95 transition-all">
                                    Paket anfragen
                                </button>
                                <p className="text-[10px] text-slate-400 leading-relaxed italic">* Individuelle Kalkulation basierend auf Komplexität und Umfang.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Editorial Content Section */}
            <section className="py-32 bg-slate-950 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-[#b9000b]/5 blur-[120px]"></div>

                <div className="container mx-auto px-6 lg:px-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                        <div className="relative">
                            <div className="aspect-[3/4] rounded-[60px] overflow-hidden shadow-2xl relative z-10">
                                <img alt="Design process detail" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYF_eS_9H-7xWw-m9v9vUo-uY_B9U6n4v_9m_v_v_v_v_v_v_v_v_v_v_v_v_v_v_v_v_v_v_v_v_v_v_v_v_v_v_v_v_v_v_v_v_v_v_v" />
                            </div>
                            <div className="absolute -bottom-12 -right-12 w-64 h-64 border-[32px] border-[#b9000b]/10 rounded-full"></div>
                        </div>

                        <div className="space-y-16">
                            <div className="space-y-6">
                                <h2 className="text-5xl font-headline font-black tracking-tight leading-none italic">01. Strategische Vision</h2>
                                <p className="text-slate-400 text-xl leading-relaxed">Jedes Design-Element folgt einer psychologischen Logik. Wir analysieren Ihre Zielgruppe und entwickeln eine User Journey, die Widerstände abbaut.</p>
                            </div>
                            <div className="space-y-6">
                                <h2 className="text-5xl font-headline font-black tracking-tight leading-none">02. Technische Exzellenz</h2>
                                <p className="text-slate-400 text-xl leading-relaxed">Höchstgeschwindigkeit, perfekte Mobiloptimierung und barrierefreie Architektur sind für uns kein Luxus, sondern Standard.</p>
                            </div>
                            <div className="space-y-6">
                                <h2 className="text-5xl font-headline font-black tracking-tight leading-none italic text-[#b9000b]">03. Editorial Design</h2>
                                <p className="text-slate-400 text-xl leading-relaxed">Wir nutzen moderne Typografie und Weißraum, um Ihre Inhalte wie ein Premium-Magazin zu präsentieren – hochwertig und zeitlos.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Feature List */}
            <section className="py-32 bg-white">
                <div className="container mx-auto px-6 lg:px-24">
                    <div className="mb-20 text-center space-y-4">
                        <span className="text-[#b9000b] font-black uppercase text-[10px] tracking-[0.4em]">Inhalt des Moduls</span>
                        <h2 className="text-5xl font-headline font-black text-slate-900 tracking-tighter">Was Sie erhalten</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { title: "Custom UI Design", desc: "Keine Vorlagen. Jedes Interface wird von Grund auf für Ihre Marke gestaltet." },
                            { title: "Motion Engineering", desc: "Subtile Animationen, die den Nutzer führen und ein lebendiges Gefühl vermitteln." },
                            { title: "SEO Foundation", desc: "Strukturelle Optimierung für maximale Sichtbarkeit in Suchmaschinen von Tag 1." }
                        ].map((item, i) => (
                            <div key={i} className="group p-10 border border-slate-100 rounded-[40px] hover:bg-slate-50 transition-all duration-500">
                                <div className="text-[10px] font-black text-slate-300 mb-8 uppercase tracking-[0.3em]">Modul {i + 1}</div>
                                <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight uppercase italic">{item.title}</h3>
                                <p className="text-slate-500 leading-relaxed font-medium">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Last Call */}
            <section className="pb-32 px-6">
                <div className="container mx-auto bg-[#b9000b] rounded-[60px] p-20 lg:p-32 flex flex-col items-center text-center text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_white_0%,_transparent_100%)] opacity-10"></div>
                    <h2 className="text-5xl lg:text-7xl font-headline font-black tracking-tighter mb-12 relative z-10 leading-none">
                        Zeit für eine digitale <br />Renaissance.
                    </h2>
                    <button className="bg-white text-[#b9000b] px-12 py-6 rounded-2xl font-black uppercase text-xs tracking-[0.4em] active:scale-95 transition-all shadow-2xl relative z-10 hover:bg-slate-50">
                        Projekt-Briefing anfordern
                    </button>
                    <div className="mt-12 text-[10px] font-black uppercase tracking-[0.3em] opacity-60 relative z-10 italic">
                        Limitierte Kapazitäten für Q2/2026
                    </div>
                </div>
            </section>
        </div>
    );
};
