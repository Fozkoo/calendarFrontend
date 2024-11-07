import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  userId: string | null;
  login: (userId: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<string | null>(sessionStorage.getItem('userId'));

  const login = (userId: string) => {
    setUserId(userId);
    sessionStorage.setItem('userId', userId); 
  };

  const logout = () => {
    setUserId(null);
    sessionStorage.removeItem('userId');
  };

  return (
    <AuthContext.Provider value={{ userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
