import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Map as MapIcon, Compass, Heart, Briefcase, Newspaper, Calendar, Bell, Trophy } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useNotifications } from '../hooks/useNotifications';
import { NotificationCenter } from './NotificationCenter';
import { useRewards } from '../hooks/useRewards';
import { RewardModal } from './RewardModal';
import { useUI } from '../context/UIContext';

/** Styling utility */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/** Layout Component with Bottom Navigation */
export const Layout: React.FC<{ children: React.ReactNode, activeTab: string }> = ({ children, activeTab }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isRewardsOpen, setIsRewardsOpen] = useState(false);
    const { unreadCount } = useNotifications();
    const { points } = useRewards();
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const { setShowImpressum, setShowDatenschutz } = useUI();

    return (
        <div className="flex flex-col min-h-screen pb-20 safe-bottom">
            <NotificationCenter
                isOpen={isNotificationsOpen}
                onClose={() => setIsNotificationsOpen(false)}
                onAction={(tab) => navigate(`/${tab === 'discover' ? '' : tab}`)}
            />

            <RewardModal
                isOpen={isRewardsOpen}
                onClose={() => setIsRewardsOpen(false)}
            />

            {/* Main Content with Transition */}
            <AnimatePresence mode="wait">
                <motion.main
                    key={location.pathname}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                    className="flex-1 w-full max-w-2xl mx-auto"
                >
                    {children}

                    {/* Legal Footer */}
                    <footer className="mt-12 mb-8 px-6 text-center border-t border-slate-100 pt-8">
                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-4">WMK Connect © 2024</p>
                        <div className="flex justify-center gap-6">
                            <button
                                onClick={() => setShowImpressum(true)}
                                className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-accent transition-colors"
                            >
                                Impressum
                            </button>
                            <button
                                onClick={() => setShowDatenschutz(true)}
                                className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-accent transition-colors"
                            >
                                Datenschutz
                            </button>
                        </div>
                    </footer>
                </motion.main>
            </AnimatePresence>

            {/* Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-gray-100 px-6 py-3 flex justify-around items-center">
                <button
                    onClick={() => navigate('/')}
                    aria-label="Entdecken"
                    className={cn(
                        "flex flex-col items-center gap-1 transition-all duration-300",
                        activeTab === 'discover' ? "text-accent scale-110" : "text-gray-400"
                    )}
                >
                    <Compass size={24} strokeWidth={activeTab === 'discover' ? 2.5 : 2} />
                    <span className="text-[10px] font-medium uppercase tracking-wider">Entdecken</span>
                </button>

                <button
                    onClick={() => navigate('/jobs')}
                    aria-label="Jobs"
                    className={cn(
                        "flex flex-col items-center gap-1 transition-all duration-300",
                        activeTab === 'jobs' ? "text-accent scale-110" : "text-gray-400"
                    )}
                >
                    <Briefcase size={22} strokeWidth={activeTab === 'jobs' ? 2.5 : 2} />
                    <span className="text-[10px] font-medium uppercase tracking-wider">Jobs</span>
                </button>

                <button
                    onClick={() => navigate('/events')}
                    aria-label="Events"
                    className={cn(
                        "flex flex-col items-center gap-1 transition-all duration-300",
                        activeTab === 'events' ? "text-accent scale-110" : "text-gray-400"
                    )}
                >
                    <Calendar size={24} strokeWidth={activeTab === 'events' ? 2.5 : 2} />
                    <span className="text-[10px] font-medium uppercase tracking-wider">Events</span>
                </button>

                <button
                    onClick={() => navigate('/feed')}
                    aria-label="Aktuelles"
                    className={cn(
                        "flex flex-col items-center gap-1 transition-all duration-300",
                        activeTab === 'feed' ? "text-accent scale-110" : "text-gray-400"
                    )}
                >
                    <Newspaper size={24} strokeWidth={activeTab === 'feed' ? 2.5 : 2} />
                    <span className="text-[10px] font-medium uppercase tracking-wider">Aktuelles</span>
                </button>

                <button
                    onClick={() => navigate('/map')}
                    aria-label="Karte"
                    className={cn(
                        "flex flex-col items-center gap-1 transition-all duration-300",
                        activeTab === 'map' ? "text-accent scale-110" : "text-gray-400"
                    )}
                >
                    <MapIcon size={24} strokeWidth={activeTab === 'map' ? 2.5 : 2} />
                    <span className="text-[10px] font-medium uppercase tracking-wider">Karte</span>
                </button>

                <button
                    onClick={() => navigate('/favorites')}
                    aria-label="Favoriten"
                    className={cn(
                        "flex flex-col items-center gap-1 transition-all duration-300",
                        activeTab === 'favorites' ? "text-accent scale-110" : "text-gray-400"
                    )}
                >
                    <Heart size={24} strokeWidth={activeTab === 'favorites' ? 2.5 : 2} />
                    <span className="text-[10px] font-medium uppercase tracking-wider">Favoriten</span>
                </button>

                <button
                    onClick={() => setIsNotificationsOpen(true)}
                    aria-label="Benachrichtigungen"
                    className={cn(
                        "flex flex-col items-center gap-1 transition-all duration-300 relative",
                        isNotificationsOpen ? "text-accent scale-110" : "text-gray-400"
                    )}
                >
                    <div className="relative">
                        <Bell size={24} strokeWidth={isNotificationsOpen ? 2.5 : 2} />
                        {unreadCount > 0 && (
                            <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent border-2 border-white rounded-full"></span>
                        )}
                    </div>
                    <span className="text-[10px] font-medium uppercase tracking-wider">Updates</span>
                </button>
            </nav>

            {/* Floating Points Badge */}
            <div className="fixed top-6 left-6 z-[60] animate-in slide-in-from-left-8 duration-700">
                <button
                    onClick={() => setIsRewardsOpen(true)}
                    className="bg-slate-900 text-white pl-4 pr-5 py-2.5 rounded-2xl flex items-center gap-3 shadow-2xl border border-white/10 hover:scale-105 transition-all group active:scale-95"
                >
                    <div className="w-8 h-8 rounded-xl bg-premium flex items-center justify-center shadow-inner group-hover:rotate-12 transition-transform">
                        <Trophy size={16} className="text-slate-900" />
                    </div>
                    <div className="flex flex-col items-start leading-tight">
                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Punkte</span>
                        <span className="text-sm font-black text-white">{points}</span>
                    </div>
                </button>
            </div>
        </div>
    );
};
