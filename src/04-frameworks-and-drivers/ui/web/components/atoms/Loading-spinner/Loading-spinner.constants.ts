// src/04-frameworks-and-drivers/ui/web/components/atoms/Loading-spinner/Loading-spinner.constants.ts

// ===== SIZE CONFIGURATION =====
export const LOADING_SPINNER_SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

export type LoadingSpinnerSize = typeof LOADING_SPINNER_SIZES[number];

export const LOADING_SPINNER_SIZE_CONFIG: Record<LoadingSpinnerSize, {
  width: number;
  height: number;
  borderWidth: number;
  fontSize: number;
  labelGap: number;
}> = {
  xs: {
    width: 16,
    height: 16,
    borderWidth: 1.5,
    fontSize: 10,
    labelGap: 4,
  },
  sm: {
    width: 20,
    height: 20,
    borderWidth: 2,
    fontSize: 11,
    labelGap: 6,
  },
  md: {
    width: 24,
    height: 24,
    borderWidth: 2.5,
    fontSize: 12,
    labelGap: 8,
  },
  lg: {
    width: 32,
    height: 32,
    borderWidth: 3,
    fontSize: 14,
    labelGap: 10,
  },
  xl: {
    width: 48,
    height: 48,
    borderWidth: 4,
    fontSize: 16,
    labelGap: 12,
  },
};

// ===== VARIANT CONFIGURATION =====
export const LOADING_SPINNER_VARIANTS = ['primary', 'secondary', 'success', 'warning', 'error', 'light', 'dark'] as const;

export type LoadingSpinnerVariant = typeof LOADING_SPINNER_VARIANTS[number];

export const LOADING_SPINNER_VARIANT_CONFIG: Record<LoadingSpinnerVariant, {
  primaryColor: string;
  secondaryColor?: string;
  backdropColor: string;
}> = {
  primary: {
    primaryColor: '#3b82f6',
    secondaryColor: '#93c5fd',
    backdropColor: 'rgba(59, 130, 246, 0.1)',
  },
  secondary: {
    primaryColor: '#8b5cf6',
    secondaryColor: '#c4b5fd',
    backdropColor: 'rgba(139, 92, 246, 0.1)',
  },
  success: {
    primaryColor: '#10b981',
    secondaryColor: '#6ee7b7',
    backdropColor: 'rgba(16, 185, 129, 0.1)',
  },
  warning: {
    primaryColor: '#f59e0b',
    secondaryColor: '#fcd34d',
    backdropColor: 'rgba(245, 158, 11, 0.1)',
  },
  error: {
    primaryColor: '#ef4444',
    secondaryColor: '#fca5a5',
    backdropColor: 'rgba(239, 68, 68, 0.1)',
  },
  light: {
    primaryColor: '#ffffff',
    secondaryColor: '#e5e7eb',
    backdropColor: 'rgba(255, 255, 255, 0.1)',
  },
  dark: {
    primaryColor: '#1f2937',
    secondaryColor: '#4b5563',
    backdropColor: 'rgba(31, 41, 55, 0.1)',
  },
};

// ===== TYPE CONFIGURATION =====
export const LOADING_SPINNER_TYPES = ['spinner', 'dots', 'pulse', 'ring', 'dual-ring'] as const;

export type LoadingSpinnerType = typeof LOADING_SPINNER_TYPES[number];

// ===== ANIMATION CONFIG =====
export const LOADING_SPINNER_ANIMATION_CONFIG = {
  spinner: {
    animation: 'spin 1s linear infinite',
    keyframes: `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `,
  },
  dots: {
    animation: 'pulse 1.5s ease-in-out infinite',
    keyframes: `
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
    `,
  },
  pulse: {
    animation: 'pulse-ring 1.5s ease-in-out infinite',
    keyframes: `
      @keyframes pulse-ring {
        0% { transform: scale(0.8); opacity: 0.5; }
        50% { transform: scale(1); opacity: 1; }
        100% { transform: scale(0.8); opacity: 0.5; }
      }
    `,
  },
  ring: {
    animation: 'ring-spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite',
    keyframes: `
      @keyframes ring-spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `,
  },
  dualRing: {
    animation: 'dual-ring-spin 1.2s linear infinite',
    keyframes: `
      @keyframes dual-ring-spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `,
  },
};

// ===== I18N KEYS =====
export const LOADING_SPINNER_I18N_KEYS = {
  defaultLabel: 'loadingSpinner.defaultLabel',
  loading: 'loadingSpinner.loading',
} as const;

// ===== COMPONENT CONFIG =====
export const LOADING_SPINNER_CONFIG = {
  // All sizes
  sizes: LOADING_SPINNER_SIZES,
  
  // All variants
  variants: LOADING_SPINNER_VARIANTS,
  
  // All types
  types: LOADING_SPINNER_TYPES,
  
  // Size styles
  sizeStyles: LOADING_SPINNER_SIZE_CONFIG,
  
  // Variant styles
  variantStyles: LOADING_SPINNER_VARIANT_CONFIG,
  
  // Animation config
  animations: LOADING_SPINNER_ANIMATION_CONFIG,
  
  // Default values
  defaults: {
    size: 'md' as LoadingSpinnerSize,
    variant: 'primary' as LoadingSpinnerVariant,
    type: 'spinner' as LoadingSpinnerType,
    labelPosition: 'bottom' as const,
    delay: 0,
    speed: 1000,
    thickness: 2.5,
  },
  
  // Helper functions
  getSizeStyle(size: LoadingSpinnerSize) {
    return this.sizeStyles[size];
  },
  
  getVariantStyle(variant: LoadingSpinnerVariant) {
    return this.variantStyles[variant];
  },
  
  getAnimationConfig(type: LoadingSpinnerType) {
    return this.animations[type];
  },
} as const;