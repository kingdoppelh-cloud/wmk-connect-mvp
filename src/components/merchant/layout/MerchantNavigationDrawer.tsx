import React from 'react';
import { NavLink, useParams } from 'react-router-dom';

export const MerchantNavigationDrawer: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    const linkBaseClass = "flex items-center gap-3 px-4 py-3 font-headline font-medium text-sm transition-all duration-300 ease-in-out group rounded-md lg:rounded-none";
    const activeClass = "text-red-700 dark:text-red-500 border-l-4 lg:border-l-0 lg:border-r-4 border-red-700 dark:border-red-500 bg-slate-100 dark:bg-slate-900";
    const inactiveClass = "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-slate-100";

    return (
        <aside className="hidden lg:flex flex-col h-screen fixed left-0 top-0 pt-20 w-64 border-r border-slate-200/15 dark:border-slate-800/15 bg-slate-50 dark:bg-slate-950 z-40">
            <div className="px-6 py-8">
                <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-4">Management</p>
                <nav className="space-y-1">
                    <NavLink to={`/merchant/${id}/overview`} className={({ isActive }) => `${linkBaseClass} ${isActive ? activeClass : inactiveClass}`}>
                        <span className="material-symbols-outlined">dashboard</span>
                        <span>Overview</span>
                    </NavLink>
                    <NavLink to={`/merchant/${id}/jobs`} className={({ isActive }) => `${linkBaseClass} ${isActive ? activeClass : inactiveClass}`}>
                        <span className="material-symbols-outlined">work</span>
                        <span>Job Listings</span>
                    </NavLink>
                    <NavLink to={`/merchant/${id}/applicants`} className={({ isActive }) => `${linkBaseClass} ${isActive ? activeClass : inactiveClass}`}>
                        <span className="material-symbols-outlined">group</span>
                        <span>Applicants</span>
                    </NavLink>
                    <NavLink to={`/merchant/${id}/analytics`} className={({ isActive }) => `${linkBaseClass} ${isActive ? activeClass : inactiveClass}`}>
                        <span className="material-symbols-outlined">analytics</span>
                        <span>Analytics</span>
                    </NavLink>
                </nav>
            </div>
            <div className="mt-auto px-6 py-6 border-t border-slate-200/15 dark:border-slate-800/15">
                <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/15">
                    <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1">PRO PLAN</p>
                    <p className="text-[11px] text-secondary mb-3">Your hiring window is active for 24 more days.</p>
                    <div className="h-1 w-full bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-2/3"></div>
                    </div>
                </div>
            </div>
        </aside>
    );
};
