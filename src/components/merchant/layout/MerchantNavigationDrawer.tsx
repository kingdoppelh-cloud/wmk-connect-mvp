import React from 'react';
import { NavLink, useParams } from 'react-router-dom';

export const MerchantNavigationDrawer: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    const linkBaseClass = "flex items-center gap-4 px-5 py-3.5 font-sans font-medium text-sm transition-all duration-300 ease-in-out group rounded-xl mx-2";
    const activeClass = "text-primary bg-surface-container-lowest shadow-sm";
    const inactiveClass = "text-on-surface opacity-60 hover:opacity-100 hover:bg-surface-container-high";

    return (
        <aside className="hidden lg:flex flex-col h-screen fixed left-0 top-0 pt-20 w-64 no-line bg-surface-container-low z-40">
            <div className="px-6 py-10">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface opacity-40 mb-6 px-2">Management Hub</p>
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
                    <NavLink to={`/merchant/${id}/talent`} className={({ isActive }) => `${linkBaseClass} ${isActive ? activeClass : inactiveClass}`}>
                        <span className="material-symbols-outlined">person_search</span>
                        <span>Talent Pool</span>
                    </NavLink>
                    <NavLink to={`/merchant/${id}/reports`} className={({ isActive }) => `${linkBaseClass} ${isActive ? activeClass : inactiveClass}`}>
                        <span className="material-symbols-outlined">analytics</span>
                        <span>Reports</span>
                    </NavLink>
                    <NavLink to={`/merchant/${id}/messages`} className={({ isActive }) => `${linkBaseClass} ${isActive ? activeClass : inactiveClass}`}>
                        <span className="material-symbols-outlined">mail</span>
                        <span>Postfach</span>
                    </NavLink>
                    <NavLink to={`/merchant/${id}/services`} className={({ isActive }) => `${linkBaseClass} ${isActive ? activeClass : inactiveClass}`}>
                        <span className="material-symbols-outlined">auto_awesome</span>
                        <span>Services</span>
                    </NavLink>
                    <NavLink to={`/merchant/${id}/invoices`} className={({ isActive }) => `${linkBaseClass} ${isActive ? activeClass : inactiveClass}`}>
                        <span className="material-symbols-outlined">receipt_long</span>
                        <span>Billing</span>
                    </NavLink>
                </nav>
            </div>
            <div className="mt-auto px-6 py-10">
                <div className="p-5 rounded-2xl bg-surface-container-lowest no-line">
                    <p className="text-[10px] font-bold text-primary opacity-50 uppercase tracking-widest mb-2">PRO PLAN ACTIVE</p>
                    <p className="text-xs font-medium text-secondary mb-4 leading-relaxed">Your hiring window is active for 24 more days.</p>
                    <div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-2/3 transition-all duration-1000 ease-out"></div>
                    </div>
                </div>
            </div>
        </aside>
    );
};
