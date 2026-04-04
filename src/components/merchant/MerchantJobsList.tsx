import React, { useState } from 'react';
import { Sparkles, Loader2, X, Send, CheckCircle2 } from 'lucide-react';
import { cn } from '../../utils/cn';

export const MerchantJobsList: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [jobTitle, setJobTitle] = useState('');
    const [jobDesc, setJobDesc] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleGenerateAI = async () => {
        if (!jobTitle) return;
        setIsGenerating(true);
        // Simulate AI thinking
        await new Promise(resolve => setTimeout(resolve, 2000));

        const mockDescs: Record<string, string> = {
            'Bauleiter': 'Wir suchen einen erfahrenen Bauleiter (m/w/d) zur Steuerung unserer Infrastrukturprojekte im Werra-Meißner-Kreis. Zu Ihren Aufgaben gehören die Bauüberwachung, Kostenkontrolle und Koordination von Subunternehmern.',
            'Stadtplaner': 'Als Stadtplaner (m/w/d) gestalten Sie die Zukunft unserer Region. Sie entwickeln Bebauungspläne, führen Bürgerbeteiligungen durch und arbeiten eng mit der öffentlichen Verwaltung zusammen.',
            'Anlagenmechaniker': 'Unterstützen Sie unser Team als Anlagenmechaniker (m/w/d) für Sanitär-, Heizungs- und Klimatechnik. Sie sind verantwortlich für die Montage und Wartung moderner Energiesysteme.'
        };

        const found = Object.entries(mockDescs).find(([key]) => jobTitle.toLowerCase().includes(key.toLowerCase()));
        setJobDesc(found ? found[1] : `Wir suchen einen motivierten ${jobTitle} (m/w/d) zur Verstärkung unseres Teams. Wir bieten flache Hierarchien, attraktive Vergütung und spannende Projekte in der Region.`);
        setIsGenerating(false);
    };

    return (
        <div className="pt-8 pb-12 px-6 lg:px-12 relative min-h-screen">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
                <div>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold text-slate-900 tracking-tight mb-3">Deine Stellenanzeigen</h1>
                    <p className="text-slate-500 font-medium max-w-md text-sm">Verwalte deine Jobangebote und finde die passenden Talente aus der Region.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-accent text-white px-8 py-4 rounded-2xl flex items-center gap-3 font-bold transition-all hover:bg-accent-hover hover:translate-y-[-2px] shadow-xl shadow-accent/20 active:scale-95 group"
                >
                    <span className="material-symbols-outlined group-hover:rotate-90 transition-transform">add</span>
                    <span className="tracking-wide uppercase text-xs">Job schalten</span>
                </button>
            </div>

            {/* Asymmetric Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
                <div className="md:col-span-8 bg-white/50 p-10 rounded-[2.5rem] border border-slate-100 flex items-center justify-between shadow-sm">
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-3">Aktive Stellen</p>
                        <h2 className="text-5xl font-headline font-bold text-slate-900 tracking-tighter">14</h2>
                    </div>
                    <div className="h-16 w-px bg-slate-100"></div>
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-3">Pausiert</p>
                        <h2 className="text-5xl font-headline font-bold text-slate-300 tracking-tighter">3</h2>
                    </div>
                    <div className="h-16 w-px bg-slate-100"></div>
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-3">Gesamt-Bewerber</p>
                        <h2 className="text-5xl font-headline font-bold text-accent tracking-tighter">128</h2>
                    </div>
                </div>
                <div className="md:col-span-4 bg-slate-900 p-8 rounded-[2.5rem] text-white relative overflow-hidden group shadow-2xl shadow-slate-200">
                    <div className="relative z-10">
                        <p className="text-[10px] font-bold opacity-50 uppercase tracking-[0.2em] mb-2">Eilige Besetzung</p>
                        <h3 className="text-2xl font-headline font-bold mb-6 leading-tight">Stadtplaner (m/w/d)</h3>
                        <div className="flex items-center gap-3 bg-white/10 w-fit px-4 py-2 rounded-full backdrop-blur-md">
                            <span className="material-symbols-outlined text-sm">group</span>
                            <span className="text-[10px] font-bold uppercase tracking-widest">42 Neue Bewerber</span>
                        </div>
                    </div>
                    <span className="material-symbols-outlined absolute -bottom-8 -right-6 text-white/5 text-[140px] pointer-events-none transition-transform group-hover:scale-110">trending_up</span>
                </div>
            </div>

            {/* Filter Shell */}
            <div className="bg-slate-100/50 p-1.5 rounded-2xl mb-10 flex gap-1 w-fit border border-slate-100">
                <button className="px-6 py-2.5 bg-white text-slate-900 font-bold rounded-xl shadow-sm text-xs uppercase tracking-widest">Alle</button>
                <button className="px-6 py-2.5 text-slate-400 hover:text-slate-600 font-bold transition-all text-xs uppercase tracking-widest hover:bg-white/50 rounded-xl">Aktiv</button>
                <button className="px-6 py-2.5 text-slate-400 hover:text-slate-600 font-bold transition-all text-xs uppercase tracking-widest hover:bg-white/50 rounded-xl">Pausiert</button>
            </div>

            {/* Job Listings List */}
            <div className="space-y-4">
                {/* Job Item 1 */}
                <div className="bg-white hover:border-accent/30 border border-transparent p-6 lg:px-8 rounded-3xl transition-all duration-300 flex flex-col lg:flex-row lg:items-center justify-between gap-6 group shadow-sm">
                    <div className="flex items-center gap-6 lg:w-1/3">
                        <div className="w-14 h-14 bg-accent/5 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105">
                            <span className="material-symbols-outlined text-accent text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>engineering</span>
                        </div>
                        <div>
                            <h4 className="text-lg font-bold text-slate-900 group-hover:text-accent transition-colors mb-0.5">Bauleiter Infrastruktur</h4>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Gepostet am 12. Okt 2023</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-12">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em] mb-1.5">Status</span>
                            <div className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full w-fit border border-green-100">
                                <span className="w-1.5 h-1.5 bg-green-600 rounded-full animate-pulse"></span>
                                <span className="text-[10px] font-black uppercase tracking-widest">Aktiv</span>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em] mb-1">Bewerber</span>
                            <span className="text-2xl font-bold text-slate-900">24</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 ml-auto lg:ml-0">
                        <button className="flex items-center gap-2 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 rounded-xl transition-all">
                            <span className="material-symbols-outlined text-lg">edit</span>
                            <span>Bearbeiten</span>
                        </button>
                        <button className="flex items-center gap-2 px-6 py-2 text-[10px] font-black uppercase tracking-widest bg-accent text-white hover:bg-accent-hover rounded-xl transition-all shadow-md shadow-accent/10">
                            <span className="material-symbols-outlined text-lg">visibility</span>
                            <span>Details</span>
                        </button>
                    </div>
                </div>

                {/* Job Item 2 */}
                <div className="bg-white hover:border-slate-200 border border-transparent p-6 lg:px-8 rounded-3xl transition-all duration-300 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-sm opacity-60">
                    <div className="flex items-center gap-6 lg:w-1/3">
                        <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                            <span className="material-symbols-outlined text-slate-300 text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>architecture</span>
                        </div>
                        <div>
                            <h4 className="text-lg font-bold text-slate-600 mb-0.5">Projektmanager Stadtplanung</h4>
                            <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest font-mono">Gepostet am 28. Sep 2023</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-12">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em] mb-1.5">Status</span>
                            <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 text-slate-500 rounded-full w-fit">
                                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
                                <span className="text-[10px] font-black uppercase tracking-widest">Pausiert</span>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em] mb-1">Bewerber</span>
                            <span className="text-2xl font-bold text-slate-400">18</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 ml-auto lg:ml-0">
                        <button className="flex items-center gap-2 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 rounded-xl">
                            <span className="material-symbols-outlined text-lg">edit</span>
                            <span>Bearbeiten</span>
                        </button>
                        <button className="flex items-center gap-2 px-6 py-2 text-[10px] font-black uppercase tracking-widest bg-slate-200 text-slate-600 rounded-xl transition-all">
                            <span>Vorschau</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* AI Modal Overlay */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[600] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" onClick={() => !isGenerating && setIsModalOpen(false)} />

                    <div className="relative bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 animate-in fade-in zoom-in duration-300">
                        {/* Modal Header */}
                        <div className="px-10 py-8 border-b border-slate-50 flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-headline font-bold text-slate-900">Job schalten</h2>
                                <p className="text-slate-400 text-sm font-medium">Nutze unsere KI für perfekte Beschreibungen.</p>
                            </div>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-400"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="p-10 space-y-8">
                            {/* Title Input */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Job Titel</label>
                                <input
                                    type="text"
                                    value={jobTitle}
                                    onChange={(e) => setJobTitle(e.target.value)}
                                    placeholder="z.B. Bauleiter Infrastruktur"
                                    className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-slate-900 font-medium placeholder:text-slate-300 focus:ring-2 focus:ring-accent/20 transition-all outline-none"
                                />
                            </div>

                            {/* Description with AI Assistant */}
                            <div className="space-y-2 relative">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 flex justify-between">
                                    Stellenbeschreibung
                                    <button
                                        onClick={handleGenerateAI}
                                        disabled={!jobTitle || isGenerating}
                                        className={cn(
                                            "flex items-center gap-1.5 transition-all text-xs font-bold px-3 py-1 rounded-lg",
                                            jobTitle ? "text-accent hover:bg-accent/5" : "text-slate-300 cursor-not-allowed"
                                        )}
                                    >
                                        <Sparkles size={14} className={cn(isGenerating && "animate-pulse")} />
                                        KI-Optimierung
                                    </button>
                                </label>

                                <div className="relative">
                                    <textarea
                                        value={jobDesc}
                                        onChange={(e) => setJobDesc(e.target.value)}
                                        rows={6}
                                        className="w-full bg-slate-50 border-none rounded-[1.5rem] px-6 py-5 text-slate-900 font-medium placeholder:text-slate-300 focus:ring-2 focus:ring-accent/20 transition-all outline-none resize-none leading-relaxed"
                                        placeholder="Beschreibe kurz die Rolle oder lass die KI helfen..."
                                    />

                                    {isGenerating && (
                                        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-[1.5rem] flex flex-col items-center justify-center space-y-4 animate-in fade-in duration-300">
                                            <div className="relative">
                                                <Loader2 className="w-12 h-12 text-accent animate-spin" />
                                                <Sparkles className="absolute top-0 right-0 w-4 h-4 text-orange-400 animate-bounce" />
                                            </div>
                                            <p className="text-sm font-bold text-slate-900 animate-pulse uppercase tracking-widest">KI schreibt...</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="pt-4 flex gap-4">
                                <button className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-900 py-4 rounded-2xl font-bold transition-all active:scale-95 text-sm">
                                    Als Entwurf speichern
                                </button>
                                <button
                                    onClick={() => {
                                        setIsSuccess(true);
                                        setTimeout(() => {
                                            setIsSuccess(false);
                                            setIsModalOpen(false);
                                        }, 1500);
                                    }}
                                    disabled={!jobTitle || !jobDesc}
                                    className="flex-3 bg-accent text-white py-4 px-8 rounded-2xl font-bold transition-all hover:bg-accent-hover active:scale-95 disabled:opacity-40 disabled:scale-100 flex items-center justify-center gap-3 min-w-[200px]"
                                >
                                    {isSuccess ? (
                                        <>
                                            <CheckCircle2 size={20} />
                                            Veröffentlicht!
                                        </>
                                    ) : (
                                        <>
                                            <Send size={18} />
                                            Job veröffentlichen
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* AI Tip Banner */}
                        <div className="bg-orange-50 px-10 py-5 flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                                <Sparkles size={18} />
                            </div>
                            <p className="text-xs text-orange-800 font-medium leading-relaxed">
                                <span className="font-bold block mb-0.5">Pro-Tipp vom Recruiter-Copilot:</span>
                                Anzeigen mit KI-optimierten Beschreibungen erhalten im Durchschnitt <span className="font-bold underline text-orange-950">40% mehr qualifizierte Bewerbungen</span>.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Civic Lead Component */}
            <div className="mt-20 bg-slate-900/5 p-12 lg:p-16 rounded-[3rem] relative overflow-hidden border border-slate-100">
                <div className="relative z-10 max-w-3xl">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-8 block">UNSERE PHILOSOPHIE</span>
                    <p className="text-3xl lg:text-4xl font-bold font-headline leading-[1.2] text-slate-800 italic mb-10 tracking-tight">
                        "Die Zukunft unserer Region gestalten wir gemeinsam – durch echte Begegnungen und faire Chancen für jeden."
                    </p>
                    <div className="flex items-center gap-5">
                        <div className="w-12 h-px bg-slate-200"></div>
                        <p className="text-sm font-black text-slate-900 uppercase tracking-[0.15em]">Das WMK-Connect Team</p>
                    </div>
                </div>
                <span className="material-symbols-outlined absolute -right-12 -bottom-16 text-[320px] text-slate-900/[0.03] select-none font-thin">connect_without_contact</span>
            </div>
        </div>
    );
};
