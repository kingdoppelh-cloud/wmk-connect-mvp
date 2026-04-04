import React from 'react';

export const StatsRow: React.FC = () => {
    return (
        <section className="grid grid-cols-3 gap-3 md:gap-6">
            <div className="bg-surface-container-low dark:bg-slate-800 p-4 md:p-8 rounded-xl border-l-4 border-primary dark:border-blue-400">
                <p className="text-2xl md:text-4xl font-black text-primary dark:text-white tracking-tighter">1.5k+</p>
                <p className="text-slate-600 dark:text-slate-400 font-bold uppercase tracking-wider text-[9px] md:text-xs mt-1 md:mt-2">Partner Firmen</p>
            </div>
            <div className="bg-surface-container-low dark:bg-slate-800 p-4 md:p-8 rounded-xl border-l-4 border-secondary dark:border-red-400">
                <p className="text-2xl md:text-4xl font-black text-secondary dark:text-red-400 tracking-tighter">900+</p>
                <p className="text-slate-600 dark:text-slate-400 font-bold uppercase tracking-wider text-[9px] md:text-xs mt-1 md:mt-2">Aktive Jobs</p>
            </div>
            <div className="bg-surface-container-low dark:bg-slate-800 p-4 md:p-8 rounded-xl border-l-4 border-tertiary dark:border-blue-300">
                <p className="text-2xl md:text-4xl font-black text-tertiary dark:text-blue-300 tracking-tighter">12k+</p>
                <p className="text-slate-600 dark:text-slate-400 font-bold uppercase tracking-wider text-[9px] md:text-xs mt-1 md:mt-2">Nutzer</p>
            </div>
        </section>
    );
};
