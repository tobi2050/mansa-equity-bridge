
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
    const fetchSessionAndProfile = async () => {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) {
        console.error("Error getting session:", sessionError);
        setIsLoading(false);
        return;
      }

      setSession(session);

      if (session?.user) {
        const { data: userProfile, error: profileError } = await supabase
          .from('profiles')
          .select('id, role, full_name, default_contribution_mode, email_verified, phone_verified, identity_verified, business_verified, trust_score')
          .eq('id', session.user.id)
          .single();

        if (profileError && profileError.code !== 'PGRST116') {
          console.error('Error fetching profile on initial load:', profileError);
        } else {
          setProfile(userProfile as UserProfile | null);
        }
      }
      setIsLoading(false);
    };

    fetchSessionAndProfile();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      
      if (_event === 'SIGNED_OUT') {
        setProfile(null);
      } else if (session?.user && session.user.id !== profile?.id) {
        setIsLoading(true);
        const { data: userProfile, error: profileError } = await supabase
          .from('profiles')
          .select('id, role, full_name, default_contribution_mode, email_verified, phone_verified, identity_verified, business_verified, trust_score')
          .eq('id', session.user.id)
          .single();

        if (profileError && profileError.code !== 'PGRST116') {
          console.error('Error fetching profile on auth state change:', profileError);
        } else {
          setProfile(userProfile as UserProfile | null);
        }
        setIsLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [profile?.id]);

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
      {!isLoading && children}
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
