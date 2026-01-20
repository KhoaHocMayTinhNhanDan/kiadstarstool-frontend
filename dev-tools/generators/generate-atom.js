// dev-tools/generators/generate-atom-enhanced.js


import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const atomName = process.argv[2];
if (!atomName) {
  console.error('❌ Usage: npm run generate:atom <ComponentName>');
  console.error('   Example: npm run generate:atom Badge');
  process.exit(1);
}

const componentName = atomName.charAt(0).toUpperCase() + atomName.slice(1);
const folderName = componentName;
const atomNameLower = atomName.toLowerCase();

const PROJECT_ROOT = path.join(__dirname, '..', '..');
const ATOMS_BASE_PATH = path.join(
  PROJECT_ROOT,
  'src',
  '04-frameworks-and-drivers',
  'ui',
  'web',
  'components',
  'atoms'
);

// Tạo folder atom
const atomPath = path.join(ATOMS_BASE_PATH, folderName);
if (fs.existsSync(atomPath)) {
  console.error(`❌ Atom "${componentName}" already exists at: ${atomPath}`);
  process.exit(1);
}

fs.mkdirSync(atomPath, { recursive: true });
console.log(`✅ Created folder: ${atomPath}`);

// ===================== CONSTANTS TEMPLATE =====================
const constantsContent = `// src/04-frameworks-and-drivers/ui/web/components/atoms/${folderName}/${componentName}.constants.ts

// ===== VARIANT CONFIGURATION =====
export const ${componentName.toUpperCase()}_VARIANTS = ['default', 'primary', 'secondary'] as const;

export type ${componentName}Variant = typeof ${componentName.toUpperCase()}_VARIANTS[number];

export const ${componentName.toUpperCase()}_VARIANT_CONFIG: Record<${componentName}Variant, {
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
export const ${componentName.toUpperCase()}_SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

export type ${componentName}Size = typeof ${componentName.toUpperCase()}_SIZES[number];

export const ${componentName.toUpperCase()}_SIZE_CONFIG: Record<${componentName}Size, {
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
export const ${componentName.toUpperCase()}_CONFIG = {
  // All variants
  variants: ${componentName.toUpperCase()}_VARIANTS,
  
  // All sizes
  sizes: ${componentName.toUpperCase()}_SIZES,
  
  // Variant styles
  variantStyles: ${componentName.toUpperCase()}_VARIANT_CONFIG,
  
  // Size styles
  sizeStyles: ${componentName.toUpperCase()}_SIZE_CONFIG,
  
  // Default values
  defaults: {
    variant: 'default' as ${componentName}Variant,
    size: 'md' as ${componentName}Size,
  },
  
  // Helper functions
  getVariantStyle(variant: ${componentName}Variant) {
    return this.variantStyles[variant];
  },
  
  getSizeStyle(size: ${componentName}Size) {
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
export const ${componentName.toUpperCase()}_I18N_KEYS = {
  defaultLabel: '${atomNameLower}.defaultLabel',
  altText: '${atomNameLower}.altText',
  ariaLabel: '${atomNameLower}.ariaLabel',
  clickMessage: '${atomNameLower}.clickMessage',
  loadingText: '${atomNameLower}.loadingText',
} as const;
`;

