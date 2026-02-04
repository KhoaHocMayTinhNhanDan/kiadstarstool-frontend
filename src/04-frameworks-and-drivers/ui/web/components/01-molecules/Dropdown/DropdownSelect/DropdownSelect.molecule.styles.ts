/* ==========================================================================
 * Dropdown Select Styles
 * --------------------------------------------------------------------------
 * Styles specific to select-style dropdown
 * ========================================================================== */

import { css } from '@emotion/react';
import {
  COLORS,
  RADIUS,
  SPACING,
  TYPOGRAPHY,
  TRANSITION,
  BORDER,
} from '../../00-atoms/00-core/tokens-constants';

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
  background-color: ${COLORS.BACKGROUND.DEFAULT};
  border: ${BORDER.DEFAULT};
  border-radius: ${RADIUS.md};
  font-size: ${TYPOGRAPHY.fontSize.sm};
  color: ${COLORS.TEXT.PRIMARY};
  cursor: pointer;
  transition: all ${TRANSITION.DEFAULT};
  user-select: none;

  &:hover {
    border-color: ${COLORS.BORDER.STRONG};
    background-color: ${COLORS.BACKGROUND.SUBTLE};
  }

  &:focus-visible {
    outline: 2px solid ${COLORS.PRIMARY[500]};
    outline-offset: 2px;
    border-color: ${COLORS.PRIMARY[500]};
  }
`;

export const selectTriggerError = css`
  border-color: ${COLORS.ERROR[500]};
  
  &:hover {
    border-color: ${COLORS.ERROR[600]};
  }
  
  &:focus-visible {
    outline-color: ${COLORS.ERROR[500]};
    border-color: ${COLORS.ERROR[500]};
  }
`;

export const selectTriggerOpen = css`
  border-color: ${COLORS.PRIMARY[500]};
  background-color: ${COLORS.BACKGROUND.SUBTLE};
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
  color: ${COLORS.TEXT.TERTIARY};
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
  color: ${COLORS.TEXT.TERTIARY};
  transition: all ${TRANSITION.FAST};
  
  &:hover {
    background-color: ${COLORS.NEUTRAL[100]};
    color: ${COLORS.TEXT.SECONDARY};
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
  border-bottom: 1px solid ${COLORS.BORDER.LIGHT};
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
  font-size: ${TYPOGRAPHY.fontSize.sm};
  color: ${COLORS.TEXT.PRIMARY};
  cursor: pointer;
  transition: all ${TRANSITION.COLOR};
  user-select: none;

  &:hover,
  &[data-highlighted] {
    background-color: ${COLORS.NEUTRAL[50]};
  }

  &:active {
    background-color: ${COLORS.NEUTRAL[100]};
  }
`;

export const selectOptionSelected = css`
  background-color: ${COLORS.PRIMARY[50]};
  color: ${COLORS.PRIMARY[700]};
  font-weight: ${TYPOGRAPHY.fontWeight.medium};

  &:hover,
  &[data-highlighted] {
    background-color: ${COLORS.PRIMARY[100]};
  }
`;

export const selectOptionDisabled = css`
  color: ${COLORS.TEXT.DISABLED};
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
  color: ${COLORS.TEXT.SECONDARY};
  font-size: ${TYPOGRAPHY.fontSize.sm};
`;

export const selectEmpty = css`
  padding: ${SPACING.md};
  text-align: center;
  color: ${COLORS.TEXT.TERTIARY};
  font-size: ${TYPOGRAPHY.fontSize.sm};
`;

export const selectErrorMessage = css`
  padding: ${SPACING.sm} ${SPACING.md};
  margin-top: ${SPACING.xs};
  border-top: 1px solid ${COLORS.BORDER.LIGHT};
  color: ${COLORS.ERROR[500]};
  font-size: ${TYPOGRAPHY.fontSize.xs};
  background-color: ${COLORS.ERROR[50]};
  border-radius: 0 0 ${RADIUS.md} ${RADIUS.md};
`;