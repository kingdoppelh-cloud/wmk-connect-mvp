import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';

export interface NewsPost {
    id: string;
    company_id: string;
    content: string;
    image_url?: string;
    likes_count: number;
    type: 'news' | 'offer' | 'event' | 'special';
    created_at: string;
    expires_at?: string;
    company?: {
        name: string;
        image: string;
    };
    is_liked?: boolean;
}

export function useNews(companyId?: string) {
    const [posts, setPosts] = useState<NewsPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const sessionId = localStorage.getItem('wmk_session_id') || 'guest';

    const fetchPosts = async () => {
        setIsLoading(true);
        try {
            // 1. Fetch posts
            let query = supabase
                .from('news_posts')
                .select('*, company:companies(name, image)');

            if (companyId) {
                query = query.eq('company_id', companyId);
            }

            const { data: postsData, error: postsError } = await query.order('created_at', { ascending: false });
            if (postsError) throw postsError;

            // 2. Fetch user's likes for these posts
            const postIds = postsData?.map(p => p.id) || [];
            const { data: likesData } = await supabase
                .from('news_likes')
                .select('post_id')
                .in('post_id', postIds)
                .eq('session_id', sessionId);

            const likedPostIds = new Set(likesData?.map(l => l.post_id) || []);

            setPosts(postsData?.map(p => ({
                ...p,
                is_liked: likedPostIds.has(p.id)
            })) || []);
        } catch (e) {
            console.error('Failed to fetch news posts', e);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, [companyId]);

    const toggleLike = async (postId: string) => {
        const post = posts.find(p => p.id === postId);
        if (!post) return;

        try {
            if (post.is_liked) {
                // Remove like
                await supabase
                    .from('news_likes')
                    .delete()
                    .eq('post_id', postId)
                    .eq('session_id', sessionId);
            } else {
                // Add like
                await supabase
                    .from('news_likes')
                    .insert([{ post_id: postId, session_id: sessionId }]);
            }
            // Optimistic update
            setPosts(current => current.map(p => {
                if (p.id === postId) {
                    return {
                        ...p,
                        is_liked: !p.is_liked,
                        likes_count: p.is_liked ? p.likes_count - 1 : p.likes_count + 1
                    };
                }
                return p;
            }));
        } catch (e) {
            console.error('Failed to toggle like', e);
        }
    };

    const addPost = async (post: Omit<NewsPost, 'id' | 'created_at' | 'likes_count' | 'is_liked'>) => {
        const { data, error } = await supabase.from('news_posts').insert([post]).select();
        if (error) throw error;
        await fetchPosts();
        return data?.[0];
    };

    const deletePost = async (id: string) => {
        const { error } = await supabase.from('news_posts').delete().eq('id', id);
        if (error) throw error;
        await fetchPosts();
    };

    return { posts, isLoading, fetchPosts, addPost, deletePost, toggleLike };
}
