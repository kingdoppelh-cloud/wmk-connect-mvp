import React, { useEffect, useState, useCallback } from 'react';
import { Phone, Globe, MessageSquare, TrendingUp, Award } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { supabase } from '../../utils/supabase';

interface MerchantIntelligenceProps {
    companyId: string;
}

interface IntelligenceData {
    weekly_views: { date: string; views: number }[];
    top_jobs: { title: string; views: number }[];
    engagement: { calls: number; web_clicks: number; wa_clicks: number };
}

export const MerchantIntelligence: React.FC<MerchantIntelligenceProps> = ({ companyId }) => {
    const [data, setData] = useState<IntelligenceData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = useCallback(async () => {
        try {
            const { data: intelData, error } = await supabase.rpc('get_merchant_intelligence', {
                target_company_id: companyId
            });
            if (error) throw error;
            setData(intelData);
        } catch (err) {
            console.error('Failed to fetch merchant intelligence:', err);
        } finally {
            setIsLoading(false);
        }
    }, [companyId]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    if (isLoading) {
        return (
            <div className="space-y-4 animate-pulse">
                <div className="h-48 bg-slate-100 rounded-[32px]" />
                <div className="grid grid-cols-2 gap-4">
                    <div className="h-32 bg-slate-100 rounded-[32px]" />
                    <div className="h-32 bg-slate-100 rounded-[32px]" />
                </div>
            </div>
        );
    }

    const { weekly_views, top_jobs, engagement } = data || { weekly_views: [], top_jobs: [], engagement: { calls: 0, web_clicks: 0, wa_clicks: 0 } };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Bento Grid Layer 1: Main Chart */}
            <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-200/60 overflow-hidden relative group">
                <div className="absolute top-0 right-0 p-8">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 transition-transform group-hover:scale-110 duration-500">
                        <TrendingUp size={24} />
                    </div>
                </div>

                <div className="space-y-1 mb-8">
                    <h3 className="text-2xl font-black text-slate-900 uppercase italic">Besucher-Trend</h3>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Aufrufe in den letzten 7 Tagen</p>
                </div>

                <div className="h-[200px] w-full mt-4 -ml-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={weekly_views}>
                            <defs>
                                <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                            <XAxis
                                dataKey="date"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#94A3B8', fontSize: 10, fontWeight: 700 }}
                                dy={10}
                            />
                            <YAxis hide />
                            <Tooltip
                                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                                labelStyle={{ fontWeight: 'bold' }}
                            />
                            <Area
                                type="monotone"
                                dataKey="views"
                                stroke="#3B82F6"
                                strokeWidth={4}
                                fillOpacity={1}
                                fill="url(#viewsGradient)"
                                animationDuration={1500}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Bento Grid Layer 2: Popular Jobs & Engagement */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Popular Jobs */}
                <div className="bg-slate-900 rounded-[32px] p-8 text-white shadow-xl relative overflow-hidden group">
                    <div className="absolute -right-4 -top-4 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-colors duration-700" />

                    <div className="flex items-center gap-3 mb-6">
                        <Award className="text-blue-400" size={20} />
                        <h4 className="font-black uppercase italic tracking-wider">Top Stellen</h4>
                    </div>

                    <div className="space-y-4">
                        {top_jobs && top_jobs.length > 0 ? (
                            top_jobs.map((job, idx) => (
                                <div key={idx} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors cursor-default">
                                    <div className="flex-1 min-w-0 mr-4">
                                        <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-0.5">Rank #{idx + 1}</p>
                                        <p className="font-bold truncate">{job.title}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xl font-black">{job.views}</p>
                                        <p className="text-[8px] font-bold text-slate-500 uppercase">Views</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8 text-slate-500">
                                <p className="text-sm font-bold">Noch keine Job-Daten</p>
                                <p className="text-[10px] uppercase mt-1">Stellenanzeigen posten & Views sammeln</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Engagement Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-[32px] p-6 border border-slate-200/60 shadow-sm flex flex-col items-center justify-center text-center space-y-2 group hover:border-green-200 transition-colors">
                        <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Phone size={20} />
                        </div>
                        <div>
                            <p className="text-2xl font-black text-slate-900">{engagement.calls || 0}</p>
                            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Anrufe</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-[32px] p-6 border border-slate-200/60 shadow-sm flex flex-col items-center justify-center text-center space-y-2 group hover:border-purple-200 transition-colors">
                        <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Globe size={20} />
                        </div>
                        <div>
                            <p className="text-2xl font-black text-slate-900">{engagement.web_clicks || 0}</p>
                            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Webseite</p>
                        </div>
                    </div>

                    <div className="col-span-2 bg-white rounded-[32px] p-6 border border-slate-200/60 shadow-sm flex items-center gap-6 group hover:border-emerald-200 transition-colors">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:rotate-12 transition-transform">
                            <MessageSquare size={24} />
                        </div>
                        <div>
                            <p className="text-2xl font-black text-slate-900">{engagement.wa_clicks || 0}</p>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">WhatsApp Anfragen</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
