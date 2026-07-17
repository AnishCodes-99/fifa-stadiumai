import React, { useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { StadiumStateProvider } from './context/StadiumStateContext';
import { RouterProvider, useRouter } from './context/RouterContext';
import { LanguageProvider } from './context/LanguageContext';
import { LandingPage } from './components/Landing/LandingPage';
import { LoginPage } from './components/Auth/LoginPage';
import { Layout } from './components/Shared/Layout';
import { SmartDashboard } from './components/Dashboard/SmartDashboard';
import { StadiumMap } from './components/Map/StadiumMap';
import { AIAssistant } from './components/AI/AIAssistant';
import { SustainabilityDashboard } from './components/Sustainability/SustainabilityDashboard';
import { CommandCenter } from './components/CommandCenter/CommandCenter';
import { AdminPanel } from './components/Admin/AdminPanel';

const AppContent: React.FC = () => {
  const { path, navigate } = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    const publicPaths = ['/landing', '/login'];
    const isPublic = publicPaths.includes(path);

    if (!user && !isPublic) {
      navigate('/landing');
    } else if (user && path === '/login') {
      navigate('/dashboard');
    } else if (user) {
      if (path === '/admin' && user.role !== 'admin') {
        navigate('/dashboard');
      } else if (path === '/command-center' && user.role === 'fan') {
        navigate('/dashboard');
      }
    }
  }, [path, user, navigate]);

  const renderRoute = () => {
    switch (path) {
      case '/landing':
        return <LandingPage />;
      case '/login':
        return <LoginPage />;
      
      case '/dashboard':
        return (
          <Layout>
            <SmartDashboard />
          </Layout>
        );
      case '/map':
        return (
          <Layout>
            <StadiumMap />
          </Layout>
        );
      case '/ai':
        return (
          <Layout>
            <AIAssistant />
          </Layout>
        );
      case '/sustainability':
        return (
          <Layout>
            <SustainabilityDashboard />
          </Layout>
        );
      case '/command-center':
        return (
          <Layout>
            <CommandCenter />
          </Layout>
        );
      case '/admin':
        return (
          <Layout>
            <AdminPanel />
          </Layout>
        );
      
      default:
        return <LandingPage />;
    }
  };

  return <>{renderRoute()}</>;
};

function App() {
  return (
    <RouterProvider>
      <LanguageProvider>
        <AuthProvider>
          <StadiumStateProvider>
            <AppContent />
          </StadiumStateProvider>
        </AuthProvider>
      </LanguageProvider>
    </RouterProvider>
  );
}

export default App;
