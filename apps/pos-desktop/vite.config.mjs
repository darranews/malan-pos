// apps/pos-desktop/vite.config.ts hoặc vite.config.mjs

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react()],
  root: '.',                     // <- Dấu , ở đây nè
  server: { port: 5173 },        // <- Dấu , ở đây nè
  resolve: {
    alias: {
      '@core': fileURLToPath(new URL('../../packages/core/src', import.meta.url)),
      '@ui': fileURLToPath(new URL('../../packages/ui/src', import.meta.url)),
      // alias khác nếu có...
    }
  }
});
