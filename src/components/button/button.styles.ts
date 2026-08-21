import styled, { keyframes } from 'styled-components';
import { colors } from 'resources/colors';
import { spaces } from 'resources/spaces';

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    ${colors['orange-500']},
    ${colors['orange-900']}
  );
  color: ${colors['neutral-0']};
  border: none;
  border-radius: 6px;
  height: 44px;
  width: 100%;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(239, 126, 24, 0.3);
  transition:
    opacity 0.2s,
    transform 0.1s;
  padding: 0 ${spaces.medium}px;

  &:hover {
    opacity: 0.95;
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    background: ${colors['neutral-800']};
    color: ${colors['neutral-500']};
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }
`;

export const LoadingSpinner = styled.div`
  width: 18px;
  height: 18px;
  border: 2px solid ${colors['neutral-0']};
  border-top-color: transparent;
  border-radius: 50%;
  animation: ${rotate} 0.6s linear infinite;
`;
