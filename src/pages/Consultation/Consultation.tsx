import { useState, FormEvent, FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@context/LanguageContext';
import TypeWriter from '@/components/TypeWriter';
import './Consultation.css';

const Consultation: FC = () => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    website: '',
    service: '',
    budget: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsComplete(true);
    } catch {
      // Handle error
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    { icon: 'fas fa-comments', title: t('consultation_why_expert'), desc: t('consultation_why_expert_desc') },
    { icon: 'fas fa-cogs', title: t('consultation_why_custom'), desc: t('consultation_why_custom_desc') },
    { icon: 'fas fa-chart-line', title: t('consultation_why_results'), desc: t('consultation_why_results_desc') },
  ];

  if (isComplete) {
    return (
      <>
        <Helmet>
          <title>{t('consultation_hero_title')} - AdsGeniusLab</title>
          <html lang={language} dir={language === 'ar' ? 'rtl' : 'ltr'} />
        </Helmet>
        <main>
          <section className="success-section">
            <div className="container">
              <div className="success-content">
                <div className="success-icon">
                  <i className="fas fa-check-circle"></i>
                </div>
                <h1>{t('form_success')}</h1>
                <p>We'll be in touch within 24 hours to schedule your consultation.</p>
              </div>
            </div>
          </section>
        </main>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{t('consultation_hero_title')} - AdsGeniusLab</title>
        <meta name="description" content={t('consultation_hero_subtitle')} />
        <html lang={language} dir={language === 'ar' ? 'rtl' : 'ltr'} />
      </Helmet>

      <main>
        {/* Hero Section */}
        <section className="consultation-hero">
          <div className="container">
            <div className="hero-content fade-in-up">
              <h1>
                <TypeWriter text={t('consultation_hero_title')} speed={40} delay={200} />
              </h1>
              <p>{t('consultation_hero_subtitle')}</p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="benefits-section">
          <div className="container">
            <div className="benefits-grid">
              {benefits.map((benefit, index) => (
                <div 
                  key={index} 
                  className="benefit-card fade-in-up"
                  style={{ animationDelay: `${0.1 * (index + 1)}s` }}
                >
                  <div className="benefit-icon">
                    <i className={benefit.icon}></i>
                  </div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="form-section">
          <div className="container">
            <div className="form-wrapper fade-in-up" style={{ animationDelay: '0.2s' }}>
              <h2>{t('consultation_form_title')}</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="form-grid">
                  <div className="form-group">
                    <label>{t('consultation_form_name')}</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>{t('consultation_form_email')}</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>{t('consultation_form_phone')}</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>{t('consultation_form_company')}</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>{t('consultation_form_website')}</label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="https://example.com"
                    />
                  </div>
                  <div className="form-group">
                    <label>{t('consultation_form_service')}</label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a service</option>
                      <option value="seo">{t('services_seo_title')}</option>
                      <option value="social">{t('services_social_title')}</option>
                      <option value="content">{t('services_content_title')}</option>
                      <option value="ppc">{t('services_ppc_title')}</option>
                      <option value="email">{t('services_email_title')}</option>
                      <option value="analytics">{t('services_analytics_title')}</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>{t('consultation_form_budget')}</label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                    >
                      <option value="">Select budget range</option>
                      <option value="<1000">Less than $1,000/month</option>
                      <option value="1000-5000">$1,000 - $5,000/month</option>
                      <option value="5000-10000">$5,000 - $10,000/month</option>
                      <option value="10000+">$10,000+/month</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-group full-width">
                  <label>{t('consultation_form_message')}</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i>
                      Submitting...
                    </>
                  ) : (
                    <>
                      {t('consultation_form_submit')}
                      <i className="fas fa-arrow-right"></i>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Consultation;
