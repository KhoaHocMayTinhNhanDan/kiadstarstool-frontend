import { type Mode } from '../base/base.mode';
import { COLORS, SHADOWS } from '../../constants/tokens-constants';

export const lightMode: Mode = {  // ✅ Sửa từ ColorMode thành Mode
  id: 'light',
  name: 'Sáng',
  
  colors: {
    background: {
      primary: COLORS.WHITE,
      secondary: COLORS.BACKGROUND_NEUTRAL,
      tertiary: COLORS.NEUTRAL_LIGHT,
    },
    
    surface: {
      primary: COLORS.WHITE,
      secondary: COLORS.BACKGROUND_SUBTLE,
      tertiary: COLORS.NEUTRAL_LIGHT,
    },
    
    text: {
      primary: COLORS.TEXT_PRIMARY,
      secondary: COLORS.TEXT_SECONDARY,
      tertiary: COLORS.TEXT_MUTED,
      disabled: COLORS.TEXT_DISABLED,
      inverse: COLORS.WHITE,
    },
    
    border: {
      light: COLORS.NEUTRAL_LIGHT,
      default: COLORS.NEUTRAL_BORDER,
      heavy: COLORS.NEUTRAL_DARK,
      focus: COLORS.PRIMARY,
    },
    
    shadows: {
      sm: SHADOWS.sm,
      md: SHADOWS.md,
      lg: SHADOWS.lg,
      xl: SHADOWS.xl,
    },
    
    overlay: {
      light: 'rgba(0, 0, 0, 0.1)',
      medium: 'rgba(0, 0, 0, 0.3)',
      heavy: 'rgba(0, 0, 0, 0.5)',
    },
  },
};