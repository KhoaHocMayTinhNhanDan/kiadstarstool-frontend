// src/04-frameworks-and-drivers/ui/web/components/atoms/Button/Button.types.ts
import type { CSSObject } from '@emotion/react';
import type { ElementType, ReactNode } from 'react';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost';

export type ButtonIntent = 'default' | 'success' | 'danger' | 'warning';

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type ButtonOwnProps<T extends ElementType = 'button'> = {
  as?: T;
  variant?: ButtonVariant;
  size?: ButtonSize;
  intent?: ButtonIntent;
  isLoading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  sx?: CSSObject;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children?: ReactNode;
};

export type ButtonProps<T extends ElementType = 'button'> =
  ButtonOwnProps<T> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof ButtonOwnProps<T> | 'as'>;

export type PolymorphicRef<T extends ElementType> =
  React.ComponentPropsWithRef<T>['ref'];
