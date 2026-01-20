// src/04-frameworks-and-drivers/ui/web/components/atoms/Icon/Icon.constants.ts

// ===== VARIANT CONFIGURATION =====
export const ICON_VARIANTS = ['default', 'primary', 'secondary'] as const;

export type IconVariant = typeof ICON_VARIANTS[number];

export const ICON_VARIANT_CONFIG: Record<IconVariant, {
  // Add your variant-specific properties here
  // Example: color, bgColor, borderColor, etc.
  color: string;
  bgColor: string;
  borderColor?: string;
  fontSize?: number;
  iconSize?: number;
  statusSize?: number; // 👈 TỔNG QUÁT - có thể dùng cho avatar, badge, etc.
}> = {
  default: {
    color: '#374151',
    bgColor: '#f3f4f6',
    borderColor: '#d1d5db',
    fontSize: 14,
    iconSize: 16,
    statusSize: 8,
  },
  primary: {
    color: '#ffffff',
    bgColor: '#3b82f6',
    borderColor: '#2563eb',
    fontSize: 14,
    iconSize: 16,
    statusSize: 8,
  },
  secondary: {
    color: '#374151',
    bgColor: '#e5e7eb',
    borderColor: '#9ca3af',
    fontSize: 14,
    iconSize: 16,
    statusSize: 8,
  },
};

// ===== SIZE CONFIGURATION =====
export const ICON_SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

export type IconSize = typeof ICON_SIZES[number];

export const ICON_SIZE_CONFIG: Record<IconSize, {
  // Size-specific properties - TỔNG QUÁT CHO MỌI ATOM
  size: number;        // Main size (width/height)
  fontSize: number;    // Font size
  padding: string;     // Padding
  iconSize: number;    // Icon size
  borderRadius: number; // Border radius
  statusSize: number;  // Status indicator size 👈 DÙNG CHUNG
  lineHeight: number;  // Line height
}> = {
  xs: {
    size: 24,
    fontSize: 10,
    padding: '2px 6px',
    iconSize: 12,
    borderRadius: 4,
    statusSize: 6,     // 👈 TỔNG QUÁT - dùng cho avatar status, badge dot, etc.
    lineHeight: 1.2,
  },
  sm: {
    size: 32,
    fontSize: 12,
    padding: '4px 8px',
    iconSize: 14,
    borderRadius: 5,
    statusSize: 8,     // 👈 TỔNG QUÁT
    lineHeight: 1.3,
  },
  md: {
    size: 40,
    fontSize: 14,
    padding: '6px 12px',
    iconSize: 16,
    borderRadius: 6,
    statusSize: 10,    // 👈 TỔNG QUÁT
    lineHeight: 1.4,
  },
  lg: {
    size: 48,
    fontSize: 16,
    padding: '8px 16px',
    iconSize: 18,
    borderRadius: 8,
    statusSize: 12,    // 👈 TỔNG QUÁT
    lineHeight: 1.5,
  },
  xl: {
    size: 56,
    fontSize: 18,
    padding: '10px 20px',
    iconSize: 20,
    borderRadius: 10,
    statusSize: 14,    // 👈 TỔNG QUÁT
    lineHeight: 1.6,
  },
};

// ===== COMPONENT CONFIG (TỔNG HỢP) =====
export const ICON_CONFIG = {
  // All variants
  variants: ICON_VARIANTS,
  
  // All sizes
  sizes: ICON_SIZES,
  
  // Variant styles
  variantStyles: ICON_VARIANT_CONFIG,
  
  // Size styles
  sizeStyles: ICON_SIZE_CONFIG,
  
  // Default values
  defaults: {
    variant: 'default' as IconVariant,
    size: 'md' as IconSize,
  },
  
  // Helper functions
  getVariantStyle(variant: IconVariant) {
    return this.variantStyles[variant];
  },
  
  getSizeStyle(size: IconSize) {
    return this.sizeStyles[size];
  },
  
  // Add new variant easily
  addVariant(name: string, config: any) {
    // This is a template for manual extension
    console.warn('Add variant manually to constants file');
  },
  
  // Add new size easily
  addSize(name: string, config: any) {
    // This is a template for manual extension
    console.warn('Add size manually to constants file');
  },
} as const;

// ===== I18N KEYS =====
export const ICON_I18N_KEYS = {
  defaultLabel: 'icon.defaultLabel',
  altText: 'icon.altText',
  ariaLabel: 'icon.ariaLabel',
  clickMessage: 'icon.clickMessage',
  loadingText: 'icon.loadingText',
} as const;
