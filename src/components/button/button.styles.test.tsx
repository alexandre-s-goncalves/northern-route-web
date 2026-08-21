import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/react';

import * as S from './button.styles';

describe('Button.styles', () => {
  describe('StyledButton SHOULD match snapshot', () => {
    test('standard background gradient layout render', () => {
      const { container } = render(<S.StyledButton />);
      expect(container).toMatchSnapshot();
    });
  });

  describe('LoadingSpinner SHOULD match snapshot', () => {
    test('keyframe animation vector render', () => {
      const { container } = render(<S.LoadingSpinner />);
      expect(container).toMatchSnapshot();
    });
  });
});
