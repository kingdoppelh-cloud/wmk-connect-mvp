import React from 'react';
import { Menu, Bell } from 'lucide-react';

export const TopAppBar: React.FC = () => {
    return (
        <header className="fixed top-0 w-full z-50 bg-[#fbf9f8]/80 dark:bg-[#192435]/80 backdrop-blur-md shadow-[0_40px_60px_-15px_rgba(0,37,66,0.04)] flex justify-between items-center px-6 py-4">
            <div className="flex items-center gap-3">
                <Menu className="text-primary w-6 h-6" />
                <span className="text-2xl font-black text-primary dark:text-white tracking-tighter uppercase">
                    WMK Connect
                </span>
            </div>
            <div className="flex items-center gap-4">
                <Bell className="text-primary w-6 h-6" />
            </div>
        </header>
    );
};
