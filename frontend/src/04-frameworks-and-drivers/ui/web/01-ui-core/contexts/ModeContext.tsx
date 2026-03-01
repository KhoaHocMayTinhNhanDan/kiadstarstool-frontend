import { createContext, useState, useEffect } from 'react';
import { modes, type Mode, type ModeId } from '../modes';  // ✅ Import Mode thay vì ColorMode

export interface ModeContextType {
  // State
  currentMode: ModeId;
  mode: Mode;  // ✅ Sửa từ ColorMode thành Mode
  
  // Actions
  setMode: (mode: ModeId) => void;
  toggleMode: () => void;
  
  // Utilities
  isDark: boolean;
  isLight: boolean;
}

export const ModeContext = createContext<ModeContextType | undefined>(undefined);

export const ModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentMode, setCurrentMode] = useState<ModeId>(() => {
    const saved = localStorage.getItem('mode') as ModeId;
    if (saved && (saved === 'light' || saved === 'dark')) {
      return saved;
    }
    
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return systemPrefersDark ? 'dark' : 'light';
  });

  // Lấy mode object từ dictionary
  const mode = modes[currentMode];

  // Apply mode to DOM
  useEffect(() => {
    document.documentElement.setAttribute('data-mode', currentMode);
    document.documentElement.classList.remove('light-mode', 'dark-mode');
    document.documentElement.classList.add(`${currentMode}-mode`);
    localStorage.setItem('mode', currentMode);
  }, [currentMode]);

  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('mode')) {
        setCurrentMode(e.matches ? 'dark' : 'light');
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const value: ModeContextType = {
    currentMode,
    mode,
    setMode: setCurrentMode,
    toggleMode: () => setCurrentMode(prev => prev === 'light' ? 'dark' : 'light'),
    isDark: currentMode === 'dark',
    isLight: currentMode === 'light',
  };

  return (
    <ModeContext.Provider value={value}>
      {children}
    </ModeContext.Provider>
  );
};