// src/04-frameworks-and-drivers/ui/web/00-design-system/02-organisms/navigation/AppHeader/AppHeader.organism.tsx
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
import { 
  Search, 
  Bell, 
  Plus, 
  Sun, 
  Moon, 
  ChevronDown 
} from 'lucide-react';

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
        icon={<Search size={16} />}
        onClick={() => console.log('Search clicked')}
        css={styles.iconButton(mode, themeColors)}
      />
      
      <IconButton
        size="sm"
        variant="ghost"
        aria-label="Notifications"
        icon={<Bell size={16} />}
        css={styles.iconButton(mode, themeColors)}
      />
      
      <Button
        variant="primary"
        size="sm"
        leftIcon={<Plus size={16} />}
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
      css={[styles.header(mode, themeColors), css`gap: ${SPACING.sm};`, sx]}
      className={className}
      data-testid={testId}
      role="banner"
      style={style}
    >
      <Box css={styles.leftSection}>
        {/* Left section content (menu button, collapse button) */}
        {leftSectionContent && (
          <Box css={styles.leftSectionContent}>
            {leftSectionContent}
          </Box>
        )}
        
        {/* Logo */}
        {logo && (
          <Box 
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
          </Box>
        )}
        
        {/* Navigation */}
        {navItems.length > 0 && (
          <Box as="nav" css={styles.nav} aria-label="Main navigation">
            {navItems.map((item) => (
              <NavLink key={item.id} item={item} mode={mode} themeColors={themeColors} />
            ))}
          </Box>
        )}
      </Box>
      
      <Box css={styles.rightSection}>
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
            icon={mode === 'light' ? <Moon size={16} /> : <Sun size={16} />}
            css={styles.iconButton(mode, themeColors)}
          />
        )}

        {/* Search Input */}
        {showSearch && (
          <Box css={styles.searchContainer}>
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
          </Box>
        )}
        
        {/* Custom Actions */}
        <Box css={styles.actionsWrapper}>
          {actions ? actions : <DefaultActions mode={mode} themeColors={themeColors} />}
        </Box>
        
        {/* User Menu */}
        {userProfile ? (
          <Box css={styles.userMenuContainer}>
            <Box
              as="button"
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
              <span css={[styles.userName, css`
                @media (max-width: 768px) {
                  display: none;
                }
              `]}>{userProfile.name}</span>
              <span css={styles.dropdownIcon(themeColors)}>
                <ChevronDown size={12} />
              </span>
            </Box>

            {showUserMenu && (
              <Box css={styles.userMenu(mode, themeColors)}>
                {/* User Info */}
                <Box css={styles.userInfo(mode, themeColors)}>
                  <Box css={styles.userInfoName}>{userProfile.name}</Box>
                  {userProfile.email && (
                    <Box css={styles.userInfoEmail(themeColors)}>{userProfile.email}</Box>
                  )}
                  {userProfile.role && (
                    <Box css={styles.userInfoRole(themeColors)}>{userProfile.role}</Box>
                  )}
                </Box>

                {/* Menu Items */}
                <Box css={styles.menuItems}>
                  {userMenuItems.map((item) => {
                    if (item.isDivider) {
                      return (
                        <Box key={item.id} css={styles.menuDivider(mode, themeColors)} />
                      );
                    }
                    return (
                      <Box
                        as="button"
                        key={item.id}
                        onClick={() => handleUserMenuItemClick(item)}
                        css={styles.menuItem(item.danger, mode, themeColors)}
                      >
                        {item.icon && <span css={styles.menuItemIcon}>{item.icon}</span>}
                        <span>{item.label}</span>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            )}
          </Box>
        ) : (
          <Box css={styles.actionsWrapper}>
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
          </Box>
        )}
      </Box>
    </Box>
  );
});

AppHeader.displayName = 'AppHeader';