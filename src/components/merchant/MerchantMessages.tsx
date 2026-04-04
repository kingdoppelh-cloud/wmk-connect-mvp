import React from 'react';
import { useParams } from 'react-router-dom';
import { useLeads } from '../../hooks/useLeads';
import { Mail, Phone, Calendar, User, CheckCircle2, Trash2, MessageSquare } from 'lucide-react';
import { cn } from '../../utils/cn';

export const MerchantMessages: React.FC = () => {
    const { id: companyId } = useParams<{ id: string }>();
    const { leads, isLoading, error, updateStatus } = useLeads(companyId);

    if (isLoading) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-12 text-center text-red-500 bg-red-50 rounded-3xl border border-red-100 m-6">
                Fehler beim Laden der Nachrichten: {error}
            </div>
        );
    }

    const unreadCount = leads.filter(l => l.status === 'new').length;

    return (
        <div className="pt-8 pb-12 px-6 lg:px-12 max-w-7xl mx-auto w-full min-h-[calc(100vh-80px)] flex flex-col font-sans">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary mb-3 block">Kommunikation</span>
                    <h2 className="text-4xl md:text-6xl font-headline font-bold tracking-[-0.02em] text-primary leading-tight flex items-center gap-4">
                        Postfach
                        {unreadCount > 0 && (
                            <span className="bg-accent text-white text-sm font-bold px-3 py-1 rounded-full animate-pulse">
                                {unreadCount} Neu
                            </span>
                        )}
                    </h2>
                </div>
                {/* Search/Filter */}
                <div className="flex items-center bg-surface-container-low p-1.5 rounded-2xl shadow-sm w-full md:w-auto">
                    <button className="flex-1 md:flex-none px-6 py-2.5 text-sm font-bold rounded-xl bg-white shadow-sm text-primary transition-all">Alle</button>
                    <button className="flex-1 md:flex-none px-6 py-2.5 text-sm font-semibold rounded-xl text-slate-500 hover:text-slate-900 transition-colors relative">
                        Ungelesen
                        {unreadCount > 0 && <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full"></span>}
                    </button>
                    <button className="flex-1 md:flex-none px-6 py-2.5 text-sm font-semibold rounded-xl text-slate-500 hover:text-slate-900 transition-colors">Archiv</button>
                </div>
            </div>

            {leads.length === 0 ? (
                /* Empty State */
                <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto text-center py-20 border border-slate-100 rounded-3xl bg-white shadow-sm">
                    <div className="relative mb-10">
                        <div className="absolute inset-0 bg-secondary/5 rounded-full blur-2xl transform scale-150"></div>
                        <div className="w-32 h-32 bg-surface-container-low rounded-[2rem] flex items-center justify-center shadow-lg relative z-10 rotate-3 transition-transform hover:rotate-0 duration-500">
                            <MessageSquare className="text-6xl text-secondary opacity-90" />
                        </div>
                    </div>
                    <h3 className="text-3xl font-headline font-bold text-primary tracking-tight mb-4">Noch keine Nachrichten</h3>
                    <p className="text-on-surface opacity-60 text-lg leading-relaxed mb-10 px-4">
                        Sobald Kunden oder Talente dich kontaktieren, erscheinen ihre Anfragen hier in Echtzeit.
                    </p>
                </div>
            ) : (
                /* Leads List */
                <div className="grid grid-cols-1 gap-6">
                    {leads.map((lead) => (
                        <div
                            key={lead.id}
                            className={cn(
                                "group bg-white rounded-[2rem] p-6 md:p-8 border transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50",
                                lead.status === 'new' ? "border-accent/30 shadow-md ring-1 ring-accent/5" : "border-slate-100"
                            )}
                        >
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className={cn(
                                            "w-12 h-12 rounded-2xl flex items-center justify-center",
                                            lead.lead_type === 'direct_message' ? "bg-accent/10 text-accent" : "bg-blue-50 text-blue-500"
                                        )}>
                                            <User size={24} />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold text-slate-900">{lead.contact_name}</h4>
                                            <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                                                <Calendar size={12} />
                                                {new Date(lead.created_at).toLocaleDateString('de-DE', {
                                                    day: '2-digit',
                                                    month: 'long',
                                                    year: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </div>
                                        </div>
                                        {lead.status === 'new' && (
                                            <span className="ml-auto md:ml-0 bg-accent/10 text-accent text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg">NEU</span>
                                        )}
                                    </div>

                                    <div className="space-y-4">
                                        <p className="text-slate-600 leading-relaxed text-lg italic">
                                            "{lead.message || 'Keine Nachricht hinterlassen.'}"
                                        </p>

                                        <div className="flex flex-wrap gap-4 pt-4">
                                            <a href={`mailto:${lead.email}`} className="flex items-center gap-2 text-sm font-bold text-slate-600 bg-slate-50 px-4 py-2 rounded-xl hover:bg-accent hover:text-white transition-all">
                                                <Mail size={16} />
                                                {lead.email}
                                            </a>
                                            {lead.phone && (
                                                <a href={`tel:${lead.phone}`} className="flex items-center gap-2 text-sm font-bold text-slate-600 bg-slate-50 px-4 py-2 rounded-xl hover:bg-slate-100 transition-all">
                                                    <Phone size={16} />
                                                    {lead.phone}
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-row md:flex-col gap-3 justify-end">
                                    {lead.status === 'new' && (
                                        <button
                                            onClick={() => updateStatus(lead.id, 'contacted')}
                                            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-accent transition-all animate-in slide-in-from-right"
                                        >
                                            <CheckCircle2 size={18} />
                                            Erledigt
                                        </button>
                                    )}
                                    <button
                                        onClick={() => updateStatus(lead.id, 'lost')}
                                        className="flex-1 md:flex-none p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                        title="Löschen"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
