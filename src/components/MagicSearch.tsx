import React, { useState } from 'react';
import { Sparkles, X, Loader2 } from 'lucide-react';
import { useSemanticSearch } from '../hooks/useSemanticSearch';
import { motion, AnimatePresence } from 'framer-motion';

interface MagicSearchProps {
    onResults: (results: { id: string; similarity: number }[]) => void;
    onClear: () => void;
    type: 'jobs' | 'companies';
}

export const MagicSearch: React.FC<MagicSearchProps> = ({ onResults, onClear, type }) => {
    const [query, setQuery] = useState('');
    const { performSearch, isSearching } = useSemanticSearch();
    const [isActive, setIsActive] = useState(false);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        setIsActive(true);
        const results = await performSearch(query, type);
        onResults(results);
    };

    const handleClear = () => {
        setQuery('');
        setIsActive(false);
        onClear();
    };

    return (
        <div className="relative mb-8">
            <form onSubmit={handleSearch} className="relative group">
                {/* Background Glow when searching */}
                <div className={`absolute -inset-1 bg-gradient-to-r from-accent via-emerald-500 to-accent rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200 ${isSearching ? 'animate-pulse opacity-60' : ''}`} />

                <div className="relative flex items-center bg-white border border-slate-100 rounded-2xl shadow-xl overflow-hidden">
                    <div className="pl-4 text-accent">
                        {isSearching ? (
                            <Loader2 size={20} className="animate-spin" />
                        ) : (
                            <Sparkles size={20} className={isActive ? "fill-accent" : ""} />
                        )}
                    </div>

                    <input
                        type="text"
                        placeholder={type === 'jobs' ? "Beschreibe deinen Traumjob (z.B. 'Kreatives Handwerk mit Holz')..." : "Suchst du etwas Bestimmtes? (z.B. 'Gemütliches Café mit Terrasse')..."}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full py-5 px-4 focus:outline-none text-sm font-medium placeholder:text-slate-400"
                        aria-label="Suchbegriff eingeben"
                    />

                    <div className="flex items-center gap-2 pr-4">
                        {query && (
                            <button
                                type="button"
                                onClick={handleClear}
                                className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                <X size={18} />
                            </button>
                        )}
                        <button
                            type="submit"
                            disabled={isSearching || !query.trim()}
                            className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Finden
                        </button>
                    </div>
                </div>
            </form>

            <AnimatePresence>
                {isActive && !isSearching && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-3 flex items-center gap-2 px-4"
                    >
                        <span className="text-[10px] font-bold text-accent uppercase tracking-widest bg-accent/10 px-2 py-1 rounded-md">Magic Mode Aktiv</span>
                        <p className="text-[10px] text-slate-400 font-medium italic">Ergebnisse nach thematischer Relevanz sortiert</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
