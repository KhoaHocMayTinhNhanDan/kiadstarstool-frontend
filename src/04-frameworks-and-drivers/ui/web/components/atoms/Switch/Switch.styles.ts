import { css } from '@emotion/react';
import { COLORS, RADIUS, TRANSITIONS } from '../00-core/tokens-constants';
import { type SwitchSize, type SwitchVariant } from './Switch';

// Định nghĩa config trực tiếp trong file style hoặc tách ra file config riêng
const SIZES = {
  sm: { width: '36px', height: '20px', thumb: '16px', translate: '18px' },
  md: { width: '44px', height: '24px', thumb: '20px', translate: '22px' },
  lg: { width: '56px', height: '32px', thumb: '28px', translate: '26px' },
};

const VARIANTS = {
  primary: { on: COLORS.PRIMARY, ring: COLORS.PRIMARY_LIGHT },
  success: { on: COLORS.SUCCESS, ring: COLORS.SUCCESS_LIGHT },
  danger: { on: COLORS.DANGER, ring: COLORS.DANGER_LIGHT },
  neutral: { on: COLORS.NEUTRAL_DARK, ring: COLORS.NEUTRAL_RING },
};

export const getSwitchRootStyles = (size: SwitchSize, variant: SwitchVariant) => {
  const sizeConfig = SIZES[size];
  const variantConfig = VARIANTS[variant];

  return css`
    all: unset;
    width: ${sizeConfig.width};
    height: ${sizeConfig.height};
    background-color: ${COLORS.NEUTRAL_LIGHT};
    border-radius: ${RADIUS.full};
    position: relative;
    cursor: pointer;
    transition: background-color ${TRANSITIONS.fast};
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

    &:focus-visible {
      box-shadow: 0 0 0 2px ${COLORS.WHITE}, 0 0 0 4px ${variantConfig.ring};
    }

    &[data-disabled] {
      cursor: not-allowed;
      opacity: 0.5;
    }

    &[data-state='checked'] {
      background-color: ${variantConfig.on};
    }
  `;
};

export const getSwitchThumbStyles = (size: SwitchSize) => {
  const sizeConfig = SIZES[size];
  return css`
    display: block;
    width: ${sizeConfig.thumb};
    height: ${sizeConfig.thumb};
    background-color: ${COLORS.WHITE};
    border-radius: ${RADIUS.full};
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
    transition: transform ${TRANSITIONS.fast};
    transform: translateX(2px);
    will-change: transform;

    &[data-state='checked'] {
      transform: translateX(${sizeConfig.translate});
    }
  `;
};