import React from 'react';
import { Map as MapIcon, Compass, Heart } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Styling utility */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/** Layout Component with Bottom Navigation */
export const Layout: React.FC<{ children: React.ReactNode, activeTab: string, setActiveTab: (tab: string) => void }> = ({ children, activeTab, setActiveTab }) => {
    return (
        <div className="flex flex-col min-h-screen pb-20 safe-bottom">

            {/* Main Content */}
            <main className="flex-1 w-full max-w-2xl mx-auto">
                {children}
            </main>

            {/* Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-gray-100 px-6 py-3 flex justify-around items-center">
                <button
                    onClick={() => setActiveTab('discover')}
                    className={cn(
                        "flex flex-col items-center gap-1 transition-all duration-300",
                        activeTab === 'discover' ? "text-accent scale-110" : "text-gray-400"
                    )}
                >
                    <Compass size={24} strokeWidth={activeTab === 'discover' ? 2.5 : 2} />
                    <span className="text-[10px] font-medium uppercase tracking-wider">Entdecken</span>
                </button>

                <button
                    onClick={() => setActiveTab('map')}
                    className={cn(
                        "flex flex-col items-center gap-1 transition-all duration-300",
                        activeTab === 'map' ? "text-accent scale-110" : "text-gray-400"
                    )}
                >
                    <MapIcon size={24} strokeWidth={activeTab === 'map' ? 2.5 : 2} />
                    <span className="text-[10px] font-medium uppercase tracking-wider">Karte</span>
                </button>

                <button
                    onClick={() => setActiveTab('favorites')}
                    className={cn(
                        "flex flex-col items-center gap-1 transition-all duration-300",
                        activeTab === 'favorites' ? "text-accent scale-110" : "text-gray-400"
                    )}
                >
                    <Heart size={24} strokeWidth={activeTab === 'favorites' ? 2.5 : 2} />
                    <span className="text-[10px] font-medium uppercase tracking-wider">Favoriten</span>
                </button>
            </nav>
        </div>
    );
};
