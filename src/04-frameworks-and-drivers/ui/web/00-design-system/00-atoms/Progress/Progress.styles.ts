import { css, keyframes } from '@emotion/react';
import { COLORS, RADIUS, TRANSITIONS } from '../00-core/tokens-constants';
import { type ProgressSize, type ProgressVariant } from './Progress';

const SIZES = {
  sm: { height: '4px' },
  md: { height: '8px' },
  lg: { height: '12px' },
};

const VARIANTS = {
  primary: COLORS.PRIMARY,
  success: COLORS.SUCCESS,
  danger: COLORS.DANGER,
  neutral: COLORS.NEUTRAL_DARK,
};

const indeterminateAnimation = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

export const getProgressRootStyles = (size: ProgressSize) => css`
  position: relative;
  overflow: hidden;
  background-color: ${COLORS.NEUTRAL_LIGHT};
  border-radius: ${RADIUS.full};
  width: 100%;
  height: ${SIZES[size].height};
  transform: translateZ(0); /* Fix for Safari overflow clipping */
`;

export const getProgressIndicatorStyles = (variant: ProgressVariant, isIndeterminate: boolean) => css`
  background-color: ${VARIANTS[variant]};
  width: 100%;
  height: 100%;
  transition: transform ${TRANSITIONS.normal};
  border-radius: ${RADIUS.full};
  
  /* Trạng thái loading không xác định */
  ${isIndeterminate && css`
    width: 50%;
    animation: ${indeterminateAnimation} 1s infinite linear;
    transform: translateX(0) !important; /* Override Radix transform */
  `}
`;