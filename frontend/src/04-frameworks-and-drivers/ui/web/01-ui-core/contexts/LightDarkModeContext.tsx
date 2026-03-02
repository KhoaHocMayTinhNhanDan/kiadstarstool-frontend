import { createContext } from 'react';

export type ThemeMode = 'light' | 'dark';

export interface LightDarkModeContextType {
  mode: ThemeMode;
  toggleMode: () => void;
  setMode: (mode: ThemeMode) => void;
}

export const LightDarkModeContext = createContext<LightDarkModeContextType | undefined>(undefined);