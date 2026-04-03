import React, { useEffect, useState } from 'react';
import { CheckCircle2, ArrowRight, Briefcase, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface MatchSuccessProps {
    companyName?: string;
    onClose?: () => void;
}

export const MatchSuccess: React.FC<MatchSuccessProps> = ({ companyName = "WMK Connect Partner", onClose }) => {
    const navigate = useNavigate();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setMounted(true), 50);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`fixed inset-0 z-[500] flex flex-col bg-surface transition-opacity duration-700 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex-1 flex flex-col items-center justify-center p-8 max-w-lg mx-auto w-full text-center">

                {/* Celebration Icon */}
                <div className="relative mb-10">
                    <div className="absolute inset-0 bg-secondary/20 rounded-full blur-3xl animate-pulse" />
                    <div className="w-32 h-32 bg-white border-4 border-secondary rounded-full flex items-center justify-center shadow-2xl relative z-10 animate-in zoom-in-50 duration-700 spring-bounce">
                        <CheckCircle2 className="text-secondary w-16 h-16" />
                    </div>
                </div>

                {/* Animated Text */}
                <div className="space-y-4 animate-in slide-in-from-bottom-8 fade-in duration-700 delay-150 fill-mode-both">
                    <h1 className="text-4xl md:text-5xl font-black text-primary tracking-tight leading-none uppercase">
                        It's a Match!
                    </h1>
                    <p className="text-lg text-slate-600 font-medium leading-relaxed">
                        Deine Anfrage an <span className="font-bold text-primary">{companyName}</span> wurde erfolgreich gesendet.
                    </p>
                </div>

                {/* Next Steps Box */}
                <div className="w-full bg-surface-container-low p-6 rounded-3xl mt-12 mb-12 text-left animate-in slide-in-from-bottom-8 fade-in duration-700 delay-300 fill-mode-both shadow-sm">
                    <h3 className="text-primary font-black uppercase tracking-widest text-[10px] mb-4">Wie es weitergeht</h3>
                    <ul className="space-y-4">
                        <li className="flex items-start gap-4">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5">
                                <Mail size={16} />
                            </div>
                            <div>
                                <p className="font-bold text-sm text-primary">Bestätigung erhalten</p>
                                <p className="text-xs text-slate-500 mt-1">Wir haben dir eine Kopie deiner Anfrage per E-Mail geschickt.</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-4">
                            <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary shrink-0 mt-0.5">
                                <Briefcase size={16} />
                            </div>
                            <div>
                                <p className="font-bold text-sm text-primary">Unternehmen meldet sich</p>
                                <p className="text-xs text-slate-500 mt-1">Der Ansprechpartner wird sich in Kürze mit dir in Verbindung setzen.</p>
                            </div>
                        </li>
                    </ul>
                </div>

                {/* Actions */}
                <div className="w-full space-y-4 animate-in fade-in duration-1000 delay-500 fill-mode-both">
                    <button
                        onClick={() => {
                            if (onClose) onClose();
                            else navigate('/');
                        }}
                        className="w-full bg-primary hover:bg-slate-800 text-white py-4 rounded-xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-primary/20"
                    >
                        Zurück zum Start <ArrowRight size={18} />
                    </button>
                    <button
                        onClick={() => navigate('/jobs')}
                        className="w-full bg-transparent text-slate-500 py-3 rounded-xl font-bold uppercase tracking-widest text-xs hover:text-primary transition-colors"
                    >
                        Weitere Jobs entdecken
                    </button>
                </div>

            </div>
        </div>
    );
};
