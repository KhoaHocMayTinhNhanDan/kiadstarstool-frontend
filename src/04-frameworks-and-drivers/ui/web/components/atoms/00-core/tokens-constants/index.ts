/* ==========================================================================
 * Design Tokens Index
 * --------------------------------------------------------------------------
 * Export all design tokens for easy import.
 * ========================================================================== */

// Core units and measurements
export * from './units.constants';

// Design tokens
export * from './colors.constants';
export * from './spacing.constants';
export * from './typography.constants';
export * from './border.constants';
export * from './elevation.constants';
export * from './animation.constants';
export * from './breakpoints.constants';

// Type re-exports - IMPORT DIRECTLY FROM EACH FILE
export type {
  // From units.constants
  CSSUnit,
  RatioKey,
  AspectRatioKey,
  SafeAreaKey,
  ComponentSizeCategory,
} from './units.constants';

export type {
  // From colors.constants
  ColorPalette,
  PrimaryShade,
  NeutralShade,
  SemanticShade,
  BackgroundKey,
  TextKey,
  BorderKey,
  OverlayKey,
} from './colors.constants';

export type {
  // From spacing.constants
  SpacingKey,
  SemanticSpacingKey,
} from './spacing.constants';

export type {
  // From typography.constants
  FontFamilyKey,
  FontSizeKey,
  FontWeightKey,
  LineHeightKey,
  LetterSpacingKey,
  TextStyleCategory,
  TextStyleVariant,
} from './typography.constants';

export type {
  // From border.constants
  BorderRadiusKey,
  BorderWidthKey,
  BorderStyleKey,
  BorderKey as BorderConstantKey,
} from './border.constants';

export type {
  // From elevation.constants
  ZIndexKey,
  ShadowKey,
  ComponentElevationKey,
} from './elevation.constants';

export type {
  // From animation.constants
  DurationKey,
  EasingKey,
  TransitionKey,
  AnimationKey,
} from './animation.constants';

export type {
  // From breakpoints.constants
  Breakpoint,
  DeviceWidth,
  BreakpointRangeKey,
} from './breakpoints.constants';

