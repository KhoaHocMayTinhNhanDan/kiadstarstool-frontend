/* ==========================================================================
 * Border Constants
 * --------------------------------------------------------------------------
 * Border radius, widths, and styles.
 * PURE CONSTANTS ONLY.
 * ========================================================================== */

export const BORDER_RADIUS = {
  /** No radius (0px) */
  NONE: 0,
  /** Small radius (2px) - subtle rounding */
  SM: 2,
  /** Medium radius (4px) - default rounding */
  MD: 4,
  /** Large radius (8px) - prominent rounding */
  LG: 8,
  /** Extra large radius (12px) - very rounded */
  XL: 12,
  /** 2X large radius (16px) - pill/capsule */
  XXL: 16,
  /** Full radius (9999px) - circle/pill */
  FULL: 9999,
} as const;

export const BORDER_WIDTH = {
  /** No border (0px) */
  NONE: 0,
  /** Hairline border (0.5px) - subtle separation */
  HAIRLINE: 0.5,
  /** Thin border (1px) - default border */
  THIN: 1,
  /** Medium border (2px) - emphasized border */
  MEDIUM: 2,
  /** Thick border (4px) - strong emphasis */
  THICK: 4,
} as const;

export const BORDER_STYLE = {
  /** Solid line */
  SOLID: 'solid',
  /** Dashed line */
  DASHED: 'dashed',
  /** Dotted line */
  DOTTED: 'dotted',
  /** Double line */
  DOUBLE: 'double',
  /** Groove 3D effect */
  GROOVE: 'groove',
  /** Ridge 3D effect */
  RIDGE: 'ridge',
  /** Inset 3D effect */
  INSET: 'inset',
  /** Outset 3D effect */
  OUTSET: 'outset',
} as const;

export const BORDER = {
  /** Default border (1px solid) */
  DEFAULT: `${BORDER_WIDTH.THIN}px ${BORDER_STYLE.SOLID}`,
  /** Focus ring for accessibility */
  FOCUS: `${BORDER_WIDTH.MEDIUM}px ${BORDER_STYLE.SOLID}`,
  /** Error state border */
  ERROR: `${BORDER_WIDTH.THIN}px ${BORDER_STYLE.SOLID}`,
  /** Success state border */
  SUCCESS: `${BORDER_WIDTH.THIN}px ${BORDER_STYLE.SOLID}`,
  /** Warning state border */
  WARNING: `${BORDER_WIDTH.THIN}px ${BORDER_STYLE.SOLID}`,
  /** Disabled state border */
  DISABLED: `${BORDER_WIDTH.THIN}px ${BORDER_STYLE.SOLID}`,
} as const;

export type BorderRadiusKey = keyof typeof BORDER_RADIUS;
export type BorderWidthKey = keyof typeof BORDER_WIDTH;
export type BorderStyleKey = keyof typeof BORDER_STYLE;
export type BorderKey = keyof typeof BORDER;