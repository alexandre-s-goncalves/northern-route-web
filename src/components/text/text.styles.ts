import { type HTMLAttributes, type ReactNode } from 'react';
import styled from 'styled-components';
import { fonts } from 'resources/fonts';
import { colors } from 'resources/colors';

export interface TextProps extends HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode;
  color?: string;
  variant?: 'bold' | 'semibold' | 'regular';
  weight?: 300 | 400 | 500 | 600 | 800;
  size?: 10 | 11 | 12 | 14 | 16 | 18 | 20 | 24 | 28 | 32;
  lineHeight?: 12 | 14 | 16 | 18 | 20 | 24 | 28 | 30 | 32 | 34;
  cursor?: 'default' | 'pointer' | 'text';
  align?: 'start' | 'end' | 'left' | 'right' | 'center' | 'justify';
  transform?: 'capitalize' | 'lowercase' | 'uppercase';
}

export const TextStyled = styled.span.withConfig({
  shouldForwardProp: prop =>
    ![
      'variant',
      'weight',
      'size',
      'lineHeight',
      'align',
      'transform',
      'cursor',
    ].includes(prop),
})<TextProps>`
  font-weight: ${({ weight }) => weight ?? 400};
  font-size: ${({ size }) => (size ? `${size}px` : '12px')};
  line-height: ${({ lineHeight }) => (lineHeight ? `${lineHeight}px` : 'normal')};
  font-family: ${({ variant }) => (variant ? fonts[variant] : fonts.regular)};
  color: ${({ color }) => color ?? colors['neutral-800']};
  text-align: ${({ align }) => align ?? 'start'};
  text-transform: ${({ transform }) => transform ?? 'none'};
  cursor: ${({ cursor }) => cursor ?? 'text'};
`;
