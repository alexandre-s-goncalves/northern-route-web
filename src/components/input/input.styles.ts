import { colors } from 'resources/colors';
import { fonts } from 'resources/fonts';
import { spaces } from 'resources/spaces';
import { type TextProps } from 'components/text/text.styles';
import { alpha } from 'utils/alpha';
import styled from 'styled-components';

export interface StyledInputComponentsProps {
  $hasError?: boolean;
  $invert?: boolean;
  $placeholderConfig?: Omit<TextProps, 'children'>;
  $textConfig?: Omit<TextProps, 'children'>;
}

export const IconContainer = styled.div.withConfig({
  shouldForwardProp: prop => prop !== '$invert',
})<StyledInputComponentsProps>`
  align-items: center;
  color: ${colors['neutral-500']};
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  margin-left: ${({ $invert }) => ($invert ? `${spaces.small}px` : '0')};
  margin-right: ${({ $invert }) => ($invert ? '0' : `${spaces.small}px`)};
`;

export const InputWrapper = styled.div.withConfig({
  shouldForwardProp: prop => !['$hasError', '$invert'].includes(prop),
})<StyledInputComponentsProps>`
  align-items: center;
  background-color: ${alpha(colors['surface-input'], 40)};
  border: 1px solid
    ${({ $hasError }) => ($hasError ? colors['error-500'] : alpha(colors['neutral-0'], 10))};
  border-radius: 6px;
  box-sizing: border-box;
  display: flex;
  flex-direction: ${({ $invert }) => ($invert ? 'row-reverse' : 'row')};
  height: 48px;
  padding: 0 ${spaces.small}px;
  transition: border-color 0.2s;
  width: 100%;

  &:focus-within {
    border-color: ${({ $hasError }) => ($hasError ? colors['error-500'] : colors['orange-500'])};
  }
`;

export const StyledInput = styled.input.withConfig({
  shouldForwardProp: prop =>
    !['$placeholderConfig', '$textConfig'].includes(prop),
})<StyledInputComponentsProps>`
  background: none;
  border: none;
  color: ${({ $textConfig }) => $textConfig?.color ?? colors['neutral-100']};
  flex: 1;
  font-family: ${({ $textConfig }) => ($textConfig?.variant ? fonts[$textConfig.variant] : fonts.regular)};
  font-size: ${({ $textConfig }) => ($textConfig?.size ? `${$textConfig.size}px` : '14px')};
  font-weight: ${({ $textConfig }) => $textConfig?.weight ?? 400};
  height: 100%;
  outline: none;
  text-transform: ${({ $textConfig }) => $textConfig?.transform ?? 'none'};
  width: 100%;

  &::placeholder {
    color: ${({ $placeholderConfig }) => $placeholderConfig?.color ?? colors['neutral-700']};
    font-family: ${({ $placeholderConfig }) => ($placeholderConfig?.variant ? fonts[$placeholderConfig.variant] : fonts.regular)};
    font-weight: ${({ $placeholderConfig }) => $placeholderConfig?.weight ?? 400};
    text-transform: ${({ $placeholderConfig }) => $placeholderConfig?.transform ?? 'none'};
  }
`;
