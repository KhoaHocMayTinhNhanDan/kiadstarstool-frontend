// src/04-frameworks-and-drivers/ui/web/components/02-organisms/previews/ImagePreview/ImagePreview.styles.ts
import { css, keyframes } from '@emotion/react';
import { COLORS, RADIUS, Z_INDEX, TRANSITIONS, SPACING } from '../../../00-atoms/00-core/tokens-constants';

export const container = (zoomable: boolean) => css`
  position: relative;
  display: inline-block;
  overflow: hidden;
  border-radius: ${RADIUS.md};
  cursor: ${zoomable ? 'zoom-in' : 'default'};
  line-height: 0;
  background-color: ${COLORS.NEUTRAL_LIGHT};
`;

export const image = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform ${TRANSITIONS.NORMAL};

  &:hover {
    transform: scale(1.02);
  }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const overlay = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: ${Z_INDEX.modal};
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.2s ease-out;
  cursor: zoom-out;
`;

export const zoomedImage = css`
  max-width: 90vw;
  max-height: 90vh;
  object-fit: contain;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  border-radius: ${RADIUS.sm};
  cursor: default;
`;

export const closeButton = css`
  position: absolute;
  top: ${SPACING.lg};
  right: ${SPACING.lg};
  color: ${COLORS.WHITE};
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;
  z-index: 10;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

export const caption = css`
  position: absolute;
  bottom: ${SPACING.lg};
  left: 50%;
  transform: translateX(-50%);
  color: ${COLORS.WHITE};
  background: rgba(0, 0, 0, 0.6);
  padding: ${SPACING.sm} ${SPACING.md};
  border-radius: ${RADIUS.full};
  font-size: 14px;
  pointer-events: none;
`;