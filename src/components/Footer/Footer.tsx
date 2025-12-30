
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import './Footer.css';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>
              <i className="fas fa-lightbulb"></i>{' '}
              <span>{t('footer_company_name')}</span>
            </h4>
            <p>{t('footer_company_desc')}</p>
            <div className="social-links">
              <a
                href="https://wa.me/923181292628"
                target="_blank"
                rel="noopener noreferrer"
                title="WhatsApp"
              >
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4>{t('footer_quick_links')}</h4>
            <ul className="footer-links">
              <li><Link to="/">{t('footer_home')}</Link></li>
              <li><Link to="/about">{t('footer_about')}</Link></li>
              <li><Link to="/services">{t('footer_services')}</Link></li>
              <li><Link to="/consultation">{t('footer_consultation')}</Link></li>
              <li><Link to="/contact">{t('footer_contact')}</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>{t('footer_what_we_do')}</h4>
            <ul className="footer-links">
              <li><Link to="/services#seo">{t('footer_seo')}</Link></li>
              <li><Link to="/services#social">{t('footer_social')}</Link></li>
              <li><Link to="/services#content">{t('footer_content')}</Link></li>
              <li><Link to="/services#ppc">{t('footer_ppc')}</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>{t('footer_contact_info')}</h4>
            <p>
              <i className="fas fa-envelope"></i>{' '}
              <a href="mailto:adsgeniuslab@gmail.com">{t('footer_email')}</a>
            </p>
            <p>
              <i className="fas fa-phone"></i>{' '}
              <a href="tel:+923181292628">{t('footer_phone')}</a>
            </p>
            <p>
              <i className="fab fa-whatsapp"></i>{' '}
              <a
                href="https://wa.me/923181292628"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('footer_whatsapp')}
              </a>
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            <span>{t('footer_copyright')}</span>
            {' | '}
            <Link to="/privacy-policy">{t('footer_privacy')}</Link>
            {' | '}
            <Link to="/terms-of-service">{t('footer_terms')}</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
