// src/04-frameworks-and-drivers/ui/web/02-app/layouts/AuthLayout.tsx
/** @jsxImportSource @emotion/react */
import { Outlet } from 'react-router-dom';
import { css } from '@emotion/react';
import { useTheme } from '../../01-ui-core/hooks/useTheme';
import { useMode } from '../../01-ui-core/hooks/useMode';
import { Box, Card } from '../../00-design-system/00-atoms';
import { SHADOWS } from '../../01-ui-core/constants/tokens-constants';

/**
 * AuthLayout (Layout Layer)
 * Layout dành cho các trang Login/Register với styling theo theme
 */
export const AuthLayout = () => {
  const { theme } = useTheme();
  const { mode } = useMode();

  return (
    <Box
      css={css`
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        background-color: ${mode.colors.background.secondary};
        padding: 16px;
      `}
    >
      <Card
        css={css`
          width: 100%;
          max-width: 400px;
          padding: 32px;
          background-color: ${mode.colors.surface.primary};
          border-radius: ${theme.layout.cards.borderRadius || '8px'};
          box-shadow: ${SHADOWS.lg};
          border: 1px solid ${mode.colors.border.default};
        `}
      >
        <Outlet />
      </Card>
    </Box>
  );
};