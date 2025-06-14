import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  resolve: {
    // Ensure Vite itself knows how to resolve `@/...` imports
    alias: [{ find: '@', replacement: path.resolve(__dirname, './src') }],
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
