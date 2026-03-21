import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';

export interface NewsPost {
    id: string;
    company_id: string;
    content: string;
    image_url?: string;
    type: 'news' | 'offer' | 'event' | 'special';
    created_at: string;
    expires_at?: string;
    company?: {
        name: string;
        image: string;
    }
}

export function useNews(companyId?: string) {
    const [posts, setPosts] = useState<NewsPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchPosts = async () => {
        setIsLoading(true);
        try {
            let query = supabase
                .from('news_posts')
                .select('*, company:companies(name, image)');

            if (companyId) {
                query = query.eq('company_id', companyId);
            }

            const { data, error } = await query.order('created_at', { ascending: false });
            if (error) throw error;
            setPosts(data || []);
        } catch (e) {
            console.error('Failed to fetch news posts', e);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, [companyId]);

    const addPost = async (post: Omit<NewsPost, 'id' | 'created_at'>) => {
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

    return { posts, isLoading, fetchPosts, addPost, deletePost };
}
