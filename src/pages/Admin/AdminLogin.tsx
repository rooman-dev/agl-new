import { useState, FormEvent, FC } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAdmin } from '@/context/AdminContext';
import './AdminLogin.css';

const AdminLogin: FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated, loading } = useAdmin();
  const navigate = useNavigate();

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="admin-login-page">
        <div className="admin-login-container">
          <div className="admin-login-header">
            <i className="fas fa-spinner fa-spin"></i>
            <p>Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const success = await login(username, password);
    if (success) {
      navigate('/admin/dashboard');
    } else {
      setError('Invalid username or password. Please try again.');
    }
    setIsLoading(false);
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-container">
        <div className="admin-login-header">
          <div className="admin-logo">
            <i className="fas fa-shield-alt"></i>
          </div>
          <h1>Admin Panel</h1>
          <p>Enter your credentials to access the dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="admin-login-form">
          {error && (
            <div className="error-message">
              <i className="fas fa-exclamation-circle"></i>
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <div className="password-input-wrapper">
              <i className="fas fa-user"></i>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
                autoFocus
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input-wrapper">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="btn-admin-login"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                Authenticating...
              </>
            ) : (
              <>
                <i className="fas fa-sign-in-alt"></i>
                Login
              </>
            )}
          </button>
        </form>

        <div className="admin-login-footer">
          <a href="/" className="back-link">
            <i className="fas fa-arrow-left"></i>
            Back to Website
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
