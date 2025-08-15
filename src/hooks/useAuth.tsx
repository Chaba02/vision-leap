import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  isAdmin: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if admin is already logged in (from localStorage)
    const adminEmail = localStorage.getItem('admin_email');
    if (adminEmail) {
      setIsAdmin(true);
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      // Simple check against admin table
      const { data, error } = await supabase
        .from('admin')
        .select('*')
        .eq('email', email)
        .eq('password', password)
        .maybeSingle();

      if (error) {
        return { error: { message: 'Errore durante il login' } };
      }

      if (!data) {
        return { error: { message: 'Credenziali non valide' } };
      }

      // Login successful
      localStorage.setItem('admin_email', email);
      setIsAdmin(true);
      return { error: null };
    } catch (err) {
      return { error: { message: 'Errore di connessione' } };
    }
  };

  const signOut = async () => {
    localStorage.removeItem('admin_email');
    setIsAdmin(false);
  };

  const value = {
    isAdmin,
    loading,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};