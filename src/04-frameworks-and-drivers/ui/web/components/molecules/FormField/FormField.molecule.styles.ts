import { css } from '@emotion/react';
import { SPACING, COLORS, FONT_SIZES } from '../../atoms/00-core/tokens-constants';

export const container = (isHorizontal: boolean) => css`
  display: flex;
  flex-direction: ${isHorizontal ? 'row' : 'column'};
  align-items: ${isHorizontal ? 'center' : 'stretch'};
  gap: ${isHorizontal ? SPACING.md : SPACING.xs};
  width: 100%;
  min-width: 0; /* 🔥 BẮT BUỘC */
`;

export const label = (isHorizontal: boolean, disabled?: boolean) => css`
  font-size: ${FONT_SIZES.sm};
  color: ${disabled ? COLORS.TEXT_MUTED : COLORS.TEXT};
  cursor: ${disabled ? 'not-allowed' : 'pointer'};
  min-width: ${isHorizontal ? '120px' : 'auto'};
  flex-shrink: 0;
`;

export const control = css`
  display: flex;
  flex-direction: column;
  gap: ${SPACING.xs};
  flex: 1;
  min-width: 0; /* 🔥 FIX overflow trong grid */
`;

export const messageSlot = css`
  min-height: 16px; /* tránh layout jump */
`;

export const errorText = css`
  color: ${COLORS.DANGER};
`;

export const helperText = css`
  color: ${COLORS.TEXT_MUTED};
`;
