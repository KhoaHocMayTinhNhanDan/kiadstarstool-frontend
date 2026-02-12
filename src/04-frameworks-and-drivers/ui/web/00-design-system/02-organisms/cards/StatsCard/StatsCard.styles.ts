// src/04-frameworks-and-drivers/ui/web/components/02-organisms/cards/StatsCard/StatsCard.styles.ts
import { css } from '@emotion/react';
import { COLORS, SPACING, RADIUS, SHADOWS, TRANSITIONS, TYPOGRAPHY } from '../../../00-atoms/00-core/tokens-constants';

export const card = css`
  background-color: ${COLORS.BACKGROUND_PAPER};
  border: 1px solid ${COLORS.NEUTRAL_BORDER};
  border-radius: ${RADIUS.md};
  padding: ${SPACING.lg};
  box-shadow: ${SHADOWS.sm};
  display: flex;
  flex-direction: column;
  gap: ${SPACING.sm};
  transition: transform ${TRANSITIONS.FAST}, box-shadow ${TRANSITIONS.FAST};
  height: 100%;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${SHADOWS.md};
  }
`;

export const iconBox = (accent: string = 'primary') => css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: ${RADIUS.md};
  background-color: ${COLORS[`${accent.toUpperCase()}_LIGHT` as keyof typeof COLORS] || COLORS.BACKGROUND_NEUTRAL};
  color: ${COLORS[accent.toUpperCase() as keyof typeof COLORS] || COLORS.PRIMARY};
  transition: background-color ${TRANSITIONS.FAST};
`;

export const trendBadge = (isPositive: boolean) => css`
  display: flex;
  align-items: center;
  gap: ${SPACING.xs};
  padding: 2px 8px;
  border-radius: ${RADIUS.full};
  background-color: ${isPositive ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)'};
  color: ${isPositive ? COLORS.SUCCESS : COLORS.DANGER};
  font-size: ${TYPOGRAPHY.FONT_SIZE.xs};
  font-weight: ${TYPOGRAPHY.FONT_WEIGHT.medium};
`;

// Skeleton Styles
export const skeletonHeader = css`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${SPACING.md};
`;

export const skeletonContent = css`
  display: flex;
  flex-direction: column;
  gap: ${SPACING.xs};
  flex: 1;
`;

export const skeletonFooter = css`
  display: flex;
  align-items: center;
  gap: ${SPACING.sm};
  margin-top: auto;
  padding-top: ${SPACING.sm};
`;