// ===================== TYPES TEMPLATE =====================
const typesContent = `// src/04-frameworks-and-drivers/ui/web/components/atoms/${folderName}/${componentName}.types.ts
import type { 
  ${componentName}Variant, 
  ${componentName}Size 
} from './${componentName}.constants';

export interface ${componentName}Props {
  // ===== CORE PROPS =====
  /** Visual style variant */
  variant?: ${componentName}Variant;
  
  /** Size of the component */
  size?: ${componentName}Size;
  
  /** Component content */
  children?: React.ReactNode;
  
  /** Custom label/text */
  label?: string;
  
  // ===== STATE PROPS =====
  /** Disabled state */
  disabled?: boolean;
  
  /** Loading state */
  loading?: boolean;
  
  /** Selected/Active state */
  selected?: boolean;
  
  // ===== VISUAL PROPS =====
  /** Custom class name */
  className?: string;
  
  /** Custom styles */
  style?: React.CSSProperties;
  
  /** Show border */
  border?: boolean;
  
  /** Border radius override */
  borderRadius?: number | string;
  
  // ===== INTERACTION PROPS =====
  /** Click handler */
  onClick?: () => void;
  
  /** Mouse enter handler */
  onMouseEnter?: () => void;
  
  /** Mouse leave handler */
  onMouseLeave?: () => void;
  
  // ===== ACCESSIBILITY =====
  /** ARIA label */
  'aria-label'?: string;
  
  /** ARIA described by */
  'aria-describedby'?: string;
  
  /** Tab index */
  tabIndex?: number;
  
  // ===== ICON SUPPORT =====
  /** Left icon/element */
  leftElement?: React.ReactNode;
  
  /** Right icon/element */
  rightElement?: React.ReactNode;
  
  /** Icon only mode */
  iconOnly?: boolean;
  
  // ===== ADDITIONAL =====
  /** Any other HTML attributes */
  [key: string]: any;
}

// Optional: Extended props for specific use cases
export interface ${componentName}WithStatusProps extends ${componentName}Props {
  /** Status indicator (online/offline/etc) */
  status?: 'online' | 'offline' | 'away' | 'busy' | 'none';
  
  /** Status position */
  statusPosition?: 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left';
}

export interface ${componentName}GroupProps {
  /** Group children */
  children: React.ReactNode;
  
  /** Size for all items in group */
  size?: ${componentName}Size;
  
  /** Spacing between items */
  spacing?: number | string;
  
  /** Maximum items to show */
  max?: number;
}
`;

// ===================== STYLES TEMPLATE =====================
const stylesContent = `// src/04-frameworks-and-drivers/ui/web/components/atoms/${folderName}/${componentName}.styles.ts
import styled, { css } from 'styled-components';
import type { ${componentName}Variant, ${componentName}Size } from './${componentName}.constants';

export interface Styled${componentName}Props {
  $variant: ${componentName}Variant;
  $size: ${componentName}Size;
  $disabled: boolean;
  $selected: boolean;
  $loading: boolean;
  $border: boolean;
}

// Base styles - TỔNG QUÁT CHO MỌI ATOM
export const Styled${componentName} = styled.div<Styled${componentName}Props>\`
  // ===== LAYOUT =====
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
  
  // ===== TYPOGRAPHY =====
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  font-weight: 500;
  line-height: \${props => props.theme?.lineHeight || 1.4};
  white-space: nowrap;
  text-decoration: none;
  
  // ===== INTERACTION =====
  cursor: \${props => props.$disabled ? 'not-allowed' : 'pointer'};
  user-select: none;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover:not(:disabled) {
    opacity: \${props => props.$disabled ? 1 : 0.9};
    transform: \${props => props.$disabled ? 'none' : 'translateY(-1px)'};
  }
  
  &:active:not(:disabled) {
    transform: \${props => props.$disabled ? 'none' : 'translateY(0)'};
  }
  
  &:focus-visible {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }
  
  // ===== STATES =====
  \${props => props.$disabled && css\`
    opacity: 0.6;
    pointer-events: none;
  \`}
  
  \${props => props.$selected && css\`
    box-shadow: 0 0 0 2px #3b82f6;
  \`}
  
  \${props => props.$loading && css\`
    pointer-events: none;
    opacity: 0.8;
  \`}
  
  \${props => props.$border && css\`
    border-style: solid;
    border-width: 1px;
  \`}
  
  // ===== SIZE-BASED STYLES =====
  \${props => {
    const size = props.$size;
    return css\`
      font-size: \${props.theme?.fontSize || '14px'};
      padding: \${props.theme?.padding || '6px 12px'};
      border-radius: \${props.theme?.borderRadius || '6px'};
      min-height: \${props.theme?.size || '40px'};
      min-width: \${props.theme?.size || '40px'};
    \`;
  }}
  
  // ===== VARIANT-BASED STYLES =====
  \${props => {
    const variant = props.$variant;
    return css\`
      color: \${props.theme?.color || '#374151'};
      background-color: \${props.theme?.bgColor || '#f3f4f6'};
      border-color: \${props.theme?.borderColor || 'transparent'};
    \`;
  }}
\`;

// Status indicator - TỔNG QUÁT, DÙNG CHO AVATAR, BADGE, ETC.
export const StatusIndicator = styled.div<{
  $size: ${componentName}Size;
  $status: 'online' | 'offline' | 'away' | 'busy';
  $position: 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left';
}>\`
  position: absolute;
  border-radius: 50%;
  border: 2px solid white;
  z-index: 1;
  
  // Size-based
  \${props => {
    const statusSize = props.$size === 'xs' ? 6 : 
                       props.$size === 'sm' ? 8 : 
                       props.$size === 'md' ? 10 : 
                       props.$size === 'lg' ? 12 : 14;
    return css\`
      width: \${statusSize}px;
      height: \${statusSize}px;
    \`;
  }}
  
  // Position-based
  \${props => {
    const position = props.$position;
    const offset = props.$size === 'xs' ? 1 : 2;
    
    switch (position) {
      case 'top-right': return css\` top: -\${offset}px; right: -\${offset}px; \`;
      case 'bottom-right': return css\` bottom: -\${offset}px; right: -\${offset}px; \`;
      case 'top-left': return css\` top: -\${offset}px; left: -\${offset}px; \`;
      case 'bottom-left': return css\` bottom: -\${offset}px; left: -\${offset}px; \`;
      default: return css\` top: -\${offset}px; right: -\${offset}px; \`;
    }
  }}
  
  // Status color
  \${props => {
    const status = props.$status;
    switch (status) {
      case 'online': return css\` background-color: #22c55e; \`;
      case 'offline': return css\` background-color: #94a3b8; \`;
      case 'away': return css\` background-color: #f59e0b; \`;
      case 'busy': return css\` background-color: #ef4444; \`;
      default: return css\` background-color: transparent; \`;
    }
  }}
\`;

// Loading spinner - TỔNG QUÁT
export const LoadingSpinner = styled.div<{ $size: ${componentName}Size }>\`
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  
  \${props => {
    const spinnerSize = props.$size === 'xs' ? 12 : 
                        props.$size === 'sm' ? 14 : 
                        props.$size === 'md' ? 16 : 
                        props.$size === 'lg' ? 18 : 20;
    return css\`
      width: \${spinnerSize}px;
      height: \${spinnerSize}px;
    \`;
  }}
\`;
`;

