import { css } from '@emotion/react';
import { COLORS, SPACING, TYPOGRAPHY } from '../../../00-atoms/00-core/tokens-constants';

export const formContainer = css`
  display: flex;
  flex-direction: column;
  gap: ${SPACING.lg}; /* 24px */
  width: 100%;
`;

export const title = css`
  font-size: ${TYPOGRAPHY.FONT_SIZE['2xl']};
  font-weight: ${TYPOGRAPHY.FONT_WEIGHT.semibold};
  text-align: center;
  margin-bottom: ${SPACING.sm};
  color: var(--color-text-primary, ${COLORS.NEUTRAL_DARK});
`;

export const optionsContainer = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${TYPOGRAPHY.FONT_SIZE.sm};
`;

export const rememberMeContainer = css`
  display: flex;
  align-items: center;
  gap: ${SPACING.xs};
  cursor: pointer;
`;

export const forgotPasswordLink = css`
  color: ${COLORS.PRIMARY};
  text-decoration: none;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  font-family: inherit;
  &:hover {
    text-decoration: underline;
  }
`;

export const errorMessage = css`
  color: ${COLORS.DANGER};
  font-size: ${TYPOGRAPHY.FONT_SIZE.sm};
  text-align: center;
  min-height: 20px; /* Giữ khoảng trống để tránh xê dịch layout */
`;

export const fieldWrapper = css`
  display: flex;
  flex-direction: column;
  gap: ${SPACING.xs};
`;

export const label = css`
  font-size: ${TYPOGRAPHY.FONT_SIZE.sm};
  font-weight: ${TYPOGRAPHY.FONT_WEIGHT.medium};
  color: var(--color-text-primary, ${COLORS.NEUTRAL_DARK});
`;