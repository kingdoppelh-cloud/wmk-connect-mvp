import React from 'react';

export const MerchantTopAppBar: React.FC = () => {
    return (
        <header className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl fixed top-0 w-full z-50 shadow-[0px_12px_32px_rgba(27,59,90,0.06)] flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center overflow-hidden">
                    {/* Placeholder for Merchant Logo */}
                    <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDafyvawA5jPTVJpgi5kxd5BuDRHEzeNP9rS2cFmpUe1j4say3C5YeQBVkDwh9qYgEHGmlpIbQ_Lvo5cWQQJVcHVN7KQLhAawxxxEeX-CLNheL76A_8533uQ5LqO6BioK3XmkZFlPJ5vo506UgrF9lmiqxPScwRPOXcOougayNIge2fjM7uTjmclCw3aQ-R7DfQoYC0nBtOOm64TWqJAwIOrDE2B9EzB5K6ZamOhvQkLslSx_mAzemqq4gTJkzpaSNUplngLH8eD5o"
                        alt="Merchant Logo"
                    />
                </div>
                <span className="text-xl font-bold text-slate-900 dark:text-slate-50 font-headline tracking-tight">Civic Network Admin</span>
            </div>
            <div className="flex items-center gap-4">
                <button className="text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors active:scale-95 duration-200">
                    <span className="material-symbols-outlined">notifications</span>
                </button>
                <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800 mx-2"></div>
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
