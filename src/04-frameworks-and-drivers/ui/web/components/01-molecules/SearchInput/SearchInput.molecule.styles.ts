// src/04-frameworks-and-drivers/ui/web/components/01-molecules/SearchInput/SearchInput.molecule.styles.ts
import { css } from '@emotion/react';
import { COLORS, SPACING, TRANSITIONS } from '../../00-atoms/00-core/tokens-constants';

export const container = css`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
`;

export const shortcutHint = css`
  position: absolute;
  right: ${SPACING.md};
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  gap: ${SPACING.xs};
  font-size: 12px;
  color: ${COLORS.TEXT_MUTED};
  pointer-events: none;
  opacity: 0.7;
  transition: opacity ${TRANSITIONS.FAST};

  kbd {
    background: ${COLORS.BACKGROUND_SUBTLE};
    border: 1px solid ${COLORS.NEUTRAL_LIGHT};
    border-radius: 4px;
    padding: 2px 6px;
    font-size: 11px;
    font-family: monospace;
  }
`;

export const clearButton = css`
  position: absolute;
  right: ${SPACING.md};
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: ${SPACING.xs};
  cursor: pointer;
  color: ${COLORS.TEXT_MUTED};
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${TRANSITIONS.FAST};
  opacity: 0.7;

  &:hover {
    color: ${COLORS.TEXT_PRIMARY};
    background: ${COLORS.BACKGROUND_SUBTLE};
    opacity: 1;
  }

  &:focus-visible {
    outline: 2px solid ${COLORS.PRIMARY};
    outline-offset: 2px;
  }
`;

export const loadingSpinner = css`
  position: absolute;
  right: ${SPACING.md};
  top: 50%;
  transform: translateY(-50%);
  color: ${COLORS.PRIMARY};
`;