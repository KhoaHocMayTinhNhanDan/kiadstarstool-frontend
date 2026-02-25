import { css } from '@emotion/react';
import { SIZES } from '../../../01-ui-core/constants/tokens-constants';
import type { IconSize } from './Icon.types';

/** ✅ WRAPPER CHUẨN PRODUCT */
export const iconWrapper = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;
  line-height: 0;          /* 🔥 FIX BASELINE */
`;

/** size map */
const sizeMap: Record<string, string> = {
  ...SIZES,
  inherit: 'inherit',
};

export const getIconStyles = (size: IconSize) => css`
  display: inline-flex;     /* 🔥 ÉP FLEX */
  align-items: center;
  justify-content: center;

  width: 1em;
  height: 1em;
  font-size: ${sizeMap[size]};
  color: currentColor;

  /* 🔥 FIX GỐC: SVG */
  svg {
    display: block;         /* 💥 QUAN TRỌNG NHẤT */
    width: 100%;
    height: 100%;
  }
`;
