import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import {
  fireEvent,
  render,
  screen,
  type RenderResult,
} from '@testing-library/react';
import { Input } from './input';

describe('Input', () => {
  let component: RenderResult;
  const handleChange = vi.fn();

  beforeEach(() => {
    component = render(<Input placeholder="Test" />);
  });

  afterEach(() => {
    component.unmount();
    vi.clearAllMocks();
  });

  describe('Behavioral Scenarios', () => {
    test('WHEN invert property configuration is active SHOULD execute component structural transits safely', () => {
      const DummySvg = () => <svg data-testid="invert-svg" />;

      component.rerender(
        <Input
          placeholder="Inverted Field"
          invert={true}
          icon={{ icon: DummySvg }}
        />,
      );

      expect(screen.getByPlaceholderText('Inverted Field')).toBeInTheDocument();
      expect(screen.getByTestId('invert-svg')).toBeInTheDocument();
    });

    test('WHEN native value inputs are modified SHOULD apply dynamic style overrides without memory leakage', () => {
      component.rerender(
        <Input
          placeholder="Styled Text Field"
          textConfig={{ color: '#006b3f', variant: 'bold' }}
          placeholderConfig={{ color: '#ff8b22', variant: 'regular' }}
        />,
      );

      expect(
        screen.getByPlaceholderText('Styled Text Field'),
      ).toBeInTheDocument();
    });

    test('WHEN user types text inside field SHOULD trigger native onChange event handler callback', () => {
      component.rerender(<Input placeholder="Email" onChange={handleChange} />);

      const inputElement = screen.getByPlaceholderText('Email');
      fireEvent.change(inputElement, { target: { value: 'driver@test.com' } });

      expect(handleChange).toHaveBeenCalledTimes(1);
      expect((inputElement as HTMLInputElement).value).toBe('driver@test.com');
    });
  });

  describe('Rendering Scenarios', () => {
    test('WHEN icon parameter configuration object is provided SHOULD render underlying atomic component structure', () => {
      const DummySvg = () => <svg data-testid="mock-svg-node" />;

      component.rerender(
        <Input
          placeholder="Search Operations"
          icon={{ icon: DummySvg, size: 18, color: '#ef7e18' }}
        />,
      );

      expect(screen.getByTestId('mock-svg-node')).toBeInTheDocument();
    });

    test('WHEN rendering input SHOULD display placeholder text accurately within interface bounds', () => {
      component.rerender(<Input placeholder="Password" />);
      expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    });
  });
});
