// src/04-frameworks-and-drivers/ui/web/pages/layouts/RootLayout.tsx
/** @jsxImportSource @emotion/react */
import { Outlet } from 'react-router-dom';
import { css } from '@emotion/react';
import { AuthProvider } from '../../app/contexts/AuthContext';
import { ToastProvider } from '../../app/providers/ToastProvider';
import { ThemeProvider } from '../../app/providers/ThemeProvider';
import { I18nProvider } from '../../app/providers/I18nProvider';
import { Box } from '../../00-design-system/00-atoms';

/**
 * RootLayout (Page Layer)
 * Chịu trách nhiệm cung cấp Context cho toàn bộ ứng dụng.
 */
export const RootLayout = () => {
  return (
    <ThemeProvider>
      <I18nProvider>
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
      </I18nProvider>
    </ThemeProvider>
  );
};