import React from 'react';

export const MerchantDashboardOverview: React.FC = () => {
    return (
        <div className="pt-8 pb-12 px-6 lg:px-12">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                <div>
                    <h1 className="text-4xl font-extrabold text-on-background tracking-tight mb-2">Welcome back, Admin</h1>
                    <p className="text-secondary font-medium">Here's what's happening across WMK Bauholding today.</p>
                </div>
                <div className="flex gap-3">
                    <button className="bg-white text-slate-700 border border-slate-200 px-5 py-2.5 rounded-xl shadow-sm font-bold transition-all hover:bg-slate-50 active:scale-95 flex items-center gap-2">
                        <span className="material-symbols-outlined text-xl">download</span>
                        <span>Export</span>
                    </button>
                    <button className="bg-gradient-to-br from-primary to-primary-container text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 font-bold transition-all hover:translate-y-[-2px] hover:shadow-xl active:scale-95">
                        <span className="material-symbols-outlined">add</span>
                        <span>New Job</span>
                    </button>
                </div>
            </div>

            {/* Core Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {/* Metric 1 */}
                <div className="bg-white rounded-2xl p-6 shadow-[0px_4px_24px_rgba(27,59,90,0.04)] border border-slate-100 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                            <span className="material-symbols-outlined">visibility</span>
                        </div>
                        <span className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md">
                            <span className="material-symbols-outlined text-[14px]">trending_up</span> 12%
                        </span>
                    </div>
                    <h3 className="text-3xl font-black text-slate-800 mb-1">12.4k</h3>
                    <p className="text-sm font-semibold text-slate-500">Profile Views</p>
                </div>

                {/* Metric 2 */}
                <div className="bg-white rounded-2xl p-6 shadow-[0px_4px_24px_rgba(27,59,90,0.04)] border border-slate-100 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
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
                <div className="bg-white rounded-2xl p-6 shadow-[0px_4px_24px_rgba(27,59,90,0.04)] border border-primary/20 bg-gradient-to-b from-white to-primary/5 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center shadow-md">
                            <span className="material-symbols-outlined">work</span>
                        </div>
                    </div>
                    <h3 className="text-3xl font-black text-primary mb-1">14</h3>
                    <p className="text-sm font-semibold text-primary/80">Active Jobs</p>
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
                    <div className="bg-white rounded-2xl shadow-[0px_4px_24px_rgba(27,59,90,0.04)] border border-slate-100 p-6 lg:p-8">
                        <div className="flex justify-between items-end mb-6">
                            <div>
                                <h2 className="text-xl font-bold text-slate-900 mb-1">Recent Applications</h2>
                                <p className="text-sm text-slate-500">Candidates who applied in the last 7 days.</p>
                            </div>
                            <button className="text-primary font-bold text-sm hover:underline">View All</button>
                        </div>

                        <div className="space-y-4">
                            {/* Applicant 1 */}
                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">MK</div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-sm">Max Mustermann</h4>
                                        <p className="text-xs text-slate-500">Applied for: Bauleiter Infrastruktur</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-xs font-semibold text-slate-400">2h ago</span>
                                    <button className="text-primary bg-primary/10 hover:bg-primary/20 p-2 rounded-lg transition-colors">
                                        <span className="material-symbols-outlined text-[18px]">chevron_right</span>
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
                    <div className="bg-primary rounded-2xl p-8 text-white relative overflow-hidden shadow-lg shadow-primary/20">
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="material-symbols-outlined text-3xl">lightbulb</span>
                                <h3 className="font-bold text-xl">Quick Insight</h3>
                            </div>
                            <p className="text-primary-fixed-dim whitespace-pre-wrap text-sm leading-relaxed mb-6 font-medium">
                                Your job "Bauleiter Infrastruktur" is performing 45% better than industry average. Consider boosting its budget to capture even more top talent this week.
                            </p>
                            <button className="w-full bg-white text-primary font-bold py-3 rounded-xl hover:bg-slate-50 active:scale-95 transition-all text-sm">
                                Boost Job Post
                            </button>
                        </div>
                        <span className="material-symbols-outlined absolute -bottom-12 -right-10 text-white/10 text-[180px] pointer-events-none">trending_up</span>
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
