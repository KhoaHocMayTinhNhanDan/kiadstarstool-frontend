import { css } from '@emotion/react';
import { COLORS } from '../../atoms/00-core/tokens-constants';

export const getUserCardStyles = (clickable: boolean) => css`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: ${clickable ? 'pointer' : 'default'};
  transition: background-color 0.2s ease;
  
  ${clickable && css`
    &:hover {
      background-color: ${COLORS.NEUTRAL_LIGHT};
    }
  `}
`;