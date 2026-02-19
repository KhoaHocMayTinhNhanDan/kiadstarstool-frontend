import { useContext } from 'react';
import { ModeContext } from '../contexts/ModeContext';
// import type { Mode, ModeId } from '../modes/base/mode.types';
import type { Mode, ModeId } from '../modes/base/base.mode';

export interface UseModeReturn {
  mode: Mode;
  modeId: ModeId;
  setMode: (mode: ModeId) => void;
  toggleMode: () => void;
  isDark: boolean;
  isLight: boolean;
}

export const useMode = (): UseModeReturn => {
  const context = useContext(ModeContext);
  
  if (!context) {
    throw new Error('useMode must be used within ModeProvider');
  }
  
  return {
    mode: context.mode,
    modeId: context.mode.id,
    setMode: context.setMode,
    toggleMode: context.toggleMode,
    isDark: context.isDark,
    isLight: context.isLight,
  };
};