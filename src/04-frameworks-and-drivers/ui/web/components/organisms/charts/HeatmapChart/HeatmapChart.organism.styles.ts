import { css } from '@emotion/react';
import { COLORS, SPACING, FONT_SIZES, RADIUS, SHADOWS, TRANSITIONS } from '../../../atoms/00-core/tokens-constants';

export const container = css`
  position: relative;
  width: 100%;
  overflow: auto;
`;

export const grid = (cols: number, rows: number) => css`
  display: grid;
  grid-template-columns: auto repeat(${cols}, 1fr);
  grid-template-rows: auto repeat(${rows}, 1fr);
  gap: 2px;
  align-items: center;
`;

export const xAxisLabel = css`
  text-align: center;
  font-size: ${FONT_SIZES.xs};
  color: ${COLORS.SECONDARY};
  padding-bottom: ${SPACING.xs};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const yAxisLabel = css`
  text-align: right;
  font-size: ${FONT_SIZES.xs};
  color: ${COLORS.SECONDARY};
  padding-right: ${SPACING.sm};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const cell = (color: string) => css`
  background-color: ${color};
  width: 100%;
  height: 100%;
  min-height: 24px; /* Minimum height for visibility */
  border-radius: ${RADIUS.sm};
  transition: transform ${TRANSITIONS.fast}, opacity ${TRANSITIONS.fast};
  cursor: pointer;
  position: relative;

  &:hover {
    transform: scale(1.1);
    z-index: 1;
    box-shadow: ${SHADOWS.sm};
  }
`;

export const tooltip = css`
  position: absolute;
  background-color: ${COLORS.WHITE};
  border: 1px solid ${COLORS.NEUTRAL_LIGHT};
  padding: ${SPACING.sm};
  border-radius: ${RADIUS.md};
  box-shadow: ${SHADOWS.md};
  pointer-events: none;
  z-index: 10;
  min-width: 120px;
  transform: translate(-50%, -100%);
  margin-top: -8px;
`;

export const tooltipLabel = css`
  font-size: ${FONT_SIZES.xs};
  color: ${COLORS.SECONDARY};
  margin-bottom: ${SPACING.xs};
`;

export const tooltipValue = css`
  font-weight: bold;
  color: ${COLORS.TEXT};
`;