import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@context/LanguageContext';
import './NotFound.css';

const NotFound = () => {
  const { t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>{t('error_404_title')} - AdsGeniusLab</title>
      </Helmet>

      <main className="not-found-page">
        <div className="container">
          <div className="not-found-content">
            <div className="error-code">
              <span className="digit">4</span>
              <span className="digit zero">
                <i className="fas fa-compass"></i>
              </span>
              <span className="digit">4</span>
            </div>
            
            <h1>{t('error_404_title')}</h1>
            <p>{t('error_404_message')}</p>
            
            <div className="not-found-actions">
              <Link to="/" className="btn btn-primary">
                <i className="fas fa-home"></i>
                {t('error_404_back_home')}
              </Link>
              <Link to="/contact" className="btn btn-outline">
                <i className="fas fa-envelope"></i>
                {t('nav_contact')}
              </Link>
            </div>

            <div className="helpful-links">
              <h3>Helpful Links</h3>
              <div className="links-grid">
                <Link to="/services">
                  <i className="fas fa-cogs"></i>
                  {t('nav_services')}
                </Link>
                <Link to="/about">
                  <i className="fas fa-users"></i>
                  {t('nav_about')}
                </Link>
                <Link to="/blog">
                  <i className="fas fa-blog"></i>
                  {t('nav_blog')}
                </Link>
                <Link to="/consultation">
                  <i className="fas fa-calendar-check"></i>
                  {t('nav_consultation')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default NotFound;
