/* ==========================================================================
 * Media Query Utilities
 * --------------------------------------------------------------------------
 * Functions to generate CSS media queries.
 * ========================================================================== */

import { BREAKPOINTS } from '../../tokens/breakpoints.constants';
import type { Breakpoint } from '../../tokens/breakpoints.constants';

/**
 * Generate min-width media query
 * @example minWidth('MD') → "@media (min-width: 768px)"
 */
export const minWidth = (breakpoint: Breakpoint): string => {
  const width = BREAKPOINTS[breakpoint];
  return `@media (min-width: ${width}px)`;
};

/**
 * Generate max-width media query
 * @example maxWidth('MD') → "@media (max-width: 767px)"
 */
export const maxWidth = (breakpoint: Breakpoint): string => {
  const width = BREAKPOINTS[breakpoint];
  const maxWidth = width > 0 ? width - 1 : 0;
  return `@media (max-width: ${maxWidth}px)`;
};

/**
 * Generate between breakpoints media query
 * @example between('SM', 'MD') → "@media (min-width: 375px) and (max-width: 767px)"
 */
export const between = (min: Breakpoint, max: Breakpoint): string => {
  const minWidth = BREAKPOINTS[min];
  const maxWidth = BREAKPOINTS[max] - 1;
  return `@media (min-width: ${minWidth}px) and (max-width: ${maxWidth}px)`;
};

/**
 * Generate orientation media query
 * @example orientation('portrait') → "@media (orientation: portrait)"
 */
export const orientation = (type: 'portrait' | 'landscape'): string => {
  return `@media (orientation: ${type})`;
};

/**
 * Generate reduced motion media query
 */
export const reducedMotion = (): string => {
  return '@media (prefers-reduced-motion: reduce)';
};

/**
 * Generate dark mode media query
 */
export const darkMode = (): string => {
  return '@media (prefers-color-scheme: dark)';
};

/**
 * Generate hover-capable device media query
 */
export const hoverSupported = (): string => {
  return '@media (hover: hover) and (pointer: fine)';
};

/**
 * Generate touch device media query
 */
export const touchDevice = (): string => {
  return '@media (hover: none) and (pointer: coarse)';
};

/**
 * Pre-defined media queries for common breakpoints
 */
export const MEDIA_QUERIES = {
  // Mobile
  MOBILE: maxWidth('MD'),
  MOBILE_ONLY: between('XS', 'MD'),
  
  // Tablet
  TABLET: between('MD', 'LG'),
  TABLET_PORTRAIT: `${between('MD', 'LG')} and (orientation: portrait)`,
  TABLET_LANDSCAPE: `${between('MD', 'LG')} and (orientation: landscape)`,
  
  // Desktop
  DESKTOP: minWidth('LG'),
  DESKTOP_SMALL: between('LG', 'XL'),
  DESKTOP_LARGE: minWidth('XL'),
  DESKTOP_XL: minWidth('XXL'),
  
  // Device capabilities
  REDUCED_MOTION: reducedMotion(),
  DARK_MODE: darkMode(),
  HOVER_SUPPORTED: hoverSupported(),
  TOUCH_DEVICE: touchDevice(),
} as const;