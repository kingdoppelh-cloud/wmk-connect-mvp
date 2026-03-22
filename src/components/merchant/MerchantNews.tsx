import React from 'react';
import { Newspaper, Calendar, Trash2, Plus, MessageSquare } from 'lucide-react';
import { cn } from '../Layout';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';

interface MerchantNewsProps {
    news: any[];
    events: any[];
    onDeleteNews: (id: string) => void;
    onDeleteEvent: (id: string) => void;
    onAddNews: () => void;
    onAddEvent: () => void;
}

export const MerchantNews: React.FC<MerchantNewsProps> = ({
    news,
    events,
    onDeleteNews,
    onDeleteEvent,
    onAddNews,
    onAddEvent
}) => {
    return (
        <div className="space-y-6">
            {/* News Section */}
            <div className="space-y-4">
                <div className="flex justify-between items-center px-4">
                    <div className="flex items-center gap-2">
                        <Newspaper size={18} className="text-slate-400" />
                        <h3 className="text-lg font-black text-slate-900 uppercase italic">Deine Updates</h3>
                    </div>
                </div>

                <div className="space-y-3">
                    {news.length > 0 ? (
                        news.map((item) => (
                            <div key={item.id} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/60 group">
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex items-center gap-2">
                                        <div className={cn(
                                            "px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest",
                                            item.type === 'offer' ? "bg-green-100 text-green-600" :
                                                item.type === 'event' ? "bg-purple-100 text-purple-600" :
                                                    "bg-blue-100 text-blue-600"
                                        )}>
                                            {item.type === 'news' ? 'Update' : item.type === 'offer' ? 'Angebot' : 'Event'}
                                        </div>
                                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                                            {format(new Date(item.created_at), 'dd. MMMM', { locale: de })}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => onDeleteNews(item.id)}
                                        className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                                {item.image_url && (
                                    <div className="mb-3 rounded-xl overflow-hidden aspect-video bg-slate-50">
                                        <img src={item.image_url} alt="Update" className="w-full h-full object-cover" />
                                    </div>
                                )}
                                <p className="text-sm text-slate-600 font-medium leading-relaxed">{item.content}</p>
                            </div>
                        ))
                    ) : (
                        <div
                            onClick={onAddNews}
                            className="bg-slate-50 rounded-3xl p-10 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center space-y-3 cursor-pointer hover:bg-slate-100/50 transition-all"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-300">
                                <MessageSquare size={24} />
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs font-black text-slate-900 uppercase">Noch keine Updates</p>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Teile Neuigkeiten mit deinen Followern</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Events Section */}
            <div className="space-y-4 pt-4">
                <div className="flex justify-between items-center px-4">
                    <div className="flex items-center gap-2">
                        <Calendar size={18} className="text-slate-400" />
                        <h3 className="text-lg font-black text-slate-900 uppercase italic">Geplante Events</h3>
                    </div>
                    <button
                        onClick={onAddEvent}
                        className="text-[10px] font-black uppercase tracking-widest text-accent flex items-center gap-1.5"
                    >
                        <Plus size={14} /> Hinzufügen
                    </button>
                </div>

                <div className="space-y-3">
                    {events.length > 0 ? (
                        events.map((event) => (
                            <div key={event.id} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/60 flex gap-4 group">
                                <div className="shrink-0 w-12 h-12 rounded-xl bg-accent/5 flex flex-col items-center justify-center border border-accent/10">
                                    <span className="text-[10px] font-black text-accent uppercase">{format(new Date(event.event_date), 'MMM', { locale: de })}</span>
                                    <span className="text-lg font-black text-slate-900 leading-none">{format(new Date(event.event_date), 'dd')}</span>
                                </div>
                                <div className="flex-1 min-w-0 flex justify-between items-start">
                                    <div className="space-y-0.5">
                                        <h4 className="font-bold text-slate-900 truncate">{event.title}</h4>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                                            {format(new Date(event.event_date), 'HH:mm', { locale: de })} Uhr • {event.location_override || 'Vor Ort'}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => onDeleteEvent(event.id)}
                                        className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div
                            onClick={onAddEvent}
                            className="bg-slate-50 rounded-3xl p-10 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center space-y-3 cursor-pointer hover:bg-slate-100/50 transition-all"
                        >
                            <Calendar className="text-slate-200" size={32} />
                            <div className="space-y-1">
                                <p className="text-xs font-black text-slate-900 uppercase">Keine Events geplant</p>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Lade Kunden zu besonderen Anlässen ein</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
