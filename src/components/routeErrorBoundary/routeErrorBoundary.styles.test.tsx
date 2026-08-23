import { describe, expect, test } from 'vitest';
import { render } from '@testing-library/react';
import 'jest-styled-components';
import * as S from './routeErrorBoundary.styles';

describe('RouteErrorBoundary.styles', () => {
  describe('ActionWrapper SHOULD match snapshot', () => {
    test('standard structural dimensions design layout render', () => {
      const { container } = render(<S.ActionWrapper />);
      expect(container).toMatchSnapshot();
    });
  });

  describe('Container SHOULD match snapshot', () => {
    test('centered background canvas layout configuration render', () => {
      const { container } = render(<S.Container />);
      expect(container).toMatchSnapshot();
    });
  });

  describe('Headline SHOULD match snapshot', () => {
    test('typography style constraints validation render', () => {
      const { container } = render(<S.Headline />);
      expect(container).toMatchSnapshot();
    });
  });
});
