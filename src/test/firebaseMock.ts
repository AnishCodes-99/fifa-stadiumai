import { vi } from 'vitest';

export const initializeApp = vi.fn();
export const getApps = vi.fn(() => []);
export const getApp = vi.fn();

export const getAuth = vi.fn(() => ({
  currentUser: null,
  onAuthStateChanged: vi.fn((cb) => {
    cb(null);
    return vi.fn();
  }),
}));

export const getFirestore = vi.fn();
export const collection = vi.fn();
export const doc = vi.fn();
export const setDoc = vi.fn();
export const onSnapshot = vi.fn(() => vi.fn());

export const getStorage = vi.fn();
export const getFunctions = vi.fn();