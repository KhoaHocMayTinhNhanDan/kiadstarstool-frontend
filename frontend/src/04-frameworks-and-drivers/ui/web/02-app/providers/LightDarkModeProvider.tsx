import { useContext, useEffect, useState, type ReactNode } from 'react';
import { LightDarkModeContext, type ThemeMode } from '../../01-ui-core/contexts/LightDarkModeContext';

export const LightDarkModeProvider = ({ children }: { children: ReactNode }) => {
  // 1. Khởi tạo mode: Ưu tiên localStorage -> sau đó đến System preference
  const [mode, setModeState] = useState<ThemeMode>(() => {
    const savedMode = localStorage.getItem('theme'); // Giữ key 'theme' để tương thích dữ liệu cũ
    if (savedMode === 'light' || savedMode === 'dark') {
      return savedMode;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // 2. Side effect: Cập nhật class vào thẻ <html> và lưu localStorage
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(mode);
    localStorage.setItem('theme', mode);
  }, [mode]);

  const toggleMode = () => {
    setModeState((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const setMode = (newMode: ThemeMode) => {
    setModeState(newMode);
  };

  return (
    <LightDarkModeContext.Provider value={{ mode, toggleMode, setMode }}>
      {children}
    </LightDarkModeContext.Provider>
  );
};

export const useLightDarkMode = () => {
  const context = useContext(LightDarkModeContext);
  if (context === undefined) {
    throw new Error('useLightDarkMode must be used within a LightDarkModeProvider');
  }
  return context;
};