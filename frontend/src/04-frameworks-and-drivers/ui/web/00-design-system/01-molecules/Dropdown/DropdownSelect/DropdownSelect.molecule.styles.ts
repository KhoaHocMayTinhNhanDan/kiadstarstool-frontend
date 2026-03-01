/* ==========================================================================
 * Dropdown Select Styles
 * --------------------------------------------------------------------------
 * Styles specific to select-style dropdown
 * ========================================================================== */

import { css, keyframes } from '@emotion/react';
import {
  COLORS,
  RADIUS,
  SPACING,
  TYPOGRAPHY,
  TRANSITIONS,
} from '../../../../01-ui-core/constants/tokens-constants';

/* ==========================================================================
 * TRIGGER
 * ========================================================================== */

export const selectTrigger = css`
  all: unset;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: ${SPACING.sm};
  width: 100%;
  height: 36px;
  padding: 0 ${SPACING.md};
  background-color: ${COLORS.BACKGROUND_PAPER};
  border: 1px solid ${COLORS.NEUTRAL_BORDER};
  border-radius: ${RADIUS.md};
  font-size: ${TYPOGRAPHY.FONT_SIZE.sm};
  color: ${COLORS.TEXT_PRIMARY};
  cursor: pointer;
  transition: all ${TRANSITIONS.FAST};
  user-select: none;

  &:hover {
    border-color: ${COLORS.NEUTRAL_DARK};
    background-color: ${COLORS.BACKGROUND_SUBTLE};
  }

  &:focus-visible {
    outline: 2px solid ${COLORS.PRIMARY};
    outline-offset: 2px;
    border-color: ${COLORS.PRIMARY};
  }
`;

export const selectTriggerError = css`
  border-color: ${COLORS.DANGER};
  
  &:hover {
    border-color: ${COLORS.DANGER_DARK};
  }
  
  &:focus-visible {
    outline-color: ${COLORS.DANGER};
    border-color: ${COLORS.DANGER};
  }
`;

export const selectTriggerOpen = css`
  border-color: ${COLORS.PRIMARY};
  background-color: ${COLORS.BACKGROUND_SUBTLE};
`;

export const selectValueContainer = css`
  display: flex;
  align-items: center;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const selectPlaceholder = css`
  color: ${COLORS.TEXT_MUTED};
`;

export const selectClearButton = css`
  all: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: ${RADIUS.sm};
  cursor: pointer;
  color: ${COLORS.TEXT_MUTED};
  transition: all ${TRANSITIONS.FAST};
  
  &:hover {
    background-color: ${COLORS.NEUTRAL_LIGHT};
    color: ${COLORS.TEXT_SECONDARY};
  }
`;

/* ==========================================================================
 * DROPDOWN CONTENT
 * ========================================================================== */

export const selectDropdown = css`
  padding: ${SPACING.xs} 0;
`;

export const selectSearchInput = css`
  display: flex;
  align-items: center;
  gap: ${SPACING.sm};
  padding: ${SPACING.sm} ${SPACING.md};
  border-bottom: 1px solid ${COLORS.NEUTRAL_BORDER};
  margin-bottom: ${SPACING.xs};
`;

/* ==========================================================================
 * OPTIONS
 * ========================================================================== */

export const selectOption = css`
  all: unset;
  display: flex;
  align-items: center;
  height: 36px;
  padding: 0 ${SPACING.md};
  font-size: ${TYPOGRAPHY.FONT_SIZE.sm};
  color: ${COLORS.TEXT_PRIMARY};
  cursor: pointer;
  transition: all ${TRANSITIONS.FAST};
  user-select: none;

  &:hover,
  &[data-highlighted] {
    background-color: ${COLORS.NEUTRAL_HOVER};
  }

  &:active {
    background-color: ${COLORS.NEUTRAL_ACTIVE};
  }
`;

export const selectOptionSelected = css`
  background-color: ${COLORS.PRIMARY_LIGHT}20; /* 20% opacity */
  color: ${COLORS.PRIMARY_DARK};
  font-weight: ${TYPOGRAPHY.FONT_WEIGHT.medium};

  &:hover,
  &[data-highlighted] {
    background-color: ${COLORS.PRIMARY_LIGHT}40;
  }
`;

export const selectOptionDisabled = css`
  color: ${COLORS.TEXT_DISABLED};
  pointer-events: none;
  cursor: not-allowed;
`;

/* ==========================================================================
 * STATES
 * ========================================================================== */

export const selectLoading = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${SPACING.sm};
  padding: ${SPACING.md};
  color: ${COLORS.TEXT_SECONDARY};
  font-size: ${TYPOGRAPHY.FONT_SIZE.sm};
`;

export const selectEmpty = css`
  padding: ${SPACING.md};
  text-align: center;
  color: ${COLORS.TEXT_MUTED};
  font-size: ${TYPOGRAPHY.FONT_SIZE.sm};
`;

export const selectErrorMessage = css`
  padding: ${SPACING.sm} ${SPACING.md};
  margin-top: ${SPACING.xs};
  border-top: 1px solid ${COLORS.NEUTRAL_BORDER};
  color: ${COLORS.DANGER};
  font-size: ${TYPOGRAPHY.FONT_SIZE.xs};
  background-color: ${COLORS.DANGER_LIGHT}20;
  border-radius: 0 0 ${RADIUS.md} ${RADIUS.md};
`;

/* ==========================================================================
 * ANIMATIONS
 * ========================================================================== */

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

export const spinAnimation = (color: string) => css`
  width: 20px;
  height: 20px;
  border: 2px solid ${color};
  border-top-color: transparent;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;