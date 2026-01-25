import { css, keyframes } from '@emotion/react';
import { COLORS, RADIUS } from '../00-core/tokens-constants';
import { type SkeletonVariant } from './Skeleton';

const pulse = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
`;

export const getSkeletonStyles = (variant: SkeletonVariant, width?: string | number, height?: string | number) => {
  return css`
    background-color: ${COLORS.NEUTRAL_LIGHT};
    animation: ${pulse} 1.5s ease-in-out 0.5s infinite;
    
    width: ${typeof width === 'number' ? `${width}px` : width || '100%'};
    height: ${typeof height === 'number' ? `${height}px` : height || 'auto'};
    
    border-radius: ${
      variant === 'circular' 
        ? RADIUS.full 
        : variant === 'rounded' 
          ? RADIUS.md 
          : RADIUS.none
    };
  `;
};