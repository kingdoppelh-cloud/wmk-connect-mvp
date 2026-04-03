import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const MerchantCheckout: React.FC = () => {
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank'>('card');

    return (
        <div className="pt-8 pb-12 px-6 max-w-6xl mx-auto w-full">
            {/* Page Title */}
            <div className="mb-12 flex items-center gap-4">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-1 text-secondary hover:text-primary transition-colors text-sm font-medium"
                >
                    <span className="material-symbols-outlined text-lg">arrow_back</span>
                    Zurück
                </button>
            </div>
            <div className="mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-on-background mb-2 font-headline">Service-Checkout</h1>
                <div className="h-1 w-24 bg-primary"></div>
            </div>

            {/* Asymmetrical Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                {/* Left Side: Payment Form */}
                <div className="lg:col-span-7 order-2 lg:order-1">
                    <section className="bg-surface-container-lowest p-8 rounded-xl shadow-[0px_12px_32px_rgba(27,59,90,0.04)]">
                        <div className="flex items-center gap-3 mb-8">
                            <span className="material-symbols-outlined text-primary">shield</span>
                            <h2 className="text-xl font-bold tracking-tight font-headline">Zahlungsdetails</h2>
                        </div>
                        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                            <div className="space-y-6">
                                {/* Cardholder Name */}
                                <div>
                                    <label className="text-[11px] font-medium uppercase tracking-wider text-secondary mb-1 block">Karteninhaber</label>
                                    <input
                                        className="w-full bg-surface-container-low border-0 border-b-2 border-outline-variant/40 focus:border-primary focus:ring-0 transition-colors py-3 px-1 text-on-surface placeholder:text-slate-400"
                                        placeholder="Max Mustermann"
                                        type="text"
                                    />
                                </div>
                                {/* Card Number */}
                                <div>
                                    <label className="text-[11px] font-medium uppercase tracking-wider text-secondary mb-1 block">Kartennummer</label>
                                    <div className="relative">
                                        <input
                                            className="w-full bg-surface-container-low border-0 border-b-2 border-outline-variant/40 focus:border-primary focus:ring-0 transition-colors py-3 px-1 text-on-surface placeholder:text-slate-400"
                                            placeholder="0000 0000 0000 0000"
                                            type="text"
                                        />
                                        <div className="absolute right-2 top-1/2 -translate-y-1/2">
                                            <span className="material-symbols-outlined text-slate-400">credit_card</span>
                                        </div>
                                    </div>
                                </div>
                                {/* Expiry & CVC */}
                                <div className="grid grid-cols-2 gap-8">
                                    <div>
                                        <label className="text-[11px] font-medium uppercase tracking-wider text-secondary mb-1 block">Ablaufdatum</label>
                                        <input
                                            className="w-full bg-surface-container-low border-0 border-b-2 border-outline-variant/40 focus:border-primary focus:ring-0 transition-colors py-3 px-1 text-on-surface placeholder:text-slate-400"
                                            placeholder="MM / JJ"
                                            type="text"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[11px] font-medium uppercase tracking-wider text-secondary mb-1 block">CVC</label>
                                        <input
                                            className="w-full bg-surface-container-low border-0 border-b-2 border-outline-variant/40 focus:border-primary focus:ring-0 transition-colors py-3 px-1 text-on-surface placeholder:text-slate-400"
                                            placeholder="•••"
                                            type="text"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Payment Method Toggle */}
                            <div className="flex gap-4 p-1 bg-surface-container-low rounded-lg">
                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod('card')}
                                    className={`flex-1 py-2 px-4 text-sm font-semibold rounded-md transition-all ${paymentMethod === 'card' ? 'bg-surface-container-lowest text-primary shadow-sm border border-outline-variant/15' : 'text-secondary hover:bg-surface-container-high'}`}
                                >
                                    Kreditkarte
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod('bank')}
                                    className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all ${paymentMethod === 'bank' ? 'bg-surface-container-lowest text-primary shadow-sm border border-outline-variant/15' : 'text-secondary hover:bg-surface-container-high'}`}
                                >
                                    Banküberweisung
                                </button>
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    className="w-full py-4 px-6 bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-lg font-bold text-lg flex items-center justify-center gap-3 active:scale-[0.98] transition-transform shadow-[0px_8px_24px_rgba(185,0,11,0.2)]"
                                >
                                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
                                    Jetzt bezahlen
                                </button>
                                <p className="text-center mt-6 text-xs text-secondary/70 flex items-center justify-center gap-2">
                                    <span className="material-symbols-outlined text-sm">encrypted</span>
                                    Sichere 256-Bit SSL-verschlüsselte Zahlung
                                </p>
                            </div>
                        </form>
                    </section>

                    {/* Trust Badges */}
                    <div className="mt-8 flex justify-center gap-8 opacity-40 grayscale">
                        <span className="material-symbols-outlined text-4xl">payments</span>
                        <span className="material-symbols-outlined text-4xl">account_balance</span>
                        <span className="material-symbols-outlined text-4xl">verified_user</span>
                    </div>
                </div>

                {/* Right Side: Order Summary */}
                <div className="lg:col-span-5 order-1 lg:order-2 space-y-6">
                    <section className="bg-surface-container-low rounded-xl p-8 border-l-8 border-primary">
                        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-6">Service-Zusammenfassung</h2>
                        <div className="mb-8">
                            <h3 className="text-2xl font-bold text-on-surface mb-2 font-headline">Web-Redesign Premium</h3>
                            <p className="text-secondary text-sm leading-relaxed">Vollständige strukturelle Überarbeitung, civile Barrierefreiheit und redaktionelle visuelle Sprache.</p>
                        </div>
                        <div className="space-y-4 border-t border-outline-variant/20 pt-6">
                            <div className="flex justify-between items-center">
                                <span className="text-secondary font-medium">Grundgebühr</span>
                                <span className="text-on-surface font-semibold">4.250,00 €</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-secondary font-medium">Priority Support</span>
                                <span className="text-on-surface font-semibold">750,00 €</span>
                            </div>
                            <div className="flex justify-between items-center text-sm italic text-secondary">
                                <span>Steuer (beim Checkout berechnet)</span>
                                <span>0,00 €</span>
                            </div>
                        </div>
                        <div className="mt-12 pt-6 border-t-2 border-on-surface/5 flex justify-between items-end">
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-secondary opacity-60">Gesamtbetrag</p>
                                <p className="text-4xl font-extrabold text-on-surface tracking-tight font-headline">5.000,00 €</p>
                            </div>
                            <div className="bg-primary/10 text-primary text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter">
                                EUR
                            </div>
                        </div>
                    </section>

                    {/* Civic Lead Block */}
                    <div className="bg-surface-container-high rounded-xl p-6 relative overflow-hidden">
                        <div className="absolute top-0 left-0 h-full w-2 bg-primary"></div>
                        <div className="relative z-10">
                            <span className="material-symbols-outlined text-primary mb-2" style={{ fontVariationSettings: "'FILL' 1" }}>format_quote</span>
                            <p className="text-on-surface italic text-sm leading-relaxed mb-4">
                                "Das moderne Archivierungssystem stellt sicher, dass jedes Civic-Projekt seine Integrität und Langlebigkeit durch präzises Design bewahrt."
                            </p>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-secondary">— Das Civic Manifest</p>
                        </div>
                        <div className="absolute -right-4 -bottom-4 opacity-5">
                            <span className="material-symbols-outlined text-9xl">account_balance</span>
                        </div>
                    </div>

                    {/* Preview Image */}
                    <div className="rounded-xl overflow-hidden shadow-lg h-48 relative">
                        <img
                            alt="Studio Service Preview"
                            className="w-full h-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIZb31Vx3FZcQ_HaBU9LjiHttR7N05LAK9Ec_9BZatHUntQHE_LOKTPtyJysLdXGDeqsar6PmxI_Ri3agJLu03ATDO2i3jH592y5zJOfkxIDrHT89jj2_vys6wZkHzQfnp-NSSR7JJnzxpxrLBMpsM-UuGcvToCksjMNOPHKBUu5_OhSyy-n1dqp7QJ6-5GQvyvYSujaZZi1ya_ONZlnmlEheVi_eRpmIno4OnE_55SE1I68xoRop6ShMMD8P6fPZTtaixdQJMqbg"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-on-background/60 to-transparent"></div>
                        <div className="absolute bottom-4 left-4 text-white">
                            <p className="text-xs font-medium uppercase tracking-widest opacity-80">Design Concept</p>
                            <p className="font-bold">Premium Tier Execution</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
