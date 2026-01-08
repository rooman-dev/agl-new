import { useState, FormEvent, FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@context/LanguageContext';
import TypeWriter from '@/components/TypeWriter';
import apiService from '@/services/api';
import './Contact.css';

const Contact: FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    
    try {
      await apiService.sendContactForm({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      });
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to send message');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: 'fas fa-envelope',
      title: t('contact_info_email'),
      value: 'roomankhan2512@gmail.com',
      link: 'mailto:roomankhan2512@gmail.com',
    },
    {
      icon: 'fas fa-phone-alt',
      title: t('contact_info_phone'),
      value: '+92 318 1292628',
      link: 'tel:+923181292628',
    },
    {
      icon: 'fab fa-whatsapp',
      title: t('contact_info_whatsapp'),
      value: '+92 318 1292628',
      link: 'https://wa.me/923181292628',
    },
  ];

  return (
    <>
      <Helmet>
        <title>{t('contact_hero_title')} - AdsGeniusLab</title>
        <meta name="description" content={t('contact_hero_subtitle')} />
      </Helmet>

      {/* Hero Section */}
        <section className="contact-hero">
          <div className="container">
            <h1 className="fade-in-up">
              <TypeWriter text={t('contact_hero_title')} speed={40} delay={200} />
            </h1>
            <p className="fade-in-up" style={{ animationDelay: '0.3s' }}>{t('contact_hero_subtitle')}</p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="contact-section">
          <div className="container">
            <div className="contact-grid">
              {/* Contact Info */}
              <div className="contact-info">
                <h2>{t('contact_info_title')}</h2>
                
                <div className="info-cards">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="info-card">
                      <div className="info-icon">
                        <i className={info.icon}></i>
                      </div>
                      <div className="info-content">
                        <h4>{info.title}</h4>
                        {info.link ? (
                          <a href={info.link}>{info.value}</a>
                        ) : (
                          <p>{info.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Form */}
              <div className="contact-form-wrapper">
                <h2>{t('contact_form_title')}</h2>
                
                {submitStatus === 'success' ? (
                  <div className="success-message">
                    <i className="fas fa-check-circle"></i>
                    <h3>{t('form_success')}</h3>
                    <button 
                      onClick={() => setSubmitStatus('idle')}
                      className="btn btn-primary"
                    >
                      {t('contact_send_another')}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="contact-form">
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="name">{t('contact_form_name')}</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="email">{t('contact_form_email')}</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="phone">{t('contact_form_phone')}</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="subject">{t('contact_form_subject')}</label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="message">{t('contact_form_message')}</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        required
                      ></textarea>
                    </div>

                    {submitStatus === 'error' && (
                      <div className="error-message">
                        <i className="fas fa-exclamation-circle"></i>
                        {errorMessage || t('form_error')}
                      </div>
                    )}
                    
                    <button 
                      type="submit" 
                      className="btn btn-primary submit-btn"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <i className="fas fa-spinner fa-spin"></i>
                          {t('contact_sending')}
                        </>
                      ) : (
                        <>
                          {t('contact_form_submit')}
                          <i className="fas fa-paper-plane"></i>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
    </>
  );
};

export default Contact;
