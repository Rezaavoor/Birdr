import { defineConfig } from 'vite';
import reactJsxPlugin from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    reactJsxPlugin(),
  ],
  server: {
    port: 8080,
  },
  build: {
    chunkSizeWarningLimit: 2000, // Set to a value that suits your project
  },
});