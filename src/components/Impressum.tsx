import React from 'react';
import { ArrowLeft, Shield } from 'lucide-react';

export const Impressum: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    return (
        <div className="bg-white min-h-screen p-8 font-sans">
            <button onClick={onBack} className="mb-8 flex items-center gap-2 text-slate-500 font-bold hover:text-slate-900 transition-colors">
                <ArrowLeft size={20} /> Zurück
            </button>

            <header className="mb-10">
                <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
                    <Shield className="text-slate-400" size={24} />
                </div>
                <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">Impressum</h1>
            </header>

            <div className="prose prose-slate max-w-none space-y-8 text-slate-600">
                <section>
                    <h2 className="text-xl font-black text-slate-900 uppercase tracking-widest mb-4">Angaben gemäß § 5 TMG</h2>
                    <p className="font-bold text-slate-900">WMK Connect</p>
                    <p>Werra-Meißner-Kreis</p>
                    <p>Deutschland</p>
                </section>

                <section>
                    <h2 className="text-xl font-black text-slate-900 uppercase tracking-widest mb-4">Kontakt</h2>
                    <p>E-Mail: support@wmk-connect.de</p>
                    <p>Website: wmk-connect.de</p>
                </section>

                <section>
                    <h2 className="text-xl font-black text-slate-900 uppercase tracking-widest mb-4">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
                    <p>WMK Connect Team</p>
                </section>

                <section>
                    <h2 className="text-xl font-black text-slate-900 uppercase tracking-widest mb-4">Haftungsausschluss</h2>
                    <p>Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.</p>
                </section>
            </div>
        </div>
    );
};
