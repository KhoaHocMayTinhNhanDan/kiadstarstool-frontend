/* ==========================================================================
 * Breakpoint Constants
 * --------------------------------------------------------------------------
 * Viewport breakpoint values in pixels.
 * PURE CONSTANTS ONLY.
 * ========================================================================== */

export const BREAKPOINTS = {
  /** Extra small: 0px - 374px (mobile small) */
  XS: 0,
  /** Small: 375px - 767px (mobile) */
  SM: 375,
  /** Medium: 768px - 1023px (tablet portrait) */
  MD: 768,
  /** Large: 1024px - 1279px (tablet landscape / desktop small) */
  LG: 1024,
  /** Extra large: 1280px - 1535px (desktop) */
  XL: 1280,
  /** 2X large: 1536px+ (desktop large) */
  XXL: 1536,
} as const;

/** Common device widths for reference (in pixels) */
export const DEVICE_WIDTHS = {
  // iPhone
  IPHONE_SE: 320,           // iPhone SE (1st, 2nd gen)
  IPHONE_8: 375,            // iPhone 6/7/8, X, XS, 11 Pro, 12/13 mini
  IPHONE_8_PLUS: 414,       // iPhone 6/7/8 Plus
  IPHONE_12_PRO_MAX: 428,   // iPhone 12/13 Pro Max, 14 Plus
  
  // iPad
  IPAD_MINI: 768,           // iPad Mini (portrait)
  IPAD: 768,                // iPad (portrait)
  IPAD_PRO_11: 834,         // iPad Pro 11" (portrait)
  IPAD_PRO_12_9: 1024,      // iPad Pro 12.9" (portrait)
  
  // Android
  ANDROID_SMALL: 360,       // Small Android phones
  ANDROID_MEDIUM: 412,      // Medium Android phones
  ANDROID_LARGE: 480,       // Large Android phones
  
  // Desktop
  DESKTOP_SMALL: 1024,      // Small desktop/laptop
  DESKTOP_MEDIUM: 1280,     // Standard desktop/laptop
  DESKTOP_LARGE: 1440,      // Large desktop
  DESKTOP_XL: 1920,         // Extra large desktop/HD
} as const;

/** Breakpoint ranges (min-width, max-width) */
export const BREAKPOINT_RANGES = {
  XS: { min: BREAKPOINTS.XS, max: BREAKPOINTS.SM - 1 },
  SM: { min: BREAKPOINTS.SM, max: BREAKPOINTS.MD - 1 },
  MD: { min: BREAKPOINTS.MD, max: BREAKPOINTS.LG - 1 },
  LG: { min: BREAKPOINTS.LG, max: BREAKPOINTS.XL - 1 },
  XL: { min: BREAKPOINTS.XL, max: BREAKPOINTS.XXL - 1 },
  XXL: { min: BREAKPOINTS.XXL, max: Number.MAX_SAFE_INTEGER },
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;
export type DeviceWidth = keyof typeof DEVICE_WIDTHS;
export type BreakpointRangeKey = keyof typeof BREAKPOINT_RANGES;