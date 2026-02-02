import { css } from '@emotion/react';
import { COLORS, SPACING } from '../00-core/tokens-constants';
import type { DividerProps } from './Divider.types';

export const getDividerStyles = ({
  orientation = 'horizontal',
  color = 'NEUTRAL_LIGHT',
  thickness = 1,
  variant = 'solid',
  my,
  mx,
}: Partial<DividerProps>) => {
  const colorValue = color && color in COLORS ? COLORS[color as keyof typeof COLORS] : color;
  
  // Xử lý margin dựa trên orientation nếu không được truyền vào
  const marginY = my !== undefined ? (my in SPACING ? SPACING[my as keyof typeof SPACING] : my) : 0;
  const marginX = mx !== undefined ? (mx in SPACING ? SPACING[mx as keyof typeof SPACING] : mx) : 0;

  return css`
    border: 0;
    margin: 0;
    border-style: ${variant};
    border-color: ${colorValue};
    
    ${orientation === 'horizontal' ? css`
      width: 100%;
      border-bottom-width: ${typeof thickness === 'number' ? `${thickness}px` : thickness};
      margin-top: ${marginY};
      margin-bottom: ${marginY};
    ` : css`
      height: 100%;
      border-left-width: ${typeof thickness === 'number' ? `${thickness}px` : thickness};
      margin-left: ${marginX};
      margin-right: ${marginX};
    `}
  `;
};