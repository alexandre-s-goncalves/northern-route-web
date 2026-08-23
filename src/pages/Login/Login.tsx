import { useActionState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from 'hooks/useAuth';
import { RoutePaths } from 'resources/routePaths';
import * as S from './Login.styles';

interface FormState {
  error: string | null;
  isSuccess: boolean;
  values: {
    email: string;
    password?: string;
  };
}

export const Login = () => {
  const navigate = useNavigate();
  const { mutateAsync } = useLoginMutation();

  const [state, formAction, isPending] = useActionState(
    async (_: FormState | null, formData: FormData): Promise<FormState> => {
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;

      const response = await mutateAsync({ email, passwordHash: password });

      if (response.isSuccess) {
        navigate(RoutePaths.HOME);
        return { error: null, isSuccess: true, values: { email } };
      }

      return {
        error: response.errorMessage || 'Authentication failed.',
        isSuccess: false,
        values: { email, password },
      };
    },
    { error: null, isSuccess: false, values: { email: '' } },
  );

  useEffect(() => {
    if (state?.isSuccess) {
      navigate(RoutePaths.HOME);
    }
  }, [state?.isSuccess, navigate]);

  return (
    <S.PageWrapper>
      <S.GlassCard action={formAction}>
        <S.HeaderContainer>
          <S.TextTitle>Welcome</S.TextTitle>
        </S.HeaderContainer>
        <S.FieldsContainer>
          <S.InputEmail
            testId="input-email"
            defaultValue={state?.values.email}
            disabled={isPending}
            hasError={!!state?.error}
          />
          <S.InputPassword
            testId="input-password"
            disabled={isPending}
            hasError={!!state?.error}
          />
        </S.FieldsContainer>
        <S.ActionsRow>
          <S.TextForgotPassword>Forgot Password?</S.TextForgotPassword>
        </S.ActionsRow>
        <S.ButtonLogin testId="button-login" isLoading={isPending}>
          LOGIN
        </S.ButtonLogin>
        <S.ErrorContainer>
          {state?.error && <S.TextError>{state.error}</S.TextError>}
        </S.ErrorContainer>
      </S.GlassCard>
    </S.PageWrapper>
  );
};
