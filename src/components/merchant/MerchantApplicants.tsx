import React from 'react';

export const MerchantApplicants: React.FC = () => {
    return (
        <div className="pt-8 pb-12 px-6 lg:px-12 max-w-7xl mx-auto w-full">
            {/* Header Section with Asymmetric Layout */}
            <div className="grid grid-cols-12 gap-8 mb-12 items-end">
                <div className="col-span-12 md:col-span-7">
                    <p className="text-primary font-headline font-bold uppercase tracking-widest text-xs mb-3">Talent Pipeline</p>
                    <h2 className="font-headline text-4xl md:text-5xl font-black text-on-surface tracking-tight leading-tight">Review Your Recent <span className="text-primary">Applicants</span></h2>
                </div>
                <div className="col-span-12 md:col-span-5">
                    <div className="p-6 bg-surface-container-high border-l-[12px] border-primary">
                        <p className="font-headline text-lg font-bold text-on-surface italic">"The quality of a community is built through the precision of its public workforce."</p>
                        <p className="mt-2 text-sm text-slate-600">— Civic Excellence Mandate 2024</p>
                    </div>
                </div>
            </div>

            {/* Filters Bar */}
            <div className="bg-surface-container-low rounded-xl p-4 mb-8 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4 flex-1 min-w-[300px]">
                    <div className="relative flex-1 max-w-md">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                        <input className="w-full bg-surface-container-lowest border-none border-b-2 border-outline-variant/40 focus:border-primary focus:ring-0 pl-10 py-3 text-sm rounded-lg transition-all" placeholder="Search by name or title..." type="text" />
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="hidden sm:inline text-xs font-bold text-slate-500 uppercase tracking-wider">Job:</span>
                        <select className="bg-transparent border-none text-sm font-semibold focus:ring-0 cursor-pointer text-on-surface">
                            <option>All Listings</option>
                            <option>City Planner</option>
                            <option>Social Services Coord.</option>
                            <option>Public Safety Officer</option>
                        </select>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-surface-container-lowest hover:bg-surface-bright transition-colors rounded-lg text-sm font-medium border border-outline-variant/15">
                        <span className="material-symbols-outlined text-sm">sort</span>
                        Newest first
                    </button>
                    <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-surface-container-lowest hover:bg-surface-bright transition-colors rounded-lg text-sm font-medium border border-outline-variant/15">
                        <span className="material-symbols-outlined text-sm">trending_up</span>
                        Highest Match
                    </button>
                </div>
            </div>

            {/* Applicants Grid */}
            <div className="grid grid-cols-1 gap-6">
                {/* Applicant Card 1 */}
                <div className="group bg-surface-container-lowest hover:bg-surface-bright p-6 rounded-xl transition-all duration-300 hover:-translate-y-1 shadow-[0px_4px_12px_rgba(27,59,90,0.02)] border border-outline-variant/5">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-center gap-5">
                            <div className="relative">
                                <img alt="Elena Aris" className="w-16 h-16 rounded-xl object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfbWxh370Idp0crra3-VPB-TgASjjZVtU22TEaaLNoot-3KqAeZTqoMGpdwsVX9mp3VFye01ZMdFIEAzOlhWxM9A6k0Clrk_zmlyvFS_JYlBnU90nHV7y6a0MscO9wkLkkZ1briDVAmnLEjtgzBjlf3DcuRi3PYeNIo44KFbke-IVvm-kwtdxZQ2eXIiZYkoIzANK5thS_8-c2LTKMSSgnwAJNxxKEbK4ilRUgb7pqicfAbnuPMlrcIFRudN93N_FEtmPvWeIdbSM" />
                                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-2 border-white rounded-full flex items-center justify-center">
                                    <span className="material-symbols-outlined text-[12px] text-white" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-headline font-bold text-xl text-on-surface">Elena Aris</h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="material-symbols-outlined text-sm text-primary">work</span>
                                    <p className="text-sm text-slate-600">Senior Urban Infrastructure Planner</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-8">
                            <div className="text-center">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Compatibility</p>
                                <div className="flex items-center gap-2">
                                    <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <div className="w-[96%] h-full bg-gradient-to-r from-primary to-primary-container"></div>
                                    </div>
                                    <span className="font-headline font-black text-primary">96%</span>
                                </div>
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                                <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full uppercase tracking-tighter">Reviewed</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="p-2 bg-surface-container-low text-on-surface-variant hover:bg-primary-container hover:text-on-primary transition-all rounded-lg active:scale-95 duration-200 group/btn">
                                    <span className="material-symbols-outlined">visibility</span>
                                </button>
                                <button className="p-2 bg-surface-container-low text-on-surface-variant hover:bg-primary-container hover:text-on-primary transition-all rounded-lg active:scale-95 duration-200">
                                    <span className="material-symbols-outlined">mail</span>
                                </button>
                                <button className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold text-sm rounded-lg active:scale-95 duration-200 shadow-lg shadow-primary/20">
                                    Change Status
                                    <span className="material-symbols-outlined text-sm">expand_more</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Applicant Card 2 */}
                <div className="group bg-surface-container-lowest hover:bg-surface-bright p-6 rounded-xl transition-all duration-300 hover:-translate-y-1 shadow-[0px_4px_12px_rgba(27,59,90,0.02)] border border-outline-variant/5">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-center gap-5">
                            <div className="relative">
                                <img alt="Marcus Chen" className="w-16 h-16 rounded-xl object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCizhnLyqmhWMaaeviq71PzWg7WHbAXrBSgY5VB7aIYF3tVbpxtpP3yRPBTK9C1C-yn2-pJ3d-sVxMKD0CtgxoO3ArejxQNRoRa9IBNx3F3fX0QrmgDgfSB1zZM0SrEJtiHDWtoZohmW4tGaUgzNXpZN5GvuWERafol79V77bNh1zvwAQJQcAS8X-u8FF9s634pOI0DCuy4Mvv7RaemY9JPl7pflOwqGmC6w4k8f4ioyGpLyCDAWE0mZ5T-x9pNwHiJamOMK5pUOeQ" />
                            </div>
                            <div>
                                <h3 className="font-headline font-bold text-xl text-on-surface">Marcus Chen</h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="material-symbols-outlined text-sm text-primary">work</span>
                                    <p className="text-sm text-slate-600">Environmental Policy Analyst</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-8">
                            <div className="text-center">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Compatibility</p>
                                <div className="flex items-center gap-2">
                                    <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <div className="w-[82%] h-full bg-gradient-to-r from-primary to-primary-container"></div>
                                    </div>
                                    <span className="font-headline font-black text-primary">82%</span>
                                </div>
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                                <span className="px-3 py-1 bg-red-50 text-red-700 text-xs font-bold rounded-full uppercase tracking-tighter">New</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="p-2 bg-surface-container-low text-on-surface-variant hover:bg-primary-container hover:text-on-primary transition-all rounded-lg active:scale-95 duration-200">
                                    <span className="material-symbols-outlined">visibility</span>
                                </button>
                                <button className="p-2 bg-surface-container-low text-on-surface-variant hover:bg-primary-container hover:text-on-primary transition-all rounded-lg active:scale-95 duration-200">
                                    <span className="material-symbols-outlined">mail</span>
                                </button>
                                <button className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold text-sm rounded-lg active:scale-95 duration-200 shadow-lg shadow-primary/20">
                                    Change Status
                                    <span className="material-symbols-outlined text-sm">expand_more</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Applicant Card 3 */}
                <div className="group bg-surface-container-lowest hover:bg-surface-bright p-6 rounded-xl transition-all duration-300 hover:-translate-y-1 shadow-[0px_4px_12px_rgba(27,59,90,0.02)] border border-outline-variant/5">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-center gap-5">
                            <div className="relative">
                                <img alt="Sarah Thompson" className="w-16 h-16 rounded-xl object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYV3QwOPJK5NkF6Hr84ShKIuA4VS6MB3vwZMzkaH_NhJ7FJ5bzRzJKc59vJ_uPFah50jHDGYKSf3tTmYS2MrLPslOCrlIfzQtKQlCteycAautTf9hjQ-0UaZhAIUdTQRxMMyuYDrGfsm0B5tLHif-p8K0diPSPKTdbapyxVxlDgEr3g_vRHymCU08Nlip8fWyuSIjGMzmvjyz2CZjbr-wN1C5bkrwZY9bViMZ48Jk15ixFQiW1XzRca51HHcdqrD_qLT8O6TQjyFg" />
                            </div>
                            <div>
                                <h3 className="font-headline font-bold text-xl text-on-surface">Sarah Thompson</h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="material-symbols-outlined text-sm text-primary">work</span>
                                    <p className="text-sm text-slate-600">Community Outreach Liaison</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-8">
                            <div className="text-center">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Compatibility</p>
                                <div className="flex items-center gap-2">
                                    <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <div className="w-[74%] h-full bg-gradient-to-r from-primary to-primary-container"></div>
                                    </div>
                                    <span className="font-headline font-black text-primary">74%</span>
                                </div>
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                                <span className="px-3 py-1 bg-yellow-50 text-yellow-700 text-xs font-bold rounded-full uppercase tracking-tighter">Interviewed</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="p-2 bg-surface-container-low text-on-surface-variant hover:bg-primary-container hover:text-on-primary transition-all rounded-lg active:scale-95 duration-200">
                                    <span className="material-symbols-outlined">visibility</span>
                                </button>
                                <button className="p-2 bg-surface-container-low text-on-surface-variant hover:bg-primary-container hover:text-on-primary transition-all rounded-lg active:scale-95 duration-200">
                                    <span className="material-symbols-outlined">mail</span>
                                </button>
                                <button className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold text-sm rounded-lg active:scale-95 duration-200 shadow-lg shadow-primary/20">
                                    Change Status
                                    <span className="material-symbols-outlined text-sm">expand_more</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Empty Pagination / Load More */}
            <div className="mt-12 flex justify-center">
                <button className="px-12 py-4 bg-surface-container-high text-primary font-bold tracking-tight rounded-xl hover:bg-surface-container-highest transition-all active:scale-95">
                    Load More Applicants
                </button>
            </div>
        </div>
    );
};
