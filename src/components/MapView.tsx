import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { companies } from '../data/companies';

// Fix for Leaflet default icon issues in React
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as any)._getIconUrl;
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

const BSA_CENTER: [number, number] = [51.2721, 9.9834];

export const MapView: React.FC = () => {
    return (
        <div className="h-[calc(100vh-140px)] w-full relative">
            <MapContainer
                center={BSA_CENTER}
                zoom={15}
                scrollWheelZoom={true}
                className="h-full w-full"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {companies.map(company => (
                    <Marker
                        key={company.id}
                        position={company.coordinates}
                        icon={company.isPremium ? premiumIcon : standardIcon}
                    >
                        <Popup className="custom-popup">
                            <div className="p-1">
                                <span className="text-[10px] font-bold text-accent uppercase block mb-1">
                                    {company.category}
                                </span>
                                <h4 className="font-extrabold text-sm">{company.name}</h4>
                                <p className="text-xs text-gray-500 mb-3">{company.address}</p>
                                <a
                                    href={company.websiteUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block text-center bg-gray-900 text-white py-2 px-4 rounded-lg text-xs font-bold"
                                >
                                    Website besuchen
                                </a>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};
