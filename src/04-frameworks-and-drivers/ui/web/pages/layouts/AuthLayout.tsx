// src/04-frameworks-and-drivers/ui/web/pages/layouts/AuthLayout.tsx
/** @jsxImportSource @emotion/react */
import { Outlet } from 'react-router-dom';
import { css } from '@emotion/react';
import { Box } from '../../00-design-system/00-atoms';
import { COLORS } from '../../00-design-system/00-atoms/00-core/tokens-constants';

/**
 * AuthLayout (Page Layer)
 * Layout dành cho các trang Login/Register.
 */
export const AuthLayout = () => {
  return (
    <Box css={css`
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      background-color: ${COLORS.BACKGROUND_NEUTRAL || '#f7fafc'};
      padding: 16px; // Thêm padding để form không dính vào cạnh màn hình trên mobile
    `}>
      <Outlet />
    </Box>
  );
};