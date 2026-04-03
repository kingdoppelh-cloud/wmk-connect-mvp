import React from 'react';
import { NavLink, useParams } from 'react-router-dom';

export const MerchantBottomNavBar: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    const linkBaseClass = "flex flex-col items-center gap-1.5 transition-all duration-300";
    const activeClass = "text-secondary scale-110";
    const inactiveClass = "text-on-surface opacity-40 hover:opacity-100";

    return (
        <nav className="lg:hidden fixed bottom-0 left-0 w-full glass no-line flex justify-around items-center py-4 z-50 pb-[calc(1rem+env(safe-area-inset-bottom,12px))]">
            <NavLink to={`/merchant/${id}/overview`} className={({ isActive }) => `${linkBaseClass} ${isActive ? activeClass : inactiveClass}`}>
                {({ isActive }) => (
                    <>
                        <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>dashboard</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest">Overview</span>
                    </>
                )}
            </NavLink>
            <NavLink to={`/merchant/${id}/jobs`} className={({ isActive }) => `${linkBaseClass} ${isActive ? activeClass : inactiveClass}`}>
                {({ isActive }) => (
                    <>
                        <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>work</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest">Jobs</span>
                    </>
                )}
            </NavLink>
            <NavLink to={`/merchant/${id}/applicants`} className={({ isActive }) => `${linkBaseClass} ${isActive ? activeClass : inactiveClass}`}>
                {({ isActive }) => (
                    <>
                        <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>group</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest">Applicants</span>
                    </>
                )}
            </NavLink>
            <NavLink to={`/merchant/${id}/analytics`} className={({ isActive }) => `${linkBaseClass} ${isActive ? activeClass : inactiveClass}`}>
                {({ isActive }) => (
                    <>
                        <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>analytics</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest">Insights</span>
                    </>
                )}
            </NavLink>
        </nav>
    );
};
