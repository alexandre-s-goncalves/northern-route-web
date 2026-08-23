import { describe, expect, test } from 'vitest';
import { render } from '@testing-library/react';
import 'jest-styled-components';
import * as S from './button.styles';

describe('Button.styles', () => {
  describe('LoadingSpinner SHOULD match snapshot', () => {
    test('keyframe animation vector render', () => {
      const { container } = render(<S.LoadingSpinner />);
      expect(container).toMatchSnapshot();
    });
  });

  describe('StyledButton SHOULD match snapshot', () => {
    test('WHEN custom typography and text overrides are injected', () => {
      const { container } = render(
        <S.StyledButton
          $textConfig={{
            color: '#ffffff',
            variant: 'bold',
            weight: 800,
            size: 16,
            transform: 'uppercase',
          }}
        />,
      );
      expect(container).toMatchSnapshot();
    });

    test('WHEN invert property layout configuration is applied', () => {
      const { container } = render(<S.StyledButton $invert />);
      expect(container).toMatchSnapshot();
    });

    test('WHEN rendering standard background gradient layout', () => {
      const { container } = render(<S.StyledButton />);
      expect(container).toMatchSnapshot();
    });
  });
});
