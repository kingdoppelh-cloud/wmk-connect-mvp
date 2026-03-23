import React, { useState, useEffect } from 'react';
import { Bus, Clock, MapPin, AlertCircle, RefreshCw } from 'lucide-react';
import { supabase } from '../utils/supabase';

interface TransportInfo {
    line: string;
    stop: string;
    departureMinutes: number;
    success: boolean;
}

interface Props {
    companyLat: number;
    companyLon: number;
}

export const PublicTransportCheck: React.FC<Props> = ({ companyLat, companyLon }) => {
    const [info, setInfo] = useState<TransportInfo | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const checkConnections = async () => {
        setIsLoading(true);
        setError(null);

        try {
            // 1. Get User Location
            const position = await new Promise<GeolocationPosition>((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject, {
                    timeout: 10000
                });
            });

            const { latitude: userLat, longitude: userLon } = position.coords;

            // 2. Call Supabase Edge Function
            const { data, error: funcError } = await supabase.functions.invoke('nvv-check', {
                body: { userLat, userLon, companyLat, companyLon }
            });

            if (funcError) throw funcError;
            setInfo(data);
        } catch (err: any) {
            console.error('NVV Check Error:', err);
            setError(err.message === 'User denied Geolocation'
                ? 'Standortzugriff erforderlich'
                : 'Öffis-Daten aktuell nicht verfügbar');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        checkConnections();
    }, [companyLat, companyLon]);

    if (isLoading) {
        return (
            <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 animate-pulse">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-slate-200 rounded-xl" />
                    <div className="h-4 w-32 bg-slate-200 rounded" />
                </div>
                <div className="space-y-2">
                    <div className="h-6 w-full bg-slate-200 rounded" />
                    <div className="h-4 w-2/3 bg-slate-200 rounded" />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-orange-50 border border-orange-100 rounded-3xl p-6 flex flex-col items-center text-center">
                <AlertCircle className="text-orange-400 mb-2" size={32} />
                <p className="text-sm font-bold text-orange-700 mb-4">{error}</p>
                <button
                    onClick={checkConnections}
                    className="text-xs font-black uppercase tracking-widest text-orange-600 bg-white px-4 py-2 rounded-full shadow-sm border border-orange-100"
                >
                    Erneut versuchen
                </button>
            </div>
        );
    }

    if (!info || !info.success) return null;

    return (
        <div className="bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 rounded-[2.5rem] p-8 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:rotate-12 transition-transform duration-500">
                <Bus size={120} />
            </div>

            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200">
                        <Bus size={24} />
                    </div>
                    <div>
                        <h3 className="text-lg font-black text-slate-900 uppercase italic leading-none">Öffis-Check</h3>
                        <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest">NVV Echtzeit-Daten</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Clock size={16} className="text-indigo-500" />
                            <span className="text-2xl font-black text-slate-900 leading-none">
                                {info.departureMinutes === 0 ? 'Jetzt' : `In ${info.departureMinutes} Min.`}
                            </span>
                        </div>
                        <p className="text-slate-500 text-sm font-medium">
                            Nächste Verbindung mit <span className="font-black text-indigo-600">Linie {info.line}</span>
                        </p>
                    </div>

                    <div className="flex items-center gap-2 pt-4 border-t border-indigo-50">
                        <MapPin size={14} className="text-slate-400" />
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-tight">
                            Ab {info.stop}
                        </span>
                    </div>
                </div>

                <button
                    onClick={checkConnections}
                    className="absolute bottom-8 right-8 w-10 h-10 bg-white border border-slate-100 rounded-full flex items-center justify-center shadow-sm hover:rotate-180 transition-all duration-500 active:scale-90"
                >
                    <RefreshCw size={16} className="text-slate-400" />
                </button>
            </div>
        </div>
    );
};
