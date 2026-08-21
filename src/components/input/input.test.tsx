import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  render,
  screen,
  fireEvent,
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

  describe('Rendering', () => {
    test('WHEN rendering input SHOULD display placeholder text accurately', () => {
      render(<Input placeholder="Password" />);
      expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    });

    test('WHEN icon parameter is passed SHOULD render icon wrapper element inside container', () => {
      render(
        <Input placeholder="Search" icon={<svg data-testid="mock-icon" />} />,
      );
      expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
    });
  });

  describe('Behavioral', () => {
    test('WHEN user types text inside field SHOULD trigger native onChange event handler callback', () => {
      render(<Input placeholder="Email" onChange={handleChange} />);

      const inputElement = screen.getByPlaceholderText('Email');
      fireEvent.change(inputElement, { target: { value: 'driver@test.com' } });

      expect(handleChange).toHaveBeenCalledTimes(1);
      expect((inputElement as HTMLInputElement).value).toBe('driver@test.com');
    });
  });
});
