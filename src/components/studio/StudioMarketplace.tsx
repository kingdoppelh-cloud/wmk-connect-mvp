import React from 'react';
import { Link } from 'react-router-dom';

export const StudioMarketplace: React.FC = () => {
    return (
        <div className="pb-24 md:pb-0 bg-[#fbf9f8] min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-[#fbf9f8] py-20 lg:py-32">
                <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-7 space-y-8 animate-in fade-in slide-in-from-left duration-1000">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#b9000b]/5 text-[#b9000b] rounded-full text-[10px] font-black tracking-[0.2em] uppercase">
                            Digital Excellence
                        </div>
                        <h2 className="text-6xl lg:text-8xl font-headline font-black tracking-tighter leading-[0.9] text-slate-950">
                            Premium-Services <br />für Ihr <span className="text-[#b9000b] italic">Unternehmen</span>
                        </h2>
                        <p className="text-xl text-slate-600 max-w-xl leading-relaxed font-medium">
                            Wir transformieren Ihre digitale Präsenz durch präzise Strategie und exzellentes Design. "WMK Studio - Ihr Partner für digitalen Erfolg".
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 pt-4">
                            <button className="bg-[#b9000b] text-white px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-2xl shadow-[#b9000b]/20 active:scale-95 transition-all hover:bg-[#a0000a]">
                                Projekt starten
                            </button>
                            <button className="bg-white border border-slate-200 text-slate-900 px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-slate-50 transition-all">
                                Portfolio ansehen
                            </button>
                        </div>
                    </div>
                    <div className="lg:col-span-5 relative animate-in fade-in zoom-in duration-1000">
                        <div className="aspect-[4/5] rounded-[40px] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)]">
                            <img alt="Modern digital workspace" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7qR5RGrTUduHyZZ1LfXS4FJnxnNxiGnfaV5povNJ52P9nZedPO5tPl_J3ghFTaHdARzXIZhalpQKT3cBycjh4gZIjZ3s23n-7v6cUXtLsiJwNQEnuAcVibO_GYxqG-HxUyvRuZFKZIYaLMMyyR-vGIODpLgfIHxYZmeqSUWDQnVLd5ugmSxJEghB26QK4t79nJ7p34NKXxqUd27OUerPghE5gPrQHZExn-NuThGmwW6HkTArYTbAGh_Ko8tr8UqZivJFrWdH9vGs" />
                        </div>
                        <div className="absolute -bottom-8 -left-8 bg-white/80 backdrop-blur-2xl p-8 rounded-[32px] shadow-[0_20px_40px_rgba(0,0,0,0.1)] border border-white hidden md:block">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-[#b9000b] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#b9000b]/20">
                                    <span className="material-symbols-outlined text-2xl">trending_up</span>
                                </div>
                                <div>
                                    <div className="text-base font-black text-slate-950 uppercase tracking-tight">Digitaler Erfolg</div>
                                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest italic">Messbare Ergebnisse</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Signature Component: Civic Lead */}
            <section className="bg-slate-50 py-24">
                <div className="container mx-auto px-6">
                    <div className="border-l-[16px] border-[#b9000b] bg-white p-16 md:p-24 max-w-5xl mx-auto shadow-sm rounded-r-[32px]">
                        <h3 className="text-4xl lg:text-6xl font-headline font-black text-slate-950 leading-[1.1] tracking-tighter italic">
                            "Echtes Handwerk im digitalen Raum erfordert Disziplin, Ästhetik und den Mut zur Innovation."
                        </h3>
                        <div className="mt-8 flex items-center gap-4">
                            <div className="h-[2px] w-12 bg-[#b9000b]"></div>
                            <p className="text-slate-500 font-black uppercase text-[10px] tracking-[0.3em]">WMK Studio Direktion</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Service Bento Grid */}
            <section className="py-32 bg-[#fbf9f8]">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                        <div className="space-y-4">
                            <span className="text-[#b9000b] font-black tracking-[0.3em] uppercase text-[10px] bg-[#b9000b]/5 px-3 py-1 rounded">Unsere Expertise</span>
                            <h2 className="text-5xl lg:text-6xl font-headline font-black text-slate-950 tracking-tighter">Maßgeschneiderte <br />Lösungen</h2>
                        </div>
                        <p className="text-slate-500 max-w-sm text-lg font-medium leading-relaxed border-l-2 border-slate-200 pl-8">Präzise definierte Service-Module für nachhaltiges Wachstum in einer digitalisierten Welt.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                        {/* Service 1: Web Redesign */}
                        <Link to="/studio/services/web-redesign" className="md:col-span-7 group cursor-pointer bg-white rounded-[40px] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-700 hover:-translate-y-2 block">
                            <div className="h-80 overflow-hidden relative">
                                <img alt="Web Design Interface" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAW9wFBwJQOhCCA-V3JC3vEQy4buExv8RBOERwlV20PUzU2Amrzn1cq77dNwdroBL7k3MtxXoWa9bp8UCkL12xK-AJzMBoalh0sTjRlGNSgreQ0K1C7eM2hLm3QL9a-TpCcO6snl9g3_dTm4WYwlLSXMdWzNBs3izWz_YFLQRTQ6__iLlmbjoCTz_5y8kz5IBcBMIhwkYtw5Mx3jwCPjB6IlNDg6gcHP7IHT3L19U7C1RCjQuCLrJ32trBEttn9GRZda8ChUObV07c" />
                                <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-md text-[#b9000b] px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-xl">
                                    Ab 2.500 €
                                </div>
                            </div>
                            <div className="p-12">
                                <h4 className="text-3xl font-headline font-black text-slate-950 mb-4 tracking-tight">Web-Redesign (Premium Optik)</h4>
                                <p className="text-slate-500 leading-relaxed text-lg mb-8">Fokus auf moderne Ästhetik und eine Nutzererfahrung, die Vertrauen schafft und Konversionen steigert.</p>
                                <div className="flex items-center gap-3 text-[#b9000b] font-black uppercase text-[10px] tracking-[0.2em] group-hover:gap-5 transition-all">
                                    <span>Details ansehen</span>
                                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                                </div>
                            </div>
                        </Link>

                        {/* Service 2: KI Integration */}
                        <div className="md:col-span-5 flex flex-col bg-slate-950 text-white rounded-[40px] p-12 justify-between hover:bg-slate-900 transition-all duration-500 cursor-pointer group shadow-2xl">
                            <div>
                                <div className="w-16 h-16 bg-[#b9000b] rounded-2xl flex items-center justify-center mb-10 shadow-xl shadow-[#b9000b]/30 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-3xl text-white filled-icon">neurology</span>
                                </div>
                                <h4 className="text-3xl font-headline font-black mb-6 tracking-tight">KI-Integration (Chat & Voice)</h4>
                                <p className="text-slate-400 text-lg leading-relaxed mb-8">Automatisieren Sie Ihren Kundensupport mit intelligenten Systemen, die wie Menschen kommunizieren.</p>
                                <div className="text-[#b9000b] text-xl font-black uppercase tracking-tighter italic">Ab 1.200 €</div>
                            </div>
                            <div className="mt-12 flex items-center justify-between border-t border-white/5 pt-8">
                                <span className="font-black uppercase text-[10px] tracking-[0.3em]">Jetzt automatisieren</span>
                                <span className="material-symbols-outlined group-hover:translate-x-3 transition-transform text-2xl text-[#b9000b]">bolt</span>
                            </div>
                        </div>

                        {/* Service 3: Recruiting */}
                        <div className="md:col-span-12 group cursor-pointer bg-slate-100 rounded-[40px] p-12 md:p-16 grid md:grid-cols-2 gap-16 items-center hover:bg-white hover:shadow-2xl hover:shadow-slate-200 transition-all duration-700">
                            <div className="space-y-8">
                                <div className="inline-block bg-[#b9000b]/10 text-[#b9000b] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">Consulting</div>
                                <h4 className="text-4xl lg:text-5xl font-headline font-black text-slate-950 tracking-tighter">Digital Recruiting <br />Consulting</h4>
                                <p className="text-slate-500 text-xl leading-relaxed font-medium">Finden Sie die richtigen Talente mit unserer datengestützten Strategie. Wir optimieren Ihren gesamten Akquiseprozess für qualifizierte Fachkräfte.</p>
                                <ul className="space-y-4">
                                    <li className="flex items-center gap-4 text-slate-800 font-bold">
                                        <div className="w-6 h-6 bg-[#b9000b] rounded-full flex items-center justify-center">
                                            <span className="material-symbols-outlined text-white text-sm filled-icon">check</span>
                                        </div>
                                        <span>Employer Branding Strategie</span>
                                    </li>
                                    <li className="flex items-center gap-4 text-slate-800 font-bold">
                                        <div className="w-6 h-6 bg-[#b9000b] rounded-full flex items-center justify-center">
                                            <span className="material-symbols-outlined text-white text-sm filled-icon">check</span>
                                        </div>
                                        <span>Automatisierte Funnel-Systeme</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="aspect-video rounded-[32px] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-1000 shadow-2xl relative">
                                <img alt="Professional handshake" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuARgmrm6oP9qBtPOzYjJSGr3z-lYQEb181F-R6ogsvgz2--3IqU6Ezp26tIISYMoMyfrrtpzff20vWJm_L0v4dV3PtXycJyLh4IBs5fIuvYGIdtDWC-CVl9lDYMudjYvqnBErEc7c0rvTcCSiXQ0Kg2XWFeZPsndRaV71DyMY20TSR6wL9jVH8SxXK8LdgdDli3YTMVmDl_NIFh2aGwlUyqYfTQZ_HDvmYGjI9YY2rBG3xDFY9dth6S1hlMsLZXBlo0ntOCA3A7AN8" />
                                <div className="absolute inset-0 bg-[#b9000b]/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 bg-[#fbf9f8]">
                <div className="container mx-auto px-6">
                    <div className="bg-slate-950 rounded-[60px] p-12 md:p-32 text-center relative overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.5)]">
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#b9000b] opacity-10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#002542] opacity-20 blur-[120px] rounded-full -translate-x-1/4 translate-y-1/4"></div>

                        <div className="relative z-10 max-w-3xl mx-auto space-y-12">
                            <h2 className="text-5xl md:text-7xl font-headline font-black text-white tracking-tighter leading-tight">Bereit für den <br /><span className="text-[#b9000b] italic">nächsten Schritt?</span></h2>
                            <p className="text-slate-400 text-xl leading-relaxed font-medium">
                                Lassen Sie uns gemeinsam analysieren, wie wir Ihr Unternehmen digital transformieren können.
                            </p>
                            <div className="pt-8">
                                <button className="bg-[#b9000b] text-white px-12 py-6 rounded-full font-black uppercase text-sm tracking-[0.3em] active:scale-95 transition-all shadow-2xl shadow-[#b9000b]/40 hover:bg-[#a0000a]">
                                    Erstgespräch vereinbaren
                                </button>
                            </div>
                            <div className="flex items-center justify-center gap-6 mt-12">
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-[#b9000b] rounded-full"></div>
                                    <span className="text-slate-500 font-bold uppercase text-[9px] tracking-widest">Unverbindlich</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-[#b9000b] rounded-full"></div>
                                    <span className="text-slate-500 font-bold uppercase text-[9px] tracking-widest">30 Min. Check</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
