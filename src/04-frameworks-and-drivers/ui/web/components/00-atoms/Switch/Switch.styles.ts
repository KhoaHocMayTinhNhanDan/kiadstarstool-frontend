import { css } from '@emotion/react';
import { COLORS, RADIUS, TRANSITIONS, SPACING, FONT_SIZES } from '../00-core/tokens-constants';
import type { SwitchSize } from './Switch.types';

const sizeMap = {
  sm: { width: 32, height: 16, thumb: 12, translate: 16 },
  md: { width: 44, height: 24, thumb: 20, translate: 20 },
  lg: { width: 56, height: 32, thumb: 28, translate: 24 },
};

/** 🔥 GRID + FLEX SAFE WRAPPER (Giống Input) */
export const switchWrapper = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
  position: relative;
`;

interface SwitchStyleProps {
  size: SwitchSize;
  error?: boolean; // Thêm error vào style props
}

export const getSwitchRootStyles = ({ size, error }: SwitchStyleProps) => css`
  all: unset;
  width: ${sizeMap[size].width}px;
  height: ${sizeMap[size].height}px;
  background-color: ${error ? COLORS.DANGER_LIGHT : COLORS.NEUTRAL};
  border-radius: 9999px;
  position: relative;
  box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  cursor: pointer;
  transition: background-color ${TRANSITIONS.fast};
  border: 2px solid ${error ? COLORS.DANGER : 'transparent'};

  &:focus {
    box-shadow: 0 0 0 2px ${COLORS.NEUTRAL_DARK};
  }

  &[data-state='checked'] {
    background-color: ${error ? COLORS.DANGER : COLORS.PRIMARY};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const getSwitchThumbStyles = (size: SwitchSize) => css`
  display: block;
  width: ${sizeMap[size].thumb}px;
  height: ${sizeMap[size].thumb}px;
  background-color: white;
  border-radius: 9999px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
  transition: transform ${TRANSITIONS.fast};
  transform: translateX(2px);
  will-change: transform;

  &[data-state='checked'] {
    transform: translateX(${sizeMap[size].translate}px);
  }
`;

export const errorTextStyles = css`
  margin-top: ${SPACING.xs};
  font-size: ${FONT_SIZES.xs};
  color: ${COLORS.DANGER};
`;