import { css } from '@emotion/react';
import { COLORS, SPACING, RADIUS, FONT_SIZES, FONT_WEIGHTS, SHADOWS } from '../../../atoms/00-core/tokens-constants';

export const container = css`
  width: 100%;
  background-color: ${COLORS.WHITE};
  border-radius: ${RADIUS.lg};
  box-shadow: ${SHADOWS.sm};
  border: 1px solid ${COLORS.NEUTRAL_LIGHT};
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const tableWrapper = css`
  width: 100%;
  overflow-x: auto;
`;

export const table = css`
  width: 100%;
  border-collapse: collapse;
  min-width: 600px; /* Đảm bảo bảng không bị co quá nhỏ trên mobile */
`;

export const thead = css`
  background-color: ${COLORS.LIGHT};
  border-bottom: 1px solid ${COLORS.NEUTRAL_LIGHT};
`;

export const th = css`
  padding: ${SPACING.md} ${SPACING.lg};
  text-align: left;
  font-size: ${FONT_SIZES.xs};
  font-weight: ${FONT_WEIGHTS.semibold};
  color: ${COLORS.SECONDARY_DARK};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  white-space: nowrap;
`;

export const tbody = css`
  & tr:last-child td {
    border-bottom: none;
  }
`;

export const tr = css`
  border-bottom: 1px solid ${COLORS.NEUTRAL_LIGHT};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${COLORS.LIGHT};
  }
`;

export const td = css`
  padding: ${SPACING.md} ${SPACING.lg};
  font-size: ${FONT_SIZES.sm};
  color: ${COLORS.TEXT};
  vertical-align: middle;
`;

export const loadingOverlay = css`
  padding: ${SPACING['2xl']};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${COLORS.SECONDARY};
  min-height: 200px;
`;

export const emptyState = css`
  padding: ${SPACING['2xl']};
  text-align: center;
  color: ${COLORS.SECONDARY};
  font-size: ${FONT_SIZES.sm};
  min-height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const paginationContainer = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${SPACING.md} ${SPACING.lg};
  border-top: 1px solid ${COLORS.NEUTRAL_LIGHT};
  background-color: ${COLORS.WHITE};
  font-size: ${FONT_SIZES.sm};
  color: ${COLORS.SECONDARY_DARK};
`;