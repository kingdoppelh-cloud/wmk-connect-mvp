import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';

export function useFollows(companyId?: string) {
    const [followedIds, setFollowedIds] = useState<string[]>([]);
    const [isFollowed, setIsFollowed] = useState(false);
    const [followerCount, setFollowerCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const STORAGE_KEY = 'wmk_followed_companies';

    useEffect(() => {
        const fetchFollows = async () => {
            setIsLoading(true);
            try {
                // 1. Get from LocalStorage
                const local = localStorage.getItem(STORAGE_KEY);
                const localIds = local ? JSON.parse(local) : [];
                setFollowedIds(localIds);

                if (companyId) {
                    setIsFollowed(localIds.includes(companyId));

                    // 2. Get Count from Supabase
                    const { data, error } = await supabase
                        .rpc('get_follower_count', { comp_id: companyId });

                    if (!error && data !== null) {
                        setFollowerCount(Number(data));
                    }
                }
            } catch (e) {
                console.error('Error fetching follows', e);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFollows();
    }, [companyId]);

    const toggleFollow = async (id: string) => {
        const current = [...followedIds];
        const index = current.indexOf(id);
        let nextIds = [];

        if (index > -1) {
            nextIds = current.filter(cid => cid !== id);
            // Optionally remove from Supabase if authenticated
        } else {
            nextIds = [...current, id];
            // Optionally add to Supabase if authenticated
            // For now, we also track an "anonymous_follow" event for analytics
            await supabase.from('analytics_events').insert([{
                company_id: id,
                event_type: 'follow_click'
            }]);
        }

        setFollowedIds(nextIds);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nextIds));
        if (id === companyId) setIsFollowed(index === -1);
    };

    return { followedIds, isFollowed, followerCount, toggleFollow, isLoading };
}
