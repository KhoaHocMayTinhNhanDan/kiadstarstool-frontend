import { css } from '@emotion/react';
import { COLORS, RADIUS } from '../00-core/tokens-constants';
import { type AvatarSize } from './Avatar';

const SIZES = {
  sm: { size: '24px', fontSize: '10px' },
  md: { size: '32px', fontSize: '12px' },
  lg: { size: '48px', fontSize: '16px' },
  xl: { size: '64px', fontSize: '24px' },
};

export const getAvatarRootStyles = (size: AvatarSize) => {
  const sizeConfig = SIZES[size];
  
  return css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
    overflow: hidden;
    user-select: none;
    width: ${sizeConfig.size};
    height: ${sizeConfig.size};
    border-radius: ${RADIUS.full};
    background-color: ${COLORS.NEUTRAL_LIGHT};
  `;
};

export const getAvatarImageStyles = () => css`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
`;

export const getAvatarFallbackStyles = (size: AvatarSize) => {
  const sizeConfig = SIZES[size];
  
  return css`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${COLORS.PRIMARY};
    color: ${COLORS.WHITE};
    font-size: ${sizeConfig.fontSize};
    font-weight: 600;
    line-height: 1;
  `;
};