import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/react';

import * as S from './input.styles';

describe('Input.styles', () => {
  describe('InputWrapper SHOULD match snapshot with default properties', () => {
    test('standard render', () => {
      const { container } = render(<S.InputWrapper />);
      expect(container).toMatchSnapshot();
    });
  });

  describe('InputWrapper SHOULD match snapshot WHEN hasError is active', () => {
    test('error border constraint evaluation', () => {
      const { container } = render(<S.InputWrapper hasError />);
      expect(container).toMatchSnapshot();
    });
  });

  describe('IconContainer SHOULD match snapshot', () => {
    test('icon layout render', () => {
      const { container } = render(<S.IconContainer />);
      expect(container).toMatchSnapshot();
    });
  });

  describe('StyledInput SHOULD match snapshot', () => {
    test('native element override render', () => {
      const { container } = render(<S.StyledInput />);
      expect(container).toMatchSnapshot();
    });
  });
});
