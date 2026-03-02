import { createContext } from 'react';

// Định nghĩa cấu trúc Theme tại Core để tái sử dụng
export interface Theme {
  id: string;
  colors: {
    primary: string;
    background: {
      primary: string;
      secondary: string;
    };
    text: {
      primary: string;
      secondary: string;
    };
    border: {
      default: string;
      light: string;
    };
    surface: {
      primary: string;
    };
  };
  layout: {
    sidebar: {
      width: string;
      collapsedWidth: string;
    };
    cards: {
      borderRadius: string;
    };
  };
}

export interface ThemeContextType {
  themeId: string;
  setThemeId: (id: string) => void;
  theme: Theme;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);