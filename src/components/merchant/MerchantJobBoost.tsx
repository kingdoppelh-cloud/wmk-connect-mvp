import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const MerchantJobBoost: React.FC = () => {
    const navigate = useNavigate();
    const [budget, setBudget] = useState(45);

    return (
        <div className="pt-8 pb-32 px-6 max-w-6xl mx-auto w-full">
            {/* Breadcrumb / Context */}
            <div className="mb-8 flex items-center gap-2 text-secondary text-sm font-medium">
                <button
                    onClick={() => navigate('..')}
                    className="hover:text-primary transition-colors"
                >
                    Stellenverwaltung
                </button>
                <span className="material-symbols-outlined text-sm">chevron_right</span>
                <span className="text-on-surface">Job Boosting</span>
            </div>

            {/* Job Header & Metrics Bento Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
                {/* Title Card */}
                <div className="lg:col-span-7 bg-surface-container-lowest p-8 rounded-xl shadow-[0px_12px_32px_rgba(27,59,90,0.06)] flex flex-col justify-between">
                    <div>
                        <span className="inline-block px-3 py-1 bg-red-50 text-primary text-[11px] font-bold uppercase tracking-widest rounded mb-4">Aktive Stelle</span>
                        <h1 className="text-4xl font-extrabold text-on-background font-headline tracking-tight mb-2">Bauleiter (m/w/d)</h1>
                        <p className="text-secondary flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm">location_on</span>
                            Berlin, DE • Vollzeit
                        </p>
                    </div>
                    <div className="mt-8 flex gap-4">
                        <button className="px-4 py-2 border border-outline-variant/15 text-sm font-semibold rounded-md hover:bg-surface-bright transition-all">Details bearbeiten</button>
                        <button className="px-4 py-2 border border-outline-variant/15 text-sm font-semibold rounded-md hover:bg-surface-bright transition-all">Vorschau</button>
                    </div>
                </div>

                {/* Metrics Column */}
                <div className="lg:col-span-5 grid grid-cols-1 gap-6">
                    {/* Visibility Metric */}
                    <div className="bg-surface-container-low p-6 rounded-xl border-l-4 border-primary">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-1">Sichtbarkeit</p>
                                <h3 className="text-2xl font-bold text-primary font-headline">Niedrig</h3>
                            </div>
                            <span className="material-symbols-outlined text-primary text-3xl">visibility_off</span>
                        </div>
                        <p className="text-sm text-secondary mt-3">Ihr Inserat wird aktuell seltener in den Suchergebnissen angezeigt.</p>
                    </div>

                    {/* Applicants Metric */}
                    <div className="bg-surface-container-low p-6 rounded-xl">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-1">Bewerber</p>
                                <h3 className="text-2xl font-bold text-on-background font-headline">3</h3>
                            </div>
                            <span className="material-symbols-outlined text-secondary text-3xl">group</span>
                        </div>
                        <div className="mt-4 flex -space-x-2">
                            <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-slate-200">
                                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBv3MaXETyUNm1UT5Oc8M-o1RmcnsLO7gnDX5YpAkS1EhAJ18PvZC1wBmk4OMA9NOCFxH_tdaKUy58LVnio1sc-mB3RbethFZM_AzYKs8U_E-kc8SJgatSFAIwj8fm5dkJg5Ddymi6vxVXWyNLjcZzAvmG3cju0jd1mV7LM8jA1uT1zcS7-bblM62Vtqoqtw8XIZIMbGo4GN7qJaxa4UFPScGngQ17i5syGVwaj1dtesHC7QTufH_Sr64aopXKEkCbGzjY9Vme_tmY" alt="Applicant 1" />
                            </div>
                            <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-slate-200">
                                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuADxkS8Nkdf7L-NV143e9hEEvDk1BdTXdIYJeuWapplx2eLva8q3QYC3eLreY9LCYoxyb2NkdmIEsB5aFlFCzPfMtZW-PHGLbDDggZxnqDu91zeLdG_TdIg6Zc5P_mObvqrVRxY_J5-UU4xn20WExK1mHc3tKOn-REiawKWk74mMqj5xpYWwx8pUVFAkWRuXASv3qAY1p1UB3kAQ6VJzjX5oUmONwi7c1OEENxzBrfN9qxzsN5VRC4ks2hxUsMP9d5dUujoayMiCfo" alt="Applicant 2" />
                            </div>
                            <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-slate-200">
                                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBf8zJIued18YeFWF3DAPLGNgY4yg1fa3VJ97XvjpgqXCLQUzytQpms3LgWBCrGMgBMAx321n3794SOeu-rYTAerMuxIgsAqNqvr2eN71Ne5Rc3DCdMNp5UHRZxZmCdpO5AmCflfXPmIXeVqlZ8dHSuvgNzop3VgcuEpItceVrX2xN1dLN7S9-apCPEuYO4BGUMZKgM8qhNo6L-wu8Ql4A8r01u6hi0aQOvrWKdnCn8zJpjDunVWwIpVtKCEmzUt4Vcy--ssUQB6Q" alt="Applicant 3" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Boosting Section */}
            <section className="mb-20">
                <div className="mb-10">
                    <h2 className="text-3xl font-extrabold text-on-background font-headline tracking-tight">Performance Boost wählen</h2>
                    <p className="text-secondary mt-2">Steigern Sie die Reichweite Ihrer Stelle mit gezielten Optimierungen.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {/* Option 1: Local Boost */}
                    <label className="group cursor-pointer relative">
                        <input className="peer hidden" name="boost_option" type="radio" defaultChecked />
                        <div className="h-full bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/15 transition-all group-hover:translate-y-[-4px] group-hover:shadow-lg peer-checked:ring-2 peer-checked:ring-primary peer-checked:border-transparent">
                            <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center mb-6">
                                <span className="material-symbols-outlined text-primary">distance</span>
                            </div>
                            <h4 className="text-xl font-bold text-on-background font-headline mb-3">Local Boost</h4>
                            <p className="text-sm text-secondary leading-relaxed mb-6">Maximieren Sie die Sichtbarkeit innerhalb eines 50km Radius um Ihren Standort.</p>
                            <div className="mt-auto pt-4 border-t border-outline-variant/10 text-xs font-bold uppercase tracking-widest text-primary">Fokus: Region</div>
                        </div>
                    </label>

                    {/* Option 2: Hot Job Banner */}
                    <label className="group cursor-pointer relative">
                        <input className="peer hidden" name="boost_option" type="radio" />
                        <div className="h-full bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/15 transition-all group-hover:translate-y-[-4px] group-hover:shadow-lg peer-checked:ring-2 peer-checked:ring-primary peer-checked:border-transparent">
                            <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center mb-6">
                                <span className="material-symbols-outlined text-primary">campaign</span>
                            </div>
                            <h4 className="text-xl font-bold text-on-background font-headline mb-3">Hot Job Banner</h4>
                            <p className="text-sm text-secondary leading-relaxed mb-6">Ihre Stelle erhält eine exklusive farbliche Hervorhebung im Haupt-Feed der Bewerber.</p>
                            <div className="mt-auto pt-4 border-t border-outline-variant/10 text-xs font-bold uppercase tracking-widest text-primary">Fokus: Aufmerksamkeit</div>
                        </div>
                    </label>

                    {/* Option 3: AI-Match Push */}
                    <label className="group cursor-pointer relative">
                        <input className="peer hidden" name="boost_option" type="radio" />
                        <div className="h-full bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/15 transition-all group-hover:translate-y-[-4px] group-hover:shadow-lg peer-checked:ring-2 peer-checked:ring-primary peer-checked:border-transparent">
                            <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center mb-6">
                                <span className="material-symbols-outlined text-primary">psychology</span>
                            </div>
                            <h4 className="text-xl font-bold text-on-background font-headline mb-3">AI-Match Push</h4>
                            <p className="text-sm text-secondary leading-relaxed mb-6">Direktzustellung Ihrer Vakanz an die Top 1% der passenden Talente in unserer Datenbank.</p>
                            <div className="mt-auto pt-4 border-t border-outline-variant/10 text-xs font-bold uppercase tracking-widest text-primary">Fokus: Qualität</div>
                        </div>
                    </label>
                </div>

                {/* Budget Slider Section */}
                <div className="bg-surface-container-high/40 p-10 rounded-2xl">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-10">
                        <div className="flex-1 w-full">
                            <h3 className="text-2xl font-bold text-on-background font-headline mb-2">Tagesbudget festlegen</h3>
                            <p className="text-secondary text-sm mb-8">Bestimmen Sie, wie viel Sie pro Tag investieren möchten. Höheres Budget bedeutet mehr Reichweite.</p>
                            <div className="relative w-full py-6">
                                <input
                                    type="range"
                                    min="5"
                                    max="200"
                                    value={budget}
                                    onChange={(e) => setBudget(Number(e.target.value))}
                                    className="w-full h-2 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-primary"
                                />
                                <div className="flex justify-between text-xs font-bold text-secondary mt-4">
                                    <span>5 €</span>
                                    <span>50 €</span>
                                    <span>100 €</span>
                                    <span>150 €</span>
                                    <span>200 €</span>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-80 bg-white p-8 rounded-xl shadow-sm border border-outline-variant/10">
                            <p className="text-xs font-bold text-secondary uppercase tracking-widest mb-4 text-center">Geschätzte Resultate</p>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-secondary">Zusätzliche Klicks</span>
                                    <span className="font-bold text-on-background">+{Math.floor(budget * 2.6)}-{Math.floor(budget * 4)}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-secondary">Match-Rate</span>
                                    <span className="font-bold text-on-background">High (AI)</span>
                                </div>
                                <div className="pt-4 border-t border-outline-variant/10 flex justify-between items-end">
                                    <span className="text-xs text-secondary mb-1">Gesamt pro Tag</span>
                                    <span className="text-3xl font-extrabold text-primary font-headline">{budget},00 €</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Final CTA */}
                <div className="mt-12 flex flex-col items-center">
                    <button className="bg-gradient-to-br from-primary to-primary-container px-12 py-4 rounded-md text-on-primary font-bold text-lg shadow-lg hover:shadow-xl transition-all active:scale-95 duration-200">
                        Stelle jetzt boosten
                    </button>
                    <p className="mt-4 text-xs text-secondary italic">Die Abrechnung erfolgt monatlich über Ihr Merchant-Konto.</p>
                </div>
            </section>
        </div>
    );
};
