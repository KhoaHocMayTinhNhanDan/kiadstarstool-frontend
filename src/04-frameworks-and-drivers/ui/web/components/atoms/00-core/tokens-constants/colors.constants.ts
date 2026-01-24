/* ==========================================================================
 * Color Constants
 * --------------------------------------------------------------------------
 * Complete color palette with semantic names.
 * PURE CONSTANTS ONLY.
 * ========================================================================== */

export const COLORS = {
  // ===== PRIMARY PALETTE (Brand colors) =====
  PRIMARY: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#3B82F6', // Base primary
    600: '#2563EB',
    700: '#1D4ED8',
    800: '#1E40AF',
    900: '#1E3A8A',
    950: '#172554',
  },
  
  // ===== NEUTRAL PALETTE (Grayscale) =====
  NEUTRAL: {
    0: '#FFFFFF',
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#E5E5E5',
    300: '#D4D4D4',
    400: '#A3A3A3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0A0A0A',
  },
  
  // ===== SEMANTIC COLORS (Feedback states) =====
  SUCCESS: {
    50: '#F0FDF4',
    100: '#DCFCE7',
    200: '#BBF7D0',
    300: '#86EFAC',
    400: '#4ADE80',
    500: '#22C55E', // Base success
    600: '#16A34A',
    700: '#15803D',
    800: '#166534',
    900: '#14532D',
    950: '#052E16',
  },
  
  WARNING: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#F59E0B', // Base warning
    600: '#D97706',
    700: '#B45309',
    800: '#92400E',
    900: '#78350F',
    950: '#451A03',
  },
  
  ERROR: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    300: '#FCA5A5',
    400: '#F87171',
    500: '#EF4444', // Base error
    600: '#DC2626',
    700: '#B91C1C',
    800: '#991B1B',
    900: '#7F1D1D',
    950: '#450A0A',
  },
  
  INFO: {
    50: '#F0F9FF',
    100: '#E0F2FE',
    200: '#BAE6FD',
    300: '#7DD3FC',
    400: '#38BDF8',
    500: '#0EA5E9', // Base info
    600: '#0284C7',
    700: '#0369A1',
    800: '#075985',
    900: '#0C4A6E',
    950: '#082F49',
  },
  
  // ===== FUNCTIONAL COLORS (UI elements) =====
  BACKGROUND: {
    DEFAULT: '#FFFFFF',
    PAPER: '#FAFAFA',
    SUBTLE: '#F5F5F5',
    MUTED: '#E5E5E5',
    INVERTED: '#171717',
  },
  
  TEXT: {
    PRIMARY: '#171717',
    SECONDARY: '#525252',
    TERTIARY: '#A3A3A3',
    DISABLED: '#D4D4D4',
    INVERTED: '#FFFFFF',
    ON_PRIMARY: '#FFFFFF',
    ON_SUCCESS: '#FFFFFF',
    ON_WARNING: '#171717',
    ON_ERROR: '#FFFFFF',
    ON_INFO: '#FFFFFF',
  },
  
  BORDER: {
    LIGHT: '#E5E5E5',
    DEFAULT: '#D4D4D4',
    STRONG: '#A3A3A3',
    FOCUS: '#3B82F6',
    ERROR: '#EF4444',
    SUCCESS: '#22C55E',
    WARNING: '#F59E0B',
  },
  
  OVERLAY: {
    LIGHT: 'rgba(255, 255, 255, 0.8)',
    DARK: 'rgba(0, 0, 0, 0.5)',
    DARKER: 'rgba(0, 0, 0, 0.7)',
    BLACK: 'rgba(0, 0, 0, 0.9)',
  },
  
  // ===== SPECIAL COLORS =====
  SHADOW: {
    DEFAULT: 'rgba(0, 0, 0, 0.1)',
    STRONG: 'rgba(0, 0, 0, 0.2)',
    HEAVY: 'rgba(0, 0, 0, 0.3)',
  },
  
  DIVIDER: 'rgba(0, 0, 0, 0.06)',
  
  // ===== COMMON COLORS =====
  COMMON: {
    WHITE: '#FFFFFF',
    BLACK: '#000000',
    TRANSPARENT: 'transparent',
    CURRENT: 'currentColor',
  },
} as const;

// ===== TYPE EXPORTS =====
export type ColorPalette = keyof typeof COLORS;
export type PrimaryShade = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;
export type NeutralShade = 0 | 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;
export type SemanticShade = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;
export type BackgroundKey = keyof typeof COLORS.BACKGROUND;
export type TextKey = keyof typeof COLORS.TEXT;
export type BorderKey = keyof typeof COLORS.BORDER;
export type OverlayKey = keyof typeof COLORS.OVERLAY;