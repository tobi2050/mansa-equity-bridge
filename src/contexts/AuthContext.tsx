import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';

// Define the shape of the user profile from our 'profiles' table
interface UserProfile {
  id: string;
  role: 'investor' | 'entrepreneur';
  full_name: string;
  default_contribution_mode: 'investing' | 'donating' | 'supporting';
  email_verified: boolean;
  phone_verified: boolean;
  identity_verified: boolean;
  business_verified: boolean;
  trust_score: number;
}

interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: UserProfile | null;
  isLoading: boolean;
  logout: () => Promise<void>;
  // For backwards compatibility with components that expect authState
  authState: {
    isAuthenticated: boolean;
    userRole: 'investor' | 'entrepreneur' | null;
    userId: string | null;
  }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserAndProfile = async (session: Session | null) => {
      if (session?.user) {
        const { data: userProfile, error: profileError } = await supabase
          .from('profiles')
          .select('id, role, full_name, default_contribution_mode, email_verified, phone_verified, identity_verified, business_verified, trust_score')
          .eq('id', session.user.id)
          .single();

        if (profileError && profileError.code !== 'PGRST116') {
          console.error('Error fetching profile:', profileError);
          setProfile(null);
        } else {
          setProfile(userProfile as UserProfile | null);
        }
      } else {
        setProfile(null);
      }
      setIsLoading(false);
    };

    // Get initial session and profile
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      fetchUserAndProfile(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        // Defer profile fetching to avoid potential deadlocks
        setTimeout(() => {
          setIsLoading(true);
          fetchUserAndProfile(session);
        }, 0);
      } else if (event === 'SIGNED_OUT') {
        setProfile(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
  };

  const value: AuthContextType = {
    session,
    user: session?.user || null,
    profile,
    isLoading,
    logout,
    authState: {
      isAuthenticated: !!session,
      userRole: profile?.role || null,
      userId: session?.user?.id || null,
    },
  };

  return (
    <AuthContext.Provider value={value}>
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
