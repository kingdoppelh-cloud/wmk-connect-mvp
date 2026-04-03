import React from 'react';

export const MerchantTopAppBar: React.FC = () => {
    return (
        <header className="glass fixed top-0 w-full z-50 no-line flex items-center justify-between px-8 py-5">
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-4">
                    <img src="/logo.png" alt="WMK Connect Logo" className="h-12 w-auto object-contain transition-transform hover:scale-105 duration-300" />
                    <div className="h-8 w-px bg-on-surface opacity-10 hidden md:block"></div>
                    <span className="text-xl font-headline font-bold text-primary tracking-tight hidden sm:block">Merchant Hub</span>
                </div>
            </div>
            <div className="flex items-center gap-6">
                <button className="text-on-surface opacity-60 hover:opacity-100 hover:text-secondary transition-all active:scale-95 duration-200">
                    <span className="material-symbols-outlined text-2xl">notifications</span>
                </button>
                <div className="h-10 w-px bg-on-surface opacity-5 mx-1"></div>
                <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                        <p className="text-xs font-bold text-on-surface">Admin User</p>
                        <p className="text-[10px] text-slate-500">Municipality Lead</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-primary-container text-white flex items-center justify-center text-xs font-bold">AU</div>
                </div>
            </div>
        </header>
    );
};
