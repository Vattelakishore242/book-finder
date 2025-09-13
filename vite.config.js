import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,         // allow access from all hosts
    port: 5173,         // default Vite port
    strictPort: false,  // fallback if port is busy
    allowedHosts: 'all' // allow any host (Render, CodeSandbox, StackBlitz, etc.)
  }
});
