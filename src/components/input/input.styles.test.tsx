import { describe, expect, test } from 'vitest';
import { render } from '@testing-library/react';
import 'jest-styled-components';
import * as S from './input.styles';

describe('Input.styles', () => {
  describe('IconContainer SHOULD match snapshot', () => {
    test('WHEN rendering with default orientation', () => {
      const { container } = render(<S.IconContainer />);
      expect(container).toMatchSnapshot();
    });

    test('WHEN rendering with inverted orientation', () => {
      const { container } = render(<S.IconContainer $invert />);
      expect(container).toMatchSnapshot();
    });
  });

  describe('InputWrapper SHOULD match snapshot', () => {
    test('WHEN hasError condition is active', () => {
      const { container } = render(<S.InputWrapper $hasError />);
      expect(container).toMatchSnapshot();
    });

    test('WHEN invert property layout configuration is applied', () => {
      const { container } = render(<S.InputWrapper $invert />);
      expect(container).toMatchSnapshot();
    });

    test('WHEN rendering standard component state properties', () => {
      const { container } = render(<S.InputWrapper />);
      expect(container).toMatchSnapshot();
    });
  });

  describe('StyledInput SHOULD match snapshot', () => {
    test('WHEN custom placeholder and typography properties are injected', () => {
      const { container } = render(
        <S.StyledInput
          $placeholderConfig={{
            color: '#ff5aad',
            variant: 'bold',
            weight: 800,
          }}
          $textConfig={{
            color: '#079d56',
            size: 16,
            variant: 'semibold',
            weight: 600,
          }}
        />,
      );
      expect(container).toMatchSnapshot();
    });

    test('WHEN rendering standard native element override properties', () => {
      const { container } = render(<S.StyledInput />);
      expect(container).toMatchSnapshot();
    });
  });
});
