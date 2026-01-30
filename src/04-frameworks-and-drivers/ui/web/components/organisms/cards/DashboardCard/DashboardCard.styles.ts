import { css } from '@emotion/react';
import { COLORS, RADIUS, SPACING } from '../../../atoms/00-core/tokens-constants';
import type { DashboardCardProps } from './DashboardCard.types';

export const cardContent = css`
  display: flex;
  align-items: flex-start;
  gap: ${SPACING.lg};
`;

const accentColorMap: Record<
  Required<DashboardCardProps>['accentColor'],
  string
> = {
  primary: COLORS.PRIMARY_LIGHT,
  success: COLORS.SUCCESS_LIGHT,
  danger: COLORS.DANGER_LIGHT,
  warning: COLORS.WARNING_LIGHT,
  info: COLORS.INFO_LIGHT,
};

export const iconWrapper = (
  accentColor: DashboardCardProps['accentColor'] = 'primary'
) => css`
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border-radius: ${RADIUS.full};
  background-color: ${accentColorMap[accentColor]};
  color: ${COLORS[accentColor.toUpperCase() as keyof typeof COLORS]};
`;

export const textWrapper = css`
  display: flex;
  flex-direction: column;
  gap: ${SPACING.xs};
  min-width: 0; /* 🔥 QUAN TRỌNG: Fix flexbox overflow */
`;