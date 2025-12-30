import { createContext, useContext, useState, useEffect, useCallback, ReactNode, FC } from 'react';

interface AdminContextType {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const ADMIN_PASSWORD = 'agl@admin2024'; // In production, use proper authentication
const AUTH_KEY = 'agl_admin_auth';

interface AdminProviderProps {
  children: ReactNode;
}

export const AdminProvider: FC<AdminProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem(AUTH_KEY);
      return saved === 'true';
    }
    return false;
  });

  useEffect(() => {
    sessionStorage.setItem(AUTH_KEY, isAuthenticated.toString());
  }, [isAuthenticated]);

  const login = useCallback((password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    sessionStorage.removeItem(AUTH_KEY);
  }, []);

  const value: AdminContextType = {
    isAuthenticated,
    login,
    logout,
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
