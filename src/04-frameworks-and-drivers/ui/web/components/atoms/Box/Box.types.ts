import { type ElementType, type HTMLAttributes } from 'react';

export interface BoxStyleProps {
  // Spacing
  m?: string | number;
  mt?: string | number;
  mr?: string | number;
  mb?: string | number;
  ml?: string | number;
  mx?: string | number;
  my?: string | number;
  p?: string | number;
  pt?: string | number;
  pr?: string | number;
  pb?: string | number;
  pl?: string | number;
  px?: string | number;
  py?: string | number;
  
  // Layout & Flex
  display?: string;
  flexDirection?: string;
  alignItems?: string;
  justifyContent?: string;
  gap?: string | number;
  flexWrap?: string;
  flex?: string | number;
  w?: string | number;
  h?: string | number;
  minW?: string | number;
  maxW?: string | number;
  minH?: string | number;
  maxH?: string | number;
  bg?: string;
  color?: string;
}

export interface BoxProps<T extends ElementType = 'div'> extends BoxStyleProps, HTMLAttributes<HTMLElement> {
  as?: T;
}