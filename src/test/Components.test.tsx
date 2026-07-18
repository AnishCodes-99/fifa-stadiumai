import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, act, fireEvent } from '@testing-library/react';
import { LandingPage } from '../components/Landing/LandingPage';
import { SmartDashboard } from '../components/Dashboard/SmartDashboard';
import { AIAssistant } from '../components/AI/AIAssistant';
import { StadiumMap } from '../components/Map/StadiumMap';
import { CommandCenter } from '../components/CommandCenter/CommandCenter';
import { SustainabilityDashboard } from '../components/Sustainability/SustainabilityDashboard';
import { AdminPanel } from '../components/Admin/AdminPanel';
import { Layout } from '../components/Shared/Layout';
import { LanguageProvider } from '../context/LanguageContext';
import { AuthProvider } from '../context/AuthContext';
import { RouterProvider } from '../context/RouterContext';
import { StadiumStateProvider } from '../context/StadiumStateContext';

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <RouterProvider>
      <LanguageProvider>
        <AuthProvider>
          <StadiumStateProvider>
            {ui}
          </StadiumStateProvider>
        </AuthProvider>
      </LanguageProvider>
    </RouterProvider>
  );
};

describe('LandingPage', () => {
  it('renders landing page titles and widgets', () => {
    renderWithProviders(<LandingPage />);
    expect(screen.getAllByText(/StadiumMind/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Launch Dashboard/i).length).toBeGreaterThan(0);
    expect(screen.getByText('82.5K')).toBeInTheDocument();
  });
});

describe('SmartDashboard', () => {
  it('renders smart dashboard elements', () => {
    renderWithProviders(<SmartDashboard />);
    expect(screen.getByText('Smart Stadium Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Ingress Bottlenecks')).toBeInTheDocument();
    expect(screen.getByText('Weather & Conditions')).toBeInTheDocument();
  });
});

describe('AIAssistant', () => {
  it('sends messages and displays suggested FAQs', async () => {
    renderWithProviders(<AIAssistant />);
    expect(screen.getByText('StadiumMind Assistant')).toBeInTheDocument();
    
    // Choose FAQ trigger
    const faqBtn = screen.getByText(/Suggested FAQs Guide/i);
    expect(faqBtn).toBeInTheDocument();
    
    act(() => {
      faqBtn.click();
    });

    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();

    // Select an option
    act(() => {
      fireEvent.change(select, { target: { value: 'What World Cup match is playing today?' } });
    });

    // Check message sent
    expect(await screen.findByText('What World Cup match is playing today?')).toBeInTheDocument();
  });
});

describe('StadiumMap', () => {
  it('renders leaflet mock map container and markers', () => {
    renderWithProviders(<StadiumMap />);
    expect(screen.getByTestId('mock-map-container')).toBeInTheDocument();
    expect(screen.getByText('Select Stadium Landmark')).toBeInTheDocument();
  });
});

describe('CommandCenter', () => {
  it('renders camera streams and alarm dispatcher', () => {
    renderWithProviders(<CommandCenter />);
    expect(screen.getByText('Security Command Center')).toBeInTheDocument();
    expect(screen.getByText('Multi-Cam Threat Detection AI')).toBeInTheDocument();
    expect(screen.getByText('Report Local Alarm')).toBeInTheDocument();
  });
});

describe('SustainabilityDashboard', () => {
  it('renders eco score and fan challenges', () => {
    renderWithProviders(<SustainabilityDashboard />);
    expect(screen.getByText('Eco-Stadium Intelligence')).toBeInTheDocument();
    expect(screen.getByText('Your Eco Score')).toBeInTheDocument();
    expect(screen.getAllByText('Claim Eco-Points').length).toBeGreaterThan(0);
  });
});

describe('AdminPanel', () => {
  it('triggers evacuation and overrides match scores', () => {
    renderWithProviders(<AdminPanel />);
    expect(screen.getByText('Control Center')).toBeInTheDocument();
    expect(screen.getByText('Live Match Score Override')).toBeInTheDocument();
    
    const evacBtn = screen.getByText('Trigger Evacuation');
    expect(evacBtn).toBeInTheDocument();
    
    act(() => {
      evacBtn.click();
    });
    
    expect(screen.getByText('Stand Down Evacuation')).toBeInTheDocument();
  });
});

describe('Layout & Sidebar', () => {
  it('renders sidebar navigation links and developer card', () => {
    renderWithProviders(<Layout><div>Main Content</div></Layout>);
    expect(screen.getByText('Anish Wani')).toBeInTheDocument();
    expect(screen.getByTitle('YouTube')).toBeInTheDocument();
    expect(screen.getByTitle('Instagram')).toBeInTheDocument();
  });
});