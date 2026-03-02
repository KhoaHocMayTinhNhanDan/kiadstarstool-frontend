import { useMemo, useState, useContext, type ReactNode } from 'react';
import { useLightDarkMode } from './LightDarkModeProvider';
import { ThemeContext, type Theme } from '../../01-ui-core/contexts/ThemeContext';
import { defaultThemeConfig, defaultDarkThemeConfig } from '../layouts/dynamic/default.theme';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const { mode } = useLightDarkMode();
  const [themeId, setThemeId] = useState<string>(() => {
    return localStorage.getItem('app_theme_id') || 'default';
  });

  const setTheme = (id: string) => {
    setThemeId(id);
    localStorage.setItem('app_theme_id', id);
  };

  const theme = useMemo(() => {
    // 1. Bắt đầu với cấu hình Default (Sáng hoặc Tối)
    const baseConfig = mode === 'dark' ? defaultDarkThemeConfig : defaultThemeConfig;
    
    // Clone để tránh mutate object gốc
    const baseTheme: Theme = {
      id: themeId,
      colors: { ...baseConfig.colors, background: { ...baseConfig.colors.background }, text: { ...baseConfig.colors.text }, border: { ...baseConfig.colors.border }, surface: { ...baseConfig.colors.surface } },
      layout: { ...baseConfig.layout, sidebar: { ...baseConfig.layout.sidebar }, cards: { ...baseConfig.layout.cards } }
    };

    // Apply Specific Theme overrides (Ironman, Cosmic)
    if (themeId === 'ironman') {
      baseTheme.colors.primary = '#d4af37'; // Gold
      if (mode === 'dark') {
        baseTheme.colors.background.primary = '#1a0505';
        baseTheme.colors.surface.primary = '#2d0000';
      } else {
        baseTheme.colors.background.primary = '#fff5f5';
        baseTheme.colors.surface.primary = '#ffe0e0';
      }
    } else if (themeId === 'cosmic') {
      baseTheme.colors.primary = '#9f7aea'; // Purple
      baseTheme.layout.cards.borderRadius = '16px'; // Rounder
      if (mode === 'dark') {
        baseTheme.colors.background.primary = '#0b0b1e';
        baseTheme.colors.surface.primary = '#1a1a2e';
      }
    }

    return baseTheme;
  }, [mode, themeId]);

  return (
    <ThemeContext.Provider value={{ theme, themeId, setThemeId: setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};