/* ==========================================================================
 * Unit & Measurement Constants
 * --------------------------------------------------------------------------
 * Base units, scales, ratios, and measurement constants.
 * PURE CONSTANTS ONLY.
 * ========================================================================== */

export const UNIT = {
  /** Pixels (absolute unit) */
  PX: 'px',
  /** Root em (relative to root font size) */
  REM: 'rem',
  /** Element em (relative to parent font size) */
  EM: 'em',
  /** Percentage (relative to parent) */
  PERCENT: '%',
  /** Viewport height (relative to viewport height) */
  VH: 'vh',
  /** Viewport width (relative to viewport width) */
  VW: 'vw',
  /** Viewport minimum (relative to smaller viewport dimension) */
  VMIN: 'vmin',
  /** Viewport maximum (relative to larger viewport dimension) */
  VMAX: 'vmax',
  /** Character width (relative to character "0" width) */
  CH: 'ch',
  /** Root element font size (relative to root) */
  REM_FALLBACK: 'rem',
} as const;

/** Base font size in pixels (16px = 1rem) */
export const BASE_FONT_SIZE = 16;

/** 4px grid system base for consistent spacing */
export const GRID_BASE = 4;

/** Design system ratios for harmonious scaling */
export const RATIO = {
  /** Golden ratio (φ ≈ 1.618) - most harmonious */
  GOLDEN: 1.618,
  /** Minor second (1.067) - subtle */
  MINOR_SECOND: 1.067,
  /** Major second (1.125) - subtle but noticeable */
  MAJOR_SECOND: 1.125,
  /** Minor third (1.2) - balanced, commonly used */
  MINOR_THIRD: 1.2,
  /** Major third (1.25) - strong hierarchy */
  MAJOR_THIRD: 1.25,
  /** Perfect fourth (1.333) - classic typographic scale */
  PERFECT_FOURTH: 1.333,
  /** Augmented fourth (1.414) - √2, dramatic */
  AUGMENTED_FOURTH: 1.414,
  /** Perfect fifth (1.5) - musical, strong */
  PERFECT_FIFTH: 1.5,
  /** Minor sixth (1.6) - approaching golden */
  MINOR_SIXTH: 1.6,
  /** Major sixth (1.667) - approaching golden */
  MAJOR_SIXTH: 1.667,
  /** Minor seventh (1.778) - dramatic */
  MINOR_SEVENTH: 1.778,
  /** Major seventh (1.875) - very dramatic */
  MAJOR_SEVENTH: 1.875,
  /** Octave (2) - double, most dramatic */
  OCTAVE: 2,
} as const;

/** Common aspect ratios for media and containers */
export const ASPECT_RATIO = {
  /** Square (1:1) */
  SQUARE: 1,
  /** Video (16:9) - standard video */
  VIDEO: 16 / 9,
  /** Widescreen (16:10) - cinema, some laptops */
  WIDESCREEN: 16 / 10,
  /** Ultra-wide (21:9) - cinematic */
  ULTRA_WIDE: 21 / 9,
  /** Portrait (9:16) - mobile portrait */
  PORTRAIT: 9 / 16,
  /** Instagram portrait (4:5) */
  INSTAGRAM_PORTRAIT: 4 / 5,
  /** Instagram landscape (1.91:1) */
  INSTAGRAM_LANDSCAPE: 1.91,
  /** Facebook post (1.91:1) */
  FACEBOOK_POST: 1.91,
  /** Twitter post (16:9) */
  TWITTER_POST: 16 / 9,
  /** LinkedIn post (1.91:1) */
  LINKEDIN_POST: 1.91,
  /** A4 paper (1.414:1) - ISO 216 */
  A4_PAPER: 1.414,
  /** Golden rectangle (1.618:1) */
  GOLDEN_RECTANGLE: 1.618,
} as const;

/** CSS environment variables for safe areas (notch, home indicator) */
export const SAFE_AREA = {
  /** Top safe area (notch) */
  TOP: 'env(safe-area-inset-top)',
  /** Bottom safe area (home indicator) */
  BOTTOM: 'env(safe-area-inset-bottom)',
  /** Left safe area */
  LEFT: 'env(safe-area-inset-left)',
  /** Right safe area */
  RIGHT: 'env(safe-area-inset-right)',
} as const;

/** Common component size presets */
export const COMPONENT_SIZES = {
  /** Icon sizes */
  ICON: {
    XS: 12,
    SM: 16,
    MD: 20,
    LG: 24,
    XL: 32,
    XXL: 40,
  },
  
  /** Avatar sizes */
  AVATAR: {
    XS: 24,
    SM: 32,
    MD: 40,
    LG: 48,
    XL: 56,
    XXL: 64,
  },
  
  /** Button heights */
  BUTTON_HEIGHT: {
    XS: 24,
    SM: 32,
    MD: 40,
    LG: 48,
    XL: 56,
  },
  
  /** Input/textarea heights */
  INPUT_HEIGHT: {
    XS: 32,
    SM: 40,
    MD: 48,
    LG: 56,
  },
  
  /** Switch/toggle sizes */
  SWITCH: {
    SM: { width: 40, height: 20 },
    MD: { width: 48, height: 24 },
    LG: { width: 56, height: 28 },
  },
  
  /** Checkbox/radio sizes */
  CHECKBOX: {
    SM: 16,
    MD: 20,
    LG: 24,
  },
} as const;

export type CSSUnit = (typeof UNIT)[keyof typeof UNIT];
export type RatioKey = keyof typeof RATIO;
export type AspectRatioKey = keyof typeof ASPECT_RATIO;
export type SafeAreaKey = keyof typeof SAFE_AREA;
export type ComponentSizeCategory = keyof typeof COMPONENT_SIZES;