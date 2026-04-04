import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Globe, Sparkles, Check, Rocket, Shield, Zap, MousePointer2 } from 'lucide-react';
import type { Company } from '../../data/companies';
import { cn } from '../../utils/cn';
import { supabase } from '../../utils/supabase';

interface WebBoosterModalProps {
    isOpen: boolean;
    onClose: () => void;
    company: Company;
}

export const WebBoosterModal: React.FC<WebBoosterModalProps> = ({ isOpen, onClose, company }) => {
    const [step, setStep] = useState<'scanning' | 'preview' | 'packages' | 'success'>('scanning');
    const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (isOpen && step === 'scanning') {
            const timer = setTimeout(() => {
                setStep('preview');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isOpen, step]);

    const packages = [
        {
            id: 'essential',
            name: 'Essential Page',
            price: '299€',
            desc: 'Perfekt für den Start. Deine digitale Visitenkarte.',
            features: ['Mobile-First Design', 'Google Maps Integration', 'Kontaktformular', 'Hosting inklusive'],
            icon: <Globe className="text-blue-500" />
        },
        {
            id: 'pro',
            name: 'Business Pro',
            price: '899€',
            desc: 'Maximale Sichtbarkeit & Lead-Generierung.',
            features: ['Alles aus Essential', 'SEO-Optimierung', 'Eigene Domain', 'Premium Stock-Fotos'],
            icon: <Rocket className="text-secondary" />,
            popular: true
        },
        {
            id: 'custom',
            name: 'Custom Enterprise',
            price: 'Auf Anfrage',
            desc: 'E-Commerce oder komplexe Buchungs-Systeme.',
            features: ['Individuelle Funktionen', 'Shop-Anbindung', 'Multi-Lingual', 'Priority Support'],
            icon: <Shield className="text-indigo-500" />
        }
    ];

    const handleSubmitRequest = async () => {
        if (!selectedPackage) return;
        setIsSubmitting(true);

        try {
            const pkg = packages.find(p => p.id === selectedPackage);
            const { error: submitError } = await supabase
                .from('leads')
                .insert({
                    company_name: company.name,
                    contact_name: company.name,
                    email: company.email || 'info@wmk-connect.de',
                    phone: company.phone || '',
                    message: `Interesse an Website-Paket: ${pkg?.name} (${pkg?.price})`,
                    lead_type: 'website_service',
                    claimed_company_id: company.id,
                    status: 'new'
                });

            if (submitError) throw submitError;
            setStep('success');
        } catch (err) {
            console.error('Error submitting web service request:', err);
            alert('Entschuldigung, beim Senden Ihrer Anfrage ist ein Fehler aufgetreten. Bitte laden Sie die Seite neu.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl"
            />

            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-5xl bg-white rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-50 p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
                >
                    <X size={20} />
                </button>

                <div className="flex-1 overflow-y-auto">
                    {step === 'scanning' && (
                        <div className="h-[600px] flex flex-col items-center justify-center p-12 text-center">
                            <div className="relative mb-12">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                    className="w-32 h-32 rounded-full border-2 border-dashed border-indigo-200"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Sparkles size={48} className="text-indigo-600 animate-pulse" />
                                </div>
                                <motion.div
                                    initial={{ top: "-10%" }}
                                    animate={{ top: "110%" }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute left-0 right-0 h-0.5 bg-indigo-500 shadow-[0_0_15px_rgba(79,70,229,0.5)]"
                                />
                            </div>
                            <h2 className="text-3xl font-headline font-bold text-slate-900 mb-4">Analysiere Firmendaten...</h2>
                            <p className="text-slate-500 max-w-md mx-auto">
                                Wir extrahieren Inhalte aus deinem WMK-Connect Profil, um ein passendes Design-Konzept zu erstellen.
                            </p>
                            <div className="mt-8 flex gap-2">
                                {['Inhalte', 'Bilder', 'Öffnungszeiten', 'SEO-Keywords'].map((item, i) => (
                                    <motion.span
                                        key={item}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: i * 0.5 }}
                                        className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-slate-100 rounded-full text-slate-400"
                                    >
                                        {item}
                                    </motion.span>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === 'preview' && (
                        <div className="p-8 md:p-12">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                                <div>
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-700 text-[10px] font-black uppercase tracking-widest mb-3 border border-green-100">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                                        Vorschau bereit
                                    </div>
                                    <h2 className="text-3xl font-headline font-bold text-slate-900">So könnte dein Web-Auftritt aussehen</h2>
                                </div>
                                <button
                                    onClick={() => setStep('packages')}
                                    className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-primary transition-all shadow-xl active:scale-95"
                                >
                                    <Zap size={18} fill="currentColor" />
                                    Pakete ansehen
                                </button>
                            </div>

                            {/* Browser Mockup */}
                            <div className="bg-slate-100 rounded-2xl border border-slate-200 overflow-hidden shadow-inner group relative">
                                {/* Browser Header */}
                                <div className="bg-slate-200 px-4 py-3 flex items-center gap-2">
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                                        <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                                        <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                                    </div>
                                    <div className="flex-1 bg-white rounded-md py-1 px-4 text-[10px] text-slate-400 font-medium truncate mx-4 flex items-center gap-2">
                                        <Globe size={10} /> {company.name.toLowerCase().replace(/\s+/g, '-')}-wmk.de
                                    </div>
                                </div>

                                {/* Mockup Content */}
                                <div className="bg-white h-[450px] overflow-hidden relative">
                                    <div className="absolute inset-0 bg-[#f8f9fa] opacity-50"></div>

                                    {/* Mock Hero */}
                                    <div className="relative p-10 flex flex-col items-center text-center">
                                        <div className="w-16 h-16 rounded-2xl overflow-hidden mb-6 shadow-lg">
                                            <img src={company.image} alt={company.name} className="w-full h-full object-cover" />
                                        </div>
                                        <h3 className="text-4xl font-headline font-bold text-slate-900 mb-4">{company.name}</h3>
                                        <p className="text-slate-500 max-w-lg mb-8">{company.description}</p>
                                        <div className="flex gap-4">
                                            <div className="h-10 w-32 bg-slate-900 rounded-lg"></div>
                                            <div className="h-10 w-32 bg-white border border-slate-200 rounded-lg"></div>
                                        </div>

                                        {/* Page Sections Simulation */}
                                        <div className="mt-16 w-full grid grid-cols-3 gap-6">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className="space-y-3">
                                                    <div className="aspect-video bg-slate-100 rounded-xl overflow-hidden">
                                                        {company.gallery?.[i - 1] && (
                                                            <img src={company.gallery[i - 1]} className="w-full h-full object-cover grayscale opacity-50" />
                                                        )}
                                                    </div>
                                                    <div className="h-2 w-full bg-slate-100 rounded"></div>
                                                    <div className="h-2 w-2/3 bg-slate-50 rounded"></div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Pointer Simulation */}
                                    <motion.div
                                        animate={{
                                            x: [100, 300, 200],
                                            y: [200, 100, 250]
                                        }}
                                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                                        className="absolute pointer-events-none text-indigo-600 drop-shadow-xl z-20"
                                    >
                                        <MousePointer2 size={32} />
                                    </motion.div>
                                </div>

                                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                    <div className="bg-white/90 backdrop-blur-md px-6 py-3 rounded-full shadow-2xl border border-white flex items-center gap-3">
                                        <Sparkles className="text-indigo-600" size={18} />
                                        <span className="font-bold text-slate-900">Interaktive Design-Idee</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 'packages' && (
                        <div className="p-8 md:p-12">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-headline font-bold text-slate-900 mb-4">Wähle dein Wachstums-Paket</h2>
                                <p className="text-slate-500">Alle Webseiten werden schlüsselfertig übergeben und von uns gewartet.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {packages.map((pkg) => (
                                    <div
                                        key={pkg.id}
                                        onClick={() => setSelectedPackage(pkg.id)}
                                        className={cn(
                                            "relative p-8 rounded-[2rem] border-2 transition-all cursor-pointer group",
                                            selectedPackage === pkg.id
                                                ? "border-indigo-600 bg-indigo-50/30 ring-4 ring-indigo-50"
                                                : "border-slate-100 bg-slate-50/30 hover:border-slate-200"
                                        )}
                                    >
                                        {pkg.popular && (
                                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                                                Am Beliebtesten
                                            </div>
                                        )}
                                        <div className="w-12 h-12 rounded-2xl bg-white shadow-md flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                            {pkg.icon}
                                        </div>
                                        <h4 className="text-xl font-bold text-slate-900 mb-2">{pkg.name}</h4>
                                        <div className="flex items-baseline gap-1 mb-4">
                                            <span className="text-3xl font-black text-slate-900">{pkg.price}</span>
                                            {pkg.id !== 'custom' && <span className="text-sm font-bold text-slate-400">einmalig</span>}
                                        </div>
                                        <p className="text-slate-500 text-sm mb-8 leading-relaxed">{pkg.desc}</p>

                                        <ul className="space-y-4 mb-10">
                                            {pkg.features.map(f => (
                                                <li key={f} className="flex items-start gap-3 text-sm font-medium text-slate-600">
                                                    <Check size={16} className="text-green-500 shrink-0 mt-0.5" />
                                                    {f}
                                                </li>
                                            ))}
                                        </ul>

                                        <div className={cn(
                                            "w-full py-4 rounded-xl font-bold text-center transition-all",
                                            selectedPackage === pkg.id
                                                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                                                : "bg-white text-slate-900 border border-slate-200"
                                        )}>
                                            Auswählen
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: selectedPackage ? 1 : 0, y: selectedPackage ? 0 : 20 }}
                                className="mt-12 p-8 bg-slate-900 rounded-3xl text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl"
                            >
                                <div className="flex items-center gap-6 text-left">
                                    <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center">
                                        <Check size={32} />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold">Gute Wahl!</h4>
                                        <p className="text-slate-400">Ein Experte wird dich innerhalb von 24h kontaktieren.</p>
                                    </div>
                                </div>
                                <button
                                    onClick={handleSubmitRequest}
                                    disabled={isSubmitting}
                                    className="whitespace-nowrap bg-white text-slate-900 px-10 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-100 transition-all active:scale-95 shadow-xl shadow-white/5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                                            Wird gesendet...
                                        </>
                                    ) : (
                                        'Jetzt unverbindlich anfragen'
                                    )}
                                </button>
                            </motion.div>
                        </div>
                    )}

                    {step === 'success' && (
                        <div className="h-[600px] flex flex-col items-center justify-center p-12 text-center">
                            <motion.div
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="w-24 h-24 rounded-full bg-green-500 text-white flex items-center justify-center mb-8 shadow-2xl"
                            >
                                <Check size={48} strokeWidth={3} />
                            </motion.div>
                            <h2 className="text-4xl font-headline font-bold text-slate-900 mb-4">Anfrage gesendet!</h2>
                            <p className="text-slate-500 max-w-md mx-auto mb-10 text-lg">
                                Vielen Dank für dein Interesse, {company.name}! Ein Experte aus unserem Team wird sich in Kürze bei dir melden.
                            </p>
                            <button
                                onClick={onClose}
                                className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-primary transition-all"
                            >
                                Zurück zum Dashboard
                            </button>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};
