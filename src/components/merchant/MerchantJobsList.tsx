import React from 'react';

export const MerchantJobsList: React.FC = () => {
    return (
        <div className="pt-8 pb-12 px-6 lg:px-12">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                <div>
                    <h1 className="text-4xl font-extrabold text-on-background tracking-tight mb-2">Job Listings</h1>
                    <p className="text-secondary font-medium">Manage and monitor civic employment opportunities.</p>
                </div>
                <button className="bg-gradient-to-br from-primary to-primary-container text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 font-bold transition-all hover:translate-y-[-2px] hover:shadow-xl active:scale-95">
                    <span className="material-symbols-outlined">add</span>
                    <span>Create New Job</span>
                </button>
            </div>

            {/* Asymmetric Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
                <div className="md:col-span-8 bg-surface-container-low p-8 rounded-xl flex items-center justify-between">
                    <div>
                        <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1">Active Positions</p>
                        <h2 className="text-5xl font-black text-on-surface tracking-tighter">14</h2>
                    </div>
                    <div className="h-16 w-px bg-outline-variant/30"></div>
                    <div>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Paused</p>
                        <h2 className="text-5xl font-black text-on-surface tracking-tighter">3</h2>
                    </div>
                    <div className="h-16 w-px bg-outline-variant/30"></div>
                    <div>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Total Applicants</p>
                        <h2 className="text-5xl font-black text-on-surface tracking-tighter">128</h2>
                    </div>
                </div>
                <div className="md:col-span-4 bg-primary p-8 rounded-xl text-white relative overflow-hidden group">
                    <div className="relative z-10">
                        <p className="text-xs font-bold opacity-80 uppercase tracking-widest mb-1">Urgent Fill</p>
                        <h3 className="text-2xl font-bold mb-4">Stadtplaner (m/w/d)</h3>
                        <div className="flex items-center gap-2 text-sm font-medium">
                            <span className="material-symbols-outlined text-sm">group</span>
                            <span>42 New Applicants</span>
                        </div>
                    </div>
                    <span className="material-symbols-outlined absolute -bottom-4 -right-4 text-white/10 text-9xl transition-transform group-hover:scale-110">trending_up</span>
                </div>
            </div>

            {/* Filter Shell */}
            <div className="bg-surface-container-low p-2 rounded-xl mb-6 flex gap-2 w-fit">
                <button className="px-6 py-2 bg-white text-on-surface font-bold rounded-lg shadow-sm text-sm">All Posts</button>
                <button className="px-6 py-2 text-slate-500 hover:text-on-surface font-medium transition-colors text-sm">Active</button>
                <button className="px-6 py-2 text-slate-500 hover:text-on-surface font-medium transition-colors text-sm">Paused</button>
            </div>

            {/* Job Listings List */}
            <div className="space-y-4">
                {/* Job Item 1 */}
                <div className="bg-surface-container-lowest hover:bg-surface-bright p-6 rounded-xl transition-all duration-300 flex flex-col lg:flex-row lg:items-center justify-between gap-6 group">
                    <div className="flex items-start gap-5 lg:w-1/3">
                        <div className="w-12 h-12 bg-surface-container-high rounded-xl flex items-center justify-center flex-shrink-0">
                            <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>engineering</span>
                        </div>
                        <div>
                            <h4 className="text-lg font-bold text-on-surface group-hover:text-primary transition-colors">Bauleiter Infrastruktur</h4>
                            <p className="text-sm text-slate-500">Posted on Oct 12, 2023</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-12">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Status</span>
                            <div className="flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 rounded-full w-fit">
                                <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
                                <span className="text-xs font-bold">Active</span>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Applicants</span>
                            <span className="text-xl font-black text-on-surface">24</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 ml-auto lg:ml-0">
                        <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-bold text-primary hover:bg-primary/5 rounded-lg transition-colors">
                            <span className="material-symbols-outlined text-lg">edit</span>
                            <span>Edit</span>
                        </button>
                        <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                            <span className="material-symbols-outlined text-lg">pause_circle</span>
                            <span>Pause</span>
                        </button>
                        <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-bold bg-secondary/10 text-secondary hover:bg-secondary/20 rounded-lg transition-colors">
                            <span className="material-symbols-outlined text-lg">visibility</span>
                            <span>View</span>
                        </button>
                    </div>
                </div>

                {/* Job Item 2 */}
                <div className="bg-surface-container-lowest hover:bg-surface-bright p-6 rounded-xl transition-all duration-300 flex flex-col lg:flex-row lg:items-center justify-between gap-6 group">
                    <div className="flex items-start gap-5 lg:w-1/3">
                        <div className="w-12 h-12 bg-surface-container-high rounded-xl flex items-center justify-center flex-shrink-0">
                            <span className="material-symbols-outlined text-slate-400" style={{ fontVariationSettings: "'FILL' 1" }}>architecture</span>
                        </div>
                        <div>
                            <h4 className="text-lg font-bold text-on-surface group-hover:text-primary transition-colors">Projektmanager Stadtplanung</h4>
                            <p className="text-sm text-slate-500">Posted on Sep 28, 2023</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-12">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Status</span>
                            <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-600 rounded-full w-fit">
                                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
                                <span className="text-xs font-bold">Paused</span>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Applicants</span>
                            <span className="text-xl font-black text-on-surface">18</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 ml-auto lg:ml-0">
                        <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-bold text-primary hover:bg-primary/5 rounded-lg transition-colors">
                            <span className="material-symbols-outlined text-lg">edit</span>
                            <span>Edit</span>
                        </button>
                        <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-bold text-green-700 hover:bg-green-50 rounded-lg transition-colors">
                            <span className="material-symbols-outlined text-lg">play_circle</span>
                            <span>Resume</span>
                        </button>
                        <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-bold bg-secondary/10 text-secondary hover:bg-secondary/20 rounded-lg transition-colors">
                            <span className="material-symbols-outlined text-lg">visibility</span>
                            <span>View</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Civic Lead Component */}
            <div className="mt-16 bg-surface-container-high p-10 rounded-xl relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-3 bg-primary"></div>
                <div className="relative z-10 max-w-2xl">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-4 block">Institutional Growth</span>
                    <p className="text-2xl font-bold font-headline leading-tight text-on-surface italic">
                        "Our goal is to build a network of civic professionals that doesn't just manage services, but enriches the community fabric through sustainable infrastructure."
                    </p>
                    <p className="mt-4 text-sm font-bold text-secondary">— Dr. Helena Vance, Director of Civic Planning</p>
                </div>
                <span className="material-symbols-outlined absolute right-10 top-1/2 -translate-y-1/2 text-8xl text-white/50 select-none">format_quote</span>
            </div>
        </div>
    );
};
