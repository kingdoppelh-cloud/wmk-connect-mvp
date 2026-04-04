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
                    <h2 className="text-xl font-black text-slate-900 uppercase tracking-widest mb-4">2. Datenerfassung & Dienste</h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-bold text-slate-900 mb-1">Supabase</h3>
                            <p>Wir nutzen Supabase zur sicheren Speicherung von Profildaten und zur Authentifizierung. Daten werden verschlüsselt übertragen und auf Servern innerhalb der EU verarbeitet.</p>
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900 mb-1">Resend / E-Mail</h3>
                            <p>Für den Versand von System-E-Mails (z.B. Match-Benachrichtigungen) nutzen wir Resend. Dabei wird Ihre E-Mail-Adresse technisch an diesen Dienst übertragen.</p>
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900 mb-1">LocalStorage</h3>
                            <p>Lokale Einstellungen und Favoriten werden ausschließlich auf Ihrem Endgerät gespeichert.</p>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-black text-slate-900 uppercase tracking-widest mb-4">3. Ihre Rechte</h2>
                    <p>Sie haben das Recht auf Auskunft, Berichtigung, Sperrung oder Löschung Ihrer Daten. Kontaktieren Sie uns hierzu unter support@wmk-connect.de.</p>
                </section>
            </div>
        </div>
    );
};
