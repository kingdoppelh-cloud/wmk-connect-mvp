import { useState, useEffect } from 'react';
import { supabase, hasSupabaseConfig } from '../utils/supabase';
import { type Company } from '../data/companies';

export function useCompanies() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCompanies() {
      try {
        setIsLoading(true);
        if (!hasSupabaseConfig) throw new Error('Supabase fehlt');
        const { data, error: sbError } = await supabase.from('companies').select('*');
        if (sbError) throw new Error(sbError.message);
        if (data) {
          const sorted = (data as Company[]).sort((a, b) => (a.isPremium === b.isPremium ? 0 : a.isPremium ? -1 : 1));
          setCompanies(sorted);
        }
      } catch (err: any) {
        console.error('Detailed fetch error:', err);
        setError(err.message || 'Unbekannter Fehler');
      } finally {
        setIsLoading(false);
      }
    }
    fetchCompanies();
  }, []);
  return { companies, isLoading, error };
}
