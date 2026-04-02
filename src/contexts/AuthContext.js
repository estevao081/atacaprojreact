import { createContext, useContext, useState, useCallback, useMemo } from 'react';

const AuthContext = createContext(null);

const ADMIN_CREDENTIALS = {
  email: 'admin@marketplace.com',
  password: 'admin123',
};

function loadUser() {
  try {
    const saved = localStorage.getItem('currentUser');
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(loadUser);
  const [loading, setLoading] = useState(false);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);

    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      const u = { id: 'admin-1', email, name: 'Administrador', role: 'admin' };
      localStorage.setItem('currentUser', JSON.stringify(u));
      setUser(u);
      return u;
    }
    throw new Error('Credenciais inválidas');
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('currentUser');
    setUser(null);
  }, []);

  const isAdmin = user?.role === 'admin';
  const isAuthenticated = !!user;

  const value = useMemo(
    () => ({ user, loading, login, logout, isAdmin, isAuthenticated }),
    [user, loading, login, logout, isAdmin, isAuthenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
