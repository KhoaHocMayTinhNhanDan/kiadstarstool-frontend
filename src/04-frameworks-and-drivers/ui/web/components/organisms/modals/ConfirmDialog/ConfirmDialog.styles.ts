import { css } from '@emotion/react';
import { COLORS, RADIUS, SPACING } from '../../../atoms/00-core/tokens-constants';

export const contentWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: ${SPACING.md};
  padding: ${SPACING.md} 0;
`;

export const iconWrapper = (variant: string) => {
  const colors = {
    danger: { bg: COLORS.DANGER_LIGHT, text: COLORS.DANGER },
    warning: { bg: COLORS.WARNING_LIGHT, text: COLORS.WARNING_DARK },
    success: { bg: COLORS.SUCCESS_LIGHT, text: COLORS.SUCCESS },
    info: { bg: COLORS.INFO_LIGHT, text: COLORS.INFO },
  };
  
  const color = colors[variant as keyof typeof colors] || colors.info;

  return css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: ${RADIUS.full};
    background-color: ${color.bg};
    color: ${color.text};
    margin-bottom: ${SPACING.sm};
  `;
};