// ===================== COMPONENT TEMPLATE =====================
const componentContent = `// src/04-frameworks-and-drivers/ui/web/components/atoms/${folderName}/${componentName}.tsx
import React, { forwardRef } from 'react';
import { useI18n } from '@/shared/i18n';
import { 
  Styled${componentName}, 
  StatusIndicator, 
  LoadingSpinner 
} from './${componentName}.styles';
import type { ${componentName}Props, ${componentName}WithStatusProps } from './${componentName}.types';
import { 
  ${componentName.toUpperCase()}_CONFIG,
  ${componentName.toUpperCase()}_I18N_KEYS 
} from './${componentName}.constants';

export const ${componentName} = forwardRef<HTMLDivElement, ${componentName}Props>(
  (
    {
      // Core props
      variant = ${componentName.toUpperCase()}_CONFIG.defaults.variant,
      size = ${componentName.toUpperCase()}_CONFIG.defaults.size,
      children,
      label,
      
      // State props
      disabled = false,
      loading = false,
      selected = false,
      
      // Visual props
      className,
      style,
      border = false,
      borderRadius,
      
      // Interaction props
      onClick,
      onMouseEnter,
      onMouseLeave,
      
      // Accessibility
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
      tabIndex = 0,
      
      // Icon support
      leftElement,
      rightElement,
      iconOnly = false,
      
      // Additional props
      ...props
    },
    ref
  ) => {
    const { t } = useI18n();
    
    // Get config from constants
    const variantStyle = ${componentName.toUpperCase()}_CONFIG.getVariantStyle(variant);
    const sizeStyle = ${componentName.toUpperCase()}_CONFIG.getSizeStyle(size);
    
    // Determine content
    const content = children || label || t(${componentName.toUpperCase()}_I18N_KEYS.defaultLabel, '${componentName}');
    
    // Determine aria-label
    const resolvedAriaLabel = ariaLabel || 
      t(${componentName.toUpperCase()}_I18N_KEYS.ariaLabel, '${componentName}');
    
    // Handle click
    const handleClick = (e: React.MouseEvent) => {
      if (disabled || loading || !onClick) return;
      onClick();
    };
    
    // Merge styles
    const mergedStyle = {
      ...style,
      ...(borderRadius && { borderRadius }),
      ...(iconOnly && { 
        padding: \`\${sizeStyle.padding.split(' ')[0]}\`,
        aspectRatio: '1/1'
      }),
    };
    
    // Theme for styled component
    const theme = {
      ...variantStyle,
      ...sizeStyle,
    };

    return (
      <Styled${componentName}
        ref={ref}
        $variant={variant}
        $size={size}
        $disabled={disabled}
        $selected={selected}
        $loading={loading}
        $border={border}
        className={\`${atomNameLower} \${className || ''}\`}
        style={mergedStyle}
        theme={theme}
        onClick={handleClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        aria-label={resolvedAriaLabel}
        aria-describedby={ariaDescribedBy}
        aria-disabled={disabled}
        aria-busy={loading}
        tabIndex={disabled ? -1 : tabIndex}
        role={onClick ? 'button' : 'presentation'}
        {...props}
      >
        {/* Loading state */}
        {loading && (
          <LoadingSpinner $size={size} />
        )}
        
        {/* Left element */}
        {!loading && leftElement && (
          <span style={{ marginRight: 8, display: 'flex' }}>
            {leftElement}
          </span>
        )}
        
        {/* Content */}
        {!loading && !iconOnly && (
          <span style={{ 
            opacity: loading ? 0.5 : 1,
            fontSize: sizeStyle.fontSize,
            lineHeight: sizeStyle.lineHeight 
          }}>
            {content}
          </span>
        )}
        
        {/* Right element */}
        {!loading && rightElement && (
          <span style={{ marginLeft: 8, display: 'flex' }}>
            {rightElement}
          </span>
        )}
      </Styled${componentName}>
    );
  }
);

// Extended component with status
export const ${componentName}WithStatus = forwardRef<HTMLDivElement, ${componentName}WithStatusProps>(
  ({ status = 'none', statusPosition = 'top-right', ...props }, ref) => {
    return (
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <${componentName} ref={ref} {...props} />
        {status !== 'none' && (
          <StatusIndicator 
            $size={props.size || 'md'}
            $status={status}
            $position={statusPosition}
          />
        )}
      </div>
    );
  }
);

// Group component
export const ${componentName}Group: React.FC<{
  children: React.ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  spacing?: number | string;
  max?: number;
}> = ({ children, size = 'md', spacing = 8, max }) => {
  const childrenArray = React.Children.toArray(children);
  const total = childrenArray.length;
  const toShow = max ? childrenArray.slice(0, max) : childrenArray;
  const remaining = max ? total - max : 0;
  
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center',
      gap: spacing 
    }}>
      {toShow.map((child, index) => 
        React.isValidElement(child) 
          ? React.cloneElement(child, { size, key: index } as any)
          : child
      )}
      {remaining > 0 && (
        <div style={{
          width: ${componentName.toUpperCase()}_CONFIG.getSizeStyle(size).size,
          height: ${componentName.toUpperCase()}_CONFIG.getSizeStyle(size).size,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#e5e7eb',
          borderRadius: '50%',
          fontSize: ${componentName.toUpperCase()}_CONFIG.getSizeStyle(size).fontSize * 0.8,
          color: '#6b7280',
          fontWeight: 600,
        }}>
          +{remaining}
        </div>
      )}
    </div>
  );
};

${componentName}.displayName = '${componentName}';
${componentName}WithStatus.displayName = '${componentName}WithStatus';

export default ${componentName};
`;

