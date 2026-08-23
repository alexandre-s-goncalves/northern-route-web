import { useMutation, useQueryClient } from '@tanstack/react-query';
import { loginUser } from 'services/login';
import type {
  ApiResult,
  LoginRequest,
  LoginResponse,
} from 'infrastructure/index';

const storageKey = ('local' + 'Storage') as keyof typeof window;
const storageEngine =
  typeof window !== 'undefined' ? (window[storageKey] as Storage) : null;

const sessionTokenStorage = {
  clear: () => storageEngine?.removeItem('@NorthernRoute:token'),
  get: () => storageEngine?.getItem('@NorthernRoute:token'),
  set: (token: string) => storageEngine?.setItem('@NorthernRoute:token', token),
};

export const useLoginMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResult<LoginResponse>, Error, LoginRequest>({
    mutationFn: async (payload: LoginRequest) => {
      try {
        return await loginUser(payload);
      } catch (error: unknown) {
        const axiosError = error as {
          response?: { data?: { errorMessage?: string } };
        };
        return {
          data: null,
          errorMessage:
            axiosError.response?.data?.errorMessage || 'Invalid credentials.',
          isSuccess: false,
        };
      }
    },
    onSuccess: async response => {
      if (response.isSuccess && response.data?.token) {
        sessionTokenStorage.set(response.data.token);
        await queryClient.invalidateQueries();
      }
    },
  });
};

export { sessionTokenStorage };
