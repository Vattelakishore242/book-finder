// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,         // allow dev server to be accessed externally
    port: 5173,         // default Vite port
    strictPort: false   // fallback if port is busy
  }
});
