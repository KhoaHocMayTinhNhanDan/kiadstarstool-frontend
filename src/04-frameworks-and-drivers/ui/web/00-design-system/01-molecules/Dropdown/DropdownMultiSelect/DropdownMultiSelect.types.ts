// src/04-frameworks-and-drivers/ui/web/components/01-molecules/Dropdown/DropdownMultiSelect/DropdownMultiSelect.types.ts

import type { ReactNode } from 'react';
import type { DropdownBaseProps } from '../DropdownBase/DropdownBase.types';

// Re-export or define specific variants/sizes if needed
export type DropdownVariant = 'default' | 'compact' | 'minimal';
export type DropdownSize = 'sm' | 'md' | 'lg';

export interface DropdownItem {
  id: string;
  label?: string;
  icon?: ReactNode;
  shortcut?: string;
  disabled?: boolean;
  danger?: boolean;
  isDivider?: boolean;
  onClick?: () => void;
  'data-testid'?: string;
}

export interface DropdownGroup {
  id: string;
  label?: string;
  items: DropdownItem[];
  disabled?: boolean;
}

export interface DropdownMultiSelectProps extends Omit<DropdownBaseProps, 'children'> {
  /** List of items or groups to display */
  items: (DropdownItem | DropdownGroup)[];
  
  /** Whether to show checkmarks next to selected items */
  showCheckmarks?: boolean;
  
  /** Array of selected item IDs */
  selectedIds?: string[];
  
  /** Callback when selection changes */
  onSelectionChange?: (ids: string[]) => void;
  
  /** Spacing between items */
  itemSpacing?: 'sm' | 'md' | 'lg';
  
  /** Custom border color for the dropdown content */
  borderColor?: string;
}

export interface DropdownMultiSelectContextValue {
  selectedIds?: string[];
  showCheckmarks: boolean;
  onItemClick?: (item: DropdownItem) => void;
  onItemSelect?: (id: string) => void;
}
