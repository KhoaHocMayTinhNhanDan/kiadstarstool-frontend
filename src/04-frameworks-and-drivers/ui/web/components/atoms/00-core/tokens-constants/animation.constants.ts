/* ==========================================================================
 * Animation Constants
 * --------------------------------------------------------------------------
 * Timing, easing, and transition values.
 * PURE CONSTANTS ONLY.
 * ========================================================================== */

export const DURATION = {
  /** Instant (0ms) - immediate feedback */
  INSTANT: 0,
  /** Fast (100ms) - micro-interactions, hover */
  FAST: 100,
  /** Normal (200ms) - standard transitions */
  NORMAL: 200,
  /** Slow (300ms) - entering/exiting elements */
  SLOW: 300,
  /** Slower (500ms) - page transitions, modal animations */
  SLOWER: 500,
} as const;

export const EASING = {
  /** Linear - no easing */
  LINEAR: 'linear',
  /** Standard - default easing for most animations */
  STANDARD: 'cubic-bezier(0.4, 0, 0.2, 1)',
  /** Decelerate - entering animations */
  DECELERATE: 'cubic-bezier(0, 0, 0.2, 1)',
  /** Accelerate - exiting animations */
  ACCELERATE: 'cubic-bezier(0.4, 0, 1, 1)',
  /** Sharp - quick, abrupt animations */
  SHARP: 'cubic-bezier(0.4, 0, 0.6, 1)',
  /** Bounce - playful, bouncy animations */
  BOUNCE: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
} as const;

export const TRANSITION = {
  /** Default transition for most properties */
  DEFAULT: `${DURATION.NORMAL}ms ${EASING.STANDARD}`,
  /** Color transitions */
  COLOR: `${DURATION.FAST}ms ${EASING.STANDARD}`,
  /** Transform transitions (scale, translate, rotate) */
  TRANSFORM: `${DURATION.NORMAL}ms ${EASING.DECELERATE}`,
  /** Opacity transitions */
  OPACITY: `${DURATION.FAST}ms ${EASING.STANDARD}`,
  /** Background transitions */
  BACKGROUND: `${DURATION.FAST}ms ${EASING.STANDARD}`,
  /** Box shadow transitions */
  SHADOW: `${DURATION.FAST}ms ${EASING.STANDARD}`,
  /** Border transitions */
  BORDER: `${DURATION.FAST}ms ${EASING.STANDARD}`,
} as const;

export const ANIMATION = {
  /** Fade in animation */
  FADE_IN: `fadeIn ${DURATION.NORMAL}ms ${EASING.STANDARD}`,
  /** Fade out animation */
  FADE_OUT: `fadeOut ${DURATION.FAST}ms ${EASING.STANDARD}`,
  /** Slide in from left */
  SLIDE_IN_LEFT: `slideInLeft ${DURATION.NORMAL}ms ${EASING.DECELERATE}`,
  /** Slide in from right */
  SLIDE_IN_RIGHT: `slideInRight ${DURATION.NORMAL}ms ${EASING.DECELERATE}`,
  /** Slide in from top */
  SLIDE_IN_TOP: `slideInTop ${DURATION.NORMAL}ms ${EASING.DECELERATE}`,
  /** Slide in from bottom */
  SLIDE_IN_BOTTOM: `slideInBottom ${DURATION.NORMAL}ms ${EASING.DECELERATE}`,
  /** Scale in animation */
  SCALE_IN: `scaleIn ${DURATION.NORMAL}ms ${EASING.DECELERATE}`,
  /** Scale out animation */
  SCALE_OUT: `scaleOut ${DURATION.FAST}ms ${EASING.ACCELERATE}`,
  /** Rotate animation */
  ROTATE: `rotate ${DURATION.SLOWER}ms ${EASING.LINEAR} infinite`,
  /** Pulse animation */
  PULSE: `pulse ${DURATION.SLOWER}ms ${EASING.STANDARD} infinite`,
  /** Bounce animation */
  BOUNCE: `bounce ${DURATION.SLOWER}ms ${EASING.BOUNCE} infinite`,
} as const;

export type DurationKey = keyof typeof DURATION;
export type EasingKey = keyof typeof EASING;
export type TransitionKey = keyof typeof TRANSITION;
export type AnimationKey = keyof typeof ANIMATION;