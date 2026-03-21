import React, { useState } from 'react';
import {
    ArrowLeft,
    Phone,
    Mail,
    Globe,
    MessageCircle,
    MapPin,
    Clock,
    Star,
    BadgeCheck,
    BarChart2,
    ArrowRight,
    Briefcase
} from 'lucide-react';
import { type Company } from '../data/companies';
import { LeadCaptureModal } from './LeadCaptureModal';

interface Props {
    company: Company;
    onBack: () => void;
}

export const CompanyDetail: React.FC<Props> = ({ company, onBack }) => {
    const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);

    return (
        <div className="bg-white min-h-screen animate-in fade-in slide-in-from-right duration-500 pb-20">
            {/* Hero Image */}
            <div className="relative h-72 w-full overflow-hidden">
                <img
                    src={company.image || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000"}
                    alt={company.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Back Button */}
                <button
                    onClick={onBack}
                    className="absolute top-6 left-6 p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-all border border-white/30"
                >
                    <ArrowLeft size={24} />
                </button>

                {/* Header Info (Overlay) */}
                <div className="absolute bottom-6 left-6 right-6 text-white">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="px-2.5 py-1 bg-accent text-[10px] font-black uppercase tracking-widest rounded-md">
                            {company.category}
                        </span>
                        {company.isPremium && (
                            <div className="flex items-center gap-1 px-2.5 py-1 bg-premium text-gray-900 text-[10px] font-black uppercase tracking-widest rounded-md">
                                <Star size={10} className="fill-current" />
                                Premium
                            </div>
                        )}
                    </div>
                    <h1 className="text-4xl font-black leading-tight drop-shadow-lg">{company.name}</h1>
                </div>
            </div>

            {/* Content Area */}
            <div className="px-6 -mt-4 relative z-10">
                {/* Action Card */}
                <div className="bg-white rounded-3xl shadow-2xl p-6 border border-gray-100 flex flex-wrap gap-4 justify-between items-center mb-8">
                    <div className="flex -space-x-2 items-center">
                        <div className="w-12 h-12 flex items-center justify-center bg-gray-50 text-gray-400 rounded-full border border-gray-100">
                            <Star size={20} />
                        </div>
                        {!company.isPremium && (
                            <button
                                onClick={() => setIsClaimModalOpen(true)}
                                className="ml-4 pl-4 text-sm font-bold text-accent hover:text-accent/80 transition-colors flex items-center gap-1.5"
                            >
                                <BadgeCheck size={16} />
                                Profil übernehmen
                            </button>
                        )}
                    </div>

                    <div className="flex gap-3">
                        <a
                            href={`tel:${company.phone}`}
                            className="bg-accent text-white p-4 rounded-2xl shadow-lg shadow-accent/25 hover:scale-105 transition-all active:scale-95"
                        >
                            <Phone size={24} />
                        </a>
                        <a
                            href={company.websiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-slate-900 text-white p-4 rounded-2xl shadow-lg shadow-slate-900/25 hover:scale-105 transition-all active:scale-95"
                        >
                            <Globe size={24} />
                        </a>
                        <a
                            href={`https://wa.me/${company.whatsapp}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-emerald-500 text-white p-4 rounded-2xl shadow-lg shadow-emerald-500/25 hover:scale-105 transition-all active:scale-95"
                        >
                            <MessageCircle size={24} />
                        </a>
                    </div>
                </div>

                {/* Merchant Dashboard Preview Trigger (Demo) */}
                {company.isPremium && (
                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 shadow-xl border border-slate-700 mb-8 relative overflow-hidden group hover:shadow-2xl transition-all">
                        <div className="relative z-10">
                            <div className="bg-white/10 w-fit p-3 rounded-2xl backdrop-blur-md mb-4 border border-white/10 group-hover:bg-accent/20 transition-colors">
                                <BarChart2 className="text-accent" size={24} />
                            </div>
                            <h3 className="font-black text-white text-xl">Merchant Dashboard</h3>
                            <p className="text-sm text-slate-400 mt-2 mb-6 font-medium leading-relaxed">
                                Verwalten Sie Ihr Profil, prüfen Sie Livestatistiken und posten Sie neue lokale Jobs.
                            </p>
                            <button
                                onClick={() => window.dispatchEvent(new CustomEvent('open-merchant', { detail: company.id }))}
                                className="w-full bg-accent text-white font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(225,29,72,0.2)] hover:bg-pink-600 transition-colors flex items-center justify-center gap-2"
                            >
                                Ansicht öffnen <ArrowRight size={18} />
                            </button>
                        </div>
                        <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-accent/20 rounded-full blur-3xl transition-transform group-hover:scale-150 duration-700"></div>
                    </div>
                )}

                {/* About Section */}
                <section className="mb-10">
                    <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
                        <span className="w-8 h-1 bg-accent rounded-full" />
                        Über uns
                    </h2>
                    <p className="text-slate-600 leading-relaxed text-lg">
                        {company.descriptionLong || company.description}
                    </p>
                </section>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                    {/* Location */}
                    <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                        <h3 className="font-black text-slate-900 mb-4 flex items-center gap-2">
                            <MapPin className="text-accent" size={20} />
                            Standort
                        </h3>
                        <p className="text-slate-600 mb-4 font-medium">{company.address}</p>
                        {/* Placeholder for Map Mini-View */}
                        <div className="aspect-video bg-slate-200 rounded-2xl overflow-hidden relative">
                            <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-xs text-center px-4 italic">
                                Interaktive Karte folgt in Phase 2
                            </div>
                        </div>
                    </div>

                    {/* Opening Hours */}
                    <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                        <h3 className="font-black text-slate-900 mb-4 flex items-center gap-2">
                            <Clock className="text-accent" size={20} />
                            Öffnungszeiten
                        </h3>
                        <div className="space-y-2">
                            {Object.entries(company.openingHours).map(([day, hours]) => {
                                const days = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
                                // The data uses 0 for Sunday
                                const dayIdx = parseInt(day);
                                const dayName = dayIdx === 0 ? "So" : days[dayIdx - 1];

                                return (
                                    <div key={day} className="flex justify-between text-sm">
                                        <span className="font-bold text-slate-500">{dayName}</span>
                                        <span className={`font-black ${hours === 'RUHETAG' ? 'text-accent' : 'text-slate-800'}`}>
                                            {hours}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Gallery */}
                {company.gallery && company.gallery.length > 0 && (
                    <section className="mb-10">
                        <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
                            <span className="w-8 h-1 bg-accent rounded-full" />
                            Impressionen
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            {company.gallery.map((url, idx) => (
                                <div key={idx} className="aspect-square rounded-3xl overflow-hidden border border-gray-100 shadow-sm transition-transform hover:scale-[1.02]">
                                    <img src={url} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Swipe Jobs Trigger */}
                {company.isPremium && (
                    <div
                        onClick={() => window.dispatchEvent(new CustomEvent('open-swipe-jobs', { detail: company.id }))}
                        className="bg-slate-900 rounded-[40px] p-8 shadow-2xl relative overflow-hidden mb-10 group cursor-pointer hover:shadow-accent/20 transition-all border border-slate-800"
                    >
                        <div className="relative z-10 flex items-center justify-between">
                            <div>
                                <div className="bg-white/10 w-fit p-3 rounded-2xl backdrop-blur-md mb-4 border border-white/10 text-white">
                                    <Briefcase size={24} />
                                </div>
                                <h3 className="font-black text-white text-2xl mb-1">Wir stellen ein!</h3>
                                <p className="text-slate-300 font-medium text-sm">Finde deinen Traumjob und bewirb dich mit einem Swipe.</p>
                            </div>
                            <div className="w-16 h-16 rounded-full bg-accent text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform shrink-0 ml-4">
                                <ArrowRight size={28} />
                            </div>
                        </div>
                        <div className="absolute -right-12 -top-12 w-48 h-48 bg-accent/30 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                )}

                {/* Contact Footer */}
                <section className="bg-slate-900 text-white p-8 rounded-[40px] shadow-2xl relative overflow-hidden">
                    <div className="relative z-10 text-center">
                        <h2 className="text-2xl font-black mb-4">Noch Fragen?</h2>
                        <p className="text-slate-400 mb-8">Kontaktieren Sie uns direkt per E-Mail oder rufen Sie uns an.</p>
                        <div className="flex flex-col gap-3">
                            <a
                                href={`mailto:${company.email || 'hello@wmk-connect.de'}`}
                                className="flex items-center justify-center gap-3 bg-white text-slate-900 py-4 rounded-2xl font-black hover:bg-accent hover:text-white transition-all shadow-xl"
                            >
                                <Mail size={20} />
                                E-Mail schreiben
                            </a>
                            <a
                                href={`tel:${company.phone}`}
                                className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-md text-white py-4 rounded-2xl font-black hover:bg-white/20 transition-all border border-white/20"
                            >
                                <Phone size={20} />
                                Jetzt anrufen
                            </a>
                        </div>
                    </div>
                    {/* Decorative star */}
                    <Star className="absolute -bottom-10 -right-10 text-white/5 rotate-12" size={160} />
                </section>
            </div>

            <LeadCaptureModal
                isOpen={isClaimModalOpen}
                onClose={() => setIsClaimModalOpen(false)}
                leadType="claim_profile"
                prefilledCompanyName={company.name}
                claimedCompanyId={company.id}
            />
        </div>
    );
};
