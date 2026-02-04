/* ==========================================================================
 * Dropdown MultiSelect Types
 * --------------------------------------------------------------------------
 * Types for multi-select dropdown
 * ========================================================================== */

import type { ReactNode } from 'react';
import type { DropdownBaseProps } from '../DropdownBase/DropdownBase.types';

export interface DropdownMultiSelectOption {
  id: string;
  label: string;
  value: string;
  disabled?: boolean;
  icon?: ReactNode;
  metadata?: Record<string, unknown>;
}

export interface DropdownMultiSelectProps extends Omit<DropdownBaseProps, 'trigger' | 'children'> {
  /** Options */
  options: DropdownMultiSelectOption[];
  /** Selected values */
  values?: string[];
  /** Change handler */
  onChange?: (values: string[]) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Maximum number of selected items to show */
  maxVisibleItems?: number;
  /** Whether to show selected count */
  showSelectedCount?: boolean;
  /** Custom trigger element (optional) */
  trigger?: ReactNode;
  /** Searchable */
  searchable?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Error state */
  error?: boolean;
  /** Error message */
  errorMessage?: string;
}

export interface DropdownMultiSelectContextValue {
  selectedValues: string[];
  onToggle: (value: string) => void;
}