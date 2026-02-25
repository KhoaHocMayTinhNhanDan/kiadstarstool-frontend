/** @jsxImportSource @emotion/react */
import React, { 
  createContext, 
  useContext, 
  useCallback, 
  useMemo, 
  useState,
  useEffect
} from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { css } from '@emotion/react';
import {
  dropdownContent,
  dropdownTrigger as triggerStyles,
} from './DropdownBase.molecule.styles';
import { COLORS, SPACING } from '../../../../01-ui-core/constants/tokens-constants';
import type {
  DropdownBaseProps,
  DropdownBaseContextValue,
  DropdownVariant,
} from './DropdownBase.types';

/* ==========================================================================
 * CONTEXT
 * ========================================================================== */

const DropdownBaseContext = createContext<DropdownBaseContextValue>({
  variant: 'default',
  size: 'md',
  closeOnSelect: true,
});

export const useDropdownBaseContext = () => useContext(DropdownBaseContext);

/* ==========================================================================
 * STYLE UTILITIES
 * ========================================================================== */

const getVariantStyles = (variant: DropdownVariant) => {
  switch (variant) {
    case 'compact':
      return css`
        padding: ${SPACING.xs} 0;
      `;
    case 'minimal':
      return css`
        border: none;
        box-shadow: none;
        background-color: ${COLORS.BACKGROUND_PAPER};
      `;
    case 'default':
    default:
      return css``;
  }
};

/* ==========================================================================
 * MAIN COMPONENT
 * ========================================================================== */

export interface DropdownBaseComponentProps extends DropdownBaseProps {
  /** Content to render inside dropdown */
  children: React.ReactNode;
  /** Whether content should be scrollable */
  scrollable?: boolean;
}

export const DropdownBase: React.FC<DropdownBaseComponentProps> = React.memo(({
  trigger,
  children,
  scrollable = false,
  
  // Positioning
  align = 'end',
  side = 'bottom',
  sideOffset = 4,
  collisionPadding = 8,
  
  // Dimensions
  minWidth = 180,
  maxWidth = 320,
  maxHeight,
  variant = 'default',
  size = 'md',
  
  // State & Control
  open,
  onOpenChange,
  closeOnSelect = true,
  closeOnOutsideClick = true,
  
  // Portal & Modal
  portal = true,
  portalTarget,
  modal = false,
  
  // Accessibility
  'aria-label': ariaLabel = 'Dropdown',
  'aria-labelledby': ariaLabelledby,
  
  // Events
  onOpen,
  onClose,
  onEscapeKeyDown,
  onOutsideClick,
  
  // Styling
  sx,
  
  // Testing
  'data-testid': testId = 'dropdown-base',
  triggerTestId,
  contentTestId,
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = open !== undefined;
  const currentOpen = isControlled ? open : internalOpen;
  
  // Handle events
  const handleOpenChange = useCallback((newOpen: boolean) => {
    if (!isControlled) {
      setInternalOpen(newOpen);
    }
    
    onOpenChange?.(newOpen);
    
    if (newOpen && onOpen) {
      onOpen();
    } else if (!newOpen && onClose) {
      onClose();
    }
  }, [isControlled, onOpenChange, onOpen, onClose]);
  
  const handleEscapeKeyDown = useCallback((event: KeyboardEvent) => {
    onEscapeKeyDown?.(event as any);
  }, [onEscapeKeyDown]);
  
  const handleOutsideClick = useCallback((event: Event) => {
    onOutsideClick?.(event as any);
  }, [onOutsideClick]);
  
  // Context value
  const contextValue = useMemo<DropdownBaseContextValue>(() => ({
    variant,
    size,
    closeOnSelect,
  }), [variant, size, closeOnSelect]);
  
  // Content styles
  const contentStyles = useMemo(() => [
    dropdownContent,
    css`
      min-width: ${typeof minWidth === 'number' ? `${minWidth}px` : minWidth};
      max-width: ${typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth};
      ${maxHeight && css`max-height: ${typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight};`}
      ${scrollable && css`overflow-y: auto;`}
      ${sx}
    `,
    getVariantStyles(variant),
  ], [minWidth, maxWidth, maxHeight, scrollable, sx, variant]);
  
  // Trigger styles
  const triggerWithStyles = useMemo(() => {
    if (React.isValidElement(trigger)) {
      return React.cloneElement(trigger as React.ReactElement<any>, {
        'data-state': currentOpen ? 'open' : 'closed',
        'data-testid': triggerTestId || `${testId}-trigger`,
        css: [triggerStyles, (trigger as any).props?.css],
      });
    }
    return trigger;
  }, [trigger, currentOpen, triggerTestId, testId]);
  
  // Render content
  const renderContent = () => {
    const content = (
      <DropdownMenuPrimitive.Content
        css={contentStyles}
        align={align}
        side={side}
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
        onEscapeKeyDown={handleEscapeKeyDown}
        onPointerDownOutside={handleOutsideClick}
        data-testid={contentTestId || `${testId}-content`}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        onCloseAutoFocus={closeOnOutsideClick ? undefined : (e) => e.preventDefault()}
        data-scrollable={scrollable || undefined}
      >
        {children}
      </DropdownMenuPrimitive.Content>
    );
    
    if (!portal) {
      return content;
    }
    
    if (portalTarget) {
      return (
        <DropdownMenuPrimitive.Portal container={portalTarget}>
          {content}
        </DropdownMenuPrimitive.Portal>
      );
    }
    
    return (
      <DropdownMenuPrimitive.Portal>
        {content}
      </DropdownMenuPrimitive.Portal>
    );
  };
  
  return (
    <DropdownBaseContext.Provider value={contextValue}>
      <DropdownMenuPrimitive.Root
        open={currentOpen}
        onOpenChange={handleOpenChange}
        modal={modal}
        data-testid={testId}
      >
        <DropdownMenuPrimitive.Trigger asChild>
          {triggerWithStyles}
        </DropdownMenuPrimitive.Trigger>
        
        {renderContent()}
      </DropdownMenuPrimitive.Root>
    </DropdownBaseContext.Provider>
  );
});

DropdownBase.displayName = 'DropdownBase';

/* ==========================================================================
 * ADDITIONAL EXPORTS (Radix primitives for advanced usage)
 * ========================================================================== */

export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
export const DropdownMenuContent = DropdownMenuPrimitive.Content;
export const DropdownMenuItem = DropdownMenuPrimitive.Item;
export const DropdownMenuSeparator = DropdownMenuPrimitive.Separator;
export const DropdownMenuGroup = DropdownMenuPrimitive.Group;
export const DropdownMenuLabel = DropdownMenuPrimitive.Label;
export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;
export const DropdownMenuRadioItem = DropdownMenuPrimitive.RadioItem;
export const DropdownMenuCheckboxItem = DropdownMenuPrimitive.CheckboxItem;