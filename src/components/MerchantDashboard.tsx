import React, { useState, useEffect, useMemo } from 'react';
import { Eye, Phone, Send, Edit3, Camera, Briefcase, User, Plus, BarChart2, RefreshCw, X, BadgeCheck, Star } from 'lucide-react';
import { supabase } from '../utils/supabase';
import { useJobs, type Job } from '../hooks/useJobs';
import type { Company } from '../data/companies';
import { cn } from './Layout';

interface MerchantDashboardProps {
    company: Company;
    onClose: () => void;
}

export const MerchantDashboard: React.FC<MerchantDashboardProps> = ({ company, onClose }) => {
    const [activeTab, setActiveTab] = useState<'dashboard' | 'jobs' | 'profile'>('dashboard');
    const [stats, setStats] = useState({
        profileViews: 0,
        phoneClicks: 0,
        jobInquiries: 0
    });
    const [isLoading, setIsLoading] = useState(true);
    const { jobs, isLoading: jobsLoading, addJob } = useJobs(company.id);
    const [isAddingJob, setIsAddingJob] = useState(false);

    // Profile Edit State
    const [profileData, setProfileData] = useState({
        description: company.description,
        descriptionLong: company.descriptionLong || '',
        phone: company.phone,
        whatsapp: company.whatsapp,
        websiteUrl: company.websiteUrl,
        email: company.email || ''
    });

    const [newJob, setNewJob] = useState<Partial<Job>>({
        title: '',
        category: company.category,
        description: '',
        salary_range: '',
        job_type: 'Vollzeit',
        image_url: company.image,
        is_featured: false
    });

    const profileProgress = useMemo(() => {
        let score = 0;
        if (profileData.description) score += 20;
        if (profileData.descriptionLong) score += 20;
        if (profileData.phone) score += 10;
        if (profileData.whatsapp) score += 10;
        if (profileData.websiteUrl) score += 10;
        if (profileData.email) score += 10;
        if (company.gallery && company.gallery.length >= 3) score += 20;
        else if (company.gallery) score += (company.gallery.length * 6);
        return Math.min(score, 100);
    }, [profileData, company.gallery]);

    const checklist = useMemo(() => {
        const items = [];
        if (!profileData.descriptionLong) items.push({ id: 'desc', label: 'Ausführliche Beschreibung hinzufügen', tab: 'profile' });
        if (!profileData.whatsapp) items.push({ id: 'wa', label: 'WhatsApp Kontakt hinterlegen', tab: 'profile' });
        if (!company.gallery || company.gallery.length < 3) items.push({ id: 'gal', label: 'Mind. 3 Galeriebilder hochladen', tab: 'profile' });
        if (jobs.length === 0) items.push({ id: 'job', label: 'Deinen ersten Job posten', tab: 'jobs' });
        return items;
    }, [profileData, company.gallery, jobs]);

    const fetchStats = async () => {
        setIsLoading(true);
        try {
            const { count: views } = await supabase
                .from('analytics_events')
                .select('*', { count: 'exact', head: true })
                .eq('company_id', company.id)
                .eq('event_type', 'profile_view');

            const { count: clicks } = await supabase
                .from('analytics_events')
                .select('*', { count: 'exact', head: true })
                .eq('company_id', company.id)
                .eq('event_type', 'click_phone');

            const { count: inquiries } = await supabase
                .from('analytics_events')
                .select('*', { count: 'exact', head: true })
                .eq('company_id', company.id)
                .eq('event_type', 'open_swipe_jobs');

            setStats({
                profileViews: views || 0,
                phoneClicks: clicks || 0,
                jobInquiries: inquiries || 0
            });
        } catch (e) {
            console.error('Error fetching analytics', e);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, [company.id]);

    const handleAddJob = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (newJob.is_featured) {
                // If premium, open Stripe payment link in new window
                window.open('https://buy.stripe.com/8x2fZg5LybQYdyte7R6oo00', '_blank');
            }

            await addJob({
                company_id: company.id,
                title: newJob.title || '',
                category: newJob.category || company.category,
                description: newJob.description || '',
                salary_range: newJob.salary_range || '',
                job_type: newJob.job_type || 'Vollzeit',
                image_url: newJob.image_url,
                is_active: true,
                is_featured: newJob.is_featured
            });
            setIsAddingJob(false);
            setNewJob({ title: '', category: company.category, description: '', salary_range: '', job_type: 'Vollzeit', image_url: company.image, is_featured: false });
        } catch (err) {
            alert('Fehler beim Speichern des Jobs');
        }
    };

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { error } = await supabase
                .from('companies')
                .update({
                    description: profileData.description,
                    description_long: profileData.descriptionLong,
                    phone: profileData.phone,
                    whatsapp: profileData.whatsapp,
                    website_url: profileData.websiteUrl,
                    email: profileData.email
                })
                .eq('id', company.id);

            if (error) throw error;
            alert('Profil erfolgreich aktualisiert!');
        } catch (err) {
            console.error(err);
            alert('Fehler beim Aktualisieren des Profils');
        }
    };

    const handleAddGalleryImage = async () => {
        const url = prompt('Bild URL eingeben:');
        if (!url) return;

        try {
            const currentGallery = company.gallery || [];
            const { error } = await supabase
                .from('companies')
                .update({
                    gallery: [...currentGallery, url]
                })
                .eq('id', company.id);

            if (error) throw error;
            alert('Bild hinzugefügt!');
            window.location.reload(); // Quick refresh to show new image
        } catch (err) {
            console.error(err);
            alert('Fehler beim Hinzufügen des Bildes');
        }
    };

    const handleRemoveGalleryImage = async (urlToRemove: string) => {
        if (!confirm('Bild wirklich löschen?')) return;

        try {
            const currentGallery = company.gallery || [];
            const { error } = await supabase
                .from('companies')
                .update({
                    gallery: currentGallery.filter(url => url !== urlToRemove)
                })
                .eq('id', company.id);

            if (error) throw error;
            alert('Bild entfernt!');
            window.location.reload();
        } catch (err) {
            console.error(err);
            alert('Fehler beim Löschen des Bildes');
        }
    };

    return (
        <div className="bg-slate-50 text-slate-900 min-h-screen pb-32 font-sans relative z-[100]">
            {/* TopAppBar */}
            <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100 shadow-sm">
                <div className="flex justify-between items-center w-full px-6 py-4 max-w-2xl mx-auto">
                    <span className="text-xl font-extrabold tracking-tight text-slate-900 truncate pr-4">
                        {activeTab === 'profile' ? 'Profil verwalten' : company.name}
                    </span>
                    <div className="flex items-center gap-4 shrink-0">
                        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors relative" onClick={onClose}>
                            <X size={24} />
                        </button>
                    </div>
                </div>
            </nav>

            <main className="max-w-2xl mx-auto px-6 pt-8 space-y-10">
                {activeTab === 'dashboard' && (
                    <>
                        <header className="space-y-1 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <p className="text-slate-500 text-xs font-bold tracking-widest uppercase">Willkommen zurück</p>
                            <h1 className="text-3xl font-black tracking-tight text-slate-900">Hallo, {company.name.split(' ')[0]}!</h1>
                        </header>

                        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-75">
                            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/60">
                                <div className="flex justify-between items-end mb-4">
                                    <div className="space-y-1">
                                        <h3 className="font-bold text-slate-900 text-lg">Profil vervollständigen</h3>
                                        <p className="text-xs text-slate-500 font-medium">Erhöhen Sie Ihre Sichtbarkeit für Bewerber.</p>
                                    </div>
                                    <span className="text-accent font-black text-xl">{profileProgress}%</span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                                    <div
                                        className="bg-gradient-to-r from-accent to-pink-500 h-full rounded-full transition-all duration-1000"
                                        style={{ width: `${profileProgress}%` }}
                                    ></div>
                                </div>

                                {checklist.length > 0 && (
                                    <div className="mt-6 pt-6 border-t border-slate-100 space-y-3">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Nächste Schritte</p>
                                        <div className="space-y-2">
                                            {checklist.map((item: any) => (
                                                <button
                                                    key={item.id}
                                                    onClick={() => setActiveTab(item.tab as any)}
                                                    className="w-full flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 hover:border-accent/30 hover:bg-white transition-all group"
                                                >
                                                    <span className="text-xs font-bold text-slate-700">{item.label}</span>
                                                    <Plus size={14} className="text-slate-300 group-hover:text-accent transition-colors" />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
                            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200/60 flex flex-col items-center text-center space-y-3 group hover:bg-slate-50 transition-all relative">
                                {isLoading && (
                                    <div className="absolute top-4 right-4">
                                        <RefreshCw className="text-slate-300 animate-spin" size={16} />
                                    </div>
                                )}
                                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                                    <Eye size={28} />
                                </div>
                                <div>
                                    <span className="block text-3xl font-black text-slate-900">
                                        {isLoading ? "..." : stats.profileViews}
                                    </span>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Profilaufrufe</span>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200/60 flex flex-col items-center text-center space-y-3 group hover:bg-slate-50 transition-all">
                                <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
                                    <Phone size={28} />
                                </div>
                                <div>
                                    <span className="block text-3xl font-black text-slate-900">
                                        {isLoading ? "..." : stats.phoneClicks}
                                    </span>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Telefon-Klicks</span>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200/60 flex flex-col items-center text-center space-y-3 group hover:bg-slate-50 transition-all">
                                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                                    <Send size={28} />
                                </div>
                                <div>
                                    <span className="block text-3xl font-black text-slate-900">
                                        {isLoading ? "..." : stats.jobInquiries}
                                    </span>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Interaktionen</span>
                                </div>
                            </div>
                        </div>

                        <section className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150">
                            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/60 flex justify-between items-center group">
                                <div className="space-y-1 pr-4">
                                    <h3 className="font-bold text-slate-900">Aktuelles Angebot (Heute)</h3>
                                    <p className="text-sm text-slate-500 italic bg-amber-50 text-amber-800 px-3 py-1.5 rounded-lg inline-block mt-2 font-medium">Wiener Schnitzel mit Kartoffelsalat - 14,50€</p>
                                </div>
                                <button className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 hover:bg-accent hover:text-white transition-colors shrink-0 flex items-center justify-center">
                                    <Edit3 size={20} />
                                </button>
                            </div>
                        </section>
                    </>
                )}

                {activeTab === 'jobs' && (
                    <section className="space-y-5 animate-in fade-in duration-500">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-black text-slate-900">Offene Jobanzeigen</h2>
                            <button onClick={() => setIsAddingJob(true)} className="text-accent text-sm font-bold flex items-center gap-2">
                                <Plus size={16} /> Neu hinzufügen
                            </button>
                        </div>
                        <div className="space-y-3">
                            {jobsLoading ? (
                                <div className="bg-white rounded-3xl p-5 border border-slate-100 flex items-center justify-center py-10">
                                    <RefreshCw className="animate-spin text-slate-300" />
                                </div>
                            ) : jobs.length > 0 ? (
                                jobs.map(job => (
                                    <div key={job.id} className="bg-white rounded-3xl p-5 flex items-center justify-between shadow-sm border border-slate-200/60 group relative overflow-hidden">
                                        {job.is_featured && (
                                            <div className="absolute top-0 right-0 bg-premium text-[8px] font-black px-3 py-1 rounded-bl-xl uppercase tracking-widest text-slate-900">
                                                TOP
                                            </div>
                                        )}
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                                                <Briefcase size={24} />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h4 className="font-bold text-slate-900 text-base">{job.title}</h4>
                                                    {job.is_featured && <BadgeCheck size={14} className="text-premium fill-premium/20" />}
                                                </div>
                                                <p className="text-xs text-slate-400 font-medium">{job.job_type} • {job.salary_range}</p>
                                            </div>
                                        </div>
                                        <span className="px-4 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-widest bg-emerald-100 text-emerald-700">Aktiv</span>
                                    </div>
                                ))
                            ) : (
                                <div className="bg-white rounded-3xl p-8 border border-dashed border-slate-200 flex flex-col items-center text-center space-y-2">
                                    <p className="text-slate-400 text-sm font-medium">Bisher keine Stellenanzeigen geschaltet.</p>
                                </div>
                            )}
                        </div>
                    </section>
                )}

                {activeTab === 'profile' && (
                    <section className="space-y-8 animate-in fade-in duration-500">
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200/60 relative overflow-hidden">
                            <div className="flex items-center gap-6 mb-8">
                                <div className="w-24 h-24 rounded-3xl bg-slate-100 overflow-hidden border-4 border-white shadow-xl relative group">
                                    <img src={company.image} className="w-full h-full object-cover" alt="Logo" />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                        <Camera className="text-white" size={24} />
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h2 className="text-2xl font-black text-slate-900 tracking-tight truncate">{company.name}</h2>
                                    <p className="text-slate-500 font-medium">{company.category}</p>
                                    {company.isPremium && (
                                        <div className="mt-2 flex items-center gap-1.5 text-[10px] font-black uppercase text-premium bg-premium/10 px-3 py-1.5 rounded-full w-fit">
                                            <BadgeCheck size={12} className="fill-premium text-white" />
                                            Premium Partner
                                        </div>
                                    )}
                                </div>
                            </div>

                            <form onSubmit={handleUpdateProfile} className="space-y-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5">Kurzbeschreibung</label>
                                        <input
                                            className="w-full bg-slate-50 border border-slate-100 px-4 py-3 rounded-xl focus:ring-2 focus:ring-accent/20 outline-none"
                                            value={profileData.description}
                                            onChange={e => setProfileData({ ...profileData, description: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5">Ausführlicher Text</label>
                                        <textarea
                                            className="w-full bg-slate-50 border border-slate-100 px-4 py-3 rounded-xl focus:ring-2 focus:ring-accent/20 outline-none min-h-[120px] resize-none"
                                            value={profileData.descriptionLong}
                                            onChange={e => setProfileData({ ...profileData, descriptionLong: e.target.value })}
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5">WhatsApp Nummer</label>
                                            <input
                                                className="w-full bg-slate-50 border border-slate-100 px-4 py-3 rounded-xl focus:ring-2 focus:ring-accent/20 outline-none"
                                                value={profileData.whatsapp}
                                                onChange={e => setProfileData({ ...profileData, whatsapp: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5">Website URL</label>
                                            <input
                                                className="w-full bg-slate-50 border border-slate-100 px-4 py-3 rounded-xl focus:ring-2 focus:ring-accent/20 outline-none"
                                                value={profileData.websiteUrl}
                                                onChange={e => setProfileData({ ...profileData, websiteUrl: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <button className="w-full bg-slate-950 text-white py-4 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-xl hover:bg-slate-800 transition-all active:scale-[0.98]">
                                    Änderungen speichern
                                </button>
                            </form>
                        </div>

                        {/* Gallery Management Section */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200/60">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-black text-slate-900">Bildergalerie</h3>
                                <button
                                    onClick={handleAddGalleryImage}
                                    className="text-accent text-sm font-bold flex items-center gap-2"
                                >
                                    <Plus size={16} /> Hinzufügen
                                </button>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                {company.gallery && company.gallery.length > 0 ? (
                                    company.gallery.map((img, idx) => (
                                        <div key={idx} className="group relative aspect-square rounded-2xl bg-slate-100 overflow-hidden border border-slate-200/60">
                                            <img
                                                alt={`Gallery ${idx}`}
                                                className="w-full h-full object-cover transition-transform group-hover:scale-110"
                                                src={img}
                                                loading="lazy"
                                                decoding="async"
                                            />
                                            <button
                                                onClick={() => handleRemoveGalleryImage(img)}
                                                className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                                            >
                                                <X size={12} />
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-span-3 py-10 flex flex-col items-center justify-center text-slate-400 space-y-2 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                                        <Camera size={32} strokeWidth={1.5} />
                                        <p className="text-xs font-medium uppercase tracking-[0.1em]">Keine Bilder in der Galerie</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                )}
            </main>

            {/* Floating Action Button */}
            {activeTab === 'jobs' && (
                <button
                    onClick={() => setIsAddingJob(true)}
                    className="fixed bottom-28 right-6 bg-accent hover:bg-accent/90 text-white px-6 py-4 rounded-full shadow-2xl shadow-accent/30 flex items-center gap-3 active:scale-90 transition-all z-40"
                >
                    <Plus size={20} strokeWidth={3} />
                    <span className="font-bold text-sm tracking-wide">Neuen Job posten</span>
                </button>
            )}

            {/* Add Job Modal */}
            {isAddingJob && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center px-6">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsAddingJob(false)} />
                    <div className="bg-white w-full max-w-md rounded-[32px] overflow-hidden shadow-2xl relative z-10 animate-in zoom-in-95 duration-200">
                        <div className="px-8 pt-8 pb-6 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                            <h2 className="text-2xl font-black text-slate-900">Job posten</h2>
                            <button onClick={() => setIsAddingJob(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400">
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleAddJob} className="p-8 space-y-4">
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 text-left">Job-Titel</label>
                                <input
                                    required
                                    value={newJob.title}
                                    onChange={e => setNewJob({ ...newJob, title: e.target.value })}
                                    placeholder="z.B. Koch (m/w/d)"
                                    className="w-full bg-slate-50 border border-slate-100 px-4 py-3 rounded-xl focus:ring-2 focus:ring-accent/20 outline-none"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-left">
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5">Art</label>
                                    <select
                                        value={newJob.job_type}
                                        onChange={e => setNewJob({ ...newJob, job_type: e.target.value })}
                                        className="w-full bg-slate-50 border border-slate-100 px-4 py-3 rounded-xl outline-none"
                                    >
                                        <option>Vollzeit</option>
                                        <option>Teilzeit</option>
                                        <option>Minijob</option>
                                        <option>Ausbildung</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5">Gehalt</label>
                                    <input
                                        value={newJob.salary_range}
                                        onChange={e => setNewJob({ ...newJob, salary_range: e.target.value })}
                                        placeholder="z.B. 3.000€"
                                        className="w-full bg-slate-50 border border-slate-100 px-4 py-3 rounded-xl outline-none"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 text-left">Beschreibung</label>
                                <textarea
                                    required
                                    rows={3}
                                    value={newJob.description}
                                    onChange={e => setNewJob({ ...newJob, description: e.target.value })}
                                    placeholder="Kurze Beschreibung der Stelle..."
                                    className="w-full bg-slate-50 border border-slate-100 px-4 py-3 rounded-xl focus:ring-2 focus:ring-accent/20 outline-none resize-none"
                                />
                            </div>

                            {/* Premium Boost Option */}
                            <div
                                onClick={() => setNewJob({ ...newJob, is_featured: !newJob.is_featured })}
                                className={cn(
                                    "p-5 rounded-2xl border-2 transition-all cursor-pointer group relative overflow-hidden",
                                    newJob.is_featured ? "border-premium bg-premium/5" : "border-slate-100 bg-slate-50 hover:border-slate-200"
                                )}
                            >
                                <div className="flex items-center gap-4 relative z-10">
                                    <div className={cn(
                                        "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                                        newJob.is_featured ? "bg-premium text-white" : "bg-white text-slate-400"
                                    )}>
                                        <Star size={20} className={newJob.is_featured ? "fill-current" : ""} />
                                    </div>
                                    <div className="flex-1 text-left">
                                        <h4 className="text-sm font-black uppercase tracking-wider text-slate-900 leading-tight">Premium-Boost buchen</h4>
                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Erscheinen Sie ganz oben • Nur 19€</p>
                                    </div>
                                    <div className={cn(
                                        "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                                        newJob.is_featured ? "border-premium bg-premium scale-110" : "border-slate-300"
                                    )}>
                                        {newJob.is_featured && <BadgeCheck size={14} className="text-white" />}
                                    </div>
                                </div>
                                {newJob.is_featured && (
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-premium/10 rounded-full blur-2xl -mr-8 -mt-8" />
                                )}
                            </div>

                            <button className={cn(
                                "w-full py-4 rounded-2xl font-black shadow-lg transition-all active:scale-95 mt-4 flex items-center justify-center gap-2",
                                newJob.is_featured ? "bg-premium text-slate-950 shadow-premium/20" : "bg-slate-950 text-white"
                            )}>
                                {newJob.is_featured ? "Bezahlen & Veröffentlichen" : "Job Veröffentlichen"}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* BottomNavBar */}
            <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-8 pt-4 bg-white/90 backdrop-blur-xl border-t border-slate-100 z-50">
                <button
                    onClick={() => setActiveTab('dashboard')}
                    className={cn(
                        "flex flex-col items-center gap-1.5 transition-all duration-300 px-4 py-2 rounded-2xl",
                        activeTab === 'dashboard' ? "text-accent bg-accent/10" : "text-slate-400"
                    )}
                >
                    <BarChart2 size={24} />
                    <span className="text-[9px] font-bold tracking-widest uppercase">Einblicke</span>
                </button>
                <button
                    onClick={() => setActiveTab('jobs')}
                    className={cn(
                        "flex flex-col items-center gap-1.5 transition-all duration-300 px-4 py-2 rounded-2xl",
                        activeTab === 'jobs' ? "text-accent bg-accent/10" : "text-slate-400"
                    )}
                >
                    <Briefcase size={24} />
                    <span className="text-[9px] font-bold tracking-widest uppercase">Jobs</span>
                </button>
                <button
                    onClick={() => setActiveTab('profile')}
                    className={cn(
                        "flex flex-col items-center gap-1.5 transition-all duration-300 px-4 py-2 rounded-2xl",
                        activeTab === 'profile' ? "text-accent bg-accent/10" : "text-slate-400"
                    )}
                >
                    <User size={24} />
                    <span className="text-[9px] font-bold tracking-widest uppercase">Profil</span>
                </button>
            </nav>
        </div>
    );
};
