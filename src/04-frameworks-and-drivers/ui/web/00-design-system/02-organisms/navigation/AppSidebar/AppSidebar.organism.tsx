/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Box } from '../../../00-atoms';
import * as styles from './AppSidebar.styles';
import type { AppSidebarProps, SidebarItem, SidebarGroup } from './AppSidebar.types';

const SidebarItemComponent = React.memo<{ 
  item: SidebarItem; 
  collapsed: boolean;
  borderRadius?: string;
}>(({ item, collapsed, borderRadius }) => {
  const content = (
    <>
      <div css={styles.itemIcon(collapsed)}>
        {item.icon}
      </div>
      <span css={styles.itemLabel(collapsed)}>
        {item.label}
      </span>
      {!collapsed && item.badge && (
        <span css={styles.badge}>{item.badge}</span>
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
    <div role="button" tabIndex={item.disabled ? -1 : 0} {...commonProps}>
      {content}
    </div>
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
      <div css={styles.overlay(isOpen)} onClick={onClose} aria-hidden="true" />
    )}

    <Box 
      as="aside" 
      css={[styles.container(collapsed, width, collapsedWidth, variant, isOpen), sx]} 
      className={className}
      data-testid={testId}
      aria-label="Sidebar navigation"
    >
      {/* Header / Logo */}
      <div css={styles.header}>
        {logo}
      </div>

      {/* Collapse Toggle Button */}
      {/* Chỉ hiện nút toggle khi ở chế độ Desktop Sidebar */}
      {variant === 'sidebar' && (
        <button 
          css={styles.collapseButton} 
          onClick={handleToggle}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      )}

      {/* Content */}
      <div css={styles.content}>
        {items.map((itemOrGroup, index) => {
          if ('items' in itemOrGroup) {
            const group = itemOrGroup as SidebarGroup;
            return (
              <Box key={group.id || index} mb="sm">
                {group.label && (
                  <div css={styles.groupLabel(collapsed)}>
                    {group.label}
                  </div>
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
      </div>

      {/* Footer */}
      {footer && (
        <div css={styles.footer}>
          {footer}
        </div>
      )}
    </Box>
    </>
  );
};

AppSidebar.displayName = 'AppSidebar';