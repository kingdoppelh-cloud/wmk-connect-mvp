import React from 'react';
import { Heart, Share2, Star, Phone, MessageCircle, ExternalLink, MapPin } from 'lucide-react';
import type { Company } from '../data/companies';
import { getStatusLabel, isOpen } from '../utils/timeUtils';
import { cn } from '../utils/cn';
import { motion } from 'framer-motion';

interface Props {
    company: Company;
    isFavorite: boolean;
    onToggleFavorite: (id: string) => void;
    onSelect?: () => void;
}

export const CompanyCard: React.FC<Props> = ({ company, isFavorite, onToggleFavorite, onSelect }) => {
    const currentStatus = getStatusLabel(company.openingHours);

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: company.name,
                    text: company.description,
                    url: company.websiteUrl,
                });
            } catch (err) {
                console.error('Sharing failed', err);
            }
        } else {
            // Fallback: Copy to clipboard
            navigator.clipboard.writeText(company.websiteUrl);
            alert('Link kopiert!');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={onSelect}
            className={cn(
                "relative rounded-2xl p-5 mb-5 transition-all duration-500 bg-white shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.01] active:scale-100 group",
                company.isPremium
                    ? "border-2 border-premium ring-4 ring-premium/10 ring-offset-0"
                    : "border border-gray-100"
            )}
        >
            {/* Premium Badge */}
            {company.isPremium && (
                <div className="absolute -top-3 left-6 glass px-4 py-1.5 rounded-full border border-premium flex items-center gap-2 shadow-lg z-10 bg-white/90 backdrop-blur-sm">
                    <div className="w-4 h-4 bg-premium rounded-full flex items-center justify-center">
                        <Star size={10} className="text-white fill-white" />
                    </div>
                    <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Premium Partner</span>
                </div>
            )}

            {/* Hiring Now Badge */}
            {company.hasActiveJobs && (
                <div className={cn(
                    "absolute -top-3 glass px-3 py-1 rounded-full border flex items-center gap-1.5 shadow-lg z-10 bg-white/90 backdrop-blur-sm",
                    company.isPremium ? "left-44" : "left-6",
                    "border-green-200"
                )}>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[10px] font-bold text-green-700 uppercase tracking-wider">Hiring Now</span>
                </div>
            )}

            <div className="flex justify-between items-start mb-3">
                <div>
                    <span className="text-[10px] font-bold text-accent uppercase tracking-widest leading-none mb-1 block">
                        {company.category}
                    </span>
                    <h3 className="text-lg font-black text-gray-900 leading-tight">
                        {company.name}
                    </h3>
                    <p className="text-xs text-gray-500 font-medium mt-1">
                        {company.address}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    {company.image && (
                        <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-100 flex-shrink-0 bg-slate-50">
                            <img
                                src={company.image}
                                alt={company.name}
                                loading="lazy"
                                decoding="async"
                                width="400"
                                height="225"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = '/placeholder-company.jpg';
                                }}
                            />
                        </div>
                    )}
                    <button
                        onClick={() => onToggleFavorite(company.id)}
                        className={cn(
                            "p-2 rounded-full transition-all duration-300 shadow-sm",
                            isFavorite ? "bg-accent/10 text-accent" : "bg-gray-50 text-gray-400 hover:bg-gray-100"
                        )}
                    >
                        <Heart size={20} fill={isFavorite ? "currentColor" : "none"} strokeWidth={2} />
                    </button>
                </div>
            </div>

            <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed mb-4">
                {company.description}
            </p>

            <div className="flex items-center gap-3 mb-5">
                <div className={cn(
                    "text-[10px] font-bold px-2 py-0.5 rounded-md",
                    isOpen(company.openingHours) ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                )}>
                    {currentStatus}
                </div>
                {company.distance !== undefined && company.distance < Infinity && (
                    <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md">
                        <MapPin size={10} />
                        {company.distance.toFixed(1)} km entfernt
                    </div>
                )}
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-3" onClick={(e) => e.stopPropagation()}>
                <a
                    href={company.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="col-span-2 flex items-center justify-center gap-2 bg-gray-900 text-white py-3 rounded-xl font-bold text-sm hover:bg-black transition-colors shadow-lg"
                >
                    <ExternalLink size={16} />
                    Website besuchen
                </a>

                <div className="flex gap-2 w-full mt-1">
                    <a
                        href={`tel:${company.phone}`}
                        className="flex-1 flex items-center justify-center p-3 rounded-xl bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors border border-gray-100"
                    >
                        <Phone size={18} />
                    </a>
                    <a
                        href={`https://wa.me/${company.whatsapp}`}
                        target="_blank"
                        className="flex-1 flex items-center justify-center p-3 rounded-xl bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors border border-gray-100"
                    >
                        <MessageCircle size={18} />
                    </a>
                    <button
                        onClick={handleShare}
                        className="flex-1 flex items-center justify-center p-3 rounded-xl bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors border border-gray-100"
                    >
                        <Share2 size={18} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};
