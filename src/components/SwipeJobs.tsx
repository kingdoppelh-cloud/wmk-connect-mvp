import React, { useState, useEffect } from 'react';
import { SlidersHorizontal, Euro, MapPin, ArrowRight, Users, PartyPopper, Timer, Train, Dumbbell, Coins, MousePointerClick, X, Heart, RefreshCw, Briefcase, Star } from 'lucide-react';
import type { Company } from '../data/companies';
import { useJobs } from '../hooks/useJobs';
import { useSEO } from '../hooks/useSEO';

interface SwipeJobsProps {
    company: Company;
    onClose: () => void;
}

export const SwipeJobs: React.FC<SwipeJobsProps> = ({ company, onClose }) => {
    const { jobs, isLoading } = useJobs(company.id);
    const [activeIndex, setActiveIndex] = useState(0);
    const [currentJobIndex, setCurrentJobIndex] = useState(0);

    const activeJob = jobs[currentJobIndex];

    useSEO({
        title: activeJob ? `${activeJob.title} bei ${company.name}` : `Jobs bei ${company.name}`,
        description: activeJob?.description || company.description,
        image: activeJob?.image_url || company.image
    });

    const handleScroll = (e: React.UIEvent<HTMLElement>) => {
        const scrollLeft = e.currentTarget.scrollLeft;
        const width = e.currentTarget.clientWidth;
        setActiveIndex(Math.round(scrollLeft / width));
    };

    // Body scroll lock
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    if (isLoading) {
        return (
            <div className="fixed inset-0 z-[200] bg-slate-950 flex items-center justify-center">
                <RefreshCw className="text-accent animate-spin" size={40} />
            </div>
        );
    }

    if (!activeJob) {
        return (
            <div className="fixed inset-0 z-[200] bg-slate-950 flex flex-col items-center justify-center p-8 text-center">
                <X className="text-slate-700 mb-6" size={60} />
                <h3 className="text-2xl font-black text-white mb-2">Keine Jobs gefunden</h3>
                <p className="text-slate-400 mb-8">Aktuell sind für dieses Unternehmen keine offenen Stellen gemeldet.</p>
                <button onClick={onClose} className="px-8 py-4 bg-white text-slate-950 rounded-2xl font-black">Zurück zur Übersicht</button>
            </div>
        );
    }

    const handleApply = () => {
        const text = encodeURIComponent(`Hallo ${company.name}, ich habe Ihre Anzeige für "${activeJob.title}" in der WMK Connect App gesehen und interessiere mich für die Stelle!`);
        window.open(`https://wa.me/${company.whatsapp.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[200] bg-slate-950 text-slate-50 font-sans h-[100dvh] w-full overflow-hidden animate-in slide-in-from-bottom-full duration-500">
            {/* Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "JobPosting",
                    "title": activeJob.title,
                    "description": activeJob.description,
                    "datePosted": activeJob.created_at,
                    "hiringOrganization": {
                        "@type": "Organization",
                        "name": company.name,
                        "logo": company.image
                    },
                    "jobLocation": {
                        "@type": "Place",
                        "address": {
                            "@type": "PostalAddress",
                            "addressLocality": "Werra-Meißner-Kreis",
                            "addressRegion": "Hessen",
                            "addressCountry": "DE"
                        }
                    }
                })}
            </script>
            {/* Header */}
            <header className="absolute top-0 left-0 right-0 z-[100] px-6 py-6 flex justify-between items-center pointer-events-none">
                <div className="flex items-center gap-3 pointer-events-auto">
                    <button onClick={onClose} className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 text-white hover:bg-white/20 transition-colors">
                        <X size={20} />
                    </button>
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/20 bg-slate-200">
                        <img className="w-full h-full object-cover" src={company.image} alt={company.name} loading="lazy" decoding="async" />
                    </div>
                    <span className="font-black text-xl tracking-tighter uppercase drop-shadow-md">JOBSCOUT.</span>
                </div>
                <div className="flex items-center gap-2 pointer-events-auto">
                    {jobs.length > 1 && (
                        <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-[10px] font-black">
                            {currentJobIndex + 1} / {jobs.length}
                        </div>
                    )}
                    <button className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 text-white hover:bg-white/20">
                        <SlidersHorizontal size={20} />
                    </button>
                </div>
            </header>

            {/* Progress Indicators */}
            <div className="absolute top-20 left-0 right-0 z-[90] flex gap-1.5 px-6">
                {[0, 1, 2, 3].map((idx) => (
                    <div key={idx} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${activeIndex === idx ? 'bg-accent shadow-[0_0_10px_rgba(225,29,72,0.8)]' : 'bg-white/20'}`} />
                ))}
            </div>

            {/* Swiper Container */}
            <main
                className="h-full w-full flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory hide-scrollbars"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                onScroll={handleScroll}
            >
                {/* Slide 1: General Info */}
                <section className="flex-none w-full h-full relative snap-center overflow-hidden">
                    <img className="absolute inset-0 w-full h-full object-cover" src={activeJob.image_url || "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80"} alt="Job Hero" loading="lazy" decoding="async" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>

                    <div className="absolute bottom-32 left-0 right-0 px-8 flex flex-col gap-6">
                        <div className="flex items-center gap-3">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent/20 border border-accent/40 rounded-full w-fit backdrop-blur-md">
                                <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                                <span className="text-xs font-bold uppercase tracking-widest text-white">Now Hiring</span>
                            </div>
                            {activeJob.is_featured && (
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-premium border border-premium/50 rounded-full w-fit shadow-lg shadow-premium/20 scale-110">
                                    <Star size={12} className="fill-slate-900 text-slate-900" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">Top Job</span>
                                </div>
                            )}
                        </div>
                        <div>
                            <h2 className="text-5xl font-black leading-[0.9] tracking-tighter mb-2 text-white uppercase">{activeJob.title}</h2>
                            <p className="text-xl text-white/80 font-medium tracking-wide">{company.name}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-5 rounded-[2rem]">
                                <Euro className="text-accent mb-2" size={24} />
                                <p className="text-[10px] text-white/50 uppercase font-bold tracking-widest">Gehalt</p>
                                <p className="text-2xl font-black text-white">{activeJob.salary_range || 'n.A.'}</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-5 rounded-[2rem]">
                                <MapPin className="text-accent mb-2" size={24} />
                                <p className="text-[10px] text-white/50 uppercase font-bold tracking-widest">Art</p>
                                <p className="text-2xl font-black text-white truncate">{activeJob.job_type}</p>
                            </div>
                        </div>
                    </div>

                    <div className="absolute bottom-10 left-0 right-0 flex justify-center items-center gap-2 text-white/40 uppercase text-[10px] font-black tracking-[0.2em] animate-pulse">
                        <span>Swipe for Culture</span>
                        <ArrowRight size={14} className="animate-bounce-x" />
                    </div>
                </section>

                {/* Slide 2: Description */}
                <section className="flex-none w-full h-full relative snap-center bg-slate-900 overflow-hidden">
                    <div className="p-8 pt-32 h-full flex flex-col">
                        <h3 className="text-5xl font-black mb-8 leading-[0.9] text-white">DEIN<br /><span className="text-accent">JOB.</span></h3>
                        <div className="flex-1 space-y-6">
                            <div className="bg-white/5 p-8 rounded-3xl border border-white/10 relative overflow-hidden group">
                                <p className="text-lg text-white/90 leading-relaxed font-medium relative z-10 italic">
                                    "{activeJob.description}"
                                </p>
                                <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <Briefcase size={120} />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-6 mt-8">
                                <div className="flex items-start gap-5">
                                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                                        <Users className="text-accent" size={28} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg text-white mb-1">Jung & Dynamisch</h4>
                                        <p className="text-sm text-white/60 leading-relaxed font-medium">Unser Team wartet auf dich. Wir bieten flache Hierarchien und echtes Teamwork.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-5">
                                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                                        <PartyPopper className="text-accent" size={28} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg text-white mb-1">Team Events & Benefits</h4>
                                        <p className="text-sm text-white/60 leading-relaxed font-medium">Regelmäßige Events und kleine Extras machen den Unterschied.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Slide 3: Benefits (Keep static for now as they are company-wide) */}
                <section className="flex-none w-full h-full relative snap-center bg-slate-950 overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950"></div>
                    <div className="relative z-10 p-8 pt-32 h-full flex flex-col">
                        <h3 className="text-5xl font-black mb-8 leading-[0.9] text-white">WHY US?<br /><span className="text-accent">BENEFITS.</span></h3>
                        <div className="grid grid-cols-2 gap-4 flex-1 pb-16">
                            <div className="bg-white/5 backdrop-blur-xl p-6 rounded-[2.5rem] flex flex-col justify-between border-t-accent border-t-4 border border-white/5">
                                <Timer className="text-accent" size={36} />
                                <div>
                                    <p className="text-2xl font-black italic text-white drop-shadow-md">FLEXIBEL</p>
                                    <p className="text-[10px] uppercase font-bold text-white/50 tracking-widest mt-1">Arbeitszeiten</p>
                                </div>
                            </div>
                            <div className="bg-white/5 backdrop-blur-xl p-6 rounded-[2.5rem] flex flex-col justify-between border border-white/5">
                                <Train className="text-accent" size={36} />
                                <div>
                                    <p className="text-2xl font-black italic text-white drop-shadow-md">ÖPNV</p>
                                    <p className="text-[10px] uppercase font-bold text-white/50 tracking-widest mt-1">Gute Anbindung</p>
                                </div>
                            </div>
                            <div className="bg-white/5 backdrop-blur-xl p-6 rounded-[2.5rem] flex flex-col justify-between border border-white/5">
                                <Dumbbell className="text-accent" size={36} />
                                <div>
                                    <p className="text-2xl font-black italic text-white drop-shadow-md">EXTRAS</p>
                                    <p className="text-[10px] uppercase font-bold text-white/50 tracking-widest mt-1">Vergünstigungen</p>
                                </div>
                            </div>
                            <div className="bg-white/5 backdrop-blur-xl p-6 rounded-[2.5rem] flex flex-col justify-between border-b-accent border-b-4 border border-x-white/5 border-t-white/5">
                                <Coins className="text-accent" size={36} />
                                <div>
                                    <p className="text-2xl font-black italic text-white drop-shadow-md">TOP</p>
                                    <p className="text-[10px] uppercase font-bold text-white/50 tracking-widest mt-1">Bezahlung</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Slide 4: Call to Action */}
                <section className="flex-none w-full h-full relative snap-center bg-slate-950 overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute -top-32 -right-32 w-96 h-96 bg-accent rounded-full blur-[100px] animate-pulse"></div>
                        <div className="absolute -bottom-32 -left-32 w-[30rem] h-[30rem] bg-blue-600 rounded-full blur-[120px]"></div>
                    </div>

                    <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 text-center">
                        <div className="w-32 h-32 bg-white/5 rounded-[3rem] flex items-center justify-center mb-10 backdrop-blur-2xl border border-white/10 shadow-2xl">
                            <MousePointerClick className="text-white" size={56} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-6xl font-black text-white mb-6 leading-[0.9] tracking-tighter">JETZT<br />BEWERBEN.</h3>
                        <p className="text-white/60 text-lg mb-16 max-w-[280px] font-medium leading-relaxed">Sende uns einfach eine kurze Nachricht per WhatsApp. Kein Lebenslauf nötig.</p>

                        <div className="flex gap-8 items-center">
                            <button
                                onClick={jobs.length > 1 ? () => {
                                    setCurrentJobIndex((prev) => (prev + 1) % jobs.length);
                                    setActiveIndex(0); // Reset to first slide
                                } : onClose}
                                className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center text-white border border-white/10 hover:bg-white/10 transition-all group backdrop-blur-md"
                            >
                                {jobs.length > 1 ? <ArrowRight size={32} className="group-hover:translate-x-1 transition-transform" /> : <X size={32} className="opacity-70" />}
                            </button>
                            <button
                                onClick={handleApply}
                                className="w-28 h-28 rounded-full bg-white flex items-center justify-center text-accent shadow-[0_20px_80px_-15px_rgba(225,29,72,0.6)] hover:scale-105 active:scale-95 transition-all group border-[6px] border-white/5 font-black shrink-0 relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-tr from-accent to-pink-400 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                                <Heart size={56} fill="currentColor" className="group-hover:scale-110 transition-transform relative z-10 drop-shadow-md" />
                            </button>
                        </div>
                    </div>
                </section>
            </main>

            <style dangerouslySetInnerHTML={{
                __html: `
                .hide-scrollbars::-webkit-scrollbar {
                    display: none;
                }
                .animate-bounce-x {
                    animation: bounce-x 1s infinite;
                }
                @keyframes bounce-x {
                    0%, 100% {
                        transform: translateX(-25%);
                        animation-timing-function: cubic-bezier(0.8,0,1,1);
                    }
                    50% {
                        transform: none;
                        animation-timing-function: cubic-bezier(0,0,0.2,1);
                    }
                }
            `}} />
        </div>
    );
};
