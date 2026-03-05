// src/04-frameworks-and-drivers/ui/web/infrastructure/router/router.tsx
import { createBrowserRouter, type RouteObject, Navigate } from 'react-router-dom';
import { RouteGuard } from './RouteGuard';
import { LoginPage } from '../../pages/auth/LoginPage';
import { DashboardPage } from '../../pages/dashboard/DashboardPage';
import { CreateBranchPage } from '../../pages/branch/CreateBranchPage';
import { BranchDetailPage } from '../../pages/branch/BranchDetailPage';
import { EditBranchPage } from '../../pages/branch/EditBranchPage';
import { NotFoundPage } from '../../pages/system/NotFoundPage';
import { DevShowcasePage } from '../../pages/playground/DevShowcasePage';
import { ForbiddenPage } from '../../pages/system/ForbiddenPage';
import { BranchPage } from '../../pages/branch/BranchPage';
import { RootLayout } from '../../layouts/RootLayout';
import { AuthLayout } from '../../layouts/AuthLayout';
import { MainLayout } from '../../layouts/MainLayout';
import { ClassesPage } from '../../pages/classes/ClassesPage';
import { ClassDetailPage } from '../../pages/classes/ClassDetailPage';
import { CreateClassPage } from '../../pages/classes/CreateClassPage';
import { EditClassPage } from '../../pages/classes/EditClassPage';
import { StudentListPage } from '../../pages/students/StudentListPage';
import { StudentDetailPage } from '../../pages/students/StudentDetailPage';
import { CreateStudentPage } from '../../pages/students/CreateStudentPage';
import { AttendancePage } from '../../pages/attendance/AttendancePage';
import { ThemeSelector } from '../../pages/settings/ThemeSelector';
import { FinancePage } from '../../pages/finance/FinancePage';
import { CreateTransactionPage } from '../../pages/finance/CreateTransactionPage';
import { CollectTuitionPage } from '../../pages/finance/CollectTuitionPage';
import { UserProfilePage } from '../../pages/users/UserProfilePage';
import { UserListPage } from '../../pages/users/UserListPage';
import { CreateUserPage } from '../../pages/users/CreateUserPage';
import { RolesPage } from '../../pages/roles/RolesPage';
import { PERMISSIONS } from '@/shared/constants/authorization';

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
        element: <AuthLayout />,
        children: [
          {
            path: ROUTES.ROOT,
            element: <Navigate to={ROUTES.LOGIN} replace />,
          },
          {
            path: ROUTES.LOGIN,
            element: <LoginPage />,
          },
        ],
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
            element: <MainLayout />,
            children: [
              {
                path: ROUTES.DASHBOARD,
                element: <DashboardPage />,
              },
              {
                path: 'branches',
                element: <BranchPage />,
              },
              {
                path: 'branches/new',
                element: <CreateBranchPage />,
              },
              {
                path: 'branches/:branchId',
                element: <BranchDetailPage />,
              },
              {
                path: 'branches/:branchId/edit',
                element: <EditBranchPage />,
              },
              {
                path: 'classes',
                element: <ClassesPage />,
              },
              {
                path: 'classes/new',
                element: <CreateClassPage />,
              },
              {
                path: 'classes/:classId',
                element: <ClassDetailPage />,
              },
              {
                path: 'classes/:classId/edit',
                element: <EditClassPage />,
              },
              {
                path: 'students',
                element: <StudentListPage />,
              },
              {
                path: 'students/new',
                element: <CreateStudentPage />,
              },
              {
                path: 'students/:studentId',
                element: <StudentDetailPage />,
              },
              {
                path: 'attendance',
                element: <AttendancePage />,
              },
              {
                path: 'finance',
                element: <FinancePage />,
              },
              {
                path: 'finance/new',
                element: <CreateTransactionPage />,
              },
              {
                path: 'settings/theme',
                element: <ThemeSelector />,
              },
              {
                path: 'finance/collect-tuition',
                element: <CollectTuitionPage />,
              },
              // User Management List
              {
                path: 'users', // Bọc route /users
                element: <RouteGuard requiredPermissions={[PERMISSIONS.USERS_READ]} />,
                children: [
                  { index: true, element: <UserListPage /> },
                ],
              },
              {
                path: 'users/new', // Bọc route /users/new
                element: <RouteGuard requiredPermissions={[PERMISSIONS.USERS_CREATE]} />,
                children: [
                  { index: true, element: <CreateUserPage /> },
                ],
              },
              // User Profile
              {
                // Route for the current logged-in user's profile
                path: 'profile',
                element: <UserProfilePage />,
              },
              {
                // Route for viewing a specific user's profile by ID
                path: 'users/:id',
                element: <UserProfilePage />,
              },
              // Settings
              {
                path: 'settings/roles', // Bọc route /settings/roles
                element: <RouteGuard requiredPermissions={[PERMISSIONS.ROLES_READ]} />,
                children: [
                  { index: true, element: <RolesPage /> },
                ],
              },
            ],
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
