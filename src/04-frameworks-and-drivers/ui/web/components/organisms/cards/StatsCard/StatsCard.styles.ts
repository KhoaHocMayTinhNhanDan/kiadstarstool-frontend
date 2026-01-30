import { css } from '@emotion/react';
import { COLORS, RADIUS, SPACING, FONT_SIZES, FONT_WEIGHTS } from '../../../atoms/00-core/tokens-constants';
import type { StatsCardProps } from './StatsCard.types';

const accentColorMap: Record<string, string> = {
  primary: COLORS.PRIMARY_LIGHT,
  secondary: COLORS.NEUTRAL_LIGHT,
  success: COLORS.SUCCESS_LIGHT,
  warning: COLORS.WARNING_LIGHT,
  danger: COLORS.DANGER_LIGHT,
  info: COLORS.INFO_LIGHT,
};

const accentTextMap: Record<string, string> = {
  primary: COLORS.PRIMARY,
  secondary: COLORS.SECONDARY_DARK,
  success: COLORS.SUCCESS,
  warning: COLORS.WARNING_DARK,
  danger: COLORS.DANGER,
  info: COLORS.INFO,
};

export const iconBox = (color: string = 'primary') => css`
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: ${RADIUS.md};
  background-color: ${accentColorMap[color] || accentColorMap.primary};
  color: ${accentTextMap[color] || accentTextMap.primary};
  flex-shrink: 0;
`;

export const trendBadge = (isPositive: boolean) => css`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 6px;
  border-radius: ${RADIUS.sm};
  font-size: ${FONT_SIZES.xs};
  font-weight: ${FONT_WEIGHTS.medium};
  line-height: 1;
  
  background-color: ${isPositive ? COLORS.SUCCESS_LIGHT : COLORS.DANGER_LIGHT};
  color: ${isPositive ? COLORS.SUCCESS : COLORS.DANGER};
`;