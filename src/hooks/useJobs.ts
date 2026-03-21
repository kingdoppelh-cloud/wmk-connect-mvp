import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';

export interface Job {
    id: string;
    company_id: string;
    title: string;
    category: string;
    description: string;
    salary_range: string;
    job_type: string;
    image_url?: string;
    created_at?: string;
    is_active: boolean;
    is_featured?: boolean;
    company?: {
        name: string;
        image: string;
        whatsapp: string;
    }
}

export function useJobs(companyId?: string) {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchJobs = async () => {
        setIsLoading(true);
        try {
            let query = supabase.from('jobs').select('*, company:companies(name, image, whatsapp)').eq('is_active', true);
            if (companyId) {
                query = query.eq('company_id', companyId);
            }

            const { data, error } = await query.order('created_at', { ascending: false });
            if (error) throw error;
            setJobs(data || []);
        } catch (e) {
            console.error('Failed to fetch jobs', e);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, [companyId]);

    const addJob = async (job: Omit<Job, 'id' | 'created_at'>) => {
        const { data, error } = await supabase.from('jobs').insert([job]).select();
        if (error) throw error;
        await fetchJobs();
        return data?.[0];
    };

    const updateJob = async (id: string, updates: Partial<Job>) => {
        const { error } = await supabase.from('jobs').update(updates).eq('id', id);
        if (error) throw error;
        await fetchJobs();
    };

    return { jobs, isLoading, fetchJobs, addJob, updateJob };
}
