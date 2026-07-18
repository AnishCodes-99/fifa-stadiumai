/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'firebase/app': path.resolve(__dirname, './src/test/firebaseMock.ts'),
      'firebase/auth': path.resolve(__dirname, './src/test/firebaseMock.ts'),
      'firebase/firestore': path.resolve(__dirname, './src/test/firebaseMock.ts'),
      'firebase/storage': path.resolve(__dirname, './src/test/firebaseMock.ts'),
      'firebase/functions': path.resolve(__dirname, './src/test/firebaseMock.ts'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.tsx',
  },
});