import { css, keyframes } from '@emotion/react';
import { COLORS, RADIUS, TRANSITIONS } from '../00-core/tokens-constants';
import { type RadioSize, type RadioVariant } from './Radio';

const SIZES = {
  sm: { size: '16px', dot: '8px' },
  md: { size: '20px', dot: '10px' },
  lg: { size: '24px', dot: '12px' },
};

const VARIANTS = {
  primary: { color: COLORS.PRIMARY, ring: COLORS.PRIMARY_LIGHT },
  success: { color: COLORS.SUCCESS, ring: COLORS.SUCCESS_LIGHT },
  danger: { color: COLORS.DANGER, ring: COLORS.DANGER_LIGHT },
  neutral: { color: COLORS.NEUTRAL_DARK, ring: COLORS.NEUTRAL_RING },
};

const scaleIn = keyframes`
  from { transform: scale(0); }
  to { transform: scale(1); }
`;

export const getRadioGroupRootStyles = () => css`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const getRadioItemStyles = (size: RadioSize, variant: RadioVariant) => {
  const sizeConfig = SIZES[size];
  const variantConfig = VARIANTS[variant];

  return css`
    all: unset;
    background-color: ${COLORS.WHITE};
    width: ${sizeConfig.size};
    height: ${sizeConfig.size};
    border-radius: ${RADIUS.full};
    border: 1px solid ${COLORS.NEUTRAL_RING};
    position: relative;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all ${TRANSITIONS.fast};

    &:hover {
      background-color: ${COLORS.NEUTRAL_LIGHT};
      border-color: ${variantConfig.color};
    }

    &:focus-visible {
      box-shadow: 0 0 0 2px ${COLORS.WHITE}, 0 0 0 4px ${variantConfig.ring};
      border-color: ${variantConfig.color};
    }

    &[data-state='checked'] {
      border-color: ${variantConfig.color};
      background-color: ${COLORS.WHITE};
    }

    &[data-disabled] {
      cursor: not-allowed;
      opacity: 0.5;
      background-color: ${COLORS.NEUTRAL_LIGHT};
    }
  `;
};

export const getRadioIndicatorStyles = (size: RadioSize, variant: RadioVariant) => {
  const sizeConfig = SIZES[size];
  const variantConfig = VARIANTS[variant];

  return css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    position: relative;

    &::after {
      content: '';
      display: block;
      width: ${sizeConfig.dot};
      height: ${sizeConfig.dot};
      border-radius: 50%;
      background-color: ${variantConfig.color};
      animation: ${scaleIn} 0.2s ease-out;
    }
  `;
};