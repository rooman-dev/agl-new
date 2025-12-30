import { useState, FormEvent, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '@/context/AdminContext';
import './AdminLogin.css';

const AdminLogin: FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAdmin();
  const navigate = useNavigate();

  // Redirect if already authenticated
  if (isAuthenticated) {
    navigate('/admin/dashboard');
    return null;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    if (login(password)) {
      navigate('/admin/dashboard');
    } else {
      setError('Invalid password. Please try again.');
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
          <p>Enter your password to access the dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="admin-login-form">
          {error && (
            <div className="error-message">
              <i className="fas fa-exclamation-circle"></i>
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input-wrapper">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                required
                autoFocus
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
