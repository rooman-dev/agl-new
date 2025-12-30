import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { useEffect } from 'react';

// Context
import { LanguageProvider } from '@context/LanguageContext';
import { BlogProvider } from '@/context/BlogContext';
import { AdminProvider } from '@/context/AdminContext';

// Components
import Navbar from '@components/Navbar';
import Footer from '@components/Footer';
import CookieConsent from '@components/CookieConsent';
import AIChatbot from '@components/AIChatbot';

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
              <Routes>
                {/* Admin Routes - No Navbar/Footer */}
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/posts" element={<AdminDashboard />} />
                <Route path="/admin/posts/new" element={<BlogEditor />} />
                <Route path="/admin/posts/:id/edit" element={<BlogEditor />} />
                
                {/* Public Routes - With Navbar/Footer */}
                <Route path="/" element={<><Navbar /><Home /><Footer /></>} />
                <Route path="/about" element={<><Navbar /><About /><Footer /></>} />
                <Route path="/services" element={<><Navbar /><Services /><Footer /></>} />
                <Route path="/blog" element={<><Navbar /><Blog /><Footer /></>} />
                <Route path="/blog/:slug" element={<><Navbar /><BlogPost /><Footer /></>} />
                <Route path="/contact" element={<><Navbar /><Contact /><Footer /></>} />
                <Route path="/consultation" element={<><Navbar /><Consultation /><Footer /></>} />
                <Route path="/privacy-policy" element={<><Navbar /><PrivacyPolicy /><Footer /></>} />
                <Route path="/terms" element={<><Navbar /><Terms /><Footer /></>} />
                <Route path="*" element={<><Navbar /><NotFound /><Footer /></>} />
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
