// src/04-frameworks-and-drivers/ui/web/components/atoms/IconButton/IconButton.types.ts
import type { CSSObject } from '@emotion/react';
import type { ReactNode } from 'react';
import type { ButtonProps } from '../Button/Button.types';

export interface IconButtonProps
  extends Omit<ButtonProps<'button'>, 'children'> {
  icon: ReactNode;
  'aria-label': string;
  sx?: CSSObject;
}
