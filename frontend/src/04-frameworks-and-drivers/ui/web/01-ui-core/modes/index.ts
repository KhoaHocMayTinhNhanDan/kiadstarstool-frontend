/**
 * Modes Registry
 * Export tất cả modes để dùng trong toàn app
 */

import { lightMode } from './light/light.mode';
import { darkMode } from './dark/dark.mode';
import type { Mode, ModeId } from './base/base.mode';

// Export types
export type { Mode, ModeId } from './base/base.mode';

// Export individual modes
export { lightMode, darkMode };

// Export modes dictionary để dễ dàng truy cập theo id
export const modes: Record<ModeId, Mode> = {
  light: lightMode,
  dark: darkMode,
};

// Export danh sách modes để iterate
export const availableModes: ModeId[] = ['light', 'dark'];

// Helper functions
export const isValidMode = (mode: string): mode is ModeId => {
  return availableModes.includes(mode as ModeId);
};

export const getMode = (modeId: ModeId | string): Mode => {
  if (isValidMode(modeId)) {
    return modes[modeId];
  }
  console.warn(`Mode "${modeId}" not found, falling back to light`);
  return modes.light;
};