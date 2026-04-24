import { createContext, useContext, useEffect, useState, type PropsWithChildren } from 'react';
import type { Session, User } from '@supabase/supabase-js';

import { isSupabaseConfigured, supabase } from '../lib/supabase';

type AuthContextValue = {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  isConfigured: boolean;
  signIn: (email: string, password: string) => Promise<string | null>;
  signUp: (email: string, password: string) => Promise<string | null>;
  signOut: () => Promise<string | null>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function getFriendlyAuthErrorMessage(message: string) {
  const normalized = message.toLowerCase();

  if (normalized.includes('invalid login credentials')) {
    return 'Email veya sifre hatali.';
  }

  if (normalized.includes('email not confirmed')) {
    return 'Devam etmeden once email adresinizi dogrulayin.';
  }

  if (normalized.includes('user already registered')) {
    return 'Bu email adresiyle zaten bir hesap bulunuyor.';
  }

  if (normalized.includes('password should be at least')) {
    return 'Sifre en az 6 karakter olmali.';
  }

  if (normalized.includes('signup is disabled')) {
    return 'Kayit islemi su anda kullanilamiyor.';
  }

  if (normalized.includes('invalid email')) {
    return 'Gecerli bir email adresi girin.';
  }

  if (normalized.includes('network') || normalized.includes('fetch')) {
    return 'Baglanti hatasi olustu. Internet baglantinizi kontrol edin.';
  }

  return 'Islem tamamlanamadi. Lutfen tekrar deneyin.';
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (!isMounted) {
          return;
        }

        setSession(data.session ?? null);
        setIsLoading(false);
      })
      .catch(() => {
        if (!isMounted) {
          return;
        }

        setSession(null);
        setIsLoading(false);
      });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setIsLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    if (!supabase) {
      return 'Supabase ayarlari eksik.';
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    return error ? getFriendlyAuthErrorMessage(error.message) : null;
  };

  const signUp = async (email: string, password: string) => {
    if (!supabase) {
      return 'Supabase ayarlari eksik.';
    }

    const { error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
    });

    return error ? getFriendlyAuthErrorMessage(error.message) : null;
  };

  const signOut = async () => {
    if (!supabase) {
      return 'Supabase ayarlari eksik.';
    }

    const { error } = await supabase.auth.signOut();

    return error ? getFriendlyAuthErrorMessage(error.message) : null;
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user: session?.user ?? null,
        isLoading,
        isConfigured: isSupabaseConfigured,
        signIn,
        signUp,
        signOut,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}
