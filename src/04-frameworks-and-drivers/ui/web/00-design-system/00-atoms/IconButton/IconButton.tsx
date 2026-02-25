// src/04-frameworks-and-drivers/ui/web/components/00-atoms/IconButton/IconButton.tsx
/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { SIZES } from '../../../01-ui-core/constants/tokens-constants';
import type { IconButtonProps } from './IconButton.types';

/**
 * IconButton - Production Ready Component
 * 
 * Một button chỉ chứa icon, kế thừa tất cả tính năng từ Button.
 * 
 * Features:
 * ✅ Kế thừa tất cả Button variants, intents, states
 * ✅ Accessibility first (bắt buộc aria-label)
 * ✅ Perfect square với aspect-ratio
 * ✅ Icon scales theo design tokens
 * ✅ Type-safe hoàn toàn
 */
export const IconButton = React.forwardRef<
  HTMLButtonElement,
  IconButtonProps
>(({ 
  icon, 
  size = 'md',
  badge,
  sx, 
  className,
  ...props 
}, ref) => {
  const iconButtonStyles = css`
    padding: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    line-height: 0;
    aspect-ratio: 1 / 1;
    position: relative; /* Needed for badge positioning */
    
    /* Đảm bảo kích thước tối thiểu cho accessibility */
    min-width: 32px;
    min-height: 32px;
    
    /* Icon scales with fontSize */
    font-size: ${SIZES[size]};
    
    /* Override Button's default min-width for text buttons */
    .btn-content {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `;
  
  const badgeStyles = css`
    position: absolute;
    top: 2px;
    right: 2px;
    transform: translate(40%, -40%);
    background-color: #e53e3e; /* Danger color */
    color: white;
    border-radius: 9999px;
    font-size: 10px;
    font-weight: bold;
    padding: 0 5px;
    line-height: 1.5;
    min-width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
  `;

  return (
    <Button
      ref={ref}
      size={size}
      css={[iconButtonStyles, sx]}
      className={`icon-button ${className || ''}`}
      {...props}
    >
      <Icon size="inherit">
        {icon}
      </Icon>
      {badge != null && badge !== '' && (
        <span css={badgeStyles}>
          {badge}
        </span>
      )}
    </Button>
  );
});

IconButton.displayName = 'IconButton';