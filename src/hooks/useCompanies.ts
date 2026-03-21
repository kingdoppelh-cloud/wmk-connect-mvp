import { useState, useEffect } from 'react';
import { supabase, hasSupabaseConfig } from '../utils/supabase';
import { type Company } from '../data/companies';

// Helper to map DB snake_case to app camelCase
const mapFromDb = (d: any): Company => ({
  id: d.id,
  name: d.name,
  category: d.category,
  address: d.address,
  phone: d.phone,
  whatsapp: d.whatsapp,
  email: d.email,
  websiteUrl: d.website_url || d.websiteUrl,
  description: d.description,
  descriptionLong: d.description_long || d.descriptionLong,
  image: d.image,
  gallery: d.gallery || [],
  isPremium: d.is_premium ?? d.isPremium ?? false,
  coordinates: d.coordinates || [0, 0],
  openingHours: d.opening_hours || d.openingHours || {}
});

// Helper to map app camelCase to DB snake_case
const mapToDb = (c: Partial<Company>) => {
  const data: any = { ...c };
  if ('websiteUrl' in data) { data.website_url = data.websiteUrl; delete data.websiteUrl; }
  if ('descriptionLong' in data) { data.description_long = data.descriptionLong; delete data.descriptionLong; }
  if ('isPremium' in data) { data.is_premium = data.isPremium; delete data.isPremium; }
  if ('openingHours' in data) { data.opening_hours = data.openingHours; delete data.openingHours; }
  return data;
};

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
        const mapped = data.map(mapFromDb);
        const sorted = mapped.sort((a: Company, b: Company) => (a.isPremium === b.isPremium ? 0 : a.isPremium ? -1 : 1));
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
    const { error } = await supabase.from('companies').insert([mapToDb(company)]);
    if (error) throw error;
    await fetchCompanies();
  };

  const updateCompany = async (id: string, updates: Partial<Company>) => {
    const { error } = await supabase.from('companies').update(mapToDb(updates)).eq('id', id);
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

