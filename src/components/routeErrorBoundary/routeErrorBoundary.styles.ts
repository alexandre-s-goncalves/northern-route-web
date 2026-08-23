import { colors } from 'resources/colors';
import styled from 'styled-components';

export const ActionWrapper = styled.div`
  width: 160px;
`;

export const Container = styled.div`
  align-items: center;
  background-color: ${colors['bg-ambient-dark']};
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100vh;
  justify-content: center;
  width: 100vw;
`;

export const Headline = styled.h1`
  color: ${colors['neutral-100']};
  font-size: 24px;
  font-weight: 600;
`;
