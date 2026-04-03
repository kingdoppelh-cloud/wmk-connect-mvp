import React from 'react';

export const MerchantAnalytics: React.FC = () => {
    return (
        <div className="pt-8 pb-12 px-6 lg:px-12 max-w-7xl mx-auto w-full">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-primary mb-2 block">Enterprise Report</span>
                    <h2 className="text-4xl md:text-5xl font-black font-public-sans tracking-tight text-on-surface">Analyse &amp; Insights</h2>
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
                <div className="bg-surface-container-lowest p-8 rounded-xl shadow-[0px_12px_32px_rgba(27,59,90,0.06)] group hover:translate-y-[-4px] transition-all duration-300">
                    <div className="flex justify-between items-start mb-6">
                        <span className="p-3 bg-red-50 text-primary rounded-lg flex items-center justify-center">
                            <span className="material-symbols-outlined">ads_click</span>
                        </span>
                        <span className="text-emerald-600 text-sm font-bold flex items-center gap-1">
                            +12.4% <span className="material-symbols-outlined text-xs">trending_up</span>
                        </span>
                    </div>
                    <p className="text-slate-500 text-sm font-medium uppercase tracking-wider mb-1">Gesamt-Klicks</p>
                    <h3 className="text-4xl font-black font-public-sans text-on-surface">42,890</h3>
                </div>

                <div className="bg-surface-container-lowest p-8 rounded-xl shadow-[0px_12px_32px_rgba(27,59,90,0.06)] group hover:translate-y-[-4px] transition-all duration-300 border-b-4 border-primary">
                    <div className="flex justify-between items-start mb-6">
                        <span className="p-3 bg-slate-100 text-secondary rounded-lg flex items-center justify-center">
                            <span className="material-symbols-outlined">assignment_turned_in</span>
                        </span>
                        <span className="text-emerald-600 text-sm font-bold flex items-center gap-1">
                            +5.2% <span className="material-symbols-outlined text-xs">trending_up</span>
                        </span>
                    </div>
                    <p className="text-slate-500 text-sm font-medium uppercase tracking-wider mb-1">Bewerbungsrate</p>
                    <h3 className="text-4xl font-black font-public-sans text-on-surface">8.4%</h3>
                </div>

                <div className="bg-surface-container-lowest p-8 rounded-xl shadow-[0px_12px_32px_rgba(27,59,90,0.06)] group hover:translate-y-[-4px] transition-all duration-300">
                    <div className="flex justify-between items-start mb-6">
                        <span className="p-3 bg-slate-100 text-secondary rounded-lg flex items-center justify-center">
                            <span className="material-symbols-outlined">interactive_space</span>
                        </span>
                        <span className="text-red-600 text-sm font-bold flex items-center gap-1">
                            -1.8% <span className="material-symbols-outlined text-xs">trending_down</span>
                        </span>
                    </div>
                    <p className="text-slate-500 text-sm font-medium uppercase tracking-wider mb-1">Engagement</p>
                    <h3 className="text-4xl font-black font-public-sans text-on-surface">15.2k</h3>
                </div>
            </div>

            {/* Asymmetric Data Visualization Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
                {/* Bewerbungstrends (Main Chart) */}
                <div className="lg:col-span-8 bg-surface-container-lowest p-8 rounded-xl shadow-[0px_12px_32px_rgba(27,59,90,0.06)]">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                        <h4 className="text-xl font-bold font-public-sans tracking-tight">Bewerbungstrends</h4>
                        <div className="flex gap-4">
                            <span className="flex items-center gap-2 text-xs font-bold text-slate-400">
                                <span className="w-3 h-3 rounded-full bg-primary"></span> Letzte 30 Tage
                            </span>
                            <span className="flex items-center gap-2 text-xs font-bold text-slate-400">
                                <span className="w-3 h-3 rounded-full bg-slate-200"></span> Vorperiode
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
                <div className="lg:col-span-4 bg-surface-container-low p-8 rounded-xl">
                    <h4 className="text-xl font-bold font-public-sans tracking-tight mb-8">Fachbereiche</h4>
                    <div className="flex flex-col items-center">
                        <div className="relative w-48 h-48 mb-8">
                            {/* SVG Donut Chart Mock */}
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                <circle cx="18" cy="18" fill="transparent" r="15.9" stroke="#e2e8f0" strokeWidth="4"></circle>
                                <circle cx="18" cy="18" fill="transparent" r="15.9" stroke="#b9000b" strokeDasharray="45 100" strokeWidth="4"></circle>
                                <circle cx="18" cy="18" fill="transparent" r="15.9" stroke="#1b3b5a" strokeDasharray="30 100" strokeDashoffset="-45" strokeWidth="4"></circle>
                                <circle cx="18" cy="18" fill="transparent" r="15.9" stroke="#436182" strokeDasharray="25 100" strokeDashoffset="-75" strokeWidth="4"></circle>
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-2xl font-black font-public-sans">100%</span>
                                <span className="text-[10px] font-bold text-slate-500 uppercase">Verteilt</span>
                            </div>
                        </div>

                        <div className="w-full space-y-4">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                                    <span className="text-sm font-medium">Informationstechnologie</span>
                                </div>
                                <span className="text-sm font-bold">45%</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-[#1b3b5a]"></div>
                                    <span className="text-sm font-medium">Bauwesen &amp; Technik</span>
                                </div>
                                <span className="text-sm font-bold">30%</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-secondary"></div>
                                    <span className="text-sm font-medium">Verwaltung &amp; Recht</span>
                                </div>
                                <span className="text-sm font-bold">25%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Top Performer Section (Signature Component) */}
            <div className="bg-surface-container-high rounded-xl overflow-hidden mb-12 shadow-[0px_12px_32px_rgba(27,59,90,0.06)] border-l-[12px] border-primary">
                <div className="p-8 md:p-12 flex flex-col md:flex-row gap-10 items-center">
                    <div className="relative w-full md:w-1/3 aspect-video rounded-lg overflow-hidden shadow-xl shrink-0">
                        <img className="w-full h-full object-cover" alt="modern industrial office space" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBC0q-Ugq-zX5HQKanaVm3wfm-t9gsjARS-ijzEgnejNEJt66xUjHgxF3P72dEGH6tljY0OSptdLNVGVmpsJMlNvytP-_tctLffRs94Wgx13ibyid6ZzawShqSkOhDIkKaKMws0xxDJv6ulstTsCx-718kOgCb4MXBNDF1ELjcDcqRgiHO5ViM0SlxLwbTencb1cjNPUFHBMa7h5ok9vCVkHdtvqGB02Esjg7w_yjGTERqmx55fXcqPtnPhKnUw-bSDMA7t7TTSxTw" />
                        <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest rounded-full">Top Performer</div>
                    </div>
                    <div className="flex-1">
                        <span className="text-primary font-bold text-sm tracking-widest uppercase mb-4 block">Beste Performance diesen Monat</span>
                        <h3 className="text-3xl md:text-4xl font-black font-public-sans leading-tight mb-4 text-on-surface">Senior Projektleiter (m/w/d) - Infrastruktur &amp; Stadtplanung</h3>
                        <p className="text-slate-600 mb-8 max-w-xl text-lg italic leading-relaxed">
                            "Diese Stelle generiert 3.5x mehr qualifizierte Bewerbungen als der Durchschnittsbereich Bauwesen."
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
