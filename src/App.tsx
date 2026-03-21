import { useState, useEffect, Suspense, lazy } from 'react';
import { Layout } from './components/Layout';
import { Discover } from './components/Discover';
import { Favorites } from './components/Favorites';
import { CompanyDetail } from './components/CompanyDetail';
import { AdminDashboard } from './components/AdminDashboard';
import { CompanyForm } from './components/CompanyForm';
import { useCompanies } from './hooks/useCompanies';
import { type Company } from './data/companies';
import { supabase } from './utils/supabase';
import { Auth } from './components/Auth';
import type { Session } from '@supabase/supabase-js';

const MapView = lazy(() => import('./components/MapView').then(module => ({ default: module.MapView })));

import { InstallPrompt } from './components/InstallPrompt';

function App() {
  const [activeTab, setActiveTab] = useState('discover');

  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [session, setSession] = useState<Session | null>(null);

  // Admin States
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [isAddingCompany, setIsAddingCompany] = useState(false);

  // Echte Daten aus Supabase abrufen!
  const { companies, isLoading, error, addCompany, updateCompany, deleteCompany, uploadFile } = useCompanies();

  useEffect(() => {
    const handleOpenMerchant = (e: any) => {
      setSelectedCompanyId(e.detail);
      setActiveTab('merchant');
    };
    window.addEventListener('open-merchant', handleOpenMerchant);
    return () => window.removeEventListener('open-merchant', handleOpenMerchant);
  }, []);

  useEffect(() => {
    // Session state abholen
    supabase.auth.getSession().then(({ data: { session: initialSession } }: { data: { session: Session | null } }) => {
      setSession(initialSession);
    });

    // Auth-Listener abonnieren
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: string, currentSession: Session | null) => {
      setSession(currentSession);
    });

    // Hidden Admin Trigger (Double click Logo)
    (window as any).onAdminRequest = () => setIsAdminMode(true);

    return () => {
      subscription.unsubscribe();
      (window as any).onAdminRequest = null;
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAdminMode(false);
  };

  const handleSaveCompany = async (data: Partial<Company>) => {
    try {
      if (editingCompany) {
        await updateCompany(editingCompany.id, data);
      } else {
        await addCompany(data as Omit<Company, 'id'>);
      }
      setEditingCompany(null);
      setIsAddingCompany(false);
    } catch (err: any) {
      alert('Fehler beim Speichern: ' + err.message);
    }
  };

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

  // Admin Dashboard View
  if (isAdminMode) {
    if (!session) {
      return <Auth onBack={() => setIsAdminMode(false)} />;
    }

    return (
      <>
        <AdminDashboard
          companies={companies}
          onBack={() => setIsAdminMode(false)}
          onLogout={handleLogout}
          onEdit={setEditingCompany}
          onAdd={() => setIsAddingCompany(true)}
          onDelete={deleteCompany}
        />
        {(editingCompany || isAddingCompany) && (
          <CompanyForm
            company={editingCompany || undefined}
            onClose={() => { setEditingCompany(null); setIsAddingCompany(false); }}
            onSave={handleSaveCompany}
            onUpload={uploadFile}
          />
        )}
      </>
    );
  }

  // Detailansicht hat Vorrang vor Tabs, wenn eine Firma ausgewählt ist
  if (selectedCompanyId && selectedCompany) {
    return <CompanyDetail company={selectedCompany} onBack={() => setSelectedCompanyId(null)} />;
  }

  if (error) {
    return (
      <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
        <div className="p-6 text-center text-red-500 bg-red-50 rounded-xl m-6 border border-red-100">{error}</div>
      </Layout>
    );
  }

  const TABS = {
    discover: <Discover companies={companies} favorites={favorites} onToggleFavorite={toggleFavorite} onSelectCompany={setSelectedCompanyId} isLoading={isLoading} />,
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
      <InstallPrompt />
    </Layout>
  )

}

export default App;
