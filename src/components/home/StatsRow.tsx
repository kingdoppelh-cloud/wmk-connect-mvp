import React from 'react';

export const StatsRow: React.FC = () => {
    return (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-surface-container-low p-8 rounded-xl border-l-4 border-primary">
                <p className="text-4xl font-black text-primary tracking-tighter">1.5k+</p>
                <p className="text-slate-600 font-bold uppercase tracking-wider text-xs mt-2">Partner Unternehmen</p>
            </div>
            <div className="bg-surface-container-low p-8 rounded-xl border-l-4 border-secondary">
                <p className="text-4xl font-black text-secondary tracking-tighter">900+</p>
                <p className="text-slate-600 font-bold uppercase tracking-wider text-xs mt-2">Aktuelle Stellenangebote</p>
            </div>
            <div className="bg-surface-container-low p-8 rounded-xl border-l-4 border-tertiary">
                <p className="text-4xl font-black text-tertiary tracking-tighter">12k+</p>
                <p className="text-slate-600 font-bold uppercase tracking-wider text-xs mt-2">Aktive Nutzer</p>
            </div>
        </section>
    );
};
