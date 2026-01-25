import { css, keyframes } from '@emotion/react';
import { COLORS, RADIUS, SHADOWS, SPACING, TRANSITIONS } from '../../atoms/00-core/tokens-constants';

const slideUpAndFade = keyframes`
  from { opacity: 0; transform: translateY(2px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideDownAndFade = keyframes`
  from { opacity: 0; transform: translateY(-2px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const contentStyles = css`
  min-width: 220px;
  background-color: ${COLORS.WHITE};
  border-radius: ${RADIUS.md};
  padding: ${SPACING.xs};
  box-shadow: ${SHADOWS.lg};
  border: 1px solid ${COLORS.NEUTRAL_RING};
  z-index: ${100};
  animation-duration: 400ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;

  &[data-side='top'] { animation-name: ${slideDownAndFade}; }
  &[data-side='bottom'] { animation-name: ${slideUpAndFade}; }
`;

export const itemStyles = css`
  all: unset;
  font-size: 13px;
  line-height: 1;
  color: ${COLORS.TEXT};
  border-radius: ${RADIUS.sm};
  display: flex;
  align-items: center;
  height: 25px;
  padding: 0 5px;
  position: relative;
  padding-left: 25px;
  user-select: none;
  cursor: pointer;
  transition: all ${TRANSITIONS.fast};

  &[data-disabled] {
    color: ${COLORS.SECONDARY};
    pointer-events: none;
  }

  &[data-highlighted] {
    background-color: ${COLORS.PRIMARY};
    color: ${COLORS.WHITE};
  }
`;

export const separatorStyles = css`
  height: 1px;
  background-color: ${COLORS.NEUTRAL_LIGHT};
  margin: 5px;
`;