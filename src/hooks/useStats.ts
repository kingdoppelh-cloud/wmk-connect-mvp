import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';

interface Stats {
    companies: number;
    jobs: number;
    users: number;
}

export function useStats() {
    const [stats, setStats] = useState<Stats>({ companies: 0, jobs: 0, users: 0 });

    useEffect(() => {
        async function fetchStats() {
            const [c, j, u] = await Promise.allSettled([
                supabase.from('companies').select('id', { count: 'exact', head: true }),
                supabase.from('jobs').select('id', { count: 'exact', head: true }),
                supabase.from('profiles').select('id', { count: 'exact', head: true }),
            ]);
            setStats({
                companies: c.status === 'fulfilled' ? (c.value.count ?? 0) : 0,
                jobs: j.status === 'fulfilled' ? (j.value.count ?? 0) : 0,
                users: u.status === 'fulfilled' ? (u.value.count ?? 0) : 0,
            });
        }
        fetchStats();
    }, []);

    return stats;
}
