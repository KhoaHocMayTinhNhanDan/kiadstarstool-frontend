// src/04-frameworks-and-drivers/ui/web/components/02-organisms/previews/VideoPreview/VideoPreview.styles.ts
import { css } from '@emotion/react';
import {
  COLORS,
  RADIUS,
  SHADOWS,
  TRANSITIONS,
  Z_INDEX
} from '../../../../03-ui-shared/constants/tokens-constants';

export const container = css`
  position: relative;
  background-color: ${COLORS.BACKGROUND_NEUTRAL};
  border-radius: ${RADIUS.md};
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  /* Aspect ratio fallback handled by width/height props */
`;

export const video = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

export const playOverlay = (isPlaying: boolean) => css`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.2);
  opacity: ${isPlaying ? 0 : 1};
  transition: opacity ${TRANSITIONS.NORMAL};
  cursor: pointer;
  z-index: ${Z_INDEX.base};

  &:hover {
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.3);
    
    /* Scale up button on hover */
    div {
      transform: scale(1.1);
    }
  }
`;

export const playButton = css`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.9);
  color: ${COLORS.PRIMARY};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${SHADOWS.lg};
  transition: transform ${TRANSITIONS.FAST}, background-color ${TRANSITIONS.FAST};
`;