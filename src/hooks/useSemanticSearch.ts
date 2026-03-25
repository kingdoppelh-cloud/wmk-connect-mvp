import { useState } from 'react';
import { supabase } from '../utils/supabase';

export function useSemanticSearch() {
    const [isSearching, setIsSearching] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const performFullTextSearch = async (query: string, type: 'jobs' | 'companies') => {
        if (!query.trim()) return [];
        setIsSearching(true);
        setError(null);

        try {
            const table = type === 'jobs' ? 'jobs' : 'companies';
            const { data, error: searchError } = await supabase
                .from(table)
                .select('*')
                .textSearch('fts', query, {
                    config: 'german',
                    type: 'websearch'
                });

            if (searchError) throw searchError;
            return data || [];
        } catch (err: unknown) {
            console.error('Full-text search error:', err);
            setError(err instanceof Error ? err.message : 'Unknown error');
            return [];
        } finally {
            setIsSearching(false);
        }
    };

    const performSearch = async (query: string, type: 'jobs' | 'companies') => {
        if (!query.trim()) return [];

        // For short queries or exact names, FTS is often better
        if (query.length < 10) {
            return performFullTextSearch(query, type);
        }

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

            // If semantic search returns nothing, fallback to FTS
            if (!data || data.length === 0) {
                return performFullTextSearch(query, type);
            }

            return data || [];
        } catch (err: unknown) {
            console.error('Semantic search error:', err);
            // Fallback to FTS on error
            return performFullTextSearch(query, type);
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
