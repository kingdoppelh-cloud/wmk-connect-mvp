import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Compass, Target, Info } from 'lucide-react';
import { cn } from '../utils/cn';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { type Company } from '../data/companies';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

interface IconDefaultPrivate {
    _getIconUrl?: string;
}

delete (L.Icon.Default.prototype as L.Icon.Default & IconDefaultPrivate)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

// Custom Premium Icon
const premiumIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    className: 'premium-pin'
});

const standardIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const BSA_CENTER: [number, number] = [51.2721, 9.9834];

/** Helper component to control map center */
const MapController: React.FC<{ center: [number, number], trigger: number }> = ({ center, trigger }) => {
    const map = useMap();
    React.useEffect(() => {
        if (trigger > 0) {
            map.setView(center, 15, { animate: true });
        }
    }, [trigger, center, map]);
    return null;
};

interface Props {
    companies: Company[];
    onSelectCompany: (id: string) => void;
}

const CATEGORIES = ["Alle", "Gastro", "Handwerk", "Shopping", "Dienstleistung", "Gesundheit"];

export const MapView: React.FC<Props> = ({ companies, onSelectCompany }) => {
    const [selectedCategory, setSelectedCategory] = useState("Alle");
    const [resetTrigger, setResetTrigger] = useState(0);

    const filteredCompanies = companies.filter(c => {
        const hasCoords = c.coordinates && c.coordinates[0] !== 0 && c.coordinates[1] !== 0;
        const matchesCat = selectedCategory === "Alle" || c.category === selectedCategory;
        return hasCoords && matchesCat;
    });

    return (
        <div className="h-[calc(100vh-140px)] w-full relative overflow-hidden rounded-t-[3rem]">
            {/* Floating Filter Bar */}
            <div className="absolute top-6 left-0 right-0 z-[1000] px-4 flex justify-center pointer-events-none">
                <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar pointer-events-auto glass-dark bg-slate-900/80 p-2 rounded-2xl shadow-2xl border border-white/10 max-w-full">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={cn(
                                "whitespace-nowrap px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                                selectedCategory === cat
                                    ? "bg-accent text-white shadow-lg shadow-accent/25"
                                    : "text-slate-400 hover:text-white hover:bg-white/5"
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Map Centering Button */}
            <button
                onClick={() => setResetTrigger(prev => prev + 1)}
                className="absolute bottom-10 right-6 z-[1000] bg-white text-slate-900 w-14 h-14 rounded-2xl shadow-2xl border border-slate-100 flex items-center justify-center hover:bg-accent hover:text-white transition-all active:scale-90 group"
            >
                <Target size={24} className="group-hover:scale-110 transition-transform" />
            </button>

            <MapContainer
                center={BSA_CENTER}
                zoom={15}
                scrollWheelZoom={true}
                className="h-full w-full"
                preferCanvas={true}
            >
                <MapController center={BSA_CENTER} trigger={resetTrigger} />
                <TileLayer
                    attribution='&copy; OpenStreetMap'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {filteredCompanies.map(company => (
                    <Marker
                        key={company.id}
                        position={company.coordinates}
                        icon={company.isPremium ? premiumIcon : standardIcon}
                    >
                        <Popup className="custom-popup">
                            <div className="p-1 min-w-[200px]">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="bg-accent/10 text-accent text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full">
                                        {company.category}
                                    </span>
                                    {company.isPremium && <span className="bg-amber-100 text-amber-600 text-[9px] font-black uppercase px-2 py-0.5 rounded-full">Premium</span>}
                                </div>
                                <h4 className="font-black text-slate-900 text-base leading-tight mb-1">{company.name}</h4>
                                <p className="text-xs text-slate-500 font-medium mb-4">{company.address}</p>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => onSelectCompany(company.id)}
                                        className="flex-1 bg-slate-900 text-white py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-accent transition-colors flex items-center justify-center gap-1.5"
                                    >
                                        <Info size={12} /> Profil
                                    </button>
                                    <a
                                        href={`https://www.google.com/maps/dir/?api=1&destination=${company.coordinates[0]},${company.coordinates[1]}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 bg-slate-100 text-slate-600 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-colors flex items-center justify-center gap-1.5"
                                    >
                                        Route
                                    </a>
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>

            {/* Hint Overlay */}
            <div className="absolute bottom-10 left-6 z-[1000] flex items-center gap-2 bg-slate-900/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 pointer-events-none">
                <Compass size={14} className="text-accent animate-pulse" />
                <span className="text-[9px] font-bold text-white uppercase tracking-[0.2em]">{filteredCompanies.length} Betriebe gefunden</span>
            </div>
        </div>
    );
};
