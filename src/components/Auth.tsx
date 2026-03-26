import React, { useState } from 'react';
import { supabase } from '../utils/supabase';
import { LogIn, Mail, ShieldCheck, ArrowLeft } from 'lucide-react';

interface Props {
    onBack: () => void;
}

export const Auth: React.FC<Props> = ({ onBack }) => {
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const [email, setEmail] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.signInWithOtp({
                email,
                options: {
                    emailRedirectTo: window.location.origin
                }
            });
            if (error) throw error;
            setSent(true);
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Versand fehlgeschlagen';
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    if (sent) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                <div className="w-full max-w-md text-center">
                    <div className="bg-white p-12 rounded-[3rem] shadow-2xl border border-slate-100 space-y-6">
                        <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
                            <Mail size={40} />
                        </div>
                        <h2 className="text-3xl font-black text-slate-900">E-Mail gesendet!</h2>
                        <p className="text-slate-500 font-medium leading-relaxed">
                            Wir haben einen Magic Link an <strong>{email}</strong> geschickt.
                            Klicken Sie auf den Link in der E-Mail, um sich einzuloggen.
                        </p>
                        <button
                            onClick={onBack}
                            className="text-accent font-bold uppercase text-xs tracking-widest pt-4 block mx-auto underline underline-offset-8"
                        >
                            Zurück zur Startseite
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-sm mb-4 border border-slate-100">
                        <ShieldCheck className="text-accent" size={32} />
                    </div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Händler Login</h1>
                    <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest mt-1">Passwortloser Zugang via Magic Link</p>
                </div>

                <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-slate-100">
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2 text-left">
                            <label htmlFor="email" className="text-xs font-black text-slate-400 uppercase tracking-tighter ml-1">E-Mail Adresse</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    id="email"
                                    required
                                    type="email"
                                    autoComplete="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="firma@beispiel.de"
                                    className="w-full bg-slate-50 border border-slate-100 pl-12 pr-4 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all font-bold text-slate-900"
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-500 text-xs font-bold animate-shake">
                                {error}
                            </div>
                        )}

                        <button
                            disabled={loading}
                            type="submit"
                            className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-sm shadow-xl hover:bg-black hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-50 disabled:scale-100"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <LogIn size={18} />
                                    Magic Link anfordern
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
                    Zurück zur Firmenliste
                </button>
            </div>
        </div>
    );
};
