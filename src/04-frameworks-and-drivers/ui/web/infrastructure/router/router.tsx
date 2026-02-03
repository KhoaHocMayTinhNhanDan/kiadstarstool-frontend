// src/04-frameworks-and-drivers/ui/web/infrastructure/router/router.tsx
import { createBrowserRouter, type RouteObject, Navigate } from 'react-router-dom';
import { RouteGuard } from './RouteGuard';
import { LoginPageTest } from '../../pages/auth/LoginPage-test';
import { DashboardPage } from '../../pages/dashboard/DashboardPage';
import { NotFoundPage } from '../../pages/system/NotFoundPage';
import { DevShowcasePage } from '../../pages/playground/DevShowcasePage';
import { RootLayout } from '../../components/02-organisms/layouts/RootLayout';
import { AuthLayout } from '../../components/02-organisms/layouts/AuthLayout';
import { MainLayout } from '../../components/02-organisms/layouts/MainLayout';
import { PERMISSIONS } from '@/shared/constants/authorization/auth.domain';
/* ==========================================================================
 * Router Configuration
 * ========================================================================== */

export const ROUTES = {
  ROOT: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  DEV_UI: '/dev-ui', // Đường dẫn dành cho dev
} as const;

const routes: RouteObject[] = [
  {
    element: <RootLayout />, // Layout gốc (Providers)
    children: [
      // 1. Public Routes (Login, Register...)
      {
        element: <AuthLayout />,
        children: [
          {
            path: ROUTES.ROOT,
            element: <Navigate to={ROUTES.LOGIN} replace />,
          },
          {
            path: ROUTES.LOGIN,
            element: <LoginPageTest />,
          },
        ],
      },

      // 2. Protected Routes (Dashboard...)
      {
        // Level 1 Guard: User must be authenticated to access any of these routes.
        // RouteGuard không có props sẽ chỉ kiểm tra xác thực.
        element: <RouteGuard />,
        children: [
          {
            // MainLayout cung cấp UI chung (sidebar, navbar) cho các trang được bảo vệ.
            element: <MainLayout />,
            children: [
              {
                path: ROUTES.DASHBOARD,
                element: <DashboardPage />,
              },
              {
                // Level 2 Guard: User phải có quyền cụ thể để truy cập route này.
                element: <RouteGuard requiredPermissions={[PERMISSIONS.USER_MANAGE]} />,
                children: [
                  {
                    path: ROUTES.DEV_UI,
                    element: <DevShowcasePage />,
                  },
                ],
              },
            ],
          },
        ],
      },

      // 3. Catch-all (404) - Nằm ngoài Auth/Main layout để hiển thị full màn hình
      {
        path: '*',
        element: <NotFoundPage />,
      }
    ],
  }
];

export const router = createBrowserRouter(routes);
