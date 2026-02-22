import { css } from '@emotion/react';
import { COLORS, RADIUS, SHADOWS, SPACING } from '../../../03-ui-shared/constants/tokens-constants';

/** 🔥 GRID + FLEX SAFE WRAPPER */
export const cardStyles = css`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  width: 100%;
  min-width: 0; /* 🔥 QUAN TRỌNG: Tránh bị tràn trong flex/grid container */
  position: relative;
  
  background-color: ${COLORS.WHITE};
  border-radius: ${RADIUS.md};
  box-shadow: ${SHADOWS.sm};
  border: 1px solid ${COLORS.NEUTRAL_LIGHT};
  padding: ${SPACING.lg};
  overflow: hidden; /* Đảm bảo nội dung con không tràn ra ngoài border-radius */
`;