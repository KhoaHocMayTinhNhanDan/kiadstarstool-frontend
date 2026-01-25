import { createBrowserRouter, type RouteObject, Navigate } from 'react-router-dom';
import { RouteGuard } from './RouteGuard';
import { LoginPageTest } from '../../pages/auth/LoginPage-test';
import { DashboardPage } from '../../pages/dashboard/DashboardPage';
import { NotFoundPage } from '../../pages/system/NotFoundPage';
import { DevShowcasePage } from '../../pages/playground/DevShowcasePage';
import { RootLayout } from '../../components/layouts/RootLayout';
import { AuthLayout } from '../../components/layouts/AuthLayout';
import { MainLayout } from '../../components/layouts/MainLayout';

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
        element: (
          <RouteGuard requiredRoles={['admin', 'manager', 'staff']}>
            <MainLayout />
          </RouteGuard>
        ),
        children: [
          {
            path: ROUTES.DASHBOARD,
            element: <DashboardPage />,
          },
          {
            path: ROUTES.DEV_UI,
            element: <DevShowcasePage />,
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
