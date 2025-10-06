import React, { Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import RatingsPage from './pages/RatingsPage';
import NewsPage from './pages/NewsPage';
import EventsPage from './pages/EventsPage';
import FederationsPage from './pages/FederationsPage';
import ResourcesPage from './pages/ResourcesPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import SearchResultsPage from './pages/SearchResultsPage';
import AdminPage from './pages/AdminPage';
import PaymentsPage from './pages/PaymentsPage';
import CollectionPage from './pages/CollectionPage';
import { LocalizationProvider } from './contexts/LocalizationContext';

// Loading component for Suspense
const LoadingSpinner = () => (
  <div className="flex justify-center items-center min-h-screen w-full">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400"></div>
  </div>
);

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

const AppContent: React.FC = () => {
  return (
    <>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/ratings" element={<RatingsPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/:id" element={<NewsPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/:id" element={<EventsPage />} />
          <Route path="/federations" element={<FederationsPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/gallery/:collectionId" element={<CollectionPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/payments" element={<PaymentsPage />} />
        </Routes>
      </Layout>
    </>
  );
};

const App: React.FC = () => {
  return (
    <LocalizationProvider>
      <Suspense fallback={<LoadingSpinner />}>
        <AppContent />
      </Suspense>
    </LocalizationProvider>
  );
};

export default App;