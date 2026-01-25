import { css } from '@emotion/react';
import { COLORS, RADIUS } from '../00-core/tokens-constants';
import { type BadgeVariant, type BadgeColor } from './Badge';

const VARIANTS = {
  filled: {
    primary: { bg: COLORS.PRIMARY, color: COLORS.WHITE },
    success: { bg: COLORS.SUCCESS, color: COLORS.WHITE },
    danger: { bg: COLORS.DANGER, color: COLORS.WHITE },
    warning: { bg: COLORS.WARNING, color: COLORS.WHITE },
    neutral: { bg: COLORS.NEUTRAL_DARK, color: COLORS.WHITE },
  },
  outline: {
    primary: { bg: COLORS.WHITE, color: COLORS.PRIMARY, border: COLORS.PRIMARY },
    success: { bg: COLORS.WHITE, color: COLORS.SUCCESS, border: COLORS.SUCCESS },
    danger: { bg: COLORS.WHITE, color: COLORS.DANGER, border: COLORS.DANGER },
    warning: { bg: COLORS.WHITE, color: COLORS.WARNING, border: COLORS.WARNING },
    neutral: { bg: COLORS.WHITE, color: COLORS.NEUTRAL_DARK, border: COLORS.NEUTRAL_DARK },
  }
};

export const getBadgeStyles = (variant: BadgeVariant, color: BadgeColor, isDot: boolean) => {
  const styleConfig = VARIANTS[variant][color];
  
  return css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    
    /* Dot mode vs Content mode */
    min-width: ${isDot ? '8px' : '18px'};
    height: ${isDot ? '8px' : '18px'};
    padding: ${isDot ? '0' : '0 6px'};
    
    border-radius: ${RADIUS.full};
    font-size: 11px;
    font-weight: 600;
    line-height: 1;
    white-space: nowrap;
    
    background-color: ${styleConfig.bg};
    color: ${styleConfig.color};
    border: 1px solid ${variant === 'outline' ? (styleConfig as any).border : 'transparent'};
    
    /* Position absolute logic handled by parent or wrapper if needed */
  `;
};

export const getBadgeWrapperStyles = () => css`
  position: relative;
  display: inline-flex;
  vertical-align: middle;
`;

export const getBadgePositionStyles = (position: 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left') => {
  const positions = {
    'top-right': css`top: 0; right: 0; transform: translate(50%, -50%);`,
    'bottom-right': css`bottom: 0; right: 0; transform: translate(50%, 50%);`,
    'top-left': css`top: 0; left: 0; transform: translate(-50%, -50%);`,
    'bottom-left': css`bottom: 0; left: 0; transform: translate(-50%, 50%);`,
  };
  
  return css`
    position: absolute;
    z-index: 10;
    ${positions[position]}
  `;
};