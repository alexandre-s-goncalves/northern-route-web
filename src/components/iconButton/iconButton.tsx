import * as S from './iconButton.styles';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ElementType;
  invert?: boolean;
  testId?: string;
}

export const IconButton = ({
  icon: IconComponent,
  invert = false,
  testId,
  ...rest
}: Readonly<IconButtonProps>) => {
  return (
    <S.ButtonWrapper $invert={invert} data-testid={testId} {...rest}>
      {IconComponent && (
        <S.IconContainer $invert={invert}>
          <IconComponent />
        </S.IconContainer>
      )}
    </S.ButtonWrapper>
  );
};
