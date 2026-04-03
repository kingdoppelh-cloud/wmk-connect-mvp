import React from 'react';
import { Building2, CheckCircle2, Network } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const BusinessRegistration: React.FC = () => {
    const navigate = useNavigate();

    return (
        <section className="grid md:grid-cols-5 gap-8 items-center">
            <div className="md:col-span-3 bg-surface-container-high dark:bg-slate-800 p-8 md:p-12 rounded-xl">
                <div className="flex items-start gap-6">
                    <div className="bg-primary dark:bg-slate-700 p-4 rounded-xl text-white shrink-0">
                        <Building2 className="w-10 h-10" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-primary dark:text-white mb-4 tracking-tight">Firma eintragen</h2>
                        <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-6">
                            Präsentieren Sie Ihr Unternehmen im Herzen des Werra-Meißner-Kreises. Werden Sie Teil unseres starken regionalen Netzwerks und finden Sie lokale Talente.
                        </p>
                        <ul className="space-y-3 mb-8">
                            <li className="flex items-center gap-3 font-semibold text-primary dark:text-white">
                                <CheckCircle2 className="w-5 h-5 text-secondary dark:text-red-400" /> Sichtbarkeit in der Region erhöhen
                            </li>
                            <li className="flex items-center gap-3 font-semibold text-primary dark:text-white">
                                <CheckCircle2 className="w-5 h-5 text-secondary dark:text-red-400" /> Direkter Kontakt zu Fachkräften
                            </li>
                        </ul>
                        <button
                            onClick={() => navigate('/admin')}
                            className="bg-primary dark:bg-slate-700 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 dark:hover:bg-slate-600 transition-colors"
                        >
                            Jetzt registrieren
                        </button>
                    </div>
                </div>
            </div>
            <div className="md:col-span-2 space-y-4">
                <div className="bg-[#1b3b5a]/10 dark:bg-slate-800/50 p-8 rounded-xl flex flex-col justify-center h-full text-center">
                    <Network className="text-primary dark:text-white w-12 h-12 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-primary dark:text-white mb-2">Regionales Hub</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Die zentrale Schnittstelle zwischen Wirtschaft, Bildung und Gemeinschaft.</p>
                </div>
            </div>
        </section>
    );
};
