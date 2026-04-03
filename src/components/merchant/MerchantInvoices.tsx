import React from 'react';
import { useNavigate } from 'react-router-dom';

const invoices = [
    { id: '#INV-2024-089', title: 'Web-Redesign Deposit', icon: 'receipt_long', date: '24. Okt 2024', amount: '1.250,00 €', paid: true },
    { id: '#INV-2024-082', title: 'Pro Plan - Okt 2024', icon: 'brush', date: '15. Okt 2024', amount: '89,00 €', paid: true },
    { id: '#INV-2024-075', title: 'Social Media Campaign B', icon: 'campaign', date: '02. Okt 2024', amount: '450,00 €', paid: true },
    { id: '#INV-2024-068', title: 'Pro Plan - Sept 2024', icon: 'brush', date: '15. Sept 2024', amount: '89,00 €', paid: true },
];

export const MerchantInvoices: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="pt-8 pb-12 px-6 lg:px-12 max-w-7xl mx-auto w-full">
            {/* Hero / Lead Section */}
            <div className="mb-12">
                <div className="inline-block mb-4 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-[0.2em]">
                    Finanzen &amp; Archiv
                </div>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-5xl md:text-6xl font-extrabold text-on-surface font-headline tracking-tighter leading-none mb-2">Rechnungen</h1>
                        <p className="text-secondary max-w-lg">Ein vollständiges Archiv Ihrer Transaktionen und Dienstleistungsgebühren bei The Civic Studio.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-5 py-3 bg-surface-container-low text-on-surface rounded-lg font-semibold hover:bg-surface-bright transition-all border border-outline-variant/15 active:scale-95">
                            <span className="material-symbols-outlined text-[20px]">filter_list</span>
                            Filter
                        </button>
                        <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-lg font-bold shadow-lg shadow-primary/20 active:opacity-80 transition-all active:scale-95">
                            <span className="material-symbols-outlined text-[20px]">download</span>
                            Export
                        </button>
                    </div>
                </div>
            </div>

            {/* Layout Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-8 space-y-8">
                    {/* Civic Lead Accent */}
                    <div className="border-l-[12px] border-primary bg-surface-container-low p-8 rounded-r-lg">
                        <p className="text-primary font-headline text-2xl font-bold italic leading-tight">
                            "Transparenz ist das Fundament lokaler Partnerschaft. Jede Rechnung ist ein Schritt in Richtung gemeinsamer Stadtentwicklung."
                        </p>
                    </div>

                    {/* Invoice List */}
                    <div className="space-y-4">
                        {invoices.map((inv, i) => (
                            <div
                                key={inv.id}
                                className={`group flex items-center justify-between p-6 bg-surface-container-lowest rounded-xl border border-outline-variant/10 hover:border-primary/30 hover:translate-y-[-4px] transition-all shadow-[0px_12px_32px_rgba(27,59,90,0.06)] ${i === 3 ? 'opacity-75' : ''}`}
                            >
                                <div className="flex items-center gap-6">
                                    <div className="h-12 w-12 flex items-center justify-center bg-primary/5 rounded-lg text-primary">
                                        <span className="material-symbols-outlined">{inv.icon}</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg text-on-surface font-headline">{inv.title}</h4>
                                        <div className="flex items-center gap-3 text-sm text-secondary">
                                            <span className="font-mono">{inv.id}</span>
                                            <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                                            <span>{inv.date}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-10">
                                    <div className="text-right">
                                        <p className="text-xl font-bold text-on-surface font-headline">{inv.amount}</p>
                                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full tracking-wider uppercase">
                                            PAID
                                        </span>
                                    </div>
                                    <button className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-primary/10 text-primary transition-colors">
                                        <span className="material-symbols-outlined">download</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center pt-8">
                        <button className="text-sm font-bold text-primary uppercase tracking-widest hover:underline decoration-2 underline-offset-8 transition-all">
                            Ältere Rechnungen laden
                        </button>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-4 space-y-8">
                    {/* Summary Card */}
                    <div className="bg-surface-container text-on-surface p-8 rounded-xl shadow-[0px_12px_32px_rgba(27,59,90,0.06)]">
                        <h3 className="font-headline text-xl font-bold mb-6">Jahresübersicht 2024</h3>
                        <div className="space-y-6">
                            <div className="flex justify-between items-center pb-4 border-b border-outline-variant/20">
                                <span className="text-secondary text-sm">Gesamt investiert</span>
                                <span className="font-bold font-headline">14.850,20 €</span>
                            </div>
                            <div className="flex justify-between items-center pb-4 border-b border-outline-variant/20">
                                <span className="text-secondary text-sm">Bezahlte Rechnungen</span>
                                <span className="font-bold font-headline">12</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-secondary text-sm">Offene Posten</span>
                                <span className="font-bold font-headline text-primary">0,00 €</span>
                            </div>
                        </div>
                        <div className="mt-8">
                            <div className="w-full bg-surface-container-low h-2 rounded-full overflow-hidden">
                                <div className="bg-primary h-full w-[85%] rounded-full"></div>
                            </div>
                            <p className="text-[10px] text-secondary mt-2 uppercase tracking-widest font-bold">85% des Budgets verbraucht</p>
                        </div>
                    </div>

                    {/* Assistance Image Card */}
                    <div className="relative overflow-hidden rounded-xl h-64 group">
                        <img
                            alt="Support"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCK4DNzldIE3WlUCfbihZQErEZEidLi92w3VHRyjYKfpCLWZacCpAn17r7kQazuLjMvP4ywFHJ9yuIWqlAsyoms9qjjw2JH8THdnG4RQnLiC0RoyrPnm3SdP-W8Xq4ZHXFyi--vUCeuRCtQLlhxrPeO2Dr5WaqzpqugUe4mQvmVHQQZAEOCRL3H8KcPNDQokCaaFeZxWBNj9DisfrUuEl3Uy5QrsrrWoUj18SMg-Xfz0-O7jpYH2jZLO9hdWaXBzDnZRHxfOqgvT8Q"
                        />
                        <div className="absolute inset-0 bg-on-background/60 backdrop-blur-[2px] p-8 flex flex-col justify-end">
                            <h4 className="text-white font-headline text-xl font-bold mb-2">Hilfe nötig?</h4>
                            <p className="text-slate-300 text-sm mb-4">Kontaktieren Sie unsere Buchhaltung für Fragen zu Ihren Belegen.</p>
                            <a className="inline-flex items-center gap-2 text-white font-bold text-sm group" href="#">
                                Support kontaktieren
                                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </a>
                        </div>
                    </div>

                    {/* Payment Method */}
                    <div className="p-8 border border-outline-variant/20 rounded-xl">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="material-symbols-outlined text-primary">credit_card</span>
                            <h3 className="font-headline font-bold">Zahlungsmittel</h3>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-lg">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-6 bg-on-surface rounded flex items-center justify-center">
                                    <span className="text-[10px] text-white font-black italic">VISA</span>
                                </div>
                                <span className="font-mono text-sm tracking-tighter">•••• 4412</span>
                            </div>
                            <button
                                onClick={() => navigate('subscription')}
                                className="text-primary font-bold text-xs hover:underline"
                            >
                                Ändern
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
