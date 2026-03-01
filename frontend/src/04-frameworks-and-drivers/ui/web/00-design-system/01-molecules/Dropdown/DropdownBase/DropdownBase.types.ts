/* ==========================================================================
 * Dropdown Base Types
 * --------------------------------------------------------------------------
 * Core types shared by all dropdown variants
 * ========================================================================== */

import type { CSSObject } from '@emotion/react';
import type { ReactNode, KeyboardEvent } from 'react';

export type DropdownAlign = 'start' | 'center' | 'end';
export type DropdownSide = 'top' | 'right' | 'bottom' | 'left';
export type DropdownVariant = 'default' | 'compact' | 'minimal';
export type DropdownSize = 'sm' | 'md' | 'lg';

export interface DropdownBaseProps {
  /** Element that triggers the dropdown */
  trigger: ReactNode;
  
  /* ================= POSITIONING ================= */
  /** Dropdown alignment relative to trigger */
  align?: DropdownAlign;
  /** Vertical placement */
  side?: DropdownSide;
  /** Distance from trigger */
  sideOffset?: number;
  /** Additional collision padding */
  collisionPadding?: number;
  
  /* ================= DIMENSIONS ================= */
  /** Minimum width of dropdown */
  minWidth?: number | string;
  /** Maximum width of dropdown */
  maxWidth?: number | string;
  /** Maximum height before scrolling */
  maxHeight?: number | string;
  /** Visual variant */
  variant?: DropdownVariant;
  /** Size of dropdown items */
  size?: DropdownSize;
  
  /* ================= STATE & CONTROL ================= */
  /** Whether dropdown is open (controlled mode) */
  open?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Close dropdown after item click */
  closeOnSelect?: boolean;
  /** Close dropdown when clicking outside */
  closeOnOutsideClick?: boolean;
  
  /* ================= PORTAL & MODAL ================= */
  /** Whether to render in a portal */
  portal?: boolean;
  /** Portal target for dropdown content */
  portalTarget?: HTMLElement | null;
  /** Whether dropdown should behave like a modal */
  modal?: boolean;
  
  /* ================= ACCESSIBILITY ================= */
  /** Accessibility label */
  'aria-label'?: string;
  /** Accessibility labelledby */
  'aria-labelledby'?: string;
  /** Whether focus is trapped in dropdown */
  trapFocus?: boolean;
  
  /* ================= EVENTS ================= */
  /** Callback when dropdown opens */
  onOpen?: () => void;
  /** Callback when dropdown closes */
  onClose?: () => void;
  /** Callback on escape key press */
  onEscapeKeyDown?: (event: KeyboardEvent) => void;
  /** Callback on outside click */
  onOutsideClick?: (event: MouseEvent) => void;
  
  /* ================= STYLING ================= */
  /** Custom CSS */
  sx?: CSSObject;
  
  /* ================= TESTING ================= */
  /** For testing */
  'data-testid'?: string;
  /** Test ID for trigger */
  triggerTestId?: string;
  /** Test ID for content */
  contentTestId?: string;
}

export interface DropdownBaseContextValue {
  variant: DropdownVariant;
  size: DropdownSize;
  closeOnSelect: boolean;
}