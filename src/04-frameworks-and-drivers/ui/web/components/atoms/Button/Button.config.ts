/* ==========================================================================
 * Button Constants & Configuration
 * --------------------------------------------------------------------------
 * All constants derived from design tokens
 * NO TYPES HERE - just pure constants
 * ========================================================================== */

import { 
  COLORS
} from '../00-core/tokens-constants/colors.constants'
import { 
  SPACING,
  SPACING_SEMANTIC 
} from '../00-core/tokens-constants/spacing.constants'
import { 
  BORDER_RADIUS,
  BORDER_WIDTH 
} from '../00-core/tokens-constants/border.constants'
import { 
  FONT_FAMILY,
  FONT_SIZE,
  FONT_WEIGHT,
  LINE_HEIGHT,
  LETTER_SPACING,
  TEXT_STYLES 
} from '../00-core/tokens-constants/typography.constants'
import { 
  OPACITY 
} from '../00-core/tokens-constants/opacity.constants'
import { 
  Z_INDEX,
  SHADOW,
  ELEVATION 
} from '../00-core/tokens-constants/elevation.constants'
import { 
  DURATION,
  EASING,
  TRANSITION,
  ANIMATION 
} from '../00-core/tokens-constants/animation.constants'

// ===========================================================================
// 1. SIZE CONSTANTS (using design tokens)
// ===========================================================================

export const BUTTON_SIZES = {
  xs: {
    height: '1.5rem',                       // 24px
    paddingX: SPACING['2'],                 // 8px from spacing scale
    paddingY: SPACING['0.5'],               // 2px from spacing scale
    fontSize: `${FONT_SIZE.XS}px`,          // 12px from typography
    iconSize: '0.75rem',                    // 12px (calculated)
    borderRadius: `${BORDER_RADIUS.SM}px`,  // 2px from border tokens
    gap: SPACING['1'],                      // 4px from spacing scale
  },
  sm: {
    height: '2rem',                         // 32px
    paddingX: SPACING['3'],                 // 12px
    paddingY: SPACING['1'],                 // 4px
    fontSize: `${FONT_SIZE.SM}px`,          // 14px from typography
    iconSize: '1rem',                       // 16px
    borderRadius: `${BORDER_RADIUS.MD}px`,  // 4px
    gap: SPACING['1.5'],                    // 6px
  },
  md: {
    height: '2.5rem',                       // 40px
    paddingX: SPACING['4'],                 // 16px
    paddingY: SPACING['1.5'],               // 6px
    fontSize: `${FONT_SIZE.BASE}px`,        // 16px from typography
    iconSize: '1.25rem',                    // 20px
    borderRadius: `${BORDER_RADIUS.MD}px`,  // 4px
    gap: SPACING['2'],                      // 8px
  },
  lg: {
    height: '3rem',                         // 48px
    paddingX: SPACING['6'],                 // 24px
    paddingY: SPACING['2'],                 // 8px
    fontSize: `${FONT_SIZE.LG}px`,          // 20px from typography
    iconSize: '1.5rem',                     // 24px
    borderRadius: `${BORDER_RADIUS.LG}px`,  // 8px
    gap: SPACING['2.5'],                    // 10px
  },
  xl: {
    height: '3.5rem',                       // 56px
    paddingX: SPACING['8'],                 // 32px
    paddingY: SPACING['2.5'],               // 10px
    fontSize: `${FONT_SIZE.XL}px`,          // 24px from typography
    iconSize: '1.75rem',                    // 28px
    borderRadius: `${BORDER_RADIUS.XL}px`,  // 12px
    gap: SPACING['3'],                      // 12px
  },
} as const

// ===========================================================================
// 2. VARIANT CONSTANTS (using color tokens)
// ===========================================================================

