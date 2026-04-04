import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { TrendingUp, Bell } from 'lucide-react';
import { useMerchantCompany } from '../../hooks/useMerchantCompany';
import { useLeads } from '../../hooks/useLeads';
import { cn } from '../../utils/cn';
import { WebBoosterModal } from './WebBoosterModal';

export const MerchantDashboardOverview: React.FC = () => {
    const { id: companyId } = useParams<{ id: string }>();
    const { company, isLoading: isCompanyLoading } = useMerchantCompany(companyId);
    const { leads } = useLeads(companyId);
    const [isWebBoosterOpen, setIsWebBoosterOpen] = React.useState(false);

    const profileHealth = useMemo(() => {
        if (!company) return 0;
        let score = 0;
        if (company.image) score += 25;
        if (company.descriptionLong && company.descriptionLong.length > 100) score += 25;
        if (company.gallery && company.gallery.length >= 3) score += 25;
        if (Object.keys(company.openingHours || {}).length >= 5) score += 25;
        return score;
    }, [company]);

    const missingTasks = useMemo(() => {
        if (!company) return [];
        const tasks = [];
        if (!company.image) tasks.push({ title: 'Profilbild hochladen', desc: '+25% Sichtbarkeit' });
        if (!company.descriptionLong || company.descriptionLong.length < 100) tasks.push({ title: 'Ausführliche Beschreibung', desc: 'Mehr Details für Bewerber' });
        if (!company.gallery || company.gallery.length < 3) tasks.push({ title: 'Bildergalerie füllen', desc: 'Mind. 3 Impressionen' });
        if (Object.keys(company.openingHours || {}).length < 5) tasks.push({ title: 'Öffnungszeiten pflegen', desc: 'Wichtig für Kundenanfragen' });
        return tasks;
    }, [company]);

    if (isCompanyLoading) {
        return (
            <div className="flex-1 flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
            </div>
        );
    }
    return (
        <div className="pt-8 pb-12 px-6 lg:px-12">
            <label className="sr-only">Händler Dashboard Übersicht</label>
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                <div>
                    <h1 className="text-4xl font-headline font-bold text-primary tracking-[-0.02em] mb-2 leading-tight">Willkommen zurück, {company?.name || 'Händler'}</h1>
                    <p className="text-secondary font-medium tracking-wide opacity-90">Hier ist die aktuelle Übersicht für dein Unternehmen.</p>
                </div>
                <div className="flex gap-4">
                    <button className="bg-surface-container-low text-primary px-6 py-3 rounded-2xl no-line font-bold transition-all hover:bg-surface-container-high active:scale-95 flex items-center gap-2.5">
                        <span className="material-symbols-outlined text-xl">download</span>
                        <span className="tracking-wide">Export</span>
                    </button>
                    <button className="bg-primary text-white px-8 py-3.5 rounded-2xl no-line flex items-center gap-2.5 font-bold transition-all hover:bg-primary/90 hover:scale-[1.02] shadow-xl shadow-primary/10 active:scale-95">
                        <span className="material-symbols-outlined">add</span>
                        <span className="tracking-wide">Job schalten</span>
                    </button>
                </div>
            </div>

            {/* Core Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {/* Metric 1 */}
                <div className="bg-surface-container-low rounded-3xl p-7 no-line flex flex-col transition-all hover:bg-surface-container-high cursor-default">
                    <div className="flex justify-between items-start mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                            <span className="material-symbols-outlined text-2xl">visibility</span>
                        </div>
                        <span className="flex items-center gap-1.5 text-[11px] font-bold text-green-600 bg-green-50/50 px-3 py-1.5 rounded-full">
                            <span className="material-symbols-outlined text-[14px]">trending_up</span> 12%
                        </span>
                    </div>
                    <h3 className="text-4xl font-headline font-bold text-primary mb-1 tracking-tight">12.4k</h3>
                    <p className="text-xs font-bold text-on-surface opacity-40 uppercase tracking-widest">Profile Views</p>
                </div>

                {/* Metric 2 */}
                <div className="bg-white rounded-2xl p-6 shadow-[0px_4px_24px_rgba(27,59,90,0.04)] border border-slate-100 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                            <span className="material-symbols-outlined">group</span>
                        </div>
                        <span className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md">
                            <span className="material-symbols-outlined text-[14px]">trending_up</span> 8%
                        </span>
                    </div>
                    <h3 className="text-3xl font-black text-slate-800 mb-1">142</h3>
                    <p className="text-sm font-semibold text-slate-500">Total Applicants</p>
                </div>

                {/* Metric 3 */}
                <div className="bg-secondary rounded-3xl p-7 no-line flex flex-col shadow-xl shadow-secondary/10 transition-all hover:scale-[1.02] active:scale-100 cursor-pointer">
                    <div className="flex justify-between items-start mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-white/20 text-white flex items-center justify-center backdrop-blur-md">
                            <span className="material-symbols-outlined text-2xl">work</span>
                        </div>
                    </div>
                    <h3 className="text-4xl font-headline font-bold text-white mb-1 tracking-tight">14</h3>
                    <p className="text-xs font-bold text-white opacity-60 uppercase tracking-widest">Active Jobs</p>
                </div>

                {/* Metric 4 */}
                <div className="bg-white rounded-2xl p-6 shadow-[0px_4px_24px_rgba(27,59,90,0.04)] border border-slate-100 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                            <span className="material-symbols-outlined">star</span>
                        </div>
                        <span className="flex items-center gap-1 text-xs font-bold text-slate-500 bg-slate-50 px-2 py-1 rounded-md">
                            <span className="material-symbols-outlined text-[14px]">trending_flat</span> 0%
                        </span>
                    </div>
                    <h3 className="text-3xl font-black text-slate-800 mb-1">4.8</h3>
                    <p className="text-sm font-semibold text-slate-500">Employer Rating</p>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Main Content Area */}
                <div className="xl:col-span-2 space-y-8">
                    {/* Recent Applications */}
                    <div className="bg-surface-container-low rounded-3xl no-line p-8 lg:p-10 transition-all hover:bg-surface-container-high">
                        <div className="flex justify-between items-end mb-8">
                            <div>
                                <h2 className="text-2xl font-headline font-bold text-primary tracking-tight mb-2">Recent Applications</h2>
                                <p className="text-sm font-medium text-on-surface opacity-50">Candidates who applied in the last 7 days.</p>
                            </div>
                            <button className="text-primary font-bold text-sm hover:text-secondary transition-colors tracking-wide underline underline-offset-8 decoration-primary/20">View All</button>
                        </div>

                        <div className="space-y-4">
                            {leads.filter(l => l.status === 'new').slice(0, 3).map(lead => (
                                <div key={lead.id} className="flex items-center justify-between p-5 bg-surface-container-lowest rounded-2xl no-line hover:scale-[1.01] transition-all cursor-pointer border border-slate-50">
                                    <div className="flex items-center gap-5">
                                        <div className="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center font-bold text-sm">
                                            {lead.contact_name.substring(0, 2).toUpperCase()}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-primary text-base">{lead.contact_name}</h4>
                                            <p className="text-xs font-medium text-on-surface opacity-40">Anfrage: {lead.message.substring(0, 40)}...</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-[11px] font-bold text-on-surface opacity-30 uppercase tracking-widest">
                                            {new Date(lead.created_at).toLocaleDateString()}
                                        </span>
                                        <button className="text-primary bg-primary/5 hover:bg-primary/10 p-2.5 rounded-xl transition-colors">
                                            <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {leads.filter(l => l.status === 'new').length === 0 && (
                                <p className="text-center py-8 text-slate-400 italic">Keine neuen Anfragen vorhanden.</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sidebar Column */}
                <div className="space-y-8">
                    {/* Regional Trends Widget */}
                    <div className="bg-slate-900 rounded-2xl p-6 text-white overflow-hidden relative group">
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-4">
                                <TrendingUp size={16} className="text-secondary" />
                                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400">Regionale Trends</h2>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-xs mb-1.5">
                                        <span className="font-semibold text-slate-200">Handwerk & Montage</span>
                                        <span className="text-secondary">+12% Suchvolumen</span>
                                    </div>
                                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                        <div className="bg-secondary h-full rounded-full" style={{ width: '85%' }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-xs mb-1.5">
                                        <span className="font-semibold text-slate-200">Ingenieurwesen</span>
                                        <span className="text-slate-400">Stabil</span>
                                    </div>
                                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                        <div className="bg-slate-600 h-full rounded-full" style={{ width: '60%' }}></div>
                                    </div>
                                </div>
                            </div>
                            <p className="mt-6 text-[10px] text-slate-500 leading-relaxed">
                                Basierend auf Suchanfragen im WMK-Connect Netzwerk der letzten 7 Tage.
                            </p>
                        </div>
                        <TrendingUp size={120} className="absolute -bottom-8 -right-8 text-white/5 pointer-events-none group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    {/* Premium Services Teaser */}
                    <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-accent/20 transition-transform hover:scale-[1.02] cursor-pointer group">
                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center backdrop-blur-md">
                                    <span className="material-symbols-outlined text-3xl text-accent animate-pulse">auto_awesome</span>
                                </div>
                                <h3 className="font-headline font-bold text-2xl tracking-tight italic uppercase">Premium Growth</h3>
                            </div>
                            <p className="text-white opacity-80 text-[15px] leading-relaxed mb-10 font-medium italic">
                                Schalte das volle Potenzial deines Unternehmens frei mit unseren exklusiven Digital-Services.
                            </p>
                            <button className="w-full bg-accent text-white font-black py-4 rounded-2xl hover:bg-accent/90 transition-all text-sm tracking-[0.1em] uppercase shadow-lg shadow-accent/20">
                                Jetzt entdecken
                            </button>
                        </div>
                        <span className="material-symbols-outlined absolute -bottom-16 -right-12 text-white/5 text-[220px] pointer-events-none select-none">rocket_launch</span>
                    </div>

                    {/* Online Presence Booster Teaser */}
                    <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl transition-transform hover:scale-[1.02] cursor-pointer group border border-white/10">
                        <div className="relative z-10">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
                                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-200">Presence AI</span>
                            </div>
                            <h3 className="font-headline font-bold text-2xl tracking-tight mb-4">Deine Webseite,<br />schlüsselfertig.</h3>
                            <p className="text-indigo-100/70 text-sm leading-relaxed mb-8">
                                Wir haben dein Profil analysiert. Basierend auf deinen Daten können wir dir eine professionelle Webseite erstellen.
                            </p>
                            <button
                                onClick={() => setIsWebBoosterOpen(true)}
                                className="w-full bg-white text-indigo-950 font-black py-4 rounded-2xl hover:bg-indigo-50 transition-all text-sm tracking-[0.1em] uppercase shadow-xl"
                            >
                                Live-Vorschau ansehen
                            </button>
                        </div>
                        <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px] group-hover:bg-indigo-500/30 transition-colors"></div>
                        <span className="material-symbols-outlined absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/5 text-[300px] pointer-events-none select-none rotate-12">language</span>
                    </div>

                    {/* Notification Status Widget */}
                    <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-2xl shadow-slate-200/50 relative overflow-hidden group">
                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600">
                                    <Bell size={24} />
                                </div>
                                <h3 className="font-headline font-bold text-2xl tracking-tight text-slate-900">Echtzeit-Alerts</h3>
                            </div>

                            <p className="text-slate-500 text-sm leading-relaxed mb-8">
                                Erhalte sofortige Benachrichtigungen bei neuen Leads oder Bewerbungen direkt in deinem Browser.
                            </p>

                            <button
                                onClick={() => {
                                    alert("Push-Benachrichtigungen werden in dieser Umgebung (Localhost) simuliert. Das System ist aktiv.");
                                }}
                                className="w-full py-4 rounded-2xl text-sm font-black transition-all bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200 flex items-center justify-center gap-3 uppercase tracking-widest"
                            >
                                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]"></div>
                                System Aktiv
                            </button>
                        </div>
                    </div>

                    {/* Profile Health Card */}
                    <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-2xl shadow-slate-200/50 relative overflow-hidden group">
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="font-headline font-bold text-2xl tracking-tight text-primary">Profil-Stärke</h3>
                                <div className={cn(
                                    "px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest",
                                    profileHealth === 100 ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-600"
                                )}>
                                    {profileHealth}%
                                </div>
                            </div>

                            {/* Progress bar */}
                            <div className="h-4 bg-slate-100 rounded-full overflow-hidden mb-10 border border-slate-50 p-1">
                                <div
                                    className={cn(
                                        "h-full rounded-full transition-all duration-1000 ease-out shadow-sm",
                                        profileHealth === 100 ? "bg-green-500" : "bg-orange-500"
                                    )}
                                    style={{ width: `${profileHealth}%` }}
                                />
                            </div>

                            {missingTasks.length > 0 ? (
                                <div className="space-y-4">
                                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">Nächste Schritte</p>
                                    {missingTasks.slice(0, 2).map((task, idx) => (
                                        <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-100 transition-colors hover:bg-slate-50">
                                            <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-300 font-black text-xs shrink-0">
                                                {idx + 1}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-900 leading-none mb-1">{task.title}</p>
                                                <p className="text-xs text-slate-500 font-medium">{task.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-4">
                                    <span className="material-symbols-outlined text-green-500 text-5xl mb-4">verified</span>
                                    <p className="font-bold text-slate-900">Dein Profil ist perfekt!</p>
                                    <p className="text-xs text-slate-500 mt-1">Du wirst optimal in der Region gesehen.</p>
                                </div>
                            )}

                            <button className="w-full mt-10 bg-slate-900 text-white font-black py-4 rounded-2xl hover:bg-primary transition-all text-sm tracking-[0.1em] uppercase shadow-lg shadow-slate-900/10 active:scale-95">
                                Profil bearbeiten
                            </button>
                        </div>
                    </div>

                    {/* To-Do List */}
                    <div className="bg-white rounded-2xl shadow-[0px_4px_24px_rgba(27,59,90,0.04)] border border-slate-100 p-6">
                        <h2 className="text-lg font-bold text-slate-900 mb-4">Anstehende Aufgaben</h2>
                        <ul className="space-y-3">
                            {leads.filter(l => l.status === 'new').length > 0 && (
                                <li className="flex items-start gap-3">
                                    <div className="mt-1 w-2 h-2 rounded-full bg-accent shrink-0" />
                                    <div>
                                        <p className="text-sm font-semibold text-slate-800">{leads.filter(l => l.status === 'new').length} neue Anfragen prüfen</p>
                                        <p className="text-xs text-slate-500">Reagiere zeitnah für bessere Rankings</p>
                                    </div>
                                </li>
                            )}
                            {missingTasks.slice(0, 2).map((task, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                    <div className="mt-1 w-2 h-2 rounded-full bg-orange-400 shrink-0" />
                                    <div>
                                        <p className="text-sm font-semibold text-slate-800">{task.title}</p>
                                        <p className="text-xs text-slate-500">{task.desc}</p>
                                    </div>
                                </li>
                            ))}
                            {leads.filter(l => l.status === 'new').length === 0 && missingTasks.length === 0 && (
                                <li className="text-center py-2">
                                    <p className="text-sm text-slate-400 italic">Alles erledigt! ✨</p>
                                </li>
                            )}
                        </ul>
                    </div>
                </div >
            </div >

            {company && (
                <WebBoosterModal
                    isOpen={isWebBoosterOpen}
                    onClose={() => setIsWebBoosterOpen(false)}
                    company={company}
                />
            )}
        </div >
    );
};
