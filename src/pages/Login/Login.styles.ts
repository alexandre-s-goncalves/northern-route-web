import LockSVG from 'assets/icons/iLock.svg?react';
import UserSVG from 'assets/icons/iUser.svg?react';
import { Button } from 'components/button';
import { Input } from 'components/input';
import { Text } from 'components/text';
import { alpha } from 'utils/alpha';
import { colors } from 'resources/colors';
import { spaces } from 'resources/spaces';
import styled from 'styled-components';

export const ActionsRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: ${spaces.medium}px;
  padding: 0 ${spaces.xxsmall}px;
  width: 100%;
`;

export const ButtonLogin = styled(Button).attrs({
  type: 'submit',
})`
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 0.8;
  }
`;

export const ErrorContainer = styled.div`
  align-items: center;
  display: flex;
  height: ${spaces.xsmall}px;
  justify-content: center;
  margin-top: ${spaces.small}px;
`;

export const FieldsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spaces.small}px;
  margin-bottom: ${spaces.small}px;
  width: 100%;
`;

export const GlassCard = styled.form`
  align-items: center;
  backdrop-filter: blur(${spaces.small}px);
  background-color: ${alpha(colors['surface-glass'], 65)};
  border: 1px solid ${alpha(colors['neutral-0'], 10)};
  border-radius: ${spaces.small}px;
  box-sizing: border-box;
  box-shadow: 0 20px 40px ${alpha(colors['neutral-900'], 40)};
  display: flex;
  flex-direction: column;
  max-width: 380px;
  padding: ${spaces.large}px ${spaces.xlarge}px ${spaces.xlarge}px
    ${spaces.xlarge}px;
  width: 100%;
  -webkit-backdrop-filter: blur(${spaces.small}px);
`;

export const HeaderContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-bottom: ${spaces.large}px;
  width: 100%;
`;

export const InputEmail = styled(Input).attrs({
  autoComplete: 'username',
  id: 'email',
  icon: { color: colors['neutral-700'], icon: UserSVG },
  name: 'email',
  placeholder: 'Username',
  required: true,
  type: 'email',
})``;

export const InputPassword = styled(Input).attrs({
  autoComplete: 'current-password',
  id: 'password',
  icon: { color: colors['neutral-700'], icon: LockSVG },
  name: 'password',
  placeholder: 'Password',
  required: true,
  type: 'password',
})``;

export const PageWrapper = styled.div`
  align-items: center;
  background:
    radial-gradient(
      circle at top right,
      ${colors['bg-ambient-violet']},
      transparent 50%
    ),
    radial-gradient(
      circle at bottom left,
      ${colors['bg-ambient-teal']},
      ${colors['bg-ambient-deep']} 80%
    );
  background-color: ${colors['bg-ambient-dark']};
  box-sizing: border-box;
  display: flex;
  height: 100vh;
  justify-content: center;
  margin: 0;
  overflow: hidden;
  padding: 0;
  width: 100vw;
`;

export const TextError = styled(Text).attrs({
  align: 'center',
  color: colors['error-500'],
  size: 12,
  variant: 'semibold',
})``;

export const TextForgotPassword = styled(Text).attrs({
  align: 'right',
  color: colors['neutral-500'],
  cursor: 'pointer',
  size: 12,
  transform: 'capitalize',
  variant: 'regular',
})`
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 0.8;
  }
`;

export const TextTitle = styled(Text).attrs({
  align: 'center',
  color: colors['neutral-200'],
  size: 32,
  transform: 'uppercase',
  variant: 'regular',
})`
  display: inline-block;
  padding-bottom: ${spaces.small}px;
  position: relative;
  width: 100%;

  &::after {
    background: linear-gradient(
      to right,
      transparent,
      ${colors['neutral-700']},
      transparent
    );
    bottom: 0;
    content: '';
    height: 1px;
    left: 0;
    opacity: 0.5;
    position: absolute;
    width: 100%;
  }
`;
