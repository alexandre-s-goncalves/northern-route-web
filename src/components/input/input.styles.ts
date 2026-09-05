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

export const Container = styled.div`
  align-items: center;
  color: ${colors['neutral-500']};
  display: flex;
  flex-shrink: 0;
  justify-content: center;
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
  flex: 1;
  background: none;
  border: none;
  outline: none;
  height: 100%;
  width: 100%;
  margin: 0 ${spaces.small}px;
  color: ${({ $textConfig }) => $textConfig?.color ?? colors['neutral-100']};
  font-family: ${({ $textConfig }) => ($textConfig?.variant ? fonts[$textConfig.variant] : fonts.regular)};
  font-size: ${({ $textConfig }) => ($textConfig?.size ? `${$textConfig.size}px` : '14px')};
  font-weight: ${({ $textConfig }) => $textConfig?.weight ?? 400};
  text-transform: ${({ $textConfig }) => $textConfig?.transform ?? 'none'};

  &::placeholder {
    color: ${({ $placeholderConfig }) => $placeholderConfig?.color ?? colors['neutral-700']};
    font-family: ${({ $placeholderConfig }) => ($placeholderConfig?.variant ? fonts[$placeholderConfig.variant] : fonts.regular)};
    font-weight: ${({ $placeholderConfig }) => $placeholderConfig?.weight ?? 400};
    text-transform: ${({ $placeholderConfig }) => $placeholderConfig?.transform ?? 'none'};
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
    -webkit-text-fill-color: ${({ $textConfig }) => $textConfig?.color ?? colors['neutral-100']} !important;
    box-shadow: 0 0 0px 1000px transparent inset !important;
    transition: background-color 9999s ease-in-out 0s;
  }
`;
