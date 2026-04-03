import React from 'react';

export const StudioDashboard: React.FC = () => {
    return (
        <div className="pt-8 pb-20 px-4 md:px-12 max-w-7xl mx-auto">
            {/* Dashboard Header */}
            <div className="mb-12">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-2 block">Willkommen zurück</span>
                <h2 className="text-4xl md:text-5xl font-black font-headline tracking-tighter text-on-background">WMK Studio Dashboard</h2>
            </div>
            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Main Project Card (Asymmetric Focus) */}
                <div className="md:col-span-8 space-y-8">
                    {/* Civic Lead Component */}
                    <div className="surface-container-high border-l-[12px] border-primary p-8 rounded-lg bg-surface-container-high">
                        <h3 className="text-3xl font-bold font-headline text-on-surface mb-2">Web-Redesign Portfolio</h3>
                        <p className="text-on-surface-variant max-w-xl">Wir befinden uns aktuell in der finalen Entwicklungsphase. Das Responsive Testing wird wie geplant abgeschlossen.</p>
                        <div className="mt-8 space-y-4">
                            <div className="flex justify-between items-end">
                                <span className="text-sm font-semibold text-primary">In Entwicklung</span>
                                <span className="text-sm font-bold text-on-background">75%</span>
                            </div>
                            <div className="w-full bg-surface-container-lowest h-3 rounded-full overflow-hidden">
                                <div className="bg-gradient-to-r from-primary to-primary-container h-full w-[75%]"></div>
                            </div>
                        </div>
                    </div>
                    {/* Next Milestones List */}
                    <div className="bg-surface-container-lowest p-8 rounded-lg shadow-[0px_12px_32px_rgba(27,59,90,0.06)]">
                        <h4 className="text-xl font-bold font-headline text-on-background mb-8 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">event_upcoming</span>
                            Nächste Meilensteine
                        </h4>
                        <div className="space-y-6">
                            <div className="flex items-start gap-6 group">
                                <div className="flex-shrink-0 w-12 text-center py-2 bg-surface-container-low rounded-lg transition-colors group-hover:bg-primary/10">
                                    <span className="block text-xs font-bold uppercase text-on-surface-variant">Okt</span>
                                    <span className="block text-xl font-black text-on-background">20</span>
                                </div>
                                <div className="flex-grow pb-6 border-b border-outline-variant/15">
                                    <h5 className="font-bold text-on-background">Design-Abnahme</h5>
                                    <p className="text-sm text-on-surface-variant">Finale Prüfung der UI-Prototypen und Assets.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-6 group">
                                <div className="flex-shrink-0 w-12 text-center py-2 bg-surface-container-low rounded-lg transition-colors group-hover:bg-primary/10">
                                    <span className="block text-xs font-bold uppercase text-on-surface-variant">Nov</span>
                                    <span className="block text-xl font-black text-on-background">04</span>
                                </div>
                                <div className="flex-grow pb-6 border-b border-outline-variant/15">
                                    <h5 className="font-bold text-on-background">Content Integration</h5>
                                    <p className="text-sm text-on-surface-variant">Einpflegen der redaktionellen Inhalte und Medien.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-6 group">
                                <div className="flex-shrink-0 w-12 text-center py-2 bg-surface-container-low rounded-lg transition-colors group-hover:bg-primary/10">
                                    <span className="block text-xs font-bold uppercase text-on-surface-variant">Nov</span>
                                    <span className="block text-xl font-black text-on-background">15</span>
                                </div>
                                <div className="flex-grow">
                                    <h5 className="font-bold text-on-background">Go-Live Vorbereitung</h5>
                                    <p className="text-sm text-on-surface-variant">Server-Konfiguration und finale SEO-Checks.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Sidebar Info */}
                <div className="md:col-span-4 space-y-8">
                    {/* Contact Card */}
                    <div className="bg-on-background p-8 rounded-lg text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-primary-fixed-dim mb-6">Ihr Ansprechpartner</h4>
                        <div className="flex items-center gap-4 mb-8 relative z-10">
                            <img alt="Marcus Keller" className="w-16 h-16 rounded-lg object-cover ring-2 ring-primary/30" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAL4i8zP9-uFIZl2fU0_mIBScUZQSdpeDQlxm2G0ZHeAFbzcJc4MUfDgeBlx04HnqN0l0ai3nAU2H--4CqMSCK9NPz7d9i63J5qZatueTPpCUh3C-LlSJ1ZKC2rTq3Eg8UP03TtrPaeJn_YfksNwWhWcXKR1AKMayDx8yZhSaX4P4M9vFPyv6k6IOpkXLwCmU830H0uFBXsWRRCM3crgWDBwBCo__SnaUHv67LWu9g94fJS-QAE-wlnNKr1d_ylu2uHJf4FMkzDX4I" />
                            <div>
                                <span className="block font-bold text-lg leading-tight">Marcus Keller</span>
                                <span className="block text-sm text-slate-400">Senior Project Lead</span>
                            </div>
                        </div>
                        <button className="w-full relative z-10 bg-gradient-to-br from-primary to-primary-container text-white font-bold py-4 rounded-md flex items-center justify-center gap-3 active:opacity-80 transition-all hover:translate-y-[-2px] shadow-lg shadow-primary/20">
                            <span className="material-symbols-outlined">chat</span>
                            Chat mit dem Studio
                        </button>
                    </div>
                    {/* Secondary Project List */}
                    <div className="bg-surface-container-low p-8 rounded-lg">
                        <h4 className="text-sm font-bold uppercase tracking-wider text-on-surface-variant mb-6">Weitere Projekte</h4>
                        <div className="space-y-4">
                            <div className="bg-surface-container-lowest p-4 rounded-md flex items-center justify-between group cursor-pointer hover:bg-surface-bright transition-all">
                                <div>
                                    <span className="block font-bold text-on-background">Brand Identity</span>
                                    <span className="block text-xs text-on-surface-variant">Abgeschlossen</span>
                                </div>
                                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">check_circle</span>
                            </div>
                            <div className="bg-surface-container-lowest p-4 rounded-md flex items-center justify-between group cursor-pointer hover:bg-surface-bright transition-all">
                                <div>
                                    <span className="block font-bold text-on-background">Social Media Assets</span>
                                    <span className="block text-xs text-on-surface-variant">In Planung</span>
                                </div>
                                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">schedule</span>
                            </div>
                        </div>
                    </div>
                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-surface-container-lowest p-4 rounded-lg shadow-sm">
                            <span className="block text-xs font-bold text-on-surface-variant uppercase">Tasks</span>
                            <span className="text-2xl font-black text-on-background">12</span>
                        </div>
                        <div className="bg-surface-container-lowest p-4 rounded-lg shadow-sm">
                            <span className="block text-xs font-bold text-on-surface-variant uppercase">Review</span>
                            <span className="text-2xl font-black text-primary">02</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
