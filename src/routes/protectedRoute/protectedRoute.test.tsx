import { afterEach, describe, expect, test } from 'vitest';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { render } from '@testing-library/react';
import { ProtectedRoute } from './protectedRoute';

describe('ProtectedRoute', () => {
  let component: ReturnType<typeof render>;

  afterEach(() => {
    component.unmount();
    localStorage.clear();
  });

  describe('Rendering Scenarios', () => {
    test('WHEN authentication session token is active SHOULD render target child route context successfully', () => {
      localStorage.setItem(
        '@NorthernRoute:token',
        'mock-valid-jwt-token-string',
      );

      const routes = [
        {
          children: [
            {
              element: (
                <div data-testid="private-content">Dashboard Content</div>
              ),
              path: '/',
            },
          ],
          element: <ProtectedRoute />,
        },
      ];

      const router = createMemoryRouter(routes, { initialEntries: ['/'] });
      component = render(<RouterProvider router={router} />);

      expect(component.getByTestId('private-content')).toBeInTheDocument();
    });

    test('WHEN authentication session token is missing SHOULD intercept pipeline and redirect target user back to login boundary', () => {
      const routes = [
        {
          children: [
            {
              element: <div>Dashboard</div>,
              path: '/home',
            },
          ],
          element: <ProtectedRoute />,
        },
        {
          element: (
            <div data-testid="login-boundary">Login Terminal Screen</div>
          ),
          path: '/login',
        },
      ];

      const router = createMemoryRouter(routes, { initialEntries: ['/home'] });
      component = render(<RouterProvider router={router} />);

      expect(component.getByTestId('login-boundary')).toBeInTheDocument();
    });
  });
});
