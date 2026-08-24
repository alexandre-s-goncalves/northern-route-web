/// <reference types="node" />
import { defineConfig, devices } from '@playwright/test';

const isCI = typeof process !== 'undefined' && !!process.env.CI;

export default defineConfig({
  expect: {
    timeout: 5000,
  },
  forbidOnly: isCI,
  fullyParallel: true,
  outputDir: './e2e-results',
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  reporter: 'list',
  retries: isCI ? 2 : 0,
  testDir: './e2e',
  testMatch: '**/*.e2e.ts',
  timeout: 30000,
  use: {
    baseURL: 'http://localhost:5173/northern-route-web/',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'npm run dev',
    reuseExistingServer: !isCI,
    url: 'http://localhost:5173/northern-route-web/',
  },
});
