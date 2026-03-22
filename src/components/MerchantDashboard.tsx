import React, { useState, useEffect, useMemo } from 'react';
import { RefreshCw, X, Image as ImageIcon, Star, BadgeCheck } from 'lucide-react';
import { supabase } from '../utils/supabase';
import { useJobs } from '../hooks/useJobs';
import { useNews } from '../hooks/useNews';
import { useEvents } from '../hooks/useEvents';
import type { Company, Job, NewsPost, Event } from '../types';
import { cn } from './Layout';

// Sub-components
import { MerchantHeader } from './merchant/MerchantHeader';
import { MerchantStats } from './merchant/MerchantStats';
import { MerchantOffers } from './merchant/MerchantOffers';
import { MerchantJobs } from './merchant/MerchantJobs';
import { MerchantNews } from './merchant/MerchantNews';
import { MerchantMarketing } from './merchant/MerchantMarketing';
import { MerchantSettings } from './merchant/MerchantSettings';
import { MerchantMedia } from './merchant/MerchantMedia';

// Bottom Nav Icons (keeping them local for simplicity or move to constants)
import { BarChart2, Briefcase, Newspaper, Megaphone, User } from 'lucide-react';
import { ErrorBoundary } from './ErrorBoundary';

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

    // Hooks
    const { jobs, addJob, deleteJob } = useJobs(company.id);
    const { posts, addPost, deletePost } = useNews(company.id);
    const { events, addEvent, deleteEvent } = useEvents(company.id);

    // Form States
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const [newPost, setNewPost] = useState<{ content: string; type: NewsPost['type']; image_url?: string }>({ content: '', type: 'news' });
    const [newsImageFile, setNewsImageFile] = useState<File | null>(null);
    const [isPosting, setIsPosting] = useState(false);
    const [newEvent, setNewEvent] = useState<Partial<Event>>({ title: '', description: '', event_date: '', location_override: '' });
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

    const validateJob = () => {
        const errors: Record<string, string> = {};
        if (!newJob.title?.trim()) errors.title = 'Titel ist erforderlich';
        if (!newJob.description?.trim()) errors.description = 'Beschreibung ist erforderlich';
        if (newJob.description && newJob.description.length > 500) errors.description = 'Maximal 500 Zeichen';
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const validateEvent = () => {
        const errors: Record<string, string> = {};
        if (!newEvent.title?.trim()) errors.title = 'Titel ist erforderlich';
        if (!newEvent.event_date) errors.event_date = 'Datum ist erforderlich';
        if (newEvent.event_date && new Date(newEvent.event_date) < new Date()) errors.event_date = 'Datum muss in der Zukunft liegen';
        if (!newEvent.description?.trim()) errors.description = 'Beschreibung ist erforderlich';
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const validatePost = () => {
        const errors: Record<string, string> = {};
        if (!newPost.content.trim()) errors.content = 'Inhalt ist erforderlich';
        if (newPost.content.length > 1000) errors.content = 'Maximal 1000 Zeichen';
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

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
            const { data: analyticsData, error: analyticsError } = await supabase.rpc('get_merchant_analytics', {
                target_company_id: company.id,
                days_back: 7
            });
            if (analyticsError) throw analyticsError;
            if (analyticsData) {
                setDailyData(analyticsData);
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

    useEffect(() => { fetchStats(); }, [company.id]);

    useEffect(() => {
        setFormErrors({});
    }, [activeTab, isAddingJob, isAddingNews, isAddingEvent]);

    const handleAddJob = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateJob()) return;
        try {
            if (newJob.is_featured) window.open('https://buy.stripe.com/8x2fZg5LybQYdyte7R6oo00', '_blank');
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
            setFormErrors({});
        } catch (err) { alert('Fehler beim Speichern des Jobs'); }
    };

    const handleAddPost = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validatePost()) return;
        setIsPosting(true);
        try {
            let finalImageUrl = '';
            if (newsImageFile) {
                const fileExt = newsImageFile.name.split('.').pop();
                const fileName = `${company.id}/${Math.random()}.${fileExt}`;
                const { error: uploadError } = await supabase.storage.from('company-assets').upload(`news/${fileName}`, newsImageFile);
                if (uploadError) throw uploadError;
                const { data: { publicUrl } } = supabase.storage.from('company-assets').getPublicUrl(`news/${fileName}`);
                finalImageUrl = publicUrl;
            }
            await addPost({ company_id: company.id, content: newPost.content, type: newPost.type, image_url: finalImageUrl || undefined });
            setIsAddingNews(false);
            setNewPost({ content: '', type: 'news' });
            setNewsImageFile(null);
            setFormErrors({});
        } catch (err) { alert('Fehler beim Posten'); } finally { setIsPosting(false); }
    };

    const handleAddEvent = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateEvent()) return;
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
            setFormErrors({});
        } catch (err) { alert('Fehler beim Erstellen des Events'); }
    };

    const validateProfile = () => {
        const errors: Record<string, string> = {};
        if (!profileData.description?.trim()) errors.description = 'Kurzbeschreibung ist erforderlich';
        if (!profileData.descriptionLong?.trim()) errors.descriptionLong = 'Ausführliche Beschreibung ist erforderlich';

        if (profileData.websiteUrl) {
            try {
                new URL(profileData.websiteUrl.startsWith('http') ? profileData.websiteUrl : `https://${profileData.websiteUrl}`);
            } catch (e) {
                errors.websiteUrl = 'Ungültige URL (z.B. https://ihreseite.de)';
            }
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateProfile()) return;
        try {
            const { error } = await supabase.from('companies').update({
                description: profileData.description,
                description_long: profileData.descriptionLong,
                phone: profileData.phone,
                whatsapp: profileData.whatsapp,
                website_url: profileData.websiteUrl,
                email: profileData.email
            }).eq('id', company.id);
            if (error) throw error;
            setFormErrors({});
            alert('Profil erfolgreich aktualisiert!');
        } catch (err) { alert('Fehler beim Aktualisieren des Profils'); }
    };

    const handleAddGalleryImage = async () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = async (e: any) => {
            const file = e.target.files?.[0];
            if (!file) return;
            try {
                const fileExt = file.name.split('.').pop();
                const fileName = `${company.id}/${Math.random()}.${fileExt}`;
                const { error: uploadError } = await supabase.storage.from('company-assets').upload(`gallery/${fileName}`, file);
                if (uploadError) throw uploadError;
                const { data: { publicUrl } } = supabase.storage.from('company-assets').getPublicUrl(`gallery/${fileName}`);
                const currentGallery = company.gallery || [];
                const { error: updateError } = await supabase.from('companies').update({ gallery: [...currentGallery, publicUrl] }).eq('id', company.id);
                if (updateError) throw updateError;
                alert('Bild hinzugefügt!');
            } catch (err) { alert('Upload fehlgeschlagen'); }
        };
        input.click();
    };

    const handleRemoveGalleryImage = async (urlToRemove: string) => {
        if (!confirm('Bild aus Galerie löschen?')) return;
        try {
            const newGallery = (company.gallery || []).filter(url => url !== urlToRemove);
            const { error } = await supabase.from('companies').update({ gallery: newGallery }).eq('id', company.id);
            if (error) throw error;
            // Optionally delete from storage too
        } catch (err) { alert('Löschen fehlgeschlagen'); }
    };

    const handleUpdateLogo = async () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = async (e: any) => {
            const file = e.target.files?.[0];
            if (!file) return;
            try {
                const fileExt = file.name.split('.').pop();
                const fileName = `${company.id}/logo-${Math.random()}.${fileExt}`;
                const { error: uploadError } = await supabase.storage.from('company-assets').upload(`logos/${fileName}`, file);
                if (uploadError) throw uploadError;
                const { data: { publicUrl } } = supabase.storage.from('company-assets').getPublicUrl(`logos/${fileName}`);
                const { error: updateError } = await supabase.from('companies').update({ logo: publicUrl }).eq('id', company.id);
                if (updateError) throw updateError;
                alert('Logo aktualisiert!');
            } catch (err) { alert('Logo-Update fehlgeschlagen'); }
        };
        input.click();
    };

    if (isLoading) {
        return (
            <div className="fixed inset-0 bg-white z-[100] flex items-center justify-center">
                <RefreshCw className="animate-spin text-accent" size={32} />
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-slate-50 z-[100] overflow-y-auto pb-32">
            <MerchantHeader
                company={company}
                activeTab={activeTab}
                onClose={onClose}
                setActiveTab={setActiveTab}
                profileProgress={profileProgress}
                checklist={checklist}
            />

            <main className="max-w-2xl mx-auto px-6 pt-6">
                <ErrorBoundary>
                    {activeTab === 'dashboard' && (
                        <div className="space-y-6">
                            <MerchantStats
                                stats={{
                                    views: stats.profileViews,
                                    whatsapp: stats.whatsappClicks,
                                    favorites: 0, // Placeholder if not in analytics
                                    referrals: stats.websiteClicks,
                                    trendData: dailyData
                                }}
                                activityLog={[]} // Placeholder
                            />
                            <MerchantOffers
                                company={company}
                                onEditOffer={() => setActiveTab('profile')}
                            />
                        </div>
                    )}

                    {activeTab === 'jobs' && (
                        <MerchantJobs
                            jobs={jobs}
                            onDeleteJob={deleteJob}
                            onAddJob={() => setIsAddingJob(true)}
                        />
                    )}

                    {activeTab === 'news' && (
                        <MerchantNews
                            news={posts}
                            events={events}
                            onDeleteNews={deletePost}
                            onDeleteEvent={deleteEvent}
                            onAddNews={() => setIsAddingNews(true)}
                            onAddEvent={() => setIsAddingEvent(true)}
                        />
                    )}

                    {activeTab === 'marketing' && (
                        <MerchantMarketing company={company} />
                    )}

                    {activeTab === 'profile' && (
                        <div className="space-y-6">
                            <MerchantMedia
                                company={company}
                                onAddGalleryImage={handleAddGalleryImage}
                                onRemoveGalleryImage={handleRemoveGalleryImage}
                                onUpdateLogo={handleUpdateLogo}
                            />
                            <MerchantSettings
                                profileData={profileData}
                                setProfileData={setProfileData}
                                onUpdateProfile={handleUpdateProfile}
                                formErrors={formErrors}
                            />
                        </div>
                    )}
                </ErrorBoundary>
            </main>

            {/* Modals */}
            {isAddingJob && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center px-6">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" onClick={() => setIsAddingJob(false)} />
                    <div className="glass w-full max-w-md rounded-[32px] overflow-hidden shadow-2xl relative z-10 animate-in zoom-in-95 duration-200">
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
                                    onChange={e => {
                                        setNewJob({ ...newJob, title: e.target.value });
                                        if (formErrors.title) setFormErrors({ ...formErrors, title: '' });
                                    }}
                                    placeholder="z.B. Koch (m/w/d)"
                                    className={cn(
                                        "w-full bg-slate-50 border px-4 py-3 rounded-xl focus:ring-2 outline-none transition-colors",
                                        formErrors.title ? "border-red-500 focus:ring-red-500/20" : "border-slate-100 focus:ring-accent/20"
                                    )}
                                />
                                {formErrors.title && <p className="text-[10px] font-bold text-red-500 mt-1 uppercase tracking-wider">{formErrors.title}</p>}
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-left">
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5">Art</label>
                                    <select value={newJob.job_type} onChange={e => setNewJob({ ...newJob, job_type: e.target.value })} className="w-full bg-slate-50 border border-slate-100 px-4 py-3 rounded-xl outline-none">
                                        <option>Vollzeit</option><option>Teilzeit</option><option>Minijob</option><option>Ausbildung</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5">Gehalt</label>
                                    <input value={newJob.salary_range} onChange={e => setNewJob({ ...newJob, salary_range: e.target.value })} placeholder="z.B. 3.000€" className="w-full bg-slate-50 border border-slate-100 px-4 py-3 rounded-xl outline-none" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 text-left">Beschreibung</label>
                                <textarea
                                    required
                                    rows={3}
                                    value={newJob.description}
                                    onChange={e => {
                                        setNewJob({ ...newJob, description: e.target.value });
                                        if (formErrors.description) setFormErrors({ ...formErrors, description: '' });
                                    }}
                                    placeholder="Kurze Beschreibung der Stelle..."
                                    className={cn(
                                        "w-full bg-slate-50 border px-4 py-3 rounded-xl focus:ring-2 outline-none resize-none transition-colors",
                                        formErrors.description ? "border-red-500 focus:ring-red-500/20" : "border-slate-100 focus:ring-accent/20"
                                    )}
                                />
                                <div className="flex justify-between mt-1">
                                    {formErrors.description ? (
                                        <p className="text-[10px] font-bold text-red-500 uppercase tracking-wider">{formErrors.description}</p>
                                    ) : (
                                        <div />
                                    )}
                                    <span className={cn(
                                        "text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full transition-colors",
                                        (newJob.description?.length || 0) > 480 ? "bg-red-50 text-red-500" :
                                            (newJob.description?.length || 0) > 400 ? "bg-amber-50 text-amber-500" :
                                                "bg-slate-50 text-slate-400"
                                    )}>
                                        {newJob.description?.length || 0} / 500
                                    </span>
                                </div>
                            </div>
                            <div onClick={() => setNewJob({ ...newJob, is_featured: !newJob.is_featured })} className={cn("p-5 rounded-2xl border-2 transition-all cursor-pointer group relative overflow-hidden", newJob.is_featured ? "border-premium bg-premium/5" : "border-slate-100 bg-slate-50 hover:border-slate-200")}>
                                <div className="flex items-center gap-4 relative z-10">
                                    <div className={cn("w-10 h-10 rounded-full flex items-center justify-center transition-colors", newJob.is_featured ? "bg-premium text-white" : "bg-white text-slate-400")}>
                                        <Star size={20} className={newJob.is_featured ? "fill-current" : ""} />
                                    </div>
                                    <div className="flex-1 text-left">
                                        <h4 className="text-sm font-black uppercase tracking-wider text-slate-900 leading-tight">Premium-Boost buchen</h4>
                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Erscheinen Sie ganz oben • Nur 19€</p>
                                    </div>
                                    <div className={cn("w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all", newJob.is_featured ? "border-premium bg-premium scale-110" : "border-slate-300")}>
                                        {newJob.is_featured && <BadgeCheck size={14} className="text-white" />}
                                    </div>
                                </div>
                            </div>
                            <button className={cn("w-full py-4 rounded-2xl font-black shadow-lg transition-all active:scale-95 mt-4 flex items-center justify-center gap-2", newJob.is_featured ? "bg-premium text-slate-950 shadow-premium/20" : "bg-slate-950 text-white")}>
                                {newJob.is_featured ? "Bezahlen & Veröffentlichen" : "Job Veröffentlichen"}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {isAddingNews && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center px-6">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" onClick={() => setIsAddingNews(false)} />
                    <div className="glass w-full max-w-md rounded-[32px] overflow-hidden shadow-2xl relative z-10 animate-in zoom-in-95 duration-200">
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
                                        <button key={t} type="button" onClick={() => setNewPost({ ...newPost, type: t as any })} className={cn("py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border-2 transition-all", newPost.type === t ? "border-accent bg-accent text-white" : "border-slate-100 bg-slate-50 text-slate-400")}>
                                            {t === 'news' ? 'Nachricht' : t === 'offer' ? 'Angebot' : t === 'event' ? 'Event' : 'Specials'}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 text-left">Bild hinzufügen</label>
                                <div className="relative group">
                                    <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer z-10" onChange={(e) => setNewsImageFile(e.target.files?.[0] || null)} />
                                    <div className={cn("w-full aspect-[16/9] rounded-2xl border-2 border-dashed flex flex-col items-center justify-center transition-all", newsImageFile ? "border-accent bg-accent/5" : "border-slate-100 bg-slate-50")}>
                                        {newsImageFile ? <img src={URL.createObjectURL(newsImageFile)} className="w-full h-full object-cover rounded-xl" alt="Preview" /> : <ImageIcon className="text-slate-300" size={32} />}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 text-left">Was gibt es Neues?</label>
                                <textarea
                                    required
                                    rows={4}
                                    value={newPost.content}
                                    onChange={e => {
                                        setNewPost({ ...newPost, content: e.target.value });
                                        if (formErrors.content) setFormErrors({ ...formErrors, content: '' });
                                    }}
                                    placeholder="z.B. Unser Team ist bereit..."
                                    className={cn(
                                        "w-full bg-slate-50 border px-4 py-3 rounded-2xl focus:ring-2 outline-none resize-none text-slate-700 font-medium transition-colors",
                                        formErrors.content ? "border-red-500 focus:ring-red-500/20" : "border-slate-100 focus:ring-accent/20"
                                    )}
                                />
                                <div className="flex justify-between mt-1.5">
                                    {formErrors.content ? (
                                        <p className="text-[10px] font-bold text-red-500 uppercase tracking-wider">{formErrors.content}</p>
                                    ) : (
                                        <div />
                                    )}
                                    <span className={cn(
                                        "text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full transition-colors",
                                        newPost.content.length > 950 ? "bg-red-50 text-red-500" :
                                            newPost.content.length > 800 ? "bg-amber-50 text-amber-500" :
                                                "bg-slate-50 text-slate-400"
                                    )}>
                                        {newPost.content.length} / 1000
                                    </span>
                                </div>
                            </div>
                            <button disabled={isPosting} className={cn("w-full py-4 rounded-2xl font-black bg-accent text-white shadow-xl shadow-accent/20 transition-all active:scale-95 mt-2 flex items-center justify-center gap-2", isPosting && "opacity-50 cursor-not-allowed")}>
                                {isPosting ? <RefreshCw className="animate-spin" size={20} /> : "Beitrag jetzt teilen"}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {isAddingEvent && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" onClick={() => setIsAddingEvent(false)} />
                    <div className="glass relative w-full max-w-md rounded-[2.5rem] shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden">
                        <div className="p-8">
                            <div className="flex justify-between items-center mb-6 text-left">
                                <h3 className="text-xl font-black text-slate-900 uppercase italic">Event erstellen</h3>
                                <button onClick={() => setIsAddingEvent(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><X size={20} /></button>
                            </div>
                            <form onSubmit={handleAddEvent} className="space-y-5">
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 text-left">Event-Titel</label>
                                    <input
                                        required
                                        value={newEvent.title}
                                        onChange={e => {
                                            setNewEvent({ ...newEvent, title: e.target.value });
                                            if (formErrors.title) setFormErrors({ ...formErrors, title: '' });
                                        }}
                                        placeholder="z.B. Sommerfest"
                                        className={cn(
                                            "w-full bg-slate-50 border px-4 py-3 rounded-xl outline-none font-bold transition-colors",
                                            formErrors.title ? "border-red-500" : "border-slate-100"
                                        )}
                                    />
                                    {formErrors.title && <p className="text-[10px] font-bold text-red-500 mt-1 uppercase tracking-wider">{formErrors.title}</p>}
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-left">
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5">Datum & Zeit</label>
                                        <input
                                            required
                                            type="datetime-local"
                                            value={newEvent.event_date}
                                            onChange={e => {
                                                setNewEvent({ ...newEvent, event_date: e.target.value });
                                                if (formErrors.event_date) setFormErrors({ ...formErrors, event_date: '' });
                                            }}
                                            className={cn(
                                                "w-full bg-slate-50 border px-4 py-3 rounded-xl outline-none font-bold text-xs transition-colors",
                                                formErrors.event_date ? "border-red-500" : "border-slate-100"
                                            )}
                                        />
                                        {formErrors.event_date && <p className="text-[9px] font-bold text-red-500 mt-1 uppercase tracking-wider">{formErrors.event_date}</p>}
                                    </div>
                                    <div><label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5">Ort</label><input value={newEvent.location_override} onChange={e => setNewEvent({ ...newEvent, location_override: e.target.value })} placeholder="Optional" className="w-full bg-slate-50 border border-slate-100 px-4 py-3 rounded-xl outline-none font-bold text-xs" /></div>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 text-left">Beschreibung</label>
                                    <textarea
                                        required
                                        rows={3}
                                        value={newEvent.description}
                                        onChange={e => {
                                            setNewEvent({ ...newEvent, description: e.target.value });
                                            if (formErrors.description) setFormErrors({ ...formErrors, description: '' });
                                        }}
                                        className={cn(
                                            "w-full bg-slate-50 border px-4 py-3 rounded-xl outline-none resize-none font-medium text-sm transition-colors",
                                            formErrors.description ? "border-red-500" : "border-slate-100"
                                        )}
                                    />
                                    <div className="flex justify-between mt-1">
                                        {formErrors.description ? (
                                            <p className="text-[10px] font-bold text-red-500 uppercase tracking-wider">{formErrors.description}</p>
                                        ) : (
                                            <div />
                                        )}
                                        <span className={cn(
                                            "text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full transition-colors",
                                            (newEvent.description?.length || 0) > 450 ? "bg-red-50 text-red-500" :
                                                (newEvent.description?.length || 0) > 400 ? "bg-amber-50 text-amber-500" :
                                                    "bg-slate-50 text-slate-400"
                                        )}>
                                            {newEvent.description?.length || 0} / 500
                                        </span>
                                    </div>
                                </div>
                                <button className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl hover:scale-[1.02] active:scale-95 transition-all">Event veröffentlichen</button>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Bottom Nav */}
            <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-8 pt-4 bg-white/90 backdrop-blur-xl border-t border-slate-100 z-50">
                {[
                    { tab: 'dashboard', icon: BarChart2, label: 'Einblicke' },
                    { tab: 'jobs', icon: Briefcase, label: 'Jobs' },
                    { tab: 'news', icon: Newspaper, label: 'Aktuelles' },
                    { tab: 'marketing', icon: Megaphone, label: 'Marketing' },
                    { tab: 'profile', icon: User, label: 'Profil' }
                ].map((t) => (
                    <button
                        key={t.tab}
                        onClick={() => setActiveTab(t.tab as any)}
                        className={cn(
                            "flex flex-col items-center gap-1.5 transition-all duration-300 px-4 py-2 rounded-2xl",
                            activeTab === t.tab ? "text-accent bg-accent/10" : "text-slate-400"
                        )}
                    >
                        <t.icon size={24} />
                        <span className="text-[9px] font-bold tracking-widest uppercase">{t.label}</span>
                    </button>
                ))}
            </nav>
        </div>
    );
};
