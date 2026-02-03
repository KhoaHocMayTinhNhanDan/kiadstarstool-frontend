// src/04-frameworks-and-drivers/ui/web/pages/layouts/RootLayout.tsx
import { Outlet } from 'react-router-dom';
import { AuthProvider } from '../../contexts/AuthContext';
import { ToastProvider } from '../../components/providers/ToastProvider';

/**
 * RootLayout (Page Layer)
 * Chịu trách nhiệm cung cấp Context cho toàn bộ ứng dụng.
 */
export const RootLayout = () => {
  return (
    <ToastProvider>
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    </ToastProvider>
  );
};