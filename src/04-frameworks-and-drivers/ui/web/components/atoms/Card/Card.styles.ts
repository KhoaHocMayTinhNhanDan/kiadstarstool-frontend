import { css } from '@emotion/react';
import { COLORS, RADIUS, SHADOWS } from '../00-core/tokens-constants';
import { type CardVariant } from './Card';

export const getCardStyles = (variant: CardVariant, padding: string | number) => {
  const baseStyles = css`
    background-color: ${COLORS.WHITE};
    border-radius: ${RADIUS.lg};
    padding: ${typeof padding === 'number' ? `${padding}px` : padding};
    overflow: hidden;
  `;

  if (variant === 'elevated') {
    return css`
      ${baseStyles};
      box-shadow: ${SHADOWS.md};
      border: none;
    `;
  }

  if (variant === 'outlined') {
    return css`
      ${baseStyles};
      box-shadow: none;
      border: 1px solid ${COLORS.NEUTRAL_RING};
    `;
  }

  return baseStyles;
};