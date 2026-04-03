import React from 'react';

export const MerchantAnalytics: React.FC = () => {
    return (
        <div className="pt-8 pb-12 px-6 lg:px-12 max-w-7xl mx-auto w-full">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary mb-3 block">Analytics Intelligence Center</span>
                    <h2 className="text-4xl md:text-6xl font-headline font-bold tracking-[-0.02em] text-primary leading-tight">Performance-Check</h2>
                </div>
                {/* Time Filter */}
                <div className="flex items-center bg-surface-container-low p-1.5 rounded-2xl shadow-sm overflow-x-auto w-full md:w-auto">
                    <button className="flex-1 md:flex-none px-5 py-2.5 text-sm font-semibold rounded-xl text-slate-500 hover:text-slate-900 transition-colors shrink-0">7 Tage</button>
                    <button className="flex-1 md:flex-none px-5 py-2.5 text-sm font-bold rounded-xl bg-white shadow-sm text-primary shrink-0">30 Tage</button>
                    <button className="flex-1 md:flex-none px-5 py-2.5 text-sm font-semibold rounded-xl text-slate-500 hover:text-slate-900 transition-colors shrink-0">Gesamt</button>
                </div>
            </div>

            {/* Premium KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
                <div className="bg-surface-container-low p-8 rounded-[2rem] no-line hover:bg-surface-container-high transition-all group">
                    <div className="flex justify-between items-center mb-6">
                        <span className="w-12 h-12 bg-white text-primary rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-2xl">visibility</span>
                        </span>
                        <span className="text-green-600 text-xs font-bold flex items-center gap-1 bg-green-50 px-2.5 py-1 rounded-full border border-green-100">
                            +15% <span className="material-symbols-outlined text-[14px]">arrow_upward</span>
                        </span>
                    </div>
                    <p className="text-on-surface opacity-50 text-[10px] font-bold uppercase tracking-widest mb-1">Profil-Aufrufe</p>
                    <h3 className="text-4xl font-headline font-bold text-primary tracking-tight">12.4k</h3>
                </div>

                <div className="bg-surface-container-low p-8 rounded-[2rem] no-line hover:bg-surface-container-high transition-all group">
                    <div className="flex justify-between items-center mb-6">
                        <span className="w-12 h-12 bg-white text-primary rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-2xl">touch_app</span>
                        </span>
                        <span className="text-green-600 text-xs font-bold flex items-center gap-1 bg-green-50 px-2.5 py-1 rounded-full border border-green-100">
                            +8% <span className="material-symbols-outlined text-[14px]">arrow_upward</span>
                        </span>
                    </div>
                    <p className="text-on-surface opacity-50 text-[10px] font-bold uppercase tracking-widest mb-1">Interaktionen</p>
                    <h3 className="text-4xl font-headline font-bold text-primary tracking-tight">3,240</h3>
                </div>

                <div className="bg-primary p-8 rounded-[2rem] no-line shadow-xl shadow-primary/10 group hover:scale-[1.02] transition-transform origin-bottom">
                    <div className="flex justify-between items-center mb-6">
                        <span className="w-12 h-12 bg-white/10 text-white rounded-xl flex items-center justify-center backdrop-blur-sm group-hover:rotate-12 transition-transform">
                            <span className="material-symbols-outlined text-2xl">cases</span>
                        </span>
                        <span className="text-white text-xs font-bold flex items-center gap-1 bg-white/20 px-2.5 py-1 rounded-full border border-white/10">
                            +22% <span className="material-symbols-outlined text-[14px]">trending_up</span>
                        </span>
                    </div>
                    <p className="text-white/70 text-[10px] font-bold uppercase tracking-widest mb-1">Qualifizierte Bewerber</p>
                    <h3 className="text-4xl font-headline font-bold text-white tracking-tight">145</h3>
                </div>

                <div className="bg-surface-container-low p-8 rounded-[2rem] no-line hover:bg-surface-container-high transition-all group">
                    <div className="flex justify-between items-center mb-6">
                        <span className="w-12 h-12 bg-white text-primary rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-2xl">timer</span>
                        </span>
                        <span className="text-red-500 text-xs font-bold flex items-center gap-1 bg-red-50 px-2.5 py-1 rounded-full border border-red-100">
                            -2Tg <span className="material-symbols-outlined text-[14px]">arrow_downward</span>
                        </span>
                    </div>
                    <p className="text-on-surface opacity-50 text-[10px] font-bold uppercase tracking-widest mb-1">Time-to-Hire</p>
                    <h3 className="text-4xl font-headline font-bold text-primary tracking-tight">14 <span className="text-lg opacity-50 font-sans tracking-normal">Tage</span></h3>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                {/* Performance Tracking Chart */}
                <div className="lg:col-span-2 bg-white p-8 md:p-10 rounded-[2.5rem] no-line shadow-sm border border-slate-100 flex flex-col">
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <h3 className="text-2xl font-headline font-bold text-primary tracking-tight mb-2">Performance Tracking</h3>
                            <p className="text-sm font-medium text-on-surface opacity-60">Entwicklung der letzten 30 Tage</p>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-primary"></span>
                                <span className="text-xs font-bold text-slate-500">Bewerber</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-secondary"></span>
                                <span className="text-xs font-bold text-slate-500">Views</span>
                            </div>
                        </div>
                    </div>

                    {/* Placeholder for SVG Chart */}
                    <div className="flex-1 w-full bg-surface-container-lowest rounded-2xl border border-dashed border-slate-200 flex items-center justify-center relative overflow-hidden min-h-[300px]">
                        {/* Mock Chart Lines */}
                        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                            <path d="M0,80 Q25,70 50,40 T100,20" fill="none" stroke="#002542" strokeWidth="2" strokeLinecap="round" className="opacity-80" />
                            <path d="M0,90 Q30,85 60,60 T100,50" fill="none" stroke="#b52426" strokeWidth="2" strokeLinecap="round" className="opacity-80" />

                            {/* Grid Lines */}
                            <line x1="0" y1="25" x2="100" y2="25" stroke="#f1f5f9" strokeWidth="0.5" />
                            <line x1="0" y1="50" x2="100" y2="50" stroke="#f1f5f9" strokeWidth="0.5" />
                            <line x1="0" y1="75" x2="100" y2="75" stroke="#f1f5f9" strokeWidth="0.5" />
                        </svg>

                        <div className="absolute inset-0 flex items-end justify-between px-4 pb-2 text-[10px] font-bold text-slate-400">
                            <span>01. Okt</span>
                            <span>15. Okt</span>
                            <span>30. Okt</span>
                        </div>
                    </div>
                </div>

                {/* Sub-Components Side */}
                <div className="lg:col-span-1 space-y-8 flex flex-col">
                    {/* Best Performing Ad */}
                    <div className="bg-primary p-8 rounded-[2.5rem] no-line text-white shadow-xl shadow-primary/10 flex-1 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform duration-700"></div>
                        <div className="relative z-10 h-full flex flex-col">
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 mb-4 block">Top Performer (Job)</span>
                            <h4 className="text-2xl font-headline font-bold leading-tight mb-2">Senior Software Engineer</h4>
                            <p className="text-white/70 text-sm mb-6 pb-6 border-b border-white/10">Standort Witzenhausen</p>

                            <div className="mt-auto space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-white/60">Conversion Rate</span>
                                    <span className="text-lg font-bold font-public-sans text-white">8.4%</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-white/60">Bewerber (30T)</span>
                                    <span className="text-lg font-bold font-public-sans text-white">42</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Talent Pool Insights */}
                    <div className="bg-surface-container-low p-8 rounded-[2.5rem] no-line flex-1">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary mb-4 block">Talent-Pool Status</span>
                        <h4 className="text-xl font-headline font-bold text-primary mb-6">Wachsende Base</h4>
                        <div className="flex items-end gap-3 mb-6">
                            <span className="text-5xl font-black font-public-sans text-primary leading-none">384</span>
                            <span className="text-sm font-bold text-slate-500 mb-1">Follower</span>
                        </div>
                        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mb-3">
                            <div className="bg-secondary h-full rounded-full" style={{ width: '65%' }}></div>
                        </div>
                        <p className="text-xs font-medium text-slate-500">65% haben den Newsletter abonniert</p>
                    </div>
                </div>
            </div>

            {/* ROI Section */}
            <div className="bg-surface-container-low p-10 md:p-12 rounded-[3rem] no-line border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="max-w-2xl">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary mb-3 block">Recruiting ROI</span>
                    <h3 className="text-3xl md:text-4xl font-headline font-bold text-primary tracking-tight mb-4">Dein Investment rechnet sich.</h3>
                    <p className="text-on-surface opacity-60 text-lg leading-relaxed">
                        Im Vergleich zu traditionellen Stellenanzeigen sparst du aktuell durchschnittlich <span className="font-bold text-primary">2.450 €</span> per Hire durch den direkten Zugang zum lokalen Talentpool auf WMK Connect.
                    </p>
                </div>
                <button className="whitespace-nowrap px-8 py-4 bg-white text-primary border border-slate-200 font-bold rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95 flex items-center gap-3 group shrink-0">
                    Detaillierten Report laden
                    <span className="material-symbols-outlined text-lg group-hover:translate-y-1 transition-transform">download</span>
                </button>
            </div>
        </div>
    );
};

