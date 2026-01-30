import { css, keyframes } from '@emotion/react';
import { COLORS, RADIUS } from '../00-core/tokens-constants';
import type { SkeletonVariant } from './Skeleton.types';

const pulse = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.4; }
  100% { opacity: 1; }
`;

export const getSkeletonStyles = (variant: SkeletonVariant, width?: string | number, height?: string | number) => css`
  background-color: ${COLORS.NEUTRAL_LIGHT};
  animation: ${pulse} 1.5s ease-in-out 0.5s infinite;
  
  /* Size */
  width: ${typeof width === 'number' ? `${width}px` : width};
  height: ${typeof height === 'number' ? `${height}px` : height};

  /* Variant specific styles */
  ${variant === 'text' && css`
    margin-top: 0;
    margin-bottom: 0;
    height: auto;
    transform-origin: 0 55%;
    transform: scale(1, 0.60);
    border-radius: ${RADIUS.sm};
    &:empty:before { content: "\\00a0"; }
  `}

  ${variant === 'circular' && css`
    border-radius: ${RADIUS.full};
  `}

  ${variant === 'rounded' && css`
    border-radius: ${RADIUS.md};
  `}
`;