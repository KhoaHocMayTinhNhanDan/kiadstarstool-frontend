/* ==========================================================================
 * Dropdown Select Types
 * --------------------------------------------------------------------------
 * Types for single-select dropdown
 * ========================================================================== */

import type { ReactNode } from 'react';
import type { DropdownBaseProps } from '../DropdownBase/DropdownBase.types';

export interface DropdownSelectOption {
  id: string;
  label: string;
  value: string;
  disabled?: boolean;
  icon?: ReactNode;
  metadata?: Record<string, unknown>;
}

export interface DropdownSelectProps extends Omit<DropdownBaseProps, 'trigger' | 'children'> {
  /** Options */
  options: DropdownSelectOption[];
  /** Selected value */
  value?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Clearable */
  clearable?: boolean;
  /** Searchable */
  searchable?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Error state */
  error?: boolean;
  /** Error message */
  errorMessage?: string;
  /** Custom trigger element (optional) */
  trigger?: ReactNode;
}

export interface DropdownSelectContextValue {
  selectedValue?: string;
  onSelect: (value: string) => void;
  showCheckmarks: boolean;
}