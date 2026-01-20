// src/04-frameworks-and-drivers/ui/web/components/atoms/Loading-spinner/Loading-spinner.types.ts

export type LoadingSpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type LoadingSpinnerVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'light' | 'dark';
export type LoadingSpinnerType = 'spinner' | 'dots' | 'pulse' | 'ring' | 'dual-ring';

export interface LoadingSpinnerProps {
  /** Size of the spinner */
  size?: LoadingSpinnerSize;
  
  /** Visual variant */
  variant?: LoadingSpinnerVariant;
  
  /** Type of spinner animation */
  type?: LoadingSpinnerType;
  
  /** Custom label/text to display */
  label?: string;
  
  /** Position of label relative to spinner */
  labelPosition?: 'top' | 'bottom' | 'left' | 'right';
  
  /** Whether spinner is full page overlay */
  fullScreen?: boolean;
  
  /** Whether to show backdrop */
  withBackdrop?: boolean;
  
  /** Custom backdrop color */
  backdropColor?: string;
  
  /** Whether to show transparent backdrop */
  transparentBackdrop?: boolean;
  
  /** Delay before showing spinner (ms) */
  delay?: number;
  
  /** Speed of animation (ms) */
  speed?: number;
  
  /** Thickness of spinner lines */
  thickness?: number;
  
  /** Custom color */
  color?: string;
  
  /** Custom className */
  className?: string;
  
  /** Custom style */
  style?: React.CSSProperties;
  
  /** Accessibility label */
  'aria-label'?: string;
  
  /** Additional props */
  [key: string]: any;
}