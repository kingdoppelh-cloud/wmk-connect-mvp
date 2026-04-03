import React from 'react';
import { Bell } from 'lucide-react';

export const TopAppBar: React.FC = () => {
    return (
        <header className="fixed top-0 w-full z-50 bg-[#fbf9f8]/80 dark:bg-[#192435]/80 backdrop-blur-md shadow-[0_4px_24px_rgba(0,37,66,0.06)] flex justify-between items-center px-6 py-4">
            <div className="flex items-center gap-3">
                <img src="/logo.png" alt="WMK Connect Logo" className="h-10 md:h-12 w-auto object-contain transition-transform hover:scale-105" />
                <span className="text-2xl font-black text-primary dark:text-white tracking-tighter uppercase hidden sm:block">
                    WMK Connect
                </span>
            </div>
            <div className="flex items-center gap-4">
                <Bell className="text-primary w-6 h-6" />
            </div>
        </header>
    );
};
