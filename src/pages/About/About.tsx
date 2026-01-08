import { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/context/LanguageContext';
import TypeWriter from '@/components/TypeWriter';
import RevealText from '@/components/RevealText';
import './About.css';

const About: FC = () => {
  const { t } = useLanguage();

  const values = [
    {
      icon: 'fas fa-lightbulb',
      title: t('about_value_innovation'),
      desc: t('about_value_innovation_desc'),
      color: '#4A6FA5'
    },
    {
      icon: 'fas fa-handshake',
      title: t('about_value_integrity'),
      desc: t('about_value_integrity_desc'),
      color: '#5C8BC4'
    },
    {
      icon: 'fas fa-star',
      title: t('about_value_excellence'),
      desc: t('about_value_excellence_desc'),
      color: '#3D5A80'
    },
    {
      icon: 'fas fa-users',
      title: t('about_value_collaboration'),
      desc: t('about_value_collaboration_desc'),
      color: '#2A4A6E'
    }
  ];

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
            <RevealText direction="up" delay={100}>
              <div className="about-card">
                <div className="about-icon">
                  <i className="fas fa-bullseye"></i>
                </div>
                <h2>{t('about_mission_title')}</h2>
                <p>{t('about_mission_desc')}</p>
              </div>
            </RevealText>
            <RevealText direction="up" delay={200}>
              <div className="about-card">
                <div className="about-icon">
                  <i className="fas fa-eye"></i>
                </div>
                <h2>{t('about_vision_title')}</h2>
                <p>{t('about_vision_desc')}</p>
              </div>
            </RevealText>
          </div>

          {/* Our Story */}
          <div className="story-section">
            <RevealText direction="left" delay={0}>
              <div className="story-content">
                <h2>{t('about_story_title')}</h2>
                <p>{t('about_story_desc')}</p>
              </div>
            </RevealText>
            <RevealText direction="right" delay={100}>
              <div className="story-content">
                <h2>{t('about_approach_title')}</h2>
                <p>{t('about_approach_desc')}</p>
              </div>
            </RevealText>
          </div>

          {/* Enhanced Values */}
          <div className="values-section">
            <RevealText direction="up" delay={0}>
              <h2 className="section-title">{t('about_values_title')}</h2>
            </RevealText>
            <div className="values-grid-enhanced">
              {values.map((value, index) => (
                <RevealText key={index} direction="up" delay={index * 100 + 100}>
                  <div className="value-card">
                    <div className="value-icon-wrapper" style={{ background: `linear-gradient(135deg, ${value.color} 0%, ${value.color}99 100%)` }}>
                      <i className={value.icon}></i>
                    </div>
                    <h3>{value.title}</h3>
                    <p>{value.desc}</p>
                    <div className="value-number">{String(index + 1).padStart(2, '0')}</div>
                  </div>
                </RevealText>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="container">
          <RevealText direction="up" delay={0}>
            <h2>{t('testimonials_title')}</h2>
          </RevealText>
          <div className="testimonials-grid">
            <RevealText direction="up" delay={100}>
              <div className="testimonial-card">
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
            </RevealText>
            <RevealText direction="up" delay={200}>
              <div className="testimonial-card">
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
            </RevealText>
            <RevealText direction="up" delay={300}>
              <div className="testimonial-card">
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
            </RevealText>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