export const BUTTON_VARIANTS = {
  primary: {
    backgroundColor: COLORS.PRIMARY[500],
    color: COLORS.TEXT.ON_PRIMARY,
    border: 'none',
    hover: {
      backgroundColor: COLORS.PRIMARY[600],
    },
    active: {
      backgroundColor: COLORS.PRIMARY[700],
      transform: 'translateY(1px)',
    },
    focus: {
      boxShadow: SHADOW.FOCUS,
    },
    disabled: {
      backgroundColor: COLORS.NEUTRAL[300],
      color: COLORS.NEUTRAL[500],
    },
  },
  secondary: {
    backgroundColor: COLORS.COMMON.TRANSPARENT,
    color: COLORS.TEXT.SECONDARY,
    border: `${BORDER_WIDTH.THIN}px solid ${COLORS.BORDER.DEFAULT}`,
    hover: {
      backgroundColor: COLORS.NEUTRAL[50],
      borderColor: COLORS.NEUTRAL[400],
    },
    active: {
      backgroundColor: COLORS.NEUTRAL[100],
      transform: 'translateY(1px)',
    },
    focus: {
      boxShadow: SHADOW.FOCUS,
    },
    disabled: {
      color: COLORS.NEUTRAL[400],
      borderColor: COLORS.NEUTRAL[200],
    },
  },
  ghost: {
    backgroundColor: COLORS.COMMON.TRANSPARENT,
    color: COLORS.TEXT.SECONDARY,
    border: 'none',
    hover: {
      backgroundColor: COLORS.NEUTRAL[100],
    },
    active: {
      backgroundColor: COLORS.NEUTRAL[200],
      transform: 'translateY(1px)',
    },
    focus: {
      boxShadow: SHADOW.FOCUS,
    },
    disabled: {
      color: COLORS.NEUTRAL[400],
    },
  },
  danger: {
    backgroundColor: COLORS.ERROR[500],
    color: COLORS.TEXT.ON_ERROR,
    border: 'none',
    hover: {
      backgroundColor: COLORS.ERROR[600],
    },
    active: {
      backgroundColor: COLORS.ERROR[700],
      transform: 'translateY(1px)',
    },
    focus: {
      boxShadow: SHADOW.FOCUS,
    },
    disabled: {
      backgroundColor: COLORS.NEUTRAL[300],
      color: COLORS.NEUTRAL[500],
    },
  },
  success: {
    backgroundColor: COLORS.SUCCESS[500],
    color: COLORS.TEXT.ON_SUCCESS,
    border: 'none',
    hover: {
      backgroundColor: COLORS.SUCCESS[600],
    },
    active: {
      backgroundColor: COLORS.SUCCESS[700],
      transform: 'translateY(1px)',
    },
    focus: {
      boxShadow: SHADOW.FOCUS,
    },
    disabled: {
      backgroundColor: COLORS.NEUTRAL[300],
      color: COLORS.NEUTRAL[500],
    },
  },
  warning: {
    backgroundColor: COLORS.WARNING[500],
    color: COLORS.TEXT.ON_WARNING,
    border: 'none',
    hover: {
      backgroundColor: COLORS.WARNING[600],
    },
    active: {
      backgroundColor: COLORS.WARNING[700],
      transform: 'translateY(1px)',
    },
    focus: {
      boxShadow: SHADOW.FOCUS,
    },
    disabled: {
      backgroundColor: COLORS.NEUTRAL[300],
      color: COLORS.NEUTRAL[500],
    },
  },
  info: {
    backgroundColor: COLORS.INFO[500],
    color: COLORS.TEXT.ON_INFO,
    border: 'none',
    hover: {
      backgroundColor: COLORS.INFO[600],
    },
    active: {
      backgroundColor: COLORS.INFO[700],
      transform: 'translateY(1px)',
    },
    focus: {
      boxShadow: SHADOW.FOCUS,
    },
    disabled: {
      backgroundColor: COLORS.NEUTRAL[300],
      color: COLORS.NEUTRAL[500],
    },
  },
} as const

// ===========================================================================
// 3. ICON POSITION CONSTANTS
// ===========================================================================

export const BUTTON_ICON_POSITIONS = {
  left: { order: -1 },
  right: { order: 1 },
  only: { margin: 0 },
} as const

// ===========================================================================
// 4. TYPOGRAPHY CONSTANTS (Sử dụng đúng typography tokens)
// ===========================================================================

