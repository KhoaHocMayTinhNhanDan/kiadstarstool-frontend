// src/04-frameworks-and-drivers/ui/web/components/layouts/RootLayout.tsx
import { Suspense } from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import { LoadingPage } from '../../pages/system/LoadingPage';
import { ThemeProvider } from '../providers/ThemeProvider';
import { I18nProvider } from '../providers/I18nProvider';

export const RootLayout = () => {
  return (
    <ThemeProvider>
      <I18nProvider>
        <div className="root-layout" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          {/* --- Global Providers Area (Auth) --- */}
          {/* Ví dụ: <AuthProvider> ... */}
          
          {/* --- Global UI Overlays (Toast, Modals) --- */}
          {/* <ToastContainer /> */}

          {/* --- Router Utilities --- */}
          <ScrollRestoration />

          {/* --- Main Content --- */}
          <Suspense fallback={<LoadingPage />}>
            <Outlet />
          </Suspense>
          {/* </AuthProvider> */}
        </div>
      </I18nProvider>
    </ThemeProvider>
  );
};