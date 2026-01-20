// src/04-frameworks-and-drivers/ui/web/components/atoms/Chip/Chip.constants.ts

// ===== VARIANT CONFIGURATION =====
export const CHIP_VARIANTS = ['default', 'primary', 'secondary', 'outline', 'success', 'warning', 'error'] as const;

export type ChipVariant = typeof CHIP_VARIANTS[number];

export const CHIP_VARIANT_CONFIG: Record<ChipVariant, {
  backgroundColor: string;
  color: string;
  borderColor?: string;
  hoverBackgroundColor: string;
  hoverColor?: string;
  selectedBackgroundColor: string;
  selectedColor: string;
}> = {
  default: {
    backgroundColor: '#f3f4f6',
    color: '#374151',
    borderColor: '#d1d5db',
    hoverBackgroundColor: '#e5e7eb',
    hoverColor: '#1f2937',
    selectedBackgroundColor: '#d1d5db',
    selectedColor: '#111827',
  },
  primary: {
    backgroundColor: '#dbeafe',
    color: '#1e40af',
    borderColor: '#93c5fd',
    hoverBackgroundColor: '#bfdbfe',
    hoverColor: '#1e3a8a',
    selectedBackgroundColor: '#60a5fa',
    selectedColor: '#ffffff',
  },
  secondary: {
    backgroundColor: '#f5f3ff',
    color: '#5b21b6',
    borderColor: '#c4b5fd',
    hoverBackgroundColor: '#ede9fe',
    hoverColor: '#4c1d95',
    selectedBackgroundColor: '#8b5cf6',
    selectedColor: '#ffffff',
  },
  outline: {
    backgroundColor: 'transparent',
    color: '#374151',
    borderColor: '#d1d5db',
    hoverBackgroundColor: '#f9fafb',
    hoverColor: '#111827',
    selectedBackgroundColor: '#f3f4f6',
    selectedColor: '#111827',
  },
  success: {
    backgroundColor: '#d1fae5',
    color: '#065f46',
    borderColor: '#6ee7b7',
    hoverBackgroundColor: '#a7f3d0',
    hoverColor: '#047857',
    selectedBackgroundColor: '#10b981',
    selectedColor: '#ffffff',
  },
  warning: {
    backgroundColor: '#fef3c7',
    color: '#92400e',
    borderColor: '#fcd34d',
    hoverBackgroundColor: '#fde68a',
    hoverColor: '#78350f',
    selectedBackgroundColor: '#f59e0b',
    selectedColor: '#ffffff',
  },
  error: {
    backgroundColor: '#fee2e2',
    color: '#991b1b',
    borderColor: '#fca5a5',
    hoverBackgroundColor: '#fecaca',
    hoverColor: '#7f1d1d',
    selectedBackgroundColor: '#ef4444',
    selectedColor: '#ffffff',
  },
};

// ===== SIZE CONFIGURATION =====
export const CHIP_SIZES = ['xs', 'sm', 'md', 'lg'] as const;

export type ChipSize = typeof CHIP_SIZES[number];

export const CHIP_SIZE_CONFIG: Record<ChipSize, {
  height: number;
  fontSize: number;
  paddingX: number;
  paddingY: number;
  iconSize: number;
  removeIconSize: number;
  borderRadius: number;
}> = {
  xs: {
    height: 20,
    fontSize: 10,
    paddingX: 6,
    paddingY: 2,
    iconSize: 10,
    removeIconSize: 8,
    borderRadius: 10,
  },
  sm: {
    height: 24,
    fontSize: 12,
    paddingX: 8,
    paddingY: 3,
    iconSize: 12,
    removeIconSize: 10,
    borderRadius: 12,
  },
  md: {
    height: 28,
    fontSize: 13,
    paddingX: 10,
    paddingY: 4,
    iconSize: 14,
    removeIconSize: 12,
    borderRadius: 14,
  },
  lg: {
    height: 32,
    fontSize: 14,
    paddingX: 12,
    paddingY: 5,
    iconSize: 16,
    removeIconSize: 14,
    borderRadius: 16,
  },
};

// ===== COMPONENT CONFIG =====
export const CHIP_CONFIG = {
  // All variants
  variants: CHIP_VARIANTS,
  
  // All sizes
  sizes: CHIP_SIZES,
  
  // Variant styles
  variantStyles: CHIP_VARIANT_CONFIG,
  
  // Size styles
  sizeStyles: CHIP_SIZE_CONFIG,
  
  // Default values
  defaults: {
    variant: 'default' as ChipVariant,
    size: 'md' as ChipSize,
  },
  
  // Helper functions
  getVariantStyle(variant: ChipVariant) {
    return this.variantStyles[variant];
  },
  
  getSizeStyle(size: ChipSize) {
    return this.sizeStyles[size];
  },
  
  // Add new variant easily
  addVariant(name: string, config: any) {
    console.warn('Add variant manually to constants file');
  },
  
  // Add new size easily
  addSize(name: string, config: any) {
    console.warn('Add size manually to constants file');
  },
} as const;

// ===== I18N KEYS =====
export const CHIP_I18N_KEYS = {
  defaultLabel: 'chip.defaultLabel',
  removeButtonLabel: 'chip.removeButtonLabel',
  selectedLabel: 'chip.selectedLabel',
} as const;