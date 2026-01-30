import { css } from '@emotion/react';
import { COLORS, SPACING, FONT_SIZES, TRANSITIONS } from '../00-core/tokens-constants';

/** 🔥 GRID + FLEX SAFE WRAPPER (Giống Input) */
export const sliderWrapper = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
  position: relative;
  /* Ensure slider has some height for touch targets */
  min-height: 20px;
  justify-content: center;
`;

export const getSliderRootStyles = (error?: boolean) => css`
  position: relative;
  display: flex;
  align-items: center;
  user-select: none;
  touch-action: none;
  width: 100%;
  height: 20px;
`;

export const getSliderTrackStyles = (error?: boolean) => css`
  background-color: ${error ? COLORS.DANGER_LIGHT : COLORS.NEUTRAL_LIGHT};
  position: relative;
  flex-grow: 1;
  border-radius: 9999px;
  height: 4px;
`;

export const getSliderRangeStyles = (error?: boolean) => css`
  position: absolute;
  background-color: ${error ? COLORS.DANGER : COLORS.PRIMARY};
  border-radius: 9999px;
  height: 100%;
`;

export const sliderThumbStyles = css`
  display: block;
  width: 20px;
  height: 20px;
  background-color: ${COLORS.WHITE};
  box-shadow: 0 2px 10px ${COLORS.NEUTRAL_LIGHT};
  border-radius: 10px;
  border: 1px solid ${COLORS.NEUTRAL_LIGHT};
  transition: transform ${TRANSITIONS.fast}, box-shadow ${TRANSITIONS.fast};

  &:hover {
    background-color: ${COLORS.LIGHT};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${COLORS.PRIMARY_LIGHT};
  }
`;

export const errorTextStyles = css`
  margin-top: ${SPACING.xs};
  font-size: ${FONT_SIZES.xs};
  color: ${COLORS.DANGER};
`;