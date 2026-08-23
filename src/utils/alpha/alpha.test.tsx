import { describe, expect, test } from 'vitest';
import { alpha } from './alpha';
import { colors } from 'resources/colors';

describe('alpha', () => {
  describe('Behavioral Scenarios', () => {
    test('WHEN percentage bounds are exceeded SHOULD clamp opacity accurately between 0 and 1', () => {
      expect(alpha('#ffffff', 150)).toBe('rgba(255, 255, 255, 1)');
      expect(alpha('#ffffff', -50)).toBe('rgba(255, 255, 255, 0)');
    });

    test('WHEN percentage input is standard SHOULD calculate fractional opacity value accurately', () => {
      expect(alpha('#000000', 40)).toBe('rgba(0, 0, 0, 0.4)');
      expect(alpha('#ef7e18', 75)).toBe('rgba(239, 126, 24, 0.75)');
    });

    test('WHEN using global color token variables SHOULD compile valid structural rgba combinations dynamically', () => {
      expect(alpha(colors['orange-500'], 30)).toBe('rgba(255, 139, 34, 0.3)');
      expect(alpha(colors['neutral-950'], 65)).toBe('rgba(36, 38, 37, 0.65)');
      expect(alpha(colors['error-500'], 10)).toBe('rgba(224, 76, 54, 0.1)');
    });
  });

  describe('Parsing Scenarios', () => {
    test('WHEN hex string contains hash character SHOULD strip symbol and parse successfully', () => {
      expect(alpha('#006b3f', 10)).toBe('rgba(0, 107, 63, 0.1)');
    });

    test('WHEN hex string omits hash character SHOULD process raw string characters successfully', () => {
      expect(alpha('242625', 65)).toBe('rgba(36, 38, 37, 0.65)');
    });
  });
});
