import React from 'react';

export const StudioServiceDetail: React.FC = () => {
    return (
        <div className="pt-8 pb-32 max-w-7xl mx-auto px-6">
            {/* Hero Section: Asymmetric & Editorial */}
            <section className="grid grid-cols-1 md:grid-cols-12 gap-12 items-end mb-24">
                <div className="md:col-span-8">
                    <div className="inline-block px-3 py-1 mb-6 bg-surface-container-high rounded-full">
                        <span className="text-xs font-bold uppercase tracking-widest text-primary font-label">Premium Optik</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-on-background leading-[0.9] tracking-tighter mb-8">
                        Web-Redesign <br />& <span className="text-primary italic">UI/UX</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-secondary max-w-2xl leading-relaxed">
                        Wir verwandeln Ihre bestehende Website in ein modernes, leistungsstarkes Aushängeschild für Ihr Unternehmen. Fokus auf Konversion und Premium-Look.
                    </p>
                </div>
                <div className="md:col-span-4 flex justify-end">
                    <div className="p-8 bg-surface-container-low rounded-xl border-l-8 border-primary shadow-sm">
                        <div className="text-label-md uppercase tracking-widest text-secondary font-bold mb-2">Investment</div>
                        <div className="text-4xl font-black text-on-background">ab 2.500 €</div>
                        <div className="text-sm text-secondary mt-1">Individuelles Angebot</div>
                    </div>
                </div>
            </section>

            {/* Bento Grid: Features & Preview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
                {/* Feature Card: Mobile First */}
                <div className="md:col-span-1 bg-surface-container-lowest p-10 rounded-xl flex flex-col justify-between hover:translate-y-[-4px] transition-transform duration-300 shadow-sm border border-outline-variant/10">
                    <div>
                        <span className="material-symbols-outlined text-primary text-4xl mb-6">smartphone</span>
                        <h3 className="text-2xl font-bold mb-4 font-headline">Mobile-First Design</h3>
                        <p className="text-secondary leading-relaxed">Nahtlose Erlebnisse auf allen Endgeräten – von Smartphone bis Desktop.</p>
                    </div>
                </div>

                {/* Main Preview Card (Case Study) */}
                <div className="md:col-span-2 md:row-span-2 relative overflow-hidden rounded-xl bg-slate-900 group shadow-lg">
                    <img alt="Premium Web Design UI" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4n5nyEwqfW-s8f20Cg_tvbs6LNA_fqwxdYv0Djr-giJiULE9OuRG4U9A6yVA2CHsK6nVqJWqYDLg9rlSTRBfg1cdjkVvCVyjBCw3V9Mp0dtRWizKlhZUnORoavFxvjafGV1wkr04xMeGjXjT2WN-vlvsdggMSHL6hqk_crUGCUgyC8O1ywgK8QpacNhHluI9DmXUaGnWqPFQORi4ZE7ffMPRzidNApigq4oq-1ZrKp_ITwuDEuRwNUVEBLtXC9r3XeDVrwhcTHMY" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-90"></div>
                    <div className="absolute bottom-0 left-0 p-10 w-full">
                        <div className="flex items-center gap-4 mb-4">
                            <span className="px-3 py-1 bg-primary text-on-primary text-xs font-bold rounded">BEFORE / AFTER</span>
                        </div>
                        <h2 className="text-3xl font-black text-white mb-2 font-headline">Digital Transformation</h2>
                        <p className="text-slate-300 max-w-md">Einblicke in unsere jüngste Zusammenarbeit mit führenden Industrie-Partnern.</p>
                    </div>
                </div>

                {/* Feature Card: Tailwind */}
                <div className="md:col-span-1 bg-surface-container-lowest p-10 rounded-xl flex flex-col justify-between hover:translate-y-[-4px] transition-transform duration-300 shadow-sm border border-outline-variant/10">
                    <div>
                        <span className="material-symbols-outlined text-primary text-4xl mb-6">terminal</span>
                        <h3 className="text-2xl font-bold mb-4 font-headline">Tailwind CSS Integration</h3>
                        <p className="text-secondary leading-relaxed">Moderne Utility-First Architektur für maximale Skalierbarkeit und Wartbarkeit.</p>
                    </div>
                </div>
            </div>

            {/* Secondary Details: The "Civic Lead" Style */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
                <div className="order-2 md:order-1">
                    <div className="bg-surface-container-high p-12 rounded-xl border-l-[12px] border-primary shadow-sm">
                        <h2 className="text-4xl font-black text-primary mb-6 leading-tight font-headline">"Qualität ist kein Zufall, sondern das Ergebnis höchster Präzision."</h2>
                        <p className="text-on-surface font-medium italic opacity-75">— WMK Studio Design-Prinzip</p>
                    </div>
                </div>
                <div className="order-1 md:order-2 space-y-12">
                    <div className="flex gap-6">
                        <div className="w-12 h-12 shrink-0 bg-primary-container rounded-lg flex items-center justify-center text-on-primary">
                            <span className="material-symbols-outlined">speed</span>
                        </div>
                        <div>
                            <h4 className="text-xl font-bold mb-2 font-headline">Optimierte Ladezeiten</h4>
                            <p className="text-secondary">Core Web Vitals Optimierung für blitzschnelle Performance und bessere Nutzersignale.</p>
                        </div>
                    </div>
                    <div className="flex gap-6">
                        <div className="w-12 h-12 shrink-0 bg-primary-container rounded-lg flex items-center justify-center text-on-primary">
                            <span className="material-symbols-outlined">travel_explore</span>
                        </div>
                        <div>
                            <h4 className="text-xl font-bold mb-2 font-headline">SEO-Grundgerüst</h4>
                            <p className="text-secondary">Strukturiertes Markup und semantisches HTML für die beste Sichtbarkeit bei Google.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section: Floating Glass Card */}
            <section className="relative bg-on-background rounded-3xl p-12 md:p-20 overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary opacity-20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div className="relative z-10 text-center max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tighter font-headline">Bereit für den nächsten Schritt?</h2>
                    <p className="text-slate-300 text-lg mb-12 leading-relaxed">
                        Lassen Sie uns gemeinsam besprechen, wie wir Ihre Online-Präsenz auf das nächste Level heben können.
                    </p>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <button className="w-full md:w-auto px-10 py-5 bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold rounded-xl active:scale-95 transition-transform shadow-lg shadow-primary/20">
                            Jetzt unverbindlich anfragen
                        </button>
                        <button className="w-full md:w-auto px-10 py-5 border border-white/15 text-white font-bold rounded-xl hover:bg-white/5 transition-colors">
                            Portfolio ansehen
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};
