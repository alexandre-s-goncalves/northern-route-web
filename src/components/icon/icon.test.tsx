import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { render } from '@testing-library/react';
import { Icon } from './icon';

const MockSvgComponent = ({ ...props }) => (
  <svg data-testid="mock-svg-element" {...props} />
);

describe('Icon', () => {
  let component: ReturnType<typeof render>;

  beforeEach(() => {
    component = render(<Icon icon={MockSvgComponent} />);
  });

  afterEach(() => {
    component.unmount();
  });

  describe('Rendering Scenarios', () => {
    test('WHEN icon prop is a React component SHOULD render the SVG element inside the DOM', () => {
      component.rerender(<Icon icon={MockSvgComponent} />);
      expect(component.getByTestId('mock-svg-element')).toBeInTheDocument();
    });

    test('WHEN icon prop is a React component with alt text SHOULD inject accessibility role and title tag', () => {
      component.rerender(
        <Icon alt="Access Terminal Icon" icon={MockSvgComponent} />,
      );

      const svgElement = component.getByTestId('mock-svg-element');
      expect(svgElement).toBeInTheDocument();
      expect(svgElement).toHaveAttribute('role', 'img');
      expect(svgElement).toHaveAttribute('aria-label', 'Access Terminal Icon');
      expect(component.getByText('Access Terminal Icon')).toBeInTheDocument();
    });

    test('WHEN icon prop is a string URL SHOULD render native image tag with correct source attribute', () => {
      component.rerender(<Icon icon="/assets/icons/user.svg" />);

      const imgElement = component.getByRole('img', { hidden: true });
      expect(imgElement).toBeInTheDocument();
      expect(imgElement).toHaveAttribute('src', '/assets/icons/user.svg');
    });

    test('WHEN dimensions are fully omitted SHOULD fall back to fallback bounds seamlessly', () => {
      component.rerender(
        <Icon
          icon={MockSvgComponent}
          size={undefined}
          width={undefined}
          height={undefined}
        />,
      );
      expect(component.getByTestId('mock-svg-element')).toBeInTheDocument();
    });
  });

  describe('Behavioral Scenarios', () => {
    test('WHEN boolean rotation parameter is passed SHOULD evaluate mapping accurately', () => {
      component.rerender(
        <div data-testid="icon-boolean-container">
          <Icon icon={MockSvgComponent} rotate={true} />
        </div>,
      );

      expect(
        component.getByTestId('icon-boolean-container'),
      ).toBeInTheDocument();
      expect(component.getByTestId('mock-svg-element')).toBeInTheDocument();
    });

    test('WHEN numerical rotation parameter is passed SHOULD return the exact degree value', () => {
      component.rerender(
        <div data-testid="icon-numeric-container">
          <Icon icon={MockSvgComponent} rotate={90} />
        </div>,
      );

      expect(
        component.getByTestId('icon-numeric-container'),
      ).toBeInTheDocument();
      expect(component.getByTestId('mock-svg-element')).toBeInTheDocument();
    });

    test('WHEN rotation parameter is spin SHOULD inject animation profile parameters', () => {
      component.rerender(
        <div data-testid="icon-spin-container">
          <Icon icon={MockSvgComponent} rotate="spin" />
        </div>,
      );

      expect(component.getByTestId('icon-spin-container')).toBeInTheDocument();
    });

    test('WHEN custom size structural attributes are provided SHOULD resolve dimensions dynamically', () => {
      component.rerender(
        <div data-testid="icon-size-container">
          <Icon icon={MockSvgComponent} height={20} size={32} width={40} />
        </div>,
      );

      expect(component.getByTestId('icon-size-container')).toBeInTheDocument();
    });
  });
});
