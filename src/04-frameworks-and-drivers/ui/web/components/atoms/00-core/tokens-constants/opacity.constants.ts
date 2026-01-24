/* ==========================================================================
 * Opacity Constants
 * --------------------------------------------------------------------------
 * Consistent opacity scale from 0 to 100%
 * PURE CONSTANTS ONLY.
 * ========================================================================== */

export const OPACITY = {
  /** Completely transparent (0%) */
  0: '0',
  /** 10% opacity */
  10: '0.1',
  /** 20% opacity */
  20: '0.2',
  /** 30% opacity */
  30: '0.3',
  /** 40% opacity */
  40: '0.4',
  /** 50% opacity - semi-transparent */
  50: '0.5',
  /** 60% opacity */
  60: '0.6',
  /** 70% opacity */
  70: '0.7',
  /** 80% opacity */
  80: '0.8',
  /** 90% opacity */
  90: '0.9',
  /** Completely opaque (100%) */
  100: '1',
} as const;

export type OpacityKey = keyof typeof OPACITY;

/* ==========================================================================
 * Semantic Opacity Values
 * --------------------------------------------------------------------------
 * Named opacity values for specific use cases
 * ========================================================================== */

export const OPACITY_SEMANTIC = {
  /** Disabled state opacity */
  DISABLED: OPACITY[60],
  /** Loading state opacity */
  LOADING: OPACITY[80],
  /** Hover state opacity */
  HOVER: OPACITY[90],
  /** Active state opacity */
  ACTIVE: OPACITY[100],
  /** Focus state opacity */
  FOCUS: OPACITY[100],
  /** Overlay background opacity */
  OVERLAY: OPACITY[50],
  /** Backdrop opacity */
  BACKDROP: OPACITY[30],
  /** Ghost element opacity */
  GHOST: OPACITY[40],
  /** Subtle text opacity */
  TEXT_SUBTLE: OPACITY[70],
  /** Muted text opacity */
  TEXT_MUTED: OPACITY[50],
  /** Disabled text opacity */
  TEXT_DISABLED: OPACITY[30],
} as const;

export type SemanticOpacityKey = keyof typeof OPACITY_SEMANTIC;