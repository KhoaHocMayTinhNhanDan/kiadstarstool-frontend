/* ==========================================================================
 * Box Component Types
 * ========================================================================== */

import type {
  CSSProperties,
  ElementType,
  ReactNode,
  ComponentPropsWithoutRef,
} from 'react';

// Import token types
import type { SpacingKey } from '..//00-core/tokens-constants/spacing.constants';
import type { ColorPalette } from '..//00-core/tokens-constants/colors.constants';

/* ============================================================================
 * 1. Spacing props – hỗ trợ cả key đơn và responsive object
 * ========================================================================== */

export type ResponsiveValue<T> = T | { base?: T; sm?: T; md?: T; lg?: T; xl?: T };

export type BoxSpacingProps = {
  /** Padding on all sides */
  p?: ResponsiveValue<SpacingKey>;
  px?: ResponsiveValue<SpacingKey>;
  py?: ResponsiveValue<SpacingKey>;
  pt?: ResponsiveValue<SpacingKey>;
  pr?: ResponsiveValue<SpacingKey>;
  pb?: ResponsiveValue<SpacingKey>;
  pl?: ResponsiveValue<SpacingKey>;

  /** Margin on all sides */
  m?: ResponsiveValue<SpacingKey>;
  mx?: ResponsiveValue<SpacingKey>;
  my?: ResponsiveValue<SpacingKey>;
  mt?: ResponsiveValue<SpacingKey>;
  mr?: ResponsiveValue<SpacingKey>;
  mb?: ResponsiveValue<SpacingKey>;
  ml?: ResponsiveValue<SpacingKey>;

  /** Gap (for flex/grid) */
  gap?: ResponsiveValue<SpacingKey>;
};

/* ============================================================================
 * 2. Style props (các prop khác vẫn dùng CSSProperties trực tiếp)
 * ========================================================================== */

export type BoxStyleProps = BoxSpacingProps & {
  bg?: ColorPalette;
  color?: ColorPalette;

  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
  minWidth?: CSSProperties['minWidth'];
  minHeight?: CSSProperties['minHeight'];
  maxWidth?: CSSProperties['maxWidth'];
  maxHeight?: CSSProperties['maxHeight'];

  display?: CSSProperties['display'];
  position?: CSSProperties['position'];
  top?: CSSProperties['top'];
  right?: CSSProperties['right'];
  bottom?: CSSProperties['bottom'];
  left?: CSSProperties['left'];
  zIndex?: CSSProperties['zIndex'];

  flex?: CSSProperties['flex'];
  flexDirection?: CSSProperties['flexDirection'];
  flexWrap?: CSSProperties['flexWrap'];
  flexGrow?: CSSProperties['flexGrow'];
  flexShrink?: CSSProperties['flexShrink'];
  flexBasis?: CSSProperties['flexBasis'];
  alignItems?: CSSProperties['alignItems'];
  justifyContent?: CSSProperties['justifyContent'];
  alignContent?: CSSProperties['alignContent'];
  alignSelf?: CSSProperties['alignSelf'];
  order?: CSSProperties['order'];

  grid?: CSSProperties['grid'];
  gridTemplateColumns?: CSSProperties['gridTemplateColumns'];
  gridTemplateRows?: CSSProperties['gridTemplateRows'];
  gridTemplateAreas?: CSSProperties['gridTemplateAreas'];
  gridArea?: CSSProperties['gridArea'];
  gridColumn?: CSSProperties['gridColumn'];
  gridRow?: CSSProperties['gridRow'];

  fontSize?: CSSProperties['fontSize'];
  fontWeight?: CSSProperties['fontWeight'];
  fontStyle?: CSSProperties['fontStyle'];
  textAlign?: CSSProperties['textAlign'];
  textDecoration?: CSSProperties['textDecoration'];
  lineHeight?: CSSProperties['lineHeight'];
  letterSpacing?: CSSProperties['letterSpacing'];
  whiteSpace?: CSSProperties['whiteSpace'];
  wordBreak?: CSSProperties['wordBreak'];
  textOverflow?: CSSProperties['textOverflow'];

  border?: CSSProperties['border'];
  borderRadius?: CSSProperties['borderRadius'];

  opacity?: CSSProperties['opacity'];
  boxShadow?: CSSProperties['boxShadow'];
  overflow?: CSSProperties['overflow'];
  cursor?: CSSProperties['cursor'];
};

/* ============================================================================
 * 3. Polymorphic Box props
 * ========================================================================== */

export type BoxProps<T extends ElementType = 'div'> = BoxStyleProps & {
  as?: T;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  'data-testid'?: string;
} & Omit<
    ComponentPropsWithoutRef<T>,
    'as' | 'children' | 'className' | 'style' | 'data-testid' | keyof BoxStyleProps
  >;