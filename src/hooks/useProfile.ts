import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../utils/supabase';
import { useAuth } from '../context/AuthContext';

export interface Profile {
    id: string;
    user_id: string;
    full_name: string | null;
    bio: string | null;
    skills: string[];
    user_type: 'handyman' | 'company';
    embedding?: number[];
}

export function useProfile() {
    const { user } = useAuth();
    const [profile, setProfile] = useState<Profile | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProfile = useCallback(async () => {
        if (!user) {
            setProfile(null);
            setIsLoading(false);
            return;
        }

        try {
            setIsLoading(true);
            const { data, error: fetchError } = await supabase
                .from('profiles')
                .select('*')
                .eq('user_id', user.id)
                .single();

            if (fetchError && fetchError.code !== 'PGRST116') {
                throw fetchError;
            }

            if (data) {
                setProfile(data);
            } else {
                // If profile doesn't exist, create one
                const { data: newProfile, error: createError } = await supabase
                    .from('profiles')
                    .insert([{ user_id: user.id, full_name: user.user_metadata?.full_name || '' }])
                    .select()
                    .single();

                if (createError) throw createError;
                setProfile(newProfile);
            }
        } catch (err: unknown) {
            console.error('Error fetching profile:', err);
            setError(err instanceof Error ? err.message : 'Unbekannter Fehler');
        } finally {
            setIsLoading(false);
        }
    }, [user]);

    const updateProfile = async (updates: Partial<Profile>) => {
        if (!user) return;

        try {
            const { error: updateError } = await supabase
                .from('profiles')
                .update(updates)
                .eq('user_id', user.id);

            if (updateError) throw updateError;
            await fetchProfile();
        } catch (err: unknown) {
            console.error('Error updating profile:', err);
            throw err;
        }
    };

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    return { profile, isLoading, error, updateProfile, refresh: fetchProfile };
}
