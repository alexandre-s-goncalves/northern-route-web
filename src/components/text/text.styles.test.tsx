import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/react';
import * as S from './text.styles';

describe('Text.styles', () => {
  describe('TextStyled SHOULD match snapshot with default properties', () => {
    test('standard render', () => {
      const { container } = render(<S.TextStyled />);
      expect(container).toMatchSnapshot();
    });
  });

  describe('TextStyled SHOULD match snapshot with all custom overrides active', () => {
    test('complete property injector evaluation', () => {
      const { container } = render(
        <S.TextStyled
          variant="bold"
          color="#079d56"
          weight={800}
          size={32}
          lineHeight={34}
          align="center"
          transform="uppercase"
          cursor="pointer"
        />,
      );
      expect(container).toMatchSnapshot();
    });
  });
});
