import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import './CookieConsent.css';

const COOKIE_CONSENT_KEY = 'cookieConsent';

const CookieConsent: React.FC = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      // Show after a short delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'rejected');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="cookie-consent-popup">
      <div className="cookie-content">
        <div className="cookie-icon">
          <i className="fas fa-cookie-bite"></i>
        </div>
        <div className="cookie-text">
          <h3>{t('cookie_title')}</h3>
          <p>{t('cookie_message')}</p>
          
          <div className="cookie-details">
            <div className="cookie-detail-item">
              <h4><i className="fas fa-shield-alt"></i> {t('cookie_security_title')}</h4>
              <p>{t('cookie_security_text')}</p>
            </div>
            <div className="cookie-detail-item">
              <h4><i className="fas fa-user-shield"></i> {t('cookie_rights_title')}</h4>
              <p>{t('cookie_rights_text')}</p>
            </div>
          </div>
        </div>
        <div className="cookie-actions">
          <button className="btn-accept" onClick={handleAccept}>
            <i className="fas fa-check"></i> {t('cookie_accept')}
          </button>
          <button className="btn-reject" onClick={handleReject}>
            <i className="fas fa-times"></i> {t('cookie_reject')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
