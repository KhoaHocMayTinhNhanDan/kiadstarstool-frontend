/* ==========================================================================
 * Elevation Constants
 * --------------------------------------------------------------------------
 * Shadows and z-index values for depth hierarchy.
 * PURE CONSTANTS ONLY.
 * ========================================================================== */

export const Z_INDEX = {
  /** Default stacking context (0) */
  BASE: 0,
  /** Content above normal flow (1-99) */
  CONTENT: 1,
  /** Fixed headers, sticky elements (100-199) */
  STICKY: 100,
  /** Overlays, backdrops (200-299) */
  OVERLAY: 200,
  /** Dropdowns, select menus (300-399) */
  DROPDOWN: 300,
  /** Tooltips (400-499) */
  TOOLTIP: 400,
  /** Popovers (500-599) */
  POPOVER: 500,
  /** Modals, dialogs (600-699) */
  MODAL: 600,
  /** Toast notifications (700-799) */
  TOAST: 700,
  /** Loading overlays, spinners (800-899) */
  LOADING: 800,
  /** Maximum z-index boundary */
  MAX: 9999,
} as const;

export const SHADOW = {
  /** Level 0: No shadow */
  NONE: 'none',
  
  /** Level 1: Subtle elevation (cards, buttons) */
  XS: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  SM: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
  
  /** Level 2: Medium elevation (dropdowns, modals) */
  MD: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
  LG: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
  
  /** Level 3: High elevation (tooltips, popovers) */
  XL: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
  XXL: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  
  /** Special shadows */
  INNER: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
  OUTLINE: '0 0 0 3px rgba(59, 130, 246, 0.5)',
  FOCUS: '0 0 0 3px rgba(59, 130, 246, 0.1)',
  
  /** Glow effects */
  GLOW_SM: '0 0 10px rgba(59, 130, 246, 0.3)',
  GLOW_MD: '0 0 20px rgba(59, 130, 246, 0.3)',
  GLOW_LG: '0 0 30px rgba(59, 130, 246, 0.3)',
  
  /** Elevation mapping for components */
  COMPONENTS: {
    CARD: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
    BUTTON: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    BUTTON_HOVER: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
    MODAL: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
    TOOLTIP: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
    DROPDOWN: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
  },
} as const;

export const ELEVATION = {
  /** Component elevations mapped to z-index and shadow */
  COMPONENTS: {
    CARD: {
      zIndex: Z_INDEX.CONTENT,
      shadow: SHADOW.SM,
    },
    BUTTON: {
      zIndex: Z_INDEX.CONTENT,
      shadow: SHADOW.XS,
      hoverShadow: SHADOW.MD,
    },
    DROPDOWN: {
      zIndex: Z_INDEX.DROPDOWN,
      shadow: SHADOW.LG,
    },
    MODAL: {
      zIndex: Z_INDEX.MODAL,
      shadow: SHADOW.XL,
      backdropZIndex: Z_INDEX.OVERLAY,
    },
    TOOLTIP: {
      zIndex: Z_INDEX.TOOLTIP,
      shadow: SHADOW.LG,
    },
    TOAST: {
      zIndex: Z_INDEX.TOAST,
      shadow: SHADOW.LG,
    },
    LOADING: {
      zIndex: Z_INDEX.LOADING,
      shadow: SHADOW.NONE,
    },
  },
} as const;

export type ZIndexKey = keyof typeof Z_INDEX;
export type ShadowKey = keyof typeof SHADOW;
export type ComponentElevationKey = keyof typeof ELEVATION.COMPONENTS;