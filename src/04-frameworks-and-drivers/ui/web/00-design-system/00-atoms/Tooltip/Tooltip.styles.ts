import { css } from '@emotion/react';
import { COLORS, RADIUS, SHADOWS, SPACING } from '../00-core/tokens-constants';

export const wrapper = css`
  position: relative;
  display: inline-flex;
`;

export const tooltipContent = css`
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(-4px); /* Initial position */
  background-color: ${COLORS.NEUTRAL_DARK};
  color: ${COLORS.WHITE};
  padding: ${SPACING.xs} ${SPACING.sm};
  border-radius: ${RADIUS.sm};
  font-size: 12px;
  white-space: nowrap;
  z-index: 10;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s ease, transform 0.2s ease;
  box-shadow: ${SHADOWS.md};

  /* Show on hover of parent */
  ${wrapper}:hover & {
    opacity: 1;
    transform: translateX(-50%) translateY(-8px); /* Move up on hover */
  }
`;