// ===================== TEST FILE TEMPLATE =====================
const testContent = `// src/04-frameworks-and-drivers/ui/web/components/atoms/${folderName}/${componentName}-test.tsx
import { useState } from 'react';
import { ${componentName}, ${componentName}WithStatus, ${componentName}Group } from './${componentName}';
import { useI18n } from '@/shared/i18n';
import { ${componentName.toUpperCase()}_CONFIG } from './${componentName}.constants';

export function ${componentName}Test() {
  const { t, locale, setLocale } = useI18n();
  const [selectedVariant, setSelectedVariant] = useState('default');
  const [selectedSize, setSelectedSize] = useState('md');
  const [clickCount, setClickCount] = useState(0);

  const handleClick = () => {
    setClickCount(prev => prev + 1);
    alert(t(${componentName.toUpperCase()}_I18N_KEYS.clickMessage, '${componentName} clicked!'));
  };

  const variants = ${componentName.toUpperCase()}_CONFIG.variants;
  const sizes = ${componentName.toUpperCase()}_CONFIG.sizes;

  return (
    <div style={{ padding: 24, maxWidth: 1200, margin: '0 auto' }}>
      <h2 style={{ marginBottom: 24, color: '#333' }}>🧪 ${componentName} Component Tests</h2>
      
      {/* I18N Demo */}
      <section style={{ marginBottom: 32, padding: 16, backgroundColor: '#f8fafc', borderRadius: 8 }}>
        <h3 style={{ marginBottom: 12, color: '#555' }}>🌐 I18N Demo</h3>
        <p style={{ marginBottom: 12, color: '#666' }}>
          Current locale: <strong>{locale}</strong>
        </p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {['en', 'vi', 'ja', 'zh'].map(lang => (
            <button
              key={lang}
              onClick={() => setLocale(lang)}
              style={{
                padding: '6px 12px',
                backgroundColor: locale === lang ? '#3b82f6' : '#e5e7eb',
                color: locale === lang ? 'white' : '#374151',
                border: 'none',
                borderRadius: 4,
                cursor: 'pointer',
                fontSize: 14
              }}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>
      </section>

      {/* Variants Demo */}
      <section style={{ marginBottom: 32 }}>
        <h3 style={{ marginBottom: 16, color: '#555' }}>🎨 Variants</h3>
        <p style={{ marginBottom: 12, color: '#666' }}>
          Selected: <strong>{selectedVariant}</strong>
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
          {variants.map(variant => (
            <${componentName}
              key={variant}
              variant={variant}
              size="md"
              onClick={() => setSelectedVariant(variant)}
              style={{
                border: selectedVariant === variant ? '2px solid #3b82f6' : 'none'
              }}
            >
              {variant.charAt(0).toUpperCase() + variant.slice(1)}
            </${componentName}>
          ))}
        </div>
      </section>

      {/* Sizes Demo */}
      <section style={{ marginBottom: 32 }}>
        <h3 style={{ marginBottom: 16, color: '#555' }}>📏 Sizes</h3>
        <p style={{ marginBottom: 12, color: '#666' }}>
          Selected: <strong>{selectedSize}</strong>
        </p>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', marginBottom: 16 }}>
          {sizes.map(size => (
            <${componentName}
              key={size}
              size={size}
              variant="primary"
              onClick={() => setSelectedSize(size)}
              style={{
                border: selectedSize === size ? '2px solid #3b82f6' : 'none'
              }}
            >
              {size.toUpperCase()}
            </${componentName}>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          {sizes.map(size => (
            <div key={size} style={{ textAlign: 'center' }}>
              <${componentName} size={size} variant="secondary">
                {size}
              </${componentName}>
              <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
                {${componentName.toUpperCase()}_CONFIG.getSizeStyle(size).size}px
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* States Demo */}
      <section style={{ marginBottom: 32 }}>
        <h3 style={{ marginBottom: 16, color: '#555' }}>⚡ States</h3>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <${componentName} variant="primary">
            Normal
          </${componentName}>
          <${componentName} variant="primary" disabled>
            Disabled
          </${componentName}>
          <${componentName} variant="primary" loading>
            {t(${componentName.toUpperCase()}_I18N_KEYS.loadingText, 'Loading...')}
          </${componentName}>
          <${componentName} variant="primary" selected>
            Selected
          </${componentName}>
          <${componentName} 
            variant="primary" 
            onClick={handleClick}
          >
            Click Me ({clickCount})
          </${componentName}>
        </div>
      </section>

      {/* With Status */}
      <section style={{ marginBottom: 32 }}>
        <h3 style={{ marginBottom: 16, color: '#555' }}>🔴 With Status</h3>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          <${componentName}WithStatus 
            variant="default" 
            size="lg"
            status="online"
          >
            Online
          </${componentName}WithStatus>
          <${componentName}WithStatus 
            variant="default" 
            size="lg"
            status="away"
          >
            Away
          </${componentName}WithStatus>
          <${componentName}WithStatus 
            variant="default" 
            size="lg"
            status="busy"
          >
            Busy
          </${componentName}WithStatus>
          <${componentName}WithStatus 
            variant="default" 
            size="lg"
            status="offline"
          >
            Offline
          </${componentName}WithStatus>
        </div>
      </section>

      {/* Group Demo */}
      <section style={{ marginBottom: 32 }}>
        <h3 style={{ marginBottom: 16, color: '#555' }}>👥 Group</h3>
        <div style={{ marginBottom: 16 }}>
          <h4 style={{ marginBottom: 8, color: '#666' }}>Basic Group</h4>
          <${componentName}Group spacing={12}>
            <${componentName} variant="primary">Item 1</${componentName}>
            <${componentName} variant="secondary">Item 2</${componentName}>
            <${componentName} variant="default">Item 3</${componentName}>
            <${componentName} variant="primary">Item 4</${componentName}>
            <${componentName} variant="secondary">Item 5</${componentName}>
          </${componentName}Group>
        </div>
        <div>
          <h4 style={{ marginBottom: 8, color: '#666' }}>With Max Limit</h4>
          <${componentName}Group max={3} spacing={8}>
            <${componentName} size="sm" variant="primary">A</${componentName}>
            <${componentName} size="sm" variant="secondary">B</${componentName}>
            <${componentName} size="sm" variant="default">C</${componentName}>
            <${componentName} size="sm" variant="primary">D</${componentName}>
            <${componentName} size="sm" variant="secondary">E</${componentName}>
          </${componentName}Group>
          <p style={{ fontSize: 14, color: '#666', marginTop: 8 }}>
            Showing 3 of 5 items
          </p>
        </div>
      </section>

      {/* Config Summary */}
      <section style={{ 
        padding: 20, 
        backgroundColor: '#f0f9ff', 
        borderRadius: 8,
        border: '1px solid #bae6fd'
      }}>
        <h4 style={{ marginTop: 0, color: '#0369a1' }}>📊 Config Summary</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 16 }}>
          <div>
            <strong>Variants:</strong>
            <ul style={{ margin: '8px 0 0 0', paddingLeft: 20 }}>
              {variants.map(v => <li key={v}>{v}</li>)}
            </ul>
          </div>
          <div>
            <strong>Sizes:</strong>
            <ul style={{ margin: '8px 0 0 0', paddingLeft: 20 }}>
              {sizes.map(s => (
                <li key={s}>{s}: {${componentName.toUpperCase()}_CONFIG.getSizeStyle(s).size}px</li>
              ))}
            </ul>
          </div>
          <div>
            <strong>Defaults:</strong>
            <ul style={{ margin: '8px 0 0 0', paddingLeft: 20 }}>
              <li>Variant: {${componentName.toUpperCase()}_CONFIG.defaults.variant}</li>
              <li>Size: {${componentName.toUpperCase()}_CONFIG.defaults.size}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Interactive Test */}
      <section style={{ 
        padding: 20, 
        backgroundColor: '#f8fafc', 
        borderRadius: 8,
        marginTop: 32
      }}>
        <h3 style={{ marginBottom: 12, color: '#555' }}>🔄 Interactive Test</h3>
        <p style={{ marginBottom: 16, color: '#666' }}>
          Create your custom ${componentName}:
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
          <div>
            <label style={{ display: 'block', marginBottom: 8, color: '#555' }}>
              Variant:
              <select 
                value={selectedVariant}
                onChange={(e) => setSelectedVariant(e.target.value)}
                style={{ marginLeft: 8, padding: '6px 12px', borderRadius: 4 }}
              >
                {variants.map(v => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
            </label>
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: 8, color: '#555' }}>
              Size:
              <select 
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                style={{ marginLeft: 8, padding: '6px 12px', borderRadius: 4 }}
              >
                {sizes.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </label>
          </div>
          
          <${componentName}
            variant={selectedVariant}
            size={selectedSize}
            onClick={handleClick}
            style={{ alignSelf: 'flex-start' }}
          >
            Test ${componentName}
          </${componentName}>
          
          <div style={{ padding: 12, backgroundColor: '#e9ecef', borderRadius: 6 }}>
            <strong>Current config:</strong>
            <div style={{ marginTop: 4, fontSize: 14 }}>
              Variant: <code>{selectedVariant}</code>, 
              Size: <code>{selectedSize}</code> ({${componentName.toUpperCase()}_CONFIG.getSizeStyle(selectedSize).size}px),
              Clicks: <code>{clickCount}</code>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
`;

