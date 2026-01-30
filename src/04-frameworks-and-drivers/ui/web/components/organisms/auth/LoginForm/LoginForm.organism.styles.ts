import { css } from '@emotion/react';
import { COLORS, SPACING, SHADOWS, RADIUS, FONT_SIZES, FONT_WEIGHTS } from '../../../atoms/00-core/tokens-constants';

export const formContainer = css`
  display: flex;
  flex-direction: column;
  gap: ${SPACING.lg}; /* 24px */
  width: 100%;
  max-width: 400px;
  padding: ${SPACING.xl}; /* 32px */
  background-color: var(--color-background-primary, ${COLORS.WHITE});
  border-radius: ${RADIUS.lg};
  box-shadow: ${SHADOWS.md};
  border: 1px solid var(--color-border, ${COLORS.NEUTRAL_LIGHT});
`;

export const title = css`
  font-size: ${FONT_SIZES['2xl']};
  font-weight: ${FONT_WEIGHTS.semibold};
  text-align: center;
  margin-bottom: ${SPACING.sm};
  color: var(--color-text-primary, ${COLORS.NEUTRAL_DARK});
`;

export const optionsContainer = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${FONT_SIZES.sm};
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
  font-size: ${FONT_SIZES.sm};
  text-align: center;
  min-height: 20px; /* Giữ khoảng trống để tránh xê dịch layout */
`;

export const fieldWrapper = css`
  display: flex;
  flex-direction: column;
  gap: ${SPACING.xs};
`;

export const label = css`
  font-size: ${FONT_SIZES.sm};
  font-weight: ${FONT_WEIGHTS.medium};
  color: var(--color-text-primary, ${COLORS.NEUTRAL_DARK});
`;