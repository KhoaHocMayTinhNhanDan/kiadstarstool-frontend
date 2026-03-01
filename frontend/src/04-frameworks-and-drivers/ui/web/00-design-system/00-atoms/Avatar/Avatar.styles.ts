import { css } from '@emotion/react';
import { COLORS, FONT_SIZES, FONT_WEIGHTS, SIZES } from '../../../01-ui-core/constants/tokens-constants';
import type { AvatarSize } from './Avatar.types';

/** 🔥 GRID + FLEX SAFE WRAPPER */
export const avatarWrapper = css`
  display: inline-flex; /* Avatar thường là inline, nhưng flex để căn chỉnh */
  flex-direction: column;
  position: relative;
  /* Không force width 100% như Input vì Avatar có size cố định */
  flex-shrink: 0; /* Tránh bị co lại trong flex container */
`;

const sizeMap: Record<AvatarSize, string> = {
  xs: SIZES.xs,   // 16px
  sm: SIZES.sm,   // 20px
  md: SIZES.md,   // 24px
  lg: SIZES.lg,   // 32px
  xl: SIZES.xl,   // 48px
  '2xl': SIZES['2xl'], // 64px
};

const fontSizeMap: Record<AvatarSize, string> = {
  xs: '8px',
  sm: '10px',
  md: FONT_SIZES.xs,
  lg: FONT_SIZES.sm,
  xl: FONT_SIZES.md,
  '2xl': FONT_SIZES.xl,
};

export const getAvatarRootStyles = (size: AvatarSize) => css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  overflow: hidden;
  user-select: none;
  width: ${sizeMap[size]};
  height: ${sizeMap[size]};
  border-radius: 100%;
  background-color: ${COLORS.NEUTRAL_LIGHT};
`;

export const avatarImageStyles = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
`;

export const getAvatarFallbackStyles = (size: AvatarSize) => css`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${COLORS.PRIMARY_LIGHT};
  color: ${COLORS.PRIMARY_DARK};
  font-size: ${fontSizeMap[size]};
  font-weight: ${FONT_WEIGHTS.medium};
  line-height: 1;
`;