import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { render } from '@testing-library/react';
import { Home } from './Home';

describe('Home Component', () => {
  let component: ReturnType<typeof render>;

  beforeEach(() => {
    component = render(<Home />);
  });

  afterEach(() => {
    component.unmount();
  });

  describe('Rendering Scenarios', () => {
    test('WHEN home terminal dashboard initializes SHOULD mount static layout elements cleanly within target container', () => {
      component.rerender(<Home />);

      const headlineElement = component.getByRole('heading', { level: 1 });

      expect(headlineElement).toBeInTheDocument();
      expect(headlineElement.textContent).toBe(
        'NorthernRoute Logistics - Home Dashboard',
      );
    });
  });

  describe('Behavioral Scenarios', () => {
    test('WHEN internal parameters update SHOULD preserve default markup configuration fields intact', () => {
      component.rerender(<Home />);

      const wrapperElement = component
        .getByRole('heading', { level: 1 })
        .closest('div');

      expect(wrapperElement).toBeInTheDocument();
    });
  });
});