export const BUTTON_TYPOGRAPHY = {
  // Font families
  FONT_FAMILY_SANS: FONT_FAMILY.SANS,
  FONT_FAMILY_MONO: FONT_FAMILY.MONO,
  FONT_FAMILY_SERIF: FONT_FAMILY.SERIF,
  FONT_FAMILY_SYSTEM: FONT_FAMILY.SYSTEM,
  
  // Font sizes (pixel values)
  FONT_SIZE_XXS: `${FONT_SIZE.XXS}px`,
  FONT_SIZE_XS: `${FONT_SIZE.XS}px`,
  FONT_SIZE_SM: `${FONT_SIZE.SM}px`,
  FONT_SIZE_BASE: `${FONT_SIZE.BASE}px`,
  FONT_SIZE_MD: `${FONT_SIZE.MD}px`,
  FONT_SIZE_LG: `${FONT_SIZE.LG}px`,
  FONT_SIZE_XL: `${FONT_SIZE.XL}px`,
  FONT_SIZE_XXL: `${FONT_SIZE.XXL}px`,
  FONT_SIZE_XXXL: `${FONT_SIZE.XXXL}px`,
  
  // Font weights
  FONT_WEIGHT_THIN: FONT_WEIGHT.THIN,
  FONT_WEIGHT_EXTRALIGHT: FONT_WEIGHT.EXTRALIGHT,
  FONT_WEIGHT_LIGHT: FONT_WEIGHT.LIGHT,
  FONT_WEIGHT_NORMAL: FONT_WEIGHT.NORMAL,
  FONT_WEIGHT_MEDIUM: FONT_WEIGHT.MEDIUM,
  FONT_WEIGHT_SEMIBOLD: FONT_WEIGHT.SEMIBOLD,
  FONT_WEIGHT_BOLD: FONT_WEIGHT.BOLD,
  FONT_WEIGHT_EXTRABOLD: FONT_WEIGHT.EXTRABOLD,
  FONT_WEIGHT_BLACK: FONT_WEIGHT.BLACK,
  
  // Line heights
  LINE_HEIGHT_NONE: LINE_HEIGHT.NONE,
  LINE_HEIGHT_TIGHT: LINE_HEIGHT.TIGHT,
  LINE_HEIGHT_SNUG: LINE_HEIGHT.SNUG,
  LINE_HEIGHT_NORMAL: LINE_HEIGHT.NORMAL,
  LINE_HEIGHT_RELAXED: LINE_HEIGHT.RELAXED,
  LINE_HEIGHT_LOOSE: LINE_HEIGHT.LOOSE,
  
  // Letter spacing
  LETTER_SPACING_TIGHTER: LETTER_SPACING.TIGHTER,
  LETTER_SPACING_TIGHT: LETTER_SPACING.TIGHT,
  LETTER_SPACING_NORMAL: LETTER_SPACING.NORMAL,
  LETTER_SPACING_WIDE: LETTER_SPACING.WIDE,
  LETTER_SPACING_WIDER: LETTER_SPACING.WIDER,
  LETTER_SPACING_WIDEST: LETTER_SPACING.WIDEST,
  
  // Pre-defined text styles
  TEXT_STYLE_DISPLAY_LARGE: TEXT_STYLES.DISPLAY.LARGE,
  TEXT_STYLE_DISPLAY_MEDIUM: TEXT_STYLES.DISPLAY.MEDIUM,
  TEXT_STYLE_DISPLAY_SMALL: TEXT_STYLES.DISPLAY.SMALL,
  TEXT_STYLE_HEADING_H1: TEXT_STYLES.HEADING.H1,
  TEXT_STYLE_HEADING_H2: TEXT_STYLES.HEADING.H2,
  TEXT_STYLE_HEADING_H3: TEXT_STYLES.HEADING.H3,
  TEXT_STYLE_HEADING_H4: TEXT_STYLES.HEADING.H4,
  TEXT_STYLE_HEADING_H5: TEXT_STYLES.HEADING.H5,
  TEXT_STYLE_HEADING_H6: TEXT_STYLES.HEADING.H6,
  TEXT_STYLE_BODY_LARGE: TEXT_STYLES.BODY.LARGE,
  TEXT_STYLE_BODY_BASE: TEXT_STYLES.BODY.BASE,
  TEXT_STYLE_BODY_SMALL: TEXT_STYLES.BODY.SMALL,
  TEXT_STYLE_BODY_XSMALL: TEXT_STYLES.BODY.XSMALL,
  TEXT_STYLE_LABEL_LARGE: TEXT_STYLES.LABEL.LARGE,
  TEXT_STYLE_LABEL_BASE: TEXT_STYLES.LABEL.BASE,
  TEXT_STYLE_LABEL_SMALL: TEXT_STYLES.LABEL.SMALL,
} as const

// ===========================================================================
// 5. DEFAULT VALUES
// ===========================================================================

export const BUTTON_DEFAULTS = {
  size: 'md',
  variant: 'primary',
  loading: false,
  fullWidth: false,
  disabled: false,
  iconPosition: 'left',
  
  // Typography defaults
  fontFamily: FONT_FAMILY.SANS,
  fontWeight: FONT_WEIGHT.SEMIBOLD,
  lineHeight: LINE_HEIGHT.NORMAL,
  letterSpacing: LETTER_SPACING.NORMAL,
} as const

// ===========================================================================
// 6. OPACITY CONSTANTS (Sử dụng đúng opacity tokens)
// ===========================================================================

