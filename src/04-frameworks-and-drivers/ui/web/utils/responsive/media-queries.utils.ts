import { BREAKPOINTS } from '../../00-design-system/00-atoms/00-core/tokens-constants';

type BreakpointKey = keyof typeof BREAKPOINTS;

/**
 * Generates a `min-width` media query string.
 * Useful for applying styles from a certain breakpoint and up.
 * @param key The breakpoint key (e.g., 'sm', 'md').
 * @returns A media query string.
 * @example up('md') => '@media (min-width: 768px)'
 */
export const up = (key: BreakpointKey) => `@media (min-width: ${BREAKPOINTS[key]}px)`;

/**
 * Generates a `max-width` media query string.
 * Useful for applying styles up to a certain breakpoint.
 * Note: It uses a value just below the next breakpoint to avoid overlap.
 * @param key The breakpoint key (e.g., 'sm', 'md').
 * @returns A media query string.
 * @example down('md') => '@media (max-width: 767.98px)'
 */
export const down = (key: BreakpointKey) => `@media (max-width: ${BREAKPOINTS[key] - 0.02}px)`;

/**
 * Generates a media query for a specific range between two breakpoints.
 * @param start The starting breakpoint key.
 * @param end The ending breakpoint key.
 * @returns A media query string for the specified range.
 * @example between('sm', 'lg') => '@media (min-width: 640px) and (max-width: 1023.98px)'
 */
export const between = (start: BreakpointKey, end: BreakpointKey) =>
  `@media (min-width: ${BREAKPOINTS[start]}px) and (max-width: ${BREAKPOINTS[end] - 0.02}px)`;

/**
 * Generates a media query for a single breakpoint range.
 * @param key The breakpoint key.
 * @returns A media query string for that specific breakpoint range.
 * @example only('md') => '@media (min-width: 768px) and (max-width: 1023.98px)'
 */
export const only = (key: BreakpointKey) => {
  const keys = Object.keys(BREAKPOINTS) as BreakpointKey[];
  const keyIndex = keys.indexOf(key);
  const nextKey = keys[keyIndex + 1];

  return nextKey ? between(key, nextKey) : up(key);
};