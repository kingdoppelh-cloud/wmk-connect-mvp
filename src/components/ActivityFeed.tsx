import React from 'react';
import { useNews } from '../hooks/useNews';
import { Newspaper, Sparkles, Clock, ExternalLink, Heart } from 'lucide-react';
import { cn } from './Layout';
import { NewsCardSkeleton } from './ui/Skeleton';

interface ActivityFeedProps {
    onCompanyClick: (id: string) => void;
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({ onCompanyClick }) => {
    const { posts, isLoading, toggleLike } = useNews();

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-50 pb-32">
                <header className="bg-white px-6 pt-16 pb-8 border-b border-slate-100">
                    <div className="max-w-xl mx-auto space-y-2">
                        <div className="h-4 w-32 bg-slate-100 rounded-full animate-pulse" />
                        <div className="h-10 w-48 bg-slate-100 rounded-xl animate-pulse" />
                        <div className="h-4 w-full bg-slate-100 rounded-lg animate-pulse" />
                    </div>
                </header>
                <main className="max-w-xl mx-auto px-4 py-8 space-y-6">
                    <NewsCardSkeleton />
                    <NewsCardSkeleton />
                    <NewsCardSkeleton />
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 pb-32">
            {/* Hero Header */}
            <header className="bg-white px-6 pt-16 pb-8 border-b border-slate-100 sticky top-0 z-30 shadow-sm">
                <div className="max-w-xl mx-auto space-y-2">
                    <div className="flex items-center gap-2 text-accent">
                        <Sparkles size={20} className="fill-current" />
                        <span className="text-xs font-black uppercase tracking-[0.2em]">Live aus dem WMK</span>
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Aktuelles</h1>
                    <p className="text-slate-500 font-medium leading-relaxed">
                        Entdecke News, Angebote und Tageskarten deiner Lieblingsfirmen in der Region.
                    </p>
                </div>
            </header>

            <main className="max-w-xl mx-auto px-4 py-8 space-y-6">
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <div
                            key={post.id}
                            className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-200/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group"
                        >
                            {/* Post Header */}
                            <div className="p-6 flex items-center justify-between">
                                <button
                                    onClick={() => onCompanyClick(post.company_id)}
                                    className="flex items-center gap-4 group/author text-left"
                                >
                                    <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-slate-100 group-hover/author:border-accent transition-colors">
                                        <img
                                            src={post.company?.image}
                                            className="w-full h-full object-cover"
                                            alt={post.company?.name}
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-black text-slate-900 leading-tight group-hover/author:text-accent transition-colors">
                                            {post.company?.name}
                                        </h3>
                                        <div className="flex items-center gap-2 text-slate-400">
                                            <Clock size={12} />
                                            <span className="text-[10px] font-bold uppercase tracking-widest">
                                                {new Date(post.created_at).toLocaleDateString('de-DE', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                    </div>
                                </button>

                                <span className={cn(
                                    "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                                    post.type === 'offer' ? "bg-amber-100 text-amber-700" :
                                        post.type === 'event' ? "bg-purple-100 text-purple-700" :
                                            post.type === 'special' ? "bg-emerald-100 text-emerald-700" :
                                                "bg-slate-100 text-slate-600"
                                )}>
                                    {post.type}
                                </span>
                            </div>

                            {/* Post Image (if any) */}
                            {post.image_url && (
                                <div className="px-6">
                                    <div className="aspect-[16/9] w-full rounded-[2rem] overflow-hidden bg-slate-100">
                                        <img
                                            src={post.image_url}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                            alt="News"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Post Content */}
                            <div className="p-6 pt-4 space-y-4">
                                <p className="text-slate-700 font-medium leading-relaxed text-lg whitespace-pre-wrap">
                                    {post.content}
                                </p>

                                <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                                    <button
                                        onClick={() => toggleLike(post.id)}
                                        className={cn(
                                            "flex items-center gap-2 px-4 py-2 rounded-xl transition-all active:scale-90",
                                            post.is_liked
                                                ? "bg-rose-50 text-rose-500 font-bold"
                                                : "bg-slate-50 text-slate-400 hover:text-slate-600 font-bold"
                                        )}
                                    >
                                        <Heart
                                            size={20}
                                            className={cn("transition-transform duration-300", post.is_liked && "fill-current scale-110")}
                                        />
                                        <span className="text-xs">{post.likes_count || 0}</span>
                                    </button>

                                    <button
                                        onClick={() => onCompanyClick(post.company_id)}
                                        className="flex items-center gap-2 text-accent font-black uppercase text-[10px] tracking-widest group/btn"
                                    >
                                        Profil ansehen
                                        <ExternalLink size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="py-20 flex flex-col items-center text-center space-y-4">
                        <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-slate-200 shadow-sm border border-slate-100">
                            <Newspaper size={40} strokeWidth={1.5} />
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-slate-900">Noch keine Updates</h3>
                            <p className="text-slate-400 font-medium mt-1">Schau später nochmal vorbei!</p>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};
