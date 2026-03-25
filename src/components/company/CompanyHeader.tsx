import React from 'react';
import { ArrowLeft, BadgeCheck, Bell, UserPlus, Share2 } from 'lucide-react';
import { type Company } from '../../data/companies';
import { cn } from '../Layout';

interface CompanyHeaderProps {
    company: Company;
    onBack: () => void;
    isFollowed: boolean;
    followerCount: number;
    toggleFollow: (id: string) => void;
}

export const CompanyHeader: React.FC<CompanyHeaderProps> = ({
    company,
    onBack,
    isFollowed,
    followerCount,
    toggleFollow
}) => {
    const handleShare = async () => {
        const shareData = {
            title: company.name,
            text: `Schau dir ${company.name} auf WMK Connect an!`,
            url: window.location.href,
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(window.location.href);
                alert('Link in die Zwischenablage kopiert!');
            }
        } catch (err) {
            console.error('Fehler beim Teilen:', err);
        }
    };

    return (
        <div className="relative h-72 w-full overflow-hidden">
            <img
                src={company.image || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000"}
                alt={company.name}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
                onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000';
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Back Button */}
            <button
                onClick={onBack}
                className="absolute top-6 left-6 p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-all border border-white/30"
            >
                <ArrowLeft size={24} />
            </button>

            {/* Share Button (Top Right) */}
            <button
                onClick={handleShare}
                className="absolute top-6 right-6 p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-all border border-white/30"
            >
                <Share2 size={24} />
            </button>

            {/* Header Info (Overlay) */}
            <div className="absolute bottom-6 left-6 right-6 text-white text-left">
                <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-1 bg-accent/90 backdrop-blur-md text-[10px] font-black uppercase tracking-widest rounded-md border border-white/20 shadow-lg">
                        {company.category}
                    </span>
                    {company.isPremium && (
                        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-premium/90 backdrop-blur-md text-gray-900 text-[10px] font-black uppercase tracking-widest rounded-md shadow-lg border border-white/30">
                            <BadgeCheck size={12} className="fill-gray-900" />
                            Premium Partner
                        </div>
                    )}
                </div>
                <h1 className="text-4xl sm:text-5xl font-black leading-[0.9] tracking-tighter uppercase italic drop-shadow-2xl">{company.name}</h1>

                {/* Embedded Follow Button for visual consistency with request */}
                <div className="mt-4 flex justify-start">
                    <button
                        onClick={() => toggleFollow(company.id)}
                        className={cn(
                            "flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all active:scale-95 border shadow-lg",
                            isFollowed
                                ? "bg-slate-900/40 backdrop-blur-md text-white border-white/20"
                                : "bg-white text-slate-900 border-white"
                        )}
                    >
                        {isFollowed ? <Bell size={16} /> : <UserPlus size={16} />}
                        <span>{isFollowed ? 'Folge ich' : 'Folgen'}</span>
                        {followerCount > 0 && (
                            <span className="ml-1 opacity-60 font-medium">({followerCount})</span>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};
