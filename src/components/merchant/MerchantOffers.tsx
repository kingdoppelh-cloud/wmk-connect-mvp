import React from 'react';
import { Tag, Edit2 } from 'lucide-react';
import type { Company } from '../../data/companies';

interface MerchantOffersProps {
    company: Company;
    onEditOffer: () => void;
}

export const MerchantOffers: React.FC<MerchantOffersProps> = ({ company, onEditOffer }) => {
    return (
        <div className="space-y-6">
            <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-200/60 transition-all hover:shadow-md">
                <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
                            <Tag size={24} />
                        </div>
                        <div className="text-left">
                            <h3 className="text-xl font-black text-slate-900 leading-tight uppercase italic">Aktuelles Angebot</h3>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Wird in der App prominent angezeigt</p>
                        </div>
                    </div>
                    <button
                        onClick={onEditOffer}
                        className="p-3 bg-slate-50 text-slate-400 hover:text-accent hover:bg-accent/5 rounded-2xl transition-all shadow-sm"
                    >
                        <Edit2 size={18} />
                    </button>
                </div>

                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex items-center justify-between group cursor-pointer hover:bg-white transition-all" onClick={onEditOffer}>
                    <p className="text-lg font-bold text-slate-700 italic">
                        "{company.offer || 'Kein aktuelles Angebot hinterlegt'}"
                    </p>
                </div>
            </div>
        </div>
    );
};
