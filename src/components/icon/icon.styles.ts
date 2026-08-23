import styled, { keyframes, css, type RuleSet } from 'styled-components';
import { colors } from 'resources/colors';

export interface IconWrapperProps {
  $color?: string;
  $width?: number;
  $height?: number;
  $rotate?: number | 'spin';
}

const spinAnimation = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const getRotationStyle = (rotateValue?: number | 'spin'): RuleSet => {
  if (rotateValue === 'spin') {
    return css`
      animation: ${spinAnimation} 0.6s linear infinite;
    `;
  }

  if (typeof rotateValue === 'number') {
    return css`
      transform: rotate(${rotateValue}deg);
    `;
  }

  return css`
    transform: none;
  `;
};

export const IconWrapper = styled.div.withConfig({
  shouldForwardProp: prop =>
    !['$color', '$width', '$height', '$rotate'].includes(prop),
})<IconWrapperProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  color: ${({ $color }) => $color ?? colors['neutral-500']};
  width: ${({ $width }) => ($width ? `${$width}px` : '24px')};
  height: ${({ $height }) => ($height ? `${$height}px` : '24px')};
  transition:
    transform 0.2s ease-in-out,
    color 0.2s;
  user-select: none;

  ${({ $rotate }) => getRotationStyle($rotate)}

  svg {
    width: 100%;
    height: 100%;

    path,
    circle,
    rect {
      fill: currentColor !important;
    }
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
`;
