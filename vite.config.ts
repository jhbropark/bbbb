import { execFileSync } from 'node:child_process';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'generate-localized-static-routes',
      closeBundle() {
        execFileSync(process.execPath, ['scripts/generate-static.mjs'], { stdio: 'inherit' });
      },
    },
  ],
  server: {
    host: true,
  },
});