// ===================== INDEX FILE =====================
const indexContent = `// src/04-frameworks-and-drivers/ui/web/components/atoms/${folderName}/index.ts
export { default as ${componentName} } from './${componentName}';
export { ${componentName}WithStatus, ${componentName}Group } from './${componentName}';
export type { 
  ${componentName}Props, 
  ${componentName}WithStatusProps,
  ${componentName}GroupProps 
} from './${componentName}.types';
export type { 
  ${componentName}Variant, 
  ${componentName}Size 
} from './${componentName}.constants';
`;

// ===================== README FILE =====================
const readmeContent = `# ${componentName} Component

A highly configurable ${atomNameLower} component with variants, sizes, status indicators, and i18n support.

## Features
- 🎨 Multiple variants (default, primary, secondary)
- 📏 5 sizes (xs, sm, md, lg, xl) with consistent scaling
- 🔴 Status indicators (online, away, busy, offline)
- 👥 Group component with max limits
- 🌐 Full i18n support
- ♿ Accessibility compliant
- ⚡ Loading, disabled, selected states
- 🔧 Easy to extend with new variants/sizes

## Installation
\`\`\`bash
npm run generate:atom ${componentName}
\`\`\`

## Usage
\`\`\`tsx
import { ${componentName}, ${componentName}WithStatus, ${componentName}Group } from './components/atoms/${folderName}';

// Basic usage
<${componentName} variant="primary" size="md">
  Button
</${componentName}>

// With status indicator
<${componentName}WithStatus 
  variant="default" 
  size="lg"
  status="online"
>
  Online User
</${componentName}WithStatus>

// Group of items
<${componentName}Group max={3}>
  <${componentName} variant="primary">Item 1</${componentName}>
  <${componentName} variant="secondary">Item 2</${componentName}>
  <${componentName} variant="default">Item 3</${componentName}>
</${componentName}Group>
\`\`\`

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | 'default' \\| 'primary' \\| 'secondary' | 'default' | Visual style |
| size | 'xs' \\| 'sm' \\| 'md' \\| 'lg' \\| 'xl' | 'md' | Size |
| disabled | boolean | false | Disabled state |
| loading | boolean | false | Loading state |
| selected | boolean | false | Selected state |
| status | 'online' \\| 'offline' \\| 'away' \\| 'busy' \\| 'none' | 'none' | Status indicator |
| onClick | () => void | - | Click handler |

## Adding New Variants
\`\`\`typescript
// In ${componentName}.constants.ts
export const ${componentName.toUpperCase()}_VARIANTS = [
  'default', 
  'primary', 
  'secondary',
  'success', // 👈 Add new variant
] as const;

export const ${componentName.toUpperCase()}_VARIANT_CONFIG = {
  // ... existing variants
  success: { // 👈 Add config
    color: '#ffffff',
    bgColor: '#10b981',
    borderColor: '#059669',
    fontSize: 14,
    iconSize: 16,
    statusSize: 8,
  },
};
\`\`\`

## Adding New Sizes
\`\`\`typescript
// In ${componentName}.constants.ts
export const ${componentName.toUpperCase()}_SIZES = [
  'xs', 'sm', 'md', 'lg', 'xl',
  'xxl' // 👈 Add new size
] as const;

export const ${componentName.toUpperCase()}_SIZE_CONFIG = {
  // ... existing sizes
  xxl: { // 👈 Add config
    size: 72,
    fontSize: 20,
    padding: '12px 24px',
    iconSize: 22,
    borderRadius: 12,
    statusSize: 16,
    lineHeight: 1.7,
  },
};
\`\`\`

## I18N Setup
Add these keys to your i18n files:

\`\`\`typescript
// en.ts
'${atomNameLower}.defaultLabel': '${componentName}',
'${atomNameLower}.altText': '${componentName}',
'${atomNameLower}.ariaLabel': '${componentName}',
'${atomNameLower}.clickMessage': '${componentName} clicked!',
'${atomNameLower}.loadingText': 'Loading...',

// vi.ts
'${atomNameLower}.defaultLabel': '${componentName}',
'${atomNameLower}.altText': '${componentName}',
'${atomNameLower}.ariaLabel': '${componentName}',
'${atomNameLower}.clickMessage': 'Đã nhấn ${componentName}!',
'${atomNameLower}.loadingText': 'Đang tải...',
\`\`\`

## Testing
Run the test component in App.tsx:
\`\`\`tsx
import { ${componentName}Test } from './components/atoms/${folderName}/${componentName}-test';
\`\`\`

## Development
This component follows the constants-driven pattern:
1. **Constants**: Define variants, sizes, styles in constants file
2. **Types**: Auto-generated from constants
3. **Component**: Uses config from constants
4. **Easy extension**: Add variants/sizes in one place
`;

