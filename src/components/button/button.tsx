import { type ButtonHTMLAttributes } from 'react';
import * as S from './button.styles';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export const Button = ({
  children,
  isLoading = false,
  disabled,
  ...rest
}: Readonly<ButtonProps>) => {
  return (
    <S.StyledButton disabled={disabled || isLoading} {...rest}>
      {isLoading ? <S.LoadingSpinner /> : children}
    </S.StyledButton>
  );
};
