import { css } from '@emotion/react';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../../../01-ui-core/constants/tokens-constants';

export const tooltip = css`
  background-color: ${COLORS.WHITE};
  border: 1px solid ${COLORS.NEUTRAL_BORDER};
  border-radius: ${RADIUS.md};
  padding: ${SPACING.sm};
  box-shadow: ${SHADOWS.md};
`;

export const tooltipItem = css`
  display: flex;
  align-items: center;
  gap: ${SPACING.xs};
`;