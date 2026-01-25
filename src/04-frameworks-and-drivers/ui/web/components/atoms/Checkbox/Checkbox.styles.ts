import { css, keyframes } from '@emotion/react';
import { COLORS, RADIUS, TRANSITIONS } from '../00-core/tokens-constants';

const scaleIn = keyframes`
  from { transform: scale(0); }
  to { transform: scale(1); }
`;

export const getCheckboxRootStyles = () => css`
  all: unset;
  background-color: ${COLORS.WHITE};
  width: 20px;
  height: 20px;
  border-radius: ${RADIUS.sm};
  border: 1px solid ${COLORS.NEUTRAL_RING};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all ${TRANSITIONS.fast};

  &:hover {
    background-color: ${COLORS.NEUTRAL_LIGHT};
    border-color: ${COLORS.PRIMARY};
  }

  &:focus-visible {
    box-shadow: 0 0 0 2px ${COLORS.WHITE}, 0 0 0 4px ${COLORS.PRIMARY_LIGHT};
    border-color: ${COLORS.PRIMARY};
  }

  &[data-state='checked'] {
    background-color: ${COLORS.PRIMARY};
    border-color: ${COLORS.PRIMARY};
    color: ${COLORS.WHITE};
  }

  &[data-disabled] {
    cursor: not-allowed;
    opacity: 0.5;
    background-color: ${COLORS.NEUTRAL_LIGHT};
  }
`;

export const getCheckboxIndicatorStyles = () => css`
  display: flex;
  align-items: center;
  justify-content: center;
  color: currentColor;
  
  animation: ${scaleIn} 0.2s ease-out;
`;