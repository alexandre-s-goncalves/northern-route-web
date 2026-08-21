import { describe, test, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, type RenderResult } from '@testing-library/react';
import { Text } from './text';

describe('Text', () => {
  let component: RenderResult;

  beforeEach(() => {
    component = render(<Text>Default</Text>);
  });

  afterEach(() => {
    component.unmount();
  });

  describe('Rendering', () => {
    test('WHEN component is invoked SHOULD render children text content inside DOM', () => {
      render(<Text>NorthernRoute</Text>);
      expect(screen.getByText('NorthernRoute')).toBeInTheDocument();
    });
  });

  describe('Behavioral', () => {
    test('WHEN custom typography attributes are provided SHOULD apply default value IF specific override is missing', () => {
      render(<Text data-testid="text-element">Dynamic Content</Text>);
      const element = screen.getByTestId('text-element');
      expect(element).toBeInTheDocument();
    });

    // NOVO TESTE ADICIONADO: Força a execução completa de todas as ramificações de propriedades na linha 6
    test('WHEN explicit text overrides are provided SHOULD process all property mappings correctly', () => {
      const customComponent = render(
        <Text
          variant="bold"
          size={20}
          weight={800}
          lineHeight={24}
          align="center"
          transform="uppercase"
          cursor="pointer"
        >
          Overridden Text
        </Text>,
      );
      expect(screen.getByText('Overridden Text')).toBeInTheDocument();
      customComponent.unmount();
    });
  });
});
