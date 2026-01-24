// src/04-frameworks-and-drivers/ui/web/components/atoms/Switch/Switch.types.ts

// ===== BASE TYPES =====
export type SwitchSize = 'sm' | 'md' | 'lg';
export type SwitchVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error';
export type SwitchLabelPosition = 'left' | 'right' | 'top' | 'bottom';

// ===== SWITCH PROPS =====
export interface SwitchProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Whether switch is checked */
  checked?: boolean;
  
  /** Default checked state (uncontrolled) */
  defaultChecked?: boolean;
  
  /** Called when switch state changes */
  onChange?: (checked: boolean) => void;
  
  /** Size of the switch */
  size?: SwitchSize;
  
  /** Visual variant */
  variant?: SwitchVariant;
  
  /** Label text */
  label?: string;
  
  /** Label position */
  labelPosition?: SwitchLabelPosition;
  
  /** Description text */
  description?: string;
  
  /** Whether switch is disabled */
  disabled?: boolean;
  
  /** Whether switch is loading */
  loading?: boolean;
  
  /** Whether switch is read-only */
  readOnly?: boolean;
  
  /** Required field */
  required?: boolean;
  
  /** Custom checked background color */
  checkedColor?: string;
  
  /** Custom unchecked background color */
  uncheckedColor?: string;
  
  /** Custom thumb color */
  thumbColor?: string;
  
  /** Show icons on switch */
  withIcons?: boolean;
  
  /** Custom checked icon */
  checkedIcon?: React.ReactNode;
  
  /** Custom unchecked icon */
  uncheckedIcon?: React.ReactNode;
  
  /** Custom className */
  className?: string;
  
  /** Custom style */
  style?: React.CSSProperties;
  
  /** HTML id attribute */
  id?: string;
  
  /** HTML name attribute (for forms) */
  name?: string;
  
  /** HTML value attribute (for forms) */
  value?: string | number;
  
  /** Accessibility label */
  'aria-label'?: string;
  
  /** Accessibility description */
  'aria-describedby'?: string;

  // Data attributes
  'data-group'?: string;
  'data-group-index'?: number;
  
  // Event handlers
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLDivElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLDivElement>) => void;
}

// ===== SWITCH GROUP PROPS =====
export interface SwitchGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Group children */
  children: React.ReactNode;
  
  /** Label for the group */
  label?: string;
  
  /** Description for the group */
  description?: string;
  
  /** Whether group is disabled */
  disabled?: boolean;
  
  /** Direction of switches */
  direction?: 'vertical' | 'horizontal';
  
  /** Spacing between switches */
  spacing?: number | string;
  
  /** Custom className */
  className?: string;
  
  /** Custom style */
  style?: React.CSSProperties;
}