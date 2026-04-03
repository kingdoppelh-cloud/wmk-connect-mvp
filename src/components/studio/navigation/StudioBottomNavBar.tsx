import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '../../../utils/cn';

export const StudioBottomNavBar: React.FC = () => {
    return (
        <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center h-20 px-4 pb-safe bg-white dark:bg-slate-950 shadow-[0px_-4px_16px_rgba(27,59,90,0.04)] z-50 border-t border-slate-200/15 dark:border-slate-800/15">
            <NavLink to="/studio/services" className={({ isActive }) => cn(
                "flex flex-col items-center justify-center transition-all duration-300 active:translate-y-0.5",
                isActive ? "text-red-700 dark:text-red-500 bg-red-50/50 dark:bg-red-950/30 rounded-xl px-3 py-1" : "text-slate-500 dark:text-slate-400"
            )}>
                <span className="material-symbols-outlined">grid_view</span>
                <span className="font-label text-[10px] uppercase tracking-widest font-semibold mt-1">Services</span>
            </NavLink>

            <NavLink to="/studio" end className={({ isActive }) => cn(
                "flex flex-col items-center justify-center transition-all duration-300 active:translate-y-0.5",
                isActive ? "text-red-700 dark:text-red-500 bg-red-50/50 dark:bg-red-950/30 rounded-xl px-3 py-1" : "text-slate-500 dark:text-slate-400"
            )}>
                <span className="material-symbols-outlined">layers</span>
                <span className="font-label text-[10px] uppercase tracking-widest font-semibold mt-1">Projects</span>
            </NavLink>

            <NavLink to="/studio/messages" className={({ isActive }) => cn(
                "flex flex-col items-center justify-center transition-all duration-300 active:translate-y-0.5",
                isActive ? "text-red-700 dark:text-red-500 bg-red-50/50 dark:bg-red-950/30 rounded-xl px-3 py-1" : "text-slate-500 dark:text-slate-400"
            )}>
                <span className="material-symbols-outlined">chat_bubble</span>
                <span className="font-label text-[10px] uppercase tracking-widest font-semibold mt-1">Inbox</span>
            </NavLink>

            <NavLink to="/studio/assets" className={({ isActive }) => cn(
                "flex flex-col items-center justify-center transition-all duration-300 active:translate-y-0.5",
                isActive ? "text-red-700 dark:text-red-500 bg-red-50/50 dark:bg-red-950/30 rounded-xl px-3 py-1" : "text-slate-500 dark:text-slate-400"
            )}>
                <span className="material-symbols-outlined filled-icon">inventory_2</span>
                <span className="font-label text-[10px] uppercase tracking-widest font-semibold mt-1">Assets</span>
            </NavLink>
        </nav>
    );
};
