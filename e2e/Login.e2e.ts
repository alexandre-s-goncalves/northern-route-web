import { test, expect } from '@playwright/test';

test.describe('Login E2E Dashboard Terminal', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('login');
  });

  test.describe('Behavioral Scenarios', () => {
    test('WHEN form is submitted and credentials are invalid SHOULD display exact API error message content within container', async ({
      page,
    }) => {
      await page.route(
        () => true,
        async route => {
          if (route.request().method() === 'POST') {
            await route.fulfill({
              body: JSON.stringify({
                errorMessage: 'Invalid credentials.',
                isSuccess: false,
              }),
              contentType: 'application/json',
              status: 400,
            });
          } else {
            await route.continue();
          }
        },
      );

      const emailWrapper = page.getByTestId('input-email');
      const passwordWrapper = page.getByTestId('input-password');
      const loginButton = page.getByTestId('button-login');

      const emailInput = emailWrapper.locator('input');
      const passwordInput = passwordWrapper.locator('input');

      await emailInput.fill('wrong@northernroute.com');
      await passwordInput.fill('invalidpassword');
      await loginButton.click();

      await expect(page.getByText('Invalid credentials.')).toBeVisible();
    });

    test('WHEN form is submitted and credentials are valid SHOULD invoke authorization endpoints and navigate to home screen dashboard', async ({
      page,
    }) => {
      await page.route(
        () => true,
        async route => {
          if (route.request().method() === 'POST') {
            await route.fulfill({
              body: JSON.stringify({
                data: {
                  email: 'driver@northernroute.com',
                  name: 'Northern Driver',
                  role: 'driver',
                  token: 'mock-valid-jwt-token-string',
                  userId: 'mock-user-uuid-123',
                },
                errorMessage: null,
                isSuccess: true,
              }),
              contentType: 'application/json',
              status: 200,
            });
          } else {
            await route.continue();
          }
        },
      );

      const emailWrapper = page.getByTestId('input-email');
      const passwordWrapper = page.getByTestId('input-password');
      const loginButton = page.getByTestId('button-login');

      const emailInput = emailWrapper.locator('input');
      const passwordInput = passwordWrapper.locator('input');

      await emailInput.fill('driver@northernroute.com');
      await passwordInput.fill('securepassword123');
      await loginButton.click();

      await expect(
        page.getByText('NorthernRoute Logistics - Home Dashboard'),
      ).toBeVisible();
      await page.waitForURL('**/');
    });

    test('WHEN password visibility toggle action triggers SHOULD mutate password input type field attributes natively', async ({
      page,
    }) => {
      const passwordWrapper = page.getByTestId('input-password');
      const passwordInput = passwordWrapper.locator('input');
      const toggleButton = passwordWrapper.locator('button');

      await expect(passwordInput).toHaveAttribute('type', 'password');

      await toggleButton.click();
      await expect(passwordInput).toHaveAttribute('type', 'text');

      await toggleButton.click();
      await expect(passwordInput).toHaveAttribute('type', 'password');
    });
  });

  test.describe('Rendering Scenarios', () => {
    test('WHEN initialization activates SHOULD mount structural layout and core operation credential fields cleanly', async ({
      page,
    }) => {
      await expect(page.getByText('Welcome')).toBeVisible();
      await expect(page.getByTestId('input-email')).toBeVisible();
      await expect(page.getByTestId('input-password')).toBeVisible();
      await expect(page.getByTestId('button-login')).toBeVisible();
      await expect(page.getByText('Forgot Password?')).toBeVisible();
    });
  });
});
