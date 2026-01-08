import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@context/LanguageContext';
import { useBlog } from '@/context/BlogContext';
import RevealText from '@/components/RevealText';
import './BlogPost.css';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, language } = useLanguage();
  const { getPostBySlug, getPublishedPosts } = useBlog();
  
  const post = getPostBySlug(slug || '');
  
  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const publishedPosts = getPublishedPosts();
  const relatedPosts = publishedPosts
    .filter(p => p.id !== post.id && p.category === post.category)
    .slice(0, 2)
    .map(p => ({
      id: p.id,
      slug: p.slug,
      title: language === 'ar' ? p.titleAr : p.title,
      date: new Date(p.publishedAt).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      category: p.category,
      image: p.imageUrl
    }));

  const displayTitle = language === 'ar' ? post.titleAr : post.title;
  const displayExcerpt = language === 'ar' ? post.excerptAr : post.excerpt;
  const displayContent = language === 'ar' ? post.contentAr : post.content;
  const displayDate = new Date(post.publishedAt).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <>
      <Helmet>
        <title>{displayTitle} - AGL Digital Marketing</title>
        <meta name="description" content={displayExcerpt} />
      </Helmet>

      {/* Hero Section */}
      <section className="blog-post-hero">
          <div className="container">
            <RevealText>
              <Link to="/blog" className="back-link">
                <i className="fas fa-arrow-left"></i>
                <span>{t('blog_back')}</span>
              </Link>
            </RevealText>
            <RevealText delay={0.1}>
              <span className="blog-post-category">{post.category}</span>
            </RevealText>
            <RevealText delay={0.2}>
              <h1>{displayTitle}</h1>
            </RevealText>
            <RevealText delay={0.3}>
              <div className="blog-post-meta">
                <span className="date">
                  <i className="far fa-calendar-alt"></i>
                  {displayDate}
                </span>
                <span className="author">
                  <i className="far fa-user"></i>
                  {post.author}
                </span>
                <span className="read-time">
                  <i className="far fa-clock"></i>
                  {t('blog_read_time')}
                </span>
              </div>
            </RevealText>
          </div>
        </section>

        {/* Blog Content */}
        <section className="blog-post-content">
          <div className="container">
            <article className="blog-article">
              <RevealText>
                <div className="featured-image" style={{ backgroundImage: `url(${post.imageUrl})` }}>
                </div>
              </RevealText>
              
              <RevealText delay={0.1}>
                <div className="article-body">
                  <p className="lead">{displayExcerpt}</p>
                  <div dangerouslySetInnerHTML={{ __html: displayContent }} />
                </div>
              </RevealText>

              {/* Share Buttons */}
              <RevealText delay={0.2}>
                <div className="share-section">
                  <h4>{t('blog_share_title')}</h4>
                  <div className="share-buttons">
                    <a 
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="share-btn facebook" 
                      aria-label="Share on Facebook"
                    >
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a 
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(displayTitle)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="share-btn twitter" 
                      aria-label="Share on Twitter"
                    >
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a 
                      href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(displayTitle)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="share-btn linkedin" 
                      aria-label="Share on LinkedIn"
                    >
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                    <a 
                      href={`https://wa.me/?text=${encodeURIComponent(displayTitle + ' ' + window.location.href)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="share-btn whatsapp" 
                      aria-label="Share on WhatsApp"
                    >
                      <i className="fab fa-whatsapp"></i>
                    </a>
                  </div>
                </div>
              </RevealText>
            </article>

            {/* Related Posts */}
            <aside className="related-posts">
              <RevealText>
                <h3>{t('blog_related_posts')}</h3>
              </RevealText>
              <div className="related-grid">
                {relatedPosts.map((relatedPost, index) => (
                  <RevealText key={relatedPost.id} delay={0.1 * (index + 1)}>
                    <Link
                      to={`/blog/${relatedPost.slug}`}
                      className="related-card"
                    >
                      <div className="related-image" style={{ backgroundImage: `url(${relatedPost.image})` }}>
                        <span className="related-category">{relatedPost.category}</span>
                      </div>
                      <div className="related-content">
                        <span className="related-date">{relatedPost.date}</span>
                        <h4>{relatedPost.title}</h4>
                      </div>
                    </Link>
                  </RevealText>
                ))}
              </div>
            </aside>
          </div>
        </section>

        {/* CTA Section */}
        <section className="blog-cta">
          <div className="container">
            <RevealText>
              <h2>{t('cta_title')}</h2>
            </RevealText>
            <RevealText delay={0.1}>
              <p>{t('cta_desc')}</p>
            </RevealText>
            <RevealText delay={0.2}>
              <Link to="/consultation" className="btn btn-primary">
                {t('btn_consultation')}
                <i className="fas fa-arrow-right"></i>
              </Link>
            </RevealText>
          </div>
        </section>
    </>
  );
};

export default BlogPost;
