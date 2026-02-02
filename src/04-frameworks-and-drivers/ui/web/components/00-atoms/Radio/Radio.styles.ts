import { css } from '@emotion/react';
import { COLORS, TRANSITIONS, SPACING, FONT_SIZES } from '../00-core/tokens-constants';
import type { RadioSize, RadioProps } from './Radio.types';

const sizeMap = {
  sm: 16,
  md: 20,
  lg: 24,
};

/** 🔥 GRID + FLEX SAFE WRAPPER (Giống Input) */
export const radioWrapper = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
  position: relative;
`;

interface RadioStyleProps {
  size: RadioSize;
  error?: boolean;
}

export const getRadioItemStyles = ({ size, error }: RadioStyleProps) => css`
  all: unset;
  background-color: ${COLORS.WHITE};
  width: ${sizeMap[size]}px;
  height: ${sizeMap[size]}px;
  border-radius: 100%;
  border: 1px solid ${error ? COLORS.DANGER : COLORS.NEUTRAL_LIGHT};
  cursor: pointer;
  transition: all ${TRANSITIONS.fast};

  &:hover {
    border-color: ${COLORS.PRIMARY};
  }

  &[data-state='checked'] {
    border-color: ${COLORS.PRIMARY};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const getRadioIndicatorStyles = () => css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: relative;

  &::after {
    content: '';
    display: block;
    width: 50%;
    height: 50%;
    border-radius: 50%;
    background-color: ${COLORS.PRIMARY};
  }
`;

export const getRadioGroupStyles = () => css`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const errorTextStyles = css`
  margin-top: ${SPACING.xs};
  font-size: ${FONT_SIZES.xs};
  color: ${COLORS.DANGER};
`;