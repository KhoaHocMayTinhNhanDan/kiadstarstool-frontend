import { css, keyframes } from '@emotion/react';
import { COLORS } from '../00-core/tokens-constants';
import { type LoadingSpinnerSize, type LoadingSpinnerVariant } from './Loading-spinner';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SIZES = {
  sm: { size: '16px', border: '2px' },
  md: { size: '24px', border: '3px' },
  lg: { size: '32px', border: '4px' },
  xl: { size: '48px', border: '4px' },
};

const VARIANTS = {
  primary: COLORS.PRIMARY,
  secondary: COLORS.SECONDARY,
  white: COLORS.WHITE,
  neutral: COLORS.NEUTRAL_DARK,
};

export const getSpinnerStyles = (size: LoadingSpinnerSize, variant: LoadingSpinnerVariant) => {
  const sizeConfig = SIZES[size];
  const color = VARIANTS[variant];

  return css`
    display: inline-block;
    width: ${sizeConfig.size};
    height: ${sizeConfig.size};
    border: ${sizeConfig.border} solid ${COLORS.NEUTRAL_LIGHT};
    border-top-color: ${color};
    border-radius: 50%;
    animation: ${spin} 0.8s linear infinite;
    box-sizing: border-box;
  `;
};