import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import type { Company } from '../types';

// Helper to map DB snake_case to app camelCase
const mapFromDb = (d: Record<string, unknown>): Company => ({
    id: d.id as string,
    name: d.name as string,
    category: d.category as string,
    address: d.address as string,
    phone: d.phone as string,
    whatsapp: d.whatsapp as string,
    email: d.email as string,
    websiteUrl: (d.website_url || d.websiteUrl) as string,
    description: d.description as string,
    descriptionLong: (d.description_long || d.descriptionLong) as string | undefined,
    image: d.image as string,
    gallery: (d.gallery as string[]) || [],
    isPremium: (d.is_premium ?? d.isPremium ?? false) as boolean,
    coordinates: (d.coordinates as [number, number]) || [0, 0],
    openingHours: (d.opening_hours || d.openingHours || {}) as Record<string, string>,
    ownerId: d.owner_id as string | undefined
});

export function useMerchantCompany(companyId: string | undefined) {
    const [company, setCompany] = useState<Company | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!companyId) return;

        async function fetchCompany() {
            if (!companyId) {
                setIsLoading(false);
                return;
            }

            // If the ID is clearly mock (like '1', '2'), we don't query Supabase to avoid 400 errors
            const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(companyId);

            if (!isUuid) {
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            try {
                const { data, error: fetchError } = await supabase
                    .from('companies')
                    .select('*')
                    .eq('id', companyId)
                    .single();

                if (fetchError) throw fetchError;
                if (data) {
                    setCompany(mapFromDb(data as Record<string, unknown>));
                }
            } catch (err: unknown) {
                setError(err instanceof Error ? err.message : 'Failed to fetch company');
            } finally {
                setIsLoading(false);
            }
        }

        fetchCompany();
    }, [companyId]);

    return { company, isLoading, error };
}
