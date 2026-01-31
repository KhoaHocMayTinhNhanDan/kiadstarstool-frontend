// src/04-frameworks-and-drivers/ui/web/components/atoms/Input/Input.styles.ts
import { css } from '@emotion/react';
import {
  COLORS,
  SPACING,
  RADIUS,
  FONT_SIZES,
  TRANSITIONS,
} from '../00-core/tokens-constants';
import type { InputSize } from './Input.types';

const heightMap: Record<InputSize, string> = {
  sm: '32px',
  md: '40px',
  lg: '48px',
};

const fontSizeMap: Record<InputSize, string> = {
  sm: '0.875rem',  // 14px
  md: '1rem',      // 16px
  lg: '1.125rem',  // 18px
};

export function inputStyles({
  size,
  error,
  disabled,
  readOnly,
  hasLeftIcon,
  hasRightIcon,
}: {
  size: InputSize;
  error?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  hasLeftIcon?: boolean;
  hasRightIcon?: boolean;
}) {
  return css`
    width: 100%;
    min-width: 0;
    box-sizing: border-box;

    height: ${heightMap[size]};
    padding-left: ${hasLeftIcon ? '36px' : SPACING.md};
    padding-right: ${hasRightIcon ? '36px' : SPACING.md};

    font-size: ${fontSizeMap[size]};
    color: ${COLORS.TEXT};
    background-color: ${COLORS.WHITE};

    border: 1px solid
      ${error ? COLORS.DANGER : COLORS.NEUTRAL_LIGHT};
    border-radius: ${RADIUS.md};

    outline: none;
    transition: all ${TRANSITIONS.fast};

    &::placeholder {
      color: ${COLORS.SECONDARY};
    }

    &:hover:not(:disabled):not(:read-only) {
      border-color: ${error
        ? COLORS.DANGER_DARK
        : COLORS.PRIMARY_LIGHT};
    }

    &:focus:not(:disabled):not(:read-only) {
      border-color: ${error ? COLORS.DANGER : COLORS.PRIMARY};
      box-shadow: 0 0 0 2px
        ${error ? COLORS.DANGER_LIGHT : COLORS.PRIMARY_LIGHT};
    }

    &:disabled {
      background-color: ${COLORS.LIGHT};
      color: ${COLORS.SECONDARY};
      cursor: not-allowed;
    }

    &:read-only {
      background-color: ${COLORS.NEUTRAL_LIGHT};
      cursor: default;
    }
  `;
}

export const errorText = css`
  margin-top: ${SPACING.xs};
  font-size: ${FONT_SIZES.xs};
  color: ${COLORS.DANGER};
`;

/** 🔥 GRID + FLEX SAFE WRAPPER */
export const inputWrapper = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
  position: relative;
`;

export const iconWrapper = (position: 'left' | 'right') => css`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${position}: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${COLORS.SECONDARY};
  pointer-events: none;
  z-index: 1;

  svg {
    width: 16px;
    height: 16px;
  }
`;
