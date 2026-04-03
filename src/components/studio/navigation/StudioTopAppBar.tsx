import React from 'react';
import { Link } from 'react-router-dom';

export const StudioTopAppBar: React.FC = () => {
    return (
        <header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md shadow-[0px_12px_32px_rgba(27,59,90,0.06)] h-16 flex justify-between items-center px-6 font-headline tracking-tight">
            <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-slate-600 dark:text-slate-400 cursor-pointer active:scale-95 duration-200">menu</span>
                <div className="flex items-center gap-3">
                    <img src="/logo.png" alt="WMK Connect Logo" className="h-10 w-auto object-contain" />
                    <Link to="/studio" className="text-xl font-bold tracking-tighter text-slate-900 dark:text-slate-50">WMK Studio</Link>
                </div>
            </div>

            {/* Desktop Nav Cluster */}
            <nav className="hidden md:flex items-center gap-8">
                <Link to="/studio/services" className="text-red-700 dark:text-red-500 font-bold hover:opacity-80 transition-opacity">Services</Link>
                <Link to="/studio" className="text-slate-600 dark:text-slate-400 hover:opacity-80 transition-opacity">Projects</Link>
                <Link to="/studio/messages" className="text-slate-600 dark:text-slate-400 hover:opacity-80 transition-opacity">Inbox</Link>
            </nav>

            <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-slate-600 dark:text-slate-400 cursor-pointer active:scale-95 duration-200">account_circle</span>
            </div>
            <div className="absolute bottom-0 left-0 bg-slate-200 h-px w-full md:hidden"></div>
        </header>
    );
};
