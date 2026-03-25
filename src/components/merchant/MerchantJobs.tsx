import React from 'react';
import { Briefcase, MapPin, Euro, Trash2 } from 'lucide-react';
import { cn } from '../Layout';
import { type Job } from '../../types';

interface MerchantJobsProps {
    jobs: Job[];
    onDeleteJob: (id: string) => void;
    onAddJob: () => void;
}

export const MerchantJobs: React.FC<MerchantJobsProps> = ({ jobs, onDeleteJob, onAddJob }) => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center px-4">
                <h3 className="text-xl font-black text-slate-900 uppercase italic">Deine Stellenanzeigen</h3>
                <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                    {jobs.length} Aktiv
                </span>
            </div>

            <div className="space-y-4">
                {jobs.length > 0 ? (
                    jobs.map((job) => (
                        <div key={job.id} className={cn(
                            "bg-white rounded-3xl p-6 shadow-sm border transition-all hover:shadow-md relative overflow-hidden group",
                            job.is_featured ? "border-premium/30" : "border-slate-200/60"
                        )}>
                            {job.is_featured && (
                                <div className="absolute top-0 right-0 bg-premium text-slate-950 px-4 py-1 rounded-bl-2xl text-[9px] font-black uppercase tracking-widest">
                                    Premium Boost
                                </div>
                            )}

                            <div className="flex justify-between items-start mb-4">
                                <div className="space-y-1">
                                    <h4 className="text-xl font-black text-slate-900 leading-tight">{job.title}</h4>
                                    <div className="flex items-center gap-3 text-slate-400">
                                        <div className="flex items-center gap-1">
                                            <MapPin size={12} />
                                            <span className="text-[10px] font-bold uppercase tracking-widest">{job.company?.name}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Euro size={12} />
                                            <span className="text-[10px] font-bold uppercase tracking-widest">{job.salary_range}</span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => onDeleteJob(job.id)}
                                    className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all h-fit"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>

                            <p className="text-sm text-slate-500 font-medium mb-5 line-clamp-2">{job.description}</p>

                            <div className="flex items-center gap-2 pt-4 border-t border-slate-50">
                                <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-lg text-[9px] font-black uppercase tracking-widest">
                                    {job.job_type}
                                </span>
                                <span className="px-3 py-1 bg-green-50 text-green-600 rounded-lg text-[9px] font-black uppercase tracking-widest">
                                    Aktiv
                                </span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="bg-white rounded-[32px] p-12 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center space-y-4">
                        <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-300">
                            <Briefcase size={32} />
                        </div>
                        <div className="space-y-1">
                            <p className="font-black text-slate-900 uppercase italic">Keine aktiven Jobs</p>
                            <p className="text-xs text-slate-400 font-medium">Posten Sie Ihre erste Stelle, um Bewerber zu finden.</p>
                        </div>
                        <button
                            onClick={onAddJob}
                            className="bg-accent text-white px-6 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg shadow-accent/20 transition-all hover:scale-105 active:scale-95"
                        >
                            Jetzt Job erstellen
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
