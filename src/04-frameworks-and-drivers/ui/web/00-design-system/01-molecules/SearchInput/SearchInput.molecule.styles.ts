// src/04-frameworks-and-drivers/ui/web/components/01-molecules/SearchInput/SearchInput.molecule.styles.ts
import { css } from '@emotion/react';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY, TRANSITIONS } from '../../00-atoms/00-core/tokens-constants';

export const container = css`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

export const iconWrapper = css`
  position: absolute;
  left: ${SPACING.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${COLORS.TEXT_MUTED || '#718096'};
  pointer-events: none;
  z-index: 1;
`;

export const input = (size: 'sm' | 'md' | 'lg', hasRightElement: boolean) => css`
  width: 100%;
  background-color: ${COLORS.BACKGROUND_PAPER || '#ffffff'};
  border: 1px solid ${COLORS.NEUTRAL_BORDER || '#e2e8f0'};
  border-radius: ${RADIUS.md};
  color: ${COLORS.TEXT_PRIMARY || '#1a202c'};
  transition: all ${TRANSITIONS.FAST || '0.2s'};
  outline: none;

  /* Size variants */
  ${size === 'sm' && css`
    height: 32px;
    font-size: ${TYPOGRAPHY.FONT_SIZE?.xs || '12px'};
    padding-left: 32px;
    padding-right: ${hasRightElement ? '32px' : SPACING.sm};
  `}
  
  ${size === 'md' && css`
    height: 40px;
    font-size: ${TYPOGRAPHY.FONT_SIZE?.sm || '14px'};
    padding-left: 36px;
    padding-right: ${hasRightElement ? '36px' : SPACING.md};
  `}

  ${size === 'lg' && css`
    height: 48px;
    font-size: ${TYPOGRAPHY.FONT_SIZE?.md || '16px'};
    padding-left: 44px;
    padding-right: ${hasRightElement ? '44px' : SPACING.lg};
  `}

  &:hover:not(:disabled) {
    border-color: ${COLORS.NEUTRAL_DARK || '#a0aec0'};
  }

  &:focus:not(:disabled) {
    border-color: ${COLORS.PRIMARY || '#3182ce'};
    box-shadow: 0 0 0 2px ${COLORS.PRIMARY_LIGHT || '#bee3f8'};
  }

  &:disabled {
    background-color: ${COLORS.BACKGROUND_NEUTRAL || '#f7fafc'};
    color: ${COLORS.TEXT_DISABLED || '#a0aec0'};
    cursor: not-allowed;
  }
`;

export const clearButton = css`
  position: absolute;
  right: ${SPACING.xs};
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${COLORS.TEXT_MUTED || '#718096'};
  padding: 4px;
  border-radius: 50%;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${COLORS.NEUTRAL_LIGHT || '#edf2f7'};
    color: ${COLORS.TEXT_PRIMARY || '#1a202c'};
  }
  
  &:focus-visible {
    outline: 2px solid ${COLORS.PRIMARY || '#3182ce'};
  }
`;