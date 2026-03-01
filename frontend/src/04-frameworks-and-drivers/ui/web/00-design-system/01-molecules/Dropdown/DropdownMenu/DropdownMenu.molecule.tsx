/** @jsxImportSource @emotion/react */
import React, { 
  createContext, 
  useContext, 
  useCallback, 
  useMemo 
} from 'react';
import { css } from '@emotion/react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { DropdownBase } from '../DropdownBase/DropdownBase.molecule';
import { useDropdownBaseContext } from '../DropdownBase/DropdownBase.molecule';
import {
  dropdownItem,
  dropdownItemDanger,
  dropdownGroup,
  dropdownGroupLabel,
  dropdownSeparator,
} from './DropdownMenu.molecule.styles';
import { SPACING, COLORS } from '../../../../01-ui-core/constants/tokens-constants';
import type {
  DropdownMenuProps,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuContextValue,
} from './DropdownMenu.types';

/* ==========================================================================
 * CONTEXT
 * ========================================================================== */

const DropdownMenuContext = createContext<DropdownMenuContextValue>({
  showIcons: true,
  showShortcuts: true,
});

const useDropdownMenuContext = () => useContext(DropdownMenuContext);

/* ==========================================================================
 * SUB-COMPONENTS
 * ========================================================================== */

interface DropdownMenuItemComponentProps {
  item: DropdownMenuItem;
  index: number;
  groupId?: string;
}

const DropdownMenuItemComponent: React.FC<DropdownMenuItemComponentProps> = React.memo(({ 
  item, 
  index, 
  groupId 
}) => {
  const { closeOnSelect } = useDropdownBaseContext();
  const { showIcons, showShortcuts, onItemClick } = useDropdownMenuContext();
  
  const handleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    item.onClick?.();
    onItemClick?.(item);
  }, [item, onItemClick]);
  
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
    item.danger && dropdownItemDanger,
    item.disabled && css`
      cursor: not-allowed;
      opacity: 0.5;
    `,
  ];
  
  return (
    <DropdownMenuPrimitive.Item
      css={itemStyles}
      onClick={handleClick}
      disabled={item.disabled}
      data-testid={item['data-testid'] || `dropdown-item-${groupId || 'root'}-${item.id}`}
    >
      {showIcons && item.icon && (
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
      {showShortcuts && item.shortcut && (
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

DropdownMenuItemComponent.displayName = 'DropdownMenuItem';

interface DropdownMenuGroupComponentProps {
  group: DropdownMenuGroup;
}

const DropdownMenuGroupComponent: React.FC<DropdownMenuGroupComponentProps> = React.memo(({ group }) => (
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
      <DropdownMenuItemComponent
        key={`${group.id}-${item.id}`}
        item={item}
        index={index}
        groupId={group.id}
      />
    ))}
  </DropdownMenuPrimitive.Group>
));

DropdownMenuGroupComponent.displayName = 'DropdownMenuGroup';

/* ==========================================================================
 * MAIN COMPONENT
 * ========================================================================== */

export const DropdownMenu: React.FC<DropdownMenuProps> = React.memo(({
  trigger,
  items,
  
  // Menu specific
  showIcons = true,
  showShortcuts = true,
  itemSpacing,
  borderColor,
  
  // Base props
  ...baseProps
}) => {
  const hasGroups = items.length > 0 && 'items' in items[0];
  const itemGroups = hasGroups ? items as DropdownMenuGroup[] : null;
  const flatItems = !hasGroups ? items as DropdownMenuItem[] : null;
  
  const handleItemClick = useCallback((item: DropdownMenuItem) => {
    // Menu-specific logic if needed
  }, []);
  
  const menuContextValue = useMemo<DropdownMenuContextValue>(() => ({
    showIcons,
    showShortcuts,
    onItemClick: handleItemClick,
  }), [showIcons, showShortcuts, handleItemClick]);
  
  return (
    <DropdownMenuContext.Provider value={menuContextValue}>
      <DropdownBase
        trigger={trigger}
        {...baseProps}
        sx={css`
          ${borderColor && `border-color: ${borderColor};`}
          ${itemSpacing && `--item-spacing: ${itemSpacing};`}
          ${baseProps.sx}
        `}
      >
        {itemGroups
          ? itemGroups.map((group) => (
              <DropdownMenuGroupComponent key={group.id} group={group} />
            ))
          : flatItems?.map((item, index) => (
              <DropdownMenuItemComponent 
                key={item.id} 
                item={item} 
                index={index} 
              />
            ))}
      </DropdownBase>
    </DropdownMenuContext.Provider>
  );
});

DropdownMenu.displayName = 'DropdownMenu';