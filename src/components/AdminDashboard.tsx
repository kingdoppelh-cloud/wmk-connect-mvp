import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus, Edit2, Trash2, ArrowLeft, Search, QrCode, X,
    Download, LogOut, LayoutDashboard, Building2,
    Star, Users, ExternalLink, ShieldCheck
} from 'lucide-react';
import { type Company } from '../data/companies';
import { useAuth } from '../context/AuthContext';

interface Props {
    companies: Company[];
    onBack: () => void;
    onEdit: (company: Company) => void;
    onAdd: () => void;
    onDelete: (id: string) => Promise<void>;
}

export const AdminDashboard: React.FC<Props> = ({ companies, onBack, onEdit, onAdd, onDelete }) => {
    const { signOut } = useAuth();
    const [search, setSearch] = useState('');
    const [showQrFor, setShowQrFor] = useState<Company | null>(null);

    const filtered = companies.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.category.toLowerCase().includes(search.toLowerCase())
    );

    const stats = [
        { label: 'Gesamt', value: companies.length, icon: Building2, color: 'text-slate-900', bg: 'bg-slate-100' },
        { label: 'Premium', value: companies.filter(c => c.isPremium).length, icon: Star, color: 'text-accent', bg: 'bg-accent/10' },
        { label: 'Kategorien', value: new Set(companies.map(c => c.category)).size, icon: LayoutDashboard, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Personal', value: 1, icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' }
    ];

    return (
        <div className="min-h-screen bg-slate-50/50">
            {/* Header */}
            <div className="bg-white/80 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-20">
                <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={onBack}
                            className="w-10 h-10 flex items-center justify-center hover:bg-slate-100 rounded-xl transition-all active:scale-90"
                        >
                            <ArrowLeft size={20} className="text-slate-600" />
                        </button>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-xl font-black text-slate-900 tracking-tight">Admin-Zentrale</h1>
                                <ShieldCheck size={16} className="text-accent" />
                            </div>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none mt-1">Management Framework v1.0</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={signOut}
                            className="hidden sm:flex items-center gap-2 text-slate-400 hover:text-red-500 font-black text-[10px] uppercase tracking-widest px-4 py-2 rounded-xl hover:bg-red-50 transition-all group"
                        >
                            <LogOut size={14} className="group-hover:-translate-x-1 transition-transform" />
                            Abmelden
                        </button>
                        <button
                            onClick={onAdd}
                            className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-2xl font-black text-sm shadow-xl shadow-slate-900/20 hover:shadow-accent/40 hover:bg-accent ring-4 ring-white transition-all active:scale-95"
                        >
                            <Plus size={18} />
                            <span>Neuer Eintrag</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-10">
                {/* Statistics Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white/70 backdrop-blur-md p-6 rounded-3xl border border-slate-200 shadow-sm group hover:border-accent/30 transition-all hover:bg-white hover:shadow-md"
                        >
                            <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform`}>
                                <stat.icon size={20} className={stat.color} />
                            </div>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">{stat.label}</span>
                            <div className="text-3xl font-black text-slate-900 tracking-tight">{stat.value}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Quick Actions Bar */}
                <div className="bg-slate-900 rounded-3xl p-6 mb-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 blur-[100px] pointer-events-none" />

                    <div className="flex items-center gap-5 relative z-10">
                        <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
                            <Plus size={28} className="text-accent" />
                        </div>
                        <div>
                            <h3 className="text-lg font-black tracking-tight">Schnellerfassung</h3>
                            <p className="text-xs text-white/50 font-bold uppercase tracking-widest">Inhalte direkt veröffentlichen</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-3 relative z-10 w-full md:w-auto">
                        {['News', 'Event', 'Job'].map((action) => (
                            <button
                                key={action}
                                className="bg-white/10 hover:bg-white/20 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest border border-white/10 transition-all active:scale-95"
                            >
                                + {action}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Search & Main List */}
                <div className="mb-6">
                    <div className="relative group">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-accent transition-colors" size={20} />
                        <input
                            type="text"
                            placeholder="Systemweite Suche nach Firmen oder Kategorien..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-white border border-slate-200 py-5 pl-14 pr-6 rounded-[2rem] shadow-sm focus:outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent transition-all text-sm font-bold tracking-tight"
                        />
                    </div>
                </div>

                <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[600px]">
                            <thead>
                                <tr className="bg-slate-50/80 border-b border-slate-100 font-black text-[10px] text-slate-400 uppercase tracking-widest">
                                    <th className="px-8 py-5">Partner</th>
                                    <th className="px-8 py-5">Klassifizierung</th>
                                    <th className="px-8 py-5">Status</th>
                                    <th className="px-8 py-5 text-right">Verwaltung</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                <AnimatePresence mode="popLayout">
                                    {filtered.map((company) => (
                                        <motion.tr
                                            key={company.id}
                                            layout
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="hover:bg-slate-50/70 transition-colors group"
                                        >
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-2xl bg-slate-100 overflow-hidden border border-slate-200 shadow-inner flex-shrink-0">
                                                        {company.image ? (
                                                            <img src={company.image} alt="" className="w-full h-full object-cover" />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center text-slate-400">
                                                                <Building2 size={24} />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <div className="font-extrabold text-slate-900 text-sm leading-tight flex items-center gap-2">
                                                            {company.name}
                                                            {company.isPremium && <Star size={12} className="text-accent fill-accent" />}
                                                        </div>
                                                        <div className="text-[11px] text-slate-500 font-medium truncate max-w-[180px] mt-0.5">{company.address}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <span className="text-[10px] font-black tracking-widest uppercase text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
                                                    {company.category}
                                                </span>
                                            </td>
                                            <td className="px-8 py-5">
                                                {company.isPremium ? (
                                                    <span className="inline-flex items-center gap-1.5 text-[10px] font-black text-accent bg-accent/10 px-3 py-1.5 rounded-full uppercase tracking-tighter shadow-sm border border-accent/20">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                                                        Premium
                                                    </span>
                                                ) : (
                                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-3 py-1.5">Basis</span>
                                                )}
                                            </td>
                                            <td className="px-8 py-5 text-right">
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                                                    <button
                                                        onClick={() => setShowQrFor(company)}
                                                        className="p-2.5 text-slate-400 hover:text-accent hover:bg-white rounded-xl transition-all border border-transparent hover:border-accent/20 hover:shadow-lg active:scale-90"
                                                        title="QR-Code anzeigen"
                                                    >
                                                        <QrCode size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => onEdit(company)}
                                                        className="p-2.5 text-slate-400 hover:text-slate-900 hover:bg-white rounded-xl transition-all border border-transparent hover:border-slate-200 hover:shadow-lg active:scale-90"
                                                    >
                                                        <Edit2 size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            if (confirm(`Möchten Sie ${company.name} wirklich löschen?`)) {
                                                                onDelete(company.id);
                                                            }
                                                        }}
                                                        className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-white rounded-xl transition-all border border-transparent hover:border-red-100 hover:shadow-lg active:scale-90"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    </div>
                    {filtered.length === 0 && (
                        <div className="text-center py-24 px-6">
                            <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6">
                                <Search size={32} className="text-slate-200" />
                            </div>
                            <h3 className="text-lg font-black text-slate-900 mb-2">Keine Treffer</h3>
                            <p className="text-sm text-slate-500 font-medium max-w-[280px] mx-auto leading-relaxed">
                                Deine Suche nach "{search}" ergab keine Ergebnisse in der Datenbank.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* QR Code Modal */}
            <AnimatePresence>
                {showQrFor && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-white rounded-[3rem] w-full max-w-sm overflow-hidden shadow-[0_0_100px_-20px_rgba(0,0,0,0.5)] relative"
                        >
                            <button
                                onClick={() => setShowQrFor(null)}
                                className="absolute top-6 right-6 p-2 bg-slate-100 text-slate-400 hover:text-slate-900 hover:bg-slate-200 rounded-full transition-all active:scale-90"
                            >
                                <X size={20} />
                            </button>

                            <div className="p-10 text-center">
                                <div className="w-20 h-20 bg-accent/10 rounded-[2rem] flex items-center justify-center mx-auto mb-6 text-accent">
                                    <QrCode size={40} />
                                </div>
                                <h2 className="text-2xl font-black text-slate-900 mb-1 tracking-tight">Tischaufsteller</h2>
                                <p className="text-sm text-slate-500 font-bold uppercase tracking-widest mb-8">{showQrFor.name}</p>

                                <div className="bg-slate-50 p-6 rounded-[2.5rem] border border-slate-100 mb-8 flex flex-col items-center shadow-inner ring-8 ring-slate-50/50">
                                    <img
                                        src={`https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(window.location.origin + '/?company=' + showQrFor.id)}&bgcolor=FFFFFF&color=0F172A`}
                                        alt="QR Code"
                                        className="w-48 h-48 rounded-2xl shadow-sm mix-blend-multiply"
                                    />
                                    <div className="mt-4 flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                        <ExternalLink size={12} />
                                        <span>Scan zum Profil</span>
                                    </div>
                                </div>

                                <p className="text-xs text-slate-400 mb-8 px-4 font-medium leading-relaxed">
                                    Drucken Sie diesen Code aus. Gäste gelangen beim Scannen direkt zu Ihren Angeboten und Jobs.
                                </p>

                                <button
                                    onClick={() => {
                                        const url = `https://api.qrserver.com/v1/create-qr-code/?size=1000x1000&data=${encodeURIComponent(window.location.origin + '/?company=' + showQrFor.id)}&bgcolor=FFFFFF&color=0F172A`;
                                        window.open(url, '_blank');
                                    }}
                                    className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-accent hover:shadow-xl hover:shadow-accent/20 transition-all active:scale-95"
                                >
                                    <Download size={18} />
                                    <span>Download HD</span>
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
