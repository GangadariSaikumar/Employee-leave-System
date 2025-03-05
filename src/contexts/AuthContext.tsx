
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  name?: string;
  email?: string;
  isLoggedIn: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (userData: Omit<User, 'isLoggedIn'>) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    // Check if user is logged in on component mount
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);
  
  const login = (userData: Omit<User, 'isLoggedIn'>) => {
    const newUser = { ...userData, isLoggedIn: true };
    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
  };
  
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };
  
  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAuthenticated: !!user?.isLoggedIn 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
