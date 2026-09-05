import { describe, expect, test, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import EyeIcon from 'assets/icons/iEye.svg?react';
import { IconButton } from './iconButton';

describe('IconButton Component Behavioral & Rendering Gates', () => {
  describe('Behavior', () => {
    test('should execute onClick callback securely when triggered by user interaction', () => {
      const handleClick = vi.fn();
      render(
        <IconButton
          icon={EyeIcon}
          onClick={handleClick}
          testId="pure-icon-btn"
        />,
      );

      const button = screen.getByTestId('pure-icon-btn');
      fireEvent.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test('should respect native disabled HTML element boundaries to block click actions', () => {
      const handleClick = vi.fn();
      render(
        <IconButton
          disabled
          icon={EyeIcon}
          onClick={handleClick}
          testId="disabled-btn"
        />,
      );

      const button = screen.getByTestId('disabled-btn');
      fireEvent.click(button);

      expect(handleClick).not.toHaveBeenCalled();
      expect(button).toBeDisabled();
    });
  });

  describe('Rendering', () => {
    test('should render the atomic icon component without any text node strings inside DOM', () => {
      render(<IconButton icon={EyeIcon} testId="pure-icon-btn" />);

      const button = screen.getByTestId('pure-icon-btn');

      expect(button).toBeInTheDocument();
      expect(button.textContent).toBe('');
    });

    test('should apply target HTML properties dynamically via spread attributes mapping', () => {
      render(
        <IconButton
          aria-label="Toggle input mask visibility"
          icon={EyeIcon}
          type="submit"
        />,
      );

      const button = screen.getByRole('button');

      expect(button).toHaveAttribute('type', 'submit');
      expect(button).toHaveAttribute(
        'aria-label',
        'Toggle input mask visibility',
      );
    });
  });
});
