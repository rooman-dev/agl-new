import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/context/LanguageContext';
import RevealText from '@/components/RevealText';
import './Home.css';

const Home: FC = () => {
  const { t, language } = useLanguage();

  return (
    <>
      <Helmet>
        <title>AdsGeniusLab - Digital Marketing Excellence</title>
        <meta name="description" content="AdsGeniusLab - Premier Digital Marketing Solutions for Your Business Growth" />
      </Helmet>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <RevealText direction="up" delay={0}>
              <div className="subheading">{t('hero_subheading')}</div>
            </RevealText>
            <RevealText direction="up" delay={100}>
              <h1>
                {language === 'ar' ? (
                  <>
                    {t('hero_title_part1')} <span className="highlight">{t('hero_title_part2')}</span>
                    {t('hero_title_part3')}<span className="highlight">{t('hero_title_part4')}</span>
                    {t('hero_title_part5')}
                  </>
                ) : (
                  <>
                    {t('hero_title_part1')} <span className="highlight">{t('hero_title_part2')}</span>
                    {t('hero_title_part3')}<span className="highlight">{t('hero_title_part4')}</span> {t('hero_title_part5')}
                  </>
                )}
              </h1>
            </RevealText>
            <RevealText direction="up" delay={200}>
              <p className="hero-description">{t('hero_description')}</p>
            </RevealText>
            <RevealText direction="up" delay={300}>
              <div className="hero-buttons">
                <Link to="/consultation" className="btn-primary-custom">
                  <i className="fas fa-comments"></i> {t('btn_talk_growth')}
                </Link>
                <Link to="/services" className="btn-secondary-custom">
                  <i className="fas fa-arrow-right"></i> {t('btn_what_we_do')}
                </Link>
              </div>
            </RevealText>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            <RevealText direction="up" delay={0}>
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-chart-line"></i>
                </div>
                <h3>{t('feature_growth')}</h3>
                <p>{t('feature_growth_desc')}</p>
              </div>
            </RevealText>
            <RevealText direction="up" delay={100}>
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-users"></i>
                </div>
                <h3>{t('feature_team')}</h3>
                <p>{t('feature_team_desc')}</p>
              </div>
            </RevealText>
            <RevealText direction="up" delay={200}>
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-trophy"></i>
                </div>
                <h3>{t('feature_results')}</h3>
                <p>{t('feature_results_desc')}</p>
              </div>
            </RevealText>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <RevealText direction="up" delay={0}>
              <div className="stat-item">
                <div className="stat-number">500+</div>
                <div className="stat-label">{t('stat_campaigns')}</div>
              </div>
            </RevealText>
            <RevealText direction="up" delay={100}>
              <div className="stat-item">
                <div className="stat-number">98%</div>
                <div className="stat-label">{t('stat_satisfaction')}</div>
              </div>
            </RevealText>
            <RevealText direction="up" delay={200}>
              <div className="stat-item">
                <div className="stat-number">10+</div>
                <div className="stat-label">{t('stat_experience')}</div>
              </div>
            </RevealText>
            <RevealText direction="up" delay={300}>
              <div className="stat-item">
                <div className="stat-number">15+</div>
                <div className="stat-label">{t('stat_industries')}</div>
              </div>
            </RevealText>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <RevealText direction="up" delay={0}>
            <h2>{t('cta_ready')}</h2>
          </RevealText>
          <RevealText direction="up" delay={100}>
            <p>{t('cta_description')}</p>
          </RevealText>
          <RevealText direction="up" delay={200}>
            <Link to="/consultation" className="btn-primary-custom">
              <i className="fas fa-calendar-alt"></i> {t('btn_consultation')}
            </Link>
          </RevealText>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="trusted-section">
        <div className="container">
          <RevealText direction="up" delay={0}>
            <h2>{t('trusted_heading')}</h2>
            <div className="title-underline"></div>
          </RevealText>
          <RevealText direction="up" delay={100}>
            <p>{t('trusted_description')}</p>
          </RevealText>
          <RevealText direction="up" delay={200}>
            <p className="industries-text">{t('industries_text')}</p>
          </RevealText>
        </div>
      </section>
    </>
  );
};

export default Home;
