import React, { useState } from 'react';
import { X, Send, Building2, User, Mail, Phone, MessageSquare } from 'lucide-react';
import { supabase } from '../utils/supabase';
import { motion, AnimatePresence } from 'framer-motion';

type LeadType = 'new_entry' | 'claim_profile';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    leadType: LeadType;
    prefilledCompanyName?: string;
    claimedCompanyId?: string;
}

export const LeadCaptureModal: React.FC<Props> = ({
    isOpen,
    onClose,
    leadType,
    prefilledCompanyName = '',
    claimedCompanyId
}) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        company_name: prefilledCompanyName,
        contact_name: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const { error: submitError } = await supabase.from('leads').insert([{
            ...formData,
            lead_type: leadType,
            claimed_company_id: claimedCompanyId || null
        }]);

        setIsSubmitting(false);

        if (submitError) {
            setError(submitError.message);
        } else {
            setIsSuccess(true);
            setTimeout(() => {
                setIsSuccess(false);
                onClose();
                // Reset form
                setFormData({
                    company_name: prefilledCompanyName,
                    contact_name: '',
                    email: '',
                    phone: '',
                    message: ''
                });
            }, 3000);
        }
    };

    const title = leadType === 'claim_profile' ? 'Profil übernehmen' : 'Firma eintragen';
    const subtitle = leadType === 'claim_profile'
        ? 'Ist das Ihre Firma? Kontaktieren Sie uns, um das Profil zu bearbeiten und Premium-Vorteile zu nutzen.'
        : 'Werden Sie Teil von WMK Connect und steigern Sie Ihre lokale Sichtbarkeit.';

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm sm:p-6 font-sans">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden relative max-h-[90vh] overflow-y-auto no-scrollbar"
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 sm:p-8 text-white relative">
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors bg-white/10 rounded-full p-2 backdrop-blur-md"
                        >
                            <X size={20} />
                        </button>
                        <h2 className="text-2xl sm:text-3xl font-black mb-2">{title}</h2>
                        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">{subtitle}</p>
                    </div>

                    <div className="p-6 sm:p-8">
                        {isSuccess ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-10"
                            >
                                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Send size={32} />
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 mb-2">Anfrage erfolgreich!</h3>
                                <p className="text-slate-500">Wir melden uns in Kürze bei Ihnen.</p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                {error && (
                                    <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-medium border border-red-100">
                                        {error}
                                    </div>
                                )}

                                <div className="space-y-4">
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                            <Building2 size={18} />
                                        </div>
                                        <input
                                            required
                                            type="text"
                                            placeholder="Name der Firma"
                                            value={formData.company_name}
                                            onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                                            className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border-transparent focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/20 rounded-2xl text-sm transition-all"
                                        />
                                    </div>

                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                            <User size={18} />
                                        </div>
                                        <input
                                            required
                                            type="text"
                                            placeholder="Ihr Vor- und Nachname"
                                            value={formData.contact_name}
                                            onChange={(e) => setFormData({ ...formData, contact_name: e.target.value })}
                                            className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border-transparent focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/20 rounded-2xl text-sm transition-all"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                                <Mail size={18} />
                                            </div>
                                            <input
                                                required
                                                type="email"
                                                placeholder="E-Mail Adresse"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border-transparent focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/20 rounded-2xl text-sm transition-all"
                                            />
                                        </div>

                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                                <Phone size={18} />
                                            </div>
                                            <input
                                                required
                                                type="tel"
                                                placeholder="Telefonnummer"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border-transparent focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/20 rounded-2xl text-sm transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <div className="absolute top-4 left-4 pointer-events-none text-slate-400">
                                            <MessageSquare size={18} />
                                        </div>
                                        <textarea
                                            placeholder="Ihre Nachricht an uns (Optional)"
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border-transparent focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/20 rounded-2xl text-sm min-h-[100px] resize-y transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white p-4 rounded-2xl font-bold transition-all shadow-lg shadow-accent/25 disabled:opacity-50 disabled:cursor-not-allowed group"
                                    >
                                        {isSubmitting ? (
                                            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                Anfrage senden
                                                <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                            </>
                                        )}
                                    </button>
                                    <p className="text-center text-xs text-slate-400 mt-4">
                                        Durch das Senden stimmen Sie unseren Datenschutzbestimmungen zu.
                                    </p>
                                </div>
                            </form>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};
