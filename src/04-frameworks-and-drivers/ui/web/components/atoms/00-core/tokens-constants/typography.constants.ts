/* ==========================================================================
 * Typography Constants
 * --------------------------------------------------------------------------
 * Font families, sizes, weights, and line heights.
 * PURE CONSTANTS ONLY.
 * ========================================================================== */

export const FONT_FAMILY = {
  /** Primary sans-serif font (UI, body text) */
  SANS: `"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`,
  
  /** Monospace font (code, technical text) */
  MONO: `"JetBrains Mono", "SF Mono", "Roboto Mono", Menlo, Monaco, "Courier New", monospace`,
  
  /** Serif font (headings, display text) */
  SERIF: `"Georgia", "Times New Roman", Times, serif`,
  
  /** System UI font fallback */
  SYSTEM: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`,
} as const;

export const FONT_SIZE = {
  /** Extra extra small (10px) - labels, captions */
  XXS: 10,
  /** Extra small (12px) - small text, captions */
  XS: 12,
  /** Small (14px) - body text small */
  SM: 14,
  /** Base (16px) - default body text (1rem) */
  BASE: 16,
  /** Medium (18px) - lead text, intro paragraphs */
  MD: 18,
  /** Large (20px) - subheadings */
  LG: 20,
  /** Extra large (24px) - headings level 3 */
  XL: 24,
  /** 2X large (30px) - headings level 2 */
  XXL: 30,
  /** 3X large (36px) - headings level 1 */
  XXXL: 36,
  /** 4X large (48px) - display small */
  XXXXL: 48,
  /** 5X large (60px) - display medium */
  XXXXXL: 60,
  /** 6X large (72px) - display large */
  XXXXXXL: 72,
} as const;

export const FONT_WEIGHT = {
  /** Thin (100) */
  THIN: 100,
  /** Extra light (200) */
  EXTRALIGHT: 200,
  /** Light (300) */
  LIGHT: 300,
  /** Normal (400) */
  NORMAL: 400,
  /** Medium (500) */
  MEDIUM: 500,
  /** Semi-bold (600) */
  SEMIBOLD: 600,
  /** Bold (700) */
  BOLD: 700,
  /** Extra bold (800) */
  EXTRABOLD: 800,
  /** Black (900) */
  BLACK: 900,
} as const;

export const LINE_HEIGHT = {
  /** None (1) - tightest */
  NONE: 1,
  /** Tight (1.25) - headings */
  TIGHT: 1.25,
  /** Snug (1.375) - subheadings */
  SNUG: 1.375,
  /** Normal (1.5) - body text */
  NORMAL: 1.5,
  /** Relaxed (1.625) - long form content */
  RELAXED: 1.625,
  /** Loose (2) - poetry, special content */
  LOOSE: 2,
} as const;

export const LETTER_SPACING = {
  /** Tighter (-0.05em) */
  TIGHTER: '-0.05em',
  /** Tight (-0.025em) */
  TIGHT: '-0.025em',
  /** Normal (0em) */
  NORMAL: '0em',
  /** Wide (0.025em) */
  WIDE: '0.025em',
  /** Wider (0.05em) */
  WIDER: '0.05em',
  /** Widest (0.1em) */
  WIDEST: '0.1em',
} as const;

/** Pre-defined text styles for consistency */
export const TEXT_STYLES = {
  DISPLAY: {
    LARGE: {
      fontSize: FONT_SIZE.XXXXXXL, // 72px
      fontWeight: FONT_WEIGHT.BOLD,
      lineHeight: LINE_HEIGHT.TIGHT,
      letterSpacing: LETTER_SPACING.TIGHTER,
    },
    MEDIUM: {
      fontSize: FONT_SIZE.XXXXXL, // 60px
      fontWeight: FONT_WEIGHT.BOLD,
      lineHeight: LINE_HEIGHT.TIGHT,
      letterSpacing: LETTER_SPACING.TIGHT,
    },
    SMALL: {
      fontSize: FONT_SIZE.XXXXL, // 48px
      fontWeight: FONT_WEIGHT.BOLD,
      lineHeight: LINE_HEIGHT.TIGHT,
      letterSpacing: LETTER_SPACING.TIGHT,
    },
  },
  HEADING: {
    H1: {
      fontSize: FONT_SIZE.XXXL, // 36px
      fontWeight: FONT_WEIGHT.BOLD,
      lineHeight: LINE_HEIGHT.TIGHT,
      letterSpacing: LETTER_SPACING.TIGHT,
    },
    H2: {
      fontSize: FONT_SIZE.XXL, // 30px
      fontWeight: FONT_WEIGHT.SEMIBOLD,
      lineHeight: LINE_HEIGHT.TIGHT,
      letterSpacing: LETTER_SPACING.NORMAL,
    },
    H3: {
      fontSize: FONT_SIZE.XL, // 24px
      fontWeight: FONT_WEIGHT.SEMIBOLD,
      lineHeight: LINE_HEIGHT.SNUG,
      letterSpacing: LETTER_SPACING.NORMAL,
    },
    H4: {
      fontSize: FONT_SIZE.LG, // 20px
      fontWeight: FONT_WEIGHT.SEMIBOLD,
      lineHeight: LINE_HEIGHT.SNUG,
      letterSpacing: LETTER_SPACING.NORMAL,
    },
    H5: {
      fontSize: FONT_SIZE.MD, // 18px
      fontWeight: FONT_WEIGHT.SEMIBOLD,
      lineHeight: LINE_HEIGHT.NORMAL,
      letterSpacing: LETTER_SPACING.NORMAL,
    },
    H6: {
      fontSize: FONT_SIZE.BASE, // 16px
      fontWeight: FONT_WEIGHT.SEMIBOLD,
      lineHeight: LINE_HEIGHT.NORMAL,
      letterSpacing: LETTER_SPACING.NORMAL,
    },
  },
  BODY: {
    LARGE: {
      fontSize: FONT_SIZE.MD, // 18px
      fontWeight: FONT_WEIGHT.NORMAL,
      lineHeight: LINE_HEIGHT.RELAXED,
      letterSpacing: LETTER_SPACING.NORMAL,
    },
    BASE: {
      fontSize: FONT_SIZE.BASE, // 16px
      fontWeight: FONT_WEIGHT.NORMAL,
      lineHeight: LINE_HEIGHT.NORMAL,
      letterSpacing: LETTER_SPACING.NORMAL,
    },
    SMALL: {
      fontSize: FONT_SIZE.SM, // 14px
      fontWeight: FONT_WEIGHT.NORMAL,
      lineHeight: LINE_HEIGHT.NORMAL,
      letterSpacing: LETTER_SPACING.NORMAL,
    },
    XSMALL: {
      fontSize: FONT_SIZE.XS, // 12px
      fontWeight: FONT_WEIGHT.NORMAL,
      lineHeight: LINE_HEIGHT.NORMAL,
      letterSpacing: LETTER_SPACING.NORMAL,
    },
  },
  LABEL: {
    LARGE: {
      fontSize: FONT_SIZE.SM, // 14px
      fontWeight: FONT_WEIGHT.MEDIUM,
      lineHeight: LINE_HEIGHT.NORMAL,
      letterSpacing: LETTER_SPACING.WIDE,
    },
    BASE: {
      fontSize: FONT_SIZE.XS, // 12px
      fontWeight: FONT_WEIGHT.MEDIUM,
      lineHeight: LINE_HEIGHT.NONE,
      letterSpacing: LETTER_SPACING.WIDE,
    },
    SMALL: {
      fontSize: FONT_SIZE.XXS, // 10px
      fontWeight: FONT_WEIGHT.MEDIUM,
      lineHeight: LINE_HEIGHT.NONE,
      letterSpacing: LETTER_SPACING.WIDER,
    },
  },
} as const;

export type FontFamilyKey = keyof typeof FONT_FAMILY;
export type FontSizeKey = keyof typeof FONT_SIZE;
export type FontWeightKey = keyof typeof FONT_WEIGHT;
export type LineHeightKey = keyof typeof LINE_HEIGHT;
export type LetterSpacingKey = keyof typeof LETTER_SPACING;
export type TextStyleCategory = keyof typeof TEXT_STYLES;
export type TextStyleVariant = keyof typeof TEXT_STYLES['DISPLAY'];