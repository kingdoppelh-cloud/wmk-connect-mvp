import React from 'react';
import { HeroSwipe } from './home/HeroSwipe';
import { StatsRow } from './home/StatsRow';
import { BusinessRegistration } from './home/BusinessRegistration';
import { RegionalNews } from './home/RegionalNews';

export const Home: React.FC = () => {
    return (
        <div className="pt-2 px-4 md:px-6 max-w-7xl mx-auto space-y-8 md:space-y-12 pb-8 md:pb-12">
            <HeroSwipe />
            <StatsRow />
            <BusinessRegistration />
            <RegionalNews />
        </div>
    );
};
