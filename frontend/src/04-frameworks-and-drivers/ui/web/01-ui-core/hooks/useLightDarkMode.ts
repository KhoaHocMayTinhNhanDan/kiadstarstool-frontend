import { useContext } from 'react';
import { LightDarkModeContext, type ThemeMode } from '../contexts/LightDarkModeContext';

export interface UseModeReturn {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
  isDark: boolean;
  isLight: boolean;
}

export const useLightDarkMode = (): UseModeReturn => {
  const context = useContext(LightDarkModeContext);
  
  if (!context) {
    throw new Error('useLightDarkMode must be used within LightDarkModeProvider');
  }
  
  return {
    mode: context.mode,
    setMode: context.setMode,
    toggleMode: context.toggleMode,
    isDark: context.mode === 'dark',
    isLight: context.mode === 'light',
  };
};

// Alias để tương thích ngược nếu có file nào đang dùng useMode
export const useMode = useLightDarkMode;