import { css } from '@emotion/react';
import { COLORS, RADIUS, SPACING, TRANSITIONS } from '../00-core/tokens-constants';
import { type InputSize } from './Input';

const SIZES = {
  sm: { height: '32px', padding: '0 12px', fontSize: '14px' },
  md: { height: '40px', padding: '0 16px', fontSize: '16px' },
  lg: { height: '48px', padding: '0 20px', fontSize: '18px' },
};

export const getInputWrapperStyles = (fullWidth: boolean) => css`
  position: relative;
  display: inline-flex;
  align-items: center;
  width: ${fullWidth ? '100%' : 'auto'};
`;

export const getInputStyles = (size: InputSize, hasLeftIcon: boolean, hasRightIcon: boolean, error: boolean) => {
  const sizeConfig = SIZES[size];
  
  return css`
    width: 100%;
    height: ${sizeConfig.height};
    padding: ${sizeConfig.padding};
    padding-left: ${hasLeftIcon ? `calc(${sizeConfig.height} + 4px)` : sizeConfig.padding};
    padding-right: ${hasRightIcon ? `calc(${sizeConfig.height} + 4px)` : sizeConfig.padding};
    
    font-family: inherit;
    font-size: ${sizeConfig.fontSize};
    color: ${COLORS.TEXT};
    background-color: ${COLORS.WHITE};
    
    border: 1px solid ${error ? COLORS.DANGER : COLORS.NEUTRAL_RING};
    border-radius: ${RADIUS.md};
    
    outline: none;
    transition: all ${TRANSITIONS.fast};

    &::placeholder {
      color: ${COLORS.SECONDARY};
      opacity: 0.7;
    }

    &:hover:not(:disabled) {
      border-color: ${error ? COLORS.DANGER : COLORS.PRIMARY};
    }

    &:focus:not(:disabled) {
      border-color: ${error ? COLORS.DANGER : COLORS.PRIMARY};
      box-shadow: 0 0 0 3px ${error ? COLORS.DANGER_LIGHT : COLORS.PRIMARY_LIGHT};
    }

    &:disabled {
      background-color: ${COLORS.NEUTRAL_LIGHT};
      color: ${COLORS.SECONDARY};
      cursor: not-allowed;
      border-color: ${COLORS.NEUTRAL_RING};
    }
  `;
};

export const getIconStyles = (position: 'left' | 'right', size: InputSize) => {
  const sizeConfig = SIZES[size];
  
  return css`
    position: absolute;
    top: 0;
    ${position}: 0;
    height: 100%;
    width: ${sizeConfig.height};
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${COLORS.SECONDARY};
    pointer-events: none; // Icon không chặn click vào input
    
    svg {
      width: 1.2em;
      height: 1.2em;
    }
  `;
};

export const getErrorMessageStyles = () => css`
  margin-top: ${SPACING.xs};
  color: ${COLORS.DANGER};
  font-size: 12px;
`;