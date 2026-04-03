import React from 'react';
import { useNavigate } from 'react-router-dom';

export const MerchantTalentPool: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="pt-8 pb-12 px-6 lg:px-12 max-w-7xl mx-auto w-full">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <div>
                    <h2 className="text-4xl font-extrabold font-headline tracking-tight text-on-surface mb-2">Talent Pool</h2>
                    <p className="text-secondary font-medium">Verwaltung von 2.481 gemerkten Kandidaten</p>
                </div>
                <div className="flex gap-3">
                    <button className="bg-surface-container-low text-on-surface px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-surface-container transition-all border border-transparent">
                        <span className="material-symbols-outlined text-lg">file_download</span> Export
                    </button>
                    <button className="bg-gradient-to-br from-primary to-primary-container text-on-primary px-8 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg hover:opacity-90 transition-all">
                        <span className="material-symbols-outlined text-lg">person_add</span> Neuer Kandidat
                    </button>
                </div>
            </div>

            {/* Filters & Search Bar */}
            <div className="bg-surface-container-low p-6 rounded-2xl mb-8 flex flex-col xl:flex-row gap-4 items-center">
                <div className="relative w-full xl:w-96">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-secondary">search</span>
                    <input
                        className="w-full bg-white border-none rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-primary/20 text-on-surface shadow-sm"
                        placeholder="Name, Skills oder Ort suchen..."
                        type="text"
                        aria-label="Kandidaten suchen"
                    />
                </div>
                <div className="flex flex-wrap gap-3 w-full">
                    <select aria-label="Fachbereich filtern" className="bg-white border-none shadow-sm rounded-xl px-4 py-3 text-sm font-semibold text-secondary focus:ring-2 focus:ring-primary/20 min-w-[140px] cursor-pointer">
                        <option>Fachbereich</option>
                        <option>Bauwesen</option>
                        <option>IT &amp; Software</option>
                        <option>Administration</option>
                    </select>
                    <select aria-label="Status filtern" className="bg-white border-none shadow-sm rounded-xl px-4 py-3 text-sm font-semibold text-secondary focus:ring-2 focus:ring-primary/20 min-w-[140px] cursor-pointer">
                        <option>Status</option>
                        <option>Verfügbar</option>
                        <option>In Prüfung</option>
                        <option>Platziert</option>
                    </select>
                    <select aria-label="Erfahrung filtern" className="bg-white border-none shadow-sm rounded-xl px-4 py-3 text-sm font-semibold text-secondary focus:ring-2 focus:ring-primary/20 min-w-[140px] cursor-pointer">
                        <option>Erfahrung</option>
                        <option>Junior</option>
                        <option>Professional</option>
                        <option>Senior</option>
                    </select>
                    <button className="ml-auto text-primary font-bold text-sm hover:underline py-2 px-4 transition-all">Filter zurücksetzen</button>
                </div>
            </div>

            {/* Content Grid: Asymmetric Layout */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                {/* Main List View (8 columns) */}
                <div className="xl:col-span-8 space-y-6">
                    {/* Candidate Card 1 */}
                    <div
                        onClick={() => navigate('../applicants/elena')}
                        className="bg-surface-container-lowest p-6 rounded-2xl shadow-[0_4px_24px_rgba(27,59,90,0.04)] border border-outline-variant/15 hover:translate-y-[-4px] hover:shadow-lg transition-all group cursor-pointer"
                    >
                        <div className="flex items-start gap-6">
                            <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQIHNAqe0Bz5BOpPtSsWREJ1azYe_6mZbCXM15S3ogJv0ABfN9yZCQVPkblVvKIbrNaaKkOSMKRb64y1GYF3GxPx4eZnMF3fueIzsP-Eb6ye4QkcnkpvuRWPOzuOh8YQv703eSsHIo_MPmRfFLiT4FPZ2fUosXWnFKi1VZypV420awyFDGwbdqKnzIypgzCLcZyw_oyx2C1whun_-dj1rfaYNpNVPRC_f53X5E_CtHkKzVxQNqP49-Ibz3gP62eZLUHbDBA5-ELME" alt="Markus Weber" />
                            </div>
                            <div className="flex-grow">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="text-xl font-bold text-on-surface font-headline group-hover:text-primary transition-colors">Markus Weber</h3>
                                        <p className="text-secondary text-sm font-medium">Bauleiter / Projektmanagement</p>
                                    </div>
                                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full uppercase tracking-wider">Verfügbar</span>
                                </div>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded uppercase">Stahlbeton</span>
                                    <span className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded uppercase">CAD</span>
                                    <span className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded uppercase">HOAI</span>
                                </div>
                                <div className="p-3 bg-surface-container-low rounded-lg border-l-4 border-primary/30 group-hover:bg-surface-container transition-colors">
                                    <p className="text-sm italic text-secondary">"Hervorragende Referenzen aus dem öffentlichen Sektor. Fokus auf nachhaltiges Bauen."</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <button className="p-2 hover:bg-red-50 rounded-lg text-secondary hover:text-primary transition-colors" onClick={(e) => { e.stopPropagation(); }}>
                                    <span className="material-symbols-outlined">grade</span>
                                </button>
                                <button className="p-2 hover:bg-red-50 rounded-lg text-secondary hover:text-primary transition-colors" onClick={(e) => { e.stopPropagation(); }}>
                                    <span className="material-symbols-outlined">more_vert</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Candidate Card 2 */}
                    <div
                        onClick={() => navigate('../applicants/elena')}
                        className="bg-surface-container-lowest p-6 rounded-2xl shadow-[0_4px_24px_rgba(27,59,90,0.04)] border border-outline-variant/15 hover:translate-y-[-4px] hover:shadow-lg transition-all group cursor-pointer"
                    >
                        <div className="flex items-start gap-6">
                            <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKoVR0AFamW6tYsmmQhSNwNvqGHta_algNDcLl2omVbBHD7KdSVrPItEjz2nveSb_MOWnmiNt0QMCZesATxirji4y8xWfeMIarAtI4-Znv93rCzyyqN9fmzvl3Ef0FZbZ96gyj0datXBNeOHc7KYg0bot9zEnArvezQauKXZb7ZgUu_tJ6DL3Mv88dggEwmN6zVo6G_vvIUc8_-pBflBoK_RkeU5_hMJDfMxdgg-nJuGmkK2aKUrJCI1butJFVVYKTh3AQgCA4e5A" alt="Elena Fischer" />
                            </div>
                            <div className="flex-grow">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="text-xl font-bold text-on-surface font-headline group-hover:text-primary transition-colors">Elena Fischer</h3>
                                        <p className="text-secondary text-sm font-medium">Senior Cloud Architect</p>
                                    </div>
                                    <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full uppercase tracking-wider">In Prüfung</span>
                                </div>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded uppercase">AWS</span>
                                    <span className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded uppercase">Kubernetes</span>
                                    <span className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded uppercase">Python</span>
                                </div>
                                <div className="p-3 bg-surface-container-low rounded-lg border-l-4 border-primary/30 group-hover:bg-surface-container transition-colors">
                                    <p className="text-sm italic text-secondary">"Zweitgespräch am 14.10. geplant. Sehr starke Kommunikationsskills."</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <button className="p-2 bg-red-50 rounded-lg text-primary transition-colors" onClick={(e) => { e.stopPropagation(); }}>
                                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>grade</span>
                                </button>
                                <button className="p-2 hover:bg-red-50 rounded-lg text-secondary hover:text-primary transition-colors" onClick={(e) => { e.stopPropagation(); }}>
                                    <span className="material-symbols-outlined">more_vert</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Candidate Card 3 */}
                    <div
                        onClick={() => navigate('../applicants/elena')}
                        className="bg-surface-container-lowest p-6 rounded-2xl shadow-[0_4px_24px_rgba(27,59,90,0.04)] border border-outline-variant/15 hover:translate-y-[-4px] hover:shadow-lg transition-all group cursor-pointer"
                    >
                        <div className="flex items-start gap-6">
                            <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmFijeOgv-zCG5WP3zIjBcxR-sBazDckbGEtSqOB-RKKlY_LrS-wYl_pX4p_wodGeIpOvNTmGbAsMmyyxMQiObkmzDl3OJJ2l40QImLDK-0odmqZkfr0fvd_k-b1IghhxYxLUoQQgxAFEeMviVlkoGRIt-5Jz5UZeMtkamkAVMXFHmEksCp4HKpOOE39HiSXD7Fa2s5EZjEQvGYuutl-WP6Aq4p77zDHMplk8FU_IIGXS-E_Nus-Fyb_juFs_vQhYbaOHXFxLQMwE" alt="Sarah Kofler" />
                            </div>
                            <div className="flex-grow">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="text-xl font-bold text-on-surface font-headline group-hover:text-primary transition-colors">Sarah Kofler</h3>
                                        <p className="text-secondary text-sm font-medium">Stadtplanerin / Architektin</p>
                                    </div>
                                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full uppercase tracking-wider">Verfügbar</span>
                                </div>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded uppercase">Revitalisierung</span>
                                    <span className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded uppercase">BIM</span>
                                </div>
                                <div className="p-3 bg-surface-container-low rounded-lg border-l-4 border-primary/30 group-hover:bg-surface-container transition-colors">
                                    <p className="text-sm italic text-secondary">"Spezialisierung auf Denkmalschutz. Portfolio sehr beeindruckend."</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <button className="p-2 hover:bg-red-50 rounded-lg text-secondary hover:text-primary transition-colors" onClick={(e) => { e.stopPropagation(); }}>
                                    <span className="material-symbols-outlined">grade</span>
                                </button>
                                <button className="p-2 hover:bg-red-50 rounded-lg text-secondary hover:text-primary transition-colors" onClick={(e) => { e.stopPropagation(); }}>
                                    <span className="material-symbols-outlined">more_vert</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar/Secondary Panel (4 columns) */}
                <div className="xl:col-span-4 space-y-8">
                    {/* Quick Stats Block */}
                    <div className="bg-surface-container-high p-8 rounded-2xl relative overflow-hidden">
                        <div className="absolute -right-8 -top-8 opacity-10">
                            <span className="material-symbols-outlined text-[150px] text-primary leading-none">hub</span>
                        </div>
                        <h4 className="text-sm font-black uppercase tracking-widest text-primary mb-6 relative z-10">Pool Übersicht</h4>
                        <div className="space-y-6 relative z-10">
                            <div className="flex justify-between items-end border-b border-outline-variant/20 pb-2">
                                <span className="text-secondary font-medium">Top Skill</span>
                                <span className="text-xl font-black text-on-surface font-headline">IT &amp; Software</span>
                            </div>
                            <div className="flex justify-between items-end border-b border-outline-variant/20 pb-2">
                                <span className="text-secondary font-medium">Offene Anfragen</span>
                                <span className="text-xl font-black text-on-surface font-headline">12</span>
                            </div>
                            <div className="flex justify-between items-end">
                                <span className="text-secondary font-medium">Placement Rate</span>
                                <span className="text-xl font-black text-primary font-headline">84%</span>
                            </div>
                        </div>
                    </div>

                    {/* Recent Notes Widget */}
                    <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-[0_4px_24px_rgba(27,59,90,0.04)] border border-outline-variant/15">
                        <h4 className="text-lg font-bold text-on-surface mb-4 font-headline tracking-tight">Schnell-Notizen</h4>
                        <div className="space-y-4">
                            <div className="pb-4 border-b border-slate-100">
                                <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase mb-1">
                                    <span>Vor 2 Std.</span>
                                    <span>Admin</span>
                                </div>
                                <p className="text-sm text-secondary">Markus Weber hat sein CV aktualisiert. Sofort prüfen.</p>
                            </div>
                            <div className="pb-4 border-b border-slate-100">
                                <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase mb-1">
                                    <span>Gestern</span>
                                    <span>System</span>
                                </div>
                                <p className="text-sm text-secondary">5 neue Bewerber für "Bauwesen" automatisch gematcht.</p>
                            </div>
                        </div>
                        <button className="w-full mt-4 py-2 text-primary font-bold text-sm hover:bg-red-50 rounded-lg transition-colors">Alle Notizen anzeigen</button>
                    </div>

                    {/* Ad Banner / Signature Component */}
                    <div className="bg-primary p-[2px] rounded-2xl shadow-lg">
                        <div className="bg-on-background p-6 rounded-xl">
                            <h4 className="text-on-primary-container font-headline text-lg font-bold mb-2">Automatisierung aktiv</h4>
                            <p className="text-surface-variant text-xs mb-4 leading-relaxed opacity-80">KI-Matching vergleicht Ihren Talent-Pool jede Nacht mit neuen Ausschreibungen.</p>
                            <a className="text-primary-fixed font-bold text-xs flex items-center gap-1 hover:underline group" href="#">
                                Einstellungen anpassen
                                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
