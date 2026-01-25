import { css } from '@emotion/react';
import { COLORS } from '../00-core/tokens-constants';

export const SIZES = {
  xs: '12px',
  sm: '16px',
  md: '24px',
  lg: '32px',
  xl: '48px',
};

export const getIconStyles = (size: keyof typeof SIZES, color?: string) => css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${SIZES[size]};
  height: ${SIZES[size]};
  color: ${color || 'currentColor'};
  flex-shrink: 0;
  line-height: 1;
  
  svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
  }
`;