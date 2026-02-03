// src/04-frameworks-and-drivers/ui/web/infrastructure/router/router.tsx
import { createBrowserRouter, type RouteObject, Navigate } from 'react-router-dom';
import { RouteGuard } from './RouteGuard';
import { LoginPageTest } from '../../pages/auth/LoginPage-test';
import { DashboardPage } from '../../pages/dashboard/DashboardPage';
import { NotFoundPage } from '../../pages/system/NotFoundPage';
import { DevShowcasePage } from '../../pages/playground/DevShowcasePage';
import { ForbiddenPage } from '../../pages/system/ForbiddenPage';
import { RootLayout } from '../../pages/layouts/RootLayout';
import { AuthLayout } from '../../pages/layouts/AuthLayout';
import { MainLayout } from '../../pages/layouts/MainLayout';
/* ==========================================================================
 * Router Configuration
 * ========================================================================== */

export const ROUTES = {
  ROOT: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  DEV_UI: '/dev-ui', // Đường dẫn dành cho dev
  FORBIDDEN: '/403',
} as const;

const routes: RouteObject[] = [
  {
    element: <RootLayout />, // Layout gốc (Providers)
    children: [
      // 1. Public Routes (Login, Register...)
      {
        // element: <AuthLayout />,
        // children: [
        //   {
        //     path: ROUTES.ROOT,
        //     element: <Navigate to={ROUTES.LOGIN} replace />,
        //   },
        //   {
        //     path: ROUTES.LOGIN,
        //     element: <LoginPageTest />,
        //   },
        // ],
      },

      // Dev Routes (Public for testing - Không cần login)
      {
        path: ROUTES.DEV_UI,
        element: <DevShowcasePage />,
      },

      // 2. Protected Routes (Dashboard...)
      {
        // Level 1 Guard: User must be authenticated to access any of these routes.
        // RouteGuard không có props sẽ chỉ kiểm tra xác thực.
        element: <RouteGuard />,
        children: [
          {
            // element: <MainLayout />,
            // children: [
            //   {
            //     path: ROUTES.DASHBOARD,
            //     element: <DashboardPage />,
            //   },
            // ],
          },
        ],
      },

      // 3. System Pages
      {
        path: ROUTES.FORBIDDEN,
        element: <ForbiddenPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      }
    ],
  }
];

export const router = createBrowserRouter(routes);
