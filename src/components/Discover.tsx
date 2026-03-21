import React, { useState, useMemo } from 'react';
import { Search, X, Star, ArrowRight, Building2, Briefcase, MapPin } from 'lucide-react';
import { type Company } from '../data/companies';
import { CompanyCard } from './CompanyCard';
import { SkeletonCard } from './SkeletonCard';
import { LeadCaptureModal } from './LeadCaptureModal';

interface Props {
    companies: Company[];
    favorites: string[];
    onToggleFavorite: (id: string) => void;
    onSelectCompany: (id: string) => void;
    isLoading?: boolean;
    userLocation?: [number, number] | null;
    onLocationRequest?: () => void;
}

const CATEGORIES = ['Alle', 'Gastronomie', 'Friseure', 'Handwerk', 'Dienstleistung'];

export const Discover: React.FC<Props> = ({ companies, favorites, onToggleFavorite, onSelectCompany, isLoading, userLocation, onLocationRequest }) => {
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Alle');
    const [selectedRadius, setSelectedRadius] = useState<number>(9999);
    const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

    const filteredCompanies = useMemo(() => {
        return companies
            .filter(c => {
                const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
                    c.category.toLowerCase().includes(search.toLowerCase());
                const matchesCategory = selectedCategory === 'Alle' || c.category === selectedCategory;

                // Only enforce radius check if userLocation is active and distance exists
                const matchesRadius = userLocation && c.distance !== undefined ? c.distance <= selectedRadius : true;

                return matchesSearch && matchesCategory && matchesRadius;
            })
            .sort((a, b) => {
                // Premium entries always first
                if (a.isPremium && !b.isPremium) return -1;
                if (!a.isPremium && b.isPremium) return 1;

                // Then sort by distance if user location is available
                if (userLocation && a.distance !== undefined && b.distance !== undefined) {
                    return a.distance - b.distance;
                }
                return 0;
            });
    }, [companies, search, selectedCategory, selectedRadius, userLocation]);

    return (
        <div className="px-6 pt-12 pb-10">
            {/* Hero Section */}
            <div className="text-center mb-12 animate-in fade-in slide-in-from-top duration-700">
                <div
                    className="relative inline-block mb-6 cursor-default"
                    onClick={(e) => {
                        if (e.detail === 3) {
                            (window as any).onAdminRequest?.();
                        }
                    }}
                >
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
                <p className="text-slate-500 font-medium text-lg italic mb-6">
                    Ihre Region. Ihre Firmen. Ein Netzwerk.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                        onClick={() => setIsLeadModalOpen(true)}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white border border-slate-200 text-slate-700 rounded-full font-bold hover:bg-slate-50 hover:border-slate-300 transition-all hover:shadow-md w-full sm:w-auto"
                    >
                        <Building2 size={18} />
                        Firma eintragen
                    </button>
                    <button
                        onClick={() => {
                            // Find the first premium company to showcase the swipe feature
                            const premiumId = companies.find(c => c.isPremium)?.id;
                            if (premiumId) {
                                window.dispatchEvent(new CustomEvent('open-swipe-jobs', { detail: premiumId }));
                            }
                        }}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-900 border border-slate-800 text-white rounded-full font-bold hover:bg-slate-800 hover:scale-[1.02] transition-all shadow-xl shadow-slate-900/20 group w-full sm:w-auto overflow-hidden relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:animate-[shimmer_1.5s_infinite]"></div>
                        <Briefcase size={18} className="text-accent group-hover:rotate-12 transition-transform" />
                        Swipe-Jobs entdecken
                    </button>
                </div>
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
                <button
                    onClick={onLocationRequest}
                    className={`whitespace-nowrap px-5 py-3 rounded-full text-xs font-bold transition-all duration-300 shadow-sm border flex items-center gap-1.5 ${userLocation
                        ? "bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-900/20"
                        : "bg-white text-slate-700 border-gray-100 hover:bg-gray-50"
                        }`}
                >
                    <MapPin size={14} className={userLocation ? "text-accent" : ""} />
                    GPS verwenden
                </button>
                {userLocation && (
                    <select
                        value={selectedRadius}
                        onChange={(e) => setSelectedRadius(Number(e.target.value))}
                        className="bg-white border border-gray-100 text-slate-700 text-xs font-bold py-3 pl-4 pr-8 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-accent/20 cursor-pointer appearance-none shrink-0"
                        style={{ backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`, backgroundPosition: `right 10px center`, backgroundRepeat: `no-repeat`, backgroundSize: `14px 14px` }}
                    >
                        <option value={9999}>Überall</option>
                        <option value={5}>Max. 5 km</option>
                        <option value={15}>Max. 15 km</option>
                        <option value={30}>Max. 30 km</option>
                        <option value={50}>Max. 50 km</option>
                    </select>
                )}
                {CATEGORIES.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`whitespace-nowrap px-5 py-3 rounded-full text-xs font-bold transition-all duration-300 shadow-sm border ${selectedCategory === cat
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
                    Ergebnisse ({isLoading ? '...' : filteredCompanies.length})
                </span>
            </div>

            {/* List */}
            <div className="pb-10">
                {isLoading ? (
                    <>
                        <SkeletonCard />
                        <SkeletonCard />
                        <SkeletonCard />
                    </>
                ) : filteredCompanies.length > 0 ? (
                    filteredCompanies.map(company => (
                        <CompanyCard
                            key={company.id}
                            company={company}
                            isFavorite={favorites.includes(company.id)}
                            onToggleFavorite={onToggleFavorite}
                            onSelect={() => onSelectCompany(company.id)}
                        />
                    ))
                ) : (
                    <div className="text-center py-20 bg-gray-50/50 rounded-3xl border border-dashed border-gray-200">
                        <p className="text-gray-400 text-sm font-medium">Keine Ergebnisse gefunden.</p>
                    </div>
                )}
            </div>

            <LeadCaptureModal
                isOpen={isLeadModalOpen}
                onClose={() => setIsLeadModalOpen(false)}
                leadType="new_entry"
            />
        </div>
    );
};

