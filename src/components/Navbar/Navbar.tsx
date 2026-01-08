import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';
import './Navbar.css';

const Navbar: React.FC = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { path: '/', label: t('nav_home') },
    { path: '/about', label: t('nav_about') },
    { path: '/services', label: t('nav_services') },
    { path: '/blog', label: t('nav_blog') },
    { path: '/consultation', label: t('nav_consultation') },
    { path: '/contact', label: t('nav_contact') },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const handleToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={`navbar navbar-expand-lg navbar-dark ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <Link className="navbar-brand" to="/">
          adsGeniuslab.
        </Link>

        <div className="navbar-right-section">
          <button
            className={`navbar-toggler ${isMenuOpen ? '' : 'collapsed'}`}
            type="button"
            onClick={handleToggle}
            aria-controls="mainNav"
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        <div className={`navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="mainNav">
          <ul className="navbar-nav">
            {navLinks.map((link) => (
              <li className="nav-item" key={link.path}>
                <Link
                  className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
                  to={link.path}
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="navbar-actions">
            <LanguageToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
