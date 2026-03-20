import React from 'react';
import { companies } from '../data/companies';
import { CompanyCard } from './CompanyCard';
import { Heart } from 'lucide-react';

interface Props {
    favorites: string[];
    onToggleFavorite: (id: string) => void;
}

export const Favorites: React.FC<Props> = ({ favorites, onToggleFavorite }) => {
    const favoriteCompanies = companies.filter(c => favorites.includes(c.id));

    return (
        <div className="px-6 pt-6">
            <div className="mb-8">
                <h2 className="text-3xl font-black text-gray-900 tracking-tight">Meine Favoriten</h2>
                <p className="text-gray-500 text-sm mt-2">Ihre gespeicherten Unternehmen auf einen Blick.</p>
            </div>

            <div className="pb-10">
                {favoriteCompanies.length > 0 ? (
                    favoriteCompanies.map(company => (
                        <CompanyCard
                            key={company.id}
                            company={company}
                            isFavorite={true}
                            onToggleFavorite={onToggleFavorite}
                        />
                    ))
                ) : (
                    <div className="text-center py-20 bg-gray-50/50 rounded-3xl border border-dashed border-gray-200 flex flex-col items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-300">
                            <Heart size={32} />
                        </div>
                        <p className="text-gray-400 text-sm font-medium px-10">
                            Noch keine Favoriten gespeichert. Markiere Unternehmen mit dem Herz-Icon!
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};
