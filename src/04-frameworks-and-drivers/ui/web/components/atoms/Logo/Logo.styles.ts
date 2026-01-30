import { css } from '@emotion/react';

/** 🔥 GRID + FLEX SAFE WRAPPER */
export const logoWrapper = css`
  display: inline-flex;
  flex-shrink: 0; /* Quan trọng: Tránh bị co lại trong flex/grid container */
  vertical-align: middle;
  line-height: 1;
`;

export const getLogoStyles = (width?: number | string, height?: number | string) => css`
  width: ${typeof width === 'number' ? `${width}px` : width};
  height: ${typeof height === 'number' ? `${height}px` : height};
  color: inherit; /* Kế thừa màu từ cha */
  fill: currentColor; /* SVG sẽ nhận màu từ color */
  display: block;
`;