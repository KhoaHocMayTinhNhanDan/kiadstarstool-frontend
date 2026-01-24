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
  TYPOGRAPHY 
} from '../00-core/tokens-constants/typography.constants'
import { 
  OPACITY 
} from '../00-core/tokens-constants/opacity.constants'
import { 
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
    fontSize: TYPOGRAPHY.fontSize.xs,       // 12px from typography
    iconSize: '0.75rem',                    // 12px (calculated)
    borderRadius: `${BORDER_RADIUS.SM}px`,  // 2px from border tokens
    gap: SPACING['1'],                      // 4px from spacing scale
  },
  sm: {
    height: '2rem',                         // 32px
    paddingX: SPACING['3'],                 // 12px
    paddingY: SPACING['1'],                 // 4px
    fontSize: TYPOGRAPHY.fontSize.sm,       // 14px
    iconSize: '1rem',                       // 16px
    borderRadius: `${BORDER_RADIUS.MD}px`,  // 4px
    gap: SPACING['1.5'],                    // 6px
  },
  md: {
    height: '2.5rem',                       // 40px
    paddingX: SPACING['4'],                 // 16px
    paddingY: SPACING['1.5'],               // 6px
    fontSize: TYPOGRAPHY.fontSize.md,       // 16px
    iconSize: '1.25rem',                    // 20px
    borderRadius: `${BORDER_RADIUS.MD}px`,  // 4px
    gap: SPACING['2'],                      // 8px
  },
  lg: {
    height: '3rem',                         // 48px
    paddingX: SPACING['6'],                 // 24px
    paddingY: SPACING['2'],                 // 8px
    fontSize: TYPOGRAPHY.fontSize.lg,       // 18px
    iconSize: '1.5rem',                     // 24px
    borderRadius: `${BORDER_RADIUS.LG}px`,  // 8px
    gap: SPACING['2.5'],                    // 10px
  },
  xl: {
    height: '3.5rem',                       // 56px
    paddingX: SPACING['8'],                 // 32px
    paddingY: SPACING['2.5'],               // 10px
    fontSize: TYPOGRAPHY.fontSize.xl,       // 20px
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
      boxShadow: `0 0 0 3px ${COLORS.PRIMARY[100]}`,
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
      boxShadow: `0 0 0 3px ${COLORS.NEUTRAL[100]}`,
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
      boxShadow: `0 0 0 3px ${COLORS.NEUTRAL[100]}`,
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
      boxShadow: `0 0 0 3px ${COLORS.ERROR[100]}`,
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
      boxShadow: `0 0 0 3px ${COLORS.SUCCESS[100]}`,
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
      boxShadow: `0 0 0 3px ${COLORS.WARNING[100]}`,
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
      boxShadow: `0 0 0 3px ${COLORS.INFO[100]}`,
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
// 4. DEFAULT VALUES
// ===========================================================================

export const BUTTON_DEFAULTS = {
  size: 'md',
  variant: 'primary',
  loading: false,
  fullWidth: false,
  disabled: false,
  iconPosition: 'left',
} as const

// ===========================================================================
// 5. SEMANTIC CONSTANTS
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
// 6. ANIMATION CONSTANTS (Sử dụng đúng animation tokens)
// ===========================================================================

export const BUTTON_ANIMATION = {
  // Durations
  DURATION_FAST: `${DURATION.FAST}ms`,
  DURATION_NORMAL: `${DURATION.NORMAL}ms`,
  DURATION_SLOW: `${DURATION.SLOW}ms`,
  
  // Easing functions
  EASING_STANDARD: EASING.STANDARD,
  EASING_DECELERATE: EASING.DECELERATE,
  
  // Predefined transitions
  TRANSITION_DEFAULT: TRANSITION.DEFAULT,
  TRANSITION_COLOR: TRANSITION.COLOR,
  TRANSITION_TRANSFORM: TRANSITION.TRANSFORM,
  TRANSITION_OPACITY: TRANSITION.OPACITY,
  TRANSITION_BACKGROUND: TRANSITION.BACKGROUND,
  TRANSITION_SHADOW: TRANSITION.SHADOW,
  TRANSITION_BORDER: TRANSITION.BORDER,
  
  // Animations
  ANIMATION_ROTATE: ANIMATION.ROTATE,
  ANIMATION_PULSE: ANIMATION.PULSE,
} as const

// ===========================================================================
// 7. ACCESSIBILITY CONSTANTS
// ===========================================================================

export const BUTTON_ARIA = {
  LOADING: 'Loading',
  DISABLED: 'Disabled',
  EXPANDED: 'Expanded',
  COLLAPSED: 'Collapsed',
} as const

// ===========================================================================
// 8. TEST ID CONSTANTS
// ===========================================================================

export const BUTTON_TEST_IDS = {
  ROOT: 'button',
  LOADING: 'button-loading',
  ICON: 'button-icon',
  CONTENT: 'button-content',
} as const

// ===========================================================================
// 9. STATE CONSTANTS
// ===========================================================================

export const BUTTON_STATES = {
  OPACITY_DISABLED: OPACITY?.DISABLED || '0.6',
  OPACITY_LOADING: OPACITY?.DISABLED || '0.6',
  SHADOW_HOVER: ELEVATION?.SM || '0 4px 12px rgba(0, 0, 0, 0.1)',
  SHADOW_ACTIVE: ELEVATION?.XS || '0 2px 4px rgba(0, 0, 0, 0.1)',
} as const