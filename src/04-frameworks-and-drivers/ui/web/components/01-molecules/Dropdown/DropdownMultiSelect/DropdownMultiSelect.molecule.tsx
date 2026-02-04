// src/04-frameworks-and-drivers/ui/web/components/01-molecules/Dropdown/Dropdown.molecule.tsx
/** @jsxImportSource @emotion/react */
import React, { 
  createContext, 
  useContext, 
  useCallback, 
  useMemo, 
  useState,
  useEffect,
  KeyboardEvent as ReactKeyboardEvent 
} from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { css } from '@emotion/react';
import {
  dropdownContent,
  dropdownItem,
  dropdownItemDanger,
  dropdownGroup,
  dropdownGroupLabel,
  dropdownSeparator,
  dropdownScrollArea,
  dropdownTrigger as triggerStyles,
} from './Dropdown.molecule.styles';
import { SPACING, COLORS, RADIUS } from '../../00-atoms/00-core/tokens-constants';
import type {
  DropdownProps,
  DropdownItem,
  DropdownGroup,
  DropdownContextValue,
  DropdownAlign,
  DropdownSide,
  DropdownVariant,
  DropdownSize,
} from './Dropdown.types';

/* ==========================================================================
 * CONTEXT
 * ========================================================================== */

const DropdownContext = createContext<DropdownContextValue>({
  selectedId: undefined,
  selectedIds: [],
  showCheckmarks: false,
  closeOnSelect: true,
  variant: 'default',
  size: 'md',
  onItemClick: undefined,
  onItemSelect: undefined,
});

const useDropdownContext = () => useContext(DropdownContext);

/* ==========================================================================
 * STYLE UTILITIES
 * ========================================================================== */

const getSizeStyles = (size: DropdownSize) => {
  switch (size) {
    case 'sm':
      return css`
        height: 32px;
        font-size: 13px;
        padding: 0 ${SPACING.sm};
      `;
    case 'lg':
      return css`
        height: 40px;
        font-size: 15px;
        padding: 0 ${SPACING.lg};
      `;
    case 'md':
    default:
      return css`
        height: 36px;
        font-size: 14px;
        padding: 0 ${SPACING.md};
      `;
  }
};

const getVariantStyles = (variant: DropdownVariant) => {
  switch (variant) {
    case 'compact':
      return css`
        padding: ${SPACING.xs} 0;
        ${dropdownGroup} {
          &:not(:first-of-type) {
            margin-top: ${SPACING.xs};
          }
        }
      `;
    case 'minimal':
      return css`
        padding: ${SPACING.xs} 0;
        border: none;
        box-shadow: none;
        background-color: ${COLORS.BACKGROUND_PAPER};
        ${dropdownItem} {
          border-radius: ${RADIUS.sm};
        }
      `;
    case 'default':
    default:
      return css``;
  }
};

/* ==========================================================================
 * SUB-COMPONENTS
 * ========================================================================== */

interface DropdownItemComponentProps {
  item: DropdownItem;
  index: number;
  groupId?: string;
}

const DropdownItemComponent: React.FC<DropdownItemComponentProps> = React.memo(({ 
  item, 
  index, 
  groupId 
}) => {
  const { 
    selectedId, 
    selectedIds = [], 
    showCheckmarks, 
    closeOnSelect, 
    onItemClick,
    onItemSelect,
    variant,
    size 
  } = useDropdownContext();
  
  const isSelected = showCheckmarks && (
    selectedId === item.id || 
    (selectedIds?.includes(item.id))
  );
  
  const handleClick = useCallback((e: Event) => {
    e.preventDefault();
    item.onClick?.();
    onItemClick?.(item);
    onItemSelect?.(item.id);
  }, [item, onItemClick, onItemSelect]);
  
  if (item.isDivider) {
    return (
      <DropdownMenuPrimitive.Separator
        css={dropdownSeparator}
        data-testid={item['data-testid'] || `dropdown-separator-${groupId || 'root'}-${index}`}
      />
    );
  }
  
  const itemStyles = [
    dropdownItem,
    getSizeStyles(size),
    item.danger && dropdownItemDanger,
    item.disabled && css`
      cursor: not-allowed;
      opacity: 0.5;
    `,
    variant === 'minimal' && css`
      &:hover {
        background-color: ${COLORS.NEUTRAL_HOVER};
      }
    `,
    isSelected && css`
      background-color: ${COLORS.PRIMARY_LIGHT};
      color: ${COLORS.PRIMARY_DARK};
      font-weight: 500;
    `
  ];
  
  return (
    <DropdownMenuPrimitive.Item
      css={itemStyles}
      onClick={handleClick}
      disabled={item.disabled}
      data-testid={item['data-testid'] || `dropdown-item-${groupId || 'root'}-${item.id}`}
      data-state={isSelected ? 'checked' : undefined}
    >
      {item.icon && (
        <span css={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '16px',
          height: '16px',
          flexShrink: 0,
          opacity: item.disabled ? 0.5 : 1,
        }}>
          {item.icon}
        </span>
      )}
      <span css={{ flex: 1 }}>{item.label}</span>
      {item.shortcut && (
        <span css={{
          fontSize: '12px',
          color: COLORS.TEXT_MUTED,
          marginLeft: SPACING.md,
          opacity: 0.7,
        }}>
          {item.shortcut}
        </span>
      )}
    </DropdownMenuPrimitive.Item>
  );
});

