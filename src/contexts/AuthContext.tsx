
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthState {
  isAuthenticated: boolean;
  userRole: 'investor' | 'entrepreneur' | 'philanthropist' | null;
  userId: string | null;
}

interface AuthContextType {
  authState: AuthState;
  login: (role: 'investor' | 'entrepreneur' | 'philanthropist') => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    userRole: null,
    userId: null
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on app load
    const savedAuth = localStorage.getItem('mansaAuth');
    if (savedAuth) {
      try {
        const parsedAuth = JSON.parse(savedAuth);
        setAuthState(parsedAuth);
      } catch (error) {
        console.error('Error parsing saved auth:', error);
        localStorage.removeItem('mansaAuth');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (role: 'investor' | 'entrepreneur' | 'philanthropist') => {
    const newAuthState = {
      isAuthenticated: true,
      userRole: role,
      userId: `${role}_${Date.now()}` // Simple ID for prototype
    };
    
    setAuthState(newAuthState);
    localStorage.setItem('mansaAuth', JSON.stringify(newAuthState));
  };

  const logout = () => {
    const newAuthState = {
      isAuthenticated: false,
      userRole: null,
      userId: null
    };
    
    setAuthState(newAuthState);
    localStorage.removeItem('mansaAuth');
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout, isLoading }}>
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
