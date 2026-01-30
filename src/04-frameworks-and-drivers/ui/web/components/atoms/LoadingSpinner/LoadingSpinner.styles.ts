import { css, keyframes } from '@emotion/react';
import { COLORS } from '../00-core/tokens-constants';
import type { SpinnerSize } from './LoadingSpinner.types';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const sizeMap = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32,
  xl: 48,
};

export const spinnerStyles = (size: SpinnerSize, color?: string) => css`
  display: inline-block;
  width: ${sizeMap[size]}px;
  height: ${sizeMap[size]}px;
  border: 2px solid ${COLORS.NEUTRAL_LIGHT};
  border-top-color: ${color || COLORS.PRIMARY};
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;