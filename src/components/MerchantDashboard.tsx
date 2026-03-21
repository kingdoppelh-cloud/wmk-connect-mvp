import React from 'react';
import { Bell, Eye, Phone, Send, Edit3, Camera, ChefHat, User, Plus, Home, BarChart2, Briefcase } from 'lucide-react';
import { Company } from '../data/companies';

interface MerchantDashboardProps {
    company: Company;
    onClose: () => void;
}

export const MerchantDashboard: React.FC<MerchantDashboardProps> = ({ company, onClose }) => {
    return (
        <div className="bg-slate-50 text-slate-900 min-h-screen pb-32 font-sans relative z-[100]">
            {/* TopAppBar */}
            <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100 shadow-sm">
                <div className="flex justify-between items-center w-full px-6 py-4 max-w-2xl mx-auto">
                    <span className="text-xl font-extrabold tracking-tight text-slate-900 truncate pr-4">{company.name}</span>
                    <div className="flex items-center gap-4 shrink-0">
                        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors relative" onClick={onClose}>
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full border-2 border-white"></span>
                        </button>
                        <div className="w-9 h-9 rounded-full bg-slate-200 overflow-hidden border-2 border-white shadow-sm shrink-0">
                            <img className="w-full h-full object-cover" alt="Merchant Profile" src={company.image} />
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-2xl mx-auto px-6 pt-8 space-y-10">
                {/* Greeting Header */}
                <header className="space-y-1 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <p className="text-slate-500 text-xs font-bold tracking-widest uppercase">Willkommen zurück</p>
                    <h1 className="text-3xl font-black tracking-tight text-slate-900">Hallo, {company.name.split(' ')[0]}!</h1>
                </header>

                {/* Progress Bar Card */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/60 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-75">
                    <div className="flex justify-between items-end mb-4">
                        <div className="space-y-1">
                            <h3 className="font-bold text-slate-900 text-lg">Profil vervollständigen</h3>
                            <p className="text-xs text-slate-500 font-medium">Erhöhen Sie Ihre Sichtbarkeit für Bewerber.</p>
                        </div>
                        <span className="text-accent font-black text-xl">85%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                        <div className="bg-gradient-to-r from-accent to-pink-500 h-full rounded-full" style={{ width: '85%' }}></div>
                    </div>
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200/60 flex flex-col items-center text-center space-y-3 group hover:bg-slate-50 transition-colors">
                        <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                            <Eye size={28} />
                        </div>
                        <div>
                            <span className="block text-3xl font-black text-slate-900">245</span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Profilaufrufe</span>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200/60 flex flex-col items-center text-center space-y-3 group hover:bg-slate-50 transition-colors">
                        <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
                            <Phone size={28} />
                        </div>
                        <div>
                            <span className="block text-3xl font-black text-slate-900">12</span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Telefon-Klicks</span>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200/60 flex flex-col items-center text-center space-y-3 group hover:bg-slate-50 transition-colors">
                        <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                            <Send size={28} />
                        </div>
                        <div>
                            <span className="block text-3xl font-black text-slate-900">3</span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Job-Anfragen</span>
                        </div>
                    </div>
                </div>

                {/* Aktuelles Angebot / Mittagstisch */}
                <section className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150">
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/60 flex justify-between items-center group">
                        <div className="space-y-1 pr-4">
                            <h3 className="font-bold text-slate-900">Aktuelles Angebot (Heute)</h3>
                            <p className="text-sm text-slate-500 italic bg-amber-50 text-amber-800 px-3 py-1.5 rounded-lg inline-block mt-2 font-medium">Wiener Schnitzel mit Kartoffelsalat - 14,50€</p>
                        </div>
                        <button className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 hover:bg-accent hover:text-white transition-colors shrink-0 flex items-center justify-center">
                            <Edit3 size={20} />
                        </button>
                    </div>
                </section>

                {/* Bildergalerie */}
                <section className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
                    <h2 className="text-xl font-black text-slate-900">Bildergalerie</h2>
                    <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-3">
                            {company.gallery && company.gallery.length > 0 ? (
                                company.gallery.slice(0, 3).map((img, idx) => (
                                    <div key={idx} className="aspect-square rounded-2xl bg-slate-100 overflow-hidden border border-slate-200/60">
                                        <img alt={`Gallery ${idx}`} className="w-full h-full object-cover" src={img} />
                                    </div>
                                ))
                            ) : (
                                <div className="aspect-square rounded-2xl bg-slate-100 flex items-center justify-center text-slate-300 border border-slate-200/60">
                                    <Camera size={24} />
                                </div>
                            )}
                        </div>
                        <button className="w-full py-4 px-4 border-2 border-dashed border-slate-300 hover:border-accent hover:text-accent rounded-2xl text-slate-500 text-sm font-bold flex items-center justify-center gap-2 hover:bg-accent/5 transition-all">
                            <Camera size={18} />
                            <span>Neues Bild hochladen</span>
                        </button>
                    </div>
                </section>

                {/* Job Listings Section */}
                <section className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-black text-slate-900">Offene Jobanzeigen</h2>
                        <button className="text-accent text-sm font-bold hover:underline">Alle ansehen</button>
                    </div>
                    <div className="space-y-3">
                        <div className="bg-white rounded-3xl p-5 flex items-center justify-between shadow-sm border border-slate-200/60 transition-transform hover:-translate-y-1">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-600">
                                    <ChefHat size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-base">Koch/Köchin (m/w/d)</h4>
                                    <p className="text-xs text-slate-400 font-medium">Erstellt vor 3 Tagen</p>
                                </div>
                            </div>
                            <span className="px-4 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-widest bg-emerald-100 text-emerald-700">Aktiv</span>
                        </div>

                        <div className="bg-white rounded-3xl p-5 flex items-center justify-between shadow-sm border border-slate-200/60 transition-transform hover:-translate-y-1">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400">
                                    <User size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-base">Servicekraft (m/w/d)</h4>
                                    <p className="text-xs text-slate-400 font-medium">Erstellt vor 1 Woche</p>
                                </div>
                            </div>
                            <span className="px-4 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-widest bg-slate-100 text-slate-500">Pausiert</span>
                        </div>
                    </div>
                </section>

                {/* Signature Editorial Card */}
                <div className="relative overflow-hidden rounded-3xl bg-slate-900 p-8 text-white shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500 delay-500 mb-8">
                    <div className="relative z-10 space-y-4">
                        <h3 className="text-2xl font-black tracking-tight">Talente finden mit System</h3>
                        <p className="text-slate-300 max-w-xs leading-relaxed text-sm font-medium">Profitieren Sie von unserem WMK-Partner-Netzwerk und finden Sie schneller lokales Personal.</p>
                        <button className="bg-accent text-white font-bold px-6 py-3 rounded-xl text-sm shadow-sm active:scale-95 transition-transform hover:bg-accent/90 inline-block mt-2">
                            Kampagne starten
                        </button>
                    </div>
                    <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-accent/30 rounded-full blur-3xl"></div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl"></div>
                </div>
            </main>

            {/* Floating Action Button */}
            <button className="fixed bottom-28 right-6 bg-accent hover:bg-accent/90 text-white px-6 py-4 rounded-full shadow-2xl shadow-accent/30 flex items-center gap-3 active:scale-90 transition-all z-40">
                <Plus size={20} strokeWidth={3} />
                <span className="font-bold text-sm tracking-wide">Neuen Job posten</span>
            </button>

            {/* BottomNavBar Shell */}
            <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-8 pt-4 bg-white/90 backdrop-blur-xl border-t border-slate-100 z-50">
                <button onClick={onClose} className="flex flex-col items-center gap-1.5 text-slate-400 hover:text-slate-900 transition-colors">
                    <Home size={24} />
                    <span className="text-[9px] font-bold tracking-widest uppercase">App</span>
                </button>
                <button className="flex flex-col items-center gap-1.5 text-accent bg-accent/10 rounded-2xl px-6 py-2.5">
                    <BarChart2 size={24} />
                    <span className="text-[9px] font-bold tracking-widest uppercase">Dashboard</span>
                </button>
                <button className="flex flex-col items-center gap-1.5 text-slate-400 hover:text-slate-900 transition-colors">
                    <Briefcase size={24} />
                    <span className="text-[9px] font-bold tracking-widest uppercase">Jobs</span>
                </button>
                <button className="flex flex-col items-center gap-1.5 text-slate-400 hover:text-slate-900 transition-colors">
                    <User size={24} />
                    <span className="text-[9px] font-bold tracking-widest uppercase">Profil</span>
                </button>
            </nav>
        </div>
    );
};
