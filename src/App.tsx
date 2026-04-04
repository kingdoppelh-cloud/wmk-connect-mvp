import { useState, useEffect, Suspense, lazy } from 'react';
// label-compliance-check - Root component, all sub-forms are audited.
import { RefreshCw } from 'lucide-react';
import { Routes, Route, useNavigate, useParams, useLocation, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Favorites } from './components/Favorites';
import { CompanyDetail } from './components/CompanyDetail';
import { CompanyForm } from './components/CompanyForm';
import { useCompanies } from './hooks/useCompanies';
import { type Company } from './types';
import { Auth } from './components/Auth';
import { useAuth } from './context/AuthContext';
import { useUI } from './context/UIContext';

const MapView = lazy(() => import('./components/MapView').then(module => ({ default: module.MapView })));
const AdminDashboard = lazy(() => import('./components/AdminDashboard').then(module => ({ default: module.AdminDashboard })));
import { InstallPrompt } from './components/InstallPrompt';
import { SwipeJobs } from './components/SwipeJobs';
import { JobsBoard } from './components/JobsBoard';
import { PartnerBenefits } from './components/PartnerBenefits';
import { Impressum } from './components/Impressum';
import { Datenschutz } from './components/Datenschutz';
import { PushOptIn } from './components/PushOptIn';
import { ActivityFeed } from './components/ActivityFeed';
import { EventHub } from './components/EventHub';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Register } from './components/Register';
import { NotFound } from './components/NotFound';
import { useSEO } from './hooks/useSEO';
import { useStats } from './hooks/useStats';
import { WMK_WHATSAPP } from './constants';

import { StudioLayout } from './components/studio/StudioLayout';
import { StudioDashboard } from './components/studio/StudioDashboard';
import { StudioAssets } from './components/studio/StudioAssets';
import { StudioMarketplace } from './components/studio/StudioMarketplace';
import { StudioServiceDetail } from './components/studio/StudioServiceDetail';

import { MerchantLayout } from './components/merchant/layout/MerchantLayout';
import { MerchantDashboardOverview } from './components/merchant/MerchantDashboardOverview';
import { MerchantJobsList } from './components/merchant/MerchantJobsList';
import { MerchantApplicants } from './components/merchant/MerchantApplicants';
import { MerchantAnalytics } from './components/merchant/MerchantAnalytics';
import { MerchantMessages } from './components/merchant/MerchantMessages';
import { MerchantApplicantDetail } from './components/merchant/MerchantApplicantDetail';
import { MerchantJobBoost } from './components/merchant/MerchantJobBoost';
import { MerchantRecruitingReports } from './components/merchant/MerchantRecruitingReports';
import { MerchantTalentPool } from './components/merchant/MerchantTalentPool';
import { MerchantStudioOnboarding } from './components/merchant/MerchantStudioOnboarding';
import { MerchantInvoices } from './components/merchant/MerchantInvoices';
import { MerchantSubscription } from './components/merchant/MerchantSubscription';
import { MerchantCheckout } from './components/merchant/MerchantCheckout';
import { MerchantCheckoutSuccess } from './components/merchant/MerchantCheckoutSuccess';
import { MerchantServices } from './components/merchant/MerchantServices';
// Wrapper to handle company detail from URL
function CompanyDetailWrapper({ companies }: { companies: Company[] }) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const company = companies.find(c => c.id === id);

  if (!company) return <Navigate to="/" replace />;

  return (
    <CompanyDetail
      company={company}
      onBack={() => { navigate('/'); }}
      allCompanies={companies}
      onSelectCompany={(newId) => navigate(`/company/${newId}`)}
    />
  );
}



