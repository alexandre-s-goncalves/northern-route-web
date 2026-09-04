import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

const isQaBuild =
  process.env.NODE_ENV === 'qa' || process.env.NODE_ENV === 'staging';
const baseFolder = isQaBuild
  ? '/northern-route-web/qas/'
  : '/northern-route-web/';

export default defineConfig({
  base: baseFolder,
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: true,
        exportType: 'default',
      },
    }),
  ],
  resolve: {
    tsconfigPaths: true,
  },
  server: {
    port: 5173,
    open: true,
  },
});
