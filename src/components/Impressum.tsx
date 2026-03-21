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
                    <p className="font-bold text-slate-900">[Ihr Name / Firmenname]</p>
                    <p>[Straße Hausnummer]</p>
                    <p>[PLZ Ort]</p>
                </section>

                <section>
                    <h2 className="text-xl font-black text-slate-900 uppercase tracking-widest mb-4">Kontakt</h2>
                    <p>Telefon: [Deine Telefonnummer]</p>
                    <p>E-Mail: [Deine E-Mail Adresse]</p>
                </section>

                <section>
                    <h2 className="text-xl font-black text-slate-900 uppercase tracking-widest mb-4">Umsatzsteuer-ID</h2>
                    <p>Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />[Deine USt-ID, falls vorhanden]</p>
                </section>

                <section>
                    <h2 className="text-xl font-black text-slate-900 uppercase tracking-widest mb-4">Verbraucherstreitbeilegung</h2>
                    <p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
                </section>
            </div>
        </div>
    );
};
