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
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  // Haversine formula to calculate distance between two coordinates in km
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Earth radius
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

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

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation wird von diesem Browser nicht unterstützt.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);

        // Re-sort companies by distance immediately
        setCompanies(prev => {
          const withDistances = prev.map(c => ({
            ...c,
            distance: c.coordinates ? calculateDistance(latitude, longitude, c.coordinates[0], c.coordinates[1]) : Infinity
          }));
          return [...withDistances].sort((a, b) => {
            // Keep premium first, then sort by distance
            if (a.isPremium && !b.isPremium) return -1;
            if (!a.isPremium && b.isPremium) return 1;
            return (a.distance || 0) - (b.distance || 0);
          });
        });
      },
      (err) => {
        console.error("Location error", err);
        setError("Standortzugriff verweigert.");
      }
    );
  };

  return {
    companies,
    isLoading,
    error,
    userLocation,
    requestLocation,
    refresh: fetchCompanies,
    addCompany,
    updateCompany,
    deleteCompany,
    uploadFile
  };
}

