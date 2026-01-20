// src/04-frameworks-and-drivers/ui/web/components/atoms/Input/Input.types.ts
import type { ReactNode, InputHTMLAttributes, TextareaHTMLAttributes, CSSProperties } from 'react';

export type InputSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type InputVariant = 'default' | 'filled' | 'outline' | 'flushed' | 'unstyled';
export type InputRadius = 'none' | 'sm' | 'md' | 'lg' | 'full';

// Base events that match React's native event handlers
export interface InputEvents {
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onKeyUp?: React.KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onPressEnter?: React.KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

// Thêm interface với custom onChange signature để sử dụng trong component
export interface CustomInputEvents {
  onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onPressEnter?: (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

// Common input configuration
export interface InputConfig {
  // Label & descriptions
  label?: string;
  description?: string;
  error?: string;
  success?: string;
  
  // State
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  loading?: boolean;
  
  // Visual
  variant?: InputVariant;
  size?: InputSize;
  radius?: InputRadius;
  fullWidth?: boolean;
  
  // Icons
  leftElement?: ReactNode;
  rightElement?: ReactNode;
  
  // Classes
  className?: string;        // Wrapper class
  inputClassName?: string;   // Input element class
  labelClassName?: string;   // Label class
  
  // Text
  placeholder?: string;
  showCount?: boolean;
  maxLength?: number;
  
  // Form
  id?: string;
  name?: string;
  value?: string;
  defaultValue?: string;
  
  // Styling
  style?: CSSProperties;
}

// Combined interface for Input - sử dụng native events để tương thích
export interface InputProps extends 
  InputConfig, 
  Omit<InputHTMLAttributes<HTMLInputElement>, 
    'size' | 
    'onChange' | 
    'onFocus' | 
    'onBlur' |
    'onKeyDown' |
    'onKeyUp' |
    'className' |
    'style' |
    'value' |
    'defaultValue'
  >,
  InputEvents {
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'time' | 'datetime-local';
}

// Combined interface for Textarea
export interface TextareaProps extends 
  InputConfig, 
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 
    'size' | 
    'onChange' | 
    'onFocus' | 
    'onBlur' |
    'onKeyDown' |
    'onKeyUp' |
    'className' |
    'style' |
    'value' |
    'defaultValue'
  >,
  InputEvents {
  type?: 'textarea';
  rows?: number;
  autosize?: boolean;
  minRows?: number;
  maxRows?: number;
}

// Union type for component props
export type InputComponentProps = InputProps | TextareaProps;

// Helper to determine if props are for textarea
export const isTextareaProps = (props: InputComponentProps): props is TextareaProps => {
  return props.type === 'textarea' || 'rows' in props || 'autosize' in props;
};

// Utility types
export type InputState = 'default' | 'focused' | 'disabled' | 'error' | 'success';