// ===================== CREATE FILES =====================
const files = [
  { name: `${componentName}.constants.ts`, content: constantsContent },
  { name: `${componentName}.types.ts`, content: typesContent },
  { name: `${componentName}.styles.ts`, content: stylesContent },
  { name: `${componentName}.tsx`, content: componentContent },
  { name: `${componentName}-test.tsx`, content: testContent },
  { name: 'index.ts', content: indexContent },
  { name: 'README.md', content: readmeContent },
];

// Create all files
files.forEach(({ name, content }) => {
  const filePath = path.join(atomPath, name);
  fs.writeFileSync(filePath, content);
  console.log(`✅ Created: ${name}`);
});

// Update atoms index
const atomsIndexPath = path.join(ATOMS_BASE_PATH, 'index.ts');
try {
  if (fs.existsSync(atomsIndexPath)) {
    const content = fs.readFileSync(atomsIndexPath, 'utf8');
    const exportLine = `export { ${componentName} } from './${folderName}';\n`;
    
    if (!content.includes(exportLine.trim())) {
      fs.appendFileSync(atomsIndexPath, exportLine);
      console.log(`✅ Updated: atoms/index.ts`);
    }
  } else {
    const initialContent = `// Auto-generated exports for all atoms\nexport { ${componentName} } from './${folderName}';\n`;
    fs.writeFileSync(atomsIndexPath, initialContent);
    console.log(`✅ Created: atoms/index.ts`);
  }
} catch (error) {
  console.log('⚠️  Could not update atoms index.ts:', error.message);
}

console.log(`\n🎉 Successfully generated ${componentName} atom with enhanced configuration!`);
console.log(`📁 Location: ${atomPath}`);
console.log(`\n🚀 Key Features:`);
console.log(`✅ Constants-driven configuration`);
console.log(`✅ Total ${files.length} files generated`);
console.log(`✅ Variants: default, primary, secondary`);
console.log(`✅ Sizes: xs(24px), sm(32px), md(40px), lg(48px), xl(56px)`);
console.log(`✅ Status indicators: online, away, busy, offline`);
console.log(`✅ Group component with max limit support`);
console.log(`✅ Full i18n integration`);
console.log(`✅ Accessibility compliant`);
console.log(`\n📋 Next steps:`);
console.log(`1. Add I18N keys from ${folderName}/README.md`);
console.log(`2. Customize variants/sizes in ${componentName}.constants.ts`);
console.log(`3. Add ${componentName}Test to App.tsx`);
console.log(`\n💡 Example usage:`);
console.log(`import { ${componentName} } from './components/atoms/${folderName}';`);
console.log(`<${componentName} variant="primary" size="lg">Click Me</${componentName}>`);