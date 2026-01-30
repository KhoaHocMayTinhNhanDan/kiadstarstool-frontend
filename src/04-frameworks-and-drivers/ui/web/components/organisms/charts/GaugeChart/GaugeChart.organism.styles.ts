import { css } from '@emotion/react';
import { COLORS } from '../../../atoms/00-core/tokens-constants';

export const container = css`
  position: relative;
  width: 100%;
`;

export const chartWrapper = css`
  position: relative;
  width: 100%;
  overflow: visible;
`;

export const valueLabel = (offset: number) => css`
  position: absolute;
  bottom: ${offset}px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
`;

export const minLabel = css`
  position: absolute;
  bottom: 18%;
  left: 10%;
`;

export const maxLabel = css`
  position: absolute;
  bottom: 18%;
  right: 10%;
`;

export const needle = (
  rotation: number,
  color: string = COLORS.NEUTRAL_DARK,
  topPosition: string,
  length: string,
  width: number,
  knobSize: number
) => css`
  position: absolute;
  left: 50%;
  top: ${topPosition};
  width: ${width}px;
  height: ${length};
  background-color: ${color};
  border-radius: ${width}px ${width}px 0 0;
  transform-origin: bottom center;
  transform: translateX(-50%) translateY(-100%) rotate(${rotation}deg);
  transition: transform 0.85s cubic-bezier(0.34, 1.56, 0.64, 1);
  z-index: 10;

  &::after {
    content: '';
    position: absolute;
    bottom: -${knobSize / 2}px;
    left: 50%;
    transform: translateX(-50%);
    width: ${knobSize}px;
    height: ${knobSize}px;
    background-color: ${color};
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
  }
`;
