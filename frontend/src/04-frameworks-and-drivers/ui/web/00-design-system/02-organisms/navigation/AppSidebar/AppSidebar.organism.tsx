/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Box, Text, Badge } from '../../../00-atoms';
import * as styles from './AppSidebar.styles';
import type { AppSidebarProps, SidebarItem, SidebarGroup } from './AppSidebar.types';

const SidebarItemComponent = React.memo<{ 
  item: SidebarItem; 
  collapsed: boolean;
  borderRadius?: string;
}>(({ item, collapsed, borderRadius }) => {
  const content = (
    <>
      <Box css={styles.itemIcon(collapsed)}>
        {item.icon}
      </Box>
      <Text as="span" css={styles.itemLabel(collapsed)}>
        {item.label}
      </Text>
      {!collapsed && item.badge && (
        <Badge size="sm" color="danger" css={styles.badge}>{item.badge}</Badge>
      )}
    </>
  );

  const commonProps = {
    css: styles.item(
      !!item.isActive, 
      collapsed, 
      !!item.disabled, 
      borderRadius
    ),
    onClick: item.onClick,
    'data-testid': item['data-testid'],
    title: collapsed ? item.label : undefined,
  };

  if (item.href && !item.disabled) {
    return (
      <Link to={item.href} {...commonProps}>
        {content}
      </Link>
    );
  }

  return (
    <Box role="button" tabIndex={item.disabled ? -1 : 0} {...commonProps}>
      {content}
    </Box>
  );
});

SidebarItemComponent.displayName = 'SidebarItemComponent';

export const AppSidebar: React.FC<AppSidebarProps> = ({
  logo,
  items,
  collapsed: controlledCollapsed,
  onCollapseChange,
  footer,
  borderRadius,
  width,
  collapsedWidth,
  className,
  sx,
  testId = 'app-sidebar',
  variant = 'sidebar',
  isOpen = false,
  onClose,
}) => {
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  
  const isControlled = controlledCollapsed !== undefined;
  const collapsed = isControlled ? controlledCollapsed : internalCollapsed;

  const handleToggle = () => {
    const newState = !collapsed;
    if (!isControlled) {
      setInternalCollapsed(newState);
    }
    onCollapseChange?.(newState);
  };

  return (
    <>
    {/* Mobile Overlay Backdrop */}
    {variant === 'drawer' && (
      <Box css={styles.overlay(isOpen)} onClick={onClose} aria-hidden="true" />
    )}

    <Box 
      as="aside" 
      css={[styles.container(collapsed, width, collapsedWidth, variant, isOpen), sx]} 
      className={className}
      data-testid={testId}
      aria-label="Sidebar navigation"
    >
      {/* Header / Logo */}
      <Box css={styles.header}>
        {logo}
      </Box>

      {/* Collapse Toggle Button */}
      {/* Chỉ hiện nút toggle khi ở chế độ Desktop Sidebar */}
      {variant === 'sidebar' && (
        <Box 
          as="button"
          css={styles.collapseButton} 
          onClick={handleToggle}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </Box>
      )}

      {/* Content */}
      <Box css={styles.content}>
        {items.map((itemOrGroup, index) => {
          if ('items' in itemOrGroup) {
            const group = itemOrGroup as SidebarGroup;
            return (
              <Box key={group.id || index} mb="sm">
                {group.label && (
                  <Text css={styles.groupLabel(collapsed)} size="xs" weight="bold" color="SECONDARY">
                    {group.label}
                  </Text>
                )}
                {group.items.map(subItem => (
                  <SidebarItemComponent 
                    key={subItem.id} 
                    item={subItem} 
                    collapsed={collapsed}
                    borderRadius={borderRadius}
                  />
                ))}
              </Box>
            );
          }
          
          return (
            <SidebarItemComponent 
              key={(itemOrGroup as SidebarItem).id} 
              item={itemOrGroup as SidebarItem} 
              collapsed={collapsed}
              borderRadius={borderRadius}
            />
          );
        })}
      </Box>

      {/* Footer */}
      {footer && (
        <Box css={styles.footer}>
          {footer}
        </Box>
      )}
    </Box>
    </>
  );
};

AppSidebar.displayName = 'AppSidebar';