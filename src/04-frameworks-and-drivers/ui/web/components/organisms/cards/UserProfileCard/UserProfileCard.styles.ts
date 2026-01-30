import { css } from '@emotion/react';
import { COLORS, RADIUS, SPACING, FONT_SIZES, FONT_WEIGHTS } from '../../../atoms/00-core/tokens-constants';

export const coverImage = css`
  width: 100%;
  height: 120px;
  background-color: ${COLORS.NEUTRAL_LIGHT};
  object-fit: cover;
`;

export const avatarWrapper = css`
  margin-top: -48px;
  margin-bottom: ${SPACING.sm};
  padding: 4px;
  background-color: ${COLORS.WHITE};
  border-radius: 50%;
  display: inline-flex;
`;

export const contentWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 0 ${SPACING.lg} ${SPACING.lg};
  gap: ${SPACING.md};
`;

export const statsWrapper = css`
  display: flex;
  justify-content: center;
  gap: ${SPACING.xl};
  width: 100%;
  padding: ${SPACING.md} 0;
  border-top: 1px solid ${COLORS.NEUTRAL_LIGHT};
  border-bottom: 1px solid ${COLORS.NEUTRAL_LIGHT};
  margin: ${SPACING.sm} 0;
`;

export const statItem = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
`;

export const statValue = css`
  font-size: ${FONT_SIZES.lg};
  font-weight: ${FONT_WEIGHTS.bold};
  color: ${COLORS.TEXT};
  line-height: 1;
`;

export const statLabel = css`
  font-size: ${FONT_SIZES.xs};
  color: ${COLORS.SECONDARY};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: ${FONT_WEIGHTS.medium};
`;