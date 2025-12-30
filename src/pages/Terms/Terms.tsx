import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@context/LanguageContext';
import '../PrivacyPolicy/PrivacyPolicy.css'; // Reuse legal styles

const Terms = () => {
  const { t, language } = useLanguage();

  return (
    <>
      <Helmet>
        <title>{t('terms_title')} - AdsGeniusLab</title>
        <html lang={language} dir={language === 'ar' ? 'rtl' : 'ltr'} />
      </Helmet>

      <main>
        <section className="legal-hero">
          <div className="container">
            <h1>{t('terms_title')}</h1>
            <p>{t('terms_last_updated')}</p>
          </div>
        </section>

        <section className="legal-content">
          <div className="container">
            <div className="legal-intro">
              <p>
                Welcome to AdsGeniusLab. By accessing or using our services, you agree to be bound by these 
                Terms of Service. Please read them carefully before using our services.
              </p>
            </div>

            <div className="legal-section">
              <h2><span className="section-number">1</span>Acceptance of Terms</h2>
              <p>
                By accessing and using AdsGeniusLab's services, you accept and agree to be bound by these 
                Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our services.
              </p>
            </div>

            <div className="legal-section">
              <h2><span className="section-number">2</span>Services Description</h2>
              <p>
                AdsGeniusLab provides digital marketing services including SEO, social media marketing, 
                content creation, PPC advertising, and related consulting services. The specific services 
                provided will be outlined in individual service agreements.
              </p>
            </div>

            <div className="legal-section">
              <h2><span className="section-number">3</span>User Responsibilities</h2>
              <p>
                You are responsible for providing accurate information, maintaining the confidentiality of 
                your account credentials, and complying with all applicable laws when using our services.
              </p>
            </div>

            <div className="legal-section">
              <h2><span className="section-number">4</span>Payment Terms</h2>
              <p>
                Payment terms will be specified in individual service agreements. Unless otherwise stated, 
                invoices are due within 30 days of receipt. Late payments may be subject to additional fees.
              </p>
            </div>

            <div className="legal-section">
              <h2><span className="section-number">5</span>Intellectual Property</h2>
              <p>
                All content, materials, and intellectual property created by AdsGeniusLab remain our property 
                until full payment is received, at which point rights will transfer as specified in the service agreement.
              </p>
            </div>

            <div className="legal-section">
              <h2><span className="section-number">6</span>Limitation of Liability</h2>
              <p>
                AdsGeniusLab shall not be liable for any indirect, incidental, special, or consequential damages 
                arising from the use of our services. Our total liability shall not exceed the amount paid for the services.
              </p>
            </div>

            <div className="legal-section">
              <h2><span className="section-number">7</span>Contact Information</h2>
              <p>
                For questions about these Terms of Service, please contact us at legal@adsgeniuslab.com.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Terms;
