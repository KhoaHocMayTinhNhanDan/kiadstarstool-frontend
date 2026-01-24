import { createBrowserRouter, type RouteObject, Navigate } from 'react-router-dom';
import { RouteGuard } from './RouteGuard';
import { LoginPageTest } from '../../pages/auth/LoginPage-test';
import { DashboardPage } from '../../pages/dashboard/DashboardPage';
import { NotFoundPage } from '../../pages/system/NotFoundPage';
import { DevShowcasePage } from '../../pages/playground/DevShowcasePage';

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
    path: ROUTES.ROOT,
    element: <Navigate to={ROUTES.LOGIN} replace />, // Mặc định chuyển hướng về Login
  },
  {
    path: ROUTES.LOGIN,
    element: <LoginPageTest />,
  },
  {
    path: ROUTES.DASHBOARD,
    element: (
      // BẢO VỆ ROUTE NÀY
      <RouteGuard requiredRoles={['admin', 'manager', 'staff']}>
        <DashboardPage />
      </RouteGuard>
    ),
  },
  {
    path: ROUTES.DEV_UI,
    element: <DevShowcasePage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  }
];

export const router = createBrowserRouter(routes);
