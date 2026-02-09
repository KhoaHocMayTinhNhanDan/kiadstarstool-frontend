// src/04-frameworks-and-drivers/ui/web/pages/layouts/RootLayout.tsx
/** @jsxImportSource @emotion/react */
import { Outlet } from 'react-router-dom';
import { css } from '@emotion/react';
import { AuthProvider } from '../../contexts/AuthContext';
import { ToastProvider } from '../../components/providers/ToastProvider';
import { Box } from '../../components/00-atoms';

/**
 * RootLayout (Page Layer)
 * Chịu trách nhiệm cung cấp Context cho toàn bộ ứng dụng.
 */
export const RootLayout = () => {
  return (
    <ToastProvider>
      <AuthProvider>
        <Box css={css`
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        `}>
          <Outlet />
        </Box>
      </AuthProvider>
    </ToastProvider>
  );
};