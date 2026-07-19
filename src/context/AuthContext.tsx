import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as firebaseSignOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth, firebaseEnabled } from '../services/firebase';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: 'fan' | 'admin' | 'staff';
  photoURL?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, role?: 'fan' | 'admin' | 'staff') => Promise<void>;
  logout: () => Promise<void>;
  bypassLogin: (role: 'fan' | 'admin' | 'staff') => void;
  isFirebase: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!firebaseEnabled) {
      const savedUser = localStorage.getItem('stadiummind_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth!, (fbUser: unknown) => {
      const u = fbUser as {
        uid: string;
        email: string | null;
        displayName: string | null;
        photoURL: string | null;
      } | null;

      if (u) {
        const role = u.email?.includes('admin') ? 'admin' : 
                     u.email?.includes('staff') ? 'staff' : 'fan';
        
        setUser({
          uid: u.uid,
          email: u.email || '',
          displayName: u.displayName || 'World Cup Fan',
          role: role,
          photoURL: u.photoURL || undefined
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      if (firebaseEnabled) {
        await signInWithEmailAndPassword(auth!, email, password);
      } else {
        const role = email.includes('admin') ? 'admin' : 
                     email.includes('staff') ? 'staff' : 'fan';
        const mockUser: UserProfile = {
          uid: `mock-${Date.now()}`,
          email,
          displayName: email.split('@')[0].toUpperCase(),
          role
        };
        setUser(mockUser);
        localStorage.setItem('stadiummind_user', JSON.stringify(mockUser));
      }
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string, role: 'fan' | 'admin' | 'staff' = 'fan') => {
    setLoading(true);
    try {
      if (firebaseEnabled) {
        await createUserWithEmailAndPassword(auth!, email, password);
      } else {
        const mockUser: UserProfile = {
          uid: `mock-${Date.now()}`,
          email,
          displayName: name,
          role
        };
        setUser(mockUser);
        localStorage.setItem('stadiummind_user', JSON.stringify(mockUser));
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      if (firebaseEnabled) {
        await firebaseSignOut(auth!);
      } else {
        setUser(null);
        localStorage.removeItem('stadiummind_user');
      }
    } finally {
      setLoading(false);
    }
  };

  const bypassLogin = (role: 'fan' | 'admin' | 'staff') => {
    const names = { fan: 'Diego Maradona', admin: 'Security Director', staff: 'Medic Coordinator' };
    const emails = { fan: 'fan@stadiummind.ai', admin: 'admin@stadiummind.ai', staff: 'staff@stadiummind.ai' };
    
    const mockUser: UserProfile = {
      uid: `bypass-${role}`,
      email: emails[role],
      displayName: names[role],
      role
    };
    setUser(mockUser);
    localStorage.setItem('stadiummind_user', JSON.stringify(mockUser));
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      register,
      logout,
      bypassLogin,
      isFirebase: firebaseEnabled
    }}>
      {!loading && children}
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