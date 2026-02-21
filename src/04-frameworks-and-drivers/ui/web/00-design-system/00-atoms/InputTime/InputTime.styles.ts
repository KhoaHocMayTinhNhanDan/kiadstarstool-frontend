// d:\DEV\learning\kiadstarstool-frontend\src\04-frameworks-and-drivers\ui\web\00-design-system\00-atoms\InputTime\InputTime.styles.ts
import { css } from '@emotion/react';
import {
  COLORS,
  SPACING,
  RADIUS,
  FONT_SIZES,
  TRANSITIONS,
} from '../00-core/tokens-constants';
import type { InputTimeSize } from './InputTime.types';

const heightMap: Record<InputTimeSize, string> = {
  sm: '32px',
  md: '40px',
  lg: '48px',
};

const fontSizeMap: Record<InputTimeSize, string> = {
  sm: '0.875rem', // 14px
  md: '1rem',     // 16px
  lg: '1.125rem', // 18px
};

export const wrapper = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
`;

export const labelText = css`
  font-size: ${FONT_SIZES.sm};
  font-weight: 500;
  color: ${COLORS.TEXT_PRIMARY};
  margin-bottom: ${SPACING.xs};
`;

export const container = css`
  display: flex;
  align-items: center;
  gap: 2px;
`;

export function selectStyles({
  size,
  error,
  disabled,
}: {
  size: InputTimeSize;
  error?: boolean;
  disabled?: boolean;
}) {
  return css`
    appearance: none;
    box-sizing: border-box;
    height: ${heightMap[size]};
    padding: 0 ${SPACING.sm};
    font-size: ${fontSizeMap[size]};
    color: ${COLORS.TEXT_PRIMARY};
    background-color: ${COLORS.WHITE};
    border: 1px solid ${error ? COLORS.DANGER : COLORS.NEUTRAL_LIGHT};
    border-radius: ${RADIUS.md};
    outline: none;
    transition: all ${TRANSITIONS.FAST};
    cursor: pointer;
    text-align: center;
    min-width: 60px;

    &:hover:not(:disabled) {
      border-color: ${error ? COLORS.DANGER_DARK : COLORS.PRIMARY_LIGHT};
    }

    &:focus:not(:disabled) {
      border-color: ${error ? COLORS.DANGER : COLORS.PRIMARY};
      box-shadow: 0 0 0 2px ${error ? COLORS.DANGER_LIGHT : COLORS.PRIMARY_LIGHT};
    }

    &:disabled {
      background-color: ${COLORS.LIGHT};
      color: ${COLORS.SECONDARY};
      cursor: not-allowed;
      border-color: ${COLORS.NEUTRAL_LIGHT};
    }
  `;
}

export const separator = (disabled?: boolean) => css`
  font-weight: bold;
  color: ${disabled ? COLORS.SECONDARY : COLORS.PRIMARY};
  margin: 0 2px;
`;

export const errorText = css`
  margin-top: ${SPACING.xs};
  font-size: ${FONT_SIZES.xs};
  color: ${COLORS.DANGER};
`;
