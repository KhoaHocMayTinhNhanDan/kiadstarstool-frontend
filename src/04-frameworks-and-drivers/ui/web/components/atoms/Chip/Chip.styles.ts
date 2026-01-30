import { css } from '@emotion/react';
import { COLORS, FONT_SIZES, FONT_WEIGHTS, RADIUS, SPACING, TRANSITIONS } from '../00-core/tokens-constants';
import type { ChipColor, ChipVariant } from './Chip.types';

/** 🔥 GRID + FLEX SAFE WRAPPER */
export const chipWrapper = css`
  display: inline-flex;
  flex-shrink: 0; /* Quan trọng: Tránh bị co lại trong flex/grid container */
  vertical-align: middle;
  max-width: 100%; /* Đảm bảo không tràn container cha */
`;

const getColorStyles = (variant: ChipVariant, color: ChipColor) => {
  const colors: Record<ChipColor, string> = {
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

  if (variant === 'outlined') {
    return css`
      background-color: transparent;
      color: ${baseColor};
      border: 1px solid ${baseColor};
    `;
  }

  // Ghost
  return css`
    background-color: ${baseColor}20;
    color: ${baseColor};
    border: 1px solid transparent;
  `;
};

export const getChipStyles = (variant: ChipVariant, color: ChipColor, clickable: boolean) => css`
  display: inline-flex;
  align-items: center;
  height: 32px;
  padding: 0 ${SPACING.sm};
  font-size: ${FONT_SIZES.sm};
  font-weight: ${FONT_WEIGHTS.medium};
  border-radius: ${RADIUS.full};
  white-space: nowrap;
  transition: all ${TRANSITIONS.fast};
  cursor: ${clickable ? 'pointer' : 'default'};
  
  ${getColorStyles(variant, color)}

  &:hover {
    opacity: ${clickable ? 0.8 : 1};
  }
`;

export const getDeleteIconStyles = () => css`
  margin-left: ${SPACING.xs};
  cursor: pointer;
  display: flex;
  align-items: center;
  opacity: 0.7;
  transition: opacity ${TRANSITIONS.fast};

  &:hover {
    opacity: 1;
  }
`;