export const BUTTON_OPACITY = {
  // Numeric opacity values
  OPACITY_0: OPACITY[0],     // '0'
  OPACITY_10: OPACITY[10],   // '0.1'
  OPACITY_20: OPACITY[20],   // '0.2'
  OPACITY_30: OPACITY[30],   // '0.3'
  OPACITY_40: OPACITY[40],   // '0.4'
  OPACITY_50: OPACITY[50],   // '0.5'
  OPACITY_60: OPACITY[60],   // '0.6'
  OPACITY_70: OPACITY[70],   // '0.7'
  OPACITY_80: OPACITY[80],   // '0.8'
  OPACITY_90: OPACITY[90],   // '0.9'
  OPACITY_100: OPACITY[100], // '1'
  
  // Semantic opacity values
  DISABLED: OPACITY[60],     // '0.6'
  LOADING: OPACITY[80],      // '0.8'
  HOVER: OPACITY[90],        // '0.9'
  ACTIVE: OPACITY[100],      // '1'
  FOCUS: OPACITY[100],       // '1'
} as const

// ===========================================================================
// 7. SEMANTIC CONSTANTS
// ===========================================================================

export const BUTTON_SEMANTIC = {
  // Loading text
  LOADING_TEXT: 'Loading...',
  
  // Heights from size constants
  HEIGHT_XS: BUTTON_SIZES.xs.height,
  HEIGHT_SM: BUTTON_SIZES.sm.height,
  HEIGHT_MD: BUTTON_SIZES.md.height,
  HEIGHT_LG: BUTTON_SIZES.lg.height,
  HEIGHT_XL: BUTTON_SIZES.xl.height,
  
  // Padding from semantic spacing
  PADDING_X: SPACING_SEMANTIC.BUTTON_PADDING_X,
  PADDING_X_SM: SPACING_SEMANTIC.BUTTON_PADDING_X_SM,
  PADDING_Y: SPACING_SEMANTIC.BUTTON_PADDING_Y,
  PADDING_Y_SM: SPACING_SEMANTIC.BUTTON_PADDING_Y_SM,
  
  // Icon spacing
  ICON_SPACING: SPACING_SEMANTIC.ICON,
  ICON_SPACING_MOBILE: SPACING_SEMANTIC.ICON_MOBILE,
  
  // Border radius
  BORDER_RADIUS_SM: `${BORDER_RADIUS.SM}px`,
  BORDER_RADIUS_MD: `${BORDER_RADIUS.MD}px`,
  BORDER_RADIUS_LG: `${BORDER_RADIUS.LG}px`,
  BORDER_RADIUS_XL: `${BORDER_RADIUS.XL}px`,
  BORDER_RADIUS_FULL: `${BORDER_RADIUS.FULL}px`,
} as const

// ===========================================================================
// 8. ELEVATION CONSTANTS (Sử dụng đúng elevation tokens)
// ===========================================================================

export const BUTTON_ELEVATION = {
  // Z-index levels
  Z_INDEX_BASE: Z_INDEX.BASE,
  Z_INDEX_CONTENT: Z_INDEX.CONTENT,
  Z_INDEX_STICKY: Z_INDEX.STICKY,
  
  // Shadows for different states
  SHADOW_NONE: SHADOW.NONE,
  SHADOW_XS: SHADOW.XS,
  SHADOW_SM: SHADOW.SM,
  SHADOW_MD: SHADOW.MD,
  SHADOW_LG: SHADOW.LG,
  SHADOW_XL: SHADOW.XL,
  SHADOW_XXL: SHADOW.XXL,
  SHADOW_INNER: SHADOW.INNER,
  SHADOW_OUTLINE: SHADOW.OUTLINE,
  SHADOW_FOCUS: SHADOW.FOCUS,
  SHADOW_GLOW_SM: SHADOW.GLOW_SM,
  SHADOW_GLOW_MD: SHADOW.GLOW_MD,
  SHADOW_GLOW_LG: SHADOW.GLOW_LG,
  
  // Component-specific elevations
  COMPONENT_BUTTON: ELEVATION.COMPONENTS.BUTTON,
  COMPONENT_CARD: ELEVATION.COMPONENTS.CARD,
  COMPONENT_MODAL: ELEVATION.COMPONENTS.MODAL,
  
  // Button-specific shadow mappings
  BUTTON_DEFAULT: SHADOW.COMPONENTS.BUTTON,
  BUTTON_HOVER: SHADOW.COMPONENTS.BUTTON_HOVER,
} as const

// ===========================================================================
// 9. ANIMATION CONSTANTS (Sử dụng đúng animation tokens)
// ===========================================================================