function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { session } = useAuth();
  const {
    showPartnerBenefits, setShowPartnerBenefits,
    showImpressum, setShowImpressum,
    showDatenschutz, setShowDatenschutz
  } = useUI();

  const [showSwipeJobsId, setShowSwipeJobsId] = useState<string | null>(null);

  // Admin States
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [isAddingCompany, setIsAddingCompany] = useState(false);

  // Echte Daten aus Supabase abrufen!
  const { companies, error, addCompany, updateCompany, deleteCompany, uploadFile, userLocation, requestLocation } = useCompanies();
  const stats = useStats();

  // Global SEO & Canonical Tag
  useSEO({
    description: "Entdecke Jobs, News und Events von Unternehmen aus dem Werra-Meißner-Kreis auf WMK Connect.",
    image: "https://wmk-connect-mvp.vercel.app/logo.png"
  });

  useEffect(() => {
    const handleOpenMerchant = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      navigate(`/merchant/${detail}`);
    };
    const handleOpenSwipe = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      setShowSwipeJobsId(detail);
    };
    window.addEventListener('open-merchant', handleOpenMerchant);
    window.addEventListener('open-swipe-jobs', handleOpenSwipe);
    return () => {
      window.removeEventListener('open-merchant', handleOpenMerchant);
      window.removeEventListener('open-swipe-jobs', handleOpenSwipe);
    };
  }, [navigate]);


  const handleSaveCompany = async (data: Partial<Company>) => {
    try {
      if (editingCompany) {
        await updateCompany(editingCompany.id, data);
      } else {
        await addCompany(data as Omit<Company, 'id'>);
      }
      setEditingCompany(null);
      setIsAddingCompany(false);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unbekannter Fehler';
      alert('Fehler beim Speichern: ' + message);
    }
  };

  if (showSwipeJobsId) {
    const swipeCompany = companies.find(c => c.id === showSwipeJobsId);
    if (swipeCompany) {
      return <SwipeJobs company={swipeCompany} onClose={() => setShowSwipeJobsId(null)} />;
    }
  }

  // Determine active tab from pathname for Layout
  const getActiveTab = () => {
    const path = location.pathname;
    if (path === '/') return 'discover';
    if (path.startsWith('/jobs')) return 'jobs';
    if (path.startsWith('/feed')) return 'feed';
    if (path.startsWith('/events')) return 'events';
    if (path.startsWith('/map')) return 'map';
    if (path.startsWith('/favorites')) return 'favorites';
    if (path.startsWith('/merchant')) return 'merchant';
    return 'discover';
  };

  const activeTab = getActiveTab();

  return (
    <>
      <Layout activeTab={activeTab}>
        {error && (
          <div className="p-6 text-center text-red-500 bg-red-50 rounded-xl m-6 border border-red-100">{error}</div>
        )}
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={
              <>
                <h1 className="sr-only">WMK Connect - Das regionale Job- und Newsportal für den Werra-Meißner-Kreis</h1>
                <Home />
                {/* Brand Story & Mission - Resolve UX Audit [Reflective] */}
                <section className="px-6 py-16 bg-slate-50 border-t border-slate-100">
                  <div className="max-w-4xl mx-auto text-center space-y-6">
                    <h2 className="text-3xl md:text-4xl font-headline font-bold text-slate-900" style={{ fontSize: 'clamp(1.875rem, 4vw, 2.25rem)' }}>Warum WMK Connect?</h2>
                    <p className="text-lg text-slate-600 leading-relaxed max-w-[65ch] mx-auto">
                      Wir glauben an die Kraft der regionalen Vernetzung. Unsere Mission ist es, Talente und Unternehmen im Werra-Meißner-Kreis auf einer modernen, intuitiven Plattform zusammenzubringen, um die Zukunft unserer Heimat gemeinsam zu gestalten.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8">
                      <div className="space-y-1">
                        <div className="text-3xl font-bold text-accent">{stats.companies}+</div>
                        <div className="text-sm text-slate-500">Unternehmen</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-3xl font-bold text-accent">{stats.jobs}+</div>
                        <div className="text-sm text-slate-500">Offene Stellen</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-3xl font-bold text-accent">{stats.users}+</div>
                        <div className="text-sm text-slate-500">Nutzer</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-3xl font-bold text-accent">100%</div>
                        <div className="text-sm text-slate-500">Regional</div>
                      </div>
                    </div>
                  </div>
                </section>
              </>
            } />
            <Route path="/map" element={
              <Suspense fallback={<div className="flex h-[50vh] items-center justify-center text-gray-400">Karte lädt...</div>}>
                <MapView companies={companies} onSelectCompany={(id: string) => navigate(`/company/${id}`)} />
              </Suspense>
            } />
            <Route path="/jobs" element={
              <JobsBoard
                userLocation={userLocation}
                onLocationRequest={requestLocation}
                onCompanyClick={(id) => navigate(`/company/${id}`)}
              />
            } />
            <Route path="/news" element={
              <ActivityFeed onCompanyClick={(id) => navigate(`/company/${id}`)} />
            } />
            <Route path="/events" element={<EventHub />} />
            <Route path="/favorites" element={
              <Favorites companies={companies} onSelectCompany={(id) => navigate(`/company/${id}`)} />
            } />
            <Route path="/company/:id" element={<CompanyDetailWrapper companies={companies} />} />
            <Route path="/register" element={<Register onBack={() => navigate('/')} />} />
            <Route path="/merchant/:id" element={<MerchantLayout />}>
              <Route index element={<Navigate to="overview" replace />} />
              <Route path="overview" element={<MerchantDashboardOverview />} />
              <Route path="jobs" element={<MerchantJobsList />} />
              <Route path="jobs/:jobId/boost" element={<MerchantJobBoost />} />
              <Route path="applicants" element={<MerchantApplicants />} />
              <Route path="applicants/:applicantId" element={<MerchantApplicantDetail />} />
              <Route path="analytics" element={<MerchantAnalytics />} />
              <Route path="messages" element={<MerchantMessages />} />
              <Route path="services" element={<MerchantServices />} />
              <Route path="reports" element={<MerchantRecruitingReports />} />
              <Route path="talent" element={<MerchantTalentPool />} />
              <Route path="onboarding" element={<MerchantStudioOnboarding />} />
              <Route path="invoices" element={<MerchantInvoices />} />
              <Route path="invoices/subscription" element={<MerchantSubscription />} />
              <Route path="checkout" element={<MerchantCheckout />} />
              <Route path="checkout/success" element={<MerchantCheckoutSuccess />} />
            </Route>

            {/* Studio Routes */}
            <Route path="/studio" element={<StudioLayout />}>
              <Route index element={<StudioDashboard />} />
              <Route path="assets" element={<StudioAssets />} />
              <Route path="services" element={<StudioMarketplace />} />
              <Route path="services/:id" element={<StudioServiceDetail />} />
            </Route>

            <Route path="/admin" element={
              !session ? (
                <Auth onBack={() => navigate('/')} />
              ) : (
                <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center"><RefreshCw className="animate-spin text-accent" /></div>}>
                  <AdminDashboard
                    companies={companies}
                    onBack={() => navigate('/')}
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
                </Suspense>
              )
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
        <InstallPrompt />
      </Layout>

      {showPartnerBenefits && (
        <PartnerBenefits
          onClose={() => setShowPartnerBenefits(false)}
          onContact={() => {
            const text = encodeURIComponent("Hallo WMK Connect Team, ich interessiere mich für eine Partnerschaft!");
            window.open(`https://wa.me/${WMK_WHATSAPP}?text=${text}`, '_blank');
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
