import { css } from '@emotion/react';
import { COLORS } from '../00-core/tokens-constants';
import { type LogoSize, type LogoVariant } from './Logo';

const SIZES = {
  sm: '24px',
  md: '32px',
  lg: '48px',
  xl: '64px',
};

const VARIANTS = {
  color: COLORS.PRIMARY,
  white: COLORS.WHITE,
  black: COLORS.BLACK,
};

export const getLogoStyles = (size: LogoSize, variant: LogoVariant) => css`
  width: ${SIZES[size]};
  height: ${SIZES[size]};
  color: ${VARIANTS[variant]};
`;