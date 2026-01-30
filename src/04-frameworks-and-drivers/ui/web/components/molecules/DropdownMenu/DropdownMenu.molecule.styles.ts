import { css, keyframes } from '@emotion/react';
import {
  COLORS,
  RADIUS,
  SHADOWS,
  SPACING,
  TRANSITIONS,
} from '../../atoms/00-core/tokens-constants';

/* ==========================================================================
 * ANIMATIONS
 * ========================================================================== */

const slideUpAndFade = keyframes`
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideDownAndFade = keyframes`
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

/* ==========================================================================
 * CONTENT
 * ========================================================================== */

export const contentStyles = css`
  min-width: 220px;
  background-color: ${COLORS.WHITE};
  border-radius: ${RADIUS.md};
  padding: ${SPACING.xs};
  box-shadow: ${SHADOWS.lg};
  border: 1px solid ${COLORS.NEUTRAL_RING};
  z-index: 100;

  animation-duration: 180ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;

  &[data-side='top'] {
    animation-name: ${slideDownAndFade};
  }

  &[data-side='bottom'] {
    animation-name: ${slideUpAndFade};
  }
`;

/* ==========================================================================
 * ITEM
 * ========================================================================== */

export const itemStyles = css`
  all: unset;
  display: flex;
  align-items: center;

  height: 32px;
  padding: 0 ${SPACING.sm};
  border-radius: ${RADIUS.sm};

  font-size: 13px;
  color: ${COLORS.TEXT};
  cursor: pointer;
  user-select: none;

  transition: background-color ${TRANSITIONS.fast},
              color ${TRANSITIONS.fast};

  &[data-disabled] {
    color: ${COLORS.TEXT_MUTED};
    pointer-events: none;
  }

  &[data-highlighted] {
    background-color: ${COLORS.PRIMARY};
    color: ${COLORS.WHITE};
  }
`;

/* ==========================================================================
 * SEPARATOR
 * ========================================================================== */

export const separatorStyles = css`
  height: 1px;
  background-color: ${COLORS.NEUTRAL_LIGHT};
  margin: ${SPACING.xs} 0;
`;
