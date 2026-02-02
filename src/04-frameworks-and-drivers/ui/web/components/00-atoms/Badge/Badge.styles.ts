import { css } from '@emotion/react';
import { COLORS, FONT_SIZES, FONT_WEIGHTS, RADIUS, SPACING } from '../00-core/tokens-constants';
import type { BadgeColor, BadgeSize, BadgeVariant } from './Badge.types';

/** 🔥 GRID + FLEX SAFE WRAPPER */
export const badgeWrapper = css`
  display: inline-flex;
  flex-shrink: 0; /* Quan trọng: Tránh bị co lại trong flex/grid container */
  vertical-align: middle;
`;

const sizeMap: Record<BadgeSize, { height: string; px: string; fontSize: string }> = {
  sm: { height: '20px', px: SPACING.xs, fontSize: '10px' },
  md: { height: '24px', px: SPACING.sm, fontSize: FONT_SIZES.xs },
};

const getColorStyles = (variant: BadgeVariant, color: BadgeColor) => {
  const colors: Record<BadgeColor, string> = {
    primary: COLORS.PRIMARY,
    secondary: COLORS.SECONDARY,
    success: COLORS.SUCCESS,
    danger: COLORS.DANGER,
    warning: COLORS.WARNING,
    info: COLORS.INFO,
    neutral: COLORS.NEUTRAL_DARK,
  };

  const baseColor = colors[color];

  if (variant === 'filled') {
    return css`
      background-color: ${baseColor};
      color: ${COLORS.WHITE};
      border: 1px solid transparent;
    `;
  }

  if (variant === 'outline') {
    return css`
      background-color: transparent;
      color: ${baseColor};
      border: 1px solid ${baseColor};
    `;
  }

  // Ghost
  return css`
    background-color: ${baseColor}20; /* 20% opacity approx */
    color: ${baseColor};
    border: 1px solid transparent;
  `;
};

export const getBadgeStyles = (variant: BadgeVariant, color: BadgeColor, size: BadgeSize) => {
  const s = sizeMap[size];

  return css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: ${s.height};
    padding: 0 ${s.px};
    font-size: ${s.fontSize};
    font-weight: ${FONT_WEIGHTS.semibold};
    border-radius: ${RADIUS.full};
    white-space: nowrap;
    ${getColorStyles(variant, color)}
  `;
};