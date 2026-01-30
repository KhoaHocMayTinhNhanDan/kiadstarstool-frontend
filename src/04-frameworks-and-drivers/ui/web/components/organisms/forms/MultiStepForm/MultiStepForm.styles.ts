// src/04-frameworks-and-drivers/ui/web/components/organisms/forms/MultiStepForm/MultiStepForm.styles.ts

import { css } from '@emotion/react';
import {
  SPACING,
  COLORS,
  FONT_WEIGHTS,
  
} from '../../../atoms/00-core/tokens-constants';

/* ================= CONTAINER ================= */

export const container = css`
  display: flex;
  flex-direction: column;
  gap: ${SPACING['2xl']};
`;

/* ================= PROGRESS ================= */

export const progress = css`
  display: flex;
  align-items: flex-start;
  gap: ${SPACING.lg};
`;

export const progressItem = (
  state: 'done' | 'active' | 'upcoming'
) => css`
  display: flex;
  align-items: center;
  gap: ${SPACING.sm};

  color: ${
    state === 'active'
      ? COLORS.PRIMARY
      : state === 'done'
      ? COLORS.SUCCESS
      : COLORS.TEXT_MUTED
  };
`;

export const circle = (
  state: 'done' | 'active' | 'upcoming'
) => css`
  width: 28px;
  height: 28px;
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 12px;
  font-weight: ${FONT_WEIGHTS.semibold};

  background-color: ${
    state === 'active'
      ? COLORS.PRIMARY
      : state === 'done'
      ? COLORS.SUCCESS
      : COLORS.NEUTRAL_LIGHT
  };

  color: ${
    state === 'upcoming'
      ? COLORS.TEXT_MUTED
      : COLORS.WHITE
  };
`;

/* ================= CARD ================= */

export const card = css`
  display: flex;
  flex-direction: column;
`;

export const cardHeader = css`
  padding: ${SPACING.lg} ${SPACING.xl};
  border-bottom: 1px solid ${COLORS.SUCCESS_LIGHT};

  display: flex;
  flex-direction: column;
  gap: ${SPACING.xs};
`;

export const cardBody = css`
  padding: ${SPACING.xl};
  min-height: 240px;
`;

export const cardFooter = css`
  padding: ${SPACING.lg} ${SPACING.xl};
  border-top: 1px solid ${COLORS.SUCCESS_LIGHT};

  display: flex;
  justify-content: space-between;
  gap: ${SPACING.md};
`;
