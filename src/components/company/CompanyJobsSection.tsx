import React from 'react';
import { Briefcase, ArrowRight } from 'lucide-react';
import { type Company } from '../../data/companies';
import { type AnalyticsEventType } from '../../types';

interface CompanyJobsSectionProps {
    company: Company;
    trackEvent: (companyId: string, eventType: AnalyticsEventType, metadata?: any) => void;
}

export const CompanyJobsSection: React.FC<CompanyJobsSectionProps> = ({ company, trackEvent }) => {
    if (!company.isPremium) return null;

    return (
        <div
            onClick={() => {
                trackEvent(company.id, 'profile_view');
                window.dispatchEvent(new CustomEvent('open-swipe-jobs', { detail: company.id }));
            }}
            className="bg-slate-900 rounded-[40px] p-8 shadow-2xl relative overflow-hidden mb-10 group cursor-pointer hover:shadow-accent/20 transition-all border border-slate-800 text-left"
        >
            <div className="relative z-10 flex items-center justify-between">
                <div>
                    <div className="bg-white/10 w-fit p-3 rounded-2xl backdrop-blur-md mb-4 border border-white/10 text-white">
                        <Briefcase size={24} />
                    </div>
                    <h3 className="font-black text-white text-2xl mb-1">Wir stellen ein!</h3>
                    <p className="text-slate-300 font-medium text-sm">Finde deinen Traumjob und bewirb dich mit einem Swipe.</p>
                </div>
                <div className="w-16 h-16 rounded-full bg-accent text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform shrink-0 ml-4">
                    <ArrowRight size={28} />
                </div>
            </div>
            <div className="absolute -right-12 -top-12 w-48 h-48 bg-accent/30 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
        </div>
    );
};
