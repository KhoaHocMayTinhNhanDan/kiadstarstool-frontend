import { css } from '@emotion/react';
import { COLORS, SPACING, SHADOWS, RADIUS, FONT_SIZES, FONT_WEIGHTS } from '../../../atoms/00-core/tokens-constants';

export const formContainer = css`
  display: flex;
  flex-direction: column;
  gap: ${SPACING.lg};
  width: 100%;
  max-width: 400px;
  padding: ${SPACING.xl};
  background-color: var(--color-background-primary, ${COLORS.WHITE});
  border-radius: ${RADIUS.lg};
  box-shadow: ${SHADOWS.md};
  border: 1px solid var(--color-border, ${COLORS.NEUTRAL_LIGHT});
`;

export const title = css`
  font-size: ${FONT_SIZES['2xl']};
  font-weight: ${FONT_WEIGHTS.semibold};
  text-align: center;
  margin-bottom: ${SPACING.xs};
  color: var(--color-text-primary, ${COLORS.NEUTRAL_DARK});
`;

export const description = css`
  font-size: ${FONT_SIZES.sm};
  text-align: center;
  color: ${COLORS.SECONDARY};
  margin-bottom: ${SPACING.sm};
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

export const errorMessage = css`
  color: ${COLORS.DANGER};
  font-size: ${FONT_SIZES.sm};
  text-align: center;
  min-height: 20px;
`;

export const backLink = css`
  color: ${COLORS.PRIMARY};
  text-decoration: none;
  font-size: ${FONT_SIZES.sm};
  &:hover {
    text-decoration: underline;
  }
`;

export const footer = css`
  display: flex;
  justify-content: center;
  margin-top: ${SPACING.xs};
`;