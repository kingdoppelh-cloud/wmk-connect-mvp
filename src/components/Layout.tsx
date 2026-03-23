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
import { ProfileEditor } from './ProfileEditor';
import { User as UserIcon } from 'lucide-react';

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
    const { setShowImpressum, setShowDatenschutz, showProfileEditor, setShowProfileEditor } = useUI();

    return (
        <div className="flex flex-col min-h-screen pt-14 pb-20 safe-bottom bg-slate-50/30">
            {/* Top Utility Bar */}
            <header className="fixed top-0 left-0 right-0 z-[60] glass border-b border-gray-100/50 px-6 py-3 flex justify-between items-center h-14">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-accent rounded-lg flex items-center justify-center shadow-sm">
                        <Compass size={14} className="text-white" />
                    </div>
                    <h1 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-800">WMK Connect</h1>
                </div>

                <div className="flex items-center gap-1">
                    {/* Profile & Matching */}
                    <button
                        onClick={() => setShowProfileEditor(true)}
                        aria-label="Mein KI-Profil"
                        className={cn(
                            "p-2 transition-all duration-300 rounded-xl",
                            showProfileEditor ? "bg-accent/10 text-accent" : "text-slate-400 hover:text-slate-600"
                        )}
                    >
                        <UserIcon size={20} />
                    </button>

                    {/* Favorites */}
                    <button
                        onClick={() => navigate('/favorites')}
                        aria-label="Favoriten"
                        className={cn(
                            "p-2 transition-all duration-300 rounded-xl",
                            activeTab === 'favorites' ? "bg-accent/10 text-accent" : "text-slate-400 hover:text-slate-600"
                        )}
                    >
                        <Heart size={20} className={activeTab === 'favorites' ? "fill-accent" : ""} />
                    </button>

                    {/* Points Pill */}
                    <button
                        onClick={() => setIsRewardsOpen(true)}
                        className="ml-1 bg-slate-900 text-white pl-2.5 pr-3 py-1.5 rounded-full flex items-center gap-2 shadow-sm border border-white/10 hover:scale-105 transition-all active:scale-95"
                    >
                        <div className="w-5 h-5 rounded-full bg-premium flex items-center justify-center shadow-inner">
                            <Trophy size={10} className="text-slate-900" />
                        </div>
                        <span className="text-[11px] font-black tracking-tight">{points}</span>
                    </button>

                    {/* Notifications */}
                    <button
                        onClick={() => setIsNotificationsOpen(true)}
                        aria-label="Updates"
                        className="p-2 text-slate-400 hover:text-slate-600 transition-all relative rounded-xl"
                    >
                        <Bell size={20} />
                        {unreadCount > 0 && (
                            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-accent border-2 border-white rounded-full"></span>
                        )}
                    </button>
                </div>
            </header>

            <NotificationCenter
                isOpen={isNotificationsOpen}
                onClose={() => setIsNotificationsOpen(false)}
                onAction={(tab) => navigate(`/${tab === 'discover' ? '' : tab}`)}
            />

            <RewardModal
                isOpen={isRewardsOpen}
                onClose={() => setIsRewardsOpen(false)}
            />

            <ProfileEditor
                isOpen={showProfileEditor}
                onClose={() => setShowProfileEditor(false)}
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
                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-4">WMK Connect © 2026</p>
                        <div className="flex justify-center gap-6">
                            <button
                                onClick={() => setShowImpressum(true)}
                                className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-accent transition-colors"
                            >
                                Impressum
                            </button>
                            <button
                                onClick={() => navigate('/admin')}
                                className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-accent transition-colors"
                            >
                                Admin
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

            {/* Bottom Navigation - Streamlined to 5 main items */}
            <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-gray-100 px-4 py-3 flex justify-between items-center shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)]">
                <button
                    onClick={() => navigate('/')}
                    className={cn(
                        "flex flex-col items-center gap-1 transition-all duration-300 flex-1",
                        activeTab === 'discover' ? "text-accent scale-105" : "text-gray-400 hover:text-gray-600"
                    )}
                >
                    <Compass size={24} strokeWidth={activeTab === 'discover' ? 2.5 : 2} />
                    <span className="text-[9px] font-bold uppercase tracking-tighter">Entdecken</span>
                </button>

                <button
                    onClick={() => navigate('/jobs')}
                    className={cn(
                        "flex flex-col items-center gap-1 transition-all duration-300 flex-1",
                        activeTab === 'jobs' ? "text-accent scale-105" : "text-gray-400 hover:text-gray-600"
                    )}
                >
                    <Briefcase size={22} strokeWidth={activeTab === 'jobs' ? 2.5 : 2} />
                    <span className="text-[9px] font-bold uppercase tracking-tighter">Jobs</span>
                </button>

                <button
                    onClick={() => navigate('/events')}
                    className={cn(
                        "flex flex-col items-center gap-1 transition-all duration-300 flex-1",
                        activeTab === 'events' ? "text-accent scale-105" : "text-gray-400 hover:text-gray-600"
                    )}
                >
                    <Calendar size={24} strokeWidth={activeTab === 'events' ? 2.5 : 2} />
                    <span className="text-[9px] font-bold uppercase tracking-tighter">Events</span>
                </button>

                <button
                    onClick={() => navigate('/feed')}
                    className={cn(
                        "flex flex-col items-center gap-1 transition-all duration-300 flex-1",
                        activeTab === 'feed' ? "text-accent scale-105" : "text-gray-400 hover:text-gray-600"
                    )}
                >
                    <Newspaper size={24} strokeWidth={activeTab === 'feed' ? 2.5 : 2} />
                    <span className="text-[9px] font-bold uppercase tracking-tighter">Aktuelles</span>
                </button>

                <button
                    onClick={() => navigate('/map')}
                    className={cn(
                        "flex flex-col items-center gap-1 transition-all duration-300 flex-1",
                        activeTab === 'map' ? "text-accent scale-105" : "text-gray-400 hover:text-gray-600"
                    )}
                >
                    <MapIcon size={24} strokeWidth={activeTab === 'map' ? 2.5 : 2} />
                    <span className="text-[9px] font-bold uppercase tracking-tighter">Karte</span>
                </button>
            </nav>
        </div>
    );

};
