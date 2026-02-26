/** @jsxImportSource @emotion/react */
import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { css } from '@emotion/react';
import { Box, Text } from '../../../00-atoms';
import { Avatar } from '../../../00-atoms/Avatar';
import { IconButton } from '../../../00-atoms/IconButton';
import { Button } from '../../../00-atoms/Button';
import { SearchInput } from '../../../01-molecules/SearchInput';
import { LanguageSelector } from '../../../01-molecules/LanguageSelector';
import * as styles from './AppHeader.styles';
import type { AppHeaderProps, NavItem, ThemeColors } from './AppHeader.types';

import { SPACING } from '../../../../01-ui-core/constants/tokens-constants';

// Icons
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
  </svg>
);

const NotificationIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"/>
  </svg>
);

const CreateIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
  </svg>
);

const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7z"/>
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 10l5 5 5-5z"/>
  </svg>
);

const NavLink: React.FC<{ item: NavItem; mode?: 'light' | 'dark'; themeColors?: ThemeColors }> = 
  ({ item, mode, themeColors }) => (
    <Link
      to={item.href}
      css={styles.navItem(!!item.isActive, mode, themeColors)}
      data-testid={item['data-testid']}
      aria-current={item.isActive ? 'page' : undefined}
    >
      {item.icon && <span css={styles.navItemIcon}>{item.icon}</span>}
      <Text as="span" size="sm">{item.label}</Text>
    </Link>
);

const DefaultActions: React.FC<{ mode?: 'light' | 'dark'; themeColors?: ThemeColors }> = 
  ({ mode, themeColors }) => (
    <>
      <IconButton
        size="sm"
        variant="ghost"
        aria-label="Search"
        icon={<SearchIcon />}
        onClick={() => console.log('Search clicked')}
        css={styles.iconButton(mode, themeColors)}
      />
      
      <IconButton
        size="sm"
        variant="ghost"
        aria-label="Notifications"
        icon={<NotificationIcon />}
        css={styles.iconButton(mode, themeColors)}
      />
      
      <Button
        variant="primary"
        size="sm"
        leftIcon={<CreateIcon />}
        onClick={() => console.log('Create clicked')}
        css={css`
          white-space: nowrap;
          @media (max-width: 640px) {
            .btn-text { display: none; }
            padding: 0 8px;
          }
        `}
      >
        <span className="btn-text">Create</span>
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
  currentLanguage,
  onLanguageChange,
  languageOptions,
  onThemeToggle,
  mode = 'light',
  themeColors,
  className,
  sx,
  testId = 'app-header',
  onLogoClick,
  leftSectionContent,
  style,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const handleSearch = useCallback((value: string) => {
    setSearchQuery(value);
    onSearch?.(value);
  }, [onSearch]);
  
  const handleLogoClick = useCallback(() => {
    if (onLogoClick) {
      onLogoClick();
    }
  }, [onLogoClick]);

  const handleUserMenuToggle = useCallback(() => {
    setShowUserMenu(prev => !prev);
  }, []);

  const handleUserMenuItemClick = useCallback((item: any) => {
    if (item.onClick) {
      item.onClick();
    }
    setShowUserMenu(false);
  }, []);
  
  return (
    <Box
      as="header"
      css={[styles.header(mode, themeColors), sx]}
      className={className}
      data-testid={testId}
      role="banner"
      style={style}
    >
      <div css={styles.leftSection}>
        {/* Left section content (menu button, collapse button) */}
        {leftSectionContent && (
          <div css={styles.leftSectionContent}>
            {leftSectionContent}
          </div>
        )}
        
        {/* Logo */}
        {logo && (
          <div 
            css={styles.logoWrapper}
            onClick={handleLogoClick}
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
        
        {/* Navigation */}
        {navItems.length > 0 && (
          <Box as="nav" css={styles.nav} aria-label="Main navigation">
            {navItems.map((item) => (
              <NavLink key={item.id} item={item} mode={mode} themeColors={themeColors} />
            ))}
          </Box>
        )}
      </div>
      
      <div css={styles.rightSection}>
        {/* Language Selector */}
        {onLanguageChange && (
          <LanguageSelector
            value={currentLanguage}
            onChange={onLanguageChange}
            options={languageOptions}
            variant="icon-only"
          />
        )}

        {/* Theme Toggle Button */}
        {onThemeToggle && (
          <IconButton
            size="sm"
            variant="ghost"
            onClick={onThemeToggle}
            aria-label={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
            icon={mode === 'light' ? <MoonIcon /> : <SunIcon />}
            css={styles.iconButton(mode, themeColors)}
          />
        )}

        {/* Search Input */}
        {showSearch && (
          <div css={styles.searchContainer}>
            <SearchInput
              value={searchQuery}
              onChange={handleSearchChange}
              onSearch={handleSearch}
              placeholder={searchPlaceholder}
              size="sm"
              sx={css`
                flex-shrink: 1;
                min-width: 100px;
                width: 100%;
                @media (max-width: 768px) {
                  display: none;
                }
              `}
            />
          </div>
        )}
        
        {/* Custom Actions */}
        <div css={styles.actionsWrapper}>
          {actions ? actions : <DefaultActions mode={mode} themeColors={themeColors} />}
        </div>
        
        {/* User Menu */}
        {userProfile ? (
          <div css={styles.userMenuContainer}>
            <button
              onClick={handleUserMenuToggle}
              css={styles.userButton(mode, themeColors)}
              aria-label="User menu"
              aria-expanded={showUserMenu}
            >
              {userProfile.avatarUrl ? (
                <img
                  src={userProfile.avatarUrl}
                  alt={userProfile.name}
                  css={styles.userAvatar}
                />
              ) : (
                <div css={styles.userAvatarPlaceholder(mode, themeColors)}>
                  {userProfile.name.charAt(0).toUpperCase()}
                </div>
              )}
              <span css={styles.userName}>{userProfile.name}</span>
              <span css={styles.dropdownIcon(themeColors)}>
                <ChevronDownIcon />
              </span>
            </button>

            {showUserMenu && (
              <div css={styles.userMenu(mode, themeColors)}>
                {/* User Info */}
                <div css={styles.userInfo(mode, themeColors)}>
                  <div css={styles.userInfoName}>{userProfile.name}</div>
                  {userProfile.email && (
                    <div css={styles.userInfoEmail(themeColors)}>{userProfile.email}</div>
                  )}
                  {userProfile.role && (
                    <div css={styles.userInfoRole(themeColors)}>{userProfile.role}</div>
                  )}
                </div>

                {/* Menu Items */}
                <div css={styles.menuItems}>
                  {userMenuItems.map((item) => {
                    if (item.isDivider) {
                      return (
                        <div key={item.id} css={styles.menuDivider(mode, themeColors)} />
                      );
                    }
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleUserMenuItemClick(item)}
                        css={styles.menuItem(item.danger, mode, themeColors)}
                      >
                        {item.icon && <span css={styles.menuItemIcon}>{item.icon}</span>}
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
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