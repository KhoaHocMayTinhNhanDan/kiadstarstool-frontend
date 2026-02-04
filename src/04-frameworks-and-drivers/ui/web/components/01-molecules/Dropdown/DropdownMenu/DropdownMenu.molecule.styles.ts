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
  TRANSITION,
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
  font-size: ${TYPOGRAPHY.fontSize.sm};
  line-height: ${TYPOGRAPHY.lineHeight.normal};
  color: ${COLORS.TEXT.PRIMARY};
  cursor: pointer;
  user-select: none;
  position: relative;
  transition: all ${TRANSITION.COLOR};

  &:hover,
  &[data-highlighted] {
    background-color: ${COLORS.NEUTRAL[50]};
    color: ${COLORS.TEXT.PRIMARY};
  }

  &:active {
    background-color: ${COLORS.NEUTRAL[100]};
  }

  &[data-disabled] {
    color: ${COLORS.TEXT.DISABLED};
    pointer-events: none;
    cursor: not-allowed;
  }

  /* Checkmark for selected items */
  &[data-state='checked']::after {
    content: '✓';
    position: absolute;
    right: ${SPACING.md};
    font-size: ${TYPOGRAPHY.fontSize.sm};
    color: ${COLORS.PRIMARY[500]};
    font-weight: ${TYPOGRAPHY.fontWeight.medium};
  }
`;

export const dropdownItemDanger = css`
  color: ${COLORS.ERROR[500]};

  &:hover,
  &[data-highlighted] {
    background-color: ${COLORS.ERROR[50]};
    color: ${COLORS.ERROR[600]};
  }

  &:active {
    background-color: ${COLORS.ERROR[100]};
  }
`;

export const dropdownItemSuccess = css`
  color: ${COLORS.SUCCESS[500]};

  &:hover,
  &[data-highlighted] {
    background-color: ${COLORS.SUCCESS[50]};
    color: ${COLORS.SUCCESS[600]};
  }
`;

/* ==========================================================================
 * GROUP
 * ========================================================================== */

export const dropdownGroup = css`
  &:not(:first-of-type) {
    margin-top: ${SPACING.xs};
    padding-top: ${SPACING.xs};
    border-top: 1px solid ${COLORS.BORDER.LIGHT};
  }
`;

export const dropdownGroupLabel = css`
  padding: ${SPACING.xs} ${SPACING.md} ${SPACING['0.5']};
  font-size: ${TYPOGRAPHY.fontSize.xs};
  color: ${COLORS.TEXT.SECONDARY};
  font-weight: ${TYPOGRAPHY.fontWeight.medium};
  text-transform: uppercase;
  letter-spacing: ${TYPOGRAPHY.letterSpacing.wide};
  user-select: none;
`;

/* ==========================================================================
 * SEPARATOR
 * ========================================================================== */

export const dropdownSeparator = css`
  height: 1px;
  background-color: ${COLORS.BORDER.LIGHT};
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
  font-size: ${TYPOGRAPHY.fontSize.xs};
  color: ${COLORS.TEXT.TERTIARY};
  letter-spacing: ${TYPOGRAPHY.letterSpacing.normal};
  opacity: 0.7;
`;