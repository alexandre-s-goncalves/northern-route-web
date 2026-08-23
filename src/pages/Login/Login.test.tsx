import { act } from 'react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
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

  describe('Rendering Scenarios', () => {
    test('WHEN dashboard authentication terminal wakes up SHOULD mount structural layout and core operation credential fields cleanly', () => {
      component.rerender(<Login />);

      expect(component.getByText('Welcome')).toBeInTheDocument();
      expect(component.getByPlaceholderText('Username')).toBeInTheDocument();
      expect(component.getByPlaceholderText('Password')).toBeInTheDocument();
      expect(component.getByTestId('button-login')).toBeInTheDocument();
      expect(component.getByText('Forgot Password?')).toBeInTheDocument();
    });
  });

  describe('Behavioral Scenarios', () => {
    test('WHEN form is submitted and credentials are invalid SHOULD display exact API error message content within container', async () => {
      component.rerender(<Login />);

      mockMutateAsync.mockResolvedValueOnce({
        errorMessage: 'Invalid username or password credentials.',
        isSuccess: false,
      });

      const emailInput = component.getByPlaceholderText('Username');
      const passwordInput = component.getByPlaceholderText('Password');
      const loginButton = component.getByTestId('button-login');

      fireEvent.change(emailInput, { target: { value: 'wrong@northern.com' } });
      fireEvent.change(passwordInput, { target: { value: 'wrongpass' } });

      await act(async () => {
        fireEvent.submit(loginButton.closest('form')!);
      });

      expect(mockMutateAsync).toHaveBeenCalledWith({
        email: 'wrong@northern.com',
        passwordHash: 'wrongpass',
      });

      const errorText = await component.findByText(
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

      const emailInput = component.getByPlaceholderText('Username');
      const passwordInput = component.getByPlaceholderText('Password');
      const loginButton = component.getByTestId('button-login');

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

      const emailInput = component.getByPlaceholderText('Username');
      const passwordInput = component.getByPlaceholderText('Password');
      const loginButton = component.getByTestId('button-login');

      fireEvent.change(emailInput, { target: { value: 'driver@test.com' } });
      fireEvent.change(passwordInput, { target: { value: 'test' } });

      await act(async () => {
        fireEvent.submit(loginButton.closest('form')!);
      });

      const fallbackError = await component.findByText(
        'Authentication failed.',
      );
      expect(fallbackError).toBeInTheDocument();
    });
  });
});
