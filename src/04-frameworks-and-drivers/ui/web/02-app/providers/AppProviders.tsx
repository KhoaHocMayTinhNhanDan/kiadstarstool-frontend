// 02-app/providers/AppProviders.tsx
import { type ReactNode } from 'react';
import { ModalProvider } from '../../01-ui-core/contexts/ModalContext';
import { ModeProvider } from '../../01-ui-core/contexts/ModeContext';
import { ThemeProvider } from '../../01-ui-core/contexts/ThemeContext';
import { ToastProvider } from './ToastProvider'; // Sử dụng App-level ToastProvider
import { I18nProvider } from './I18nProvider';
import { AuthProvider } from '../contexts/AuthContext';

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <I18nProvider>
      <ThemeProvider>
        <ModeProvider>
          <ToastProvider>
            <AuthProvider>
              <ModalProvider>{children}</ModalProvider>
            </AuthProvider>
          </ToastProvider>
        </ModeProvider>
      </ThemeProvider>
    </I18nProvider>
  );
};