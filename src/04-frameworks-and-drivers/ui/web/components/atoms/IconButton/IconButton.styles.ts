// src/04-frameworks-and-drivers/ui/web/components/atoms/IconButton/IconButton.styles.ts
import { css } from '@emotion/react';

/** 🔥 GRID + FLEX SAFE WRAPPER */
export const iconButtonWrapper = css`
  display: inline-flex;
  flex-shrink: 0; /* Quan trọng: Tránh bị co lại trong flex/grid container */
  vertical-align: middle;
  position: relative;
`;