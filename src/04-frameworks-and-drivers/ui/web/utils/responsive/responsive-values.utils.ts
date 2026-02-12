import type { CSSObject } from '@emotion/react';
import { BREAKPOINTS } from '../../00-design-system/00-atoms/00-core/tokens-constants';

type BreakpointKey = keyof typeof BREAKPOINTS;
type ResponsiveObject<T> = {
  base: T;
} & Partial<Record<BreakpointKey, T>>;

/**
 * Creates a responsive CSS object for a single property.
 * This is useful for applying different values at different breakpoints within Emotion.
 *
 * @param property The CSS property to apply the values to (e.g., 'padding', 'fontSize').
 * @param values An object where keys are breakpoint names (`base` is required).
 * @returns A CSSObject for use with Emotion's `css` prop or `styled`.
 *
 * @example
 * // css={responsiveProperty('fontSize', { base: '14px', md: '16px' })}
 * // returns:
 * // {
 * //   fontSize: '14px',
 * //   '@media (min-width: 768px)': { fontSize: '16px' }
 * // }
 */
export const responsiveProperty = <T extends string | number>(
  property: keyof React.CSSProperties,
  values: ResponsiveObject<T>
): CSSObject => {
  const { base, ...rest } = values;
  const styles: CSSObject = {
    [property]: base,
  };

  for (const key in rest) {
    styles[`@media (min-width: ${BREAKPOINTS[key as BreakpointKey]}px)`] = {
      [property]: rest[key as BreakpointKey],
    };
  }

  return styles;
};