import React from 'react';
import { useNavigate } from 'react-router-dom';

export const MerchantApplicantDetail: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="pt-8 pb-32 px-6 max-w-7xl mx-auto w-full">
            <label className="sr-only">Bewerber Details</label>
            {/* Back Button */}
            <button
                onClick={() => navigate('..')}
                className="mb-8 flex items-center gap-2 text-secondary text-sm font-medium hover:text-primary transition-colors"
            >
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                <span>Zurück zur Übersicht</span>
            </button>

            {/* Hero Profile Section */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
                <div className="lg:col-span-8 flex flex-col md:flex-row items-center md:items-end gap-8 bg-surface-container-lowest p-8 rounded-xl shadow-[0px_12px_32px_rgba(27,59,90,0.06)]">
                    <div className="w-40 h-40 rounded-xl overflow-hidden shadow-xl border-4 border-white shrink-0">
                        <img alt="Elena Aris" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBr1aV0u2vWNnLxc4U6drB2jKw5P1Zm_VnqH_w8zxRAjBJ1-_zUWtIJyHtbRMOpV6RLLb6g1DYMX7Ws08eAiAmFVcocMbC5qdZ7U4CzwcatB8iXADV50qKDZkbowonAsvMC3eYID7_D7MKoeUAmXNwHRxvweDtZk8Da5Lv8hGoj_0mzWgqjxfRsLw22_d4g6yUsCEkIu5mDAqLX9n4Q-uhRFINwUVd8djTEaxBYSptFZScIoawP8tI_dw2esGi-H2sLWyhdi3RIcE4" />
                    </div>
                    <div className="text-center md:text-left flex-grow">
                        <span className="text-primary font-bold uppercase tracking-widest text-xs mb-2 block">Kandidaten-Profil</span>
                        <h1 className="text-4xl md:text-5xl font-black font-headline text-on-background tracking-tighter mb-2">Elena Aris</h1>
                        <p className="text-xl text-secondary font-medium">Senior Urban Planner</p>
                        <div className="flex flex-wrap gap-3 mt-6 justify-center md:justify-start">
                            <span className="bg-surface-container px-3 py-1 rounded-full text-xs font-semibold text-secondary flex items-center gap-1">
                                <span className="material-symbols-outlined text-[16px]">location_on</span> Berlin, DE
                            </span>
                            <span className="bg-surface-container px-3 py-1 rounded-full text-xs font-semibold text-secondary flex items-center gap-1">
                                <span className="material-symbols-outlined text-[16px]">schedule</span> Ab sofort verfügbar
                            </span>
                        </div>
                    </div>
                </div>

                {/* Action Sidebar (Floating effect) */}
                <div className="lg:col-span-4 space-y-4">
                    <button className="w-full h-16 flex items-center justify-center gap-3 bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-xl font-bold text-lg shadow-lg active:scale-[0.98] transition-all hover:shadow-xl">
                        <span className="material-symbols-outlined">event_available</span>
                        Interview einladen
                    </button>
                    <button className="w-full h-14 flex items-center justify-center gap-3 bg-surface-container-lowest text-on-surface border border-outline-variant/15 rounded-xl font-semibold hover:bg-surface-bright transition-all">
                        <span className="material-symbols-outlined">mail</span>
                        Nachricht senden
                    </button>
                    <div className="relative group">
                        <button className="w-full h-14 flex items-center justify-between px-6 bg-surface-container-lowest text-on-surface border border-outline-variant/15 rounded-xl font-semibold hover:bg-surface-bright transition-all">
                            <span className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-secondary">sync</span>
                                Status ändern
                            </span>
                            <span className="material-symbols-outlined">expand_more</span>
                        </button>
                    </div>
                </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Main Content Column */}
                <div className="lg:col-span-8 space-y-12">
                    {/* Matching Section */}
                    <div className="civic-lead-accent bg-surface-container-high p-8 rounded-xl relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-20 h-20 rounded-full border-4 border-primary flex items-center justify-center bg-white shadow-inner">
                                    <span className="text-2xl font-black text-primary font-headline">96%</span>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black font-headline text-on-background tracking-tight">Match-Score</h3>
                                    <p className="text-primary font-bold text-sm tracking-wide">KI-ANALYSE AKTIVIERT</p>
                                </div>
                            </div>
                            <p className="text-xl leading-relaxed text-on-surface italic font-medium">
                                "Hervorragende Übereinstimmung bei Infrastruktur-Projekten. Elena verfügt über spezifische Erfahrung in der kommunalen Stadtplanung, die sich deckungsgleich mit Ihren aktuellen Projektanforderungen in Berlin-Mitte überschneidet."
                            </p>
                        </div>
                        <div className="absolute top-[-20%] right-[-10%] opacity-10 pointer-events-none">
                            <span className="material-symbols-outlined text-[240px] text-primary">bolt</span>
                        </div>
                    </div>

                    {/* Skill Matrix */}
                    <section>
                        <div className="flex items-baseline justify-between mb-8 border-b border-outline-variant/15 pb-4">
                            <h2 className="text-3xl font-black font-headline text-on-background tracking-tight">Skill-Matrix</h2>
                            <span className="text-secondary font-medium text-sm">Visualisierte Kompetenzen</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                            {/* Skill Bar 1 */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm font-bold uppercase tracking-wider text-secondary">
                                    <span>CAD &amp; Building Modeling</span>
                                    <span className="text-primary">98%</span>
                                </div>
                                <div className="h-3 bg-surface-container rounded-full overflow-hidden">
                                    <div className="h-full bg-primary w-[98%]"></div>
                                </div>
                            </div>
                            {/* Skill Bar 2 */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm font-bold uppercase tracking-wider text-secondary">
                                    <span>Projektleitung</span>
                                    <span className="text-primary">92%</span>
                                </div>
                                <div className="h-3 bg-surface-container rounded-full overflow-hidden">
                                    <div className="h-full bg-primary w-[92%]"></div>
                                </div>
                            </div>
                            {/* Skill Bar 3 */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm font-bold uppercase tracking-wider text-secondary">
                                    <span>Nachhaltigkeit</span>
                                    <span className="text-primary">95%</span>
                                </div>
                                <div className="h-3 bg-surface-container rounded-full overflow-hidden">
                                    <div className="h-full bg-primary w-[95%]"></div>
                                </div>
                            </div>
                            {/* Skill Bar 4 */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm font-bold uppercase tracking-wider text-secondary">
                                    <span>Stakeholder Management</span>
                                    <span className="text-primary">88%</span>
                                </div>
                                <div className="h-3 bg-surface-container rounded-full overflow-hidden">
                                    <div className="h-full bg-primary w-[88%]"></div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Experience Timeline */}
                    <section>
                        <div className="flex items-baseline justify-between mb-8 border-b border-outline-variant/15 pb-4">
                            <h2 className="text-3xl font-black font-headline text-on-background tracking-tight">Berufserfahrung</h2>
                            <span className="text-secondary font-medium text-sm">Chronologischer Verlauf</span>
                        </div>
                        <div className="space-y-12 relative before:absolute before:left-[11px] before:top-4 before:bottom-4 before:w-[2px] before:bg-surface-container">
                            {/* Station 1 */}
                            <div className="relative pl-12">
                                <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-primary border-4 border-white shadow-sm z-10"></div>
                                <span className="text-primary font-bold text-xs uppercase tracking-widest mb-1 block">2021 — Heute</span>
                                <h4 className="text-xl font-bold text-on-background">Senior Urban Planner</h4>
                                <p className="text-secondary font-semibold mb-3">Metropolis Design Group • Vollzeit</p>
                                <p className="text-on-surface leading-relaxed max-w-2xl">
                                    Leitung von großflächigen Stadtentwicklungsprojekten mit Fokus auf klimaresiliente Infrastruktur. Koordination von interdisziplinären Teams und öffentliche Bürgerbeteiligungsverfahren.
                                </p>
                            </div>
                            {/* Station 2 */}
                            <div className="relative pl-12">
                                <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-surface-container-highest border-4 border-white shadow-sm z-10"></div>
                                <span className="text-secondary font-bold text-xs uppercase tracking-widest mb-1 block">2018 — 2021</span>
                                <h4 className="text-xl font-bold text-on-background">Junior City Architect</h4>
                                <p className="text-secondary font-semibold mb-3">Stadtverwaltung Berlin • Festanstellung</p>
                                <p className="text-on-surface leading-relaxed max-w-2xl">
                                    Entwicklung von Bebauungsplänen und Visualisierung von städtebaulichen Entwürfen. Enge Zusammenarbeit mit dem Bauordnungsamt.
                                </p>
                            </div>
                            {/* Station 3 */}
                            <div className="relative pl-12">
                                <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-surface-container-highest border-4 border-white shadow-sm z-10"></div>
                                <span className="text-secondary font-bold text-xs uppercase tracking-widest mb-1 block">2016 — 2018</span>
                                <h4 className="text-xl font-bold text-on-background">Graduate Architect</h4>
                                <p className="text-secondary font-semibold mb-3">Studio Green Space • Praktikum &amp; Entry</p>
                                <p className="text-on-surface leading-relaxed max-w-2xl">
                                    Unterstützung bei der Entwurfsplanung für Parkanlagen und grüne Lungen in urbanen Räumen.
                                </p>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Sidebar Assets Column */}
                <div className="lg:col-span-4 space-y-8">
                    {/* Education & Certs */}
                    <div className="bg-surface-container-low p-6 rounded-xl space-y-6">
                        <h5 className="text-lg font-black font-headline text-on-background tracking-tight flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">school</span>
                            Ausbildung
                        </h5>
                        <div className="space-y-4">
                            <div>
                                <p className="font-bold text-on-surface">M.Sc. Urban Design</p>
                                <p className="text-sm text-secondary">TU Berlin, 2016</p>
                            </div>
                            <div>
                                <p className="font-bold text-on-surface">B.A. Architektur</p>
                                <p className="text-sm text-secondary">Bauhaus-Universität Weimar, 2014</p>
                            </div>
                        </div>
                        <div className="h-px bg-outline-variant/20"></div>
                        <h5 className="text-lg font-black font-headline text-on-background tracking-tight flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">verified</span>
                            Zertifikate
                        </h5>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2 text-sm text-on-surface font-medium">
                                <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                                DGNB Consultant (Sustainability)
                            </li>
                            <li className="flex items-start gap-2 text-sm text-on-surface font-medium">
                                <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                                Prince2 Project Management
                            </li>
                        </ul>
                    </div>

                    {/* Languages */}
                    <div className="bg-surface-container-low p-6 rounded-xl space-y-4">
                        <h5 className="text-lg font-black font-headline text-on-background tracking-tight flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">translate</span>
                            Sprachen
                        </h5>
                        <div className="flex flex-wrap gap-2">
                            <span className="bg-surface-container-highest px-3 py-1 rounded text-xs font-bold text-on-background">DEUTSCH (Muttersprache)</span>
                            <span className="bg-surface-container-highest px-3 py-1 rounded text-xs font-bold text-on-background">ENGLISCH (C2)</span>
                            <span className="bg-surface-container-highest px-3 py-1 rounded text-xs font-bold text-on-background">SPANISCH (B2)</span>
                        </div>
                    </div>

                    {/* Personal Pitch Card */}
                    <div className="bg-inverse-surface text-inverse-on-surface p-8 rounded-xl relative overflow-hidden">
                        <h5 className="text-xl font-bold font-headline mb-4">Über mich</h5>
                        <p className="text-sm leading-relaxed opacity-80">
                            "Ich glaube daran, dass Städte für Menschen und nicht für Autos gebaut werden sollten. Meine Leidenschaft ist es, historische Bausubstanz mit modernster grüner Technologie zu verbinden."
                        </p>
                        <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between">
                            <div className="flex -space-x-2">
                                <div className="w-8 h-8 rounded-full border-2 border-inverse-surface bg-primary flex items-center justify-center text-[10px] font-bold">CAD</div>
                                <div className="w-8 h-8 rounded-full border-2 border-inverse-surface bg-secondary flex items-center justify-center text-[10px] font-bold">BIM</div>
                                <div className="w-8 h-8 rounded-full border-2 border-inverse-surface bg-tertiary flex items-center justify-center text-[10px] font-bold">LEED</div>
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">Expert Level</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
