// src\04-frameworks-and-drivers\ui\web\components\atoms\00-core-constants\utils\responsive\responsive-values.utils.ts
/* ==========================================================================
 * Responsive Value Utilities
 * --------------------------------------------------------------------------
 * Functions for responsive value calculations.
 * ========================================================================== */

import { BREAKPOINTS } from '../../tokens/breakpoints.constants';
import type { Breakpoint } from '../../tokens/breakpoints.constants';

/**
 * Responsive value configuration
 */
export type ResponsiveValue<T> = {
  base: T;                     // Mobile-first (XS)
  sm?: T;                     // ≥ 375px
  md?: T;                     // ≥ 768px  
  lg?: T;                     // ≥ 1024px
  xl?: T;                     // ≥ 1280px
  xxl?: T;                    // ≥ 1536px
};

/**
 * Generate responsive CSS values object
 * @example getResponsiveValues({ base: 16, md: 20, lg: 24 })
 */
export const getResponsiveValues = <T>(config: ResponsiveValue<T>): Record<string, T> => {
  const result: Record<string, T> = {};
  
  // Base value (mobile-first)
  result['--value-xs'] = config.base;
  
  // Override for each breakpoint
  if (config.sm !== undefined) result['--value-sm'] = config.sm;
  if (config.md !== undefined) result['--value-md'] = config.md;
  if (config.lg !== undefined) result['--value-lg'] = config.lg;
  if (config.xl !== undefined) result['--value-xl'] = config.xl;
  if (config.xxl !== undefined) result['--value-xxl'] = config.xxl;
  
  return result;
};

/**
 * Calculate fluid typography value
 * @example fluidTypography(16, 24, 375, 1280) → "calc(1rem + 0.5vw)"
 */
export const fluidTypography = (
  minSize: number,
  maxSize: number,
  minWidth: number = BREAKPOINTS.SM,
  maxWidth: number = BREAKPOINTS.XL
): string => {
  const minRem = minSize / 16;
  const maxRem = maxSize / 16;
  const slope = (maxSize - minSize) / (maxWidth - minWidth);
  const slopeVw = slope * 100;
  const intercept = minSize - slope * minWidth;
  const interceptRem = intercept / 16;
  
  return `clamp(${minRem}rem, ${interceptRem}rem + ${slopeVw.toFixed(2)}vw, ${maxRem}rem)`;
};

/**
 * Calculate fluid spacing value
 */
export const fluidSpacing = (
  minSpacing: number,
  maxSpacing: number,
  minWidth: number = BREAKPOINTS.SM,
  maxWidth: number = BREAKPOINTS.XL
): string => {
  return fluidTypography(minSpacing, maxSpacing, minWidth, maxWidth);
};

/**
 * Get current breakpoint based on window width
 * (Client-side only, for JavaScript logic)
 */
export const getCurrentBreakpoint = (width: number): Breakpoint => {
  if (width >= BREAKPOINTS.XXL) return 'XXL';
  if (width >= BREAKPOINTS.XL) return 'XL';
  if (width >= BREAKPOINTS.LG) return 'LG';
  if (width >= BREAKPOINTS.MD) return 'MD';
  if (width >= BREAKPOINTS.SM) return 'SM';
  return 'XS';
};