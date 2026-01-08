import { FC, useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { useAdmin } from '@/context/AdminContext';
import { useBlog } from '@/context/BlogContext';
import './AdminDashboard.css';

const AdminDashboard: FC = () => {
  const { logout, isAuthenticated } = useAdmin();
  const { posts, deletePost } = useBlog();
  const navigate = useNavigate();
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const handleDelete = (id: string) => {
    deletePost(id);
    setDeleteConfirm(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <i className="fas fa-shield-alt"></i>
          </div>
          <h2>AGL Admin</h2>
        </div>
        
        <nav className="sidebar-nav">
          <Link to="/admin/dashboard" className="nav-item active">
            <i className="fas fa-th-large"></i>
            Dashboard
          </Link>
          <Link to="/admin/posts" className="nav-item">
            <i className="fas fa-newspaper"></i>
            All Perspectives
          </Link>
          <Link to="/admin/posts/new" className="nav-item">
            <i className="fas fa-plus-circle"></i>
            New Perspective
          </Link>
        </nav>

        <div className="sidebar-footer">
          <a href="/" className="nav-item" target="_blank">
            <i className="fas fa-external-link-alt"></i>
            View Website
          </a>
          <button onClick={handleLogout} className="nav-item logout-btn">
            <i className="fas fa-sign-out-alt"></i>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <header className="admin-header">
          <div className="header-title">
            <h1>Dashboard</h1>
            <p>Welcome to the AGL Admin Panel</p>
          </div>
          <Link to="/admin/posts/new" className="btn-new-post">
            <i className="fas fa-plus"></i>
            New Perspective
          </Link>
        </header>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon blue">
              <i className="fas fa-newspaper"></i>
            </div>
            <div className="stat-info">
              <h3>{posts.length}</h3>
              <p>Total Perspectives</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon green">
              <i className="fas fa-check-circle"></i>
            </div>
            <div className="stat-info">
              <h3>{posts.filter(p => p.isPublished).length}</h3>
              <p>Published</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon orange">
              <i className="fas fa-edit"></i>
            </div>
            <div className="stat-info">
              <h3>{posts.filter(p => !p.isPublished).length}</h3>
              <p>Drafts</p>
            </div>
          </div>
        </div>

        {/* Recent Perspectives Table */}
        <div className="posts-section">
          <div className="section-header">
            <h2>Recent Perspectives</h2>
            <Link to="/admin/posts" className="view-all-link">
              View All <i className="fas fa-arrow-right"></i>
            </Link>
          </div>

          <div className="posts-table-wrapper">
            <table className="posts-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.slice(0, 5).map(post => (
                  <tr key={post.id}>
                    <td>
                      <div className="post-title-cell">
                        <img src={post.imageUrl} alt={post.title} />
                        <span>{post.title}</span>
                      </div>
                    </td>
                    <td>
                      <span className="category-badge">{post.category}</span>
                    </td>
                    <td>
                      <span className={`status-badge ${post.isPublished ? 'published' : 'draft'}`}>
                        {post.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td>{formatDate(post.createdAt)}</td>
                    <td>
                      <div className="action-buttons">
                        <Link 
                          to={`/admin/posts/${post.id}/edit`} 
                          className="btn-action edit"
                          title="Edit"
                        >
                          <i className="fas fa-edit"></i>
                        </Link>
                        <a 
                          href={`/blog/${post.slug}`} 
                          target="_blank"
                          className="btn-action view"
                          title="View"
                        >
                          <i className="fas fa-eye"></i>
                        </a>
                        {deleteConfirm === post.id ? (
                          <div className="delete-confirm">
                            <button 
                              onClick={() => handleDelete(post.id)}
                              className="btn-action delete confirm"
                              title="Confirm Delete"
                            >
                              <i className="fas fa-check"></i>
                            </button>
                            <button 
                              onClick={() => setDeleteConfirm(null)}
                              className="btn-action cancel"
                              title="Cancel"
                            >
                              <i className="fas fa-times"></i>
                            </button>
                          </div>
                        ) : (
                          <button 
                            onClick={() => setDeleteConfirm(post.id)}
                            className="btn-action delete"
                            title="Delete"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {posts.length === 0 && (
              <div className="no-posts">
                <i className="fas fa-inbox"></i>
                <p>No posts yet. Create your first post!</p>
                <Link to="/admin/posts/new" className="btn-new-post">
                  <i className="fas fa-plus"></i>
                  Create Post
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
