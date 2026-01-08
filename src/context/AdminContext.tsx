import { createContext, useContext, useState, useEffect, useCallback, ReactNode, FC } from 'react';
import apiService from '../services/api';

interface AdminContextType {
  isAuthenticated: boolean;
  loading: boolean;
  user: { id: number; username: string } | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const TOKEN_KEY = 'agl_admin_token';

interface AdminProviderProps {
  children: ReactNode;
}

export const AdminProvider: FC<AdminProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<{ id: number; username: string } | null>(null);

  // Check for existing token on mount
  useEffect(() => {
    const verifyExistingToken = async () => {
      const token = sessionStorage.getItem(TOKEN_KEY);
      if (token) {
        try {
          const result = await apiService.verifyToken();
          if (result.valid) {
            setIsAuthenticated(true);
            setUser({ id: result.user.userId, username: result.user.username });
          } else {
            sessionStorage.removeItem(TOKEN_KEY);
          }
        } catch {
          sessionStorage.removeItem(TOKEN_KEY);
        }
      }
      setLoading(false);
    };

    verifyExistingToken();
  }, []);

  const login = useCallback(async (username: string, password: string): Promise<boolean> => {
    try {
      const result = await apiService.login(username, password);
      sessionStorage.setItem(TOKEN_KEY, result.token);
      setIsAuthenticated(true);
      setUser(result.user);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(TOKEN_KEY);
    setIsAuthenticated(false);
    setUser(null);
  }, []);

  const changePassword = useCallback(async (currentPassword: string, newPassword: string): Promise<void> => {
    await apiService.changePassword(currentPassword, newPassword);
  }, []);

  const value: AdminContextType = {
    isAuthenticated,
    loading,
    user,
    login,
    logout,
    changePassword,
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = (): AdminContextType => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export default AdminContext;
