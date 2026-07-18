import { describe, it, expect } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { LanguageProvider, useLanguage } from '../context/LanguageContext';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { RouterProvider, useRouter } from '../context/RouterContext';
import { StadiumStateProvider, useStadiumState } from '../context/StadiumStateContext';

describe('LanguageContext', () => {
  const TestComponent = () => {
    const { language, setLanguage, t } = useLanguage();
    return (
      <div>
        <span data-testid="lang">{language}</span>
        <span data-testid="label">{t('dashboard')}</span>
        <button onClick={() => setLanguage('es')}>Change</button>
      </div>
    );
  };

  it('provides active language and translations', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );
    expect(screen.getByTestId('lang')).toHaveTextContent('en');
    expect(screen.getByTestId('label')).toHaveTextContent('Dashboard');
    
    act(() => {
      screen.getByText('Change').click();
    });
    
    expect(screen.getByTestId('lang')).toHaveTextContent('es');
    expect(screen.getByTestId('label')).toHaveTextContent('Panel de Control');
  });
});

describe('AuthContext', () => {
  const TestComponent = () => {
    const { user, bypassLogin, logout } = useAuth();
    return (
      <div>
        <span data-testid="username">{user ? user.displayName : 'Guest'}</span>
        <span data-testid="role">{user ? user.role : 'None'}</span>
        <button onClick={() => bypassLogin('admin')}>Admin Bypass</button>
        <button onClick={logout}>Logout</button>
      </div>
    );
  };

  it('simulates login bypass and signout', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    expect(screen.getByTestId('username')).toHaveTextContent('Guest');

    act(() => {
      screen.getByText('Admin Bypass').click();
    });

    expect(screen.getByTestId('username')).toHaveTextContent('Security Director');
    expect(screen.getByTestId('role')).toHaveTextContent('admin');

    act(() => {
      screen.getByText('Logout').click();
    });

    expect(screen.getByTestId('username')).toHaveTextContent('Guest');
  });
});

describe('RouterContext', () => {
  const TestComponent = () => {
    const { path, navigate } = useRouter();
    return (
      <div>
        <span data-testid="path">{path}</span>
        <button onClick={() => navigate('/dashboard')}>Go</button>
      </div>
    );
  };

  it('updates path on navigation', () => {
    render(
      <RouterProvider>
        <TestComponent />
      </RouterProvider>
    );
    expect(screen.getByTestId('path')).toHaveTextContent('/landing');

    act(() => {
      screen.getByText('Go').click();
    });

    expect(screen.getByTestId('path')).toHaveTextContent('/dashboard');
    expect(window.location.hash).toBe('#/dashboard');
  });
});

describe('StadiumStateContext', () => {
  const TestComponent = () => {
    const { matchDetails, incrementMatchScore, evacuationActive, setEvacuationActive } = useStadiumState();
    return (
      <div>
        <span data-testid="score">{matchDetails.homeScore} - {matchDetails.awayScore}</span>
        <span data-testid="evac">{evacuationActive ? 'active' : 'inactive'}</span>
        <button onClick={() => incrementMatchScore('home')}>Goal</button>
        <button onClick={() => setEvacuationActive(true)}>Evacuate</button>
      </div>
    );
  };

  it('handles score changes and evacuation triggers', () => {
    render(
      <StadiumStateProvider>
        <TestComponent />
      </StadiumStateProvider>
    );
    expect(screen.getByTestId('score')).toHaveTextContent('1 - 0');
    expect(screen.getByTestId('evac')).toHaveTextContent('inactive');

    act(() => {
      screen.getByText('Goal').click();
    });
    expect(screen.getByTestId('score')).toHaveTextContent('2 - 0');

    act(() => {
      screen.getByText('Evacuate').click();
    });
    expect(screen.getByTestId('evac')).toHaveTextContent('active');
  });
});