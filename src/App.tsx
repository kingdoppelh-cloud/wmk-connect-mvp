import { useState, useEffect, Suspense, lazy } from 'react';
import { Layout } from './components/Layout';
import { Discover } from './components/Discover';
import { Favorites } from './components/Favorites';
import { CompanyDetail } from './components/CompanyDetail';
import { useCompanies } from './hooks/useCompanies';

const MapView = lazy(() => import('./components/MapView').then(module => ({ default: module.MapView })));

function App() {
  const [activeTab, setActiveTab] = useState('discover');
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Echte Daten aus Supabase abrufen!
  const { companies, isLoading, error } = useCompanies();
  console.log('App state:', { activeTab, favoritesCount: favorites.length, companiesCount: companies.length, isLoading, error });

  useEffect(() => {
    const saved = localStorage.getItem('wmk_favorites');
    if (saved) {
      try { setFavorites(JSON.parse(saved)); }
      catch (e) { console.error('Failed to load favorites', e); }
    }
  }, []);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const next = prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id];
      localStorage.setItem('wmk_favorites', JSON.stringify(next));
      return next;
    });
  };

  const selectedCompany = companies.find(c => c.id === selectedCompanyId);

  // Detailansicht hat Vorrang vor Tabs, wenn eine Firma ausgewählt ist
  if (selectedCompanyId && selectedCompany) {
    return <CompanyDetail company={selectedCompany} onBack={() => setSelectedCompanyId(null)} />;
  }

  // Loading-State anzeigen
  if (isLoading) {
    return (
      <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
        <div className="flex h-[50vh] items-center justify-center text-gray-500 font-medium">Lade Firmen...</div>
      </Layout>
    );
  }

  // Error-State anzeigen
  if (error) {
    return (
      <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
        <div className="p-6 text-center text-red-500 bg-red-50 rounded-xl m-6 border border-red-100">{error}</div>
      </Layout>
    );
  }

  const TABS = {
    discover: <Discover companies={companies} favorites={favorites} onToggleFavorite={toggleFavorite} onSelectCompany={setSelectedCompanyId} />,
    map: (
      <Suspense fallback={<div className="flex h-[50vh] items-center justify-center text-gray-400">Karte lädt...</div>}>
        <MapView companies={companies} onSelectCompany={(id: string) => { setSelectedCompanyId(id); setActiveTab('discover'); }} />
      </Suspense>
    ),
    favorites: <Favorites companies={companies} favorites={favorites} onToggleFavorite={toggleFavorite} onSelectCompany={setSelectedCompanyId} />
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {TABS[activeTab as keyof typeof TABS] || TABS.discover}
    </Layout>
  )
}

export default App;
