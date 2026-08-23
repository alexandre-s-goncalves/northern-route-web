import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
import { RouteErrorBoundary } from './routeErrorBoundary';

describe('RouteErrorBoundary', () => {
  let component: ReturnType<typeof render>;
  const originalLocation = window.location;

  beforeEach(() => {
    vi.stubGlobal('location', {
      ...originalLocation,
      reload: vi.fn(),
    });

    component = render(<RouteErrorBoundary />);
  });

  afterEach(() => {
    component.unmount();
    vi.restoreAllMocks();
  });

  describe('Rendering Scenarios', () => {
    test('WHEN initialization activates SHOULD mount fallback visual infrastructure layout components cleanly', () => {
      component.rerender(<RouteErrorBoundary />);

      expect(component.getByRole('heading', { level: 1 })).toBeInTheDocument();
      expect(
        component.getByRole('button', { name: /reload page/i }),
      ).toBeInTheDocument();
    });
  });

  describe('Behavioral Scenarios', () => {
    test('WHEN user triggers reloading interaction SHOULD execute native reload action parameters flawlessly', () => {
      component.rerender(<RouteErrorBoundary />);

      const reloadButton = component.getByRole('button', {
        name: /reload page/i,
      });
      fireEvent.click(reloadButton);

      expect(window.location.reload).toHaveBeenCalledTimes(1);
    });
  });
});
