/* ==========================================================================
 * Dropdown Menu Types
 * --------------------------------------------------------------------------
 * Types for menu-style dropdown (actions, navigation)
 * ========================================================================== */

import type { ReactNode } from 'react';
import type { DropdownBaseProps, DropdownVariant, DropdownSize } from '../DropdownBase/DropdownBase.types';
import type { SpacingKey, ColorKey } from '../../../00-atoms/00-core/tokens-constants';

export interface DropdownMenuItem {
  /** Unique identifier for the item */
  id: string;
  /** Display text */
  label: string;
  /** Optional icon before label */
  icon?: ReactNode;
  /** Click handler */
  onClick?: () => void;
  /** Disabled state */
  disabled?: boolean;
  /** Render as separator line */
  isDivider?: boolean;
  /** Danger styling (usually red) */
  danger?: boolean;
  /** For testing */
  'data-testid'?: string;
  /** Additional custom data */
  metadata?: Record<string, unknown>;
  /** Keyboard shortcut hint */
  shortcut?: string;
}

export interface DropdownMenuGroup {
  /** Group identifier */
  id: string;
  /** Group label (optional) */
  label?: string;
  /** Items in this group */
  items: DropdownMenuItem[];
  /** Whether group is disabled */
  disabled?: boolean;
}

export interface DropdownMenuProps extends Omit<DropdownBaseProps, 'trigger' | 'children'> {
  /** Array of items or groups */
  items: DropdownMenuItem[] | DropdownMenuGroup[];
  /** Custom trigger element */
  trigger: ReactNode;
  /** Show icons */
  showIcons?: boolean;
  /** Show shortcuts */
  showShortcuts?: boolean;
  /** Spacing between items */
  itemSpacing?: SpacingKey;
  /** Custom border color */
  borderColor?: ColorKey;
}

export interface DropdownMenuContextValue {
  showIcons: boolean;
  showShortcuts: boolean;
  onItemClick?: (item: DropdownMenuItem) => void;
}