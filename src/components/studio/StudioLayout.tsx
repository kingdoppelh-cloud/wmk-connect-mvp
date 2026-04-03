import React from 'react';
import { Outlet } from 'react-router-dom';
import { StudioTopAppBar } from './navigation/StudioTopAppBar';
import { StudioBottomNavBar } from './navigation/StudioBottomNavBar';
import { StudioNavigationDrawer } from './navigation/StudioNavigationDrawer';

export const StudioLayout: React.FC = () => {
    return (
        <div className="studio-theme min-h-screen bg-surface font-body text-on-surface flex flex-col">
            <StudioTopAppBar />
            <div className="flex flex-1 pt-16">
                <StudioNavigationDrawer />
                <main className="flex-1 min-h-screen pb-24 md:pb-12">
                    <Outlet />
                </main>
            </div>
            <StudioBottomNavBar />
        </div>
    );
};
