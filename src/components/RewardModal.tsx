import React from 'react';
import { X, Trophy, Star, MessageCircle, Eye, Calendar, Sparkles, Share2 } from 'lucide-react';
import { useRewards } from '../hooks/useRewards';

interface RewardModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const RewardModal: React.FC<RewardModalProps> = ({ isOpen, onClose }) => {
    const { points } = useRewards();

    if (!isOpen) return null;

    const rewardSteps = [
        { icon: <Eye size={20} />, label: 'Profil besuchen', points: '+1', color: 'bg-blue-50 text-blue-600' },
        { icon: <MessageCircle size={20} />, label: 'Kontaktanfrage', points: '+3', color: 'bg-emerald-50 text-emerald-600' },
        { icon: <Calendar size={20} />, label: 'Event-Zusage', points: '+5', color: 'bg-amber-50 text-amber-600' },
        { icon: <Share2 size={20} />, label: 'Unternehmen teilen', points: '+10', color: 'bg-cyan-50 text-cyan-600' },
    ];

    return (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-300">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />

            <div className="relative w-full max-w-md bg-white rounded-t-[32px] sm:rounded-[32px] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-full duration-500">
                {/* Header */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-white relative overflow-hidden">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                    >
                        <X size={20} />
                    </button>

                    <div className="flex flex-col items-center text-center space-y-4">
                        <div className="w-20 h-20 rounded-3xl bg-premium flex items-center justify-center shadow-lg relative">
                            <Trophy size={40} className="text-slate-900" />
                            <Sparkles className="absolute -top-2 -right-2 text-white animate-pulse" size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black">Connected Points</h2>
                            <p className="text-slate-400 text-sm">Deine Treue wird belohnt!</p>
                        </div>
                        <div className="bg-white text-slate-900 px-6 py-2 rounded-2xl font-black text-3xl shadow-xl flex items-center gap-3">
                            <Star className="fill-amber-400 text-amber-400" size={24} />
                            {points}
                        </div>
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-accent/20 rounded-full blur-3xl" />
                </div>

                {/* Content */}
                <div className="p-8 space-y-8">
                    <section className="space-y-4">
                        <h3 className="font-bold text-slate-900 px-1">So sammelst du Punkte:</h3>
                        <div className="grid grid-cols-1 gap-3">
                            {rewardSteps.map((step, idx) => (
                                <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-accent/20 transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-xl ${step.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                            {step.icon}
                                        </div>
                                        <span className="font-bold text-slate-700">{step.label}</span>
                                    </div>
                                    <span className="font-black text-accent">{step.points}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <div className="pt-4">
                        <button
                            onClick={onClose}
                            className="w-full py-4 rounded-2xl bg-slate-900 text-white font-black hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20 active:scale-[0.98]"
                        >
                            Verstanden
                        </button>
                    </div>

                    <p className="text-[10px] text-slate-400 text-center uppercase tracking-widest font-bold pb-2">
                        Exklusive Belohnungen bald verfügbar
                    </p>
                </div>
            </div>
        </div>
    );
};
