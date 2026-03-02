import { type ReactNode } from 'react';
import { I18nProvider } from './I18nProvider';
import { ThemeProvider } from './ThemeProvider';
import { ToastProvider } from './ToastProvider';
import { LightDarkModeProvider } from './LightDarkModeProvider';

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <LightDarkModeProvider>
      <ThemeProvider>
        <I18nProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </I18nProvider>
      </ThemeProvider>
    </LightDarkModeProvider>
  );
};