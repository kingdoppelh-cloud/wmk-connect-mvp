import React from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { useNews } from '../../hooks/useNews';
import { useRewards } from '../../hooks/useRewards';
import { cn } from '../../utils/cn';

interface CompanyNewsSectionProps {
    companyId: string;
}

export const CompanyNewsSection: React.FC<CompanyNewsSectionProps> = ({ companyId }) => {
    const { posts, isLoading, toggleLike } = useNews();
    const { earnPoints } = useRewards();
    const companyPosts = posts.filter(p => p.company_id === companyId);

    if (isLoading || companyPosts.length === 0) return null;

    return (
        <section className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 text-left">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                    <span className="w-8 h-1 bg-accent rounded-full" />
                    Aktuelles & Angebote
                </h2>
                <div className="flex items-center gap-1 text-accent animate-pulse">
                    <Sparkles size={14} className="fill-current" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Live</span>
                </div>
            </div>

            <div className="space-y-4">
                {companyPosts.map(post => (
                    <div
                        key={post.id}
                        className="bg-slate-50 rounded-[2rem] overflow-hidden border border-slate-100 hover:border-accent/20 transition-all group"
                    >
                        {post.image_url && (
                            <div className="aspect-[21/9] w-full overflow-hidden bg-slate-200">
                                <img
                                    src={post.image_url}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    alt="News"
                                />
                            </div>
                        )}
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <span className={cn(
                                        "px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-[0.1em]",
                                        post.type === 'offer' ? "bg-amber-100 text-amber-700" :
                                            post.type === 'event' ? "bg-purple-100 text-purple-700" :
                                                post.type === 'special' ? "bg-emerald-100 text-emerald-700" :
                                                    "bg-slate-200 text-slate-600"
                                    )}>
                                        {post.type}
                                    </span>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase">
                                        • {new Date(post.created_at).toLocaleDateString('de-DE', { day: '2-digit', month: 'short' })}
                                    </span>
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleLike(post.id);
                                    }}
                                    className={cn(
                                        "flex items-center gap-1.5 px-3 py-1 rounded-full transition-all active:scale-90",
                                        post.is_liked ? "bg-rose-50 text-rose-500 font-bold" : "text-slate-400"
                                    )}
                                >
                                    <Heart size={16} className={cn(post.is_liked && "fill-current")} />
                                    <span className="text-[10px]">{post.likes_count || 0}</span>
                                </button>
                            </div>
                            <p
                                onClick={() => earnPoints(1, 'news_read', companyId)}
                                className="text-slate-700 font-medium leading-relaxed whitespace-pre-wrap cursor-pointer"
                            >
                                {post.content}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
