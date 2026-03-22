import React from 'react';
import { Eye, MessageSquare, Heart, CornerUpRight, Clock } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '../Layout';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import type { AnalyticsEvent } from '../../types';

interface MerchantStatsProps {
    stats: {
        views: number;
        whatsapp: number;
        favorites: number;
        referrals: number;
        trendData: any[];
    };
    activityLog: AnalyticsEvent[];
}

export const MerchantStats: React.FC<MerchantStatsProps> = ({ stats, activityLog }) => {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
                {[
                    { label: 'Profil-Besuche', value: stats.views, icon: Eye, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'Anfragen (WA)', value: stats.whatsapp, icon: MessageSquare, color: 'text-green-600', bg: 'bg-green-50' },
                    { label: 'In Favoriten', value: stats.favorites, icon: Heart, color: 'text-pink-600', bg: 'bg-pink-50' },
                    { label: 'Weitergeleitet', value: stats.referrals, icon: CornerUpRight, color: 'text-amber-600', bg: 'bg-amber-50' }
                ].map((stat, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm flex flex-col items-center text-center space-y-3">
                        <div className={cn("p-4 rounded-2xl", stat.bg, stat.color)}>
                            <stat.icon size={24} />
                        </div>
                        <div className="space-y-1">
                            <p className="text-2xl font-black text-slate-900">{stat.value}</p>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Trend Chart */}
            <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-200/60">
                <div className="flex justify-between items-start mb-8">
                    <div className="space-y-1">
                        <h3 className="text-xl font-black text-slate-900 leading-tight uppercase italic">Besucher-Trend</h3>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Letzte 7 Tage im Überblick</p>
                    </div>
                </div>

                <div className="h-[200px] w-full mt-4 -ml-4 pr-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={stats.trendData}>
                            <defs>
                                <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#818CF8" stopOpacity={0.1} />
                                    <stop offset="95%" stopColor="#818CF8" stopOpacity={0} />
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
                                contentStyle={{
                                    borderRadius: '16px',
                                    border: 'none',
                                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                                    padding: '12px'
                                }}
                            />
                            <Area
                                type="monotone"
                                dataKey="views"
                                stroke="#818CF8"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorViews)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Interaction Log */}
            <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-200/60">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400">
                        <Clock size={20} />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-black text-slate-900 leading-none">Aktivität</h3>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Echtzeit-Interaktionen</p>
                    </div>
                </div>

                <div className="space-y-4">
                    {activityLog.map((log, idx) => (
                        <div key={idx} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100/50">
                            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-accent shadow-sm">
                                {log.event_type === 'rsvp_action' ? <Heart size={16} className="fill-current" /> :
                                    log.event_type === 'whatsapp_click' ? <MessageSquare size={16} /> :
                                        <Eye size={16} />}
                            </div>
                            <div className="flex-1 min-w-0 text-left">
                                <p className="text-xs font-bold text-slate-900">
                                    {log.event_type === 'rsvp_action' ? 'Event-Zusage (RSVP)' :
                                        log.event_type === 'whatsapp_click' ? 'WhatsApp Anfrage gestartet' :
                                            log.event_type === 'profile_view' ? 'Profil wurde aufgerufen' :
                                                'Interaktion erfasst'}
                                </p>
                                <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">
                                    {format(new Date(log.created_at), 'HH:mm', { locale: de })} Uhr • {format(new Date(log.created_at), 'dd. MMM', { locale: de })}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
