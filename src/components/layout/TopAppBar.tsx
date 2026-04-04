import React from 'react';
import { Bell } from 'lucide-react';

export const TopAppBar: React.FC = () => {
    return (
        <header className="fixed top-0 w-full z-50 bg-[#fbf9f8]/85 dark:bg-[#192435]/85 backdrop-blur-md shadow-[0_2px_12px_rgba(0,37,66,0.08)] flex justify-between items-center px-4 md:px-6 py-3 md:py-4">
            <div className="flex items-center gap-2">

                <span className="text-xl md:text-2xl font-black text-primary dark:text-white tracking-tighter uppercase hidden md:block">
                    WMK Connect
                </span>
            </div>
            <div className="flex items-center gap-3">
                <button aria-label="Benachrichtigungen" className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors active:scale-95">
                    <Bell className="text-primary dark:text-white w-5 h-5 md:w-6 md:h-6" />
                </button>
            </div>
        </header>
    );
};
