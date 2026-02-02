/* ==========================================================================
 * Validation Utilities
 * --------------------------------------------------------------------------
 * Pure validation functions for design system values.
 * ========================================================================== */

import { BREAKPOINTS,  } from '../tokens/breakpoints.constants';
import { UNIT } from '../tokens/units.constants';
import type {CSSUnit } from '../tokens/units.constants';
import type { Breakpoint} from '../tokens/breakpoints.constants'

/**
 * Check if value is a valid breakpoint key
 * @example isValidBreakpoint('MD') → true
 * @example isValidBreakpoint('INVALID') → false
 */
export const isValidBreakpoint = (key: string): key is Breakpoint => {
  return key in BREAKPOINTS;
};

/**
 * Check if value is a valid CSS unit
 * @example isValidCSSUnit('rem') → true
 */
export const isValidCSSUnit = (unit: string): unit is CSSUnit => {
  return Object.values(UNIT).includes(unit as any);
};

/**
 * Check if value is a valid CSS color (hex, rgb, rgba, hsl, hsla, named)
 * @example isValidColor('#ffffff') → true
 * @example isValidColor('rgb(255, 255, 255)') → true
 * @example isValidColor('invalid') → false
 */
export const isValidColor = (color: string): boolean => {
  // Create temporary element to test color
  const element = document.createElement('div');
  element.style.color = color;
  return element.style.color !== '';
};

/**
 * Check if value is a valid number (finite, not NaN)
 * @example isValidNumber(42) → true
 * @example isValidNumber(NaN) → false
 * @example isValidNumber(Infinity) → false
 */
export const isValidNumber = (value: unknown): value is number => {
  return typeof value === 'number' && Number.isFinite(value);
};

/**
 * Check if value is a valid integer
 * @example isValidInteger(42) → true
 * @example isValidInteger(42.5) → false
 */
export const isValidInteger = (value: unknown): value is number => {
  return isValidNumber(value) && Number.isInteger(value);
};

/**
 * Check if value is a positive number
 * @example isPositive(42) → true
 * @example isPositive(-42) → false
 */
export const isPositive = (value: number): boolean => {
  return value > 0;
};

/**
 * Check if value is a non-negative number (≥ 0)
 * @example isNonNegative(42) → true
 * @example isNonNegative(0) → true
 * @example isNonNegative(-42) → false
 */
export const isNonNegative = (value: number): boolean => {
  return value >= 0;
};

/**
 * Check if value is within range (inclusive)
 * @example isWithinRange(5, 0, 10) → true
 */
export const isWithinRange = (value: number, min: number, max: number): boolean => {
  return value >= min && value <= max;
};

/**
 * Check if value is a valid percentage (0-100)
 * @example isValidPercentage(50) → true
 * @example isValidPercentage(150) → false
 */
export const isValidPercentage = (value: number): boolean => {
  return isWithinRange(value, 0, 100);
};

/**
 * Check if value is a valid opacity (0-1)
 * @example isValidOpacity(0.5) → true
 * @example isValidOpacity(1.5) → false
 */
export const isValidOpacity = (value: number): boolean => {
  return isWithinRange(value, 0, 1);
};

/**
 * Check if value is a valid z-index (integer)
 * @example isValidZIndex(100) → true
 * @example isValidZIndex(100.5) → false
 */
export const isValidZIndex = (value: number): boolean => {
  return isValidInteger(value);
};

/**
 * Check if object has required properties
 * @example hasRequiredProps({a: 1, b: 2}, ['a', 'b']) → true
 * @example hasRequiredProps({a: 1}, ['a', 'b']) → false
 */
export const hasRequiredProps = <T extends object>(
  obj: T,
  requiredProps: (keyof T)[]
): boolean => {
  return requiredProps.every(prop => prop in obj);
};

/**
 * Check if value is not null or undefined
 */
export const isDefined = <T>(value: T | null | undefined): value is T => {
  return value !== null && value !== undefined;
};

/**
 * Check if string is not empty
 */
export const isNonEmptyString = (value: string): boolean => {
  return value.trim().length > 0;
};