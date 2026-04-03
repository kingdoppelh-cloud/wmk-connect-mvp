import React, { useState } from 'react';

export const MerchantStudioOnboarding: React.FC = () => {
    const [step, setStep] = useState(0);

    const steps = [
        { id: 'vision', label: 'Vision', icon: 'lightbulb' },
        { id: 'design', label: 'Design', icon: 'brush' },
        { id: 'zeitplan', label: 'Zeitplan', icon: 'event' },
    ];

    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex-grow p-8 md:p-12 max-w-7xl mx-auto w-full">
                {/* Header Section */}
                <div className="mb-12">
                    <p className="text-primary uppercase tracking-[0.2em] font-bold text-xs mb-3">Onboarding-Prozess</p>
                    <h1 className="font-headline text-4xl md:text-5xl font-black text-on-surface tracking-tight max-w-2xl leading-[1.1]">
                        Willkommen im <span className="text-primary">WMK Studio</span>.
                    </h1>
                    <p className="mt-4 text-secondary max-w-xl text-lg leading-relaxed">
                        Gestalten wir gemeinsam Ihre archivarische Zukunft. Folgen Sie diesem geführten Prozess, um Ihr Projekt zu präzisieren.
                    </p>
                </div>

                {/* Stepper Component */}
                <div className="mb-16">
                    <div className="flex items-center justify-between relative max-w-3xl">
                        <div className="absolute top-5 left-0 w-full h-[2px] bg-surface-container-high -z-10"></div>
                        {steps.map((s, i) => (
                            <button
                                key={s.id}
                                onClick={() => setStep(i)}
                                className="flex flex-col items-center gap-2 group"
                            >
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ring-8 ring-background transition-all ${i === step
                                        ? 'bg-primary text-on-primary'
                                        : i < step
                                            ? 'bg-primary/30 text-primary'
                                            : 'bg-surface-container-high text-secondary'
                                    }`}>
                                    <span className="material-symbols-outlined text-xl" style={i < step ? { fontVariationSettings: "'FILL' 1" } : {}}>
                                        {i < step ? 'check' : s.icon}
                                    </span>
                                </div>
                                <span className={`text-xs font-bold uppercase tracking-wider transition-colors ${i === step ? 'text-primary' : 'text-secondary'}`}>
                                    {s.label}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Grid (Asymmetric) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Main Form Area (7 Cols) */}
                    <div className="lg:col-span-7 space-y-12">
                        {/* Step 1: Vision & Ziele */}
                        {step === 0 && (
                            <section className="bg-surface-container-lowest p-8 md:p-10 rounded-xl shadow-[0px_12px_32px_rgba(27,59,90,0.04)] animate-in fade-in duration-300">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-1.5 h-8 bg-primary rounded-full"></div>
                                    <h2 className="font-headline text-2xl font-bold">1. Vision &amp; Ziele</h2>
                                </div>
                                <div className="space-y-8">
                                    <div>
                                        <label className="block text-sm font-bold text-on-surface mb-2">Was ist der Kern Ihres Archivprojekts?</label>
                                        <textarea
                                            className="w-full bg-surface-container-low border-0 border-b-2 border-outline-variant/40 focus:border-primary focus:ring-0 rounded-t-lg p-4 transition-all text-on-surface resize-none"
                                            placeholder="Beschreiben Sie Ihre Mission..."
                                            rows={3}
                                        ></textarea>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="bg-surface-container p-6 rounded-xl border-l-4 border-primary hover:bg-surface-bright cursor-pointer transition-all group/card">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <p className="font-bold text-on-surface">Digitaler Fokus</p>
                                                    <p className="text-xs text-secondary mt-1">Reine Online-Präsenz und Archivierung.</p>
                                                </div>
                                                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                                            </div>
                                        </div>
                                        <div className="bg-surface-container-low p-6 rounded-xl border-l-4 border-transparent hover:border-outline-variant hover:bg-surface-bright cursor-pointer transition-all">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <p className="font-bold text-on-surface">Physisches Archiv</p>
                                                    <p className="text-xs text-secondary mt-1">Kombination aus Analog &amp; Digital.</p>
                                                </div>
                                                <span className="material-symbols-outlined text-secondary">radio_button_unchecked</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        )}

                        {/* Step 2: Design */}
                        {step === 1 && (
                            <section className="bg-surface-container-lowest p-8 md:p-10 rounded-xl shadow-[0px_12px_32px_rgba(27,59,90,0.04)] animate-in fade-in duration-300">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-1.5 h-8 bg-primary rounded-full"></div>
                                    <h2 className="font-headline text-2xl font-bold">2. Design &amp; Stil</h2>
                                </div>
                                <div className="space-y-8">
                                    <div>
                                        <label className="block text-sm font-bold text-on-surface mb-4">Welchen visuellen Stil bevorzugen Sie?</label>
                                        <div className="grid grid-cols-2 gap-4">
                                            {['Minimalistisch', 'Editorial', 'Premium Dark', 'Klassisch'].map((style) => (
                                                <div key={style} className="border border-outline-variant/20 rounded-xl p-4 hover:border-primary hover:bg-surface-container-low cursor-pointer transition-all">
                                                    <p className="font-bold text-on-surface text-sm">{style}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-on-surface mb-2">Farbpräferenz</label>
                                        <div className="flex gap-3">
                                            <button className="w-10 h-10 rounded-full bg-primary ring-4 ring-primary/30"></button>
                                            <button className="w-10 h-10 rounded-full bg-blue-800"></button>
                                            <button className="w-10 h-10 rounded-full bg-slate-900"></button>
                                            <button className="w-10 h-10 rounded-full bg-emerald-800"></button>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        )}

                        {/* Step 3: Zeitplan */}
                        {step === 2 && (
                            <section className="bg-surface-container-lowest p-8 md:p-10 rounded-xl shadow-[0px_12px_32px_rgba(27,59,90,0.04)] animate-in fade-in duration-300">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-1.5 h-8 bg-primary rounded-full"></div>
                                    <h2 className="font-headline text-2xl font-bold">3. Zeitplan &amp; Budget</h2>
                                </div>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-bold text-on-surface mb-2">Gewünschter Projektstart</label>
                                        <input type="date" className="w-full bg-surface-container-low border-0 border-b-2 border-outline-variant/40 focus:border-primary focus:ring-0 rounded-t-lg p-4 text-on-surface" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-on-surface mb-2">Projektlaufzeit</label>
                                        <select className="w-full bg-surface-container-low border-0 border-b-2 border-outline-variant/40 focus:border-primary focus:ring-0 rounded-t-lg p-4 text-on-surface">
                                            <option>1 Monat</option>
                                            <option>3 Monate</option>
                                            <option>6 Monate</option>
                                            <option>12+ Monate</option>
                                        </select>
                                    </div>
                                    <div className="p-6 bg-surface-container-high rounded-xl border-l-4 border-primary">
                                        <p className="font-bold text-primary font-headline text-lg">🎉 Fast geschafft!</p>
                                        <p className="text-secondary text-sm mt-2">Ihr Onboarding-Profil wird nach Abschluss automatisch einem Lead Archivist zugewiesen.</p>
                                    </div>
                                </div>
                            </section>
                        )}

                        {/* Navigation Actions */}
                        <div className="flex items-center justify-between pt-8">
                            <button
                                onClick={() => setStep(Math.max(0, step - 1))}
                                className={`flex items-center gap-2 px-6 py-3 font-bold text-secondary hover:text-primary transition-colors ${step === 0 ? 'opacity-30 pointer-events-none' : ''}`}
                            >
                                <span className="material-symbols-outlined">arrow_back</span>
                                Zurück
                            </button>
                            {step < 2 ? (
                                <button
                                    onClick={() => setStep(step + 1)}
                                    className="bg-gradient-to-br from-primary to-primary-container px-10 py-4 text-on-primary rounded-lg font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform flex items-center gap-3"
                                >
                                    Nächster Schritt
                                    <span className="material-symbols-outlined">arrow_forward</span>
                                </button>
                            ) : (
                                <button className="bg-gradient-to-br from-primary to-primary-container px-10 py-4 text-on-primary rounded-lg font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform flex items-center gap-3">
                                    Projekt starten
                                    <span className="material-symbols-outlined">rocket_launch</span>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Sidebar Context (5 Cols) */}
                    <div className="lg:col-span-5">
                        <div className="sticky top-28 space-y-8">
                            {/* Civic Lead Component */}
                            <div className="bg-surface-container-high p-8 rounded-xl relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-3 h-full bg-primary"></div>
                                <span className="material-symbols-outlined text-primary/20 text-7xl absolute -right-4 -bottom-4 rotate-12">format_quote</span>
                                <h3 className="font-headline text-3xl font-black text-primary leading-tight relative z-10">
                                    "Gutes Design bewahrt Geschichte, anstatt sie nur zu zeigen."
                                </h3>
                                <p className="mt-4 text-sm font-bold uppercase tracking-widest text-secondary/70">Leitfaden für Archivare</p>
                            </div>

                            {/* Info Card */}
                            <div className="bg-surface-container-low p-8 rounded-xl border border-outline-variant/10">
                                <h4 className="font-bold text-on-surface mb-4 flex items-center gap-2 font-headline">
                                    <span className="material-symbols-outlined text-primary">help_center</span>
                                    Warum Vision?
                                </h4>
                                <p className="text-secondary text-sm leading-relaxed">
                                    Ihre Vision bildet das Fundament für die gesamte visuelle Sprache. Ob minimalistisch-modern oder opulent-historisch – alles beginnt bei Ihren langfristigen Zielen.
                                </p>
                                <div className="mt-6 pt-6 border-t border-outline-variant/15">
                                    <div className="flex items-center gap-4 text-xs font-bold text-primary">
                                        <img
                                            alt="Advisor"
                                            className="w-8 h-8 rounded-full object-cover"
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCaigATZE-llsw9IK40BERaNpJPKPVKM3QlGWJsGMgr1ldduMRUWl8jBMEBKGM4eApkEf0PlERRq0SivdkIudeORwMcTc7NLu19jWKnrSoRDuebXoxUNnrjOKQ7Wdx3lcF4_4p_PGqJd7wUSWbq2S_BvFSiM75G34NLQ6iaIkPX1fR3yYFqQ-UqifllF5sHLFh0iIkVZkoQh72QgMoXE2rLQE3wvkS8EhkbZl4k3iOaxf34R4tNUg4-953WygEuQRhMA0B9o3m4mJI"
                                        />
                                        <span>Haben Sie Fragen? Sprechen Sie mit einem Lead Archivist.</span>
                                    </div>
                                </div>
                            </div>

                            {/* Image Block */}
                            <div className="rounded-xl overflow-hidden shadow-2xl">
                                <img
                                    alt="Studio Insight"
                                    className="w-full h-48 object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzrelWJ1lZHjzecdh3R5bh_UlPdYDbQ7zJOM-akpINO2JChP7vf7XZjlUGYs0vP4xEvsfZHOYQjgoRO_lX1B182U0MNEqU1Nbxg9vEkT_5TBlR7qX-f87qw3SUVp3D0PG23xhZ6n703eaOjaKmgWn0OzO5sdCPIGwNAS4x6eXSlvRRwaL3elFFe2yHJv-tW-pUMIa8do9V5hQWe3GMPUxWaHkFfRmnaspqKxhtKWP6aL1AVDApzCfREZNScvmWkCvxnRooZfkjYhA"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
