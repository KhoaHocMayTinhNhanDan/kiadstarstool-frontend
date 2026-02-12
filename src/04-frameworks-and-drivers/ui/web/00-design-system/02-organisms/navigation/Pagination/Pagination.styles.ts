// src/04-frameworks-and-drivers/ui/web/components/02-organisms/navigation/Pagination/Pagination.styles.ts
import { css } from '@emotion/react';
import {
  COLORS,
  SPACING,
  TYPOGRAPHY,
  TRANSITIONS,
  RADIUS
} from '../../../00-atoms/00-core/tokens-constants';

export const nav = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const list = css`
  display: flex;
  align-items: center;
  gap: ${SPACING.xs};
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const item = css`
  display: flex;
`;

export const button = (isActive: boolean, disabled: boolean) => css`
  all: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  height: 32px;
  padding: 0 6px;
  border-radius: ${RADIUS.md};
  font-size: ${TYPOGRAPHY.FONT_SIZE.sm};
  font-weight: ${isActive ? TYPOGRAPHY.FONT_WEIGHT.bold : TYPOGRAPHY.FONT_WEIGHT.normal};
  cursor: ${disabled ? 'not-allowed' : 'pointer'};
  transition: all ${TRANSITIONS.FAST};
  user-select: none;
  
  /* Default State */
  color: ${COLORS.TEXT_PRIMARY};
  background-color: transparent;
  border: 1px solid transparent;

  /* Active State */
  ${isActive && css`
    background-color: ${COLORS.PRIMARY};
    color: ${COLORS.WHITE};
    border-color: ${COLORS.PRIMARY};
    
    &:hover {
      background-color: ${COLORS.PRIMARY_DARK};
    }
  `}

  /* Hover State (Not Active & Not Disabled) */
  ${!isActive && !disabled && css`
    &:hover {
      background-color: ${COLORS.NEUTRAL_HOVER};
      border-color: ${COLORS.NEUTRAL_BORDER};
    }
    
    &:focus-visible {
      outline: 2px solid ${COLORS.PRIMARY};
      outline-offset: 2px;
    }
  `}

  /* Disabled State */
  ${disabled && css`
    opacity: 0.5;
    color: ${COLORS.TEXT_DISABLED};
  `}
`;

export const dots = css`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${COLORS.TEXT_MUTED};
  min-width: 32px;
`;