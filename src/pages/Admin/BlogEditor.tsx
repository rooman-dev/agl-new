import { FC, useState, useEffect, FormEvent } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAdmin } from '@/context/AdminContext';
import { useBlog, BlogPost } from '@/context/BlogContext';
import './BlogEditor.css';

const BlogEditor: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAdmin();
  const { addPost, updatePost, getPost } = useBlog();
  
  const isEditing = !!id;
  
  const [formData, setFormData] = useState({
    title: '',
    titleAr: '',
    slug: '',
    excerpt: '',
    excerptAr: '',
    content: '',
    contentAr: '',
    category: 'SEO',
    author: 'AGL Team',
    imageUrl: '',
    isPublished: false
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  // Redirect if not authenticated
  if (!isAuthenticated) {
    navigate('/admin/login');
    return null;
  }

  useEffect(() => {
    if (isEditing && id) {
      const post = getPost(id);
      if (post) {
        setFormData({
          title: post.title,
          titleAr: post.titleAr,
          slug: post.slug,
          excerpt: post.excerpt,
          excerptAr: post.excerptAr,
          content: post.content,
          contentAr: post.contentAr,
          category: post.category,
          author: post.author,
          imageUrl: post.imageUrl,
          isPublished: post.isPublished
        });
      } else {
        navigate('/admin/dashboard');
      }
    }
  }, [id, isEditing, getPost, navigate]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData(prev => ({
      ...prev,
      title,
      slug: isEditing ? prev.slug : generateSlug(title)
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSaving(true);

    // Validation
    if (!formData.title.trim()) {
      setError('Title is required');
      setIsSaving(false);
      return;
    }

    if (!formData.content.trim()) {
      setError('Content is required');
      setIsSaving(false);
      return;
    }

    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));

      const postData: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'> = {
        title: formData.title,
        titleAr: formData.titleAr || formData.title,
        slug: formData.slug || generateSlug(formData.title),
        excerpt: formData.excerpt,
        excerptAr: formData.excerptAr || formData.excerpt,
        content: formData.content,
        contentAr: formData.contentAr || formData.content,
        category: formData.category,
        author: formData.author,
        imageUrl: formData.imageUrl || 'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?w=800',
        isPublished: formData.isPublished,
        publishedAt: formData.isPublished ? new Date().toISOString() : ''
      };

      if (isEditing && id) {
        updatePost(id, postData);
      } else {
        addPost(postData);
      }

      navigate('/admin/dashboard');
    } catch (err) {
      setError('Failed to save post. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const categories = [
    'SEO',
    'Social Media',
    'Content Marketing',
    'PPC',
    'Email Marketing',
    'Web Development',
    'Analytics',
    'Branding'
  ];

  return (
    <div className="blog-editor-page">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <i className="fas fa-shield-alt"></i>
          </div>
          <h2>AGL Admin</h2>
        </div>
        
        <nav className="sidebar-nav">
          <Link to="/admin/dashboard" className="nav-item">
            <i className="fas fa-th-large"></i>
            Dashboard
          </Link>
          <Link to="/admin/posts" className="nav-item">
            <i className="fas fa-newspaper"></i>
            All Perspectives
          </Link>
          <Link to="/admin/posts/new" className="nav-item active">
            <i className="fas fa-plus-circle"></i>
            New Perspective
          </Link>
        </nav>

        <div className="sidebar-footer">
          <a href="/" className="nav-item" target="_blank">
            <i className="fas fa-external-link-alt"></i>
            View Website
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="editor-main">
        <header className="editor-header">
          <div className="header-left">
            <Link to="/admin/dashboard" className="back-btn">
              <i className="fas fa-arrow-left"></i>
            </Link>
            <div className="header-title">
              <h1>{isEditing ? 'Edit Perspective' : 'Create New Perspective'}</h1>
              <p>{isEditing ? 'Update your perspective' : 'Write a new perspective'}</p>
            </div>
          </div>
          <div className="header-actions">
            <button 
              type="button" 
              className="btn-save draft"
              onClick={() => {
                setFormData(prev => ({ ...prev, isPublished: false }));
                document.getElementById('blog-form')?.dispatchEvent(
                  new Event('submit', { bubbles: true, cancelable: true })
                );
              }}
              disabled={isSaving}
            >
              <i className="fas fa-save"></i>
              Save Draft
            </button>
            <button 
              type="submit"
              form="blog-form"
              className="btn-save publish"
              onClick={() => setFormData(prev => ({ ...prev, isPublished: true }))}
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i>
                  Saving...
                </>
              ) : (
                <>
                  <i className="fas fa-paper-plane"></i>
                  {isEditing ? 'Update' : 'Publish'}
                </>
              )}
            </button>
          </div>
        </header>

        {error && (
          <div className="error-banner">
            <i className="fas fa-exclamation-circle"></i>
            {error}
          </div>
        )}

        <form id="blog-form" onSubmit={handleSubmit} className="editor-form">
          <div className="editor-grid">
            {/* Left Column - Main Content */}
            <div className="editor-content">
              <div className="form-section">
                <div className="form-group">
                  <label htmlFor="title">Title (English) *</label>
                  <input
                    type="text"
                    id="title"
                    value={formData.title}
                    onChange={handleTitleChange}
                    placeholder="Enter post title..."
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="titleAr">Title (Arabic)</label>
                  <input
                    type="text"
                    id="titleAr"
                    value={formData.titleAr}
                    onChange={(e) => setFormData(prev => ({ ...prev, titleAr: e.target.value }))}
                    placeholder="أدخل عنوان المقال..."
                    dir="rtl"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="slug">Slug</label>
                  <div className="slug-input">
                    <span>/perspectives/</span>
                    <input
                      type="text"
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                      placeholder="post-url-slug"
                    />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <div className="form-group">
                  <label htmlFor="excerpt">Excerpt (English)</label>
                  <textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                    placeholder="Brief description of the post..."
                    rows={3}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="excerptAr">Excerpt (Arabic)</label>
                  <textarea
                    id="excerptAr"
                    value={formData.excerptAr}
                    onChange={(e) => setFormData(prev => ({ ...prev, excerptAr: e.target.value }))}
                    placeholder="وصف موجز للمقال..."
                    rows={3}
                    dir="rtl"
                  />
                </div>
              </div>

              <div className="form-section">
                <div className="form-group">
                  <label htmlFor="content">Content (English) *</label>
                  <textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Write your post content here... (HTML supported)"
                    rows={12}
                    required
                  />
                  <p className="form-hint">You can use HTML tags for formatting</p>
                </div>

                <div className="form-group">
                  <label htmlFor="contentAr">Content (Arabic)</label>
                  <textarea
                    id="contentAr"
                    value={formData.contentAr}
                    onChange={(e) => setFormData(prev => ({ ...prev, contentAr: e.target.value }))}
                    placeholder="اكتب محتوى المقال هنا..."
                    rows={12}
                    dir="rtl"
                  />
                </div>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="editor-sidebar">
              <div className="sidebar-card">
                <h3>Post Settings</h3>
                
                <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="author">Author</label>
                  <input
                    type="text"
                    id="author"
                    value={formData.author}
                    onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                    placeholder="Author name..."
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="imageUrl">Featured Image URL</label>
                  <input
                    type="url"
                    id="imageUrl"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                    placeholder="https://..."
                  />
                  {formData.imageUrl && (
                    <div className="image-preview">
                      <img src={formData.imageUrl} alt="Preview" />
                    </div>
                  )}
                </div>

                <div className="form-group toggle-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={formData.isPublished}
                      onChange={(e) => setFormData(prev => ({ ...prev, isPublished: e.target.checked }))}
                    />
                    <span className="toggle-slider"></span>
                    Publish immediately
                  </label>
                </div>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default BlogEditor;
