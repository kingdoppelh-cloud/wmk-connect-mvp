import React from 'react';

export const MerchantDashboardOverview: React.FC = () => {
    return (
        <div className="pt-8 pb-12 px-6 lg:px-12">
            <label className="sr-only">Händler Dashboard Übersicht</label>
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                <div>
                    <h1 className="text-4xl font-headline font-bold text-primary tracking-[-0.02em] mb-2 leading-tight">Welcome back, Admin</h1>
                    <p className="text-secondary font-medium tracking-wide opacity-90">Here's what's happening across WMK Bauholding today.</p>
                </div>
                <div className="flex gap-4">
                    <button className="bg-surface-container-low text-primary px-6 py-3 rounded-2xl no-line font-bold transition-all hover:bg-surface-container-high active:scale-95 flex items-center gap-2.5">
                        <span className="material-symbols-outlined text-xl">download</span>
                        <span className="tracking-wide">Export</span>
                    </button>
                    <button className="bg-primary text-white px-8 py-3.5 rounded-2xl no-line flex items-center gap-2.5 font-bold transition-all hover:bg-primary/90 hover:scale-[1.02] shadow-xl shadow-primary/10 active:scale-95">
                        <span className="material-symbols-outlined">add</span>
                        <span className="tracking-wide">New Job</span>
                    </button>
                </div>
            </div>

            {/* Core Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {/* Metric 1 */}
                <div className="bg-surface-container-low rounded-3xl p-7 no-line flex flex-col transition-all hover:bg-surface-container-high cursor-default">
                    <div className="flex justify-between items-start mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                            <span className="material-symbols-outlined text-2xl">visibility</span>
                        </div>
                        <span className="flex items-center gap-1.5 text-[11px] font-bold text-green-600 bg-green-50/50 px-3 py-1.5 rounded-full">
                            <span className="material-symbols-outlined text-[14px]">trending_up</span> 12%
                        </span>
                    </div>
                    <h3 className="text-4xl font-headline font-bold text-primary mb-1 tracking-tight">12.4k</h3>
                    <p className="text-xs font-bold text-on-surface opacity-40 uppercase tracking-widest">Profile Views</p>
                </div>

                {/* Metric 2 */}
                <div className="bg-white rounded-2xl p-6 shadow-[0px_4px_24px_rgba(27,59,90,0.04)] border border-slate-100 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                            <span className="material-symbols-outlined">group</span>
                        </div>
                        <span className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md">
                            <span className="material-symbols-outlined text-[14px]">trending_up</span> 8%
                        </span>
                    </div>
                    <h3 className="text-3xl font-black text-slate-800 mb-1">142</h3>
                    <p className="text-sm font-semibold text-slate-500">Total Applicants</p>
                </div>

                {/* Metric 3 */}
                <div className="bg-secondary rounded-3xl p-7 no-line flex flex-col shadow-xl shadow-secondary/10 transition-all hover:scale-[1.02] active:scale-100 cursor-pointer">
                    <div className="flex justify-between items-start mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-white/20 text-white flex items-center justify-center backdrop-blur-md">
                            <span className="material-symbols-outlined text-2xl">work</span>
                        </div>
                    </div>
                    <h3 className="text-4xl font-headline font-bold text-white mb-1 tracking-tight">14</h3>
                    <p className="text-xs font-bold text-white opacity-60 uppercase tracking-widest">Active Jobs</p>
                </div>

                {/* Metric 4 */}
                <div className="bg-white rounded-2xl p-6 shadow-[0px_4px_24px_rgba(27,59,90,0.04)] border border-slate-100 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                            <span className="material-symbols-outlined">star</span>
                        </div>
                        <span className="flex items-center gap-1 text-xs font-bold text-slate-500 bg-slate-50 px-2 py-1 rounded-md">
                            <span className="material-symbols-outlined text-[14px]">trending_flat</span> 0%
                        </span>
                    </div>
                    <h3 className="text-3xl font-black text-slate-800 mb-1">4.8</h3>
                    <p className="text-sm font-semibold text-slate-500">Employer Rating</p>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Main Content Area */}
                <div className="xl:col-span-2 space-y-8">
                    {/* Recent Applications */}
                    <div className="bg-surface-container-low rounded-3xl no-line p-8 lg:p-10 transition-all hover:bg-surface-container-high">
                        <div className="flex justify-between items-end mb-8">
                            <div>
                                <h2 className="text-2xl font-headline font-bold text-primary tracking-tight mb-2">Recent Applications</h2>
                                <p className="text-sm font-medium text-on-surface opacity-50">Candidates who applied in the last 7 days.</p>
                            </div>
                            <button className="text-primary font-bold text-sm hover:text-secondary transition-colors tracking-wide underline underline-offset-8 decoration-primary/20">View All</button>
                        </div>

                        <div className="space-y-4">
                            {/* Applicant 1 */}
                            <div className="flex items-center justify-between p-5 bg-surface-container-lowest rounded-2xl no-line hover:scale-[1.01] transition-all cursor-pointer">
                                <div className="flex items-center gap-5">
                                    <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-primary/10">MK</div>
                                    <div>
                                        <h4 className="font-bold text-primary text-base">Max Mustermann</h4>
                                        <p className="text-xs font-medium text-on-surface opacity-40">Applied for: Bauleiter Infrastruktur</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-[11px] font-bold text-on-surface opacity-30 uppercase tracking-widest">2h ago</span>
                                    <button className="text-primary bg-primary/5 hover:bg-primary/10 p-2.5 rounded-xl transition-colors">
                                        <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                                    </button>
                                </div>
                            </div>

                            {/* Applicant 2 */}
                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">AL</div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-sm">Anna Lehmann</h4>
                                        <p className="text-xs text-slate-500">Applied for: Projektmanager Stadtplanung</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-xs font-semibold text-slate-400">1d ago</span>
                                    <button className="text-primary bg-primary/10 hover:bg-primary/20 p-2 rounded-lg transition-colors">
                                        <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Column */}
                <div className="space-y-8">
                    {/* Insights Card */}
                    <div className="bg-primary rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-primary/20 transition-transform hover:scale-[1.02]">
                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md">
                                    <span className="material-symbols-outlined text-3xl">lightbulb</span>
                                </div>
                                <h3 className="font-headline font-bold text-2xl tracking-tight">Quick Insight</h3>
                            </div>
                            <p className="text-white opacity-80 whitespace-pre-wrap text-[15px] leading-relaxed mb-10 font-medium italic">
                                "Your job 'Bauleiter Infrastruktur' is performing 45% better than average."
                            </p>
                            <button className="w-full bg-white text-primary font-black py-4 rounded-2xl hover:bg-surface transition-all text-sm tracking-[0.1em] uppercase shadow-lg shadow-black/5">
                                Boost Job Post
                            </button>
                        </div>
                        <span className="material-symbols-outlined absolute -bottom-16 -right-12 text-white/5 text-[220px] pointer-events-none select-none">trending_up</span>
                    </div>

                    {/* To-Do List */}
                    <div className="bg-white rounded-2xl shadow-[0px_4px_24px_rgba(27,59,90,0.04)] border border-slate-100 p-6">
                        <h2 className="text-lg font-bold text-slate-900 mb-4">Pending Tasks</h2>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <div className="mt-0.5 w-5 h-5 rounded-md border-2 border-primary/30 flex items-center justify-center cursor-pointer hover:bg-primary/5 transition-colors">
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-slate-800">Review 3 new applicants</p>
                                    <p className="text-xs text-slate-500">For "Bauleiter Infrastruktur"</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="mt-0.5 w-5 h-5 rounded-md border-2 border-primary/30 flex items-center justify-center cursor-pointer hover:bg-primary/5 transition-colors">
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-slate-800">Update company description</p>
                                    <p className="text-xs text-slate-500">Profile completeness: 85%</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
