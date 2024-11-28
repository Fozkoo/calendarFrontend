import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  userId: string | null;
  token: string | null;
  login: (userId: string, token: string) => void;
  logout: () => void;
  
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<string | null>(sessionStorage.getItem('userId'));
  const [token ,setToken] = useState<string | null>(sessionStorage.getItem('token'));

  const login = (userId: string, token: string) => {
    setUserId(userId);
    setToken(token);
    sessionStorage.setItem('userId', userId); 
    sessionStorage.setItem('token', token);
  };





  const logout = () => {
    setUserId(null);
    setToken(null);
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ userId, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
