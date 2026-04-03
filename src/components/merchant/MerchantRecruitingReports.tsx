import React from 'react';

export const MerchantRecruitingReports: React.FC = () => {
    return (
        <div className="pt-8 pb-12 px-6 lg:px-12 max-w-7xl mx-auto w-full">
            {/* Header Section */}
            <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <span className="text-primary font-bold tracking-widest uppercase text-xs mb-2 block">Monthly Performance Overview</span>
                    <h1 className="text-4xl font-black text-on-surface tracking-tight leading-none mb-4 font-headline">Recruiting-Report</h1>
                    <p className="text-secondary max-w-xl text-lg">Ein analytischer Blick auf Ihre Talent-Akquise im Zeitraum Oktober 2023. Maximieren Sie Ihre Reichweite durch datengestützte Entscheidungen.</p>
                </div>
                <div className="flex gap-4">
                    <button className="bg-slate-100 text-on-surface px-6 py-3 rounded-lg font-semibold hover:bg-slate-200 transition-all flex items-center gap-2">
                        <span className="material-symbols-outlined">download</span> Export PDF
                    </button>
                    <button className="bg-gradient-to-br from-primary to-primary-container text-white px-6 py-3 rounded-lg font-semibold shadow-lg shadow-red-900/10 hover:opacity-90 transition-all">
                        Share Report
                    </button>
                </div>
            </div>

            {/* Bento Grid Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Key Stat: Clicks */}
                <div className="md:col-span-4 bg-surface-container-lowest p-8 rounded-xl shadow-[0_4px_24px_rgba(27,59,90,0.04)] flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-3 bg-red-50 rounded-lg">
                                <span className="material-symbols-outlined text-primary">ads_click</span>
                            </div>
                            <span className="text-emerald-600 flex items-center text-sm font-bold bg-emerald-50 px-2 py-1 rounded">
                                <span className="material-symbols-outlined text-xs mr-1">trending_up</span> +12.4%
                            </span>
                        </div>
                        <h3 className="text-slate-500 font-medium text-sm mb-1">Total Job Clicks</h3>
                        <div className="text-5xl font-black text-on-surface tracking-tighter">8.421</div>
                    </div>
                    <div className="mt-8 h-24 flex items-end gap-1">
                        <div className="w-full bg-slate-100 rounded-t h-[40%]"></div>
                        <div className="w-full bg-slate-100 rounded-t h-[60%]"></div>
                        <div className="w-full bg-slate-100 rounded-t h-[45%]"></div>
                        <div className="w-full bg-primary/20 rounded-t h-[70%]"></div>
                        <div className="w-full bg-primary/40 rounded-t h-[55%]"></div>
                        <div className="w-full bg-primary rounded-t h-[90%]"></div>
                    </div>
                </div>

                {/* Key Stat: Applications */}
                <div className="md:col-span-4 bg-surface-container-lowest p-8 rounded-xl shadow-[0_4px_24px_rgba(27,59,90,0.04)] flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-3 bg-red-50 rounded-lg">
                                <span className="material-symbols-outlined text-primary">description</span>
                            </div>
                            <span className="text-emerald-600 flex items-center text-sm font-bold bg-emerald-50 px-2 py-1 rounded">
                                <span className="material-symbols-outlined text-xs mr-1">trending_up</span> +5.1%
                            </span>
                        </div>
                        <h3 className="text-slate-500 font-medium text-sm mb-1">Total Applications</h3>
                        <div className="text-5xl font-black text-on-surface tracking-tighter">412</div>
                    </div>
                    <div className="mt-8 flex justify-between items-center text-sm">
                        <span className="text-secondary">Conversion Rate</span>
                        <span className="font-bold text-on-surface">4.89%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full mt-2 overflow-hidden">
                        <div className="bg-primary h-full w-[48.9%]"></div>
                    </div>
                </div>

                {/* Key Stat: Matching Quality */}
                <div className="md:col-span-4 bg-surface-container-high p-8 rounded-xl flex flex-col justify-between border-l-8 border-primary">
                    <div>
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-3 bg-white/50 rounded-lg">
                                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                            </div>
                            <span className="text-slate-600 flex items-center text-sm font-medium">Goal: 85%</span>
                        </div>
                        <h3 className="text-slate-700 font-medium text-sm mb-1">Matching-Qualität</h3>
                        <div className="text-5xl font-black text-primary tracking-tighter font-headline">92%</div>
                    </div>
                    <p className="text-on-secondary-container text-sm mt-4 leading-relaxed italic">"Überdurchschnittlich hohe Übereinstimmung der Bewerberprofile mit den Civic Authority Standards."</p>
                </div>

                {/* Visualization: Matching Heatmap */}
                <div className="md:col-span-8 bg-surface-container-lowest p-8 rounded-xl shadow-[0_4px_24px_rgba(27,59,90,0.04)]">
                    <div className="flex justify-between items-center mb-10">
                        <h3 className="text-xl font-bold tracking-tight font-headline">Performance Trends &amp; Klicks</h3>
                        <div className="flex gap-2">
                            <span className="flex items-center gap-2 text-xs text-secondary"><span className="w-3 h-3 rounded-full bg-primary"></span> Aktueller Monat</span>
                            <span className="flex items-center gap-2 text-xs text-secondary"><span className="w-3 h-3 rounded-full bg-slate-200"></span> Vormonat</span>
                        </div>
                    </div>
                    <div className="relative h-64 w-full">
                        {/* Fake Chart Grid */}
                        <div className="absolute inset-0 flex flex-col justify-between">
                            <div className="border-b border-slate-100 w-full h-0"></div>
                            <div className="border-b border-slate-100 w-full h-0"></div>
                            <div className="border-b border-slate-100 w-full h-0"></div>
                            <div className="border-b border-slate-100 w-full h-0"></div>
                        </div>
                        {/* Fake Area Chart Gradient */}
                        <div className="absolute bottom-0 left-0 right-0 h-[80%] bg-gradient-to-t from-red-500/10 to-transparent clip-path-trend">
                            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                                <path d="M0,80 L20,60 L40,75 L60,40 L80,30 L100,10 L100,100 L0,100 Z" fill="url(#grad1)"></path>
                                <path d="M0,80 L20,60 L40,75 L60,40 L80,30 L100,10" fill="none" stroke="#b9000b" strokeWidth="2"></path>
                                <defs>
                                    <linearGradient id="grad1" x1="0%" x2="0%" y1="0%" y2="100%">
                                        <stop offset="0%" style={{ stopColor: '#b9000b', stopOpacity: 0.2 }}></stop>
                                        <stop offset="100%" style={{ stopColor: '#b9000b', stopOpacity: 0 }}></stop>
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                    </div>
                    <div className="flex justify-between mt-4 text-xs font-bold text-slate-400 uppercase tracking-widest px-2">
                        <span>Woche 1</span>
                        <span>Woche 2</span>
                        <span>Woche 3</span>
                        <span>Woche 4</span>
                    </div>
                </div>

                {/* Visualization: Source Quality */}
                <div className="md:col-span-4 bg-on-secondary-fixed p-8 rounded-xl text-white overflow-hidden relative group">
                    <div className="relative z-10">
                        <h3 className="text-xl font-bold tracking-tight mb-8 font-headline">Talent-Quellen</h3>
                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between text-xs mb-2 text-slate-300">
                                    <span>LinkedIn Network</span>
                                    <span>64%</span>
                                </div>
                                <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                                    <div className="bg-primary h-full w-[64%]"></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs mb-2 text-slate-300">
                                    <span>Civic Job Board</span>
                                    <span>22%</span>
                                </div>
                                <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                                    <div className="bg-primary h-full w-[22%]"></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs mb-2 text-slate-300">
                                    <span>Referrals</span>
                                    <span>14%</span>
                                </div>
                                <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                                    <div className="bg-primary h-full w-[14%]"></div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-12">
                            <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                                <span className="text-xs text-slate-400 block mb-1">Top Performer</span>
                                <span className="text-lg font-bold">IT-Administration (m/w/d)</span>
                            </div>
                        </div>
                    </div>
                    {/* Subtle background visual */}
                    <div className="absolute -right-12 -bottom-12 opacity-10 transform rotate-12 group-hover:rotate-0 transition-transform duration-700">
                        <span className="material-symbols-outlined text-[120px]">hub</span>
                    </div>
                </div>
            </div>

            {/* Civic Lead (Signature Component) */}
            <section className="mt-16 bg-surface-container-high p-12 rounded-xl flex items-center border-l-[12px] border-primary">
                <div className="max-w-4xl">
                    <h2 className="text-3xl md:text-4xl font-black text-primary leading-tight font-headline italic">
                        "Die konsequente Anwendung der Archivierungs-Standards hat die Qualität der Bewerber-Pipeline im Vergleich zum Vorquartal um 34% gesteigert."
                    </h2>
                    <div className="mt-6 flex items-center gap-4">
                        <div className="h-px w-12 bg-on-secondary-container/30"></div>
                        <span className="text-sm font-bold uppercase tracking-widest text-on-secondary-container/60">Analytic Insight by Civic Authority AI</span>
                    </div>
                </div>
            </section>
        </div>
    );
};
