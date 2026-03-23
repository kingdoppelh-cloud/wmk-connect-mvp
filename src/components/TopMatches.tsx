import React, { useState, useEffect } from 'react';
import { Sparkles, Briefcase, ChevronRight, Target } from 'lucide-react';
import { supabase } from '../utils/supabase';
import { useAuth } from '../context/AuthContext';

interface Match {
    id: string;
    company_id: string;
    title: string;
    description: string;
    salary_range: string;
    job_type: string;
    similarity: number;
}

interface Props {
    onCompanyClick?: (id: string) => void;
}

export const TopMatches: React.FC<Props> = ({ onCompanyClick }) => {
    const { user } = useAuth();
    const [matches, setMatches] = useState<Match[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchMatches = async () => {
            if (!user) return;
            setIsLoading(true);
            try {
                const { data, error } = await supabase.rpc('match_jobs_to_profile', {
                    target_user_id: user.id,
                    match_threshold: 0.2,
                    match_count: 3
                });

                if (error) throw error;
                if (data) setMatches(data);
            } catch (err) {
                console.error('Error fetching matches:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMatches();
    }, [user]);

    if (!user || (!isLoading && matches.length === 0)) return null;

    return (
        <section className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-black text-white rounded-xl flex items-center justify-center shadow-lg">
                        <Sparkles size={16} className="text-premium" />
                    </div>
                    <div>
                        <h2 className="text-lg font-black text-slate-900 tracking-tight">Top Matches für dich</h2>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">KI-basierte Vorschläge</p>
                    </div>
                </div>
            </div>

            <div className="grid gap-3">
                {isLoading ? (
                    [1, 2].map(i => (
                        <div key={i} className="h-24 bg-slate-100 rounded-3xl animate-pulse" />
                    ))
                ) : (
                    matches.map((job) => (
                        <button
                            key={job.id}
                            onClick={() => onCompanyClick?.(job.company_id)}
                            className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all group text-left relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-4">
                                <div className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-black tracking-tighter flex items-center gap-1 border border-emerald-100">
                                    <Target size={10} />
                                    {Math.round(job.similarity * 100)}% Match
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-accent/10 group-hover:text-accent transition-colors shrink-0">
                                    <Briefcase size={24} />
                                </div>
                                <div className="flex-1 min-w-0 pr-16">
                                    <h3 className="font-black text-slate-900 truncate tracking-tight">{job.title}</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{job.job_type}</span>
                                        {job.salary_range && (
                                            <>
                                                <span className="w-1 h-1 bg-slate-200 rounded-full" />
                                                <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">{job.salary_range}</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="self-center">
                                    <ChevronRight size={20} className="text-slate-300 group-hover:text-accent group-hover:translate-x-1 transition-all" />
                                </div>
                            </div>
                        </button>
                    ))
                )}
            </div>
        </section>
    );
};
