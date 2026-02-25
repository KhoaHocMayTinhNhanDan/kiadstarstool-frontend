// src/04-frameworks-and-drivers/ui/web/components/01-molecules/IconButtonBadge/IconButtonBadge.styles.ts
import { css } from '@emotion/react';
import { COLORS } from '../../../01-ui-core/constants/tokens-constants';

export const container = css`
  position: relative;
  display: inline-block;
`;

export const badgeStyles = (position: string, size: string) => {
  const positionMap = {
    'top-right': { top: '-4px', right: '-4px' },
    'top-left': { top: '-4px', left: '-4px' },
    'bottom-right': { bottom: '-4px', right: '-4px' },
    'bottom-left': { bottom: '-4px', left: '-4px' },
  };
  
  const sizeMap = {
    xs: { minWidth: '16px', height: '16px', fontSize: '10px' },
    sm: { minWidth: '18px', height: '18px', fontSize: '11px' },
    md: { minWidth: '20px', height: '20px', fontSize: '12px' },
  };
  
  return css`
    position: absolute;
    ${positionMap[position as keyof typeof positionMap]};
    background-color: ${COLORS.DANGER};
    color: ${COLORS.WHITE};
    border-radius: 9999px;
    ${sizeMap[size as keyof typeof sizeMap]};
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 4px;
    line-height: 1;
    z-index: 1;
    pointer-events: none;
    border: 2px solid ${COLORS.WHITE};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `;
};