import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    headers: {
      // Opera-optimized CSP headers for development
      'Content-Security-Policy': "default-src 'self'; script-src 'self' 'nonce-opera-secure-2024' https://cdn.jsdelivr.net https://unpkg.com https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: blob:; connect-src 'self' https://*.supabase.co wss://*.supabase.co https://api.pexels.com ws://localhost:* http://localhost:*; object-src 'none'; base-uri 'self';"
    }
  },
  build: {
    // Opera-specific build optimizations
    target: 'es2020',
    rollupOptions: {
      output: {
        // Optimize for Opera's JavaScript engine
        manualChunks: {
          'opera-compat': ['./src/utils/operaCompat.ts'],
          'vendor': ['react', 'react-dom']
        }
      }
    }
  }
});