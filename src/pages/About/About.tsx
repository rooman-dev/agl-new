import { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/context/LanguageContext';
import TypeWriter from '@/components/TypeWriter';
import './About.css';

const About: FC = () => {
  const { t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>About Us - AdsGeniusLab</title>
        <meta name="description" content="Learn about AdsGeniusLab - Your trusted digital marketing partner" />
      </Helmet>

      {/* Hero Section */}
      <section className="page-hero">
        <div className="container">
          <h1 className="fade-in-up">
            <TypeWriter text={t('about_hero_title')} speed={40} delay={200} />
          </h1>
          <p className="fade-in-up" style={{ animationDelay: '0.2s' }}>{t('about_hero_subtitle')}</p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="about-content">
        <div className="container">
          <div className="about-grid">
            <div className="about-card fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="about-icon">
                <i className="fas fa-bullseye"></i>
              </div>
              <h2>{t('about_mission_title')}</h2>
              <p>{t('about_mission_desc')}</p>
            </div>
            <div className="about-card fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="about-icon">
                <i className="fas fa-eye"></i>
              </div>
              <h2>{t('about_vision_title')}</h2>
              <p>{t('about_vision_desc')}</p>
            </div>
          </div>

          {/* Values */}
          <div className="values-section">
            <h2 className="fade-in-up">{t('about_values_title')}</h2>
            <div className="values-grid">
              <div className="value-item fade-in-up" style={{ animationDelay: '0.1s' }}>
                <i className="fas fa-lightbulb"></i>
                <span>{t('about_value_innovation')}</span>
              </div>
              <div className="value-item fade-in-up" style={{ animationDelay: '0.2s' }}>
                <i className="fas fa-handshake"></i>
                <span>{t('about_value_integrity')}</span>
              </div>
              <div className="value-item fade-in-up" style={{ animationDelay: '0.3s' }}>
                <i className="fas fa-star"></i>
                <span>{t('about_value_excellence')}</span>
              </div>
              <div className="value-item fade-in-up" style={{ animationDelay: '0.4s' }}>
                <i className="fas fa-users"></i>
                <span>{t('about_value_collaboration')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="container">
          <h2 className="fade-in-up">{t('testimonials_title')}</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="testimonial-stars">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
              <p>"{t('testimonial_1_text')}"</p>
              <div className="testimonial-author">
                <strong>{t('testimonial_1_name')}</strong>
                <span>{t('testimonial_1_role')}</span>
              </div>
            </div>
            <div className="testimonial-card fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="testimonial-stars">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
              <p>"{t('testimonial_2_text')}"</p>
              <div className="testimonial-author">
                <strong>{t('testimonial_2_name')}</strong>
                <span>{t('testimonial_2_role')}</span>
              </div>
            </div>
            <div className="testimonial-card fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="testimonial-stars">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
              <p>"{t('testimonial_3_text')}"</p>
              <div className="testimonial-author">
                <strong>{t('testimonial_3_name')}</strong>
                <span>{t('testimonial_3_role')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
