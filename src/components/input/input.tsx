import { Icon, IconProps } from 'components/icon';
import { colors } from 'resources/colors';
import { InputHTMLAttributes, ReactNode } from 'react';
import { TextProps } from 'components/text/text.styles';
import * as S from './input.styles';

export interface InputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'placeholder'
> {
  testId?: string;
  hasError?: boolean;
  icon?: Omit<IconProps, 'className'>;
  invert?: boolean;
  placeholder?: string;
  placeholderConfig?: Omit<TextProps, 'children'>;
  textConfig?: Omit<TextProps, 'children'>;
  rightElement?: ReactNode;
}

export const Input = ({
  testId,
  icon,
  hasError = false,
  invert = false,
  placeholder,
  placeholderConfig,
  rightElement,
  textConfig,
  ...rest
}: Readonly<InputProps>) => {
  const defaultTextColor = textConfig?.color ?? colors['neutral-100'];

  return (
    <S.InputWrapper data-testid={testId} $hasError={hasError} $invert={invert}>
      {icon && (
        <S.Container>
          <Icon color={icon.color ?? defaultTextColor} {...icon} />
        </S.Container>
      )}
      <S.StyledInput
        placeholder={placeholder}
        $placeholderConfig={placeholderConfig}
        $textConfig={textConfig}
        {...rest}
      />
      {rightElement && <S.Container>{rightElement}</S.Container>}
    </S.InputWrapper>
  );
};
