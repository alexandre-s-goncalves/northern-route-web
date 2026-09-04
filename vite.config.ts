import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ mode }) => {
  const isQa = mode === 'qa' || mode === 'staging';
  const baseFolder = isQa ? '/northern-route-web/qas/' : '/northern-route-web/';

  return {
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
  };
});
