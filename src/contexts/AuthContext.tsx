
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthState {
  isAuthenticated: boolean;
  userRole: 'investor' | 'entrepreneur' | 'philanthropist' | null;
  userId: string | null;
  sessionToken: string | null;
  lastActivity: number;
}

interface AuthContextType {
  authState: AuthState;
  login: (role: 'investor' | 'entrepreneur' | 'philanthropist', userId?: string) => void;
  logout: () => void;
  updateActivity: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const SESSION_TIMEOUT = 24 * 60 * 60 * 1000; // 24 hours
const STORAGE_KEY = 'mansa_auth_session';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    userRole: null,
    userId: null,
    sessionToken: null,
    lastActivity: Date.now()
  });

  // Load session from localStorage on app start
  useEffect(() => {
    const savedSession = localStorage.getItem(STORAGE_KEY);
    if (savedSession) {
      try {
        const session: AuthState = JSON.parse(savedSession);
        const isExpired = Date.now() - session.lastActivity > SESSION_TIMEOUT;
        
        if (!isExpired && session.isAuthenticated) {
          setAuthState({
            ...session,
            lastActivity: Date.now()
          });
        } else {
          localStorage.removeItem(STORAGE_KEY);
        }
      } catch (error) {
        console.error('Failed to parse saved session:', error);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  // Save session to localStorage whenever authState changes
  useEffect(() => {
    if (authState.isAuthenticated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(authState));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [authState]);

  const login = (role: 'investor' | 'entrepreneur' | 'philanthropist', userId = 'demo-user') => {
    const newAuthState: AuthState = {
      isAuthenticated: true,
      userRole: role,
      userId,
      sessionToken: `token_${Date.now()}_${Math.random()}`,
      lastActivity: Date.now()
    };
    setAuthState(newAuthState);
  };

  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      userRole: null,
      userId: null,
      sessionToken: null,
      lastActivity: Date.now()
    });
  };

  const updateActivity = () => {
    if (authState.isAuthenticated) {
      setAuthState(prev => ({
        ...prev,
        lastActivity: Date.now()
      }));
    }
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout, updateActivity }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
