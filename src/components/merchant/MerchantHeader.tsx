import React from 'react';
import { X, Plus } from 'lucide-react';
import type { Company } from '../../data/companies';

interface ChecklistItem {
    id: string;
    tab: 'dashboard' | 'jobs' | 'profile' | 'news' | 'marketing';
    label: string;
}

interface MerchantHeaderProps {
    company: Company;
    activeTab: string;
    onClose: () => void;
    setActiveTab: (tab: 'dashboard' | 'jobs' | 'profile' | 'news' | 'marketing') => void;
    profileProgress: number;
    checklist: ChecklistItem[];
}

export const MerchantHeader: React.FC<MerchantHeaderProps> = ({
    company,
    activeTab,
    onClose,
    setActiveTab,
    profileProgress,
    checklist
}) => {
    return (
        <div className="space-y-6">
            {/* TopAppBar */}
            <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100 shadow-sm">
                <div className="flex justify-between items-center w-full px-6 py-4 max-w-2xl mx-auto">
                    <span className="text-xl font-extrabold tracking-tight text-slate-900 truncate pr-4">
                        {activeTab === 'profile' ? 'Profil verwalten' : company.name}
                    </span>
                    <div className="flex items-center gap-4 shrink-0">
                        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors relative" onClick={onClose}>
                            <X size={24} />
                        </button>
                    </div>
                </div>
            </nav>

            {activeTab === 'dashboard' && (
                <div className="max-w-2xl mx-auto px-6 space-y-6">
                    <header className="space-y-1 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <p className="text-slate-500 text-xs font-bold tracking-widest uppercase">Willkommen zurück</p>
                        <h1 className="text-3xl font-black tracking-tight text-slate-900">Hallo, {company.name.split(' ')[0]}!</h1>
                    </header>

                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-75">
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/60">
                            <div className="flex justify-between items-end mb-4">
                                <div className="space-y-1">
                                    <h3 className="font-bold text-slate-900 text-lg">Profil vervollständigen</h3>
                                    <p className="text-xs text-slate-500 font-medium">Erhöhen Sie Ihre Sichtbarkeit für Bewerber.</p>
                                </div>
                                <span className="text-accent font-black text-xl">{profileProgress}%</span>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                                <div
                                    className="bg-gradient-to-r from-accent to-pink-500 h-full rounded-full transition-all duration-1000"
                                    style={{ width: `${profileProgress}%` }}
                                ></div>
                            </div>

                            {checklist.length > 0 && (
                                <div className="mt-6 pt-6 border-t border-slate-100 space-y-3">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Nächste Schritte</p>
                                    <div className="space-y-2">
                                        {checklist.map((item) => (
                                            <button
                                                key={item.id}
                                                onClick={() => setActiveTab(item.tab)}
                                                className="w-full flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 hover:border-accent/30 hover:bg-white transition-all group"
                                            >
                                                <span className="text-xs font-bold text-slate-700">{item.label}</span>
                                                <Plus size={14} className="text-slate-300 group-hover:text-accent transition-colors" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
