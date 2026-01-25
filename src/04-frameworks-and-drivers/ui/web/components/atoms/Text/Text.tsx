/** @jsxImportSource @emotion/react */
import React from 'react';
import { getTextStyles } from './Text.styles';
import { FONT_SIZES, FONT_WEIGHTS, COLORS } from '../00-core/tokens-constants';

export type TextSize = keyof typeof FONT_SIZES;
export type TextWeight = keyof typeof FONT_WEIGHTS;
export type TextColor = keyof typeof COLORS | string;
export type TextAlign = 'left' | 'center' | 'right' | 'justify';

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  size?: TextSize;
  weight?: TextWeight;
  color?: TextColor;
  align?: TextAlign;
  truncate?: boolean;
  lineHeight?: string | number;
}

export const Text = ({
  as: Component = 'p',
  size = 'md',
  weight = 'normal',
  color = 'TEXT',
  align = 'left',
  truncate = false,
  lineHeight,
  className,
  children,
  ...props
}: TextProps) => {
  return (
    <Component css={getTextStyles({ size, weight, color, align, truncate, lineHeight })} className={className} {...props}>
      {children}
    </Component>
  );
};

Text.displayName = 'Text';