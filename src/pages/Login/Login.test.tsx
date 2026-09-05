import { act } from 'react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Login } from './Login';
import { RoutePaths } from 'resources/routePaths';
import { useLoginMutation } from 'hooks/useAuth';
import { useNavigate } from 'react-router-dom';

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

vi.mock('hooks/useAuth', () => ({
  useLoginMutation: vi.fn(),
}));

describe('Login Component', () => {
  let component: ReturnType<typeof render>;
  const mockMutateAsync = vi.fn();
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    vi.mocked(useLoginMutation).mockReturnValue({
      mutateAsync: mockMutateAsync,
    } as unknown as ReturnType<typeof useLoginMutation>);

    component = render(<Login />);
  });

  afterEach(() => {
    component.unmount();
    vi.clearAllMocks();
  });

  describe('Behavioral Scenarios', () => {
    test('WHEN form is submitted and credentials are field invalid SHOULD display exact API error message content within container', async () => {
      component.rerender(<Login />);

      mockMutateAsync.mockResolvedValueOnce({
        errorMessage: 'Invalid username or password credentials.',
        isSuccess: false,
      });

      const emailWrapper = screen.getByTestId('input-email');
      const passwordWrapper = screen.getByTestId('input-password');
      const loginButton = screen.getByTestId('button-login');

      const emailInput = emailWrapper.querySelector('input')!;
      const passwordInput = passwordWrapper.querySelector('input')!;

      fireEvent.change(emailInput, { target: { value: 'wrong@northern.com' } });
      fireEvent.change(passwordInput, { target: { value: 'wrongpass' } });

      await act(async () => {
        fireEvent.submit(loginButton.closest('form')!);
      });

      expect(mockMutateAsync).toHaveBeenCalledWith({
        email: 'wrong@northern.com',
        passwordHash: 'wrongpass',
      });

      const errorText = await screen.findByText(
        'Invalid username or password credentials.',
      );
      expect(errorText).toBeInTheDocument();
    });

    test('WHEN form is submitted and credentials are valid SHOULD invoke authorization endpoints and navigate to home screen dashboard', async () => {
      component.rerender(<Login />);

      mockMutateAsync.mockResolvedValueOnce({
        errorMessage: null,
        isSuccess: true,
      });

      const emailWrapper = screen.getByTestId('input-email');
      const passwordWrapper = screen.getByTestId('input-password');
      const loginButton = screen.getByTestId('button-login');

      const emailInput = emailWrapper.querySelector('input')!;
      const passwordInput = passwordWrapper.querySelector('input')!;

      fireEvent.change(emailInput, {
        target: { value: 'driver@northernroute.com' },
      });
      fireEvent.change(passwordInput, {
        target: { value: 'securepassword123' },
      });

      await act(async () => {
        fireEvent.submit(loginButton.closest('form')!);
      });

      expect(mockMutateAsync).toHaveBeenCalledWith({
        email: 'driver@northernroute.com',
        passwordHash: 'securepassword123',
      });

      expect(mockNavigate).toHaveBeenCalledWith(RoutePaths.HOME);
    });

    test('WHEN operation actions fail without payload message SHOULD fallback safely to authentication generic failure validation', async () => {
      component.rerender(<Login />);

      mockMutateAsync.mockResolvedValueOnce({
        errorMessage: '',
        isSuccess: false,
      });

      const emailWrapper = screen.getByTestId('input-email');
      const passwordWrapper = screen.getByTestId('input-password');
      const loginButton = screen.getByTestId('button-login');

      const emailInput = emailWrapper.querySelector('input')!;
      const passwordInput = passwordWrapper.querySelector('input')!;

      fireEvent.change(emailInput, { target: { value: 'driver@test.com' } });
      fireEvent.change(passwordInput, { target: { value: 'test' } });

      await act(async () => {
        fireEvent.submit(loginButton.closest('form')!);
      });

      const fallbackError = await screen.findByText('Authentication failed.');
      expect(fallbackError).toBeInTheDocument();
    });

    test('WHEN password visibility toggle button is clicked SHOULD alternate input visibility type properties natively', () => {
      component.rerender(<Login />);

      const passwordWrapper = screen.getByTestId('input-password');
      const passwordInput = passwordWrapper.querySelector('input')!;
      const toggleButton = passwordWrapper.querySelector('button')!;

      expect(passwordInput.getAttribute('type')).toBe('password');

      fireEvent.click(toggleButton);
      expect(passwordInput.getAttribute('type')).toBe('text');

      fireEvent.click(toggleButton);
      expect(passwordInput.getAttribute('type')).toBe('password');
    });
  });

  describe('Rendering Scenarios', () => {
    test('WHEN dashboard authentication terminal wakes up SHOULD mount structural layout and core operation credential fields cleanly', () => {
      component.rerender(<Login />);

      expect(screen.getByText('Welcome')).toBeInTheDocument();
      expect(screen.getByTestId('input-email')).toBeInTheDocument();
      expect(screen.getByTestId('input-password')).toBeInTheDocument();
      expect(screen.getByTestId('button-login')).toBeInTheDocument();
      expect(screen.getByText('Forgot Password?')).toBeInTheDocument();
    });
  });
});
