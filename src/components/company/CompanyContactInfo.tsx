import React from 'react';
import { MapPin, Clock, Phone, Globe, MessageCircle, Share2 } from 'lucide-react';
import { type Company } from '../../data/companies';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { type AnalyticsEventType } from '../../types';

interface CompanyContactInfoProps {
    company: Company;
    trackEvent: (companyId: string, eventType: AnalyticsEventType, metadata?: Record<string, unknown>) => void;
    earnPoints: (pts: number, reason: string, id: string) => void;
    premiumIcon: L.Icon;
    standardIcon: L.Icon;
}

export const CompanyContactInfo: React.FC<CompanyContactInfoProps> = ({
    company,
    trackEvent,
    earnPoints,
    premiumIcon,
    standardIcon
}) => {
    return (
        <div className="space-y-8">
            {/* Contact Actions Bar */}
            <div className="flex gap-2 justify-center mb-8">
                <a
                    href={`tel:${company.phone}`}
                    onClick={() => {
                        trackEvent(company.id, 'click_phone');
                        earnPoints(3, 'interaction', company.id);
                    }}
                    className="bg-accent text-white p-3.5 rounded-2xl shadow-lg shadow-accent/25 hover:scale-105 transition-all active:scale-95"
                >
                    <Phone size={22} />
                </a>
                <a
                    href={company.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                        trackEvent(company.id, 'website_click');
                        earnPoints(3, 'interaction', company.id);
                    }}
                    className="bg-slate-900 text-white p-3.5 rounded-2xl shadow-lg shadow-slate-900/25 hover:scale-105 transition-all active:scale-95"
                >
                    <Globe size={22} />
                </a>
                <a
                    href={`https://wa.me/${company.whatsapp?.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                        trackEvent(company.id, 'whatsapp_click');
                        earnPoints(3, 'interaction', company.id);
                    }}
                    className="bg-emerald-500 text-white p-3.5 rounded-2xl shadow-lg shadow-emerald-500/25 hover:scale-105 transition-all active:scale-95"
                >
                    <MessageCircle size={22} />
                </a>
                <button
                    onClick={() => {
                        if (navigator.share) {
                            navigator.share({
                                title: company.name,
                                text: company.description,
                                url: window.location.href
                            }).then(() => {
                                earnPoints(10, 'social_share', company.id);
                            }).catch(console.error);
                        } else {
                            navigator.clipboard.writeText(window.location.href);
                            earnPoints(10, 'social_share', company.id);
                            alert('Link in Zwischenablage kopiert +10 Punkte! 📋');
                        }
                    }}
                    className="bg-slate-100 text-slate-600 p-3.5 rounded-2xl shadow-sm hover:bg-slate-200 transition-all active:scale-95 border border-slate-200"
                >
                    <Share2 size={22} />
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                {/* Location */}
                <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 text-left">
                    <h3 className="font-black text-slate-900 mb-4 flex items-center gap-2">
                        <MapPin className="text-accent" size={20} />
                        Standort
                    </h3>
                    <p className="text-slate-600 mb-4 font-medium">{company.address}</p>
                    <div className="aspect-video bg-slate-200 rounded-2xl overflow-hidden relative border border-slate-200 z-0">
                        <MapContainer
                            center={company.coordinates || [51.2721, 9.9834]}
                            zoom={15}
                            scrollWheelZoom={false}
                            className="h-full w-full z-0"
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker
                                position={company.coordinates || [51.2721, 9.9834]}
                                icon={company.isPremium ? premiumIcon : standardIcon}
                            >
                                <Popup>
                                    <div className="text-center font-bold text-sm">{company.name}</div>
                                </Popup>
                            </Marker>
                        </MapContainer>
                    </div>
                </div>

                {/* Opening Hours */}
                <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 text-left">
                    <h3 className="font-black text-slate-900 mb-4 flex items-center gap-2">
                        <Clock className="text-accent" size={20} />
                        Öffnungszeiten
                    </h3>
                    <div className="space-y-2">
                        {Object.entries(company.openingHours).map(([day, hours]) => {
                            const days = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
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
        </div>
    );
};
