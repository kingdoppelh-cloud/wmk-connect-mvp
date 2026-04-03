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
                    <footer className="w-full py-12 mt-20 bg-surface-container-low px-8">
                        <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto">
                            <p className="font-sans text-xs text-on-surface opacity-50">© 2024 Civic Authority Network. All rights reserved.</p>
                            <div className="flex gap-8 mt-4 md:mt-0">
                                <a href="#" className="font-sans text-xs text-on-surface opacity-60 hover:text-secondary hover:opacity-100 transition-all">Privacy Policy</a>
                                <a href="#" className="font-sans text-xs text-on-surface opacity-60 hover:text-secondary hover:opacity-100 transition-all">Terms of Service</a>
                                <a href="#" className="font-sans text-xs text-on-surface opacity-60 hover:text-secondary hover:opacity-100 transition-all">Help Center</a>
                            </div>
                        </div>
                    </footer>
                </main>
            </div>
            <MerchantBottomNavBar />
        </div>
    );
};
