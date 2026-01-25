// src/04-frameworks-and-drivers/ui/web/components/atoms/Switch/Switch.tsx
/** @jsxImportSource @emotion/react */
import React from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import { getSwitchRootStyles, getSwitchThumbStyles } from './Switch.styles';

export type SwitchSize = 'sm' | 'md' | 'lg';
export type SwitchVariant = 'primary' | 'success' | 'danger' | 'neutral';

export interface SwitchProps extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {
  size?: SwitchSize;
  variant?: SwitchVariant;
}

export const Switch = ({ 
  size = 'md', 
  variant = 'primary', 
  className,
  ...props 
}: SwitchProps) => {
  return (
    <SwitchPrimitive.Root
      css={getSwitchRootStyles(size, variant)}
      className={className}
      {...props}
    >
      <SwitchPrimitive.Thumb css={getSwitchThumbStyles(size)} />
    </SwitchPrimitive.Root>
  );
};
