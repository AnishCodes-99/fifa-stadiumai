import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock Firebase Modules
vi.mock('firebase/app', () => ({
  initializeApp: vi.fn(),
  getApps: vi.fn(() => []),
  getApp: vi.fn(),
}));

vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(() => ({
    currentUser: null,
    onAuthStateChanged: vi.fn((cb) => {
      cb(null);
      return vi.fn();
    }),
  })),
}));

vi.mock('firebase/firestore', () => ({
  getFirestore: vi.fn(),
  collection: vi.fn(),
  doc: vi.fn(),
  setDoc: vi.fn(),
  onSnapshot: vi.fn(() => vi.fn()),
}));

vi.mock('firebase/storage', () => ({
  getStorage: vi.fn(),
}));

vi.mock('firebase/functions', () => ({
  getFunctions: vi.fn(),
}));

// Mock window.speechSynthesis
Object.defineProperty(window, 'speechSynthesis', {
  value: {
    speak: vi.fn(),
    cancel: vi.fn(),
    speakSynthesis: vi.fn()
  },
  writable: true
});

// Mock window.SpeechSynthesisUtterance
Object.defineProperty(window, 'SpeechSynthesisUtterance', {
  value: vi.fn().mockImplementation((text) => ({
    text,
    lang: 'en-US',
    voice: null,
    volume: 1,
    rate: 1,
    pitch: 1,
    onstart: null,
    onend: null,
    onerror: null,
  })),
  writable: true
});

// Mock IntersectionObserver
class MockIntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin: string = '';
  readonly thresholds: ReadonlyArray<number> = [];
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn().mockReturnValue([]);
}
Object.defineProperty(window, 'IntersectionObserver', {
  value: MockIntersectionObserver,
  writable: true
});

// Mock Element.prototype.scrollIntoView
Element.prototype.scrollIntoView = vi.fn();

// Mock Recharts ResponsiveContainer to render immediately in jsdom
vi.mock('recharts', async (importOriginal) => {
  const original = await importOriginal<any>();
  return {
    ...original,
    ResponsiveContainer: ({ children }: any) => {
      if (typeof children === 'function') {
        return children({ width: 800, height: 600 });
      }
      return <div style={{ width: 800, height: 600 }}>{children}</div>;
    }
  };
});

// Mock React-Leaflet to avoid Leaflet rendering layout issues in jsdom
vi.mock('react-leaflet', () => ({
  MapContainer: ({ children }: any) => <div data-testid="mock-map-container">{children}</div>,
  TileLayer: () => <div data-testid="mock-tile-layer" />,
  Marker: ({ children, position }: any) => (
    <div data-testid="mock-marker" data-position={JSON.stringify(position)}>
      {children}
    </div>
  ),
  Popup: ({ children }: any) => <div data-testid="mock-popup">{children}</div>,
  Polyline: ({ positions }: any) => <div data-testid="mock-polyline" data-positions={JSON.stringify(positions)} />,
  useMap: () => ({
    setView: vi.fn(),
  }),
}));

// Mock Leaflet L object
vi.mock('leaflet', () => ({
  default: {
    divIcon: vi.fn().mockReturnValue({}),
  },
  divIcon: vi.fn().mockReturnValue({}),
}));