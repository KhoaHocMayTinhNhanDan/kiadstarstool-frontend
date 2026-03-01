import { css } from '@emotion/react';
import { COLORS } from '../../../01-ui-core/constants/tokens-constants';
import type { AlertStatus } from './Alert.types';

export const STATUS_CONFIG: Record<
  AlertStatus,
  { iconColor: keyof typeof COLORS; bgColor: keyof typeof COLORS }
> = {
  info: {
    iconColor: 'INFO',
    bgColor: 'INFO_LIGHT',
  },
  success: {
    iconColor: 'SUCCESS',
    bgColor: 'SUCCESS_LIGHT',
  },
  warning: {
    iconColor: 'WARNING',
    bgColor: 'WARNING_LIGHT',
  },
  error: {
    iconColor: 'DANGER',
    bgColor: 'DANGER_LIGHT',
  },
};

export const getAlertStyles = (status: AlertStatus) => {
  const config = STATUS_CONFIG[status];
  return css`
    background-color: ${COLORS[config.bgColor]};
    border: 1px solid ${COLORS[config.iconColor]};
  `;
};