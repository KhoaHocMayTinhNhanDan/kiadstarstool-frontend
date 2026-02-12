/* ==========================================================================
 * Dropdown Menu Styles
 * --------------------------------------------------------------------------
 * Styles specific to menu-style dropdown (items, groups, separators)
 * ========================================================================== */

import { css } from '@emotion/react';
import {
  COLORS,
  RADIUS,
  SPACING,
  TYPOGRAPHY,
  TRANSITIONS,
} from '../../../00-atoms/00-core/tokens-constants';

/* ==========================================================================
 * ITEM
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
    color: ${COLORS.TEXT_PRIMARY};
  }

  &:active {
    background-color: ${COLORS.NEUTRAL_ACTIVE};
  }

  &[data-disabled] {
    color: ${COLORS.TEXT_DISABLED};
    pointer-events: none;
    cursor: not-allowed;
  }

  /* Checkmark for selected items */
  &[data-state='checked']::after {
    content: '✓';
    position: absolute;
    right: ${SPACING.md};
    font-size: ${TYPOGRAPHY.FONT_SIZE.sm};
    color: ${COLORS.PRIMARY};
    font-weight: ${TYPOGRAPHY.FONT_WEIGHT.medium};
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

export const dropdownItemSuccess = css`
  color: ${COLORS.SUCCESS};

  &:hover,
  &[data-highlighted] {
    background-color: ${COLORS.SUCCESS_LIGHT};
    color: ${COLORS.SUCCESS_DARK};
  }
`;

/* ==========================================================================
 * GROUP
 * ========================================================================== */

export const dropdownGroup = css`
  &:not(:first-of-type) {
    margin-top: ${SPACING.xs};
    padding-top: ${SPACING.xs};
    border-top: 1px solid ${COLORS.NEUTRAL_BORDER};
  }
`;

export const dropdownGroupLabel = css`
  padding: ${SPACING.xs} ${SPACING.md} ${SPACING.xxs};
  font-size: ${TYPOGRAPHY.FONT_SIZE.xs};
  color: ${COLORS.TEXT_SECONDARY};
  font-weight: ${TYPOGRAPHY.FONT_WEIGHT.medium};
  text-transform: uppercase;
  letter-spacing: ${TYPOGRAPHY.LETTER_SPACING.WIDE};
  user-select: none;
`;

/* ==========================================================================
 * SEPARATOR
 * ========================================================================== */

export const dropdownSeparator = css`
  height: 1px;
  background-color: ${COLORS.NEUTRAL_BORDER};
  margin: ${SPACING.xs} 0;
`;

/* ==========================================================================
 * ICON CONTAINER
 * ========================================================================== */

export const dropdownIconContainer = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  opacity: 0.8;

  [data-disabled] & {
    opacity: 0.4;
  }
`;

/* ==========================================================================
 * SHORTCUT
 * ========================================================================== */

export const dropdownShortcut = css`
  margin-left: auto;
  padding-left: ${SPACING.md};
  font-size: ${TYPOGRAPHY.FONT_SIZE.xs};
  color: ${COLORS.TEXT_MUTED};
  letter-spacing: ${TYPOGRAPHY.LETTER_SPACING.NORMAL};
  opacity: 0.7;
`;