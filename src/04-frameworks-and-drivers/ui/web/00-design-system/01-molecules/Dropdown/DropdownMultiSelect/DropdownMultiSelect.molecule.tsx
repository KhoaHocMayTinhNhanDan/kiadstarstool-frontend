// src/04-frameworks-and-drivers/ui/web/components/01-molecules/Dropdown/Dropdown.molecule.tsx
/** @jsxImportSource @emotion/react */
import React, { 
  createContext, 
  useContext, 
  useCallback, 
  useMemo
} from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { css } from '@emotion/react';
import { DropdownBase } from '../DropdownBase/DropdownBase.molecule';
import { useDropdownBaseContext } from '../DropdownBase/DropdownBase.molecule';
import { useDropdown } from '../hooks/useDropdown';
import {
  dropdownItem,
  dropdownItemDanger,
  dropdownGroup,
  dropdownGroupLabel,
  dropdownSeparator,
} from './DropdownMultiSelect.molecule.styles';
import { SPACING, COLORS, RADIUS } from '../../../../03-ui-shared/constants/tokens-constants';
import type {
  DropdownMultiSelectProps,
  DropdownItem,
  DropdownGroup,
  DropdownMultiSelectContextValue,
  DropdownVariant,
  DropdownSize,
} from './DropdownMultiSelect.types'; // Ensure types are exported with these names

/* ==========================================================================
 * CONTEXT
 * ========================================================================== */

const DropdownMultiSelectContext = createContext<DropdownMultiSelectContextValue>({
  selectedIds: [],
  showCheckmarks: false,
  onItemClick: undefined,
  onItemSelect: undefined,
});

const useDropdownMultiSelectContext = () => useContext(DropdownMultiSelectContext);

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
  const { size, variant } = useDropdownBaseContext();
  const { 
    selectedIds = [], 
    showCheckmarks, 
    onItemClick,
    onItemSelect
  } = useDropdownMultiSelectContext();
  
  const isSelected = showCheckmarks && (
    (selectedIds?.includes(item.id))
  );
  
  const handleClick = useCallback((e: React.MouseEvent) => {
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

export const DropdownMultiSelect: React.FC<DropdownMultiSelectProps> = React.memo(({
  trigger,
  items,

  // Selection
  showCheckmarks = false,
  selectedIds: propSelectedIds,
  onSelectionChange,

  // Styling
  itemSpacing = 'sm',
  borderColor,

  // Base props
  ...baseProps
}) => {
  // Use hook for uncontrolled state or internal logic
  const { selectedIds: internalSelectedIds, toggleItemSelection } = useDropdown({
    defaultSelectedIds: propSelectedIds || [],
  });

  // Determine effective selected IDs (Controlled > Uncontrolled)
  const selectedIds = propSelectedIds !== undefined ? propSelectedIds : internalSelectedIds;

  const hasGroups = items.length > 0 && 'items' in items[0];
  const itemGroups = hasGroups ? items as DropdownGroup[] : null;
  const flatItems = !hasGroups ? items as DropdownItem[] : null;
  
  const handleItemSelect = useCallback((itemId: string) => {
    if (propSelectedIds !== undefined && onSelectionChange) {
      // Controlled mode
      const newSelectedIds = selectedIds.includes(itemId)
        ? selectedIds.filter(id => id !== itemId)
        : [...selectedIds, itemId];
      onSelectionChange(newSelectedIds);
    } else {
      // Uncontrolled mode
      toggleItemSelection(itemId);
      // Also call callback if provided
      if (onSelectionChange) {
        const newSelectedIds = selectedIds.includes(itemId)
          ? selectedIds.filter(id => id !== itemId)
          : [...selectedIds, itemId];
        onSelectionChange(newSelectedIds);
      }
    }
  }, [selectedIds, propSelectedIds, onSelectionChange, toggleItemSelection]);
  
  // Context value
  const contextValue = useMemo<DropdownMultiSelectContextValue>(() => ({
    selectedIds,
    showCheckmarks,
    onItemClick: (item) => {
      // MultiSelect typically doesn't close on click, handled by DropdownBase prop if needed
    },
    onItemSelect: handleItemSelect,
  }), [
    selectedIds, 
    showCheckmarks, 
    handleItemSelect
  ]);
  
  return (
    <DropdownMultiSelectContext.Provider value={contextValue}>
      <DropdownBase
        trigger={trigger}
        closeOnSelect={false} // MultiSelect usually stays open
        {...baseProps}
        sx={css([
          borderColor && css`border-color: ${COLORS[borderColor as keyof typeof COLORS] || borderColor};`,
          itemSpacing && css`--item-spacing: ${SPACING[itemSpacing]};`,
          baseProps.sx
        ])}
      >
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
      </DropdownBase>
    </DropdownMultiSelectContext.Provider>
  );
});

DropdownMultiSelect.displayName = 'DropdownMultiSelect';