// src/04-frameworks-and-drivers/ui/web/components/atoms/Button/Button.types.ts
import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger' | 'success' | 'ghost';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ButtonRadius = 'none' | 'sm' | 'md' | 'lg' | 'full';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button content */
  children: React.ReactNode;  // ✅ Sử dụng React.ReactNode
  
  /** Visual style variant */
  variant?: ButtonVariant;
  
  /** Size of the button */
  size?: ButtonSize;
  
  /** Border radius */
  radius?: ButtonRadius;
  
  /** Loading state */
  loading?: boolean;
  
  /** Disabled state */
  disabled?: boolean;
  
  /** Full width */
  fullWidth?: boolean;
  
  /** Left icon */
  leftIcon?: React.ReactNode;  // ✅ Sử dụng React.ReactNode
  
  /** Right icon */
  rightIcon?: React.ReactNode;  // ✅ Sử dụng React.ReactNode
  
  /** Loading text (shows when loading is true) */
  loadingText?: string;
  
  /** Custom class name */
  className?: string;
  
  /** Click handler */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}