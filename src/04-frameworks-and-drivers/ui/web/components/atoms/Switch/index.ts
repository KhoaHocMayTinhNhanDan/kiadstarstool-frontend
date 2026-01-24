// src/04-frameworks-and-drivers/ui/web/components/atoms/Switch/index.ts
// Simple version matching Chip component pattern

// Export components
export { Switch, SwitchGroup } from './Switch';

// Export types
export type { 
  SwitchProps, 
  SwitchGroupProps, 
  SwitchSize, 
  SwitchVariant, 
  SwitchLabelPosition 
} from './Switch.types';

// Export constants
export {
  SWITCH_CONFIG,
  SWITCH_SIZES,
  SWITCH_VARIANTS,
  SWITCH_SIZE_CONFIG,
  SWITCH_VARIANT_CONFIG,
  SWITCH_ICON_CONFIG,
} from './Switch.constants';

// Export additional types from constants
export type { SwitchIconType } from './Switch.constants';