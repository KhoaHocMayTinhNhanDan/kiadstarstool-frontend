// src/04-frameworks-and-drivers/ui/web/02-app/layouts/RootLayout.tsx
/** @jsxImportSource @emotion/react */
import { Outlet } from 'react-router-dom';
import { css } from '@emotion/react';
import { useTheme } from '../../01-ui-core/hooks/useTheme';
import { useMode } from '../../01-ui-core/hooks/useMode';
import { Box } from '../../00-design-system/00-atoms';

/**
 * RootLayout (Layout Layer)
 * Layout gốc, áp dụng theme và mode cho toàn bộ ứng dụng
 */
export const RootLayout = () => {
  const { theme } = useTheme();
  const { mode } = useMode();

  return (
    <Box
      css={css`
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        background-color: ${mode.colors.background.primary};
        color: ${mode.colors.text.primary};
        transition: background-color 0.3s ease, color 0.3s ease;
      `}
    >
      <Outlet />
    </Box>
  );
};

// ❌ KHÔNG còn providers ở đây - đã chuyển lên AppProviders.tsx