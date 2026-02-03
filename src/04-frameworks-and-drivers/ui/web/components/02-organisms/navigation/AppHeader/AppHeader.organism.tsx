// src/04-frameworks-and-drivers/ui/web/components/02-organisms/navigation/AppHeader/AppHeader.organism.tsx
/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Text } from '../../../00-atoms';
// Giả định bạn có các component này
import { Avatar } from '../../../00-atoms/Avatar';
import { DropdownMenu } from '../../../01-molecules/DropdownMenu';
import * as styles from './AppHeader.styles';
import type { AppHeaderProps, NavItem } from './AppHeader.types';

const NavLink: React.FC<{ item: NavItem }> = ({ item }) => (
  <Link
    to={item.href}
    css={styles.navItem(!!item.isActive)}
    data-testid={item['data-testid']}
  >
    {item.icon}
    <Text as="span">{item.label}</Text>
  </Link>
);

/**
 * AppHeader - Production Ready Component
 *
 * Header chính của ứng dụng, cung cấp điều hướng, thông tin người dùng và các action.
 */
export const AppHeader: React.FC<AppHeaderProps> = React.memo(({
  logo,
  navItems = [],
  userProfile,
  userMenuItems = [],
  actions,
  className,
  sx,
  testId = 'app-header',
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Box
      as="header"
      css={[styles.header, sx]}
      className={className}
      data-testid={testId}
    >
      {/* Left Section: Logo and Navigation */}
      <div css={styles.leftSection}>
        {logo && <div css={styles.logoWrapper}>{logo}</div>}
        {navItems.length > 0 && (
          <Box as="nav" css={styles.nav} aria-label="Main navigation">
            {navItems.map((item) => (
              <NavLink key={item.id} item={item} />
            ))}
          </Box>
        )}
      </div>

      {/* Right Section: Actions and User Menu */}
      <div css={styles.rightSection}>
        {actions && <div css={styles.actionsWrapper}>{actions}</div>}

        {userProfile && (
          <div css={styles.userMenuWrapper}>
            <button
              type="button"
              css={styles.userMenuButton}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-haspopup="true"
              aria-expanded={isMenuOpen}
              aria-label="User menu"
            >
              <Avatar
                src={userProfile.avatarUrl}
                name={userProfile.name}
                size="md"
              />
            </button>

            {/* 
              Đây là một ví dụ, bạn nên dùng một component DropdownMenu hoàn chỉnh 
              có xử lý click-outside, accessibility (focus trap)...
            */}
            {isMenuOpen && (
              <div css={styles.dropdownMenu}>
                <Box p="md" borderBottom="1px solid #e2e8f0">
                  <Text weight="semibold">{userProfile.name}</Text>
                  {userProfile.email && <Text size="sm" color="TEXT_MUTED">{userProfile.email}</Text>}
                </Box>
                <DropdownMenu
                  items={userMenuItems}
                  onItemClick={() => setIsMenuOpen(false)}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </Box>
  );
});

AppHeader.displayName = 'AppHeader';