// src/04-frameworks-and-drivers/ui/web/components/atoms/Avatar/Avatar.styles.ts
import styled, { css } from 'styled-components';
import type { AvatarSize, AvatarVariant, AvatarStatus } from './Avatar.types';

// Size mapping
const sizeMap: Record<AvatarSize, number> = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
  xl: 56,
  xxl: 64,
};

// Variant styles
const variantStyles = {
  circle: css` border-radius: 50%; `,
  square: css` border-radius: 4px; `,
  rounded: css` border-radius: 12px; `,
};

// Status colors
const statusColors = {
  online: '#22c55e',
  offline: '#94a3b8',
  away: '#f59e0b',
  busy: '#ef4444',
  none: 'transparent',
};

// Base avatar styles
export const AvatarContainer = styled.div<{
  $size: AvatarSize;
  $variant: AvatarVariant;
  $border: boolean;
  $borderColor?: string;
  $clickable: boolean;
}>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${props => sizeMap[props.$size]}px;
  height: ${props => sizeMap[props.$size]}px;
  background-color: #f1f5f9;
  color: #64748b;
  font-weight: 500;
  overflow: hidden;
  
  ${props => variantStyles[props.$variant]}
  
  ${props => props.$border && css`
    border: 2px solid ${props.$borderColor || '#ffffff'};
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  `}
  
  ${props => props.$clickable && css`
    cursor: pointer;
    transition: transform 0.2s ease;
    
    &:hover {
      transform: scale(1.05);
    }
    
    &:active {
      transform: scale(0.95);
    }
  `}
`;

// Image element
export const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

// Fallback container
export const AvatarFallback = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: inherit;
`;

// Status indicator
export const StatusIndicator = styled.div<{
  $status: AvatarStatus;
  $size: AvatarSize;
}>`
  position: absolute;
  right: 0;
  bottom: 0;
  width: ${props => props.$size === 'xs' ? '6px' : props.$size === 'sm' ? '8px' : '10px'};
  height: ${props => props.$size === 'xs' ? '6px' : props.$size === 'sm' ? '8px' : '10px'};
  background-color: ${props => statusColors[props.$status]};
  border-radius: 50%;
  border: 2px solid #ffffff;
  z-index: 1;
  
  ${props => props.$status === 'none' && css` display: none; `}
`;

// Avatar Group
export const AvatarGroupContainer = styled.div<{
  $spacing: number;
}>`
  display: flex;
  align-items: center;
  
  & > *:not(:first-child) {
    margin-left: -${props => props.$spacing}px;
  }
`;

// Remaining count badge
export const RemainingCount = styled.div<{
  $size: AvatarSize;
}>`
  width: ${props => sizeMap[props.$size]}px;
  height: ${props => sizeMap[props.$size]}px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #cbd5e1;
  color: #475569;
  font-size: ${props => props.$size === 'xs' ? '10px' : props.$size === 'sm' ? '12px' : '14px'};
  border-radius: 50%;
  border: 2px solid #ffffff;
  font-weight: 600;
`;