/* ==========================================================================
 * Math Utilities for Design Calculations
 * --------------------------------------------------------------------------
 * Pure math functions for design system calculations.
 * ========================================================================== */

/**
 * Round to specified decimals (design-safe, handles floating point)
 * @example round(1.23456, 2) → 1.23
 */
export const round = (value: number, decimals: number = 2): number => {
  const factor = Math.pow(10, decimals);
  return Math.round((value + Number.EPSILON) * factor) / factor;
};

/**
 * Clamp a value between min and max
 * @example clamp(5, 0, 10) → 5
 * @example clamp(-5, 0, 10) → 0
 * @example clamp(15, 0, 10) → 10
 */
export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

/**
 * Linear interpolation between two values
 * @example lerp(0, 100, 0.5) → 50
 */
export const lerp = (start: number, end: number, t: number): number => {
  return start + (end - start) * t;
};

/**
 * Inverse linear interpolation (find t between start and end)
 * @example inverseLerp(0, 100, 50) → 0.5
 */
export const inverseLerp = (start: number, end: number, value: number): number => {
  return (value - start) / (end - start);
};

/**
 * Normalize value to 0-1 range
 * @example normalize(50, 0, 100) → 0.5
 */
export const normalize = (value: number, min: number, max: number): number => {
  return inverseLerp(min, max, value);
};

/**
 * Map value from one range to another
 * @example mapRange(50, 0, 100, 0, 1) → 0.5
 */
export const mapRange = (
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number => {
  const t = inverseLerp(inMin, inMax, value);
  return lerp(outMin, outMax, t);
};

/**
 * Check if number is within range (inclusive)
 * @example inRange(5, 0, 10) → true
 * @example inRange(5, 10, 20) → false
 */
export const inRange = (value: number, min: number, max: number): boolean => {
  return value >= min && value <= max;
};

/**
 * Calculate percentage of value within range
 * @example percentage(50, 0, 100) → 50
 */
export const percentage = (value: number, min: number, max: number): number => {
  return ((value - min) / (max - min)) * 100;
};

/**
 * Convert degrees to radians
 * @example degToRad(180) → Math.PI
 */
export const degToRad = (degrees: number): number => {
  return degrees * (Math.PI / 180);
};

/**
 * Convert radians to degrees
 * @example radToDeg(Math.PI) → 180
 */
export const radToDeg = (radians: number): number => {
  return radians * (180 / Math.PI);
};

/**
 * Calculate average of numbers
 * @example average(1, 2, 3, 4) → 2.5
 */
export const average = (...numbers: number[]): number => {
  return numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
};

/**
 * Calculate sum of numbers
 * @example sum(1, 2, 3, 4) → 10
 */
export const sum = (...numbers: number[]): number => {
  return numbers.reduce((total, num) => total + num, 0);
};

/**
 * Calculate product of numbers
 * @example product(1, 2, 3, 4) → 24
 */
export const product = (...numbers: number[]): number => {
  return numbers.reduce((total, num) => total * num, 1);
};