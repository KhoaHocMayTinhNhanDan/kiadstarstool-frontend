// src/04-frameworks-and-drivers/ui/web/components/atoms/Button/Button.tsx
/** @jsxImportSource @emotion/react */
import React from 'react';
import { getButtonStyles } from './Button.styles';
import { LoadingSpinner } from '../LoadingSpinner';
import type { ButtonProps, PolymorphicRef } from './Button.types';
import type { SpinnerSize } from '../LoadingSpinner/';
import type { ButtonSize } from './Button.types';

/* ================= Spinner size map ================= */

const buttonSpinnerSizeMap: Record<ButtonSize, SpinnerSize> = {
  xs: 'xs',
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl',
};

function ButtonInner<T extends React.ElementType = 'button'>(
  props: ButtonProps<T>,
  ref: PolymorphicRef<T>
) {
  const {
    as,
    variant = 'primary',
    intent = 'default',
    size = 'md',
    isLoading = false,
    disabled = false,
    fullWidth = false,
    sx,
    leftIcon,
    rightIcon,
    children,
    ...rest
  } = props;

  const Component = as || 'button';
  const isButton = Component === 'button';
  const isDisabled = disabled || isLoading;
  const spinnerSize = buttonSpinnerSizeMap[size];

  return (
    <Component
      ref={ref}
      css={[getButtonStyles(variant, intent, size, fullWidth, isLoading), sx]}
      {...(isButton
        ? { type: 'button', disabled: isDisabled }
        : {
            role: 'button',
            'aria-disabled': isDisabled,
            tabIndex: isDisabled ? -1 : 0,
          })}
      aria-busy={isLoading || undefined}
      {...rest}
    >
      <span className="btn-content">
        {isLoading && <LoadingSpinner size={spinnerSize} color="currentColor" />}
        {!isLoading &&
          leftIcon &&
          React.cloneElement(leftIcon as React.ReactElement, { size: spinnerSize })}
        {!isLoading && children}
        {!isLoading &&
          rightIcon &&
          React.cloneElement(rightIcon as React.ReactElement, { size: spinnerSize })}
      </span>
    </Component>
  );
}

type ButtonComponent = <T extends React.ElementType = 'button'>(
  props: ButtonProps<T> & { ref?: PolymorphicRef<T> }
) => React.ReactElement | null;

export const Button = React.forwardRef(
  ButtonInner as unknown as (
    props: ButtonProps<any>,
    ref: React.Ref<any>
  ) => React.ReactElement | null
) as ButtonComponent;

(Button as React.ForwardRefExoticComponent<any>).displayName = 'Button';
