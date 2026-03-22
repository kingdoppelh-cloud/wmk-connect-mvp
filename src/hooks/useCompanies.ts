import { useState, useEffect, useCallback, useMemo } from 'react';
import { supabase, hasSupabaseConfig } from '../utils/supabase';
import type { Company } from '../types';

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

  const calculateDistance = useCallback((lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Earth radius
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }, []);

  const fetchCompanies = async () => {
    try {
      setIsLoading(true);
      if (!hasSupabaseConfig) throw new Error('Supabase fehlt');
      const { data, error: sbError } = await supabase.from('companies').select('*');
      if (sbError) throw new Error(sbError.message);
      if (data) {
        setCompanies(data.map(mapFromDb));
      }
    } catch (err: any) {
      console.error('Detailed fetch error:', err);
      setError(err.message || 'Unbekannter Fehler');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const sortedCompanies = useMemo(() => {
    return [...companies].sort((a, b) => {
      // 1. Premium priority
      if (a.isPremium && !b.isPremium) return -1;
      if (!a.isPremium && b.isPremium) return 1;

      // 2. Distance sorting if location available
      if (userLocation) {
        const distA = a.coordinates ? calculateDistance(userLocation[0], userLocation[1], a.coordinates[0], a.coordinates[1]) : Infinity;
        const distB = b.coordinates ? calculateDistance(userLocation[0], userLocation[1], b.coordinates[0], b.coordinates[1]) : Infinity;
        return distA - distB;
      }
      return 0;
    });
  }, [companies, userLocation, calculateDistance]);

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation wird von diesem Browser nicht unterstützt.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
      },
      (err) => {
        console.error("Location error", err);
        setError("Standortzugriff verweigert.");
      }
    );
  };

  return {
    companies: sortedCompanies,
    isLoading,
    error,
    userLocation,
    requestLocation,
    refresh: fetchCompanies,
    addCompany: async (company: Omit<Company, 'id'>) => {
      const { error } = await supabase.from('companies').insert([mapToDb(company)]);
      if (error) throw error;
      await fetchCompanies();
    },
    updateCompany: async (id: string, updates: Partial<Company>) => {
      const { error } = await supabase.from('companies').update(mapToDb(updates)).eq('id', id);
      if (error) throw error;
      await fetchCompanies();
    },
    deleteCompany: async (id: string) => {
      const { error } = await supabase.from('companies').delete().eq('id', id);
      if (error) throw error;
      await fetchCompanies();
    },
    uploadFile: async (file: File, path: string) => {
      const { data, error } = await supabase.storage.from('company-images').upload(`${path}/${Date.now()}-${file.name}`, file);
      if (error) throw error;
      const { data: { publicUrl } } = supabase.storage.from('company-images').getPublicUrl(data.path);
      return publicUrl;
    }
  };
}

