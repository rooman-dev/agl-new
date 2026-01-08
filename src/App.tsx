import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { useEffect } from 'react';

// Context
import { LanguageProvider } from '@context/LanguageContext';
import { BlogProvider } from '@/context/BlogContext';
import { AdminProvider } from '@/context/AdminContext';

// Components
import Layout from '@/components/Layout';
import CookieConsent from '@components/CookieConsent';
import AIChatbot from '@components/AIChatbot';
import ScrollProgress from '@/components/ScrollProgress';

// Pages
import Home from '@pages/Home';
import About from '@pages/About';
import Services from '@pages/Services';
import Blog from '@pages/Blog';
import BlogPost from '@pages/BlogPost';
import Contact from '@pages/Contact';
import Consultation from '@pages/Consultation';
import PrivacyPolicy from '@pages/PrivacyPolicy';
import Terms from '@pages/Terms';
import NotFound from '@pages/NotFound';

// Admin Pages
import { AdminLogin, AdminDashboard, BlogEditor } from '@/pages/Admin';

// Styles
import '@styles/global.css';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
};

function App() {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <BlogProvider>
          <AdminProvider>
            <Router>
              <ScrollToTop />
              <ScrollProgress />
              <Routes>
                {/* Admin Routes - No Navbar/Footer */}
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/posts" element={<AdminDashboard />} />
                <Route path="/admin/posts/new" element={<BlogEditor />} />
                <Route path="/admin/posts/:id/edit" element={<BlogEditor />} />
                
                {/* Public Routes - With Layout (Navbar/Footer) */}
                <Route path="/" element={<Layout><Home /></Layout>} />
                <Route path="/about" element={<Layout><About /></Layout>} />
                <Route path="/services" element={<Layout><Services /></Layout>} />
                <Route path="/blog" element={<Layout><Blog /></Layout>} />
                <Route path="/blog/:slug" element={<Layout><BlogPost /></Layout>} />
                <Route path="/contact" element={<Layout><Contact /></Layout>} />
                <Route path="/consultation" element={<Layout><Consultation /></Layout>} />
                <Route path="/privacy-policy" element={<Layout><PrivacyPolicy /></Layout>} />
                <Route path="/terms" element={<Layout><Terms /></Layout>} />
                <Route path="*" element={<Layout><NotFound /></Layout>} />
              </Routes>
              <AIChatbot />
              <CookieConsent />
            </Router>
          </AdminProvider>
        </BlogProvider>
      </LanguageProvider>
    </HelmetProvider>
  );
}

export default App;
