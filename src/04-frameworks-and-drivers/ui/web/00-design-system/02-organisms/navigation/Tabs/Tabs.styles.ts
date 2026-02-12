// src/04-frameworks-and-drivers/ui/web/components/02-organisms/navigation/Tabs/Tabs.styles.ts
import { css } from '@emotion/react';
import {
  COLORS,
  SPACING,
  TYPOGRAPHY,
  TRANSITIONS,
  RADIUS
} from '../../../00-atoms/00-core/tokens-constants';
import type { TabsVariant, TabsOrientation, TabsSize } from './Tabs.types';

export const root = (orientation: TabsOrientation) => css`
  display: flex;
  flex-direction: ${orientation === 'vertical' ? 'row' : 'column'};
  width: 100%;
  gap: ${orientation === 'vertical' ? SPACING.lg : SPACING.md};
`;

export const tabList = (
  variant: TabsVariant,
  orientation: TabsOrientation,
  fullWidth: boolean
) => css`
  display: flex;
  flex-direction: ${orientation === 'vertical' ? 'column' : 'row'};
  position: relative;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
  
  &::-webkit-scrollbar {
    display: none; /* Chrome/Safari */
  }

  ${orientation === 'horizontal' && css`
    border-bottom: ${variant === 'line' ? `1px solid ${COLORS.NEUTRAL_BORDER}` : 'none'};
    width: 100%;
  `}

  ${orientation === 'vertical' && css`
    border-right: ${variant === 'line' ? `1px solid ${COLORS.NEUTRAL_BORDER}` : 'none'};
    min-width: 200px;
  `}

  ${variant === 'pills' && css`
    gap: ${SPACING.sm};
  `}

  ${variant === 'enclosed' && orientation === 'horizontal' && css`
    gap: 2px;
    padding-top: 2px; /* Space for active border top if needed */
  `}
`;

const getSizeStyles = (size: TabsSize) => {
  switch (size) {
    case 'sm':
      return css`
        padding: ${SPACING.xs} ${SPACING.sm};
        font-size: ${TYPOGRAPHY.FONT_SIZE.xs};
      `;
    case 'lg':
      return css`
        padding: ${SPACING.md} ${SPACING.lg};
        font-size: ${TYPOGRAPHY.FONT_SIZE.md};
      `;
    case 'md':
    default:
      return css`
        padding: ${SPACING.sm} ${SPACING.md};
        font-size: ${TYPOGRAPHY.FONT_SIZE.sm};
      `;
  }
};

export const tabTrigger = (
  variant: TabsVariant,
  orientation: TabsOrientation,
  size: TabsSize,
  isActive: boolean,
  disabled: boolean,
  fullWidth: boolean
) => css`
  all: unset;
  display: flex;
  align-items: center;
  justify-content: ${orientation === 'vertical' ? 'flex-start' : 'center'};
  gap: ${SPACING.sm};
  cursor: ${disabled ? 'not-allowed' : 'pointer'};
  white-space: nowrap;
  transition: all ${TRANSITIONS.FAST};
  font-weight: ${isActive ? TYPOGRAPHY.FONT_WEIGHT.bold : TYPOGRAPHY.FONT_WEIGHT.medium};
  color: ${isActive ? COLORS.PRIMARY : COLORS.TEXT_SECONDARY};
  opacity: ${disabled ? 0.5 : 1};
  position: relative;
  flex: ${fullWidth && orientation === 'horizontal' ? 1 : 'none'};

  ${getSizeStyles(size)}

  /* --- Variant: Line --- */
  ${variant === 'line' && css`
    border-bottom: 2px solid transparent;
    margin-bottom: -1px; /* Overlap border-bottom of list */
    
    ${orientation === 'vertical' && css`
      border-bottom: none;
      border-right: 2px solid transparent;
      margin-bottom: 0;
      margin-right: -1px;
      width: 100%;
    `}

    ${isActive && css`
      color: ${COLORS.PRIMARY};
      border-color: ${COLORS.PRIMARY};
    `}

    ${!isActive && !disabled && css`
      &:hover {
        color: ${COLORS.TEXT_PRIMARY};
        border-color: ${COLORS.NEUTRAL_BORDER};
      }
    `}
  `}

  /* --- Variant: Pills --- */
  ${variant === 'pills' && css`
    border-radius: ${RADIUS.md};

    ${isActive && css`
      background-color: ${COLORS.PRIMARY};
      color: ${COLORS.WHITE};
    `}

    ${!isActive && !disabled && css`
      &:hover {
        background-color: ${COLORS.NEUTRAL_HOVER};
        color: ${COLORS.TEXT_PRIMARY};
      }
    `}
  `}

  /* --- Variant: Enclosed --- */
  ${variant === 'enclosed' && css`
    border: 1px solid transparent;
    border-bottom: none;
    border-radius: ${RADIUS.md} ${RADIUS.md} 0 0;
    background-color: transparent;

    ${orientation === 'vertical' && css`
      border-radius: ${RADIUS.md} 0 0 ${RADIUS.md};
      border-bottom: 1px solid transparent;
      border-right: none;
    `}

    ${isActive && css`
      background-color: ${COLORS.BACKGROUND_PAPER};
      border-color: ${COLORS.NEUTRAL_BORDER};
      color: ${COLORS.PRIMARY};
      /* Hack to cover the list border */
      ${orientation === 'horizontal' ? css`
        border-bottom: 1px solid ${COLORS.BACKGROUND_PAPER};
        margin-bottom: -1px;
      ` : css`
        border-right: 1px solid ${COLORS.BACKGROUND_PAPER};
        margin-right: -1px;
      `}
    `}

    ${!isActive && !disabled && css`
      &:hover {
        background-color: ${COLORS.NEUTRAL_HOVER};
      }
    `}
  `}

  &:focus-visible {
    outline: 2px solid ${COLORS.PRIMARY};
    outline-offset: -2px;
    border-radius: ${RADIUS.sm};
  }
`;

export const tabContent = css`
  flex: 1;
  min-width: 0; /* Prevent flex child overflow */
  animation: fadeIn 0.2s ease-in-out;
`;