import React from 'react';
import { Compass, Briefcase, Calendar, Newspaper, MapIcon } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '../../utils/cn';

export const BottomNavBar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const getActiveTab = () => {
        const path = location.pathname;
        if (path === '/') return 'discover';
        if (path.startsWith('/jobs')) return 'jobs';
        if (path.startsWith('/events')) return 'events';
        if (path.startsWith('/news')) return 'news';
        if (path.startsWith('/map')) return 'map';
        return '';
    };

    const activeTab = getActiveTab();

    return (
        <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-6 pt-2 bg-[#fbf9f8]/80 dark:bg-[#192435]/80 backdrop-blur-md shadow-[0_-10px_40px_rgba(0,0,0,0.03)] z-50 rounded-t-xl">
            <button
                onClick={() => navigate('/')}
                className={cn(
                    "flex flex-col items-center justify-center rounded-xl px-3 py-1 transition-all",
                    activeTab === 'discover' ? "text-secondary bg-white/60 dark:bg-white/5 scale-105" : "text-primary dark:text-slate-400 opacity-60 hover:opacity-100"
                )}
            >
                <Compass className="w-6 h-6" strokeWidth={activeTab === 'discover' ? 2.5 : 2} />
                <span className="text-[10px] uppercase font-bold tracking-widest mt-1">Entdecken</span>
            </button>
            <button
                onClick={() => navigate('/jobs')}
                className={cn(
                    "flex flex-col items-center justify-center rounded-xl px-3 py-1 transition-all",
                    activeTab === 'jobs' ? "text-secondary bg-white/60 dark:bg-white/5 scale-105" : "text-primary dark:text-slate-400 opacity-60 hover:opacity-100"
                )}
            >
                <Briefcase className="w-6 h-6" strokeWidth={activeTab === 'jobs' ? 2.5 : 2} />
                <span className="text-[10px] uppercase font-bold tracking-widest mt-1">Jobs</span>
            </button>
            <button
                onClick={() => navigate('/events')}
                className={cn(
                    "flex flex-col items-center justify-center rounded-xl px-3 py-1 transition-all",
                    activeTab === 'events' ? "text-secondary bg-white/60 dark:bg-white/5 scale-105" : "text-primary dark:text-slate-400 opacity-60 hover:opacity-100"
                )}
            >
                <Calendar className="w-6 h-6" strokeWidth={activeTab === 'events' ? 2.5 : 2} />
                <span className="text-[10px] uppercase font-bold tracking-widest mt-1">Events</span>
            </button>
            <button
                onClick={() => navigate('/news')}
                className={cn(
                    "flex flex-col items-center justify-center rounded-xl px-3 py-1 transition-all",
                    activeTab === 'news' ? "text-secondary bg-white/60 dark:bg-white/5 scale-105" : "text-primary dark:text-slate-400 opacity-60 hover:opacity-100"
                )}
            >
                <Newspaper className="w-6 h-6" strokeWidth={activeTab === 'news' ? 2.5 : 2} />
                <span className="text-[10px] uppercase font-bold tracking-widest mt-1">Aktuelles</span>
            </button>
            <button
                onClick={() => navigate('/map')}
                className={cn(
                    "flex flex-col items-center justify-center rounded-xl px-3 py-1 transition-all",
                    activeTab === 'map' ? "text-secondary bg-white/60 dark:bg-white/5 scale-105" : "text-primary dark:text-slate-400 opacity-60 hover:opacity-100"
                )}
            >
                <MapIcon className="w-6 h-6" strokeWidth={activeTab === 'map' ? 2.5 : 2} />
                <span className="text-[10px] uppercase font-bold tracking-widest mt-1">Karte</span>
            </button>
        </nav>
    );
};
