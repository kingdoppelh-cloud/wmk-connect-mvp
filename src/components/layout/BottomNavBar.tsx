import React from 'react';
import { Compass, Briefcase, Calendar, Newspaper, MapIcon } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

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
        return 'discover';
    };

    const activeTab = getActiveTab();

    const tabs = [
        { id: 'discover', label: 'Entdecken', icon: Compass, path: '/' },
        { id: 'jobs', label: 'Jobs', icon: Briefcase, path: '/jobs' },
        { id: 'events', label: 'Events', icon: Calendar, path: '/events' },
        { id: 'news', label: 'Aktuelles', icon: Newspaper, path: '/news' },
        { id: 'map', label: 'Karte', icon: MapIcon, path: '/map' },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#fbf9f8]/95 dark:bg-[#192435]/95 backdrop-blur-md border-t border-slate-100 dark:border-slate-800 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.03)] w-screen overflow-hidden">
            <div className="flex justify-evenly items-end px-1 pb-6 pt-2 max-w-full mx-auto">
                {tabs.map(({ id, label, icon: Icon, path }) => {
                    const isActive = activeTab === id;
                    return (
                        <button
                            key={id}
                            onClick={() => navigate(path)}
                            className={`relative flex flex-col items-center gap-1.5 transition-all duration-300 min-w-[64px] flex-1 ${isActive
                                ? 'text-secondary'
                                : 'text-slate-400 hover:text-slate-600 dark:text-slate-500'
                                }`}
                        >
                            <div className={`relative p-2 rounded-2xl transition-all duration-300 ${isActive ? 'bg-secondary/5 dark:bg-white/10 scale-110' : ''}`}>
                                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                            </div>
                            <span className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-tight transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-70'}`}>
                                {label}
                            </span>
                            {isActive && (
                                <div className="absolute -bottom-1 w-12 h-1 bg-secondary rounded-full" />
                            )}
                        </button>
                    );
                })}
            </div>
        </nav>
    );
};
