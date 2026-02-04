/* ==========================================================================
 * Dropdown Base Styles
 * --------------------------------------------------------------------------
 * Core styles for dropdown positioning, animation, and base layout
 * ========================================================================== */

import { css, keyframes } from '@emotion/react';
import {
  COLORS,
  RADIUS,
  SHADOWS,
  SPACING,
  ANIMATION,
  Z_INDEX,
} from '../../00-atoms/00-core/tokens-constants';

/* ==========================================================================
 * ANIMATIONS
 * ========================================================================== */

export const slideUpAndFade = keyframes`
  from {
    opacity: 0;
    transform: translateY(${SPACING.xs});
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const slideDownAndFade = keyframes`
  from {
    opacity: 0;
    transform: translateY(-${SPACING.xs});
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const slideLeftAndFade = keyframes`
  from {
    opacity: 0;
    transform: translateX(${SPACING.xs});
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const slideRightAndFade = keyframes`
  from {
    opacity: 0;
    transform: translateX(-${SPACING.xs});
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

/* ==========================================================================
 * CONTENT
 * ========================================================================== */

export const dropdownContent = css`
  position: relative;
  min-width: 180px;
  background-color: ${COLORS.BACKGROUND_PAPER};
  border-radius: ${RADIUS.md};
  border: 1px solid ${COLORS.BORDER.LIGHT};
  box-shadow: ${SHADOWS.LG};
  z-index: ${Z_INDEX.DROPDOWN};
  overflow: hidden;
  animation-duration: ${ANIMATION.DURATION.FAST}ms;
  animation-timing-function: ${ANIMATION.EASING.STANDARD};
  will-change: transform, opacity;

  &[data-side='top'] {
    animation-name: ${slideDownAndFade};
  }

  &[data-side='bottom'] {
    animation-name: ${slideUpAndFade};
  }

  &[data-side='left'] {
    animation-name: ${slideRightAndFade};
  }

  &[data-side='right'] {
    animation-name: ${slideLeftAndFade};
  }

  /* Focus styles */
  &:focus {
    outline: 2px solid ${COLORS.PRIMARY[500]};
    outline-offset: 2px;
  }

  /* Scrollable content */
  &[data-scrollable] {
    max-height: 300px;
    overflow-y: auto;
    
    &::-webkit-scrollbar {
      width: 6px;
    }
    
    &::-webkit-scrollbar-track {
      background: ${COLORS.NEUTRAL[50]};
    }
    
    &::-webkit-scrollbar-thumb {
      background: ${COLORS.NEUTRAL[300]};
      border-radius: ${RADIUS.sm};
      
      &:hover {
        background: ${COLORS.NEUTRAL[400]};
      }
    }
  }
`;

/* ==========================================================================
 * TRIGGER
 * ========================================================================== */

export const dropdownTrigger = css`
  all: unset;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  &:focus-visible {
    outline: 2px solid ${COLORS.PRIMARY[500]};
    outline-offset: 2px;
    border-radius: ${RADIUS.sm};
  }
  
  &[data-state='open'] {
    background-color: ${COLORS.NEUTRAL[100]};
  }
`;

/* ==========================================================================
 * SCROLL AREA (Optional)
 * ========================================================================== */

export const dropdownScrollArea = css`
  max-height: 300px;
  overflow-y: auto;
  padding: ${SPACING.xs} 0;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${COLORS.NEUTRAL[50]};
    border-radius: ${RADIUS.sm};
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${COLORS.NEUTRAL[300]};
    border-radius: ${RADIUS.sm};
    
    &:hover {
      background: ${COLORS.NEUTRAL[400]};
    }
  }
`;

/* ==========================================================================
 * OVERLAY (for modal mode)
 * ========================================================================== */

export const dropdownOverlay = css`
  position: fixed;
  inset: 0;
  background-color: ${COLORS.OVERLAY.DARK};
  z-index: ${Z_INDEX.OVERLAY};
  animation: fadeIn ${ANIMATION.DURATION.NORMAL}ms ${ANIMATION.EASING.STANDARD};
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;