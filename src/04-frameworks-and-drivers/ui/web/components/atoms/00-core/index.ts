/* ==========================================================================
 * Core Design System Exports
 * --------------------------------------------------------------------------
 * Clean separation: tokens (constants) vs utils (functions)
 * Single entry point for all design system values.
 * ========================================================================== */

import {  BREAKPOINTS, COLORS, SPACING } from './tokens';

// ===== DESIGN TOKENS (Constants only) =====
export * from './tokens';

// ===== DESIGN UTILITIES (Functions only) =====
export * from './utils';

// ===== CONVENIENCE RE-EXPORTS (Most commonly used) =====

// Breakpoints (everyone needs these)
export { BREAKPOINTS } from './tokens/breakpoints.constants';

// Colors (everyone needs these)
export { COLORS } from './tokens/colors.constants';

// Spacing (everyone needs these)
export { SPACING } from './tokens/spacing.constants';

// Typography basics
export { 
  FONT_FAMILY, 
  FONT_SIZE, 
  FONT_WEIGHT 
} from './tokens/typography.constants';

// Media queries (for responsive components)
export { MEDIA_QUERIES } from './utils/responsive/media-queries.utils';

// Most used unit helpers
export { 
  pxToRem, 
  snapToGrid,
  remToPx 
} from './utils/unit.utils';

// Most used validation helpers
export { 
  isValidBreakpoint, 
  isValidCSSUnit,
  isValidNumber 
} from './utils/validation.utils';

// Most used math helpers
export { 
  clamp,
  round,
  lerp 
} from './utils/math.utils';

// Most used responsive helpers
export { 
  getCurrentBreakpoint,
  isMobile,
  isDesktop 
} from './utils/responsive/device-detection.utils';

// ===== TYPE RE-EXPORTS (For convenience) =====
// Re-export most commonly used types

export type {
  // Core types
  CSSUnit,
  Breakpoint,
  ColorPalette,
  SpacingKey,
  FontSizeKey,
  FontWeightKey,
  
  // Semantic types
  PrimaryShade,
  NeutralShade,
  
  // Utility types
  BorderRadiusKey,
  ZIndexKey,
  DurationKey,
} from './tokens';

// ===== ALIASES (For backward compatibility) =====
// In case you had these before

/** @deprecated Use BREAKPOINTS instead */
export const BREAKPOINT_VALUES = BREAKPOINTS;

/** @deprecated Use COLORS instead */
export const COLOR_TOKENS = COLORS;

/** @deprecated Use SPACING instead */
export const SPACING_TOKENS = SPACING;

/* ==========================================================================
 * DEBUG/DEV EXPORTS (Do not use in production components)
 * ========================================================================== */

/**
 * COMPLETE DESIGN SYSTEM OBJECT (Debug only)
 * ❌ DO NOT IMPORT IN COMPONENTS - bad for tree shaking
 * ✅ Use only for documentation, testing, or debugging
 */
export const DEBUG_DESIGN_SYSTEM = {
  tokens: {
    colors: () => import('./tokens/colors.constants'),
    spacing: () => import('./tokens/spacing.constants'),
    typography: () => import('./tokens/typography.constants'),
    breakpoints: () => import('./tokens/breakpoints.constants'),
  },
  utils: {
    responsive: () => import('./utils/responsive'),
    unit: () => import('./utils/unit.utils'),
    math: () => import('./utils/math.utils'),
    validation: () => import('./utils/validation.utils'),
  },
} as const;