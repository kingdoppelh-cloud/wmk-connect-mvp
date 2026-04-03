import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '../../../utils/cn';

export const StudioNavigationDrawer: React.FC = () => {
    return (
        <aside className="hidden lg:flex flex-col h-[calc(100vh-64px)] sticky top-16 bg-slate-50 dark:bg-slate-950 w-72 border-r-0 transition-all duration-200">
            <div className="p-6">
                <h2 className="text-lg font-black text-slate-900 dark:text-slate-100 font-headline">Client Portal</h2>
                <p className="text-xs text-slate-500 font-medium tracking-wide">B2B Services</p>
            </div>
            <nav className="flex-1 px-4 space-y-1">
                <NavLink to="/studio" end className={({ isActive }) => cn(
                    "flex items-center gap-3 px-4 py-3 transition-all font-medium rounded-lg",
                    isActive ? "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-l-4 border-red-600 rounded-l-none" : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900"
                )}>
                    <span className="material-symbols-outlined">folder_shared</span>
                    <span>Projects</span>
                </NavLink>

                <NavLink to="/studio/messages" className={({ isActive }) => cn(
                    "flex items-center gap-3 px-4 py-3 transition-all font-medium rounded-lg",
                    isActive ? "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-l-4 border-red-600 rounded-l-none" : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900"
                )}>
                    <span className="material-symbols-outlined">forum</span>
                    <span>Messages</span>
                </NavLink>

                <NavLink to="/studio/assets" className={({ isActive }) => cn(
                    "flex items-center gap-3 px-4 py-3 transition-all font-medium rounded-lg",
                    isActive ? "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-l-4 border-red-600 rounded-l-none" : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900"
                )}>
                    <span className="material-symbols-outlined">inventory_2</span>
                    <span>Assets</span>
                </NavLink>

                <NavLink to="/studio/invoices" className={({ isActive }) => cn(
                    "flex items-center gap-3 px-4 py-3 transition-all font-medium rounded-lg",
                    isActive ? "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-l-4 border-red-600 rounded-l-none" : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900"
                )}>
                    <span className="material-symbols-outlined">receipt_long</span>
                    <span>Invoices</span>
                </NavLink>

                <NavLink to="/studio/settings" className={({ isActive }) => cn(
                    "flex items-center gap-3 px-4 py-3 transition-all font-medium rounded-lg",
                    isActive ? "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-l-4 border-red-600 rounded-l-none" : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900"
                )}>
                    <span className="material-symbols-outlined">settings</span>
                    <span>Settings</span>
                </NavLink>
            </nav>
            <div className="p-6 mt-auto">
                <div className="bg-surface-container-low p-4 rounded-xl">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-secondary mb-1">Status</p>
                    <p className="text-sm font-bold text-on-surface">Phase: Deliverables</p>
                </div>
            </div>
        </aside>
    );
};
