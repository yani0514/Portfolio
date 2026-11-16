import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const raw = process.env.VITE_BASE_PATH || env.VITE_BASE_PATH || '/';
  const base = `/${raw.split('/').filter(Boolean).join('/')}${raw === '/' ? '' : '/'}`;
  return {
    plugins: [react(), tailwindcss()],
    base,
    build: { target: 'es2022' },
    test: { environment: 'jsdom', setupFiles: ['./src/test/setup.ts'], css: false },
  };
});
