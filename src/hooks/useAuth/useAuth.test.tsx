import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { sessionTokenStorage, useLoginMutation } from './useAuth';
import { loginUser } from 'services/login';
import React from 'react';

vi.mock('services/login', () => ({
  loginUser: vi.fn(),
}));

describe('useLoginMutation', () => {
  let queryClient: QueryClient;

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        mutations: { retry: false },
        queries: { retry: false },
      },
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
    queryClient.clear();
  });

  describe('Rendering Scenarios', () => {
    test('WHEN initialization activates SHOULD establish mutations setup parameters successfully', () => {
      const { result } = renderHook(() => useLoginMutation(), { wrapper });

      expect(result.current.mutate).toBeDefined();
      expect(result.current.isPending).toBe(false);
    });

    test('WHEN local storage drivers trigger runtime faults SHOULD intercept pipeline operations silently', () => {
      const mockGetItem = vi
        .spyOn(Storage.prototype, 'getItem')
        .mockImplementation(() => null);
      const mockSetItem = vi
        .spyOn(Storage.prototype, 'setItem')
        .mockImplementation(() => {});
      const mockRemoveItem = vi
        .spyOn(Storage.prototype, 'removeItem')
        .mockImplementation(() => {});

      sessionTokenStorage.set('failure-test');
      expect(sessionTokenStorage.get()).toBeNull();
      sessionTokenStorage.clear();

      expect(mockGetItem).toHaveBeenCalled();
      expect(mockSetItem).toHaveBeenCalled();
      expect(mockRemoveItem).toHaveBeenCalled();
    });

    test('WHEN server context initializes without window driver SHOULD compile abstract storage engine to null safely', async () => {
      const originalWindow = globalThis.window;

      vi.stubGlobal('window', undefined);
      vi.resetModules();

      const { sessionTokenStorage: serverStorage } = await import('./useAuth');

      expect(serverStorage.get()).toBeUndefined();

      vi.stubGlobal('window', originalWindow);
      vi.resetModules();
    });

    test('WHEN storage token utilities clear actions trigger SHOULD delete target data accurately', () => {
      localStorage.setItem('@NorthernRoute:token', 'temporary-data-string');

      sessionTokenStorage.clear();

      expect(localStorage.getItem('@NorthernRoute:token')).toBeNull();
    });

    test('WHEN storage token utilities get actions trigger SHOULD retrieve target persisted reference', () => {
      localStorage.setItem('@NorthernRoute:token', 'target-retrieved-jwt');

      const tokensValue = sessionTokenStorage.get();

      expect(tokensValue).toBe('target-retrieved-jwt');
    });
  });

  describe('Behavioral Scenarios', () => {
    test('role verification WHEN authentication endpoint succeeds SHOULD persist secure token within abstract browser cache boundary', async () => {
      vi.mocked(loginUser).mockResolvedValueOnce({
        data: {
          email: 'driver@northern.com',
          name: 'Northern Driver',
          role: 'driver',
          token: 'mock-valid-jwt',
          userId: 'mock-user-uuid-123',
        },
        errorMessage: null,
        isSuccess: true,
      });

      const { result } = renderHook(() => useLoginMutation(), { wrapper });

      result.current.mutate({
        email: 'driver@northern.com',
        passwordHash: 'secure123',
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data?.isSuccess).toBe(true);
      expect(localStorage.getItem('@NorthernRoute:token')).toBe(
        'mock-valid-jwt',
      );
    });

    test('role verification WHEN endpoint credentials fail SHOULD trigger fallback handlers safely', async () => {
      vi.mocked(loginUser).mockRejectedValueOnce({
        response: { data: { errorMessage: 'Invalid server payload.' } },
      });

      const { result } = renderHook(() => useLoginMutation(), { wrapper });

      result.current.mutate({
        email: 'driver@test.com',
        passwordHash: 'wrong',
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data?.isSuccess).toBe(false);
      expect(result.current.data?.errorMessage).toBe('Invalid server payload.');
    });

    test('role verification WHEN mutation triggers general exception without schema payload SHOULD resolve generic validation text', async () => {
      vi.mocked(loginUser).mockRejectedValueOnce({});

      const { result } = renderHook(() => useLoginMutation(), { wrapper });

      result.current.mutate({
        email: 'driver@fallback.com',
        passwordHash: 'generic',
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data?.isSuccess).toBe(false);
      expect(result.current.data?.errorMessage).toBe('Invalid credentials.');
    });
  });
});
