import { type InputHTMLAttributes, type ReactNode } from 'react';
import { StyleSheetManager } from 'styled-components';
import * as S from './input.styles';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  hasError?: boolean;
}

export const Input = ({
  icon,
  hasError = false,
  ...rest
}: Readonly<InputProps>) => {
  return (
    <StyleSheetManager shouldForwardProp={prop => !['hasError'].includes(prop)}>
      <S.InputWrapper hasError={hasError}>
        {icon && <S.IconContainer>{icon}</S.IconContainer>}
        <S.StyledInput {...rest} />
      </S.InputWrapper>
    </StyleSheetManager>
  );
};
