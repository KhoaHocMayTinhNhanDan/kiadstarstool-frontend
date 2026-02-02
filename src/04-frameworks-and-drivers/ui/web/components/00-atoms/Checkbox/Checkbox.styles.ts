import { css } from '@emotion/react';
import { COLORS, RADIUS, TRANSITIONS, SPACING, FONT_SIZES } from '../00-core/tokens-constants';
import type { CheckboxSize, CheckboxProps } from './Checkbox.types';

const sizeMap = {
  sm: 16,
  md: 20,
  lg: 24,
};

/** 🔥 GRID + FLEX SAFE WRAPPER (Giống Input) */
export const checkboxWrapper = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
  position: relative;
`;

interface CheckboxStyleProps {
  size: CheckboxSize;
  error?: boolean;
}

export const getCheckboxStyles = ({ size, error }: CheckboxStyleProps) => css`
  all: unset;
  background-color: ${COLORS.WHITE};
  width: ${sizeMap[size]}px;
  height: ${sizeMap[size]}px;
  border-radius: ${RADIUS.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${error ? COLORS.DANGER : COLORS.NEUTRAL_LIGHT};
  transition: all ${TRANSITIONS.fast};
  cursor: pointer;

  &:hover {
    border-color: ${COLORS.PRIMARY};
  }

  &[data-state='checked'] {
    background-color: ${COLORS.PRIMARY};
    border-color: ${COLORS.PRIMARY};
  }

  &:disabled {
    background-color: ${COLORS.NEUTRAL_LIGHT};
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const getIndicatorStyles = () => css`
  color: ${COLORS.WHITE};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const errorTextStyles = css`
  margin-top: ${SPACING.xs};
  font-size: ${FONT_SIZES.xs};
  color: ${COLORS.DANGER};
`;