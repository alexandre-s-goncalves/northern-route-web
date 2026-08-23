import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/react';
import 'jest-styled-components';
import * as S from './icon.styles';

describe('Icon.styles', () => {
  describe('IconWrapper SHOULD match snapshot with default properties', () => {
    test('standard render', () => {
      const { container } = render(<S.IconWrapper />);
      expect(container).toMatchSnapshot();
    });
  });

  describe('IconWrapper SHOULD match snapshot with all custom overrides active', () => {
    test('complete layout evaluation', () => {
      const { container } = render(
        <S.IconWrapper
          $color="#ff8b22"
          $width={32}
          $height={16}
          $rotate={90}
        />,
      );
      expect(container).toMatchSnapshot();
    });
  });

  describe('Image SHOULD match snapshot with default properties', () => {
    test('standard render', () => {
      const { container } = render(<S.Image />);
      expect(container).toMatchSnapshot();
    });
  });
});
