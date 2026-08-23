import { type InputHTMLAttributes } from 'react';
import { type IconProps, Icon } from 'components/icon';
import { type TextProps } from 'components/text/text.styles';
import { colors } from 'resources/colors';
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
}

export const Input = ({
  testId,
  icon,
  hasError = false,
  invert = false,
  placeholder,
  placeholderConfig,
  textConfig,
  ...rest
}: Readonly<InputProps>) => {
  const defaultTextColor = textConfig?.color ?? colors['neutral-100'];

  return (
    <S.InputWrapper data-testid={testId} $hasError={hasError} $invert={invert}>
      {icon && (
        <S.IconContainer $invert={invert}>
          <Icon color={icon.color ?? defaultTextColor} {...icon} />
        </S.IconContainer>
      )}
      <S.StyledInput
        placeholder={placeholder}
        $placeholderConfig={placeholderConfig}
        $textConfig={textConfig}
        {...rest}
      />
    </S.InputWrapper>
  );
};
