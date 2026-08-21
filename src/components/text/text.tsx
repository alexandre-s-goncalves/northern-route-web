import { type TextProps, TextStyled } from './text.styles';

export const Text = (props: Readonly<TextProps>) => {
  return <TextStyled {...props} />;
};
