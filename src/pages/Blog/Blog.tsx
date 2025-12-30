import { useState, FC } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/context/LanguageContext';
import { useBlog } from '@/context/BlogContext';
import TypeWriter from '@/components/TypeWriter';
import './Blog.css';

const Blog: FC = () => {
  const { t, language } = useLanguage();
  const { getPublishedPosts } = useBlog();
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const publishedPosts = getPublishedPosts();
  
  const blogPosts = publishedPosts.map(post => ({
    id: post.id,
    slug: post.slug,
    date: new Date(post.publishedAt).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    title: language === 'ar' ? post.titleAr : post.title,
    desc: language === 'ar' ? post.excerptAr : post.excerpt,
    image: post.imageUrl,
    category: post.category,
  }));

  const totalPages = Math.ceil(blogPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = blogPosts.slice(startIndex, startIndex + postsPerPage);

  return (
    <>
      <Helmet>
        <title>Blog - AdsGeniusLab</title>
        <meta name="description" content="Digital marketing insights, tips, and strategies from AdsGeniusLab" />
      </Helmet>

      {/* Hero Section */}
      <section className="page-hero">
        <div className="container">
          <h1 className="fade-in-up">
            <TypeWriter text={t('blog_hero_title')} speed={35} delay={200} />
          </h1>
          <p className="fade-in-up" style={{ animationDelay: '0.3s' }}>{t('blog_hero_subtitle')}</p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="blog-section">
        <div className="container">
          <div className="blog-grid">
            {currentPosts.map((post, index) => (
              <article key={post.id} className="blog-card fade-in-up" style={{ animationDelay: `${0.1 * (index + 1)}s` }}>
                <div className="blog-image" style={{ backgroundImage: `url(${post.image})` }}>
                  <span className="blog-category">{post.category}</span>
                </div>
                <div className="blog-content">
                  <span className="blog-date">
                    <i className="far fa-calendar-alt"></i> {post.date}
                  </span>
                  <h3>{post.title}</h3>
                  <p>{post.desc}</p>
                  <Link to={`/blog/${post.slug}`} className="blog-link">
                    {t('btn_read_more')} <i className="fas fa-arrow-right"></i>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          <div className="blog-pagination">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="pagination-btn"
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`pagination-btn ${currentPage === i + 1 ? 'active' : ''}`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="pagination-btn"
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter-section">
        <div className="container">
          <h2>{t('newsletter_title')}</h2>
          <p>{t('newsletter_desc')}</p>
          <form
            className="newsletter-form"
            action="https://formspree.io/f/xrboynle"
            method="POST"
          >
            <input
              type="email"
              name="email"
              placeholder={t('newsletter_placeholder')}
              required
            />
            <button type="submit" className="btn-primary-custom">
              {t('newsletter_btn')}
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Blog;
