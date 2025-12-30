import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/context/LanguageContext';
import TypeWriter from '@/components/TypeWriter';
import './Services.css';

const Services: FC = () => {
  const { t } = useLanguage();

  // Add light-page class to body for navbar styling
  useEffect(() => {
    document.body.classList.add('light-page');
    return () => {
      document.body.classList.remove('light-page');
    };
  }, []);

  const services = [
    {
      id: 'seo',
      icon: 'fas fa-search',
      title: t('services_seo_title'),
      desc: t('services_seo_desc'),
    },
    {
      id: 'social',
      icon: 'fas fa-share-alt',
      title: t('services_social_title'),
      desc: t('services_social_desc'),
    },
    {
      id: 'content',
      icon: 'fas fa-pen-fancy',
      title: t('services_content_title'),
      desc: t('services_content_desc'),
    },
    {
      id: 'ppc',
      icon: 'fas fa-ad',
      title: t('services_ppc_title'),
      desc: t('services_ppc_desc'),
    },
    {
      id: 'email',
      icon: 'fas fa-envelope-open-text',
      title: t('services_email_title'),
      desc: t('services_email_desc'),
    },
    {
      id: 'analytics',
      icon: 'fas fa-chart-bar',
      title: t('services_analytics_title'),
      desc: t('services_analytics_desc'),
    },
  ];

  return (
    <>
      <Helmet>
        <title>Our Services - AdsGeniusLab</title>
        <meta name="description" content="Comprehensive digital marketing services to grow your business" />
      </Helmet>

      {/* Hero Section */}
      <section className="page-hero">
        <div className="container">
          <h1 className="fade-in-up">
            <TypeWriter text={t('services_hero_title')} speed={40} delay={200} />
          </h1>
          <p className="fade-in-up" style={{ animationDelay: '0.3s' }}>{t('services_hero_subtitle')}</p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="services-section">
        <div className="container">
          <div className="services-grid">
            {services.map((service) => (
              <div key={service.id} id={service.id} className="service-card">
                <div className="service-icon">
                  <i className={service.icon}></i>
                </div>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="services-cta">
        <div className="container">
          <h2>{t('cta_title')}</h2>
          <p>{t('cta_desc')}</p>
          <Link to="/consultation" className="btn-primary-custom">
            <i className="fas fa-calendar-alt"></i> {t('btn_schedule')}
          </Link>
        </div>
      </section>
    </>
  );
};

export default Services;
