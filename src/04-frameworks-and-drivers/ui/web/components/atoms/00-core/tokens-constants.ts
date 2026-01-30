// src/04-frameworks-and-drivers/ui/web/components/atoms/00-core/tokens-constants.ts
/* ==========================================================================
 * Design Tokens
 * --------------------------------------------------------------------------
 * Định nghĩa các giá trị cơ bản cho hệ thống UI (Spacing, Colors, Typography...)
 * ========================================================================== */

export const SPACING = {
  none: '0px',

  xs: '4px',
  sm: '8px',
  md: '12px',   // ✅ NEW – rất quan trọng
  lg: '16px',

  xl: '20px',   // ✅ NEW – spacing mượt
  '2xl': '24px',

  '3xl': '32px',
  '4xl': '48px',
  '5xl': '64px',
} as const;


export type SpacingKey = keyof typeof SPACING;

export const COLORS = {
  PRIMARY: '#2196f3',
  PRIMARY_LIGHT: '#90caf9',
  PRIMARY_DARK: '#1976d2',

  SECONDARY: '#6c757d',
  SECONDARY_DARK: '#5a6268',

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

  LIGHT: '#f8f9fa',
  DARK: '#1e293b',

  WHITE: '#ffffff',
  BLACK: '#000000',

  /* ================= TEXT ================= */
  TEXT: '#333333',
  TEXT_MUTED: '#64748b',      // ✅ thêm (disabled, secondary text)
  TEXT_INVERTED: '#ffffff',

  /* ================= NEUTRAL ================= */
  NEUTRAL: '#e0e0e0',
  NEUTRAL_LIGHT: '#e2e8f0',
  NEUTRAL_DARK: '#64748b',
  NEUTRAL_RING: '#cbd5e1',

  TRANSPARENT: 'transparent',
} as const;


export type ColorKey = keyof typeof COLORS;

export const RADIUS = {
  none: '0px',
  sm: '4px',
  md: '8px',
  lg: '12px',
  full: '9999px', // Pill shape
} as const;

export const TRANSITIONS = {
  fast: '0.2s ease',
  normal: '0.3s ease',
} as const;

export const SHADOWS = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',

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

export const Z_INDEX = {
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  modal: 1400,
  toast: 1700,
  tooltip: 1800,
} as const;