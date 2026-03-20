import React, { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';
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
        <div className="px-6 pt-6">
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
