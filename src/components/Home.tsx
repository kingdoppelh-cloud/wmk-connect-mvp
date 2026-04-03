import React from 'react';
import { HeroSwipe } from './home/HeroSwipe';
import { StatsRow } from './home/StatsRow';
import { BusinessRegistration } from './home/BusinessRegistration';
import { RegionalNews } from './home/RegionalNews';
import { AppInstallBanner } from './home/AppInstallBanner';

export const Home: React.FC = () => {
    return (
        <div className="pt-2 px-6 max-w-7xl mx-auto space-y-12 pb-12">
            <HeroSwipe />
            <StatsRow />
            <BusinessRegistration />
            <RegionalNews />
            <AppInstallBanner />
        </div>
    );
};
