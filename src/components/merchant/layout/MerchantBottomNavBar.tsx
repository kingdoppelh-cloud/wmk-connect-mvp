import React from 'react';
import { NavLink, useParams } from 'react-router-dom';

export const MerchantBottomNavBar: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    const linkBaseClass = "flex flex-col items-center gap-1";
    const activeClass = "text-primary";
    const inactiveClass = "text-slate-400";

    return (
        <nav className="lg:hidden fixed bottom-0 left-0 w-full bg-white/95 dark:bg-slate-950/95 backdrop-blur-md flex justify-around items-center py-3 border-t-0 shadow-[0px_-8px_24px_rgba(27,59,90,0.08)] z-50 pb-[env(safe-area-inset-bottom,12px)]">
            <NavLink to={`/merchant/${id}/overview`} className={({ isActive }) => `${linkBaseClass} ${isActive ? activeClass : inactiveClass}`}>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>dashboard</span>
                <span className="text-[10px] font-bold uppercase tracking-tighter">Overview</span>
            </NavLink>
            <NavLink to={`/merchant/${id}/jobs`} className={({ isActive }) => `${linkBaseClass} ${isActive ? activeClass : inactiveClass}`}>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>work</span>
                <span className="text-[10px] font-bold uppercase tracking-tighter">Jobs</span>
            </NavLink>
            <NavLink to={`/merchant/${id}/applicants`} className={({ isActive }) => `${linkBaseClass} ${isActive ? activeClass : inactiveClass}`}>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>group</span>
                <span className="text-[10px] font-bold uppercase tracking-tighter">Applicants</span>
            </NavLink>
            <NavLink to={`/merchant/${id}/analytics`} className={({ isActive }) => `${linkBaseClass} ${isActive ? activeClass : inactiveClass}`}>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>analytics</span>
                <span className="text-[10px] font-bold uppercase tracking-tighter">Insights</span>
            </NavLink>
        </nav>
    );
};
