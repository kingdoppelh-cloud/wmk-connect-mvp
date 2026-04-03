// label-compliance-check - Pricing component, labels managed by sub-components or sr-only.
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const MerchantSubscription: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="pt-8 pb-12 px-6 lg:px-12 max-w-7xl mx-auto w-full">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-2 block">Kontoeinstellungen</span>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-on-background font-headline">Abonnement</h1>
                </div>
                <button
                    onClick={() => navigate('../invoices')}
                    className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors"
                >
                    <span className="material-symbols-outlined text-sm">history</span>
                    <span className="text-sm font-medium">Rechnungshistorie</span>
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Current Plan Panel */}
                <div className="lg:col-span-4 flex flex-col gap-8">
                    <div className="bg-surface-container-lowest p-8 rounded-xl shadow-[0px_12px_32px_rgba(27,59,90,0.06)] flex flex-col justify-between relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4">
                            <span className="bg-primary/10 text-primary text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Aktiv</span>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-secondary mb-1">Aktueller Plan</p>
                            <h2 className="text-3xl font-bold text-on-background mb-4 font-headline">Pro Plan</h2>
                            <div className="space-y-4 py-6 border-y border-outline-variant/15">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-secondary">Abrechnungszyklus</span>
                                    <span className="text-sm font-semibold text-on-surface">Monatlich</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-secondary">Nächste Zahlung</span>
                                    <span className="text-sm font-semibold text-on-surface">14 Okt 2023</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-secondary">Betrag</span>
                                    <span className="text-sm font-semibold text-on-surface">49,00 € / Monat</span>
                                </div>
                            </div>
                        </div>
                        <button className="mt-8 w-full py-4 bg-surface-container-low text-on-surface font-bold text-sm rounded hover:bg-surface-container-high transition-colors">
                            Zahlungsmittel verwalten
                        </button>
                    </div>

                    {/* Support Card */}
                    <div className="bg-on-background p-8 rounded-xl text-white relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="text-xl font-bold mb-2">Hilfe benötigt?</h3>
                            <p className="text-blue-100/70 text-sm leading-relaxed mb-6">Unsere Experten begleiten Sie beim Wachstum Ihres Unternehmens.</p>
                            <a className="text-white font-bold text-sm underline decoration-primary underline-offset-4 hover:text-primary transition-colors" href="#">Support kontaktieren</a>
                        </div>
                        <span className="material-symbols-outlined absolute -bottom-4 -right-4 text-white/5 text-8xl">support_agent</span>
                    </div>
                </div>

                {/* Upgrade Options */}
                <div className="lg:col-span-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Basic Plan */}
                        <div className="bg-surface-container-low p-8 rounded-xl hover:translate-y-[-4px] transition-transform duration-300">
                            <h3 className="text-xl font-bold text-on-background mb-1 font-headline">Basic</h3>
                            <p className="text-sm text-secondary mb-6">Für aufkommende Studios</p>
                            <div className="flex items-baseline gap-1 mb-8">
                                <span className="text-3xl font-bold text-on-background font-headline">19€</span>
                                <span className="text-sm text-secondary">/Monat</span>
                            </div>
                            <ul className="space-y-4 mb-10">
                                <li className="flex items-start gap-3 text-sm">
                                    <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                                    <span>Unbegrenzte Stellenanzeigen</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm">
                                    <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                                    <span>Standard Analytics</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm opacity-50">
                                    <span className="material-symbols-outlined text-lg">cancel</span>
                                    <span>Erweiterte Analytics</span>
                                </li>
                            </ul>
                            <button className="w-full py-3 px-6 border border-outline-variant/30 font-bold text-sm hover:bg-white/50 transition-colors rounded">
                                Herabstufen
                            </button>
                        </div>

                        {/* Enterprise Plan */}
                        <div className="bg-surface-container-highest p-8 rounded-xl border-l-4 border-primary hover:translate-y-[-4px] transition-transform duration-300">
                            <div className="flex justify-between items-start mb-1">
                                <h3 className="text-xl font-bold text-on-background font-headline">Enterprise</h3>
                                <span className="bg-primary text-white text-[9px] font-black px-2 py-0.5 rounded tracking-tighter">MASSGESCHNEIDERT</span>
                            </div>
                            <p className="text-sm text-secondary mb-6">Volle Leistung und Kontrolle</p>
                            <div className="flex items-baseline gap-1 mb-8">
                                <span className="text-3xl font-bold text-on-background font-headline">99€</span>
                                <span className="text-sm text-secondary">/Monat</span>
                            </div>
                            <ul className="space-y-4 mb-10">
                                <li className="flex items-start gap-3 text-sm">
                                    <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                                    <span>Unbegrenzte Stellenanzeigen</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm font-semibold">
                                    <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                                    <span>Erweiterte Analytics</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm font-semibold">
                                    <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                                    <span>Direktes Talent-Matching</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm">
                                    <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                                    <span>Dedizierter Account Manager</span>
                                </li>
                            </ul>
                            <button
                                onClick={() => navigate('../checkout')}
                                className="w-full py-4 px-6 bg-gradient-to-br from-primary to-primary-container text-white font-bold text-sm rounded shadow-lg shadow-primary/20 active:opacity-80 transition-opacity"
                            >
                                Auf Enterprise upgraden
                            </button>
                        </div>
                    </div>

                    {/* Civic Lead */}
                    <div className="mt-8 bg-surface-container-high p-10 rounded-xl relative overflow-hidden border-l-[12px] border-primary">
                        <div className="relative z-10 max-w-2xl">
                            <h2 className="text-2xl md:text-3xl font-bold font-headline text-primary leading-tight mb-4">
                                "Die Architektur öffentlicher Entscheidungen beginnt mit der Präzision Ihrer Werkzeuge."
                            </h2>
                            <p className="text-secondary font-medium text-sm italic">— Pierre Vaudremont, Studio-Direktor</p>
                        </div>
                        <div className="absolute bottom-0 right-0 opacity-10">
                            <img
                                alt="Decoration"
                                className="w-64 h-64 object-cover rounded-full translate-x-12 translate-y-12"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCE63_ZjbghOQluRy3_Y4YP28U9dNPP5iQMyzjCM065Frl1ylIZ1h8deajtOwAEizhp7wAHOPc0yasc40VCa2Lxe6cnBuxPUijSknN61ABflZqjkasg3XuI1y4APCNMVGrSW699Mx3Irlm6tjviaAKh1EE43G7jb0dhAvPxq8iVblANYgwh4L_673LWXUpCCg473eL93LFby82TSWyAdKr0a4HaNnLL3x0LMHODul1G6PXTcpufly_e21HOa8qME0bSo7Phi0Ll5yY"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
