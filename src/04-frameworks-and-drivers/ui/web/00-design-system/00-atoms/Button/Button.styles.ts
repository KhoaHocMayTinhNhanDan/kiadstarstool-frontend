// src/04-frameworks-and-drivers/ui/web/components/00-atoms/Button/Button.styles.ts
import { css } from '@emotion/react';
import {
  COLORS,

  FONT_WEIGHTS,
  RADIUS,
  SPACING,
  TRANSITIONS,
} from '../../../01-ui-core/constants/tokens-constants';
import type { ButtonSize, ButtonVariant, ButtonIntent } from './Button.types';

/* ================= SIZE = FONT-SIZE ================= */
const CONTROL_FONT_SIZES: Record<ButtonSize, string> = {
  xs: '12px',
  sm: '14px',
  md: '16px',
  lg: '20px',
  xl: '24px',
};

const sizeStyles: Record<ButtonSize, ReturnType<typeof css>> = {
  xs: css`
    height: 28px;
    padding: 0 ${SPACING.sm};
    font-size: ${CONTROL_FONT_SIZES.xs};
  `,
  sm: css`
    height: 36px;
    padding: 0 ${SPACING.md};
    font-size: ${CONTROL_FONT_SIZES.sm};
  `,
  md: css`
    height: 40px;
    padding: 0 ${SPACING.lg};
    font-size: ${CONTROL_FONT_SIZES.md};
  `,
  lg: css`
    height: 48px;
    padding: 0 ${SPACING.xl};
    font-size: ${CONTROL_FONT_SIZES.lg};
  `,
  xl: css`
    height: 56px;
    padding: 0 ${SPACING['2xl']};
    font-size: ${CONTROL_FONT_SIZES.xl};
  `,
};



/* ================= VARIANTS ================= */

const intentStyles: Record<ButtonIntent, ReturnType<typeof css>> = {
  default: css`
    background-color: ${COLORS.PRIMARY};
    &:hover:not(:disabled) { background-color: ${COLORS.PRIMARY_DARK}; }
  `,
  success: css`
    background-color: ${COLORS.SUCCESS};
    &:hover:not(:disabled) { background-color: ${COLORS.SUCCESS_DARK}; }
  `,
  danger: css`
    background-color: ${COLORS.DANGER};
    &:hover:not(:disabled) { background-color: ${COLORS.DANGER_DARK}; }
  `,
  warning: css`
    background-color: ${COLORS.WARNING};
    color: ${COLORS.TEXT_INVERTED};
    &:hover:not(:disabled) { background-color: ${COLORS.WARNING_DARK}; }
  `,
};

const variantStyles: Record<ButtonVariant, ReturnType<typeof css>> = {
  primary: css`
    background-color: ${COLORS.PRIMARY};
    color: ${COLORS.WHITE};
    border: 1px solid transparent;
    &:hover:not(:disabled) {
      background-color: ${COLORS.PRIMARY_DARK};
    }
  `,
  secondary: css`
    background-color: ${COLORS.SECONDARY};
    color: ${COLORS.WHITE};
    border: 1px solid transparent;
    &:hover:not(:disabled) {
      background-color: ${COLORS.SECONDARY_DARK};
    }
  `,
  outline: css`
    background-color: transparent;
    color: ${COLORS.PRIMARY};
    border: 1px solid ${COLORS.PRIMARY};
    &:hover:not(:disabled) {
      background-color: ${COLORS.PRIMARY_LIGHT}20;
    }
  `,
  ghost: css`
    background-color: transparent;
    color: ${COLORS.PRIMARY};
    border: 1px solid transparent;
    &:hover:not(:disabled) {
      background-color: ${COLORS.PRIMARY_LIGHT}20;
    }
  `,
  danger: css`
    background-color: ${COLORS.DANGER};
    color: ${COLORS.WHITE};
    border: 1px solid transparent;
    &:hover:not(:disabled) {
      background-color: ${COLORS.DANGER_DARK};
    }
  `,
};

/* ================= MAIN ================= */

export const getButtonStyles = (
  variant: ButtonVariant,
  intent: ButtonIntent,
  size: ButtonSize,
  fullWidth?: boolean,
  isLoading?: boolean
) => css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${SPACING.sm};

  width: ${fullWidth ? '100%' : 'auto'};
  box-sizing: border-box;
  flex-shrink: 0;

  font-family: inherit;
  font-weight: ${FONT_WEIGHTS.semibold};
  text-decoration: none;
  white-space: nowrap;
  vertical-align: middle;

  border-radius: ${RADIUS.md};
  cursor: pointer;
  user-select: none;
  transition: all ${TRANSITIONS.FAST};

  ${sizeStyles[size]}
  ${variantStyles[variant]}

  /* Intent overrides variant color */
  ${(variant === 'primary' || variant === 'secondary' || variant === 'danger') && intent !== 'default' && css`
    ${intentStyles[intent]}
  `}

  ${(variant === 'outline' || variant === 'ghost') && intent !== 'default' && css`
    & { /* Increase specificity to override variant styles */
      color: ${intent === 'success' ? COLORS.SUCCESS : intent === 'danger' ? COLORS.DANGER : COLORS.WARNING};
      border-color: ${variant === 'outline' ? (intent === 'success' ? COLORS.SUCCESS : intent === 'danger' ? COLORS.DANGER : COLORS.WARNING) : 'transparent'};
      
      &:hover:not(:disabled) {
        background-color: ${intent === 'success' ? `rgba(var(--success-rgb), 0.1)` : intent === 'danger' ? `rgba(var(--danger-rgb), 0.1)` : `rgba(var(--warning-rgb), 0.1)`};
      }
    }
  `}

  /* 🔑 CONTENT CONTRACT */
  .btn-content {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: ${SPACING.sm};
    line-height: 1; /* 🔥 FIX ICON + TEXT LỆCH */
  }

  /* 🔑 FIX SVG BASELINE */
  svg {
    display: block;
    width: 1em;
    height: 1em;
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px ${COLORS.PRIMARY_LIGHT};
  }

  &:disabled,
  &[aria-disabled='true'] {
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
  }

  ${isLoading &&
  css`
    cursor: wait;
    pointer-events: none;
  `}`;
