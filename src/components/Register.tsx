import React, { useState } from 'react';
import { supabase } from '../utils/supabase';
import { UserPlus, Mail, Lock, Building2, Tag, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface RegisterProps {
    onBack: () => void;
}

export const Register: React.FC<RegisterProps> = ({ onBack }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Form States
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [category, setCategory] = useState('Gastronomie');

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // 1. Sign up user
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email,
                password,
            });

            if (authError) throw authError;
            if (!authData.user) throw new Error('Registrierung fehlgeschlagen');

            // 2. Create company profile
            const { error: companyError } = await supabase.from('companies').insert([{
                name: companyName,
                category,
                email: email,
                owner_id: authData.user.id,
                description: `Willkommen bei ${companyName}!`,
                is_premium: false,
                coordinates: [51.2721, 9.9834] // Default coordinates (BSA)
            }]);

            if (companyError) throw companyError;

            setSuccess(true);
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Etwas ist schiefgelaufen';
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                <div className="w-full max-w-md text-center">
                    <div className="bg-white p-12 rounded-[3rem] shadow-2xl border border-slate-100 space-y-6">
                        <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
                            <CheckCircle2 size={40} />
                        </div>
                        <h2 className="text-3xl font-black text-slate-900 leading-tight">Willkommen an Bord!</h2>
                        <p className="text-slate-500 font-medium leading-relaxed">
                            Dein Account wurde erstellt. Bitte bestätige deine E-Mail Adresse <strong>{email}</strong>, um dein Profil zu verwalten.
                        </p>
                        <button
                            onClick={() => navigate('/admin')}
                            className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl pt-4 block mx-auto"
                        >
                            Zum Login
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 py-12">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-sm mb-4 border border-slate-100">
                        <UserPlus className="text-accent" size={32} />
                    </div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight italic uppercase">Partner werden</h1>
                    <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest mt-1">Erstelle dein Händler-Konto im WMK</p>
                </div>

                <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-slate-100">
                    <form onSubmit={handleRegister} className="space-y-5">
                        <div className="space-y-1">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Firmenname</label>
                            <div className="relative">
                                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    required
                                    type="text"
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                    placeholder="Deine Firma GmbH"
                                    className="w-full bg-slate-50 border border-slate-100 pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/20 font-bold text-slate-900"
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Kategorie</label>
                            <div className="relative">
                                <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-100 pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/20 font-bold text-slate-900 appearance-none"
                                >
                                    <option>Gastronomie</option>
                                    <option>Handwerk</option>
                                    <option>Einzelhandel</option>
                                    <option>Dienstleistung</option>
                                    <option>Gesundheit</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">E-Mail Adresse</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    required
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="info@deine-firma.de"
                                    className="w-full bg-slate-50 border border-slate-100 pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/20 font-bold text-slate-900"
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Passwort</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    required
                                    minLength={6}
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-slate-50 border border-slate-100 pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/20 font-bold text-slate-900"
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-500 text-xs font-bold">
                                {error}
                            </div>
                        )}

                        <button
                            disabled={loading}
                            type="submit"
                            className="w-full bg-slate-950 text-white py-4 rounded-xl font-black text-sm shadow-xl hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-widest flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    Kostenlos Registrieren
                                </>
                            )}
                        </button>
                    </form>
                </div>

                <button
                    onClick={onBack}
                    className="mt-8 flex items-center justify-center gap-2 text-slate-400 hover:text-slate-900 transition-colors w-full font-black text-[10px] uppercase tracking-widest"
                >
                    <ArrowLeft size={14} />
                    Zurück zur Startseite
                </button>
            </div>
        </div>
    );
};
