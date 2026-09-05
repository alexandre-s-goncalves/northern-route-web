import { describe, expect, test } from 'vitest';
import { render } from '@testing-library/react';
import * as S from './iconButton.styles';

describe('IconButton Styled Components Snapshots', () => {
  describe('ButtonWrapper Matrix', () => {
    test('should match snapshot layout when invert parameter is explicitly false', () => {
      const { container } = render(<S.ButtonWrapper $invert={false} />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('should match snapshot layout when invert parameter is explicitly true', () => {
      const { container } = render(<S.ButtonWrapper $invert={true} />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('IconContainer Geometry', () => {
    test('WHEN rendering with default orientation', () => {
      const { container } = render(<S.IconContainer $invert={false} />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('WHEN rendering with inverted orientation', () => {
      const { container } = render(<S.IconContainer $invert={true} />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
