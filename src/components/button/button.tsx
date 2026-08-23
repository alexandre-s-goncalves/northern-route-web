import { ReactNode, type ButtonHTMLAttributes } from 'react';
import { type IconProps, Icon } from 'components/icon';
import { type TextProps } from 'components/text/text.styles';
import { colors } from 'resources/colors';
import * as S from './button.styles';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  testId?: string;
  disabled?: boolean;
  children?: ReactNode;
  icon?: Omit<IconProps, 'className'>;
  invert?: boolean;
  isLoading?: boolean;
  textConfig?: Omit<TextProps, 'children'>;
}

export const Button = ({
  testId,
  children,
  disabled,
  icon,
  invert = false,
  isLoading = false,
  textConfig,
  ...rest
}: Readonly<ButtonProps>) => {
  const defaultTextColor = textConfig?.color ?? colors['neutral-0'];

  return (
    <S.StyledButton
      data-testid={testId}
      disabled={disabled || isLoading}
      $invert={invert}
      $textConfig={textConfig}
      {...rest}
    >
      {isLoading ? (
        <S.LoadingSpinner />
      ) : (
        <>
          {icon && <Icon color={icon.color ?? defaultTextColor} {...icon} />}
          {children}
        </>
      )}
    </S.StyledButton>
  );
};
