import React, { useState, useEffect, useMemo } from 'react';
import { Eye, Phone, Edit3, Camera, Briefcase, User, Plus, BarChart2, RefreshCw, X, BadgeCheck, Star, Newspaper, Trash2, Megaphone, Image as ImageIcon, QrCode as QrIcon, Download, Calendar, Users, MessageCircle, Globe } from 'lucide-react';
import { supabase } from '../utils/supabase';
import { useJobs, type Job } from '../hooks/useJobs';
import { useNews } from '../hooks/useNews';
import { useEvents } from '../hooks/useEvents';
import type { Company } from '../data/companies';
import { cn } from './Layout';

interface MerchantDashboardProps {
    company: Company;
    onClose: () => void;
}

export const MerchantDashboard: React.FC<MerchantDashboardProps> = ({ company, onClose }) => {
    const [activeTab, setActiveTab] = useState<'dashboard' | 'jobs' | 'profile' | 'news' | 'marketing'>('dashboard');
    const [stats, setStats] = useState({
        profileViews: 0,
        phoneClicks: 0,
        websiteClicks: 0,
        whatsappClicks: 0,
        jobInquiries: 0
    });
    const [dailyData, setDailyData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAddingJob, setIsAddingJob] = useState(false);
    const [isAddingNews, setIsAddingNews] = useState(false);
    const [isAddingEvent, setIsAddingEvent] = useState(false);
    const { jobs, isLoading: jobsLoading, addJob, deleteJob } = useJobs(company.id);
    const { posts, addPost, deletePost } = useNews(company.id);
    const { events, addEvent } = useEvents(company.id);
    const [newPost, setNewPost] = useState<{ content: string; type: 'news' | 'offer' | 'event' | 'special'; image_url?: string }>({ content: '', type: 'news' });
    const [newsImageFile, setNewsImageFile] = useState<File | null>(null);
    const [isPosting, setIsPosting] = useState(false);
    const [newEvent, setNewEvent] = useState({
        title: '',
        description: '',
        event_date: '',
        location_override: ''
    });

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
            // Fetch aggregated hourly/daily data for charts
            const { data: analyticsData, error: analyticsError } = await supabase
                .rpc('get_merchant_analytics', {
                    target_company_id: company.id,
                    days_back: 7
                });

            if (analyticsError) throw analyticsError;

            if (analyticsData) {
                setDailyData(analyticsData);

                // Summarize for the top cards
                const summary = analyticsData.reduce((acc: any, curr: any) => {
                    if (curr.event_type === 'profile_view') acc.profileViews += Number(curr.event_count);
                    if (curr.event_type === 'whatsapp_click') acc.whatsappClicks += Number(curr.event_count);
                    if (curr.event_type === 'website_click') acc.websiteClicks += Number(curr.event_count);
                    if (curr.event_type === 'click_phone') acc.phoneClicks += Number(curr.event_count);
                    if (curr.event_type === 'open_swipe_jobs') acc.jobInquiries += Number(curr.event_count);
                    return acc;
                }, { profileViews: 0, whatsappClicks: 0, websiteClicks: 0, phoneClicks: 0, jobInquiries: 0 });

                setStats(summary);
            }
        } catch (e) {
            console.error('Error fetching analytics', e);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, [company.id]);

    const handleDeleteJob = async (id: string) => {
        if (confirm('Möchten Sie dieses Stellenangebot wirklich löschen?')) {
            try {
                await deleteJob(id);
            } catch (e) {
                console.error('Error deleting job', e);
            }
        }
    };

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

    const handleAddPost = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsPosting(true);
        try {
            let finalImageUrl = '';

            if (newsImageFile) {
                const fileExt = newsImageFile.name.split('.').pop();
                const fileName = `${company.id}/${Math.random()}.${fileExt}`;
                const { error: uploadError } = await supabase.storage
                    .from('company-assets')
                    .upload(`news/${fileName}`, newsImageFile);

                if (uploadError) throw uploadError;

                const { data: { publicUrl } } = supabase.storage
                    .from('company-assets')
                    .getPublicUrl(`news/${fileName}`);

                finalImageUrl = publicUrl;
            }

            await addPost({
                company_id: company.id,
                content: newPost.content,
                type: newPost.type,
                image_url: finalImageUrl || undefined
            });

            setIsAddingNews(false);
            setNewPost({ content: '', type: 'news' });
            setNewsImageFile(null);
            alert('Beitrag veröffentlicht! Follower wurden benachrichtigt.');
        } catch (err) {
            console.error('Post failed', err);
            alert('Fehler beim Posten');
        } finally {
            setIsPosting(false);
        }
    };

    const handleAddEvent = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await addEvent({
                company_id: company.id,
                title: newEvent.title,
                description: newEvent.description,
                event_date: newEvent.event_date,
                location_override: newEvent.location_override,
                image_url: company.image
            });
            setIsAddingEvent(false);
            setNewEvent({ title: '', description: '', event_date: '', location_override: '' });
            alert('Event erfolgreich erstellt!');
        } catch (err) {
            alert('Fehler beim Erstellen des Events');
        }
    };

    const handleDeletePost = async (id: string) => {
        if (!confirm('Beitrag wirklich löschen?')) return;
        try {
            await deletePost(id);
        } catch (err) {
            alert('Fehler beim Löschen');
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

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
                            <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-200/60 flex flex-col items-center text-center space-y-2 group hover:bg-slate-50 transition-all relative">
                                {isLoading && (
                                    <div className="absolute top-2 right-2">
                                        <RefreshCw className="text-slate-300 animate-spin" size={12} />
                                    </div>
                                )}
                                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                                    <Eye size={20} />
                                </div>
                                <div>
                                    <span className="block text-xl font-black text-slate-900">
                                        {isLoading ? "..." : stats.profileViews}
                                    </span>
                                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Views</span>
                                </div>
                            </div>

                            <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-200/60 flex flex-col items-center text-center space-y-2 group hover:bg-slate-50 transition-all">
                                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
                                    <MessageCircle size={20} />
                                </div>
                                <div>
                                    <span className="block text-xl font-black text-slate-900">
                                        {isLoading ? "..." : stats.whatsappClicks}
                                    </span>
                                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">WhatsApp</span>
                                </div>
                            </div>

                            <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-200/60 flex flex-col items-center text-center space-y-2 group hover:bg-slate-50 transition-all">
                                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-500 group-hover:scale-110 transition-transform">
                                    <Globe size={20} />
                                </div>
                                <div>
                                    <span className="block text-xl font-black text-slate-900">
                                        {isLoading ? "..." : stats.websiteClicks}
                                    </span>
                                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Web</span>
                                </div>
                            </div>

                            <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-200/60 flex flex-col items-center text-center space-y-2 group hover:bg-slate-50 transition-all">
                                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
                                    <Phone size={20} />
                                </div>
                                <div>
                                    <span className="block text-xl font-black text-slate-900">
                                        {isLoading ? "..." : stats.phoneClicks}
                                    </span>
                                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Anrufe</span>
                                </div>
                            </div>

                            <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-200/60 flex flex-col items-center text-center space-y-2 group hover:bg-slate-50 transition-all">
                                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                                    <Plus size={20} />
                                </div>
                                <div>
                                    <span className="block text-xl font-black text-slate-900">
                                        {isLoading ? "..." : stats.jobInquiries}
                                    </span>
                                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Aktionen</span>
                                </div>
                            </div>
                        </div>

                        {/* Visual Trend Chart (Simple CSS implementation) */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/60 space-y-6">
                            <div className="flex justify-between items-center">
                                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                                    <BarChart2 size={18} className="text-accent" />
                                    Aktivitätsverlauf (7 Tage)
                                </h3>
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Live Insights</span>
                            </div>

                            <div className="flex items-end justify-between h-32 gap-2 pt-2 px-1">
                                {Array.from({ length: 7 }).map((_, i) => {
                                    const date = new Date();
                                    date.setDate(date.getDate() - (6 - i));
                                    const dateStr = date.toISOString().split('T')[0];
                                    const dayCount = dailyData
                                        .filter(d => d.event_date === dateStr)
                                        .reduce((sum, curr) => sum + Number(curr.event_count), 0);

                                    const maxCount = Math.max(...dailyData.map(d => Number(d.event_count)), 10);
                                    const heightPercent = Math.min((dayCount / maxCount) * 100, 100);

                                    return (
                                        <div key={i} className="flex-1 flex flex-col items-center group relative">
                                            <div
                                                className="w-full bg-slate-100 rounded-t-lg relative transition-all duration-700 hover:bg-accent/20 group-hover:shadow-[0_0_15px_rgba(225,29,72,0.1)]"
                                                style={{ height: `${heightPercent}%` }}
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-t from-accent/10 to-accent/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-lg" />
                                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap">
                                                    {dayCount} Aufrufe
                                                </div>
                                            </div>
                                            <span className="text-[8px] font-bold text-slate-400 mt-2 uppercase tracking-tighter">
                                                {date.toLocaleDateString('de-DE', { weekday: 'short' })}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Recent Activity Log (Simplified) */}
                        <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/60 overflow-hidden relative">
                            <h3 className="font-bold text-slate-900 mb-4 text-left">Letzte Interaktionen</h3>
                            <div className="space-y-3">
                                {stats.profileViews + stats.whatsappClicks > 0 ? (
                                    <>
                                        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                                            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                                                <MessageCircle size={14} />
                                            </div>
                                            <div className="flex-1 text-left">
                                                <p className="text-[11px] font-bold text-slate-800">WhatsApp Kontaktanfrage</p>
                                                <p className="text-[9px] text-slate-500">Vor wenigen Minuten</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-slate-100">
                                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                                                <Eye size={14} />
                                            </div>
                                            <div className="flex-1 text-left">
                                                <p className="text-[11px] font-bold text-slate-800">Profil über QR-Code aufgerufen</p>
                                                <p className="text-[9px] text-slate-500">Heute, 14:20</p>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <p className="text-xs text-slate-400 italic text-center py-4">Noch keine Aktivitäten in diesem Zeitraum.</p>
                                )}
                            </div>
                            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-slate-50 rounded-full -z-10" />
                        </section>

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
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => handleDeleteJob(job.id)}
                                                className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                            <span className="px-4 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-widest bg-emerald-100 text-emerald-700">Aktiv</span>
                                        </div>
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

                {activeTab === 'news' && (
                    <section className="space-y-8 animate-in fade-in duration-500">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div>
                                <h2 className="text-2xl font-black text-slate-900 uppercase italic text-left">News & Events</h2>
                                <p className="text-sm text-slate-500 font-medium text-left">Informiere deine Follower über Aktuelles und Veranstaltungen.</p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setIsAddingNews(true)}
                                    className="bg-accent text-white px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-all shadow-lg shadow-accent/20"
                                >
                                    <Plus size={16} /> News posten
                                </button>
                                <button
                                    onClick={() => setIsAddingEvent(true)}
                                    className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-all shadow-lg shadow-slate-900/20"
                                >
                                    <Calendar size={16} /> Event erstellen
                                </button>
                            </div>
                        </div>

                        {/* Events List */}
                        {events.length > 0 && (
                            <div className="text-left">
                                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Anstehende Events ({events.length})</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {events.map(event => (
                                        <div key={event.id} className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm relative overflow-hidden group">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="bg-accent/10 p-2 rounded-xl text-accent">
                                                    <Calendar size={20} />
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-black text-slate-900 line-clamp-1">{event.title}</h4>
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase">
                                                        {new Date(event.event_date).toLocaleDateString('de-DE', { day: '2-digit', month: 'long' })}
                                                    </p>
                                                </div>
                                            </div>
                                            <p className="text-slate-600 text-xs line-clamp-2 mb-4 leading-relaxed font-medium">{event.description}</p>
                                            <div className="flex items-center justify-between border-t border-slate-50 pt-4">
                                                <div className="flex items-center gap-1.5 text-slate-900">
                                                    <Users size={14} className="text-slate-400" />
                                                    <span className="text-xs font-black">{event.attendee_count} Zusagen</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* News Posts List */}
                        <div className="text-left">
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Deine Beiträge ({posts.length})</h3>
                            {posts.length === 0 ? (
                                <div className="text-center py-12 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                                    <Newspaper size={48} className="mx-auto text-slate-300 mb-4" />
                                    <p className="text-slate-500 font-bold">Noch keine Beiträge veröffentlicht</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {posts.map(post => (
                                        <div key={post.id} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex justify-between items-start">
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2">
                                                    <span className={cn(
                                                        "text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full",
                                                        post.type === 'news' ? "bg-blue-100 text-blue-600" : "bg-amber-100 text-amber-600"
                                                    )}>
                                                        {post.type}
                                                    </span>
                                                    <span className="text-[10px] font-bold text-slate-400 italic">
                                                        {new Date(post.created_at).toLocaleDateString('de-DE')}
                                                    </span>
                                                </div>
                                                <p className="text-slate-700 font-medium leading-relaxed">{post.content}</p>
                                            </div>
                                            <button
                                                onClick={() => handleDeletePost(post.id)}
                                                className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Modals are handled below at the end of the root div */}
                    </section>
                )}

                {activeTab === 'marketing' && (
                    <section className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <header className="space-y-1">
                            <p className="text-slate-500 text-xs font-bold tracking-widest uppercase">Marketing Toolkit</p>
                            <h1 className="text-3xl font-black tracking-tight text-slate-900">Werbe-Material</h1>
                        </header>

                        <div className="grid grid-cols-1 gap-6">
                            {/* QR Poster Card */}
                            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200/60 relative overflow-hidden group">
                                <div className="relative z-10">
                                    <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-6">
                                        <QrIcon size={24} />
                                    </div>
                                    <h3 className="text-xl font-black text-slate-900 mb-2">QR-Code Poster</h3>
                                    <p className="text-slate-500 text-sm mb-8 leading-relaxed max-w-sm">
                                        Drucken Sie ein professonelles Poster für Ihren Eingang oder Ihre Tische aus. Gäste gelangen per Scan direkt zu Ihrem Profil.
                                    </p>

                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <button
                                            onClick={() => {
                                                const printUrl = `https://api.qrserver.com/v1/create-qr-code/?size=1000x1000&data=${encodeURIComponent(window.location.origin + '/?company=' + company.id)}&bgcolor=FFFFFF&color=0F172A`;
                                                const printWindow = window.open('', '_blank');
                                                if (printWindow) {
                                                    printWindow.document.write(`
                                                        <html>
                                                            <head>
                                                                <title>QR Poster - ${company.name}</title>
                                                                <style>
                                                                    body { font-family: sans-serif; text-align: center; padding: 50px; }
                                                                    .poster { border: 20px solid #0F172A; padding: 60px; display: inline-block; border-radius: 40px; }
                                                                    h1 { font-size: 48px; font-weight: 900; margin-bottom: 10px; }
                                                                    p { font-size: 24px; color: #64748b; margin-bottom: 40px; }
                                                                    img { width: 400px; height: 400px; }
                                                                    .footer { margin-top: 40px; font-weight: bold; color: #0F172A; font-size: 20px; }
                                                                </style>
                                                            </head>
                                                            <body>
                                                                <div class="poster">
                                                                    <h1>${company.name}</h1>
                                                                    <p>Scannen & Entdecken auf WMK Connect</p>
                                                                    <img src="${printUrl}" />
                                                                    <div class="footer">www.wmk-connect.de</div>
                                                                </div>
                                                                <script>window.onload = () => { window.print(); }</script>
                                                            </body>
                                                        </html>
                                                    `);
                                                    printWindow.document.close();
                                                }
                                            }}
                                            className="bg-slate-900 text-white px-6 py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-slate-800 transition-all hover:scale-[1.02] active:scale-95"
                                        >
                                            <Download size={18} />
                                            Poster drucken (A4)
                                        </button>
                                    </div>
                                </div>
                                <QrIcon size={120} className="absolute -bottom-6 -right-6 text-slate-50 -z-0 rotate-12" />
                            </div>

                            {/* Social Media Asset */}
                            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200/60 relative overflow-hidden group">
                                <div className="relative z-10">
                                    <div className="w-12 h-12 bg-pink-50 rounded-2xl flex items-center justify-center text-pink-500 mb-6">
                                        <ImageIcon size={24} />
                                    </div>
                                    <h3 className="text-xl font-black text-slate-900 mb-2">Social Media Asset</h3>
                                    <p className="text-slate-500 text-sm mb-8 leading-relaxed max-w-sm">
                                        Laden Sie eine Grafik herunter, die perfekt für Ihre Instagram-Story oder Facebook-Seite geeignet ist.
                                    </p>

                                    <button
                                        onClick={() => {
                                            const canvas = document.createElement('canvas');
                                            canvas.width = 1080;
                                            canvas.height = 1920;
                                            const ctx = canvas.getContext('2d');
                                            if (ctx) {
                                                // Background
                                                const gradient = ctx.createLinearGradient(0, 0, 0, 1920);
                                                gradient.addColorStop(0, '#0F172A');
                                                gradient.addColorStop(1, '#1E293B');
                                                ctx.fillStyle = gradient;
                                                ctx.fillRect(0, 0, 1080, 1920);

                                                // Accent Circle
                                                ctx.beginPath();
                                                ctx.arc(540, 960, 400, 0, Math.PI * 2);
                                                ctx.fillStyle = 'rgba(56, 189, 248, 0.1)';
                                                ctx.fill();

                                                // Text
                                                ctx.fillStyle = '#FFFFFF';
                                                ctx.textAlign = 'center';
                                                ctx.font = '900 80px sans-serif';
                                                ctx.fillText(company.name.toUpperCase(), 540, 600);

                                                ctx.fillStyle = '#38BDF8';
                                                ctx.font = 'bold 40px sans-serif';
                                                ctx.fillText('JETZT AUF WMK CONNECT', 540, 700);

                                                ctx.fillStyle = '#94A3B8';
                                                ctx.font = 'medium 30px sans-serif';
                                                ctx.fillText('Jobs • News • Angebote', 540, 1400);

                                                // "Download" as Image
                                                const link = document.createElement('a');
                                                link.download = `wmk-connect-${company.id}.png`;
                                                link.href = canvas.toDataURL('image/png');
                                                link.click();
                                            }
                                        }}
                                        className="bg-white border-2 border-slate-200 text-slate-900 px-6 py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-slate-50 transition-all hover:scale-[1.02] active:scale-95"
                                    >
                                        <ImageIcon size={18} />
                                        Story-Asset generieren
                                    </button>
                                </div>
                                <ImageIcon size={120} className="absolute -bottom-6 -right-6 text-slate-50 -z-0 -rotate-12" />
                            </div>
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

            {/* Add News Modal */}
            {isAddingNews && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center px-6">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsAddingNews(false)} />
                    <div className="bg-white w-full max-w-md rounded-[32px] overflow-hidden shadow-2xl relative z-10 animate-in zoom-in-95 duration-200">
                        <div className="px-8 pt-8 pb-6 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                            <h2 className="text-2xl font-black text-slate-900 text-left">Update posten</h2>
                            <button onClick={() => setIsAddingNews(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400">
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleAddPost} className="p-8 space-y-5 max-h-[80vh] overflow-y-auto">
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 text-left">Typ des Beitrags</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {['news', 'offer', 'event', 'special'].map((t) => (
                                        <button
                                            key={t}
                                            type="button"
                                            onClick={() => setNewPost({ ...newPost, type: t as any })}
                                            className={cn(
                                                "py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border-2 transition-all",
                                                newPost.type === t ? "border-accent bg-accent text-white" : "border-slate-100 bg-slate-50 text-slate-400 shadow-none"
                                            )}
                                        >
                                            {t === 'news' ? 'Nachricht' : t === 'offer' ? 'Angebot' : t === 'event' ? 'Event' : 'Specials'}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 text-left">Bild hinzufügen (Optional)</label>
                                <div className="relative group">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                        onChange={(e) => setNewsImageFile(e.target.files?.[0] || null)}
                                    />
                                    <div className={cn(
                                        "w-full aspect-[16/9] rounded-2xl border-2 border-dashed flex flex-col items-center justify-center transition-all",
                                        newsImageFile ? "border-accent bg-accent/5" : "border-slate-100 bg-slate-50 group-hover:border-accent/30"
                                    )}>
                                        {newsImageFile ? (
                                            <div className="relative w-full h-full p-2">
                                                <img
                                                    src={URL.createObjectURL(newsImageFile)}
                                                    className="w-full h-full object-cover rounded-xl"
                                                    alt="Preview"
                                                />
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); setNewsImageFile(null); }}
                                                    className="absolute top-4 right-4 bg-red-500 text-white p-1 rounded-full shadow-lg"
                                                >
                                                    <X size={14} />
                                                </button>
                                            </div>
                                        ) : (
                                            <>
                                                <ImageIcon className="text-slate-300 mb-2" size={32} />
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Klicken oder ziehen</p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 text-left">Was gibt es Neues?</label>
                                <textarea
                                    required
                                    rows={4}
                                    value={newPost.content}
                                    onChange={e => setNewPost({ ...newPost, content: e.target.value })}
                                    placeholder="z.B. Unser Team ist bereit für das Wochenende! Kommt vorbei auf ein kühles Getränk..."
                                    className="w-full bg-slate-50 border border-slate-100 px-4 py-3 rounded-2xl focus:ring-2 focus:ring-accent/20 outline-none resize-none text-slate-700 font-medium"
                                />
                            </div>
                            <button
                                disabled={isPosting}
                                className={cn(
                                    "w-full py-4 rounded-2xl font-black bg-accent text-white shadow-xl shadow-accent/20 transition-all active:scale-95 mt-2 flex items-center justify-center gap-2",
                                    isPosting && "opacity-50 cursor-not-allowed"
                                )}
                            >
                                {isPosting ? <RefreshCw className="animate-spin" size={20} /> : "Beitrag jetzt teilen"}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Add Job Modal ... */}
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

            {/* Add Event Modal */}
            {isAddingEvent && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsAddingEvent(false)} />
                    <div className="relative bg-white rounded-[2.5rem] w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden">
                        <div className="p-8">
                            <div className="flex justify-between items-center mb-6 text-left">
                                <div className="space-y-1">
                                    <h3 className="text-xl font-black text-slate-900 uppercase italic leading-none">Event erstellen</h3>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">In die Region ausstrahlen</p>
                                </div>
                                <button onClick={() => setIsAddingEvent(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleAddEvent} className="space-y-5">
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 text-left">Event-Titel</label>
                                    <input
                                        required
                                        value={newEvent.title}
                                        onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
                                        placeholder="z.B. Sommerfest 2026"
                                        className="w-full bg-slate-50 border border-slate-100 px-4 py-3 rounded-xl focus:ring-2 focus:ring-accent/20 outline-none font-bold"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4 text-left">
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5">Datum & Zeit</label>
                                        <input
                                            required
                                            type="datetime-local"
                                            value={newEvent.event_date}
                                            onChange={e => setNewEvent({ ...newEvent, event_date: e.target.value })}
                                            className="w-full bg-slate-50 border border-slate-100 px-4 py-3 rounded-xl outline-none font-bold text-xs"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5">Ort (Optional)</label>
                                        <input
                                            value={newEvent.location_override}
                                            onChange={e => setNewEvent({ ...newEvent, location_override: e.target.value })}
                                            placeholder="Standard: Firma"
                                            className="w-full bg-slate-50 border border-slate-100 px-4 py-3 rounded-xl outline-none font-bold text-xs"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 text-left">Beschreibung</label>
                                    <textarea
                                        required
                                        rows={3}
                                        value={newEvent.description}
                                        onChange={e => setNewEvent({ ...newEvent, description: e.target.value })}
                                        placeholder="Was erwartet die Gäste?"
                                        className="w-full bg-slate-50 border border-slate-100 px-4 py-3 rounded-xl focus:ring-2 focus:ring-accent/20 outline-none resize-none font-medium text-sm"
                                    />
                                </div>

                                <button className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl hover:scale-[1.02] active:scale-95 transition-all">
                                    Event veröffentlichen
                                </button>
                            </form>
                        </div>
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
                    onClick={() => setActiveTab('news')}
                    className={cn(
                        "flex flex-col items-center gap-1.5 transition-all duration-300 px-4 py-2 rounded-2xl",
                        activeTab === 'news' ? "text-accent bg-accent/10" : "text-slate-400"
                    )}
                >
                    <Newspaper size={24} />
                    <span className="text-[9px] font-bold tracking-widest uppercase">Aktuelles</span>
                </button>
                <button
                    onClick={() => setActiveTab('marketing')}
                    className={cn(
                        "flex flex-col items-center gap-1.5 transition-all duration-300 px-4 py-2 rounded-2xl",
                        activeTab === 'marketing' ? "text-accent bg-accent/10" : "text-slate-400"
                    )}
                >
                    <Megaphone size={24} />
                    <span className="text-[9px] font-bold tracking-widest uppercase">Marketing</span>
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
