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
import { MerchantDashboard } from './components/MerchantDashboard';
import { SwipeJobs } from './components/SwipeJobs';
import { JobsBoard } from './components/JobsBoard';
import { PartnerBenefits } from './components/PartnerBenefits';
import { Impressum } from './components/Impressum';
import { Datenschutz } from './components/Datenschutz';
import { PushOptIn } from './components/PushOptIn';
import { ActivityFeed } from './components/ActivityFeed';
import { EventHub } from './components/EventHub';

function App() {
  const [activeTab, setActiveTab] = useState('discover');

  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);
  const [showSwipeJobsId, setShowSwipeJobsId] = useState<string | null>(null);
  const [showPartnerBenefits, setShowPartnerBenefits] = useState(false);
  const [showImpressum, setShowImpressum] = useState(false);
  const [showDatenschutz, setShowDatenschutz] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [session, setSession] = useState<Session | null>(null);

  // Admin States
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [isAddingCompany, setIsAddingCompany] = useState(false);

  // Echte Daten aus Supabase abrufen!
  const { companies, isLoading, error, addCompany, updateCompany, deleteCompany, uploadFile, userLocation, requestLocation } = useCompanies();

  useEffect(() => {
    const handleOpenMerchant = (e: any) => {
      setSelectedCompanyId(e.detail);
      setActiveTab('merchant');
    };
    const handleOpenSwipe = (e: any) => {
      setShowSwipeJobsId(e.detail);
    };
    window.addEventListener('open-merchant', handleOpenMerchant);
    window.addEventListener('open-swipe-jobs', handleOpenSwipe);
    return () => {
      window.removeEventListener('open-merchant', handleOpenMerchant);
      window.removeEventListener('open-swipe-jobs', handleOpenSwipe);
    };
  }, []);

  useEffect(() => {
    // Session state abholen
    supabase.auth.getSession().then(({ data: { session: initialSession } }: { data: { session: Session | null } }) => {
      setSession(initialSession);
    });

    // Check for deep link
    const params = new URLSearchParams(window.location.search);
    const companyId = params.get('company');
    if (companyId) {
      setSelectedCompanyId(companyId);
    }

    // Auth-Listener abonnieren
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: string, currentSession: Session | null) => {
      setSession(currentSession);

      // Auto-detect company for merchants
      if (currentSession?.user?.email) {
        const merchantCompany = companies.find(c => c.email?.toLowerCase() === currentSession.user.email?.toLowerCase());
        if (merchantCompany) {
          setSelectedCompanyId(merchantCompany.id);
          setActiveTab('merchant');
        }
      }
    });

    // Hidden Admin Trigger (Double click Logo)
    (window as any).onAdminRequest = () => setIsAdminMode(true);

    // Legal Page triggers
    (window as any).showImpressum = () => setShowImpressum(true);
    (window as any).showDatenschutz = () => setShowDatenschutz(true);

    return () => {
      subscription.unsubscribe();
      (window as any).onAdminRequest = null;
      (window as any).showImpressum = null;
      (window as any).showDatenschutz = null;
    };
  }, [companies]); // Dependency on companies ensures match works once data is loaded

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
    if (activeTab === 'merchant') {
      return <MerchantDashboard company={selectedCompany} onClose={() => setActiveTab('discover')} />;
    }
    return <CompanyDetail
      company={selectedCompany}
      onBack={() => setSelectedCompanyId(null)}
      allCompanies={companies}
      onSelectCompany={setSelectedCompanyId}
    />;
  }

  if (showSwipeJobsId) {
    const swipeCompany = companies.find(c => c.id === showSwipeJobsId);
    if (swipeCompany) {
      return <SwipeJobs company={swipeCompany} onClose={() => setShowSwipeJobsId(null)} />;
    }
  }

  if (error) {
    return (
      <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
        <div className="p-6 text-center text-red-500 bg-red-50 rounded-xl m-6 border border-red-100">{error}</div>
      </Layout>
    );
  }

  const TABS = {
    discover: <Discover
      companies={companies}
      favorites={favorites}
      onToggleFavorite={toggleFavorite}
      onSelectCompany={setSelectedCompanyId}
      isLoading={isLoading}
      userLocation={userLocation}
      onLocationRequest={requestLocation}
    />,
    jobs: (
      <JobsBoard
        onBecomePartner={() => setShowPartnerBenefits(true)}
        userLocation={userLocation}
        onLocationRequest={requestLocation}
        onCompanyClick={setSelectedCompanyId}
      />
    ),
    feed: (
      <ActivityFeed
        onCompanyClick={setSelectedCompanyId}
      />
    ),
    events: (
      <EventHub />
    ),
    map: (
      <Suspense fallback={<div className="flex h-[50vh] items-center justify-center text-gray-400">Karte lädt...</div>}>
        <MapView companies={companies} onSelectCompany={(id: string) => { setSelectedCompanyId(id); setActiveTab('discover'); }} />
      </Suspense>
    ),
    favorites: <Favorites companies={companies} favorites={favorites} onToggleFavorite={toggleFavorite} onSelectCompany={setSelectedCompanyId} />
  };

  return (
    <>
      <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
        {TABS[activeTab as keyof typeof TABS] || TABS.discover}
        <InstallPrompt />
      </Layout>

      {showPartnerBenefits && (
        <PartnerBenefits
          onClose={() => setShowPartnerBenefits(false)}
          onContact={() => {
            const text = encodeURIComponent("Hallo WMK Connect Team, ich interessiere mich für eine Partnerschaft!");
            window.open(`https://wa.me/4917612345678?text=${text}`, '_blank');
          }}
        />
      )}

      {showImpressum && (
        <div className="fixed inset-0 z-[400] bg-white overflow-y-auto">
          <Impressum onBack={() => setShowImpressum(false)} />
        </div>
      )}

      {showDatenschutz && (
        <div className="fixed inset-0 z-[400] bg-white overflow-y-auto">
          <Datenschutz onBack={() => setShowDatenschutz(false)} />
        </div>
      )}

      <PushOptIn />
    </>
  );

}

export default App;
