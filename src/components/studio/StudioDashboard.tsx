import React from 'react';

export const StudioDashboard: React.FC = () => {
    return (
        <div className="pb-24 md:pb-0 bg-[#fbf9f8] min-h-screen">
            {/* Dashboard Header */}
            <div className="pt-20 pb-12 px-6 lg:px-12">
                <div className="container mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12">
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-[9px] font-black tracking-[0.2em] uppercase">
                                <span className="w-1.5 h-1.5 bg-[#b9000b] rounded-full animate-pulse"></span>
                                Live Tracking
                            </div>
                            <h1 className="text-6xl lg:text-7xl font-headline font-black tracking-tighter leading-none text-slate-950">
                                Meine <span className="italic">Projekte</span>
                            </h1>
                            <p className="text-slate-500 font-medium text-lg">Präzise Kontrolle über jeden Meilenstein Ihres digitalen Wachstums.</p>
                        </div>
                        <div className="flex gap-4">
                            <button className="bg-white border border-slate-200 p-4 rounded-2xl text-slate-900 group hover:border-[#b9000b] transition-all shadow-sm">
                                <span className="material-symbols-outlined group-hover:scale-110 transition-transform">filter_list</span>
                            </button>
                            <button className="bg-[#b9000b] text-white px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] shadow-xl shadow-[#b9000b]/20 active:scale-95 transition-all">
                                Neues Projekt
                            </button>
                        </div>
                    </div>

                    {/* Bento Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Featured Project */}
                        <div className="lg:col-span-8 bg-white rounded-[40px] p-10 lg:p-16 shadow-sm border border-slate-100 flex flex-col justify-between group hover:shadow-2xl hover:shadow-slate-200 transition-all duration-700">
                            <div className="space-y-8">
                                <div className="flex justify-between items-start">
                                    <div className="space-y-1">
                                        <h2 className="text-4xl font-headline font-black text-slate-950 tracking-tight">Web-Redesign MVP</h2>
                                        <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em]">Firma XYZ &middot; Phase: Implementation</p>
                                    </div>
                                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-[#b9000b]">
                                        <span className="material-symbols-outlined text-3xl filled-icon">web</span>
                                    </div>
                                </div>

                                {/* Milestone Progress */}
                                <div className="space-y-6">
                                    <div className="flex justify-between items-end">
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Gesamtfortschritt</span>
                                        <span className="text-2xl font-headline font-black text-slate-950">68%</span>
                                    </div>
                                    <div className="h-3 bg-slate-50 rounded-full overflow-hidden p-0.5 border border-slate-100">
                                        <div className="h-full bg-gradient-to-r from-[#b9000b] to-[#ff4d58] rounded-full transition-all duration-1000 shadow-[0_0_12px_rgba(185,0,11,0.3)]" style={{ width: '68%' }}></div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                                    {[
                                        { label: "Konzeption", status: "completed", date: "12.03.2026" },
                                        { label: "UI Design", status: "completed", date: "24.03.2026" },
                                        { label: "Development", status: "active", date: "Zieht..." }
                                    ].map((m, i) => (
                                        <div key={i} className={`p-6 rounded-3xl border ${m.status === 'active' ? 'bg-slate-950 text-white border-slate-800' : 'bg-slate-50 border-slate-100 opacity-60'}`}>
                                            <div className="text-[9px] font-black uppercase tracking-[0.2em] mb-4 opacity-50">{m.label}</div>
                                            <div className="flex items-center gap-3">
                                                <span className={`material-symbols-outlined text-sm ${m.status === 'completed' ? 'text-[#b9000b] filled-icon' : 'text-slate-400'}`}>
                                                    {m.status === 'completed' ? 'check_circle' : 'pending'}
                                                </span>
                                                <span className="text-xs font-bold">{m.date}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-12 flex items-center justify-between border-t border-slate-100 pt-8">
                                <div className="flex -space-x-4">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-slate-200 overflow-hidden shadow-sm">
                                            <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="Team Member" />
                                        </div>
                                    ))}
                                    <div className="w-10 h-10 rounded-full border-4 border-white bg-[#b9000b] flex items-center justify-center text-white text-[10px] font-black">+2</div>
                                </div>
                                <button className="text-[#b9000b] font-black uppercase text-[10px] tracking-[0.2em] flex items-center gap-2 group-hover:gap-4 transition-all">
                                    Details öffnen <span className="material-symbols-outlined text-xs">arrow_forward</span>
                                </button>
                            </div>
                        </div>

                        {/* Stats Sidebar */}
                        <div className="lg:col-span-4 flex flex-col gap-8">
                            {/* Project Count */}
                            <div className="bg-slate-950 text-white rounded-[40px] p-10 flex flex-col justify-between flex-1 relative overflow-hidden shadow-2xl">
                                <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#b9000b] opacity-10 blur-[60px] rounded-full"></div>
                                <div>
                                    <div className="text-[10px] font-black uppercase tracking-[0.3em] text-[#b9000b] mb-12">System Status</div>
                                    <div className="text-8xl font-headline font-black leading-none mb-4">04</div>
                                    <div className="text-lg font-medium opacity-60">Aktive Projekte im Studio</div>
                                </div>
                                <div className="mt-12 group cursor-pointer flex items-center justify-between">
                                    <span className="font-bold underline decoration-[#b9000b] decoration-2 underline-offset-8">Archiv einsehen</span>
                                    <span className="material-symbols-outlined text-[#b9000b]">archive</span>
                                </div>
                            </div>

                            {/* Resource Card */}
                            <div className="bg-white border border-slate-100 rounded-[40px] p-10 shadow-sm">
                                <h3 className="text-xl font-headline font-black text-slate-950 mb-8 uppercase tracking-tight italic">Nächster Meilenstein</h3>
                                <div className="space-y-6">
                                    <div className="flex gap-6 items-start">
                                        <div className="w-1.5 h-1.5 bg-[#b9000b] rounded-full mt-2.5"></div>
                                        <div>
                                            <div className="text-sm font-bold text-slate-950">Review: Design-Konzept</div>
                                            <div className="text-xs text-slate-500 mt-1">Morgen, 10:00 Uhr &middot; Google Meet</div>
                                        </div>
                                    </div>
                                    <button className="w-full bg-slate-50 text-slate-900 py-4 rounded-2xl font-black uppercase text-[9px] tracking-[0.2em] border border-slate-100 hover:bg-slate-100 transition-colors">
                                        Kalender öffnen
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity Mini-Bento */}
                        <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { title: "Feedback erhalten", proj: "KI-Chatbot v2", icon: "forum", time: "Vor 2h" },
                                { title: "Asset-Upload", proj: "Recruiting Funnel", icon: "upload_file", time: "Vor 5h" },
                                { title: "Deployment", proj: "Merchant Portal", icon: "rocket_launch", time: "Gestern" }
                            ].map((act, i) => (
                                <div key={i} className="bg-white p-8 rounded-[40px] border border-slate-100 flex items-center gap-6 group hover:-translate-y-1 transition-all shadow-sm">
                                    <div className="w-12 h-12 bg-slate-50 flex items-center justify-center rounded-2xl text-slate-400 group-hover:text-[#b9000b] transition-colors">
                                        <span className="material-symbols-outlined">{act.icon}</span>
                                    </div>
                                    <div>
                                        <div className="text-xs font-black text-slate-950 flex items-center gap-2">
                                            {act.title}
                                            <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                            <span className="text-[9px] text-slate-400 lowercase italic">{act.time}</span>
                                        </div>
                                        <div className="text-[10px] text-slate-500 font-medium">{act.proj}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
