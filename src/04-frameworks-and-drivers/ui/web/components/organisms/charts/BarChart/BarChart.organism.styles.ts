import { css } from '@emotion/react';
import { COLORS, FONT_SIZES, FONT_WEIGHTS, RADIUS, SHADOWS } from '../../../atoms/00-core/tokens-constants';

export const chartContainer = css`
  width: 100%;
  height: 100%;
  min-height: 300px;
  position: relative;
  font-family: system-ui, -apple-system, sans-serif;
`;

export const tooltip = css`
  background-color: ${COLORS.WHITE};
  border: 1px solid ${COLORS.NEUTRAL_LIGHT};
  border-radius: ${RADIUS.md};
  padding: 12px;
  box-shadow: ${SHADOWS.md};
  min-width: 150px;
`;

export const tooltipLabel = css`
  font-size: ${FONT_SIZES.sm};
  font-weight: ${FONT_WEIGHTS.semibold};
  color: ${COLORS.NEUTRAL_DARK};
  margin-bottom: 8px;
`;

export const tooltipItem = css`
  font-size: ${FONT_SIZES.xs};
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
`;