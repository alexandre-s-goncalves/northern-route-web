import styled from 'styled-components';
import { colors } from 'resources/colors';
import { spaces } from 'resources/spaces';

export interface InputWrapperProps {
  hasError?: boolean;
}

export const InputWrapper = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'hasError',
})<InputWrapperProps>`
  display: flex;
  align-items: center;
  background-color: ${colors['surface-input']};
  border: 1px solid
    ${({ hasError }) => (hasError ? colors['error-500'] : colors['border-glass'])};
  border-radius: 6px;
  padding: 0 ${spaces.small}px;
  height: 48px;
  width: 100%;
  box-sizing: border-box;
  transition: border-color 0.2s;

  &:focus-within {
    border-color: ${({ hasError }) => (hasError ? colors['error-500'] : colors['orange-500'])};
  }
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors['neutral-500']};
  margin-right: ${spaces.small}px;
  font-size: 18px;

  svg {
    width: 18px;
    height: 18px;
    fill: currentColor;
  }
`;

export const StyledInput = styled.input`
  flex: 1;
  background: none;
  border: none;
  outline: none;
  color: ${colors['neutral-100']};
  font-size: 14px;
  height: 100%;
  width: 100%;

  &::placeholder {
    color: ${colors['neutral-700']};
  }
`;
