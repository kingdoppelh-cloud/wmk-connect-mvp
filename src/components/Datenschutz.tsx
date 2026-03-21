import React from 'react';
import { ArrowLeft, Lock } from 'lucide-react';

export const Datenschutz: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    return (
        <div className="bg-white min-h-screen p-8 font-sans">
            <button onClick={onBack} className="mb-8 flex items-center gap-2 text-slate-500 font-bold hover:text-slate-900 transition-colors">
                <ArrowLeft size={20} /> Zurück
            </button>

            <header className="mb-10">
                <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center mb-4">
                    <Lock className="text-emerald-500" size={24} />
                </div>
                <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">Datenschutz</h1>
            </header>

            <div className="prose prose-slate max-w-none space-y-8 text-slate-600">
                <section>
                    <h2 className="text-xl font-black text-slate-900 uppercase tracking-widest mb-4">1. Datenschutz auf einen Blick</h2>
                    <p>Diese Datenschutzerklärung klärt Sie über die Art, den Umfang und Zweck der Verarbeitung von personenbezogenen Daten innerhalb unserer App "WMK Connect" auf.</p>
                </section>

                <section>
                    <h2 className="text-xl font-black text-slate-900 uppercase tracking-widest mb-4">2. Datenerfassung in der App</h2>
                    <h3 className="font-bold text-slate-900 mb-2">Supabase (Datenbank & Authentifizierung)</h3>
                    <p>Wir nutzen Supabase zur Speicherung unserer Unternehmensdaten und für den Login-Bereich. Bei der Nutzung werden technisch notwendige Daten verarbeitet, um die Sicherheit und Funktionalität der App zu gewährleisten.</p>

                    <h3 className="font-bold text-slate-900 mb-2 mt-4">LocalStorage (Favoriten)</h3>
                    <p>Ihre Favoriten werden ausschließlich lokal in Ihrem Browser (LocalStorage) gespeichert. Diese Daten werden nicht an unsere Server übertragen.</p>
                </section>

                <section>
                    <h2 className="text-xl font-black text-slate-900 uppercase tracking-widest mb-4">3. Ihre Rechte</h2>
                    <p>Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung.</p>
                </section>
            </div>
        </div>
    );
};
