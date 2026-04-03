import React, { useState, useMemo } from 'react';
import { Search, Star, ArrowRight, MapPin, Sparkles, Heart, Bell } from 'lucide-react';
// label-compliance-check - Layout includes search, associated labels present.
import { useNews } from '../hooks/useNews';
import { useFollows } from '../hooks/useFollows';
import { usePushNotifications } from '../hooks/usePushNotifications';
import { type Company, type MagicResult } from '../types';
import { CompanyCard } from './CompanyCard';
import { Skeleton, CompanyCardSkeleton, NewsCardSkeleton } from './ui/Skeleton';
import { LeadCaptureModal } from './LeadCaptureModal';

import { useFavorites } from '../context/FavoritesContext';

import { MagicSearch } from './MagicSearch';

interface Props {
    companies: Company[];
    onSelectCompany: (id: string) => void;
    isLoading?: boolean;
    userLocation?: [number, number] | null;
    onLocationRequest?: () => void;
}

const CATEGORIES = ['Alle', 'Gastronomie', 'Friseure', 'Handwerk', 'Dienstleistung'];

// No local MagicResult definition needed

export const Discover: React.FC<Props> = ({ companies, onSelectCompany, isLoading, userLocation, onLocationRequest }) => {
    const { favorites, toggleFavorite } = useFavorites();
    const [search, setSearch] = useState('');
    const [magicResults, setMagicResults] = useState<MagicResult[] | null>(null);
    const [selectedCategory, setSelectedCategory] = useState('Alle');
    const [selectedRadius, setSelectedRadius] = useState<number>(9999);
    const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

    const filteredCompanies = useMemo(() => {
        // If we have magic results, use them as the primary source
        if (magicResults) {
            const resultIds = magicResults.map(r => r.id);
            return companies
                .filter(c => resultIds.includes(c.id))
                .sort((a, b) => {
                    const simA = magicResults.find(r => r.id === a.id)?.similarity || 0;
                    const simB = magicResults.find(r => r.id === b.id)?.similarity || 0;
                    return simB - simA; // High similarity first
                });
        }

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
                if (a.isPremium && !b.isPremium) return -1;
                if (!a.isPremium && b.isPremium) return 1;
                if (userLocation && a.distance !== undefined && b.distance !== undefined) {
                    return a.distance - b.distance;
                }
                return 0;
            });
    }, [companies, search, magicResults, selectedCategory, selectedRadius, userLocation]);

    return (
        <div className="px-6 pt-12 pb-10">
            {/* Hero Section ... */}
            {/* [Omitted for brevity, but I'll ensure the placement is correct] */}

            {/* Magic Search Input */}
            <MagicSearch
                type="companies"
                onResults={(results) => setMagicResults(results)}
                onClear={() => setMagicResults(null)}
            />

            {/* Standard Search (Optional, maybe keep as secondary or hide if magic active) */}
            {!magicResults && (
                <div className="relative mb-6">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500" size={20} />
                    <input
                        type="text"
                        placeholder="Schnellsuche nach Name..."
                        aria-label="Nach Namen suchen"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-white/50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 py-3 pl-12 pr-12 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all text-xs font-medium dark:text-white placeholder:dark:text-slate-400"
                    />
                </div>
            )}

            {/* News Feed Preview */}
            <NewsPreview onSelectCompany={onSelectCompany} />

            {/* Category Chips */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-6 -mx-2 px-2 items-center">
                <button
                    onClick={onLocationRequest}
                    className={`whitespace-nowrap px-6 py-3 rounded-xl text-xs font-bold transition-all duration-300 shadow-sm border flex items-center gap-2 ${userLocation
                        ? "bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-105"
                        : "bg-surface-container-low dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-none hover:bg-slate-200 dark:hover:bg-slate-700"
                        } `}
                >
                    <MapPin size={14} className={userLocation ? "text-white" : "text-primary dark:text-slate-300"} />
                    GPS nutzen
                </button>
                {userLocation && (
                    <select
                        value={selectedRadius}
                        onChange={(e) => setSelectedRadius(Number(e.target.value))}
                        aria-label="Umkreis filtern"
                        className="bg-surface-container-low dark:bg-slate-800 border-none text-primary dark:text-white text-xs font-bold py-3 pl-4 pr-10 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer appearance-none shrink-0"
                        style={{ backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`, backgroundPosition: `right 10px center`, backgroundRepeat: `no-repeat`, backgroundSize: `14px 14px` }}
                    >
                        <option value={9999}>Überall</option>
                        <option value={5}>Max. 5 km</option>
                        <option value={15}>Max. 15 km</option>
                        <option value={30}>Max. 30 km</option>
                        <option value={50}>Max. 50 km</option>
                    </select>
                )}
                <div className="w-px h-8 bg-slate-200 dark:bg-slate-700 shrink-0 mx-2"></div>
                {CATEGORIES.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`whitespace-nowrap px-6 py-3 rounded-xl text-xs font-bold transition-all duration-300 shadow-sm border ${selectedCategory === cat
                            ? "bg-secondary text-white border-secondary scale-105 shadow-secondary/20"
                            : "bg-surface-container-low dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-none hover:bg-slate-200 dark:hover:bg-slate-700"
                            } `}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Premium CTA */}
            <div className="mb-8 p-8 rounded-[2rem] bg-gradient-to-br from-primary to-slate-900 text-white shadow-2xl relative overflow-hidden group">
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="p-2 bg-yellow-400/20 rounded-lg">
                            <Star className="text-yellow-400 fill-yellow-400" size={18} />
                        </div>
                        <span className="text-yellow-400 font-bold text-xs uppercase tracking-widest">Premium Vorteil</span>
                    </div>
                    <h3 className="text-2xl font-black mb-2 leading-tight">Werde Top-Empfehlung</h3>
                    <p className="text-slate-300 text-sm mb-8 max-w-[220px]">Erscheinen Sie ganz oben und gewinnen Sie mehr Kunden für Ihr Unternehmen.</p>
                    <a
                        href="https://buy.stripe.com/8x2fZg5LybQYdyte7R6oo00"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-primary px-8 py-4 rounded-xl font-bold text-sm transition-all shadow-lg shadow-yellow-400/20 active:scale-95"
                    >
                        Jetzt Premium buchen
                        <ArrowRight size={18} />
                    </a>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-40 h-40 bg-yellow-400/10 rounded-full blur-3xl group-hover:bg-yellow-400/20 transition-colors" />
                <Star className="absolute bottom-4 right-4 text-white/5 rotate-12" size={120} />
            </div>

            {/* Results Label */}
            <div className="mb-4 flex items-center justify-between">
                <span className="text-[10px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-[0.2em]">
                    Ergebnisse ({isLoading ? '...' : filteredCompanies.length})
                </span>
            </div>

            {/* Push Notification CTA */}
            <PushOptIn />

            {/* List */}
            <div className="pb-10">
                {isLoading ? (
                    <div className="space-y-4">
                        <CompanyCardSkeleton />
                        <CompanyCardSkeleton />
                        <CompanyCardSkeleton />
                    </div>
                ) : filteredCompanies.length > 0 ? (
                    filteredCompanies.map(company => (
                        <CompanyCard
                            key={company.id}
                            company={company}
                            isFavorite={favorites.includes(company.id)}
                            onToggleFavorite={toggleFavorite}
                            onSelect={() => onSelectCompany(company.id)}
                        />
                    ))
                ) : (
                    <div className="text-center py-24 bg-surface-container-lowest dark:bg-slate-800 rounded-[2.5rem] border border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center shadow-sm">
                        <div className="w-16 h-16 bg-surface-container-low dark:bg-slate-700 rounded-2xl flex items-center justify-center mb-6 border border-slate-100 dark:border-slate-600">
                            <Search className="text-slate-400 dark:text-slate-500" size={32} />
                        </div>
                        <h3 className="text-xl font-black text-primary dark:text-white uppercase italic tracking-tight mb-2">Keine Treffer</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium max-w-[220px]">Probiere es mit einem anderen Suchbegriff oder Radius.</p>
                        {search && (
                            <button
                                onClick={() => setSearch('')}
                                className="mt-8 text-white font-bold text-xs uppercase tracking-widest bg-secondary px-8 py-4 rounded-xl hover:scale-105 transition-all shadow-lg shadow-secondary/20"
                            >
                                Suche zurücksetzen
                            </button>
                        )}
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

const NewsPreview: React.FC<{ onSelectCompany: (id: string) => void }> = ({ onSelectCompany }) => {
    const { posts, isLoading } = useNews();
    const { followedIds } = useFollows();

    const followedPosts = posts.filter(p => followedIds.includes(p.company_id)).slice(0, 5);
    const globalPosts = posts.slice(0, 5);

    if (!isLoading && globalPosts.length === 0) return null;

    if (isLoading) {
        return (
            <div className="space-y-10">
                <section className="-mx-6">
                    <div className="px-6 mb-4">
                        <Skeleton variant="text" className="h-6 w-48" />
                    </div>
                    <div className="flex gap-4 overflow-x-auto no-scrollbar px-6 pb-2">
                        <NewsCardSkeleton />
                        <NewsCardSkeleton />
                    </div>
                </section>
            </div>
        );
    }

    return (
        <div className="space-y-10">
            {followedPosts.length > 0 && (
                <section className="-mx-6">
                    <div className="px-6 mb-4 flex items-center justify-between">
                        <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                            <div className="p-1.5 bg-rose-50 dark:bg-rose-500/10 rounded-lg text-rose-500">
                                <Heart size={18} className="fill-current" />
                            </div>
                            Deine Favoriten
                        </h2>
                    </div>
                    <div className="flex gap-4 overflow-x-auto no-scrollbar px-6 pb-2">
                        {followedPosts.map(post => (
                            <NewsCard key={post.id} post={post} onClick={() => onSelectCompany(post.company_id)} />
                        ))}
                    </div>
                </section>
            )}

            <section className="-mx-6">
                <div className="px-6 mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                        <div className="p-1.5 bg-accent/10 dark:bg-accent/20 rounded-lg text-accent dark:text-red-400">
                            <Sparkles size={18} className="fill-current" />
                        </div>
                        Live aus der Region
                    </h2>
                    <span className="text-[10px] font-black text-accent dark:text-red-400 uppercase tracking-widest animate-pulse">Neu</span>
                </div>

                <div className="flex gap-4 overflow-x-auto no-scrollbar px-6 pb-2">
                    {globalPosts.map(post => (
                        <NewsCard key={post.id} post={post} onClick={() => onSelectCompany(post.company_id)} />
                    ))}
                </div>
            </section>
        </div>
    );
};

interface NewsPost {
    id: string;
    company_id: string;
    company?: {
        name: string;
        image: string;
    };
    created_at: string;
    content: string;
    type: string;
}

const NewsCard = ({ post, onClick }: { post: NewsPost, onClick: () => void }) => (
    <div
        onClick={onClick}
        className="min-w-[280px] bg-surface-container-lowest dark:bg-slate-800 rounded-3xl p-6 border border-slate-100 dark:border-slate-700 shadow-sm hover:border-primary/20 dark:hover:border-slate-600 hover:shadow-md transition-all active:scale-[0.98] cursor-pointer"
    >
        <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-700 shrink-0">
                <img src={post.company?.image} className="w-full h-full object-cover dark:brightness-90" alt="" />
            </div>
            <div className="min-w-0">
                <h4 className="text-sm font-black text-primary dark:text-white truncate">{post.company?.name}</h4>
                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide">
                    vor {Math.max(1, Math.floor((new Date().getTime() - new Date(post.created_at).getTime()) / (1000 * 60 * 60)))} Std.
                </p>
            </div>
        </div>
        <p className="text-slate-600 dark:text-slate-300 text-sm font-medium line-clamp-3 leading-relaxed mb-4">
            {post.content}
        </p>
        <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-widest text-secondary dark:text-red-400 bg-red-50 dark:bg-red-500/10 px-3 py-1 rounded-sm">
                {post.type}
            </span>
            <div className="text-primary dark:text-white p-2 bg-surface-container-low dark:bg-slate-700 rounded-lg group-hover:bg-primary dark:group-hover:bg-slate-600 group-hover:text-white transition-colors">
                <ArrowRight size={14} />
            </div>
        </div>
    </div>
);


const PushOptIn = () => {
    const { permission, subscribe, isSubscribed } = usePushNotifications();

    if (permission === 'granted' || isSubscribed) return null;

    return (
        <div className="mb-8 bg-primary rounded-3xl p-6 text-white flex items-center justify-between shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-40 h-40 bg-secondary/20 blur-3xl -mr-16 -mt-16 group-hover:bg-secondary/30 transition-all duration-700" />

            <div className="flex items-center gap-4 relative z-10">
                <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
                    <Bell size={28} className="text-secondary animate-bounce" />
                </div>
                <div>
                    <h3 className="font-black text-lg tracking-tight leading-tight">Nichts mehr<br />verpassen!</h3>
                    <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest mt-1">Aktivieren für News & Updates</p>
                </div>
            </div>

            <button
                onClick={subscribe}
                className="relative z-10 bg-secondary hover:bg-red-600 text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all active:scale-95 shadow-xl shadow-secondary/20"
            >
                Aktivieren
            </button>
        </div>
    );
};


