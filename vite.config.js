// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,         // allow external access
    port: 5173,         // default Vite port
    strictPort: false,  // fallback if port is busy
    allowedHosts: ['book-finder-n9ch.onrender.com'] // specific host allowed
  }
});
