/* ==========================================================================
 * Box Component Types
 * --------------------------------------------------------------------------
 * TypeScript interfaces and prop types for Box component.
 * REFERENCE token types, don't redefine them.
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

// Simple responsive type (adjust based on your breakpoints.constants.ts)
export type ResponsiveValue<T> = T | { [key: string]: T }; // e.g. { base: T, md: T }

// Spacing props with responsive support
export type BoxSpacingProps = {
  /** Padding on all sides */
  p?: ResponsiveValue<SpacingKey>;
  /** Padding horizontal (left & right) */
  px?: ResponsiveValue<SpacingKey>;
  /** Padding vertical (top & bottom) */
  py?: ResponsiveValue<SpacingKey>;
  /** Padding top */
  pt?: ResponsiveValue<SpacingKey>;
  /** Padding right */
  pr?: ResponsiveValue<SpacingKey>;
  /** Padding bottom */
  pb?: ResponsiveValue<SpacingKey>;
  /** Padding left */
  pl?: ResponsiveValue<SpacingKey>;

  /** Margin on all sides */
  m?: ResponsiveValue<SpacingKey>;
  /** Margin horizontal (left & right) */
  mx?: ResponsiveValue<SpacingKey>;
  /** Margin vertical (top & bottom) */
  my?: ResponsiveValue<SpacingKey>;
  /** Margin top */
  mt?: ResponsiveValue<SpacingKey>;
  /** Margin right */
  mr?: ResponsiveValue<SpacingKey>;
  /** Margin bottom */
  mb?: ResponsiveValue<SpacingKey>;
  /** Margin left */
  ml?: ResponsiveValue<SpacingKey>;
  /** Gap for flex/grid */
  gap?: ResponsiveValue<SpacingKey>;
};

// Style props with responsive for spacing
export type BoxStyleProps = BoxSpacingProps & {
  /** Background color token */
  bg?: ColorPalette;
  /** Text color token */
  color?: ColorPalette;

  /** Layout & sizing */
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
  minWidth?: CSSProperties['minWidth'];
  minHeight?: CSSProperties['minHeight'];
  maxWidth?: CSSProperties['maxWidth'];
  maxHeight?: CSSProperties['maxHeight'];

  /** Display & position */
  display?: CSSProperties['display'];
  position?: CSSProperties['position'];
  top?: CSSProperties['top'];
  right?: CSSProperties['right'];
  bottom?: CSSProperties['bottom'];
  left?: CSSProperties['left'];
  zIndex?: CSSProperties['zIndex'];

  /** Flexbox layout */
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

  /** Grid layout */
  grid?: CSSProperties['grid'];
  gridTemplateColumns?: CSSProperties['gridTemplateColumns'];
  gridTemplateRows?: CSSProperties['gridTemplateRows'];
  gridTemplateAreas?: CSSProperties['gridTemplateAreas'];
  gridArea?: CSSProperties['gridArea'];
  gridColumn?: CSSProperties['gridColumn'];
  gridRow?: CSSProperties['gridRow'];

  /** Typography */
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

  /** Borders & radius */
  border?: CSSProperties['border'];
  borderTop?: CSSProperties['borderTop'];
  borderRight?: CSSProperties['borderRight'];
  borderBottom?: CSSProperties['borderBottom'];
  borderLeft?: CSSProperties['borderLeft'];
  borderRadius?: CSSProperties['borderRadius'];

  /** Background */
  background?: CSSProperties['background'];
  backgroundColor?: CSSProperties['backgroundColor'];
  backgroundImage?: CSSProperties['backgroundImage'];
  backgroundSize?: CSSProperties['backgroundSize'];
  backgroundPosition?: CSSProperties['backgroundPosition'];
  backgroundRepeat?: CSSProperties['backgroundRepeat'];

  /** Effects */
  opacity?: CSSProperties['opacity'];
  boxShadow?: CSSProperties['boxShadow'];
  overflow?: CSSProperties['overflow'];
  overflowX?: CSSProperties['overflowX'];
  overflowY?: CSSProperties['overflowY'];
  cursor?: CSSProperties['cursor'];
  visibility?: CSSProperties['visibility'];

  /** Transforms */
  transform?: CSSProperties['transform'];
  transformOrigin?: CSSProperties['transformOrigin'];

  /** Transitions */
  transition?: CSSProperties['transition'];
  transitionProperty?: CSSProperties['transitionProperty'];
  transitionDuration?: CSSProperties['transitionDuration'];
  transitionTimingFunction?: CSSProperties['transitionTimingFunction'];
  transitionDelay?: CSSProperties['transitionDelay'];

  /** User interaction */
  pointerEvents?: CSSProperties['pointerEvents'];
  userSelect?: CSSProperties['userSelect'];

  /** List styling */
  listStyleType?: CSSProperties['listStyleType'];
  listStylePosition?: CSSProperties['listStylePosition'];

  /** Other */
  content?: CSSProperties['content'];
  resize?: CSSProperties['resize'];
};

/* ============================================================================
 * 3. Polymorphic Box props
 * ========================================================================== */

export type BoxProps<T extends ElementType = 'div'> = {
  /**
   * Polymorphic render
   * @example
   * <Box as="section" />
   * <Box as="a" href="..." />
   * <Box as={Link} to="..." />
   */
  as?: T;

  /** Children */
  children?: ReactNode;

  /** CSS class name */
  className?: string;

  /** Inline styles */
  style?: CSSProperties;

  /** Data attribute for testing */
  'data-testid'?: string;
} & BoxStyleProps &
  Omit<
    ComponentPropsWithoutRef<T>,
    | 'as'
    | 'children'
    | 'className'
    | 'style'
    | 'data-testid'
    | keyof BoxStyleProps
  >;