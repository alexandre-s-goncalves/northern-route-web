import { colors } from 'resources/colors';
import { fonts } from 'resources/fonts';
import { spaces } from 'resources/spaces';
import { type TextProps } from 'components/text/text.styles';
import styled, { keyframes } from 'styled-components';
import { alpha } from 'utils/alpha';

export interface StyledButtonComponentsProps {
  $invert?: boolean;
  $textConfig?: Omit<TextProps, 'children'>;
}

const rotateAnimation = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const LoadingSpinner = styled.div`
  animation: ${rotateAnimation} 0.6s linear infinite;
  border-radius: 50%;
  border: 2px solid ${colors['neutral-0']};
  border-top-color: transparent;
  height: 18px;
  width: 18px;
`;

export const StyledButton = styled.button.withConfig({
  shouldForwardProp: prop => !['$invert', '$textConfig'].includes(prop),
})<StyledButtonComponentsProps>`
  align-items: center;
  background: linear-gradient(
    135deg,
    ${colors['orange-500']},
    ${colors['orange-900']}
  );
  border-radius: 6px;
  border: none;
  box-shadow: 0 4px 12px ${alpha(colors['orange-900'], 30)};
  color: ${({ $textConfig }) => $textConfig?.color ?? colors['neutral-0']};
  cursor: pointer;
  display: flex;
  flex-direction: ${({ $invert }) => ($invert ? 'row-reverse' : 'row')};
  font-family: ${({ $textConfig }) => ($textConfig?.variant ? fonts[$textConfig.variant] : fonts.regular)};
  font-size: ${({ $textConfig }) => ($textConfig?.size ? `${$textConfig.size}px` : '14px')};
  font-weight: ${({ $textConfig }) => $textConfig?.weight ?? 600};
  gap: ${spaces.xsmall}px;
  height: 44px;
  justify-content: center;
  padding: 0 ${spaces.medium}px;
  text-transform: ${({ $textConfig }) => $textConfig?.transform ?? 'none'};
  transition:
    opacity 0.2s,
    transform 0.1s;
  width: 100%;

  &:hover {
    opacity: 0.95;
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    background: ${colors['neutral-800']};
    box-shadow: none;
    color: ${colors['neutral-500']};
    cursor: not-allowed;
    transform: none;
  }
`;
