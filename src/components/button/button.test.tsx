import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import {
  fireEvent,
  render,
  screen,
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

  describe('Behavioral Scenarios', () => {
    test('WHEN isLoading flag is active SHOULD set disabled attribute to prevent execution', () => {
      component.rerender(
        <Button isLoading onClick={handleClick}>
          Click Me
        </Button>,
      );

      const button = screen.getByRole('button');
      expect(button).toBeDisabled();

      fireEvent.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });

    test('WHEN user clicks interactive button SHOULD fire onClick method callback', () => {
      component.rerender(<Button onClick={handleClick}>Click Me</Button>);

      fireEvent.click(screen.getByRole('button', { name: /click me/i }));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Rendering Scenarios', () => {
    test('WHEN icon parameter configuration object is provided SHOULD render custom vector graphic element', () => {
      const DummySvg = () => <svg data-testid="button-icon-node" />;

      component.rerender(
        <Button icon={{ icon: DummySvg, size: 16 }}>
          Authenticated Access
        </Button>,
      );

      expect(screen.getByTestId('button-icon-node')).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /authenticated access/i }),
      ).toBeInTheDocument();
    });

    test('WHEN isLoading flag is active SHOULD NOT render children text content inside node', () => {
      component.rerender(<Button isLoading>Sign In</Button>);
      expect(screen.queryByText('Sign In')).not.toBeInTheDocument();
    });

    test('WHEN rendering normal button SHOULD display text children nodes accurately', () => {
      component.rerender(<Button>Sign In</Button>);
      expect(
        screen.getByRole('button', { name: /sign in/i }),
      ).toBeInTheDocument();
    });
  });
});
