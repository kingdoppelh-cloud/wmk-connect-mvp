import { useState, useEffect } from 'react';
import { supabase, hasSupabaseConfig } from '../utils/supabase';
import { type Company } from '../data/companies';

export function useCompanies() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    fetchCompanies();
  }, []);

  const addCompany = async (company: Omit<Company, 'id'>) => {
    const { error } = await supabase.from('companies').insert([company]);
    if (error) throw error;
    await fetchCompanies();
  };

  const updateCompany = async (id: string, updates: Partial<Company>) => {
    const { error } = await supabase.from('companies').update(updates).eq('id', id);
    if (error) throw error;
    await fetchCompanies();
  };

  const deleteCompany = async (id: string) => {
    const { error } = await supabase.from('companies').delete().eq('id', id);
    if (error) throw error;
    await fetchCompanies();
  };

  const uploadFile = async (file: File, path: string) => {
    const { data, error } = await supabase.storage
      .from('company-images')
      .upload(`${path}/${Date.now()}-${file.name}`, file);
    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from('company-images')
      .getPublicUrl(data.path);

    return publicUrl;
  };

  return { companies, isLoading, error, refresh: fetchCompanies, addCompany, updateCompany, deleteCompany, uploadFile };
}
