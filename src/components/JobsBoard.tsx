import React, { useState, useMemo } from 'react';
import { Briefcase, MapPin, Search, Heart, Star, Info } from 'lucide-react';
import { type Job, type MagicResult } from '../types'; import { useJobs } from '../hooks/useJobs';
import { useUI } from '../context/UIContext';
import { MagicSearch } from './MagicSearch';
import { TopMatches } from './TopMatches';
import { CompanyCardSkeleton } from './ui/Skeleton';

const getDistanceData = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

interface JobsBoardProps {
    onCompanyClick?: (id: string | null) => void;
    userLocation?: [number, number] | null;
    onLocationRequest?: () => void;
}

export const JobsBoard: React.FC<JobsBoardProps> = ({ onCompanyClick, userLocation, onLocationRequest }) => {
    const { setShowPartnerBenefits } = useUI();
    const { jobs, isLoading } = useJobs();
    const [selectedRadius, setSelectedRadius] = useState<number>(9999);
    const [magicResults, setMagicResults] = useState<MagicResult[] | null>(null);

    const jobsWithDistance = useMemo(() => {
        return jobs.map(job => {
            let distance: number | undefined;
            if (userLocation && job.company?.coordinates) {
                const [lat, lon] = job.company.coordinates;
                distance = getDistanceData(userLocation[0], userLocation[1], lat, lon);
            }
            return { ...job, distance };
        });
    }, [jobs, userLocation]);

    const filteredJobs = useMemo(() => {
        if (magicResults) {
            const resultIds = magicResults.map(r => r.id);
            return jobsWithDistance
                .filter(j => resultIds.includes(j.id))
                .sort((a, b) => {
                    const simA = magicResults.find(r => r.id === a.id)?.similarity || 0;
                    const simB = magicResults.find(r => r.id === b.id)?.similarity || 0;
                    return simB - simA;
                });
        }

        return jobsWithDistance.filter(job => {
            if (userLocation && job.distance !== undefined) {
                return job.distance <= selectedRadius;
            }
            return true;
        }).sort((a, b) => {
            if (userLocation && a.distance !== undefined && b.distance !== undefined) {
                return a.distance - b.distance;
            }
            return 0;
        });
    }, [jobsWithDistance, magicResults, selectedRadius, userLocation]);

    const handleApply = (job: Job) => {
        if (!job.company?.whatsapp) return;
        const text = encodeURIComponent(`Hallo ${job.company.name}, ich habe Ihre Anzeige für "${job.title}" in der WMK Connect App gesehen und interessiere mich für die Stelle!`);
        window.open(`https://wa.me/${job.company.whatsapp.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
    };

    if (isLoading) {
        return (
            <div className="space-y-8">
                <header className="px-6 mb-6 mt-4">
                    <div className="h-4 w-32 bg-slate-100 rounded-full mb-3 animate-pulse" />
                    <div className="h-10 w-48 bg-slate-100 rounded-xl mb-2 animate-pulse" />
                    <div className="h-4 w-64 bg-slate-100 rounded-lg animate-pulse" />
                </header>
                <div className="flex flex-col gap-6 px-4">
                    <CompanyCardSkeleton />
                    <CompanyCardSkeleton />
                    <CompanyCardSkeleton />
                </div>
            </div>
        );
    }

    if (filteredJobs.length === 0) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center p-12 text-center bg-slate-50">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-8 shadow-xl">
                    <Search className="text-slate-300" size={48} />
                </div>
                <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tighter uppercase italic">Keine Jobs gefunden</h2>
                <p className="text-slate-500 mb-10 max-w-sm">Aktuell sind keine offenen Stellen für diese Suchkriterien gemeldet.</p>
                {userLocation && selectedRadius < 9999 && (
                    <button
                        onClick={() => setSelectedRadius(9999)}
                        className="mb-8 font-bold text-accent px-4 py-2 bg-accent/10 rounded-full"
                    >
                        Suchradius aufheben
                    </button>
                )}

                <div className="w-full bg-white p-8 rounded-[2.5rem] shadow-2xl border border-slate-100 flex flex-col items-center">
                    <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center mb-6">
                        <Star className="text-accent" size={24} />
                    </div>
                    <h3 className="text-xl font-black text-slate-900 mb-2">Du bist Unternehmer?</h3>
                    <p className="text-slate-500 text-sm mb-6">Präsentiere deine Stellenanzeigen dort, wo deine Zielgruppe sucht.</p>
                    <button
                        onClick={() => setShowPartnerBenefits(true)}
                        className="w-full py-4 bg-slate-950 text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-105 active:scale-95 transition-all"
                    >
                        Jetzt Job posten
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="pb-10 pt-6 animate-in fade-in duration-700">
            <header className="px-6 mb-6 mt-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 border border-accent/20 rounded-full mb-3">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-accent">Live Recruiting</span>
                </div>
                <h1 className="text-4xl font-black text-slate-900 leading-none tracking-tighter uppercase italic">
                    Regionale <br /> <span className="text-accent">Chancen.</span>
                </h1>
                <p className="text-slate-500 font-medium mt-2">Finde deinen nächsten Job im WMK.</p>

                <div className="mt-8">
                    <MagicSearch
                        type="jobs"
                        onResults={(results) => setMagicResults(results)}
                        onClear={() => setMagicResults(null)}
                    />
                </div>

                <div className="mt-2 flex gap-2">
                    <button
                        onClick={onLocationRequest}
                        className={`whitespace-nowrap px-5 py-3 rounded-full text-xs font-bold transition-all duration-300 shadow-sm border flex items-center gap-1.5 ${userLocation
                            ? "bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-900/20"
                            : "bg-white text-slate-700 border-gray-100 hover:bg-gray-50"
                            }`}
                    >
                        <MapPin size={14} className={userLocation ? "text-accent" : ""} />
                        GPS verwenden
                    </button>
                    {userLocation && (
                        <select
                            value={selectedRadius}
                            onChange={(e) => setSelectedRadius(Number(e.target.value))}
                            className="bg-white border border-gray-100 text-slate-700 text-xs font-bold py-3 pl-4 pr-8 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-accent/20 cursor-pointer appearance-none shrink-0"
                            style={{ backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`, backgroundPosition: `right 10px center`, backgroundRepeat: `no-repeat`, backgroundSize: `14px 14px` }}
                            aria-label="Suchradius wählen"
                        >
                            <option value={9999}>Überall</option>
                            <option value={5}>Max. 5 km</option>
                            <option value={15}>Max. 15 km</option>
                            <option value={30}>Max. 30 km</option>
                            <option value={50}>Max. 50 km</option>
                        </select>
                    )}
                </div>
            </header>

            <div className="px-6 mb-8">
                <TopMatches onCompanyClick={onCompanyClick} />
            </div>

            <div className="flex flex-col gap-6 px-4">
                {filteredJobs.map((job) => (
                    <div
                        key={job.id}
                        className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-100 active:scale-[0.98]"
                    >
                        <div className="relative h-64 overflow-hidden">
                            <img
                                src={job.image_url || 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80'}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                alt={job.title}
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                            <div className="absolute top-6 right-6">
                                <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/30 text-white text-xs font-black uppercase tracking-wider">
                                    {job.job_type}
                                </div>
                            </div>
                            <div className="absolute bottom-6 left-6 right-6 flex items-center gap-4">
                                <button
                                    onClick={() => job.company_id && onCompanyClick?.(job.company_id)}
                                    className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-white/50 shadow-lg bg-white shrink-0 hover:border-white transition-colors"
                                >
                                    <img src={job.company?.image} className="w-full h-full object-cover" alt={job.company?.name} loading="lazy" />
                                </button>
                                <div className="min-w-0">
                                    <button
                                        onClick={() => job.company_id && onCompanyClick?.(job.company_id)}
                                        className="text-white/70 text-[10px] font-black uppercase tracking-widest truncate hover:text-white block"
                                    >
                                        {job.company?.name}
                                    </button>
                                    <h3 className="text-white text-2xl font-black leading-[1.1] line-clamp-2 uppercase italic mb-1">{job.title}</h3>
                                </div>
                            </div>
                        </div>

                        <div className="p-8">
                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100 flex flex-col justify-center">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Gehalt</span>
                                    </div>
                                    <p className="text-lg font-black text-slate-900 truncate">
                                        {job.salary_range?.replace(/(EUR|Euro|€)/g, ' €').replace(/\s+/g, ' ').trim() || 'n.A.'}
                                    </p>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100 flex flex-col justify-center">
                                    <div className="flex items-center gap-2 mb-1">
                                        <MapPin className="text-accent" size={16} />
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Bereich</span>
                                    </div>
                                    <p className="text-lg font-black text-slate-900 truncate">{job.category}</p>
                                </div>
                            </div>

                            <p className="text-slate-600 text-sm leading-relaxed mb-8 line-clamp-3">
                                {job.description}
                            </p>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => handleApply(job)}
                                    className="flex-1 bg-slate-950 text-white h-16 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-slate-800 transition-colors shadow-lg active:scale-95 duration-200"
                                >
                                    <div className="flex items-center justify-center gap-3">
                                        <Heart size={20} fill="currentColor" className="text-secondary" />
                                        <span>Schnell-Bewerben</span>
                                    </div>
                                </button>
                                <button className="w-16 h-16 bg-slate-100 text-slate-900 rounded-[1.5rem] flex items-center justify-center hover:bg-slate-200 transition-colors shadow-sm active:scale-95 duration-200">
                                    <Info size={24} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Sell Banner for Merchants */}
                <div className="mt-6 mb-10 bg-gradient-to-br from-accent/5 to-accent/10 p-8 rounded-[3rem] border border-accent/10 relative overflow-hidden group">
                    <div className="absolute -right-10 -bottom-10 opacity-10 rotate-12 group-hover:rotate-0 transition-transform duration-700">
                        <Briefcase size={180} />
                    </div>
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                            <Star className="text-accent" size={24} />
                        </div>
                        <h3 className="text-2xl font-black text-slate-950 mb-3 tracking-tighter uppercase italic">Hier inserieren.</h3>
                        <p className="text-slate-600 text-sm font-medium mb-6 leading-relaxed max-w-[220px]">Schalte jetzt deine Stellenanzeige und erreiche tausende lokale Nutzer.</p>
                        <button
                            onClick={() => setShowPartnerBenefits(true)}
                            className="bg-accent text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:scale-105 transition-all active:scale-95"
                        >
                            Angebot sichern
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
