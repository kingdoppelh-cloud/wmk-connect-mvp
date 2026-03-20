import React, { useState, useMemo } from 'react';
import { Search, X, Star, ArrowRight } from 'lucide-react';
import { type Company } from '../data/companies';
import { CompanyCard } from './CompanyCard';

interface Props {
    companies: Company[];
    favorites: string[];
    onToggleFavorite: (id: string) => void;
}

const CATEGORIES = ['Alle', 'Gastronomie', 'Friseure', 'Handwerk', 'Dienstleistung'];

export const Discover: React.FC<Props> = ({ companies, favorites, onToggleFavorite }) => {
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Alle');

    const filteredCompanies = useMemo(() => {
        return companies
            .filter(c => {
                const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
                    c.category.toLowerCase().includes(search.toLowerCase());
                const matchesCategory = selectedCategory === 'Alle' || c.category === selectedCategory;
                return matchesSearch && matchesCategory;
            })
            .sort((a, b) => {
                // Premium entries always first
                if (a.isPremium && !b.isPremium) return -1;
                if (!a.isPremium && b.isPremium) return 1;
                return 0;
            });
    }, [search, selectedCategory]);

    return (
        <div className="px-6 pt-12 pb-10">
            {/* Hero Section */}
            <div className="text-center mb-12 animate-in fade-in slide-in-from-top duration-700">
                <div className="relative inline-block mb-6">
                    <img
                        src="/logo.png"
                        alt="WMK Connect Logo"
                        className="w-48 h-48 mx-auto drop-shadow-2xl relative z-10 hover:scale-105 transition-transform duration-500"
                    />
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-accent/20 rounded-full blur-3xl -z-10 animate-pulse" />
                </div>
                <h1 className="text-4xl font-black tracking-tight text-slate-900 mb-2">
                    WMK <span className="text-accent underline decoration-4 underline-offset-8">Connect</span>
                </h1>
                <p className="text-slate-500 font-medium text-lg italic">
                    Ihre Region. Ihre Firmen. Ein Netzwerk.
                </p>
            </div>

            {/* Search Bar */}
            <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                    type="text"
                    placeholder="Firma oder Kategorie suchen..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-white border border-gray-100 py-4 pl-12 pr-12 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all text-sm font-medium"
                />
                {search && (
                    <button
                        onClick={() => setSearch('')}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                        <X size={18} />
                    </button>
                )}
            </div>

            {/* Category Chips */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-6 -mx-2 px-2">
                {CATEGORIES.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`whitespace-nowrap px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 shadow-sm border ${selectedCategory === cat
                            ? "bg-accent text-white border-accent scale-105 shadow-accent/20"
                            : "bg-white text-gray-500 border-gray-100 hover:bg-gray-50"
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Premium CTA */}
            <div className="mb-8 p-6 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-xl relative overflow-hidden group">
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="p-1.5 bg-premium/20 rounded-lg">
                            <Star className="text-premium fill-premium" size={18} />
                        </div>
                        <span className="text-premium font-bold text-xs uppercase tracking-widest">Premium Vorteil</span>
                    </div>
                    <h3 className="text-xl font-black mb-2 leading-tight">Werde Top-Empfehlung</h3>
                    <p className="text-slate-400 text-sm mb-6 max-w-[200px]">Erscheinen Sie ganz oben und gewinnen Sie mehr Kunden.</p>
                    <a
                        href="https://buy.stripe.com/8x2fZg5LybQYdyte7R6oo00"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-lg shadow-accent/25 active:scale-95"
                    >
                        Jetzt Premium buchen
                        <ArrowRight size={16} />
                    </a>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-40 h-40 bg-premium/10 rounded-full blur-3xl group-hover:bg-premium/20 transition-colors" />
                <Star className="absolute bottom-6 right-6 text-white/5 rotate-12" size={80} />
            </div>

            {/* Results Label */}
            <div className="mb-4 flex items-center justify-between">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                    Ergebnisse ({filteredCompanies.length})
                </span>
            </div>

            {/* List */}
            <div className="pb-10">
                {filteredCompanies.length > 0 ? (
                    filteredCompanies.map(company => (
                        <CompanyCard
                            key={company.id}
                            company={company}
                            isFavorite={favorites.includes(company.id)}
                            onToggleFavorite={onToggleFavorite}
                        />
                    ))
                ) : (
                    <div className="text-center py-20 bg-gray-50/50 rounded-3xl border border-dashed border-gray-200">
                        <p className="text-gray-400 text-sm font-medium">Keine Ergebnisse gefunden.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
