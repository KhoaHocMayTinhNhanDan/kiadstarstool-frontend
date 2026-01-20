// src/04-frameworks-and-drivers/ui/web/components/atoms/Chip/Chip.types.ts
import type { ChipVariant, ChipSize } from './Chip.constants';

export interface ChipProps {
  /** Visual style variant */
  variant?: ChipVariant;
  
  /** Size of the chip */
  size?: ChipSize;
  
  /** Chip content */
  children?: React.ReactNode;
  
  /** Custom label/text */
  label?: string;
  
  /** Whether chip is removable */
  removable?: boolean;
  
  /** Called when remove button is clicked */
  onRemove?: () => void;
  
  /** Custom remove icon/component */
  removeIcon?: React.ReactNode;
  
  /** Left icon/element */
  leftIcon?: React.ReactNode;
  
  /** Right icon/element */
  rightIcon?: React.ReactNode;
  
  /** Selected/Active state */
  selected?: boolean;
  
  /** Disabled state */
  disabled?: boolean;
  
  /** Whether chip is clickable */
  clickable?: boolean;
  
  /** Click handler */
  onClick?: () => void;
  
  /** Custom class name */
  className?: string;
  
  /** Custom styles */
  style?: React.CSSProperties;
  
  /** Show border */
  border?: boolean;
  
  /** Border radius override */
  borderRadius?: number | string;
  
  /** ARIA label */
  'aria-label'?: string;
  
  /** Additional HTML attributes */
  [key: string]: any;
}

export interface ChipGroupProps {
  /** Group children */
  children: React.ReactNode;
  
  /** Size for all chips in group */
  size?: ChipSize;
  
  /** Spacing between chips */
  spacing?: number | string;
  
  /** Maximum chips to show before +X */
  max?: number;
  
  /** Whether chips are selectable (single or multiple) */
  selectable?: 'single' | 'multiple' | 'none';
  
  /** Called when selection changes */
  onSelectionChange?: (selectedValues: string[]) => void;
  
  /** Custom class name */
  className?: string;
  
  /** Custom styles */
  style?: React.CSSProperties;
}