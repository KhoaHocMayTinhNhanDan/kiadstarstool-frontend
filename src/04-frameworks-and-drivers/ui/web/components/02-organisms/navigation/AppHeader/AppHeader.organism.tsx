// src/04-frameworks-and-drivers/ui/web/components/02-organisms/navigation/AppHeader/AppHeader.organism.tsx
/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { css } from '@emotion/react';
import { Box, Text } from '../../../00-atoms';
import { Avatar } from '../../../00-atoms/Avatar';
import { IconButton } from '../../../00-atoms/IconButton';
import { IconButtonBadge } from '../../../00-atoms/IconButtonBadge/IconButtonBadge';
import { Button } from '../../../00-atoms/Button';
import { DropdownMenu } from '../../../01-molecules/Dropdown/DropdownMenu';
import { SearchInput } from '../../../01-molecules/SearchInput';
import * as styles from './AppHeader.styles';
import type { AppHeaderProps, NavItem, UserMenuItem } from './AppHeader.types';

import { SPACING, COLORS } from '../../../00-atoms/00-core/tokens-constants';

const NavLink: React.FC<{ item: NavItem }> = ({ item }) => (
  <Link
    to={item.href}
    css={styles.navItem(!!item.isActive)}
    data-testid={item['data-testid']}
    aria-current={item.isActive ? 'page' : undefined}
  >
    {item.icon && <span css={{ display: 'flex', marginRight: SPACING.xs }}>{item.icon}</span>}
    <Text as="span">{item.label}</Text>
  </Link>
);

const DefaultActions: React.FC = () => (
  <>
    <IconButton
      size="sm"
      variant="ghost"
      aria-label="Search"
      icon={
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
      }
      onClick={() => console.log('Search clicked')}
    />
    
    <IconButtonBadge
      badge={3}
      size="sm"
      variant="ghost"
      aria-label="Notifications"
      icon={
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"/>
        </svg>
      }
    />
    
    <Button
      variant="primary"
      size="sm"
      leftIcon={
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
        </svg>
      }
      onClick={() => console.log('Create clicked')}
    >
      Create
    </Button>
  </>
);

export const AppHeader: React.FC<AppHeaderProps> = React.memo(({
  logo,
  navItems = [],
  userProfile,
  userMenuItems = [],
  actions,
  showSearch = false,
  searchPlaceholder = 'Search...',
  onSearch,
  className,
  sx,
  testId = 'app-header',
  onLogoClick,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const dropdownMenuItems = userMenuItems.map(item => ({
    id: item.id,
    label: item.label,
    icon: item.icon,
    onClick: item.onClick,
    isDivider: item.isDivider,
    danger: item.danger,
  }));
  
  // Handle input change: Update local state only
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  // Handle search action: Trigger external callback
  // SearchInput calls this when value changes or clear is clicked
  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearch?.(value);
  };
  
  const handleLogoClick = () => {
    if (onLogoClick) {
      onLogoClick();
    }
  };
  
  return (
    <Box
      as="header"
      css={[styles.header, sx]}
      className={className}
      data-testid={testId}
      role="banner"
    >
      <div css={styles.leftSection}>
        {logo && (
          <div 
            css={[styles.logoWrapper, onLogoClick && css`cursor: pointer;`]}
            onClick={onLogoClick ? handleLogoClick : undefined}
            role={onLogoClick ? 'button' : undefined}
            tabIndex={onLogoClick ? 0 : undefined}
            onKeyDown={(e: React.KeyboardEvent) => {
              if (onLogoClick && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                handleLogoClick();
              }
            }}
          >
            {logo}
          </div>
        )}
        
        {navItems.length > 0 && (
          <Box as="nav" css={styles.nav} aria-label="Main navigation">
            {navItems.map((item) => (
              <NavLink key={item.id} item={item} />
            ))}
          </Box>
        )}
      </div>
      
      <div css={styles.rightSection}>
        {/* FIX: Sử dụng đúng props của SearchInput */}
        {showSearch && (
          <SearchInput
            value={searchQuery}
            onChange={handleSearchChange}  // ✅ ĐÚNG: nhận ChangeEvent
            onSearch={handleSearch}        // ✅ ĐÚNG: nhận string
            placeholder={searchPlaceholder}
            size="sm"
            css={css`
              width: 220px;
              flex-shrink: 1;
              min-width: 140px;
              @media (max-width: 1024px) {
                width: 160px;
              }
              @media (max-width: 768px) {
                display: none;
              }
            `}
          />
        )}
        
        <div css={styles.actionsWrapper}>
          {actions ? actions : <DefaultActions />}
        </div>
        
        {userProfile ? (
          <DropdownMenu
            trigger={
              <Button
                variant="ghost"
                size="sm"
                css={css`
                  display: flex;
                  align-items: center;
                  gap: ${SPACING.sm};
                  padding: ${SPACING.xs} ${SPACING.sm};
                `}
                aria-label="User menu"
              >
                <Avatar
                  src={userProfile.avatarUrl}
                  name={userProfile.name}
                  size="xs"
                />
                <Text as="span" size="sm" weight="medium">
                  {userProfile.name}
                </Text>
                <svg 
                  width="12" 
                  height="12" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                  css={{ marginLeft: SPACING.xs }}
                >
                  <path d="M7 10l5 5 5-5z"/>
                </svg>
              </Button>
            }
            items={dropdownMenuItems}
            align="end"
          />
        ) : (
          <div css={styles.actionsWrapper}>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => console.log('Login clicked')}
            >
              Log in
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => console.log('Sign up clicked')}
            >
              Sign up
            </Button>
          </div>
        )}
      </div>
    </Box>
  );
});

AppHeader.displayName = 'AppHeader';