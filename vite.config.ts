import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.GUION_ENDPOINT': JSON.stringify(process.env.GUION_ENDPOINT),
    'process.env.PRESENTACION_ENDPOINT': JSON.stringify(process.env.PRESENTACION_ENDPOINT),
    'process.env.ENLACES_ENDPOINT': JSON.stringify(process.env.ENLACES_ENDPOINT),
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});