import type { CSSObject } from '@emotion/react';
import type { ElementType, ComponentPropsWithoutRef } from 'react';
import type { SpacingKey } from '../00-core/tokens-constants';

export type BoxOwnProps = {
  as?: ElementType;

  display?: CSSObject['display'];
  flexDirection?: CSSObject['flexDirection'];
  alignItems?: CSSObject['alignItems'];
  justifyContent?: CSSObject['justifyContent'];
  flexWrap?: CSSObject['flexWrap'];
  flex?: CSSObject['flex'];
  gap?: SpacingKey | string | number;

  w?: CSSObject['width'];
  h?: CSSObject['height'];
  minW?: CSSObject['minWidth'];
  maxW?: CSSObject['maxWidth'];
  minH?: CSSObject['minHeight'];
  maxH?: CSSObject['maxHeight'];

  m?: SpacingKey | string | number;
  mt?: SpacingKey | string | number;
  mr?: SpacingKey | string | number;
  mb?: SpacingKey | string | number;
  ml?: SpacingKey | string | number;
  mx?: SpacingKey | string | number;
  my?: SpacingKey | string | number;

  p?: SpacingKey | string | number;
  pt?: SpacingKey | string | number;
  pr?: SpacingKey | string | number;
  pb?: SpacingKey | string | number;
  pl?: SpacingKey | string | number;
  px?: SpacingKey | string | number;
  py?: SpacingKey | string | number;

  bg?: string;
  border?: string;
  radius?: string | number;

  sx?: CSSObject;
};

export type BoxProps<T extends ElementType = 'div'> =
  BoxOwnProps &
  Omit<ComponentPropsWithoutRef<T>, keyof BoxOwnProps>;
