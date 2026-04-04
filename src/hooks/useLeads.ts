import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../utils/supabase';

export interface Lead {
    id: string;
    created_at: string;
    company_name: string;
    contact_name: string;
    email: string;
    phone: string;
    message: string;
    lead_type: 'new_entry' | 'claim_profile' | 'direct_message';
    status: 'new' | 'contacted' | 'won' | 'lost';
}

export function useLeads(companyId: string | undefined) {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const isUuid = (id: string | undefined): id is string =>
        !!id && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);

    const fetchLeads = useCallback(async () => {
        if (!companyId) return;

        if (!isUuid(companyId)) {
            setIsLoading(false);
            setLeads([]);
            return;
        }

        setIsLoading(true);
        try {
            const { data, error: fetchError } = await supabase
                .from('leads')
                .select('*')
                .eq('claimed_company_id', companyId)
                .order('created_at', { ascending: false });

            if (fetchError) throw fetchError;
            setLeads(data || []);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Failed to fetch leads');
        } finally {
            setIsLoading(false);
        }
    }, [companyId]);

    useEffect(() => {
        fetchLeads();

        if (!isUuid(companyId)) return;

        const channel = supabase
            .channel(`leads-${companyId}`)
            .on('postgres_changes', {
                event: '*',
                schema: 'public',
                table: 'leads',
                filter: `claimed_company_id=eq.${companyId}`
            }, (payload) => {
                if (payload.eventType === 'INSERT') {
                    setLeads(prev => [payload.new as Lead, ...prev]);
                } else if (payload.eventType === 'UPDATE') {
                    setLeads(prev => prev.map(l => l.id === payload.new.id ? payload.new as Lead : l));
                } else if (payload.eventType === 'DELETE') {
                    setLeads(prev => prev.filter(l => l.id !== payload.old.id));
                }
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [fetchLeads, companyId]);

    const updateStatus = async (leadId: string, status: Lead['status']) => {
        try {
            const { error: updateError } = await supabase
                .from('leads')
                .update({ status })
                .eq('id', leadId);

            if (updateError) throw updateError;
            setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status } : l));
        } catch (err: unknown) {
            console.error('Error updating lead status:', err);
            throw err;
        }
    };

    return { leads, isLoading, error, updateStatus, refresh: fetchLeads };
}
