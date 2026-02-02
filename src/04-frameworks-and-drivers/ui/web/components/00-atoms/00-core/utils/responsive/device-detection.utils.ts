/* ==========================================================================
 * Device Detection Utilities
 * --------------------------------------------------------------------------
 * Client-side device detection helpers.
 * Note: These are client-side only (browser environment).
 * ========================================================================== */

import { BREAKPOINTS } from '../../tokens/breakpoints.constants';
import type { Breakpoint } from '../../tokens/breakpoints.constants';

/**
 * Check if running in browser environment
 */
export const isBrowser = (): boolean => {
  return typeof window !== 'undefined';
};

/**
 * Get current viewport width (client-side only)
 * @throws Error if called server-side
 */
export const getViewportWidth = (): number => {
  if (!isBrowser()) {
    throw new Error('getViewportWidth() can only be called in browser environment');
  }
  return window.innerWidth;
};

/**
 * Get current viewport height (client-side only)
 */
export const getViewportHeight = (): number => {
  if (!isBrowser()) {
    throw new Error('getViewportHeight() can only be called in browser environment');
  }
  return window.innerHeight;
};

/**
 * Get current breakpoint based on viewport width (client-side)
 */
export const getCurrentBreakpoint = (): Breakpoint => {
  const width = getViewportWidth();
  
  if (width >= BREAKPOINTS.XXL) return 'XXL';
  if (width >= BREAKPOINTS.XL) return 'XL';
  if (width >= BREAKPOINTS.LG) return 'LG';
  if (width >= BREAKPOINTS.MD) return 'MD';
  if (width >= BREAKPOINTS.SM) return 'SM';
  return 'XS';
};

/**
 * Check if current viewport is mobile (< 768px)
 */
export const isMobile = (): boolean => {
  const width = getViewportWidth();
  return width < BREAKPOINTS.MD;
};

/**
 * Check if current viewport is tablet (768px - 1023px)
 */
export const isTablet = (): boolean => {
  const width = getViewportWidth();
  return width >= BREAKPOINTS.MD && width < BREAKPOINTS.LG;
};

/**
 * Check if current viewport is desktop (≥ 1024px)
 */
export const isDesktop = (): boolean => {
  const width = getViewportWidth();
  return width >= BREAKPOINTS.LG;
};

/**
 * Check if device supports touch
 */
export const isTouchDevice = (): boolean => {
  if (!isBrowser()) return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

/**
 * Check if device supports hover
 */
export const isHoverDevice = (): boolean => {
  if (!isBrowser()) return false;
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
};

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  if (!isBrowser()) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Check if user prefers dark mode
 */
export const prefersDarkMode = (): boolean => {
  if (!isBrowser()) return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

/**
 * Check if device has high pixel density (retina)
 */
export const isRetina = (): boolean => {
  if (!isBrowser()) return false;
  return window.devicePixelRatio >= 2;
};

/**
 * Get device pixel ratio
 */
export const getDevicePixelRatio = (): number => {
  if (!isBrowser()) return 1;
  return window.devicePixelRatio;
};

/**
 * Check if device is iOS
 */
export const isIOS = (): boolean => {
  if (!isBrowser()) return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
};

/**
 * Check if device is Android
 */
export const isAndroid = (): boolean => {
  if (!isBrowser()) return false;
  return /Android/.test(navigator.userAgent);
};

/**
 * Check if running in standalone mode (PWA)
 */
export const isStandalone = (): boolean => {
  if (!isBrowser()) return false;
  return window.matchMedia('(display-mode: standalone)').matches || 
         (navigator as any).standalone === true;
};

/**
 * Get orientation (portrait/landscape)
 */
export const getOrientation = (): 'portrait' | 'landscape' => {
  if (!isBrowser()) return 'portrait';
  return window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
};

/**
 * Check if orientation is portrait
 */
export const isPortrait = (): boolean => {
  return getOrientation() === 'portrait';
};

/**
 * Check if orientation is landscape
 */
export const isLandscape = (): boolean => {
  return getOrientation() === 'landscape';
};