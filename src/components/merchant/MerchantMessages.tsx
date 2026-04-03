import React from 'react';

export const MerchantMessages: React.FC = () => {
    return (
        <div className="pt-8 pb-12 px-6 lg:px-12 max-w-7xl mx-auto w-full min-h-[calc(100vh-80px)] flex flex-col">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary mb-3 block">Kommunikation</span>
                    <h2 className="text-4xl md:text-6xl font-headline font-bold tracking-[-0.02em] text-primary leading-tight">Postfach</h2>
                </div>
                {/* Search/Filter */}
                <div className="flex items-center bg-surface-container-low p-1.5 rounded-2xl shadow-sm w-full md:w-auto">
                    <button className="flex-1 md:flex-none px-6 py-2.5 text-sm font-bold rounded-xl bg-white shadow-sm text-primary transition-all">Alles</button>
                    <button className="flex-1 md:flex-none px-6 py-2.5 text-sm font-semibold rounded-xl text-slate-500 hover:text-slate-900 transition-colors relative">
                        Ungelesen
                        <span className="absolute top-2 right-2 w-2 h-2 bg-secondary rounded-full hidden"></span>
                    </button>
                    <button className="flex-1 md:flex-none px-6 py-2.5 text-sm font-semibold rounded-xl text-slate-500 hover:text-slate-900 transition-colors">Archiv</button>
                </div>
            </div>

            {/* Empty State */}
            <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto text-center py-20 border border-slate-100 rounded-3xl bg-white shadow-sm">
                <div className="relative mb-10">
                    {/* Background decorative circles */}
                    <div className="absolute inset-0 bg-secondary/5 rounded-full blur-2xl transform scale-150"></div>
                    <div className="absolute inset-0 bg-primary/5 rounded-full blur-xl transform scale-110 translate-y-4"></div>

                    <div className="w-32 h-32 bg-surface-container-low rounded-[2rem] flex items-center justify-center shadow-lg relative z-10 rotate-3 transition-transform hover:rotate-0 duration-500 cursor-default">
                        <span className="material-symbols-outlined text-6xl text-secondary opacity-90" style={{ fontVariationSettings: "'FILL' 1" }}>
                            mark_email_unread
                        </span>
                        {/* Notification badge mock */}
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-surface-container-lowest rounded-full flex items-center justify-center shadow-sm">
                            <div className="w-4 h-4 bg-slate-200 rounded-full"></div>
                        </div>
                    </div>
                </div>

                <h3 className="text-3xl font-headline font-bold text-primary tracking-tight mb-4">Noch keine Nachrichten vorhanden</h3>
                <p className="text-on-surface opacity-60 text-lg leading-relaxed mb-10 px-4">
                    Dein Posteingang ist momentan noch leer. Sobald Talente auf deine Stellenanzeigen reagieren oder dir direkte Nachrichten senden, erscheinen sie hier.
                </p>

                <button className="px-8 py-4 bg-surface-container-low text-primary font-bold rounded-xl hover:bg-surface-container-high transition-colors shadow-sm active:scale-95">
                    Einstellungen prüfen
                </button>
            </div>
        </div>
    );
};
