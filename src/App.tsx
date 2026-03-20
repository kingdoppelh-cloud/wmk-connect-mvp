import { useState, useEffect } from 'react'
import { Layout } from './components/Layout'
import { Discover } from './components/Discover'
import { Favorites } from './components/Favorites'
import { MapView } from './components/MapView'

function App() {
  const [activeTab, setActiveTab] = useState('discover');
  const [favorites, setFavorites] = useState<string[]>([]);

  // Load favorites from local storage
  useEffect(() => {
    const saved = localStorage.getItem('wmk_favorites');
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load favorites', e);
      }
    }
  }, []);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const next = prev.includes(id)
        ? prev.filter(f => f !== id)
        : [...prev, id];
      localStorage.setItem('wmk_favorites', JSON.stringify(next));
      return next;
    });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'discover':
        return <Discover favorites={favorites} onToggleFavorite={toggleFavorite} />;
      case 'map':
        return <MapView />;
      case 'favorites':
        return <Favorites favorites={favorites} onToggleFavorite={toggleFavorite} />;
      default:
        return <Discover favorites={favorites} onToggleFavorite={toggleFavorite} />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  )
}

export default App
