import styled from 'styled-components';

export const ButtonWrapper = styled.button<{ $invert: boolean }>`
  align-items: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  padding: 0;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 0.8;
  }
`;

export const IconContainer = styled.div<{ $invert: boolean }>`
  align-items: center;
  display: flex;
  justify-content: center;
  transition: transform 0.2s ease-in-out;
  transform: ${({ $invert }) => ($invert ? 'rotate(180deg)' : 'rotate(0deg)')};
`;
