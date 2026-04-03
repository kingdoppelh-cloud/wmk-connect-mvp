import React from 'react';

export const StudioAssets: React.FC = () => {
    return (
        <div className="px-6 py-8 md:px-12 md:py-12 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div className="max-w-2xl">
                    <span className="inline-block px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed-variant text-[11px] font-bold uppercase tracking-[0.2em] mb-4">Projekt Übersicht</span>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-on-surface font-headline tracking-tight mb-4">Files & Deliverables</h2>
                    <p className="text-secondary text-lg leading-relaxed">Verwalten Sie Ihre Projekt-Assets, prüfen Sie Entwürfe und geben Sie finale Designs für die Produktion frei.</p>
                </div>
                <div className="flex gap-3">
                    <button className="bg-primary-container text-on-primary hover:opacity-90 px-6 py-3 rounded-md font-bold text-sm transition-all flex items-center gap-2 shadow-lg shadow-primary/20">
                        <span className="material-symbols-outlined text-sm">download</span>
                        Alle Laden
                    </button>
                </div>
            </div>
            {/* Tonal Layering Section: Categories */}
            <div className="space-y-16">
                {/* Section: Entwürfe */}
                <section>
                    <div className="flex items-center gap-4 mb-8">
                        <h3 className="text-xl font-bold font-headline text-on-surface">Entwürfe</h3>
                        <div className="h-[1px] flex-1 bg-outline-variant/20"></div>
                        <span className="text-xs font-bold text-secondary tracking-widest uppercase">3 Dateien</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <div className="group bg-surface-container-lowest p-5 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0px_12px_32px_rgba(27,59,90,0.06)] border border-outline-variant/10">
                            <div className="aspect-video w-full rounded-lg bg-surface-container-low overflow-hidden mb-5 relative">
                                <img alt="Draft 1" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWQb4vvoEVKkGO6CypAuxcExKdvFE7v1hVOZOG6Rou-zwM9JvoSDHkcsyvYtPuB8lLHioqmeqEHsi65Q0e834faXTJboE0b7PakYlBgrkkKgQbeG9Xjdt5JNs7QhnqC6jK4IHY-nFl4MISPwlrsTAetrPgXZPdmppqqhyxnxSJAo-uSGu_yDvJCG5-O2lK8GFHmhgF2kP2EPoV_oXWV-dBWUF-4P9rj4GbWzT6JDgcQ7Rl3T41zvh1oE4FYFju3nG2B2GtfiU0P78" />
                                <div className="absolute top-3 left-3 px-2 py-1 bg-surface-container-lowest/90 backdrop-blur-md text-[10px] font-bold rounded shadow-sm">V1.2</div>
                            </div>
                            <div className="mb-6">
                                <h4 className="text-on-surface font-bold mb-1">Web-Interface Mockup</h4>
                                <p className="text-xs text-secondary font-medium">12. Okt 2023 • 4.2 MB</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="flex-1 py-2.5 bg-surface-container-low text-on-surface hover:bg-surface-variant transition-colors text-xs font-bold rounded">Feedback</button>
                                <button className="flex-1 py-2.5 bg-primary text-on-primary hover:opacity-90 transition-opacity text-xs font-bold rounded">Freigeben</button>
                            </div>
                        </div>
                        {/* Card 2 */}
                        <div className="group bg-surface-container-lowest p-5 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0px_12px_32px_rgba(27,59,90,0.06)] border border-outline-variant/10">
                            <div className="aspect-video w-full rounded-lg bg-surface-container-low overflow-hidden mb-5 relative">
                                <img alt="Draft 2" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBytpkXc9hUYmiA5VRZv0kJXb9VjDKMLzdqqXJ5G8-X1lOUzw71Vx_GfVPhk_Tam3bEzA7Z_B3AiGjqNmvYtC2PqJeVfrkdSC2f-SthhSMFAG_DWK4r5HqTeVLPkz-lgFfoKMM3H_sHyTQhDcrgOV-1YV3C61ij8EJHjpGPgGrZBCr1wpJy7WvT8uD02NK2l7t5Ijc-4LiyslJpg8riwLFdokLhDlPS9MIVai4EXCiQIiS-IqBpXLFSN6fsJbcqnmVMISHV2kKCZaQ" />
                                <div className="absolute top-3 left-3 px-2 py-1 bg-surface-container-lowest/90 backdrop-blur-md text-[10px] font-bold rounded shadow-sm">V1.0</div>
                            </div>
                            <div className="mb-6">
                                <h4 className="text-on-surface font-bold mb-1">Moodboard Konzept</h4>
                                <p className="text-xs text-secondary font-medium">10. Okt 2023 • 8.7 MB</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="flex-1 py-2.5 bg-surface-container-low text-on-surface hover:bg-surface-variant transition-colors text-xs font-bold rounded">Feedback</button>
                                <button className="flex-1 py-2.5 bg-primary text-on-primary hover:opacity-90 transition-opacity text-xs font-bold rounded">Freigeben</button>
                            </div>
                        </div>
                        {/* Card 3 (Asymmetric Lead) */}
                        <div className="group bg-surface-container-low p-8 rounded-xl border-l-4 border-primary flex flex-col justify-between">
                            <div>
                                <span className="material-symbols-outlined text-primary text-4xl mb-4 filled-icon">pending_actions</span>
                                <h4 className="text-xl font-bold font-headline text-on-surface mb-2">Weitere Entwürfe in Arbeit</h4>
                                <p className="text-sm text-secondary leading-relaxed">Wir finalisieren derzeit die Icon-Sets und Typografie-Hierarchien. Erwartet am 15. Oktober.</p>
                            </div>
                            <button className="mt-8 text-primary font-bold text-xs uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all">
                                Projekt-Zeitplan ansehen <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </button>
                        </div>
                    </div>
                </section>
                {/* Section: Logos */}
                <section>
                    <div className="flex items-center gap-4 mb-8">
                        <h3 className="text-xl font-bold font-headline text-on-surface">Logos</h3>
                        <div className="h-[1px] flex-1 bg-outline-variant/20"></div>
                        <span className="text-xs font-bold text-secondary tracking-widest uppercase">2 Varianten</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Card 4 (Logo White) */}
                        <div className="flex flex-col md:flex-row bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant/10 hover:shadow-lg transition-shadow">
                            <div className="md:w-48 aspect-square bg-slate-100 flex items-center justify-center p-8">
                                <img alt="Logo Variant" className="w-full h-auto grayscale opacity-80" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCautpe4xmN4ZWn-0Dtxf_XMfonfcjUh89alQu6y6jVOrCby4iPc4A_LxO5gYO0W7QJY0aOyAFM_tGnjXlHhBKKWAo3oS_563Em3zjKXr-yHBGFx5cI-W9YreCpmUvaGBeYlSNUXhJLZdjWcz1mkCQGMbpBpBHsNN9jsa_jf7cl-ckMWLZ0cZM-K2OoR8f9NBJQbjHg3EJMbO4FGXF6lnyJX0GZKcYNX9It3CAWe9Ud9ISczqe8Cij58iWxHxqyKW9rF_yr3pKt1vE" />
                            </div>
                            <div className="flex-1 p-6 flex flex-col justify-center">
                                <div className="mb-4">
                                    <h4 className="text-on-surface font-bold text-lg">Primary Logo - Light</h4>
                                    <p className="text-xs text-secondary font-medium">SVG, PNG, PDF • 0.5 MB</p>
                                </div>
                                <div className="flex gap-3">
                                    <button className="px-4 py-2 bg-surface-container-low text-on-surface hover:bg-surface-variant transition-colors text-xs font-bold rounded">Details</button>
                                    <button className="px-4 py-2 border border-outline-variant/20 text-on-surface hover:bg-surface-container-low transition-colors text-xs font-bold rounded flex items-center gap-2">
                                        <span className="material-symbols-outlined text-sm">download</span> Download
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Card 5 (Logo Dark) */}
                        <div className="flex flex-col md:flex-row bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant/10 hover:shadow-lg transition-shadow">
                            <div className="md:w-48 aspect-square bg-on-surface flex items-center justify-center p-8">
                                <img alt="Logo Variant Dark" className="w-full h-auto invert" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4pMp1MEvp_EdIBwKTTEqhcgGUyPTQf5-qC_DdVf9tlUvl6Tkpbs3CJgerIPDoyAZlhHhnMeCqAwP6oeoU8v9twk4gjcLmKznN99yF37DzICxpRHRDzUhiKbTt9Fj_Z_6ba2ZUd6O9GNP3KidBo14rJ_AxaWYNXnzak8b2SnkOfU5iCGrxnXSaqkd5EhSQAzNP-pp1x2lRmuLH70jcm-LN6fqBKkbwtt55dzmIuFq97GQMP4U3GjofJ_-JBm4cJLIBSYgZCrcVkZc" />
                            </div>
                            <div className="flex-1 p-6 flex flex-col justify-center">
                                <div className="mb-4">
                                    <h4 className="text-on-surface font-bold text-lg">Primary Logo - Dark</h4>
                                    <p className="text-xs text-secondary font-medium">SVG, PNG, PDF • 0.5 MB</p>
                                </div>
                                <div className="flex gap-3">
                                    <button className="px-4 py-2 bg-surface-container-low text-on-surface hover:bg-surface-variant transition-colors text-xs font-bold rounded">Details</button>
                                    <button className="px-4 py-2 border border-outline-variant/20 text-on-surface hover:bg-surface-container-low transition-colors text-xs font-bold rounded flex items-center gap-2">
                                        <span className="material-symbols-outlined text-sm">download</span> Download
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Section: Finales Design */}
                <section className="pb-20">
                    <div className="flex items-center gap-4 mb-8">
                        <h3 className="text-xl font-bold font-headline text-on-surface">Finales Design</h3>
                        <div className="h-[1px] flex-1 bg-outline-variant/20"></div>
                        <span className="text-xs font-bold text-secondary tracking-widest uppercase">Freigegeben</span>
                    </div>
                    {/* High-End Glassmorphism Card */}
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary-container p-[1px] shadow-2xl shadow-primary/20">
                        <div className="bg-surface-container-lowest/95 backdrop-blur-xl rounded-[15px] p-8 md:p-12 flex flex-col lg:flex-row gap-12 items-center">
                            <div className="lg:w-1/2 order-2 lg:order-1">
                                <div className="flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-[0.3em] mb-6">
                                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                                    PRODUKTIONSBEREIT
                                </div>
                                <h4 className="text-3xl md:text-4xl font-black text-on-surface font-headline mb-6 tracking-tight">Corporate Identity Brandbook 2024</h4>
                                <p className="text-secondary text-base leading-relaxed mb-8">Das vollständige Markenhandbuch inklusive aller Farbdefinitionen, Typografie-Regeln und Anwendungsbeispiele für Print und Digital.</p>
                                <div className="flex flex-wrap gap-4">
                                    <button className="px-8 py-4 bg-primary text-on-primary font-bold rounded-md hover:scale-105 transition-transform flex items-center gap-3">
                                        <span className="material-symbols-outlined">verified</span>
                                        Finales Asset Herunterladen
                                    </button>
                                    <button className="px-8 py-4 border border-outline-variant/30 text-on-surface font-bold rounded-md hover:bg-surface-container-low transition-colors">
                                        Vorschau öffnen
                                    </button>
                                </div>
                            </div>
                            <div className="lg:w-1/2 order-1 lg:order-2">
                                <div className="relative group">
                                    <div className="absolute -inset-4 bg-primary/10 rounded-full blur-3xl opacity-50"></div>
                                    <img alt="Final Book" className="relative z-10 w-full h-auto rounded-xl shadow-2xl rotate-2 group-hover:rotate-0 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBG-hoRBPVUWCbvHlRv2BdC81PvfuzTuG8o1eo3LPEGwdzGD3670CXSfTIybw4N4pNLSDKh1IyFozRTzHfjm-9NZIZVh8zFhlotcosISVH8GBl7TUslt8UF6q8BuB9G3DybHPsx6OsMXxr98zshCqG0dxI-FWNIgC8V75MrXmdUrymaOh84Sp2Vn8cUBiOIslk5pv-9x8t9Hvz78xibx6yHXR3ZOx4DWF1Yqqt3IllwQMiCenYmguanx1vm_iGSfOuONLOKX_0BgLE" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};
