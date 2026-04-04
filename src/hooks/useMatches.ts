import { useCallback } from 'react';
import { supabase } from '../utils/supabase';

export function useMatches() {
    const recordMatch = useCallback(async (candidateId: string, companyId: string) => {
        try {
            const { error } = await supabase
                .from('matches')
                .upsert(
                    [{ candidate_id: candidateId, company_id: companyId }],
                    { onConflict: 'candidate_id,company_id' }
                );

            if (error) throw error;
            console.log('Match recorded successfully');
        } catch (err) {
            console.error('Failed to record match:', err);
        }
    }, []);

    return { recordMatch };
}
