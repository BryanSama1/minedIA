import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    proxy: {
      '/api/minedaiagente': {
        target: 'https://minedaiagente-127465468754.europe-west1.run.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/minedaiagente/, ''),
      },
      '/api/enlaces': {
        target: 'https://enlaces-127465468754.us-central1.run.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/enlaces/, ''),
      },
    },
  },
});