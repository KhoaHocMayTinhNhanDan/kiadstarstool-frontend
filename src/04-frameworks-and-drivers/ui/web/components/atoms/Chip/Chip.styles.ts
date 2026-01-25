import { css } from '@emotion/react';
import { COLORS, RADIUS, SPACING } from '../00-core/tokens-constants';
import { type ChipVariant, type ChipColor } from './Chip';

const VARIANTS = {
  filled: {
    primary: { bg: COLORS.PRIMARY, color: COLORS.WHITE, border: 'transparent' },
    success: { bg: COLORS.SUCCESS, color: COLORS.WHITE, border: 'transparent' },
    danger: { bg: COLORS.DANGER, color: COLORS.WHITE, border: 'transparent' },
    warning: { bg: COLORS.WARNING, color: COLORS.WHITE, border: 'transparent' },
    neutral: { bg: COLORS.NEUTRAL_LIGHT, color: COLORS.TEXT, border: 'transparent' },
  },
  outlined: {
    primary: { bg: 'transparent', color: COLORS.PRIMARY, border: COLORS.PRIMARY },
    success: { bg: 'transparent', color: COLORS.SUCCESS, border: COLORS.SUCCESS },
    danger: { bg: 'transparent', color: COLORS.DANGER, border: COLORS.DANGER },
    warning: { bg: 'transparent', color: COLORS.WARNING, border: COLORS.WARNING },
    neutral: { bg: 'transparent', color: COLORS.TEXT, border: COLORS.NEUTRAL_RING },
  },
  ghost: {
    primary: { bg: COLORS.PRIMARY_LIGHT + '33', color: COLORS.PRIMARY, border: 'transparent' }, // 33 is ~20% opacity hex
    success: { bg: COLORS.SUCCESS_LIGHT + '33', color: COLORS.SUCCESS, border: 'transparent' },
    danger: { bg: COLORS.DANGER_LIGHT + '33', color: COLORS.DANGER, border: 'transparent' },
    warning: { bg: COLORS.WARNING + '33', color: COLORS.WARNING, border: 'transparent' },
    neutral: { bg: COLORS.NEUTRAL_LIGHT, color: COLORS.TEXT, border: 'transparent' },
  }
};

export const getChipStyles = (variant: ChipVariant, color: ChipColor, clickable: boolean) => {
  const styleConfig = VARIANTS[variant][color];
  
  return css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 24px;
    padding: 0 ${SPACING.sm};
    border-radius: ${RADIUS.full};
    font-size: 12px;
    font-weight: 500;
    white-space: nowrap;
    transition: all 0.2s ease;
    
    background-color: ${styleConfig.bg};
    color: ${styleConfig.color};
    border: 1px solid ${styleConfig.border};
    
    ${clickable && css`
      cursor: pointer;
      &:hover {
        opacity: 0.8;
      }
    `}
  `;
};

export const getDeleteIconStyles = () => css`
  margin-left: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0.6;
  
  &:hover {
    opacity: 1;
  }
`;