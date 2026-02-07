// src/04-frameworks-and-drivers/ui/web/components/02-organisms/navigation/Tabs/Tabs.organism.tsx
/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { Box } from '../../../00-atoms';
import * as styles from './Tabs.styles';
import type { TabsProps } from './Tabs.types';

export const Tabs: React.FC<TabsProps> = ({
  items,
  activeTabId: propActiveTabId,
  defaultActiveTabId,
  onChange,
  variant = 'line',
  orientation = 'horizontal',
  size = 'md',
  fullWidth = false,
  className,
  sx,
  testId = 'tabs',
}) => {
  // Handle Controlled vs Uncontrolled state
  const [internalActiveTabId, setInternalActiveTabId] = useState(
    defaultActiveTabId || (items.length > 0 ? items[0].id : '')
  );

  const isControlled = propActiveTabId !== undefined;
  const activeTabId = isControlled ? propActiveTabId : internalActiveTabId;

  const handleTabClick = (tabId: string) => {
    if (!isControlled) {
      setInternalActiveTabId(tabId);
    }
    onChange?.(tabId);
  };

  const activeItem = items.find((item) => item.id === activeTabId);

  return (
    <Box 
      css={[styles.root(orientation), sx]} 
      className={className}
      data-testid={testId}
    >
      {/* Tab List */}
      <div 
        role="tablist" 
        aria-orientation={orientation}
        css={styles.tabList(variant, orientation, fullWidth)}
      >
        {items.map((item) => {
          const isActive = item.id === activeTabId;
          return (
            <button
              key={item.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${item.id}`}
              id={`tab-${item.id}`}
              tabIndex={isActive ? 0 : -1}
              disabled={item.disabled}
              onClick={() => !item.disabled && handleTabClick(item.id)}
              css={styles.tabTrigger(
                variant,
                orientation,
                size,
                isActive,
                !!item.disabled,
                fullWidth
              )}
            >
              {item.icon && <span css={{ display: 'flex' }}>{item.icon}</span>}
              <span>{item.label}</span>
              {item.badge && (
                <span css={{ marginLeft: 'auto' }}>{item.badge}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div
        role="tabpanel"
        id={`panel-${activeTabId}`}
        aria-labelledby={`tab-${activeTabId}`}
        css={styles.tabContent}
      >
        {activeItem?.content}
      </div>
    </Box>
  );
};