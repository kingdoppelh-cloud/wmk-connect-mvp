import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * MerchantCheckoutSuccess Component
 * Implementation of the "The Civic Studio" success/confirmation screen.
 * Displays after a successful upgrade or purchase.
 */
export const MerchantCheckoutSuccess: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#05080a] flex items-center justify-center p-4">
            <label className="sr-only">Zahlung erfolgreich</label>
            {/* Top Navigation Bar (Mocked for dashboard layout integration) */}
            <header className="bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-xl fixed top-0 w-full z-50 flex justify-between items-center px-6 py-4 border-b border-outline/5">
                <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-2xl">account_balance</span>
                    <span className="text-xl font-bold text-slate-900 dark:text-white font-public-sans tracking-tight">The Civic Studio</span>
                </div>
                <div className="flex items-center gap-4">
                    <div className="hidden md:flex gap-6 text-slate-600 dark:text-slate-400 font-medium">
                        <span className="text-primary font-semibold cursor-pointer">Studio</span>
                        <span
                            onClick={() => navigate('../')}
                            className="hover:text-primary transition-colors cursor-pointer"
                        >
                            Dashboard
                        </span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-surface-container-high border-2 border-white shadow-sm flex items-center justify-center">
                        <span className="material-symbols-outlined text-secondary">person</span>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 pt-32 pb-32">
                {/* Hero Confirmation Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    {/* Left Side: Success Message */}
                    <div className="lg:col-span-7 space-y-8 animate-in fade-in slide-in-from-left duration-700">
                        <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-lg">
                            <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                            <span className="text-primary font-semibold text-sm uppercase tracking-widest font-label">Upgrade Abgeschlossen</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-extrabold text-on-background tracking-tighter leading-tight font-headline">
                            Willkommen im <br />
                            <span className="text-primary">Enterprise Plan</span>
                        </h1>

                        <p className="text-xl text-secondary max-w-xl leading-relaxed">
                            Ihre Zahlung war erfolgreich. Ihr Workspace im WMK Studio wurde sofort auf die höchste Leistungsstufe skaliert. Entdecken Sie nun Ihre neuen Möglichkeiten.
                        </p>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <button
                                onClick={() => navigate('../')}
                                className="bg-gradient-to-br from-primary to-primary-container text-on-primary px-8 py-4 rounded-md font-bold flex items-center gap-3 shadow-xl hover:shadow-2xl transition-all active:scale-95 group"
                            >
                                <span>Zurück zum Dashboard</span>
                                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </button>
                            <button className="border border-outline/15 bg-white text-on-surface px-8 py-4 rounded-md font-bold flex items-center gap-3 hover:bg-surface-bright transition-colors">
                                <span className="material-symbols-outlined">download</span>
                                <span>Rechnungs-Download</span>
                            </button>
                        </div>
                    </div>

                    {/* Right Side: Transaction Summary Card */}
                    <div className="lg:col-span-5 relative mt-12 lg:mt-0 animate-in fade-in slide-in-from-right duration-700 delay-200">
                        <div className="absolute -top-12 -right-12 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-50"></div>
                        <div className="relative bg-surface-container-lowest p-8 md:p-10 rounded-xl shadow-[0px_12px_32px_rgba(27,59,90,0.06)] border border-outline/10">
                            <div className="flex justify-between items-start mb-10">
                                <div>
                                    <h3 className="text-2xl font-bold font-headline mb-1">Zusammenfassung</h3>
                                    <p className="text-sm text-secondary font-inter">Transaktions-ID: WMK-82931-TX</p>
                                </div>
                                <span className="material-symbols-outlined text-4xl text-primary/20">receipt_long</span>
                            </div>

                            <div className="space-y-6">
                                <div className="flex justify-between items-center pb-6 border-b border-outline-variant/20">
                                    <span className="text-secondary font-medium font-inter">Abonnement</span>
                                    <span className="text-on-background font-bold uppercase tracking-tight">Enterprise (Jährlich)</span>
                                </div>
                                <div className="flex justify-between items-center pb-6 border-b border-outline-variant/20">
                                    <span className="text-secondary font-medium font-inter">Benutzer</span>
                                    <span className="text-on-background font-bold">Unbegrenzt</span>
                                </div>
                                <div className="flex justify-between items-center pb-6 border-b border-outline-variant/20">
                                    <span className="text-secondary font-medium font-inter">Nächste Abrechnung</span>
                                    <span className="text-on-background font-bold">12. Okt 2025</span>
                                </div>
                                <div className="pt-4 flex justify-between items-end">
                                    <div>
                                        <span className="block text-xs text-secondary uppercase font-bold tracking-widest font-label">Gesamtbetrag</span>
                                        <span className="text-3xl font-extrabold text-on-background">€1.490,00</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-primary bg-primary/5 px-3 py-1 rounded">
                                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                                        <span className="text-xs font-bold uppercase">Bezahlt</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating Info Badge */}
                        <div className="absolute -bottom-6 -left-6 bg-inverse-surface text-inverse-on-surface p-4 rounded-lg shadow-xl flex items-center gap-4 max-w-[240px]">
                            <span className="material-symbols-outlined text-primary-fixed" style={{ color: '#ffdad5' }}>auto_awesome</span>
                            <p className="text-xs leading-snug">Alle Enterprise-Features wurden für <span className="font-bold">office@wmk.studio</span> aktiviert.</p>
                        </div>
                    </div>
                </div>

                {/* Bento Grid Benefits Section */}
                <section className="w-full mt-32 space-y-12">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl font-bold font-headline mb-4">Was Sie nun erwartet</h2>
                        <div className="w-24 h-1.5 bg-primary rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {/* Featured Card */}
                        <div className="md:col-span-2 lg:col-span-2 bg-surface-container-low p-8 rounded-xl flex flex-col justify-between group hover:bg-surface-bright transition-all cursor-pointer">
                            <div>
                                <div className="w-12 h-12 bg-white rounded-md flex items-center justify-center mb-6 shadow-sm">
                                    <span className="material-symbols-outlined text-primary text-3xl">lan</span>
                                </div>
                                <h3 className="text-2xl font-bold mb-3 font-headline">Enterprise Networking</h3>
                                <p className="text-secondary leading-relaxed font-inter">Verknüpfen Sie Ihre Studio-Instanzen weltweit mit dedizierten Glasfaser-Tunneln für Latenzzeiten unter 5ms.</p>
                            </div>
                            <div className="mt-10 flex items-center text-primary font-bold gap-2 group">
                                <span>Jetzt konfigurieren</span>
                                <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">chevron_right</span>
                            </div>
                        </div>

                        <div className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/10 shadow-sm hover:-translate-y-1 transition-transform cursor-pointer">
                            <span className="material-symbols-outlined text-secondary text-4xl mb-6">shield_person</span>
                            <h3 className="text-xl font-bold mb-2 font-headline">Premium Support</h3>
                            <p className="text-sm text-secondary font-inter">Ihr persönlicher Account Manager steht Ihnen 24/7 zur Verfügung.</p>
                        </div>

                        <div className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/10 shadow-sm hover:-translate-y-1 transition-transform cursor-pointer">
                            <span className="material-symbols-outlined text-secondary text-4xl mb-6">history_edu</span>
                            <h3 className="text-xl font-bold mb-2 font-headline">Audit Logs</h3>
                            <p className="text-sm text-secondary font-inter">Volle Transparenz über alle Änderungen und Aktivitäten in Ihrem Studio.</p>
                        </div>

                        {/* Academy & News */}
                        <div className="md:col-span-3 lg:col-span-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2 relative overflow-hidden rounded-xl h-64 group cursor-pointer">
                                <img
                                    alt="Modern corporate office"
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8 flex flex-col justify-end">
                                    <h3 className="text-2xl font-bold text-white font-headline">WMK Studio Academy</h3>
                                    <p className="text-white/70 text-sm max-w-md font-inter">Kostenlose Schulungssitzungen für Ihr gesamtes Team sind jetzt freigeschaltet.</p>
                                </div>
                            </div>

                            <div className="bg-primary p-8 rounded-xl flex flex-col justify-center items-center text-center text-white cursor-pointer hover:bg-primary/90 transition-colors">
                                <span className="material-symbols-outlined text-5xl mb-4">campaign</span>
                                <h3 className="text-xl font-bold mb-2 font-headline">Neuigkeiten</h3>
                                <p className="text-white/80 text-sm font-inter">Entdecken Sie die neuesten Features im WMK Enterprise Changelog.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="w-full py-12 px-6 border-t border-outline-variant/10 text-center">
                <p className="text-secondary text-sm font-medium tracking-wide">© 2024 THE CIVIC STUDIO — WMK DIGITAL SOLUTIONS</p>
            </footer>
        </div>
    );
};