DropdownItemComponent.displayName = 'DropdownItem';

interface DropdownGroupComponentProps {
  group: DropdownGroup;
}

const DropdownGroupComponent: React.FC<DropdownGroupComponentProps> = React.memo(({ group }) => (
  <DropdownMenuPrimitive.Group 
    css={[
      dropdownGroup,
      group.disabled && css`
        opacity: 0.5;
        pointer-events: none;
      `
    ]}
    data-testid={`dropdown-group-${group.id}`}
  >
    {group.label && (
      <DropdownMenuPrimitive.Label
        css={dropdownGroupLabel}
        data-testid={`dropdown-group-label-${group.id}`}
      >
        {group.label}
      </DropdownMenuPrimitive.Label>
    )}
    {group.items.map((item, index) => (
      <DropdownItemComponent
        key={`${group.id}-${item.id}`}
        item={item}
        index={index}
        groupId={group.id}
      />
    ))}
  </DropdownMenuPrimitive.Group>
));

DropdownGroupComponent.displayName = 'DropdownGroup';

/* ==========================================================================
 * MAIN COMPONENT
 * ========================================================================== */

export const Dropdown: React.FC<DropdownProps> = React.memo(({
  trigger,
  items,
  
  // Positioning
  align = 'end',
  side = 'bottom',
  sideOffset = 4,
  collisionPadding = 8,
  
  // Dimensions
  minWidth = 220,
  maxWidth = 320,
  maxHeight = 300,
  variant = 'default',
  size = 'md',
  
  // State & Control
  open,
  onOpenChange,
  closeOnSelect = true,
  closeOnOutsideClick = true,
  
  // Selection
  showCheckmarks = false,
  selectedId,
  multiple = false,
  selectedIds,
  
  // Portal & Modal
  portal = true,
  portalTarget,
  modal = false,
  
  // Accessibility
  'aria-label': ariaLabel = 'Dropdown menu',
  'aria-labelledby': ariaLabelledby,
  trapFocus = true,
  
  // Events
  onOpen,
  onClose,
  onEscapeKeyDown,
  onOutsideClick,
  
  // Styling
  sx,
  itemSpacing = 'sm',
  borderColor,
  
  // Testing
  'data-testid': testId = 'dropdown',
  triggerTestId,
  contentTestId,
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = open !== undefined;
  const currentOpen = isControlled ? open : internalOpen;
  
  const hasGroups = items.length > 0 && 'items' in items[0];
  const itemGroups = hasGroups ? items as DropdownGroup[] : null;
  const flatItems = !hasGroups ? items as DropdownItem[] : null;
  
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
    onEscapeKeyDown?.(event);
  }, [onEscapeKeyDown]);
  
  const handleOutsideClick = useCallback((event: MouseEvent) => {
    onOutsideClick?.(event);
  }, [onOutsideClick]);
  
  const handleItemSelect = useCallback((itemId: string) => {
    if (closeOnSelect && !multiple) {
      handleOpenChange(false);
    }
  }, [closeOnSelect, multiple, handleOpenChange]);
  
  // Context value
  const contextValue = useMemo<DropdownContextValue>(() => ({
    selectedId,
    selectedIds,
    showCheckmarks,
    closeOnSelect,
    variant,
    size,
    onItemClick: (item) => {
      if (closeOnSelect && !multiple) {
        handleOpenChange(false);
      }
    },
    onItemSelect: handleItemSelect,
  }), [
    selectedId, 
    selectedIds, 
    showCheckmarks, 
    closeOnSelect, 
    variant, 
    size, 
    multiple,
    handleOpenChange,
    handleItemSelect
  ]);
  
  // Content styles
  const contentStyles = useMemo(() => [
    dropdownContent,
    getVariantStyles(variant),
    css`
      min-width: ${typeof minWidth === 'number' ? `${minWidth}px` : minWidth};
      max-width: ${typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth};
      ${borderColor && css`border-color: ${COLORS[borderColor] || borderColor};`}
      ${sx}
    `,
  ], [minWidth, maxWidth, borderColor, variant, sx]);
  
  // Trigger styles
  const triggerWithStyles = useMemo(() => {
    if (React.isValidElement(trigger)) {
      return React.cloneElement(trigger as React.ReactElement, {
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
        onCloseAutoFocus={(e) => e.preventDefault()}
        onEscapeKeyDown={handleEscapeKeyDown}
        onPointerDownOutside={handleOutsideClick}
        data-testid={contentTestId || `${testId}-content`}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        style={{
          ...(maxHeight ? { maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight } : {}),
          ...(itemSpacing && { '--item-spacing': SPACING[itemSpacing] } as React.CSSProperties),
        }}
        trapFocus={trapFocus}
        onCloseAutoFocus={closeOnOutsideClick ? undefined : (e) => e.preventDefault()}
      >
        {maxHeight ? (
          <div css={dropdownScrollArea}>
            {itemGroups
              ? itemGroups.map((group) => (
                  <DropdownGroupComponent key={group.id} group={group} />
                ))
              : flatItems?.map((item, index) => (
                  <DropdownItemComponent 
                    key={item.id} 
                    item={item} 
                    index={index} 
                  />
                ))}
          </div>
        ) : (
          <>
            {itemGroups
              ? itemGroups.map((group) => (
                  <DropdownGroupComponent key={group.id} group={group} />
                ))
              : flatItems?.map((item, index) => (
                  <DropdownItemComponent 
                    key={item.id} 
                    item={item} 
                    index={index} 
                  />
                ))}
          </>
        )}
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
    
    return <DropdownMenuPrimitive.Portal>{content}</DropdownMenuPrimitive.Portal>;
  };
  
  // Handle initial open state for uncontrolled component
  useEffect(() => {
    if (currentOpen && onOpen) {
      onOpen();
    }
  }, []);
  
  return (
    <DropdownContext.Provider value={contextValue}>
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
    </DropdownContext.Provider>
  );
});

Dropdown.displayName = 'Dropdown';

/* ==========================================================================
 * ADDITIONAL EXPORTS (for advanced usage)
 * ========================================================================== */

export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
export const DropdownMenuContent = DropdownMenuPrimitive.Content;
export const DropdownMenuItem = DropdownMenuPrimitive.Item;
export const DropdownMenuSeparator = DropdownMenuPrimitive.Separator;
export const DropdownMenuGroup = DropdownMenuPrimitive.Group;
export const DropdownMenuLabel = DropdownMenuPrimitive.Label;

// Hooks
export const useDropdown = (initialOpen = false) => {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [selectedId, setSelectedId] = useState<string>();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen(prev => !prev), []);
  
  const selectItem = useCallback((id: string) => {
    setSelectedId(id);
  }, []);
  
  const toggleItem = useCallback((id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  }, []);
  
  return {
    isOpen,
    open,
    close,
    toggle,
    selectedId,
    selectedIds,
    selectItem,
    toggleItem,
    props: {
      open: isOpen,
      onOpenChange: setIsOpen,
      selectedId,
      selectedIds,
    },
  };
};

// Custom hook for keyboard navigation
export const useDropdownKeyboard = () => {
  const [focusedIndex, setFocusedIndex] = useState(-1);
  
  const handleKeyDown = useCallback((
    event: ReactKeyboardEvent, 
    items: DropdownItem[], 
    onSelect?: (index: number) => void
  ) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setFocusedIndex(prev => 
          prev < items.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        event.preventDefault();
        setFocusedIndex(prev => 
          prev > 0 ? prev - 1 : items.length - 1
        );
        break;
      case 'Enter':
      case ' ':
        if (focusedIndex >= 0 && onSelect) {
          event.preventDefault();
          onSelect(focusedIndex);
        }
        break;
      case 'Escape':
        setFocusedIndex(-1);
        break;
    }
  }, [focusedIndex]);
  
  return {
    focusedIndex,
    setFocusedIndex,
    handleKeyDown,
  };
};