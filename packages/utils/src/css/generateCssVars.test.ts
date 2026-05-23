import { describe, expect, it, vi } from 'vitest';

import { generateCssVars } from './generateCssVars';

vi.mock('../assert/isDefinedAndNotNull', () => ({
  isDefinedAndNotNull: (value: unknown) => value !== undefined && value !== null,
}));

describe('generateCssVars', () => {
  // ─── Prefix normalization ───────────────────────────────────────────────────

  describe('prefix normalization', () => {
    it('adds -- prefix when it is missing', () => {
      const result = generateCssVars({ prefix: 'color', tokensObj: { primary: '#fff' } });
      expect(result).toContain('--color-primary');
    });

    it('does not duplicate -- when prefix already starts with --', () => {
      const result = generateCssVars({ prefix: '--color', tokensObj: { primary: '#fff' } });
      expect(result).not.toContain('----color');
      expect(result).toContain('--color-primary');
    });
  });

  // ─── Flat token objects ─────────────────────────────────────────────────────

  describe('flat token objects', () => {
    it('generates a single CSS variable for a string value', () => {
      const result = generateCssVars({ prefix: 'color', tokensObj: { primary: '#fff' } });
      expect(result).toBe('--color-primary: #fff;\n');
    });

    it('generates a single CSS variable for a numeric value', () => {
      const result = generateCssVars({ prefix: 'spacing', tokensObj: { sm: 4 } });
      expect(result).toBe('--spacing-sm: 4;\n');
    });

    it('generates multiple CSS variables for multiple flat keys', () => {
      const result = generateCssVars({
        prefix: 'color',
        tokensObj: { primary: '#fff', secondary: '#000' },
      });
      expect(result).toContain('--color-primary: #fff;\n');
      expect(result).toContain('--color-secondary: #000;\n');
    });

    it('preserves numeric zero as a valid value', () => {
      const result = generateCssVars({ prefix: 'spacing', tokensObj: { none: 0 } });
      expect(result).toBe('--spacing-none: 0;\n');
    });

    it('preserves empty string as a valid value', () => {
      const result = generateCssVars({ prefix: 'font', tokensObj: { family: '' } });
      expect(result).toBe('--font-family: ;\n');
    });
  });

  // ─── Nested token objects ───────────────────────────────────────────────────

  describe('nested token objects', () => {
    it('generates CSS variables for one level of nesting', () => {
      const result = generateCssVars({
        prefix: 'color',
        tokensObj: {
          brand: {
            primary: '#fff',
            secondary: '#000',
          },
        },
      });
      expect(result).toContain('--color-brand-primary: #fff;\n');
      expect(result).toContain('--color-brand-secondary: #000;\n');
    });

    it('generates CSS variables for deeply nested objects', () => {
      const result = generateCssVars({
        prefix: 'theme',
        tokensObj: {
          color: {
            brand: {
              primary: {
                base: '#3366ff',
              },
            },
          },
        },
      });
      expect(result).toBe('--theme-color-brand-primary-base: #3366ff;\n');
    });

    it('handles mixed flat and nested keys at the same level', () => {
      const result = generateCssVars({
        prefix: 'theme',
        tokensObj: {
          flat: 'value',
          nested: { key: 'nestedValue' },
        },
      });
      expect(result).toContain('--theme-flat: value;\n');
      expect(result).toContain('--theme-nested-key: nestedValue;\n');
    });
  });

  // ─── Edge cases ─────────────────────────────────────────────────────────────

  describe('edge cases', () => {
    it('returns an empty string for an empty token object', () => {
      const result = generateCssVars({ prefix: 'color', tokensObj: {} });
      expect(result).toBe('');
    });

    it('ignores null values', () => {
      const result = generateCssVars({
        prefix: 'color',
        // @ts-expect-error — intentionally passing null to test runtime behaviour
        tokensObj: { primary: null },
      });
      expect(result).toBe('');
    });

    it('ignores undefined values', () => {
      const result = generateCssVars({
        prefix: 'color',
        // @ts-expect-error — intentionally passing undefined to test runtime behaviour
        tokensObj: { primary: undefined },
      });
      expect(result).toBe('');
    });

    it('does not include inherited prototype properties', () => {
      const proto = { inherited: 'should-not-appear' };
      const tokensObj = Object.create(proto) as Record<string, string>;
      tokensObj.own = 'value';

      const result = generateCssVars({ prefix: 'color', tokensObj });
      expect(result).not.toContain('inherited');
      expect(result).toContain('--color-own: value;\n');
    });

    it('handles keys with special characters in the value', () => {
      const result = generateCssVars({
        prefix: 'font',
        tokensObj: { family: '"Helvetica Neue", Arial, sans-serif' },
      });
      expect(result).toBe('--font-family: "Helvetica Neue", Arial, sans-serif;\n');
    });

    it('correctly concatenates all variables without extra whitespace between them', () => {
      const result = generateCssVars({
        prefix: 'spacing',
        tokensObj: { xs: 2, sm: 4, md: 8 },
      });
      const lines = result.split('\n').filter(Boolean);
      expect(lines).toHaveLength(3);
    });
  });

  // ─── Output format ──────────────────────────────────────────────────────────

  describe('output format', () => {
    it('ends each variable declaration with a semicolon and newline', () => {
      const result = generateCssVars({ prefix: 'color', tokensObj: { primary: '#fff' } });
      expect(result).toMatch(/^--[\w-]+: .+;\n$/);
    });

    it('returns a string type', () => {
      const result = generateCssVars({ prefix: 'color', tokensObj: { primary: '#fff' } });
      expect(typeof result).toBe('string');
    });
  });
});
