// src/04-frameworks-and-drivers/ui/web/components/atoms/Progress/Progress.types.ts
import type { 
  ProgressVariant, 
  ProgressSize 
} from './Progress.constants';

export interface ProgressProps {
  // ===== CORE PROPS =====
  /** Visual style variant */
  variant?: ProgressVariant;
  
  /** Size of the component */
  size?: ProgressSize;
  
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
export interface ProgressWithStatusProps extends ProgressProps {
  /** Status indicator (online/offline/etc) */
  status?: 'online' | 'offline' | 'away' | 'busy' | 'none';
  
  /** Status position */
  statusPosition?: 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left';
}

export interface ProgressGroupProps {
  /** Group children */
  children: React.ReactNode;
  
  /** Size for all items in group */
  size?: ProgressSize;
  
  /** Spacing between items */
  spacing?: number | string;
  
  /** Maximum items to show */
  max?: number;
}
