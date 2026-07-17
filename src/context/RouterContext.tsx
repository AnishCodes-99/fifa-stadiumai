import React, { createContext, useContext, useState, useEffect } from 'react';

interface RouterContextType {
  path: string;
  navigate: (to: string) => void;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

export const RouterProvider = ({ children }: { children: React.ReactNode }) => {
  const [path, setPath] = useState<string>(() => {
    const hash = window.location.hash;
    return hash ? hash.slice(1) : '/landing';
  });

  const navigate = (to: string) => {
    window.location.hash = to;
    setPath(to);
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      setPath(hash ? hash.slice(1) : '/landing');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <RouterContext.Provider value={{ path, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = () => {
  const context = useContext(RouterContext);
  if (context === undefined) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
};
