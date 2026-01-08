import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@context/LanguageContext';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  const { t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>{t('privacy_title')} - AdsGeniusLab</title>
      </Helmet>

      <section className="legal-hero">
          <div className="container">
            <h1>{t('privacy_title')}</h1>
            <p>{t('privacy_last_updated')}</p>
          </div>
        </section>

        <section className="legal-content">
          <div className="container">
            <div className="legal-intro">
              <p>
                At AdsGeniusLab, we are committed to protecting your privacy and ensuring the security of your personal information. 
                This Privacy Policy outlines how we collect, use, and safeguard your data when you use our services.
              </p>
            </div>

            <div className="legal-section">
              <h2><span className="section-number">1</span>Information We Collect</h2>
              <p>
                We collect information you provide directly to us, such as your name, email address, phone number, 
                and any other information you choose to provide when contacting us or using our services.
              </p>
            </div>

            <div className="legal-section">
              <h2><span className="section-number">2</span>How We Use Your Information</h2>
              <p>
                We use the information we collect to provide, maintain, and improve our services, 
                to communicate with you about our services, and to send you marketing communications 
                (with your consent where required).
              </p>
            </div>

            <div className="legal-section">
              <h2><span className="section-number">3</span>Information Sharing</h2>
              <p>
                We do not sell, trade, or otherwise transfer your personal information to third parties 
                without your consent, except as necessary to provide our services or as required by law.
              </p>
            </div>

            <div className="legal-section">
              <h2><span className="section-number">4</span>Data Security</h2>
              <p>
                We implement appropriate security measures to protect your personal information against 
                unauthorized access, alteration, disclosure, or destruction.
              </p>
            </div>

            <div className="legal-section">
              <h2><span className="section-number">5</span>Your Rights</h2>
              <p>
                You have the right to access, correct, or delete your personal information. 
                You may also have the right to restrict or object to certain processing of your data.
              </p>
            </div>

            <div className="legal-section">
              <h2><span className="section-number">6</span>Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy or our data practices, 
                please contact us at privacy@adsgeniuslab.com.
              </p>
            </div>
          </div>
        </section>
    </>
  );
};

export default PrivacyPolicy;
