import React from 'react';
import { Outlet } from 'react-router-dom';
import { MerchantTopAppBar } from './MerchantTopAppBar';
import { MerchantNavigationDrawer } from './MerchantNavigationDrawer';
import { MerchantBottomNavBar } from './MerchantBottomNavBar';

export const MerchantLayout: React.FC = () => {
    return (
        <div className="merchant-theme antialiased bg-surface text-on-surface min-h-screen flex flex-col font-body">
            <MerchantTopAppBar />
            <div className="flex flex-1 pt-20">
                <MerchantNavigationDrawer />
                <main className="flex-1 lg:ml-64 pb-24 lg:pb-12 bg-surface min-h-screen">
                    <Outlet />
                    {/* Shared Footer for all Merchant routes could go here */}
                    <footer className="w-full py-8 mt-12 border-t border-slate-200/15 dark:border-slate-800/15 bg-transparent">
                        <div className="flex flex-col md:flex-row justify-between items-center px-8 max-w-7xl mx-auto">
                            <p className="font-public-sans text-xs text-slate-400 dark:text-slate-500">© 2024 Civic Authority Network. All rights reserved.</p>
                            <div className="flex gap-6 mt-4 md:mt-0">
                                <a href="#" className="font-public-sans text-xs text-slate-400 dark:text-slate-500 hover:text-red-600 dark:hover:text-red-500 transition-colors opacity-80 hover:opacity-100">Privacy Policy</a>
                                <a href="#" className="font-public-sans text-xs text-slate-400 dark:text-slate-500 hover:text-red-600 dark:hover:text-red-500 transition-colors opacity-80 hover:opacity-100">Terms of Service</a>
                                <a href="#" className="font-public-sans text-xs text-slate-400 dark:text-slate-500 hover:text-red-600 dark:hover:text-red-500 transition-colors opacity-80 hover:opacity-100">Help Center</a>
                            </div>
                        </div>
                    </footer>
                </main>
            </div>
            <MerchantBottomNavBar />
        </div>
    );
};
