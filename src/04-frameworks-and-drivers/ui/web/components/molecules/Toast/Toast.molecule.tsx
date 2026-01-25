/** @jsxImportSource @emotion/react */
import React from 'react';
import * as ToastPrimitive from '@radix-ui/react-toast';
import { viewportStyles, getRootStyles } from './Toast.molecule.styles';
import { Text } from '../../atoms/Text';

export const ToastProvider = ToastPrimitive.Provider;
export const ToastViewport = () => <ToastPrimitive.Viewport css={viewportStyles} />;

export interface ToastProps extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root> {
  variant?: 'success' | 'error' | 'info' | 'warning' | 'default';
}

export const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Root>,
  ToastProps
>(({ variant = 'default', ...props }, ref) => (
  <ToastPrimitive.Root ref={ref} css={getRootStyles(variant)} {...props} />
));

export const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Title>
>(({ ...props }, ref) => (
  <ToastPrimitive.Title ref={ref} asChild>
    <Text weight="medium" size="sm" {...props} />
  </ToastPrimitive.Title>
));

export const ToastDescription = ToastPrimitive.Description;
export const ToastAction = ToastPrimitive.Action;
export const ToastClose = ToastPrimitive.Close;