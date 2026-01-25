import { css } from '@emotion/react';
import { COLORS, RADIUS, SPACING, TRANSITIONS } from '../00-core/tokens-constants';
import { type ButtonSize, type ButtonVariant } from './Button';

const SIZES = {
  sm: { height: '32px', padding: '0 12px', fontSize: '14px' },
  md: { height: '40px', padding: '0 16px', fontSize: '14px' },
  lg: { height: '48px', padding: '0 24px', fontSize: '16px' },
  icon: { height: '40px', padding: '0', width: '40px', fontSize: '16px' }, // Square button
};

const VARIANTS = {
  primary: {
    bg: COLORS.PRIMARY,
    color: COLORS.WHITE,
    hoverBg: COLORS.PRIMARY_DARK,
    border: 'transparent',
  },
  secondary: {
    bg: COLORS.SECONDARY,
    color: COLORS.WHITE,
    hoverBg: COLORS.SECONDARY_DARK,
    border: 'transparent',
  },
  outline: {
    bg: 'transparent',
    color: COLORS.TEXT,
    hoverBg: COLORS.NEUTRAL_LIGHT,
    border: COLORS.NEUTRAL_RING,
  },
  ghost: {
    bg: 'transparent',
    color: COLORS.TEXT,
    hoverBg: COLORS.NEUTRAL_LIGHT,
    border: 'transparent',
  },
  danger: {
    bg: COLORS.DANGER,
    color: COLORS.WHITE,
    hoverBg: COLORS.DANGER_DARK,
    border: 'transparent',
  },
  link: {
    bg: 'transparent',
    color: COLORS.PRIMARY,
    hoverBg: 'transparent',
    border: 'transparent',
    textDecoration: 'underline',
  },
};

export const getButtonStyles = (size: ButtonSize, variant: ButtonVariant, fullWidth: boolean, isLoading: boolean) => {
  const sizeConfig = SIZES[size];
  const variantConfig = VARIANTS[variant];

  return css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    white-space: nowrap;
    
    height: ${sizeConfig.height};
    width: ${fullWidth ? '100%' : size === 'icon' ? SIZES.icon.width : 'auto'};
    padding: ${sizeConfig.padding};
    
    font-size: ${sizeConfig.fontSize};
    font-weight: 500;
    font-family: inherit;
    line-height: 1;
    
    border-radius: ${RADIUS.md};
    border: 1px solid ${variantConfig.border};
    
    background-color: ${variantConfig.bg};
    color: ${isLoading ? 'transparent' : variantConfig.color}; /* Hide text when loading */
    
    cursor: pointer;
    transition: all ${TRANSITIONS.fast};
    text-decoration: none;
    user-select: none;

    &:hover:not(:disabled) {
      background-color: ${variantConfig.hoverBg};
      text-decoration: ${variant === 'link' ? 'underline' : 'none'};
    }

    &:focus-visible {
      outline: none;
      box-shadow: 0 0 0 2px ${COLORS.WHITE}, 0 0 0 4px ${COLORS.PRIMARY_LIGHT};
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }

    svg {
      margin-right: ${size === 'icon' ? 0 : SPACING.xs};
    }
  `;
};