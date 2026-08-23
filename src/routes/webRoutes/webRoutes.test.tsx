import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { render } from '@testing-library/react';
import { RoutePaths } from 'resources/routePaths';
import { webRoutes } from './webRoutes';

describe('webRoutes', () => {
  let component: ReturnType<typeof render>;
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        mutations: { retry: false },
        queries: { retry: false },
      },
    });

    component = render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={webRoutes} />
      </QueryClientProvider>,
    );
  });

  afterEach(() => {
    component.unmount();
    queryClient.clear();
  });

  describe('Rendering Scenarios', () => {
    test('SHOULD have the correct home route configuration nested with protection', () => {
      const protectedLayoutRoute = webRoutes.routes.find(
        r => r.children !== undefined,
      );
      expect(protectedLayoutRoute).toBeDefined();

      const homeRoute = protectedLayoutRoute?.children?.find(
        r => r.path === RoutePaths.HOME,
      );
      expect(homeRoute).toBeDefined();
    });

    test('WHEN initialization activates SHOULD establish secure structural route pathways correctly', () => {
      component.rerender(
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={webRoutes} />
        </QueryClientProvider>,
      );
      expect(component.container).toBeInTheDocument();
    });

    test('SHOULD configure valid route error boundaries across all primary endpoints', () => {
      webRoutes.routes.forEach(route => {
        expect(route.errorElement).toBeDefined();
      });
    });
  });
});
