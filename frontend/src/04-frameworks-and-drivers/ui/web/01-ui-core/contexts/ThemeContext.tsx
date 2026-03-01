import { createContext, useState, useEffect, useMemo } from 'react';
import { themes } from '../themes/themes';
import type { ThemeId, Theme } from '../themes/base/base.theme';

interface ThemeContextType {
  currentTheme: ThemeId;
  theme: Theme; // The full theme object for consumption
  setTheme: (theme: ThemeId) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeId>(() => {
    const savedTheme = localStorage.getItem('theme');

    // Validate that the saved theme is a valid key in our themes object.
    if (savedTheme && Object.prototype.hasOwnProperty.call(themes, savedTheme)) {
      return savedTheme as ThemeId;
    }

    // Fallback to a default theme if nothing is saved or the saved value is invalid.
    return 'default';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
  }, [currentTheme]);
  
  // Memoize the context value to prevent unnecessary re-renders of consumers.
  // The value object will only be recreated when `currentTheme` changes.
  const value = useMemo(() => ({
    currentTheme,
    theme: themes[currentTheme],
    setTheme: setCurrentTheme,
  }), [currentTheme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};