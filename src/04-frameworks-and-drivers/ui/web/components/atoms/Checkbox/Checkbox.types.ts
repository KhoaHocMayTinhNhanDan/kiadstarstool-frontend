// src/04-frameworks-and-drivers/ui/web/components/atoms/Checkbox/Checkbox.types.ts
import type { ReactNode, InputHTMLAttributes } from 'react';

export type CheckboxSize = 'sm' | 'md' | 'lg';
export type CheckboxVariant = 'default' | 'filled' | 'outline';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
  /** Label text or React node */
  label?: ReactNode;
  
  /** Visual style variant */
  variant?: CheckboxVariant;
  
  /** Size of the checkbox */
  size?: CheckboxSize;
  
  /** Checked state */
  checked?: boolean;
  
  /** Indeterminate state (show dash) */
  indeterminate?: boolean;
  
  /** Disabled state */
  disabled?: boolean;
  
  /** Error state */
  error?: String | boolean;
  
  /** Success state */
  success?: boolean;
  
  /** Custom class name for wrapper */
  className?: string;
  
  /** Custom class name for label */
  labelClassName?: string;
  
  /** Position of label relative to checkbox */
  labelPosition?: 'left' | 'right';
  
  /** Change handler with both value and event */
  onChange?: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
  
  /** Additional description text */
  description?: string;
  
  /** Whether checkbox is required (shows asterisk) */
  required?: boolean;
  
  /** Whether to show the check icon */
  showCheckIcon?: boolean;
}