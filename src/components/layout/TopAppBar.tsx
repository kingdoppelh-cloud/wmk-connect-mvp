import React from 'react';
import { Bell } from 'lucide-react';

export const TopAppBar: React.FC = () => {
    return (
        <header className="fixed top-0 w-full z-50 bg-surface/85 backdrop-blur-md shadow-[0_2px_12px_rgba(0,0,0,0.05)] flex items-center h-20 px-4 md:px-6">
            {/* Left Area */}
            <div className="flex-1 flex items-center">
                <span className="text-xl font-black text-primary dark:text-white tracking-tighter uppercase mr-4">
                    WMK Connect
                </span>
            </div>

            {/* Right Actions Area */}
            <div className="flex items-center gap-3">
                <button aria-label="Benachrichtigungen" className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors active:scale-95">
                    <Bell className="text-primary dark:text-white w-5 h-5 md:w-6 md:h-6" />
                </button>
            </div>
        </header>
    );
};
