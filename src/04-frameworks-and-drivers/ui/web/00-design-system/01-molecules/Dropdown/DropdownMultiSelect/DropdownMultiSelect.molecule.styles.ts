// src/04-frameworks-and-drivers/ui/web/components/01-molecules/Dropdown/Dropdown.molecule.styles.ts
import { css, keyframes } from '@emotion/react';
import {
  COLORS,
  RADIUS,
  SHADOWS,
  SPACING,
  TRANSITIONS,
  TYPOGRAPHY,
  ANIMATION,
  Z_INDEX, // ✅ Thêm import này
} from '../../../00-atoms/00-core/tokens-constants';

/* ==========================================================================
 * ANIMATIONS - Dùng animation constants
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
 * CONTENT - Dùng tokens hiện có
 * ========================================================================== */

export const dropdownContent = css`
  min-width: 220px;
  max-width: 320px;
  background-color: ${COLORS.BACKGROUND_PAPER};
  border-radius: ${RADIUS.md};
  padding: ${SPACING.xs} 0;
  box-shadow: ${SHADOWS.lg};
  border: 1px solid ${COLORS.NEUTRAL_BORDER};
  z-index: ${Z_INDEX.dropdown}; // ✅ Đã có Z_INDEX
  overflow: hidden;

  animation-duration: ${ANIMATION.DURATION.FAST};
  animation-timing-function: ${ANIMATION.TIMING.CUBIC_BEZIER};
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
`;

/* ==========================================================================
 * ITEM - Dùng tokens hiện có
 * ========================================================================== */

export const dropdownItem = css`
  all: unset;
  display: flex;
  align-items: center;
  gap: ${SPACING.sm};
  height: 36px;
  padding: 0 ${SPACING.md};
  font-size: ${TYPOGRAPHY.FONT_SIZE.sm};
  line-height: ${TYPOGRAPHY.LINE_HEIGHT.NORMAL};
  color: ${COLORS.TEXT_PRIMARY};
  cursor: pointer;
  user-select: none;
  position: relative;
  transition: all ${TRANSITIONS.FAST};

  &:hover,
  &[data-highlighted] {
    background-color: ${COLORS.NEUTRAL_HOVER};
  }

  &:active {
    background-color: ${COLORS.NEUTRAL_ACTIVE};
  }

  &[data-disabled] {
    color: ${COLORS.TEXT_DISABLED};
    pointer-events: none;
    cursor: not-allowed;
  }

  &[data-state='checked']::after {
    content: '✓';
    position: absolute;
    right: ${SPACING.md};
    font-size: ${TYPOGRAPHY.FONT_SIZE.sm};
    color: ${COLORS.PRIMARY};
  }
`;

export const dropdownItemDanger = css`
  color: ${COLORS.ERROR};

  &:hover,
  &[data-highlighted] {
    background-color: ${COLORS.ERROR_LIGHT};
    color: ${COLORS.ERROR_DARK};
  }

  &:active {
    background-color: ${COLORS.ERROR_DARK};
    color: ${COLORS.WHITE};
  }
`;

/* ==========================================================================
 * GROUP - Dùng tokens hiện có
 * ========================================================================== */

export const dropdownGroup = css`
  &:not(:first-of-type) {
    margin-top: ${SPACING.xs};
  }
`;

export const dropdownGroupLabel = css`
  padding: ${SPACING.xs} ${SPACING.md};
  font-size: ${TYPOGRAPHY.FONT_SIZE.xs};
  color: ${COLORS.TEXT_SECONDARY};
  font-weight: ${TYPOGRAPHY.FONT_WEIGHT.medium};
  text-transform: uppercase;
  letter-spacing: ${TYPOGRAPHY.LETTER_SPACING.WIDE};
  user-select: none;
`;

/* ==========================================================================
 * SEPARATOR - Dùng tokens hiện có
 * ========================================================================== */

export const dropdownSeparator = css`
  height: 1px;
  background-color: ${COLORS.NEUTRAL_BORDER};
  margin: ${SPACING.xs} 0;
`;

/* ==========================================================================
 * SCROLL AREA - Dùng tokens hiện có
 * ========================================================================== */

export const dropdownScrollArea = css`
  max-height: 300px;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${COLORS.BACKGROUND_NEUTRAL};
    border-radius: ${RADIUS.sm};
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${COLORS.NEUTRAL_BORDER};
    border-radius: ${RADIUS.sm};
    
    &:hover {
      background: ${COLORS.NEUTRAL_DARK};
    }
  }
`;

/* ==========================================================================
 * TRIGGER - Dùng tokens hiện có
 * ========================================================================== */

export const dropdownTrigger = css`
  all: unset;
  cursor: pointer;
  
  &:focus-visible {
    outline: 2px solid ${COLORS.PRIMARY};
    outline-offset: 2px;
    border-radius: ${RADIUS.sm};
  }
  
  &[data-state='open'] {
    background-color: ${COLORS.NEUTRAL_HOVER};
  }
`;