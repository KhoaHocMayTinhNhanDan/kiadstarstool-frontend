/* ==========================================================================
 * Spacing Constants
 * --------------------------------------------------------------------------
 * Consistent spacing scale based on 4px grid.
 * - Full detailed scale (internal)
 * - String-based keys for component usage
 * ========================================================================== */

/* ==========================================================================
 * 1. INTERNAL SPACING SCALE (NUMERIC, SYSTEM-LEVEL)
 * --------------------------------------------------------------------------
 * ❗ Do NOT use these keys directly in component props
 * ========================================================================== */

export const SPACING_SCALE = {
  0: 0,
  0.5: 2,
  1: 4,
  1.5: 6,
  2: 8,
  2.5: 10,
  3: 12,
  3.5: 14,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 36,
  10: 40,
  11: 44,
  12: 48,
  14: 56,
  16: 64,
  20: 80,
  24: 96,
  28: 112,
  32: 128,
  36: 144,
  40: 160,
  44: 176,
  48: 192,
  52: 208,
  56: 224,
  60: 240,
  64: 256,
  72: 288,
  80: 320,
  96: 384,
} as const;

export type SpacingScaleKey = keyof typeof SPACING_SCALE;

/* ==========================================================================
 * 2. PUBLIC SPACING TOKENS (STRING KEYS – COMPONENT API)
 * --------------------------------------------------------------------------
 * ✅ Use these in Box, Stack, Button, etc.
 * ========================================================================== */

export const SPACING = {
  '0': SPACING_SCALE[0],
  '0.5': SPACING_SCALE[0.5],
  '1': SPACING_SCALE[1],
  '1.5': SPACING_SCALE[1.5],
  '2': SPACING_SCALE[2],
  '2.5': SPACING_SCALE[2.5],
  '3': SPACING_SCALE[3],
  '3.5': SPACING_SCALE[3.5],
  '4': SPACING_SCALE[4],
  '5': SPACING_SCALE[5],
  '6': SPACING_SCALE[6],
  '7': SPACING_SCALE[7],
  '8': SPACING_SCALE[8],
  '9': SPACING_SCALE[9],
  '10': SPACING_SCALE[10],
  '11': SPACING_SCALE[11],
  '12': SPACING_SCALE[12],
  '14': SPACING_SCALE[14],
  '16': SPACING_SCALE[16],
  '20': SPACING_SCALE[20],
  '24': SPACING_SCALE[24],
  '28': SPACING_SCALE[28],
  '32': SPACING_SCALE[32],
  '36': SPACING_SCALE[36],
  '40': SPACING_SCALE[40],
  '44': SPACING_SCALE[44],
  '48': SPACING_SCALE[48],
  '52': SPACING_SCALE[52],
  '56': SPACING_SCALE[56],
  '60': SPACING_SCALE[60],
  '64': SPACING_SCALE[64],
  '72': SPACING_SCALE[72],
  '80': SPACING_SCALE[80],
  '96': SPACING_SCALE[96],
} as const;

export type SpacingKey = keyof typeof SPACING;

/* ==========================================================================
 * 3. SEMANTIC SPACING (MEANING-BASED, OPTIONAL)
 * ========================================================================== */

export const SPACING_SEMANTIC = {
  CONTAINER_PADDING_X: SPACING['4'],
  CONTAINER_PADDING_X_MOBILE: SPACING['3'],

  CONTAINER_PADDING_Y: SPACING['8'],
  CONTAINER_PADDING_Y_MOBILE: SPACING['6'],

  SECTION: SPACING['20'],
  SECTION_MOBILE: SPACING['12'],

  COMPONENT: SPACING['6'],
  COMPONENT_MOBILE: SPACING['4'],

  ELEMENT: SPACING['3'],
  ELEMENT_MOBILE: SPACING['2'],

  TEXT: SPACING['2'],
  TEXT_MOBILE: SPACING['1'],

  GUTTER: SPACING['4'],
  GUTTER_MOBILE: SPACING['3'],

  FORM: SPACING['4'],
  FORM_MOBILE: SPACING['3'],

  ICON: SPACING['2'],
  ICON_MOBILE: SPACING['1'],

  BUTTON_PADDING_X: SPACING['4'],
  BUTTON_PADDING_X_SM: SPACING['3'],
  BUTTON_PADDING_Y: SPACING['2'],
  BUTTON_PADDING_Y_SM: SPACING['1.5'],
} as const;

export type SemanticSpacingKey = keyof typeof SPACING_SEMANTIC;
