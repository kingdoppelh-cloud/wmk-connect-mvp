import React from 'react';

export const MerchantJobsList: React.FC = () => {
    return (
        <div className="pt-8 pb-12 px-6 lg:px-12">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
                <div>
                    <h1 className="text-4xl md:text-6xl font-headline font-bold text-primary tracking-tight mb-3">Job Listings</h1>
                    <p className="text-on-surface opacity-50 font-medium max-w-md">Manage and monitor institutional employment opportunities with precision.</p>
                </div>
                <button className="bg-primary text-white px-8 py-4 rounded-2xl flex items-center gap-3 font-bold transition-all hover:bg-secondary hover:translate-y-[-2px] shadow-xl shadow-primary/20 active:scale-95 group">
                    <span className="material-symbols-outlined group-hover:rotate-90 transition-transform">add</span>
                    <span className="tracking-wide uppercase text-xs">Create New Job</span>
                </button>
            </div>

            {/* Asymmetric Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
                <div className="md:col-span-8 bg-surface-container-low p-10 rounded-[2.5rem] no-line flex items-center justify-between">
                    <div>
                        <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-3">Active Positions</p>
                        <h2 className="text-6xl font-headline font-bold text-primary tracking-tighter">14</h2>
                    </div>
                    <div className="h-20 w-px bg-primary/10"></div>
                    <div>
                        <p className="text-[10px] font-bold text-on-surface opacity-30 uppercase tracking-[0.2em] mb-3">Paused</p>
                        <h2 className="text-6xl font-headline font-bold text-on-surface opacity-20 tracking-tighter">3</h2>
                    </div>
                    <div className="h-20 w-px bg-primary/10"></div>
                    <div>
                        <p className="text-[10px] font-bold text-on-surface opacity-30 uppercase tracking-[0.2em] mb-3">Total Applicants</p>
                        <h2 className="text-6xl font-headline font-bold text-primary tracking-tighter">128</h2>
                    </div>
                </div>
                <div className="md:col-span-4 bg-secondary p-10 rounded-[2.5rem] no-line text-white relative overflow-hidden group shadow-2xl shadow-secondary/20">
                    <div className="relative z-10">
                        <p className="text-[10px] font-bold opacity-70 uppercase tracking-[0.2em] mb-3">Urgent Fill</p>
                        <h3 className="text-3xl font-headline font-bold mb-6 leading-tight">Stadtplaner (m/w/d)</h3>
                        <div className="flex items-center gap-3 bg-white/20 w-fit px-4 py-2 rounded-full glass no-line">
                            <span className="material-symbols-outlined text-sm">group</span>
                            <span className="text-[11px] font-black uppercase tracking-widest">42 New Applicants</span>
                        </div>
                    </div>
                    <span className="material-symbols-outlined absolute -bottom-10 -right-8 text-white/10 text-[180px] transition-transform group-hover:scale-110 pointer-events-none select-none">trending_up</span>
                </div>
            </div>

            {/* Filter Shell */}
            <div className="bg-surface-container-low p-2 rounded-[1.25rem] no-line mb-10 flex gap-1 w-fit shadow-sm">
                <button className="px-8 py-3 bg-primary text-white font-bold rounded-[0.85rem] shadow-lg text-xs uppercase tracking-widest">All Posts</button>
                <button className="px-8 py-3 text-on-surface opacity-40 hover:opacity-100 font-bold transition-all text-xs uppercase tracking-widest hover:bg-surface-container-high rounded-[0.85rem]">Active</button>
                <button className="px-8 py-3 text-on-surface opacity-40 hover:opacity-100 font-bold transition-all text-xs uppercase tracking-widest hover:bg-surface-container-high rounded-[0.85rem]">Paused</button>
            </div>

            {/* Job Listings List */}
            <div className="space-y-4">
                {/* Job Item 1 */}
                <div className="bg-surface-container-lowest hover:bg-surface-container-low p-8 lg:px-10 rounded-[2rem] no-line transition-all duration-300 flex flex-col lg:flex-row lg:items-center justify-between gap-8 group cursor-pointer">
                    <div className="flex items-center gap-8 lg:w-1/3">
                        <div className="w-16 h-16 bg-surface-container-high rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm transition-transform group-hover:scale-110">
                            <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>engineering</span>
                        </div>
                        <div>
                            <h4 className="text-xl font-headline font-bold text-primary group-hover:text-secondary transition-colors mb-1">Bauleiter Infrastruktur</h4>
                            <p className="text-xs font-medium text-on-surface opacity-40 uppercase tracking-widest font-mono">Posted on Oct 12, 2023</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-16">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-on-surface opacity-30 uppercase tracking-[0.2em] mb-2">Status</span>
                            <div className="flex items-center gap-2 px-3.5 py-1.5 bg-green-50/50 text-green-700 rounded-full w-fit">
                                <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></span>
                                <span className="text-[11px] font-black uppercase tracking-widest">Active</span>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-on-surface opacity-30 uppercase tracking-[0.2em] mb-2">Applicants</span>
                            <span className="text-3xl font-headline font-bold text-primary">24</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 ml-auto lg:ml-0">
                        <button className="flex items-center gap-2 px-5 py-2.5 text-xs font-black uppercase tracking-widest text-primary hover:bg-primary/5 rounded-xl transition-all">
                            <span className="material-symbols-outlined text-[20px]">edit</span>
                            <span>Edit</span>
                        </button>
                        <button className="flex items-center gap-2 px-5 py-2.5 text-xs font-black uppercase tracking-widest text-on-surface opacity-40 hover:opacity-100 hover:bg-surface-container-high rounded-xl transition-all">
                            <span className="material-symbols-outlined text-[20px]">pause_circle</span>
                            <span>Pause</span>
                        </button>
                        <button className="flex items-center gap-2 px-6 py-2.5 text-xs font-black uppercase tracking-widest bg-secondary text-white hover:bg-primary rounded-xl transition-all shadow-lg shadow-secondary/10">
                            <span className="material-symbols-outlined text-[20px]">visibility</span>
                            <span>View</span>
                        </button>
                    </div>
                </div>

                {/* Job Item 2 */}
                <div className="bg-surface-container-lowest hover:bg-surface-container-low p-8 lg:px-10 rounded-[2rem] no-line transition-all duration-300 flex flex-col lg:flex-row lg:items-center justify-between gap-8 group cursor-pointer">
                    <div className="flex items-center gap-8 lg:w-1/3">
                        <div className="w-16 h-16 bg-surface-container-high rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm transition-transform group-hover:scale-110">
                            <span className="material-symbols-outlined text-on-surface opacity-30 text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>architecture</span>
                        </div>
                        <div>
                            <h4 className="text-xl font-headline font-bold text-primary group-hover:text-secondary transition-colors mb-1">Projektmanager Stadtplanung</h4>
                            <p className="text-xs font-medium text-on-surface opacity-40 uppercase tracking-widest font-mono">Posted on Sep 28, 2023</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-16">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-on-surface opacity-30 uppercase tracking-[0.2em] mb-2">Status</span>
                            <div className="flex items-center gap-2 px-3.5 py-1.5 bg-surface-container-high text-on-surface opacity-60 rounded-full w-fit">
                                <span className="w-2 h-2 bg-on-surface opacity-40 rounded-full"></span>
                                <span className="text-[11px] font-black uppercase tracking-widest">Paused</span>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-on-surface opacity-30 uppercase tracking-[0.2em] mb-2">Applicants</span>
                            <span className="text-3xl font-headline font-bold text-primary opacity-40">18</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 ml-auto lg:ml-0">
                        <button className="flex items-center gap-2 px-5 py-2.5 text-xs font-black uppercase tracking-widest text-primary hover:bg-primary/5 rounded-xl transition-all">
                            <span className="material-symbols-outlined text-[20px]">edit</span>
                            <span>Edit</span>
                        </button>
                        <button className="flex items-center gap-2 px-5 py-2.5 text-xs font-black uppercase tracking-widest text-green-700 hover:bg-green-50 rounded-xl transition-all">
                            <span className="material-symbols-outlined text-[20px]">play_circle</span>
                            <span>Resume</span>
                        </button>
                        <button className="flex items-center gap-2 px-6 py-2.5 text-xs font-black uppercase tracking-widest bg-secondary text-white hover:bg-primary rounded-xl transition-all shadow-lg shadow-secondary/10">
                            <span className="material-symbols-outlined text-[20px]">visibility</span>
                            <span>View</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Civic Lead Component */}
            <div className="mt-20 bg-surface-container-low p-12 lg:p-16 rounded-[3rem] relative overflow-hidden no-line">
                <div className="relative z-10 max-w-3xl">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary mb-8 block">Institutional Philosophy</span>
                    <p className="text-3xl lg:text-4xl font-bold font-headline leading-[1.2] text-primary italic mb-10 tracking-tight">
                        "Building the future of our communities requires a network of dedicated specialists who understand both the physical and social infrastructure."
                    </p>
                    <div className="flex items-center gap-5">
                        <div className="w-12 h-px bg-primary/20"></div>
                        <p className="text-sm font-black text-primary uppercase tracking-[0.15em]">Dr. Helena Vance <span className="font-medium opacity-50 ml-2">Director of Planning</span></p>
                    </div>
                </div>
                <span className="material-symbols-outlined absolute -right-12 -bottom-16 text-[320px] text-primary/5 select-none font-thin">domain</span>
            </div>
        </div>
    );
};
