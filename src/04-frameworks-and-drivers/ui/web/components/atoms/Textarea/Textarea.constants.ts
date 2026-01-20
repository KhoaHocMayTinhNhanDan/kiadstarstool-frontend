// src/04-frameworks-and-drivers/ui/web/components/atoms/Textarea/Textarea.constants.ts

// ===== VARIANT CONFIGURATION =====
export const TEXTAREA_VARIANTS = ['default', 'primary', 'secondary'] as const;

export type TextareaVariant = typeof TEXTAREA_VARIANTS[number];

export const TEXTAREA_VARIANT_CONFIG: Record<TextareaVariant, {
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
export const TEXTAREA_SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

export type TextareaSize = typeof TEXTAREA_SIZES[number];

export const TEXTAREA_SIZE_CONFIG: Record<TextareaSize, {
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
export const TEXTAREA_CONFIG = {
  // All variants
  variants: TEXTAREA_VARIANTS,
  
  // All sizes
  sizes: TEXTAREA_SIZES,
  
  // Variant styles
  variantStyles: TEXTAREA_VARIANT_CONFIG,
  
  // Size styles
  sizeStyles: TEXTAREA_SIZE_CONFIG,
  
  // Default values
  defaults: {
    variant: 'default' as TextareaVariant,
    size: 'md' as TextareaSize,
  },
  
  // Helper functions
  getVariantStyle(variant: TextareaVariant) {
    return this.variantStyles[variant];
  },
  
  getSizeStyle(size: TextareaSize) {
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
export const TEXTAREA_I18N_KEYS = {
  defaultLabel: 'textarea.defaultLabel',
  altText: 'textarea.altText',
  ariaLabel: 'textarea.ariaLabel',
  clickMessage: 'textarea.clickMessage',
  loadingText: 'textarea.loadingText',
} as const;
