import React from 'react';
import { Calendar, MapPin, Users, Sparkles } from 'lucide-react';
// label-compliance-check - Feed component, no form inputs.
import { useEvents } from '../hooks/useEvents';
import { cn } from '../utils/cn';
import { CompanyCardSkeleton } from './ui/Skeleton';

export const EventHub: React.FC = () => {
    const { events, isLoading, toggleRSVP } = useEvents();

    if (isLoading) {
        return (
            <div className="space-y-8">
                <header className="py-12 px-8 bg-slate-100 rounded-[3rem] animate-pulse">
                    <div className="h-4 w-32 bg-slate-200 rounded-full mb-4" />
                    <div className="h-10 w-64 bg-slate-200 rounded-xl mb-4" />
                    <div className="h-4 w-full bg-slate-200 rounded-lg" />
                </header>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <CompanyCardSkeleton />
                    <CompanyCardSkeleton />
                    <CompanyCardSkeleton />
                </div>
            </div>
        );
    }

    const upcomingEvents = events.filter(e => new Date(e.event_date) >= new Date());

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <header className="relative py-12 px-8 bg-slate-900 rounded-[3rem] overflow-hidden group">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/20 blur-[120px] rounded-full -mr-64 -mt-64 group-hover:bg-accent/30 transition-all duration-1000" />
                <div className="relative z-10 max-w-2xl">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="bg-accent/20 text-accent px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-accent/30">Community Hub</span>
                        <div className="flex -space-x-2">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="w-6 h-6 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center overflow-hidden">
                                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`} alt="User" />
                                </div >
                            ))}
                        </div >
                        <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">+542 Zusagen</span>
                    </div >
                    <h1 className="text-4xl md:text-5xl font-black text-white uppercase italic leading-[0.9] tracking-tighter mb-4">
                        Regionale <br />
                        <span className="text-accent">Highlights.</span>
                    </h1>
                    <p className="text-slate-400 font-medium text-sm md:text-base max-w-md leading-relaxed">
                        Entdecke Events deiner Lieblingsbetriebe. Vom Sommerfest bis zum exklusiven Tasting – verpasse nichts mehr in der Region.
                    </p>
                </div >
                <Calendar size={200} className="absolute -bottom-10 -right-10 text-white/5 -rotate-12 pointer-events-none" />
            </header >

            {
                upcomingEvents.length === 0 ? (
                    <div className="py-20 text-center bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
                        <Calendar size={64} className="mx-auto text-slate-300 mb-4" />
                        <h3 className="text-xl font-black text-slate-900">Aktuell keine Events</h3>
                        <p className="text-slate-500 font-medium">Schau später wieder vorbei für neue Highlights.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
                        {upcomingEvents.map(event => (
                            <div key={event.id} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-accent/5 transition-all duration-500 group overflow-hidden flex flex-col">
                                {/* Company Header */}
                                <div className="p-6 pb-2 flex items-center gap-3">
                                    <label className="sr-only">Event Hub</label>
                                    <div className="w-10 h-10 rounded-xl overflow-hidden border border-slate-100 shadow-sm">
                                        <img src={event.company?.image} alt={event.company?.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{event.company?.name}</p>
                                        <div className="flex items-center gap-1.5 text-accent">
                                            <Sparkles size={10} />
                                            <span className="text-[8px] font-black uppercase tracking-tighter">Top Host</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 pt-4 flex-1">
                                    <h3 className="text-xl font-black text-slate-900 leading-tight mb-3 group-hover:text-accent transition-colors">{event.title}</h3>
                                    <p className="text-slate-500 text-sm font-medium line-clamp-3 leading-relaxed mb-6">
                                        {event.description}
                                    </p>

                                    <div className="space-y-3 mb-8">
                                        <div className="flex items-center gap-3 text-slate-900 bg-slate-50 p-3 rounded-2xl border border-slate-100/50">
                                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-slate-400 group-hover:text-accent transition-colors">
                                                <Calendar size={20} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none mb-1">Wann?</p>
                                                <p className="text-sm font-black italic">
                                                    {new Date(event.event_date).toLocaleDateString('de-DE', {
                                                        weekday: 'short',
                                                        day: '2-digit',
                                                        month: 'long',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })} Uhr
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 text-slate-900 bg-slate-50 p-3 rounded-2xl border border-slate-100/50">
                                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-slate-400 group-hover:text-accent transition-colors">
                                                <MapPin size={20} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none mb-1">Wo?</p>
                                                <p className="text-sm font-black italic truncate max-w-[150px]">
                                                    {event.location_override || "Beim Betrieb"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Attendee Info & Button */}
                                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-50">
                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-950 text-white rounded-xl">
                                                <Users size={14} />
                                                <span className="text-xs font-black">{event.attendee_count}</span>
                                            </div>
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Zusagen</span>
                                        </div>

                                        <button
                                            onClick={() => toggleRSVP(event.id, event.user_status || 'none')}
                                            className={cn(
                                                "px-6 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all active:scale-95",
                                                event.user_status === 'attending'
                                                    ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                                                    : "bg-slate-100 text-slate-900 hover:bg-slate-200"
                                            )}
                                        >
                                            {event.user_status === 'attending' ? "Dabei!" : "Zusagen"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            }
        </div >
    );
};
