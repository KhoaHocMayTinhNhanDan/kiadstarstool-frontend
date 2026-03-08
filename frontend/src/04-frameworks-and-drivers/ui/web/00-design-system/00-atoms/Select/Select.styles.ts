import { css } from '@emotion/react';
import { COLORS, SPACING, RADIUS, FONT_SIZES } from '@/04-frameworks-and-drivers/ui/web/01-ui-core/constants/tokens-constants';

export const selectWrapper = css`
  display: flex;
  flex-direction: column;
  gap: ${SPACING.xs};
`;

export const labelStyles = css`
  font-weight: 500;
  color: ${COLORS.TEXT_PRIMARY};
`;

export const errorTextStyles = css`
  font-size: ${FONT_SIZES.xs};
  color: ${COLORS.DANGER};
  margin-top: ${SPACING.xxs};
`;

interface GetSelectStylesProps {
  error?: boolean;
  disabled?: boolean;
  size?: string;
}

export const getSelectStyles = ({ error, disabled, size = 'md' }: GetSelectStylesProps) => {
  const heightMap: Record<string, string> = {
    sm: '32px',
    md: '40px',
    lg: '48px',
  };

  const paddingMap: Record<string, string> = {
    sm: `0 ${SPACING.sm}`,
    md: `0 ${SPACING.md}`,
    lg: `0 ${SPACING.md}`,
  };

  const fontSizeMap: Record<string, string> = {
    sm: FONT_SIZES.sm,
    md: FONT_SIZES.md,
    lg: FONT_SIZES.lg,
  };

  return css`
    appearance: none;
    width: 100%;
    height: ${heightMap[size]};
    padding: ${paddingMap[size]};
    font-size: ${fontSizeMap[size]};
    border: 1px solid ${error ? COLORS.DANGER : COLORS.NEUTRAL_BORDER};
    border-radius: ${RADIUS.md};
    background-color: ${disabled ? COLORS.NEUTRAL_LIGHT : COLORS.BACKGROUND_PAPER};
    color: ${disabled ? COLORS.TEXT_DISABLED : COLORS.TEXT_PRIMARY};
    cursor: ${disabled ? 'not-allowed' : 'pointer'};
    transition: all 0.2s ease;
    background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23666666%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
    background-repeat: no-repeat;
    background-position: right ${SPACING.sm} top 50%;
    background-size: 10px auto;
    padding-right: ${SPACING.xl};

    &:focus {
      outline: none;
      border-color: ${error ? COLORS.DANGER : COLORS.PRIMARY};
      box-shadow: 0 0 0 2px ${error ? COLORS.DANGER_LIGHT : COLORS.PRIMARY_LIGHT};
    }

    &:hover:not(:disabled) {
      border-color: ${error ? COLORS.DANGER_DARK : COLORS.PRIMARY};
    }
  `;
};