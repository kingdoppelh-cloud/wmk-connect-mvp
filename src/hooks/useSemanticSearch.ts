import { useState } from 'react';
import { supabase } from '../utils/supabase';

export function useSemanticSearch() {
    const [isSearching, setIsSearching] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const performSearch = async (query: string, type: 'jobs' | 'companies') => {
        if (!query.trim()) return [];

        setIsSearching(true);
        setError(null);

        try {
            // 1. Get embedding for the query string from our Edge Function
            const { data: embedData, error: embedError } = await supabase.functions.invoke('embed-on-change', {
                body: { query }
            });

            if (embedError) throw new Error(`Embedding failed: ${embedError.message}`);
            const embedding = embedData.embedding;

            // 2. Call the RPC function to find similar items
            const rpcName = type === 'jobs' ? 'match_jobs' : 'match_companies';
            const { data, error: rpcError } = await supabase.rpc(rpcName, {
                query_embedding: embedding,
                match_threshold: 0.5,
                match_count: 20
            });

            if (rpcError) throw rpcError;

            return data || [];
        } catch (err: any) {
            console.error('Semantic search error:', err);
            setError(err.message);
            return [];
        } finally {
            setIsSearching(false);
        }
    };

    return {
        performSearch,
        isSearching,
        error
    };
}
