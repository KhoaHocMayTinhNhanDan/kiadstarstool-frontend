// src/04-frameworks-and-drivers/ui/web/components/01-molecules/IconButtonBadge/IconButtonBadge.tsx
/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { IconButton } from '../IconButton';
import { COLORS } from '../../../03-ui-shared/constants/tokens-constants';
import * as styles from './IconButtonBadge.styles';
import type { IconButtonBadgeProps } from './IconButtonBadge.types';

/**
 * IconButtonBadge - Molecule component
 * 
 * Combines IconButton with a badge indicator.
 * Perfect for notifications, cart items, unread messages, etc.
 */
export const IconButtonBadge = React.forwardRef<
  HTMLButtonElement,
  IconButtonBadgeProps
>(({
  badge,
  badgeColor = COLORS.WHITE,
  badgeBgColor = COLORS.DANGER,
  badgeSize = 'sm',
  badgePosition = 'top-right',
  showZero = false,
  maxCount = 99,
  'aria-label': ariaLabel,
  sx,
  ...iconButtonProps
}, ref) => {
  // Xác định xem có hiển thị badge không
  const shouldShowBadge = badge !== undefined && badge !== null && 
    (showZero || (typeof badge === 'number' ? badge > 0 : badge !== '0' && badge !== ''));
  
  // Format badge content
  const getBadgeContent = () => {
    if (badge === undefined || badge === null) return '';
    
    if (typeof badge === 'number') {
      if (badge > maxCount) return `${maxCount}+`;
      return badge.toString();
    }
    
    // Nếu là string, giữ nguyên
    return badge;
  };
  
  const badgeContent = getBadgeContent();
  
  // Dynamic aria-label
  const dynamicAriaLabel = ariaLabel || (iconButtonProps as any)['aria-label'] || '';
  const enhancedAriaLabel = typeof badge === 'number' && badge > 0
    ? `${dynamicAriaLabel} (${badge} unread)`
    : dynamicAriaLabel;
  
  return (
    <div css={styles.container}>
      <IconButton
        ref={ref}
        {...iconButtonProps}
        aria-label={enhancedAriaLabel}
        sx={css`
          position: relative;
          ${sx}
        `}
      />
      
      {shouldShowBadge && (
        <div
          css={[
            styles.badgeStyles(badgePosition, badgeSize),
            css`
              background-color: ${badgeBgColor};
              color: ${badgeColor};
            `
          ]}
          aria-hidden="true"
          data-testid="icon-button-badge"
        >
          {badgeContent}
        </div>
      )}
    </div>
  );
});

IconButtonBadge.displayName = 'IconButtonBadge';