// src/04-frameworks-and-drivers/ui/web/components/00-atoms/00-core/tokens-constants.ts
/* ==========================================================================
 * Design Tokens
 * --------------------------------------------------------------------------
 * Định nghĩa các giá trị cơ bản cho hệ thống UI (Spacing, Colors, Typography...)
 * ========================================================================== */

export const SPACING = {
  none: '0px',
  xxs: '2px',
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  '2xl': '24px',
  '3xl': '32px',
  '4xl': '48px',
  '5xl': '64px',
} as const;

export type SpacingKey = keyof typeof SPACING;

export const COLORS = {
  // Brand Colors
  PRIMARY: '#2196f3',
  PRIMARY_LIGHT: '#90caf9',
  PRIMARY_DARK: '#1976d2',

  SECONDARY: '#6c757d',
  SECONDARY_DARK: '#5a6268',

  // Semantic Colors
  SUCCESS: '#2e7d32',
  SUCCESS_LIGHT: '#86efac',
  SUCCESS_DARK: '#1b5e20',

  DANGER: '#d32f2f',
  DANGER_DARK: '#c62828',
  DANGER_LIGHT: '#fca5a5',

  WARNING: '#ed6c02',
  WARNING_DARK: '#e65100',
  WARNING_LIGHT: '#ffecb3',

  INFO: '#0288d1',
  INFO_DARK: '#01579b',
  INFO_LIGHT: '#b3e5fc',

  // Neutral Colors
  LIGHT: '#f8f9fa',
  DARK: '#1e293b',
  WHITE: '#ffffff',
  BLACK: '#000000',

  /* ================= TEXT ================= */
  TEXT_PRIMARY: '#333333',
  TEXT_SECONDARY: '#4a5568',
  TEXT_MUTED: '#64748b',
  TEXT_DISABLED: '#94a3b8', // Thêm cho disabled text
  TEXT_INVERTED: '#ffffff',
  TEXT_SUCCESS: '#2e7d32',
  TEXT_DANGER: '#d32f2f',
  TEXT_WARNING: '#ed6c02',
  TEXT_INFO: '#0288d1',

  /* ================= BACKGROUND ================= */
  BACKGROUND_PAPER: '#ffffff', // Thêm cho nền component như dropdown, modal
  BACKGROUND_NEUTRAL: '#f8f9fa',
  BACKGROUND_SUBTLE: '#f0f4f8',
  BACKGROUND_PRIMARY: '#2196f3',
  BACKGROUND_SECONDARY: '#6c757d',
  BACKGROUND_SUCCESS: '#2e7d32',
  BACKGROUND_DANGER: '#d32f2f',
  BACKGROUND_WARNING: '#ed6c02',
  BACKGROUND_INFO: '#0288d1',
  BACKGROUND_light: '#f1f5f9', // Thêm cho hover state
  BACKGROUND_dark: '#e2e8f0',  // Thêm cho active state

  /* ================= NEUTRAL ================= */
  NEUTRAL: '#e0e0e0',
  NEUTRAL_LIGHT: '#e2e8f0',
  NEUTRAL_DARK: '#64748b',
  NEUTRAL_BORDER: '#cbd5e1', // Đổi từ NEUTRAL_RING cho nhất quán
  NEUTRAL_HOVER: '#f1f5f9',  // Thêm cho hover state
  NEUTRAL_ACTIVE: '#e2e8f0', // Thêm cho active state
  NEUTRAL_RING: '#cbd5e1',


  /* ================= ERROR (alias cho DANGER) ================= */
  ERROR: '#d32f2f',
  ERROR_LIGHT: '#fca5a5',
  ERROR_DARK: '#c62828',

  /* ================= DISABLED ================= */
  DISABLED: '#e0e0e0',
  DISABLED_LIGHT: '#e2e8f0',
  DISABLED_DARK: '#64748b',

  /* ================= TRANSPARENT ================= */
  TRANSPARENT: 'transparent',

  /* ================= OVERLAY ================= */
  OVERLAY_DARK: 'rgba(0, 0, 0, 0.5)',

  // BORDER COLORS
  BORDER_PRIMARY: '#2196f3',
  BORDER_SECONDARY: '#6c757d',
  BORDER_SUCCESS: '#2e7d32',
  BORDER_DANGER: '#d32f2f',
  BORDER_WARNING: '#ed6c02',
  BORDER_INFO: '#0288d1',
  

} as const;

export type ColorKey = keyof typeof COLORS;

export const RADIUS = {
  none: '0px',
  xs: '2px',
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  full: '9999px',


} as const;

export const TRANSITIONS = {
  FAST: '0.15s ease',
  NORMAL: '0.3s ease',
  SLOW: '0.5s ease',
} as const;

export const SHADOWS = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
} as const;

export const FONT_SIZES = {
  xs: '12px',
  sm: '14px',
  md: '16px',
  lg: '18px',
  xl: '20px',
  '2xl': '24px',
  '3xl': '30px',
} as const;

export const SIZES = {
  xs: '16px',
  sm: '20px',
  md: '24px',
  lg: '32px',
  xl: '48px',
  '2xl': '64px',
} as const;

export const FONT_WEIGHTS = {
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

// Thêm TYPOGRAPHY constant tổng hợp
export const TYPOGRAPHY = {
  FONT_SIZE: FONT_SIZES,
  FONT_WEIGHT: FONT_WEIGHTS,
  LINE_HEIGHT: {
    NONE: 1,
    TIGHT: 1.25,
    SNUG: 1.375,
    NORMAL: 1.5,
    RELAXED: 1.625,
    LOOSE: 2,
  } as const,
  LETTER_SPACING: {
    TIGHTER: '-0.05em',
    TIGHT: '-0.025em',
    NORMAL: '0em',
    WIDE: '0.025em',
    WIDER: '0.05em',
    WIDEST: '0.1em',
  } as const,
} as const;

export const Z_INDEX = {
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  overlay: 1300,
  modal: 1400,
  toast: 1700,
  tooltip: 1800,
  
} as const;

// Animation constants
export const ANIMATION = {
  DURATION: {
    FAST: '150ms',
    NORMAL: '300ms',
    SLOW: '500ms',
  } as const,
  TIMING: {
    EASE: 'ease',
    EASE_IN: 'ease-in',
    EASE_OUT: 'ease-out',
    EASE_IN_OUT: 'ease-in-out',
    CUBIC_BEZIER: 'cubic-bezier(0.16, 1, 0.3, 1)',
  } as const,
} as const;


/* ================= RESPONSIVE ================= */

export const BREAKPOINTS = {
  xs: 480,   // small phones
  sm: 640,   // large phones
  md: 768,   // tablets
  lg: 1024,  // small laptops
  xl: 1280,  // desktop
  xxl: 1536, // large screens
} as const;
