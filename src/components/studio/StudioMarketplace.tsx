import React from 'react';
import { Link } from 'react-router-dom';

export const StudioMarketplace: React.FC = () => {
    return (
        <div className="pb-24 md:pb-0">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-surface py-20 lg:py-32">
                <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-7 space-y-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-fixed text-on-primary-fixed-variant rounded-full text-xs font-bold tracking-widest uppercase">
                            Digital Excellence
                        </div>
                        <h2 className="text-5xl lg:text-7xl font-headline font-extrabold tracking-tighter leading-tight text-on-background">
                            Premium-Services für Ihr <span className="text-primary">Unternehmen</span>
                        </h2>
                        <p className="text-xl text-secondary max-w-xl leading-relaxed">
                            Wir transformieren Ihre digitale Präsenz durch präzise Strategie und exzellentes Design. "WMK Studio - Ihr Partner für digitalen Erfolg".
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <button className="bg-gradient-to-br from-primary to-primary-container text-on-primary px-8 py-4 rounded-xl font-bold text-lg shadow-[0px_8px_24px_rgba(185,0,11,0.2)] active:scale-95 transition-transform">
                                Projekt starten
                            </button>
                            <button className="border border-outline/15 text-on-surface px-8 py-4 rounded-xl font-bold text-lg hover:bg-surface-container-low transition-colors">
                                Portfolio ansehen
                            </button>
                        </div>
                    </div>
                    <div className="lg:col-span-5 relative">
                        <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                            <img alt="Modern digital workspace" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7qR5RGrTUduHyZZ1LfXS4FJnxnNxiGnfaV5povNJ52P9nZedPO5tPl_J3ghFTaHdARzXIZhalpQKT3cBycjh4gZIjZ3s23n-7v6cUXtLsiJwNQEnuAcVibO_GYxqG-HxUyvRuZFKZIYaLMMyyR-vGIODpLgfIHxYZmeqSUWDQnVLd5ugmSxJEghB26QK4t79nJ7p34NKXxqUd27OUerPghE5gPrQHZExn-NuThGmwW6HkTArYTbAGh_Ko8tr8UqZivJFrWdH9vGs" />
                        </div>
                        <div className="absolute -bottom-6 -left-6 bg-surface-container-lowest p-6 rounded-xl shadow-[0px_12px_32px_rgba(27,59,90,0.1)] border border-outline/5 hidden md:block">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-primary-container rounded-full flex items-center justify-center text-on-primary">
                                    <span className="material-symbols-outlined">trending_up</span>
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-on-background">Digitaler Erfolg</div>
                                    <div className="text-xs text-secondary italic">Messbare Ergebnisse</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Signature Component: Civic Lead */}
            <section className="bg-surface-container-low py-16">
                <div className="container mx-auto px-6">
                    <div className="border-l-[12px] border-primary bg-surface-container-high p-12 max-w-4xl mx-auto">
                        <h3 className="text-3xl lg:text-4xl font-headline font-bold text-primary leading-tight">
                            "Echtes Handwerk im digitalen Raum erfordert Disziplin, Ästhetik und den Mut zur Innovation."
                        </h3>
                        <p className="mt-4 text-on-surface font-semibold">— WMK Studio Direktion</p>
                    </div>
                </div>
            </section>

            {/* Service Bento Grid */}
            <section className="py-24 bg-surface-bright">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
                        <div>
                            <span className="text-primary font-bold tracking-widest uppercase text-sm">Unsere Expertise</span>
                            <h2 className="text-4xl font-headline font-bold text-on-background mt-2">Maßgeschneiderte Lösungen</h2>
                        </div>
                        <p className="text-secondary max-w-sm">Präzise definierte Service-Module für nachhaltiges Wachstum in einer digitalisierten Welt.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                        {/* Service 1: Web Redesign */}
                        <Link to="/studio/services/web-redesign" className="md:col-span-7 group cursor-pointer bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all hover:-translate-y-1 block">
                            <div className="h-64 overflow-hidden">
                                <img alt="Web Design Interface" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAW9wFBwJQOhCCA-V3JC3vEQy4buExv8RBOERwlV20PUzU2Amrzn1cq77dNwdroBL7k3MtxXoWa9bp8UCkL12xK-AJzMBoalh0sTjRlGNSgreQ0K1C7eM2hLm3QL9a-TpCcO6snl9g3_dTm4WYwlLSXMdWzNBs3izWz_YFLQRTQ6__iLlmbjoCTz_5y8kz5IBcBMIhwkYtw5Mx3jwCPjB6IlNDg6gcHP7IHT3L19U7C1RCjQuCLrJ32trBEttn9GRZda8ChUObV07c" />
                            </div>
                            <div className="p-8">
                                <div className="flex justify-between items-start mb-4">
                                    <h4 className="text-2xl font-headline font-bold text-on-background">Web-Redesign (Premium Optik)</h4>
                                    <span className="bg-surface-container-low text-primary px-3 py-1 rounded text-sm font-bold tracking-tight">Ab 2.500 €</span>
                                </div>
                                <p className="text-secondary leading-relaxed mb-6">Fokus auf moderne Ästhetik und eine Nutzererfahrung, die Vertrauen schafft und Konversionen steigert.</p>
                                <div className="flex items-center gap-2 text-primary font-bold group-hover:gap-4 transition-all">
                                    <span>Details ansehen</span>
                                    <span className="material-symbols-outlined">arrow_forward</span>
                                </div>
                            </div>
                        </Link>

                        {/* Service 2: KI Integration */}
                        <div className="md:col-span-5 flex flex-col bg-inverse-surface text-inverse-on-surface rounded-xl p-8 justify-between hover:bg-on-background transition-colors cursor-pointer group">
                            <div>
                                <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center mb-8">
                                    <span className="material-symbols-outlined text-3xl text-on-primary">neurology</span>
                                </div>
                                <h4 className="text-2xl font-headline font-bold mb-4">KI-Integration (Chat & Voice)</h4>
                                <p className="opacity-80 leading-relaxed mb-6">Automatisieren Sie Ihren Kundensupport mit intelligenten Systemen, die wie Menschen kommunizieren.</p>
                                <div className="text-primary-fixed text-lg font-bold">Ab 1.200 €</div>
                            </div>
                            <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
                                <span className="font-medium">Jetzt automatisieren</span>
                                <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">bolt</span>
                            </div>
                        </div>

                        {/* Service 3: Recruiting */}
                        <div className="md:col-span-12 group cursor-pointer bg-surface-container-low rounded-xl p-8 grid md:grid-cols-2 gap-12 items-center hover:bg-surface-container transition-colors">
                            <div className="space-y-6">
                                <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded text-xs font-bold uppercase tracking-widest">Consulting</div>
                                <h4 className="text-3xl font-headline font-bold text-on-background">Digital Recruiting Consulting</h4>
                                <p className="text-secondary leading-relaxed">Finden Sie die richtigen Talente mit unserer datengestützten Strategie. Wir optimieren Ihren gesamten Akquiseprozess für qualifizierte Fachkräfte.</p>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-3 text-on-surface">
                                        <span className="material-symbols-outlined text-primary text-xl filled-icon">check_circle</span>
                                        <span>Employer Branding Strategie</span>
                                    </li>
                                    <li className="flex items-center gap-3 text-on-surface">
                                        <span className="material-symbols-outlined text-primary text-xl filled-icon">check_circle</span>
                                        <span>Automatisierte Funnel-Systeme</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="aspect-video rounded-lg overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                                <img alt="Professional handshake" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuARgmrm6oP9qBtPOzYjJSGr3z-lYQEb181F-R6ogsvgz2--3IqU6Ezp26tIISYMoMyfrrtpzff20vWJm_L0v4dV3PtXycJyLh4IBs5fIuvYGIdtDWC-CVl9lDYMudjYvqnBErEc7c0rvTcCSiXQ0Kg2XWFeZPsndRaV71DyMY20TSR6wL9jVH8SxXK8LdgdDli3YTMVmDl_NIFh2aGwlUyqYfTQZ_HDvmYGjI9YY2rBG3xDFY9dth6S1hlMsLZXBlo0ntOCA3A7AN8" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-surface">
                <div className="container mx-auto px-6">
                    <div className="bg-on-background rounded-3xl p-8 md:p-16 text-center relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary opacity-20 blur-[100px]"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-tertiary opacity-10 blur-[100px]"></div>
                        <div className="relative z-10 max-w-2xl mx-auto space-y-8">
                            <h2 className="text-4xl md:text-5xl font-headline font-bold text-white tracking-tight">Bereit für den nächsten Schritt?</h2>
                            <p className="text-white/70 text-lg leading-relaxed">
                                Lassen Sie uns gemeinsam analysieren, wie wir Ihr Unternehmen digital transformieren können.
                            </p>
                            <div className="pt-4">
                                <button className="bg-gradient-to-br from-primary to-primary-container text-on-primary px-10 py-5 rounded-xl font-bold text-xl active:scale-95 transition-transform">
                                    Kostenloses Erstgespräch vereinbaren
                                </button>
                            </div>
                            <p className="text-white/40 text-sm">Völlig unverbindlich • 30 Minuten Strategie-Check</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
