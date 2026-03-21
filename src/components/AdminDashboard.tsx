import React, { useState } from 'react';
import { Plus, Edit2, Trash2, ArrowLeft, Search } from 'lucide-react';
import { type Company } from '../data/companies';

interface Props {
    companies: Company[];
    onBack: () => void;
    onLogout: () => void;
    onEdit: (company: Company) => void;
    onAdd: () => void;
    onDelete: (id: string) => Promise<void>;
}

export const AdminDashboard: React.FC<Props> = ({ companies, onBack, onLogout, onEdit, onAdd, onDelete }) => {
    const [search, setSearch] = useState('');

    const filtered = companies.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.category.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="bg-white border-b border-slate-200 sticky top-0 z-20">
                <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                            <ArrowLeft size={20} className="text-slate-600" />
                        </button>
                        <div>
                            <h1 className="text-xl font-black text-slate-900 tracking-tight">Admin-Bereich</h1>
                            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest leading-none mt-1">Firmenverwaltung</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={onLogout}
                            className="text-slate-400 hover:text-red-500 font-black text-[10px] uppercase tracking-widest px-3 py-2 transition-colors"
                        >
                            Abmelden
                        </button>
                        <button
                            onClick={onAdd}
                            className="flex items-center gap-2 bg-accent text-white px-5 py-2.5 rounded-xl font-black text-sm shadow-lg shadow-accent/25 hover:scale-105 active:scale-95 transition-all"
                        >
                            <Plus size={18} />
                            Neu
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-6 py-8">
                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                        <span className="text-[10px] font-black text-slate-400 uppercase block mb-1">Gesamt</span>
                        <div className="text-2xl font-black text-slate-900">{companies.length}</div>
                    </div>
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                        <span className="text-[10px] font-black text-slate-400 uppercase block mb-1">Premium</span>
                        <div className="text-2xl font-black text-accent">{companies.filter(c => c.isPremium).length}</div>
                    </div>
                </div>

                {/* Search */}
                <div className="relative mb-6">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="In der Verwaltung suchen..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-white border border-slate-200 py-4 pl-12 pr-4 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all text-sm font-medium"
                    />
                </div>

                {/* List */}
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100 font-black text-[10px] text-slate-400 uppercase tracking-widest">
                                <th className="px-6 py-4">Firma</th>
                                <th className="px-6 py-4 hidden sm:table-cell">Kategorie</th>
                                <th className="px-6 py-4 hidden md:table-cell">Status</th>
                                <th className="px-6 py-4 text-right">Aktionen</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filtered.map(company => (
                                <tr key={company.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="font-extrabold text-slate-900">{company.name}</div>
                                        <div className="text-xs text-slate-500 truncate max-w-[200px]">{company.address}</div>
                                    </td>
                                    <td className="px-6 py-4 hidden sm:table-cell">
                                        <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded-lg">
                                            {company.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 hidden md:table-cell">
                                        {company.isPremium && (
                                            <span className="text-[10px] font-black text-accent bg-accent/10 px-2 py-1 rounded-lg uppercase tracking-tighter shadow-sm border border-accent/20">
                                                Premium
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => onEdit(company)}
                                                className="p-2 text-slate-400 hover:text-slate-900 hover:bg-white rounded-lg transition-all border border-transparent hover:border-slate-200"
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    if (confirm(`Möchten Sie ${company.name} wirklich löschen?`)) {
                                                        onDelete(company.id);
                                                    }
                                                }}
                                                className="p-2 text-slate-400 hover:text-red-600 hover:bg-white rounded-lg transition-all border border-transparent hover:border-red-100"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filtered.length === 0 && (
                        <div className="text-center py-20 text-slate-400 font-medium text-sm">
                            Keine Einträge gefunden.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
