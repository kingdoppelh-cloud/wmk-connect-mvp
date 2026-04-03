import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { NotificationCenter } from './NotificationCenter';
import { RewardModal } from './RewardModal';
import { useUI } from '../context/UIContext';
import { ProfileEditor } from './ProfileEditor';
import { TopAppBar } from './layout/TopAppBar';
import { BottomNavBar } from './layout/BottomNavBar';

export const Layout: React.FC<{ children: React.ReactNode, activeTab: string }> = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isRewardsOpen, setIsRewardsOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const { setShowImpressum, setShowDatenschutz, showProfileEditor, setShowProfileEditor } = useUI();

    return (
        <div className="flex flex-col min-h-screen pt-20 pb-24 safe-bottom bg-surface text-on-surface">
            <TopAppBar />

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

            <AnimatePresence mode="wait">
                <motion.main
                    key={location.pathname}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                    className="flex-1 w-full"
                >
                    {children}

                    {/* Legal Footer */}
                    <footer className="mt-12 mb-8 px-6 text-center border-t border-slate-100 pt-8">
                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-4">WMK Connect © 2026</p>
                        <div className="flex justify-center gap-6">
                            <button
                                onClick={() => setShowImpressum(true)}
                                className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-primary transition-colors"
                            >
                                Impressum
                            </button>
                            <button
                                onClick={() => navigate('/admin')}
                                className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-primary transition-colors"
                            >
                                Admin
                            </button>
                            <button
                                onClick={() => setShowDatenschutz(true)}
                                className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-primary transition-colors"
                            >
                                Datenschutz
                            </button>
                        </div>
                    </footer>
                </motion.main>
            </AnimatePresence>

            <BottomNavBar />
        </div>
    );
};
