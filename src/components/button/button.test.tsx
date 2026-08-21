import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  render,
  screen,
  fireEvent,
  type RenderResult,
} from '@testing-library/react';
import { Button } from './button';

describe('Button', () => {
  let component: RenderResult;
  const handleClick = vi.fn();

  beforeEach(() => {
    component = render(<Button>Default</Button>);
  });

  afterEach(() => {
    component.unmount();
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    test('WHEN rendering normal button SHOULD display text children nodes', () => {
      render(<Button>Sign In</Button>);
      expect(
        screen.getByRole('button', { name: /sign in/i }),
      ).toBeInTheDocument();
    });

    test('WHEN isLoading flag is active SHOULD NOT render children text content inside node', () => {
      render(<Button isLoading>Sign In</Button>);
      expect(screen.queryByText('Sign In')).not.toBeInTheDocument();
    });
  });

  describe('Behavioral', () => {
    test('WHEN user clicks interactive button SHOULD fire onClick method callback', () => {
      render(<Button onClick={handleClick}>Click Me</Button>);

      fireEvent.click(screen.getByRole('button', { name: /click me/i }));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test('WHEN isLoading is active SHOULD set disabled attribute to prevent execution', () => {
      component.unmount();
      const localComponent = render(
        <Button isLoading onClick={handleClick}>
          Click Me
        </Button>,
      );

      const button = localComponent.getByRole('button');
      expect(button).toBeDisabled();

      fireEvent.click(button);
      expect(handleClick).not.toHaveBeenCalled();

      localComponent.unmount();
    });
  });
});
