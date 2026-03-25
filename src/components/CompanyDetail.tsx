import React, { useState, useEffect } from 'react';
import { Phone, Mail, BarChart2, ArrowRight } from 'lucide-react';
import { type Company } from '../data/companies';
import { LeadCaptureModal } from './LeadCaptureModal';
import { useSEO } from '../hooks/useSEO';
import { useEvents } from '../hooks/useEvents';
import { useAnalytics } from '../hooks/useAnalytics';
import { useRewards } from '../hooks/useRewards';
import { useFollows } from '../hooks/useFollows';
import { PublicTransportCheck } from './PublicTransportCheck';

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Sub-components
import { CompanyHeader } from './company/CompanyHeader';
import { CompanyContactInfo } from './company/CompanyContactInfo';
import { CompanyJobsSection } from './company/CompanyJobsSection';
import { CompanyNewsSection } from './company/CompanyNewsSection';

// Custom Icons for Map
const premiumIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const standardIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

interface Props {
    company: Company;
    onBack: () => void;
    allCompanies?: Company[];
    onSelectCompany?: (id: string) => void;
}

export const CompanyDetail: React.FC<Props> = ({ company, onBack, allCompanies = [], onSelectCompany }) => {
    const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
    const { isFollowed, followerCount, toggleFollow } = useFollows(company.id);
    const { earnPoints } = useRewards();
    const { trackEvent } = useAnalytics();

    useSEO({
        title: company.name,
        description: company.description,
        image: company.image
    });

    useEffect(() => {
        if (company) {
            trackEvent(company.id, 'profile_view');
            earnPoints(1, 'profile_view', company.id);
        }
    }, [company, earnPoints, trackEvent]);

    return (
        <div className="bg-white min-h-screen animate-in fade-in slide-in-from-right duration-500 pb-20 font-sans">
            {/* Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "LocalBusiness",
                    "name": company.name,
                    "description": company.description,
                    "image": company.image,
                    "address": {
                        "@type": "PostalAddress",
                        "streetAddress": company.address
                    },
                    "telephone": company.phone,
                    "url": company.websiteUrl
                })}
            </script>

            <CompanyHeader
                company={company}
                onBack={onBack}
                isFollowed={isFollowed}
                followerCount={followerCount}
                toggleFollow={toggleFollow}
            />

            {/* Content Area */}
            <div className="px-6 mt-8 relative z-10">

                {/* Merchant Dashboard Preview Trigger (Demo) */}
                {company.isPremium && (
                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 shadow-xl border border-slate-700 mb-8 relative overflow-hidden group hover:shadow-2xl transition-all">
                        <div className="relative z-10 text-left">
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

                {/* NVV Public Transport Check */}
                {company.coordinates && (
                    <div className="mb-8">
                        <PublicTransportCheck
                            companyLat={company.coordinates[0]}
                            companyLon={company.coordinates[1]}
                        />
                    </div>
                )}

                {/* About Section */}
                <section className="mb-10 text-left">
                    <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
                        <span className="w-8 h-1 bg-accent rounded-full" />
                        Über uns
                    </h2>
                    <p className="text-slate-600 leading-relaxed text-lg">
                        {company.descriptionLong || company.description}
                    </p>
                </section>

                {/* News & Updates Section */}
                <CompanyNewsSection companyId={company.id} />

                {/* Details Grid (Contact & Hours) */}
                <CompanyContactInfo
                    company={company}
                    trackEvent={trackEvent}
                    earnPoints={earnPoints}
                    premiumIcon={premiumIcon}
                    standardIcon={standardIcon}
                />

                {/* Gallery */}
                {company.gallery && company.gallery.length > 0 && (
                    <section className="mb-10 text-left">
                        <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
                            <span className="w-8 h-1 bg-accent rounded-full" />
                            Impressionen
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            {company.gallery.map((url, idx) => (
                                <div key={idx} className="aspect-square rounded-3xl overflow-hidden border border-gray-100 shadow-sm transition-transform hover:scale-[1.02]">
                                    <img src={url} alt={`Gallery ${idx}`} loading="lazy" className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Swipe Jobs Section */}
                <CompanyJobsSection company={company} trackEvent={trackEvent} />

                {/* Upcoming Events Section */}
                <EventsSection companyId={company.id} />

                {/* Contact Footer */}
                <section className="bg-slate-900 text-white p-8 rounded-[40px] shadow-2xl relative overflow-hidden">
                    <div className="relative z-10 text-center">
                        <h2 className="text-2xl font-black mb-4">Noch Fragen?</h2>
                        <p className="text-slate-400 mb-8">Kontaktieren Sie uns direkt per E-Mail oder rufen Sie uns an.</p>
                        <div className="flex flex-col gap-3">
                            <a
                                href={`mailto:${company.email || 'hello@wmk-connect.de'}`}
                                onClick={() => trackEvent(company.id, 'email_click')}
                                className="flex items-center justify-center gap-3 bg-white text-slate-900 py-4 rounded-2xl font-black hover:bg-accent hover:text-white transition-all shadow-xl"
                            >
                                <Mail size={20} />
                                E-Mail schreiben
                            </a>
                            <a
                                href={company.phone ? `tel:${company.phone}` : '#'}
                                onClick={() => company.phone && trackEvent(company.id, 'click_phone')}
                                className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-md text-white py-4 rounded-2xl font-black hover:bg-white/20 transition-all border border-white/20"
                            >
                                <Phone size={20} />
                                Jetzt anrufen
                            </a>
                        </div>
                    </div>
                </section>

                {/* Nearby Partners Section */}
                {allCompanies.length > 1 && (
                    <section className="mt-12 mb-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 text-left">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="p-2 bg-accent/10 rounded-xl text-accent">
                                <ArrowRight size={20} className="rotate-90" />
                            </div>
                            <h2 className="text-xl font-black text-slate-900">Partner in der Nähe</h2>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            {allCompanies
                                .filter(c => c.id !== company.id)
                                .sort((a, b) => (a.distance || 999) - (b.distance || 999))
                                .slice(0, 3)
                                .map(nearby => (
                                    <div
                                        key={nearby.id}
                                        onClick={() => onSelectCompany?.(nearby.id)}
                                        className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4 cursor-pointer hover:border-accent/30 transition-all active:scale-[0.98]"
                                    >
                                        <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-slate-50">
                                            <img src={nearby.image} alt={nearby.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-bold text-slate-900 truncate">{nearby.name}</h4>
                                            <p className="text-xs text-slate-400 truncate">{nearby.category}</p>
                                        </div>
                                        <ArrowRight size={16} className="text-slate-300 mr-2" />
                                    </div>
                                ))
                            }
                        </div>
                    </section>
                )}
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

// Internal sub-component for events (kept here or can be moved to its own file)
import { Users, Clock, MapPin, Calendar } from 'lucide-react';
import { cn } from '../utils/cn';

const EventsSection: React.FC<{ companyId: string }> = ({ companyId }) => {
    const { events, isLoading, toggleRSVP } = useEvents(companyId);
    const { earnPoints } = useRewards();

    if (isLoading || events.length === 0) return null;

    const upcomingEvents = events.filter(e => new Date(e.event_date) >= new Date());
    if (upcomingEvents.length === 0) return null;

    return (
        <section className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 text-left">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent">
                        <Calendar size={24} />
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-slate-900 uppercase italic">Anstehende Events</h3>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Dabei sein & Entdecken</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {upcomingEvents.map(event => (
                    <div key={event.id} className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-xl shadow-slate-900/5 group hover:shadow-2xl transition-all duration-500 flex flex-col">
                        <div className="flex-1">
                            <h4 className="text-lg font-black text-slate-900 mb-2 group-hover:text-accent transition-colors">{event.title}</h4>
                            <p className="text-slate-500 text-sm font-medium line-clamp-2 mb-6">{event.description}</p>

                            <div className="space-y-2 mb-6">
                                <div className="flex items-center gap-2 text-slate-600">
                                    <Clock size={14} className="text-accent" />
                                    <span className="text-xs font-bold uppercase tracking-tight">
                                        {new Date(event.event_date).toLocaleDateString('de-DE', {
                                            weekday: 'short',
                                            day: '2-digit',
                                            month: 'long',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </span>
                                </div>
                                {event.location_override && (
                                    <div className="flex items-center gap-2 text-slate-600">
                                        <MapPin size={14} className="text-accent" />
                                        <span className="text-xs font-bold uppercase tracking-tight">{event.location_override}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-50">
                            <div className="flex items-center gap-1.5 text-slate-400">
                                <Users size={14} />
                                <span className="text-[10px] font-black uppercase tracking-widest">{event.attendee_count} Zusagen</span>
                            </div>
                            <button
                                onClick={() => {
                                    toggleRSVP(event.id, event.user_status || 'none');
                                    if (event.user_status !== 'attending') {
                                        earnPoints(5, 'rsvp', companyId);
                                    }
                                }}
                                className={cn(
                                    "px-6 py-2.5 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all active:scale-95 shadow-sm",
                                    event.user_status === 'attending'
                                        ? "bg-emerald-500 text-white shadow-emerald-500/20"
                                        : "bg-slate-900 text-white shadow-slate-900/20"
                                )}
                            >
                                {event.user_status === 'attending' ? "Zusage aktiv" : "Ich bin dabei"}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
