import React from 'react';

export const MerchantApplicants: React.FC = () => {
    return (
        <div className="pt-8 pb-12 px-6 lg:px-12 max-w-7xl mx-auto w-full">
            {/* Header Section with Asymmetric Layout */}
            <div className="grid grid-cols-12 gap-10 mb-16 items-end">
                <div className="col-span-12 md:col-span-8">
                    <p className="text-secondary font-headline font-bold uppercase tracking-[0.25em] text-[10px] mb-4 block">Talent Pipeline</p>
                    <h2 className="font-headline text-5xl md:text-7xl font-bold text-primary tracking-[-0.03em] leading-[1.05]">Review Your Recent <span className="text-secondary">Applicants</span></h2>
                </div>
                <div className="col-span-12 md:col-span-4">
                    <div className="p-8 bg-surface-container-low rounded-[2.5rem] no-line relative overflow-hidden">
                        <p className="font-headline text-lg font-bold text-primary italic relative z-10 leading-relaxed">"The quality of a community is built through the precision of its public workforce."</p>
                        <span className="material-symbols-outlined absolute -right-4 -bottom-6 text-9xl text-primary/5 select-none pointer-events-none">format_quote</span>
                    </div>
                </div>
            </div>

            {/* Filters Bar */}
            <div className="bg-surface-container-low rounded-[1.5rem] no-line p-5 mb-10 flex flex-wrap items-center justify-between gap-6 shadow-sm">
                <div className="flex items-center gap-6 flex-1 min-w-[300px]">
                    <div className="relative flex-1 max-w-md">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary opacity-40">search</span>
                        <input className="w-full bg-white no-line pl-12 pr-6 py-4 text-sm font-bold text-primary rounded-2xl transition-all focus:ring-2 focus:ring-primary/10 placeholder:text-on-surface/30 placeholder:font-medium" placeholder="Search by name or title..." type="text" />
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="hidden sm:inline text-[10px] font-black text-on-surface opacity-30 uppercase tracking-[0.2em]">Filter by Job:</span>
                        <select className="bg-transparent border-none text-sm font-bold focus:ring-0 cursor-pointer text-primary p-0 h-auto">
                            <option>All Listings</option>
                            <option>City Planner</option>
                            <option>Social Services Coord.</option>
                            <option>Public Safety Officer</option>
                        </select>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2.5 px-6 py-3 bg-white hover:bg-surface-container-high transition-all rounded-xl text-xs font-black uppercase tracking-widest text-primary shadow-sm">
                        <span className="material-symbols-outlined text-sm">sort</span>
                        Newest first
                    </button>
                </div>
            </div>

            {/* Applicants Grid */}
            <div className="grid grid-cols-1 gap-6">
                {/* Applicant Card 1 */}
                <div className="group bg-surface-container-lowest hover:bg-surface-container-low p-8 rounded-[2.5rem] no-line transition-all duration-300 cursor-pointer">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                        <div className="flex items-center gap-8">
                            <div className="relative group/avatar">
                                <img alt="Elena Aris" className="w-20 h-20 rounded-[1.5rem] object-cover shadow-xl transition-transform group-hover/avatar:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfbWxh370Idp0crra3-VPB-TgASjjZVtU22TEaaLNoot-3KqAeZTqoMGpdwsVX9mp3VFye01ZMdFIEAzOlhWxM9A6k0Clrk_zmlyvFS_JYlBnU90nHV7y6a0MscO9wkLkkZ1briDVAmnLEjtgzBjlf3DcuRi3PYeNIo44KFbke-IVvm-kwtdxZQ2eXIiZYkoIzANK5thS_8-c2LTKMSSgnwAJNxxKEbK4ilRUgb7pqicfAbnuPMlrcIFRudN93N_FEtmPvWeIdbSM" />
                                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 border-4 border-surface-container-lowest rounded-2xl flex items-center justify-center shadow-lg">
                                    <span className="material-symbols-outlined text-[16px] text-white" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-headline font-bold text-2xl text-primary mb-1">Elena Aris</h3>
                                <div className="flex items-center gap-2.5">
                                    <div className="w-5 h-5 bg-primary/5 rounded-lg flex items-center justify-center">
                                        <span className="material-symbols-outlined text-[14px] text-primary">work</span>
                                    </div>
                                    <p className="text-sm font-medium text-on-surface opacity-50">Senior Urban Infrastructure Planner</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-12">
                            <div className="text-center min-w-[120px]">
                                <p className="text-[10px] font-black text-on-surface opacity-30 uppercase tracking-[0.2em] mb-3">Compatibility</p>
                                <div className="flex items-center justify-center gap-3">
                                    <div className="w-20 h-2 bg-surface-container-high rounded-full overflow-hidden">
                                        <div className="w-[96%] h-full bg-secondary"></div>
                                    </div>
                                    <span className="font-headline font-black text-secondary text-lg">96%</span>
                                </div>
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-on-surface opacity-30 uppercase tracking-[0.2em] mb-3">Status</p>
                                <span className="px-4 py-1.5 bg-primary text-white text-[10px] font-black rounded-full uppercase tracking-widest shadow-lg shadow-primary/20 transition-transform group-hover:scale-105">Reviewed</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <button className="w-12 h-12 bg-white text-primary hover:bg-primary hover:text-white transition-all rounded-2xl flex items-center justify-center shadow-sm">
                                    <span className="material-symbols-outlined text-[20px]">visibility</span>
                                </button>
                                <button className="w-12 h-12 bg-white text-primary hover:bg-primary hover:text-white transition-all rounded-2xl flex items-center justify-center shadow-sm">
                                    <span className="material-symbols-outlined text-[20px]">mail</span>
                                </button>
                                <button className="flex items-center gap-2 px-8 py-3.5 bg-secondary text-white font-black text-[11px] uppercase tracking-widest rounded-2xl hover:bg-primary transition-all shadow-xl shadow-secondary/10">
                                    Actions
                                    <span className="material-symbols-outlined text-sm">expand_more</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Applicant Card 2 */}
                <div className="group bg-surface-container-lowest hover:bg-surface-container-low p-8 rounded-[2.5rem] no-line transition-all duration-300 cursor-pointer opacity-70 hover:opacity-100">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                        <div className="flex items-center gap-8">
                            <div className="relative group/avatar">
                                <img alt="Marcus Chen" className="w-20 h-20 rounded-[1.5rem] object-cover filter grayscale group-hover/avatar:grayscale-0 transition-all group-hover/avatar:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCizhnLyqmhWMaaeviq71PzWg7WHbAXrBSgY5VB7aIYF3tVbpxtpP3yRPBTK9C1C-yn2-pJ3d-sVxMKD0CtgxoO3ArejxQNRoRa9IBNx3F3fX0QrmgDgfSB1zZM0SrEJtiHDWtoZohmW4tGaUgzNXpZN5GvuWERafol79V77bNh1zvwAQJQcAS8X-u8FF9s634pOI0DCuy4Mvv7RaemY9JPl7pflOwqGmC6w4k8f4ioyGpLyCDAWE0mZ5T-x9pNwHiJamOMK5pUOeQ" />
                            </div>
                            <div>
                                <h3 className="font-headline font-bold text-2xl text-primary mb-1">Marcus Chen</h3>
                                <div className="flex items-center gap-2.5">
                                    <div className="w-5 h-5 bg-primary/5 rounded-lg flex items-center justify-center">
                                        <span className="material-symbols-outlined text-[14px] text-primary">work</span>
                                    </div>
                                    <p className="text-sm font-medium text-on-surface opacity-50">Environmental Policy Analyst</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-12">
                            <div className="text-center min-w-[120px]">
                                <p className="text-[10px] font-black text-on-surface opacity-30 uppercase tracking-[0.2em] mb-3">Compatibility</p>
                                <div className="flex items-center justify-center gap-3">
                                    <div className="w-20 h-2 bg-surface-container-high rounded-full overflow-hidden">
                                        <div className="w-[82%] h-full bg-secondary opacity-60"></div>
                                    </div>
                                    <span className="font-headline font-black text-secondary opacity-60 text-lg">82%</span>
                                </div>
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-on-surface opacity-30 uppercase tracking-[0.2em] mb-3">Status</p>
                                <span className="px-4 py-1.5 bg-surface-container-high text-on-surface opacity-60 text-[10px] font-black rounded-full uppercase tracking-widest">New</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <button className="w-12 h-12 bg-white text-primary hover:bg-primary hover:text-white transition-all rounded-2xl flex items-center justify-center shadow-sm">
                                    <span className="material-symbols-outlined text-[20px]">visibility</span>
                                </button>
                                <button className="w-12 h-12 bg-white text-primary hover:bg-primary hover:text-white transition-all rounded-2xl flex items-center justify-center shadow-sm">
                                    <span className="material-symbols-outlined text-[20px]">mail</span>
                                </button>
                                <button className="flex items-center gap-2 px-8 py-3.5 bg-secondary text-white font-black text-[11px] uppercase tracking-widest rounded-2xl hover:bg-primary transition-all shadow-xl shadow-secondary/10">
                                    Actions
                                    <span className="material-symbols-outlined text-sm">expand_more</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Applicant Card 3 */}
                <div className="group bg-surface-container-lowest hover:bg-surface-container-low p-8 rounded-[2.5rem] no-line transition-all duration-300 cursor-pointer opacity-70 hover:opacity-100">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                        <div className="flex items-center gap-8">
                            <div className="relative group/avatar">
                                <img alt="Sarah Thompson" className="w-20 h-20 rounded-[1.5rem] object-cover filter grayscale group-hover/avatar:grayscale-0 transition-all group-hover/avatar:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYV3QwOPJK5NkF6Hr84ShKIuA4VS6MB3vwZMzkaH_NhJ7FJ5bzRzJKc59vJ_uPFah50jHDGYKSf3tTmYS2MrLPslOCrlIfzQtKQlCteycAautTf9hjQ-0UaZhAIUdTQRxMMyuYDrGfsm0B5tLHif-p8K0diPSPKTdbapyxVxlDgEr3g_vRHymCU08Nlip8fWyuSIjGMzmvjyz2CZjbr-wN1C5bkrwZY9bViMZ48Jk15ixFQiW1XzRca51HHcdqrD_qLT8O6TQjyFg" />
                            </div>
                            <div>
                                <h3 className="font-headline font-bold text-2xl text-primary mb-1">Sarah Thompson</h3>
                                <div className="flex items-center gap-2.5">
                                    <div className="w-5 h-5 bg-primary/5 rounded-lg flex items-center justify-center">
                                        <span className="material-symbols-outlined text-[14px] text-primary">work</span>
                                    </div>
                                    <p className="text-sm font-medium text-on-surface opacity-50">Community Outreach Liaison</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-12">
                            <div className="text-center min-w-[120px]">
                                <p className="text-[10px] font-black text-on-surface opacity-30 uppercase tracking-[0.2em] mb-3">Compatibility</p>
                                <div className="flex items-center justify-center gap-3">
                                    <div className="w-20 h-2 bg-surface-container-high rounded-full overflow-hidden">
                                        <div className="w-[74%] h-full bg-secondary opacity-60"></div>
                                    </div>
                                    <span className="font-headline font-black text-secondary opacity-60 text-lg">74%</span>
                                </div>
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-on-surface opacity-30 uppercase tracking-[0.2em] mb-3">Status</p>
                                <span className="px-4 py-1.5 bg-secondary/10 text-secondary text-[10px] font-black rounded-full uppercase tracking-widest">Interviewed</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <button className="w-12 h-12 bg-white text-primary hover:bg-primary hover:text-white transition-all rounded-2xl flex items-center justify-center shadow-sm">
                                    <span className="material-symbols-outlined text-[20px]">visibility</span>
                                </button>
                                <button className="w-12 h-12 bg-white text-primary hover:bg-primary hover:text-white transition-all rounded-2xl flex items-center justify-center shadow-sm">
                                    <span className="material-symbols-outlined text-[20px]">mail</span>
                                </button>
                                <button className="flex items-center gap-2 px-8 py-3.5 bg-secondary text-white font-black text-[11px] uppercase tracking-widest rounded-2xl hover:bg-primary transition-all shadow-xl shadow-secondary/10">
                                    Actions
                                    <span className="material-symbols-outlined text-sm">expand_more</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Empty Pagination / Load More */}
            <div className="mt-20 flex justify-center">
                <button className="px-16 py-5 bg-surface-container-low text-primary font-black uppercase tracking-[0.2em] text-[11px] rounded-2xl hover:bg-surface-container-high transition-all active:scale-95 no-line shadow-sm">
                    Load More Applicants
                </button>
            </div>
        </div>
    );
};
