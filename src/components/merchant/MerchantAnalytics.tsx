import React from 'react';

export const MerchantAnalytics: React.FC = () => {
    return (
        <div className="pt-8 pb-12 px-6 lg:px-12 max-w-7xl mx-auto w-full">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary mb-3 block">Enterprise Report</span>
                    <h2 className="text-4xl md:text-6xl font-headline font-bold tracking-[-0.02em] text-primary leading-tight">Analyse &amp; Insights</h2>
                </div>
                {/* Time Filter */}
                <div className="flex items-center bg-surface-container-low p-1 rounded-xl shadow-sm overflow-x-auto">
                    <button className="px-4 py-2 text-sm font-semibold rounded-lg text-slate-500 hover:text-slate-900 transition-colors shrink-0">7 Tage</button>
                    <button className="px-4 py-2 text-sm font-bold rounded-lg bg-white shadow-sm text-primary shrink-0">30 Tage</button>
                    <button className="px-4 py-2 text-sm font-semibold rounded-lg text-slate-500 hover:text-slate-900 transition-colors shrink-0">Vierteljahr</button>
                    <button className="ml-2 p-2 text-slate-400 hover:text-slate-900 transition-colors shrink-0">
                        <span className="material-symbols-outlined text-lg">calendar_today</span>
                    </button>
                </div>
            </div>

            {/* KPI Grid (Bento Style) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-surface-container-low p-10 rounded-[2rem] no-line transition-all hover:bg-surface-container-high cursor-default">
                    <div className="flex justify-between items-start mb-8">
                        <span className="w-14 h-14 bg-surface-container-lowest text-primary rounded-2xl flex items-center justify-center shadow-sm">
                            <span className="material-symbols-outlined text-3xl">ads_click</span>
                        </span>
                        <span className="text-green-600 text-xs font-bold flex items-center gap-1.5 bg-green-50/50 px-3 py-1.5 rounded-full">
                            +12.4% <span className="material-symbols-outlined text-[14px]">trending_up</span>
                        </span>
                    </div>
                    <p className="text-on-surface opacity-40 text-[10px] font-bold uppercase tracking-[0.15em] mb-2">Gesamt-Klicks</p>
                    <h3 className="text-5xl font-headline font-bold text-primary tracking-tight">42,890</h3>
                </div>

                <div className="bg-primary p-10 rounded-[2rem] no-line shadow-2xl shadow-primary/10 group hover:scale-[1.02] transition-all duration-300">
                    <div className="flex justify-between items-start mb-8">
                        <span className="w-14 h-14 bg-white/10 text-white rounded-2xl flex items-center justify-center backdrop-blur-md">
                            <span className="material-symbols-outlined text-3xl">assignment_turned_in</span>
                        </span>
                        <span className="text-white text-xs font-bold flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full">
                            +5.2% <span className="material-symbols-outlined text-[14px]">trending_up</span>
                        </span>
                    </div>
                    <p className="text-white opacity-60 text-[10px] font-bold uppercase tracking-[0.15em] mb-2">Bewerbungsrate</p>
                    <h3 className="text-5xl font-headline font-bold text-white tracking-tight">8.4%</h3>
                </div>

                <div className="bg-surface-container-low p-10 rounded-[2rem] no-line hover:bg-surface-container-high transition-all">
                    <div className="flex justify-between items-start mb-8">
                        <span className="w-14 h-14 bg-surface-container-lowest text-primary rounded-2xl flex items-center justify-center shadow-sm">
                            <span className="material-symbols-outlined text-3xl">interactive_space</span>
                        </span>
                        <span className="text-red-600 text-xs font-bold flex items-center gap-1.5 bg-red-50/50 px-3 py-1.5 rounded-full">
                            -1.8% <span className="material-symbols-outlined text-[14px]">trending_down</span>
                        </span>
                    </div>
                    <p className="text-on-surface opacity-40 text-[10px] font-bold uppercase tracking-[0.15em] mb-2">Engagement</p>
                    <h3 className="text-5xl font-headline font-bold text-primary tracking-tight">15.2k</h3>
                </div>
            </div>

            {/* Asymmetric Data Visualization Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
                {/* Bewerbungstrends (Main Chart) */}
                <div className="lg:col-span-8 bg-white rounded-[2.5rem] no-line p-10 lg:p-12 shadow-sm">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-6">
                        <h4 className="text-2xl font-headline font-bold text-primary tracking-tight">Bewerbungstrends</h4>
                        <div className="flex gap-6">
                            <span className="flex items-center gap-2.5 text-[11px] font-bold text-on-surface opacity-50 uppercase tracking-widest">
                                <span className="w-3 h-3 rounded-full bg-primary shadow-sm"></span> Letzte 30 Tage
                            </span>
                            <span className="flex items-center gap-2.5 text-[11px] font-bold text-on-surface opacity-30 uppercase tracking-widest">
                                <span className="w-3 h-3 rounded-full bg-surface-container-high"></span> Vorperiode
                            </span>
                        </div>
                    </div>

                    {/* Mock Chart Visualization */}
                    <div className="relative h-64 w-full flex items-end gap-2 px-2">
                        {/* Dynamic generation based on HTML blocks */}
                        {[40, 50, 30, 60, 45, 80, 70, 90, 60, 40, 55, 35].map((height, i) => (
                            <div key={i} className="flex-1 bg-slate-100 rounded-t-sm relative group" style={{ height: `${height}%` }}>
                                <div className="absolute bottom-0 left-0 w-full bg-primary rounded-t-sm" style={{ height: `${height + 10 > 100 ? 90 : height + 10}%` }}></div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-4 px-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        <span>Tag 1</span>
                        <span>Tag 15</span>
                        <span>Tag 30</span>
                    </div>
                </div>

                {/* Demographic Insights (Circular Viz) */}
                <div className="lg:col-span-4 bg-surface-container-low p-10 lg:p-12 rounded-[2.5rem] no-line">
                    <h4 className="text-2xl font-headline font-bold text-primary tracking-tight mb-10">Fachbereiche</h4>
                    <div className="flex flex-col items-center">
                        <div className="relative w-56 h-56 mb-10">
                            {/* SVG Donut Chart Mock */}
                            <svg className="w-full h-full transform -rotate-90 filter drop-shadow-lg" viewBox="0 0 36 36">
                                <circle cx="18" cy="18" fill="transparent" r="15.9" stroke="rgba(0,0,0,0.05)" strokeWidth="3.5"></circle>
                                <circle cx="18" cy="18" fill="transparent" r="15.9" stroke="#b52426" strokeDasharray="45 100" strokeWidth="3.5" strokeLinecap="round"></circle>
                                <circle cx="18" cy="18" fill="transparent" r="15.9" stroke="#002542" strokeDasharray="30 100" strokeDashoffset="-45" strokeWidth="3.5" strokeLinecap="round"></circle>
                                <circle cx="18" cy="18" fill="transparent" r="15.9" stroke="#192435" strokeDasharray="25 100" strokeDashoffset="-75" strokeWidth="3.5" strokeLinecap="round"></circle>
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-4xl font-headline font-bold text-primary">100%</span>
                                <span className="text-[10px] font-bold text-on-surface opacity-30 uppercase tracking-widest mt-1">Verteilt</span>
                            </div>
                        </div>

                        <div className="w-full space-y-5">
                            <div className="flex justify-between items-center group cursor-default">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-secondary"></div>
                                    <span className="text-sm font-bold text-primary opacity-80 group-hover:opacity-100 transition-opacity">Informationstechnologie</span>
                                </div>
                                <span className="text-sm font-black text-secondary">45%</span>
                            </div>
                            <div className="flex justify-between items-center group cursor-default">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                                    <span className="text-sm font-bold text-primary opacity-80 group-hover:opacity-100 transition-opacity">Bauwesen &amp; Technik</span>
                                </div>
                                <span className="text-sm font-black text-primary">30%</span>
                            </div>
                            <div className="flex justify-between items-center group cursor-default">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-tertiary"></div>
                                    <span className="text-sm font-bold text-primary opacity-80 group-hover:opacity-100 transition-opacity">Verwaltung &amp; Recht</span>
                                </div>
                                <span className="text-sm font-black text-tertiary">25%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Top Performer Section (Signature Component) */}
            <div className="bg-surface-container-low rounded-[3rem] overflow-hidden mb-12 no-line group">
                <div className="p-10 md:p-16 flex flex-col md:flex-row gap-12 items-center">
                    <div className="relative w-full md:w-2/5 aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl transition-transform group-hover:scale-[1.02] duration-500">
                        <img className="w-full h-full object-cover" alt="modern industrial office space" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBC0q-Ugq-zX5HQKanaVm3wfm-t9gsjARS-ijzEgnejNEJt66xUjHgxF3P72dEGH6tljY0OSptdLNVGVmpsJMlNvytP-_tctLffRs94Wgx13ibyid6ZzawShqSkOhDIkKaKMws0xxDJv6ulstTsCx-718kOgCb4MXBNDF1ELjcDcqRgiHO5ViM0SlxLwbTencb1cjNPUFHBMa7h5ok9vCVkHdtvqGB02Esjg7w_yjGTERqmx55fXcqPtnPhKnUw-bSDMA7t7TTSxTw" />
                        <div className="absolute top-6 left-6 glass no-line text-primary text-[10px] font-bold px-4 py-2 uppercase tracking-[0.2em] rounded-full shadow-lg">Top Performer</div>
                    </div>
                    <div className="flex-1">
                        <span className="text-secondary font-bold text-xs tracking-[0.2em] uppercase mb-6 block opacity-80">Empfehlung des Systems</span>
                        <h3 className="text-3xl md:text-5xl font-headline font-bold leading-[1.1] mb-6 text-primary tracking-[-0.02em]">Senior Projektleiter (m/w/d) - Infrastruktur</h3>
                        <p className="text-on-surface opacity-60 mb-10 max-w-xl text-lg font-medium leading-relaxed">
                            "Diese Stelle generiert **3.5x** mehr qualifizierte Bewerbungen als der Marktdurchschnitt."
                        </p>
                        <div className="flex flex-wrap gap-8">
                            <div>
                                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Conversion</span>
                                <span className="text-2xl font-black font-public-sans text-primary">12.8%</span>
                            </div>
                            <div>
                                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Sichtbarkeit</span>
                                <span className="text-2xl font-black font-public-sans text-on-surface">High</span>
                            </div>
                            <div>
                                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Cost per Click</span>
                                <span className="text-2xl font-black font-public-sans text-on-surface">€0.42</span>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-auto mt-6 md:mt-0 self-start md:self-end">
                        <button className="w-full md:w-auto px-8 py-4 bg-gradient-to-br from-primary to-primary-container text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all active:opacity-80">Kampagne optimieren</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