export const BUTTON_ANIMATION = {
  // Durations (in milliseconds)
  DURATION_INSTANT: DURATION.INSTANT,
  DURATION_FAST: DURATION.FAST,
  DURATION_NORMAL: DURATION.NORMAL,
  DURATION_SLOW: DURATION.SLOW,
  DURATION_SLOWER: DURATION.SLOWER,
  
  // Easing functions
  EASING_LINEAR: EASING.LINEAR,
  EASING_STANDARD: EASING.STANDARD,
  EASING_DECELERATE: EASING.DECELERATE,
  EASING_ACCELERATE: EASING.ACCELERATE,
  EASING_SHARP: EASING.SHARP,
  EASING_BOUNCE: EASING.BOUNCE,
  
  // Predefined transitions (string values)
  TRANSITION_DEFAULT: TRANSITION.DEFAULT,
  TRANSITION_COLOR: TRANSITION.COLOR,
  TRANSITION_TRANSFORM: TRANSITION.TRANSFORM,
  TRANSITION_OPACITY: TRANSITION.OPACITY,
  TRANSITION_BACKGROUND: TRANSITION.BACKGROUND,
  TRANSITION_SHADOW: TRANSITION.SHADOW,
  TRANSITION_BORDER: TRANSITION.BORDER,
  
  // Animations (string values)
  ANIMATION_FADE_IN: ANIMATION.FADE_IN,
  ANIMATION_FADE_OUT: ANIMATION.FADE_OUT,
  ANIMATION_SLIDE_IN_LEFT: ANIMATION.SLIDE_IN_LEFT,
  ANIMATION_SLIDE_IN_RIGHT: ANIMATION.SLIDE_IN_RIGHT,
  ANIMATION_SLIDE_IN_TOP: ANIMATION.SLIDE_IN_TOP,
  ANIMATION_SLIDE_IN_BOTTOM: ANIMATION.SLIDE_IN_BOTTOM,
  ANIMATION_SCALE_IN: ANIMATION.SCALE_IN,
  ANIMATION_SCALE_OUT: ANIMATION.SCALE_OUT,
  ANIMATION_ROTATE: ANIMATION.ROTATE,
  ANIMATION_PULSE: ANIMATION.PULSE,
  ANIMATION_BOUNCE: ANIMATION.BOUNCE,
} as const

// ===========================================================================
// 10. ACCESSIBILITY CONSTANTS
// ===========================================================================

export const BUTTON_ARIA = {
  LOADING: 'Loading',
  DISABLED: 'Disabled',
  EXPANDED: 'Expanded',
  COLLAPSED: 'Collapsed',
} as const

// ===========================================================================
// 11. TEST ID CONSTANTS
// ===========================================================================

export const BUTTON_TEST_IDS = {
  ROOT: 'button',
  LOADING: 'button-loading',
  ICON: 'button-icon',
  CONTENT: 'button-content',
} as const

// ===========================================================================
// 12. STATE CONSTANTS (Sử dụng đúng opacity và elevation tokens)
// ===========================================================================

export const BUTTON_STATES = {
  // Opacity states
  OPACITY_DISABLED: BUTTON_OPACITY.DISABLED,     // '0.6'
  OPACITY_LOADING: BUTTON_OPACITY.LOADING,       // '0.8'
  OPACITY_HOVER: BUTTON_OPACITY.HOVER,           // '0.9'
  OPACITY_ACTIVE: BUTTON_OPACITY.ACTIVE,         // '1'
  OPACITY_FOCUS: BUTTON_OPACITY.FOCUS,           // '1'
  
  // Shadow states from elevation tokens
  SHADOW_HOVER: BUTTON_ELEVATION.BUTTON_HOVER,
  SHADOW_ACTIVE: BUTTON_ELEVATION.SHADOW_SM,
  SHADOW_DISABLED: BUTTON_ELEVATION.SHADOW_NONE,
  
  // Focus state
  FOCUS_OUTLINE: `2px solid ${COLORS.BORDER.FOCUS}`,
  FOCUS_OUTLINE_OFFSET: '2px',
} as const

// ===========================================================================
// 13. LAYOUT CONSTANTS
// ===========================================================================

export const BUTTON_LAYOUT = {
  // Z-index for button states
  Z_INDEX_DEFAULT: Z_INDEX.CONTENT,
  Z_INDEX_HOVER: Z_INDEX.CONTENT + 1,
  Z_INDEX_FOCUS: Z_INDEX.CONTENT + 2,
  Z_INDEX_ACTIVE: Z_INDEX.CONTENT + 3,
  
  // Stacking context
  ISOLATION: 'isolate',
  POSITION: 'relative',
} as const