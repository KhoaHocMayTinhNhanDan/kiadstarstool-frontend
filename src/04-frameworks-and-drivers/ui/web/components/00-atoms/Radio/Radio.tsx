/** @jsxImportSource @emotion/react */
import React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { getRadioItemStyles, getRadioIndicatorStyles, getRadioGroupStyles, radioWrapper, errorTextStyles } from './Radio.styles';
import type { RadioProps, RadioGroupProps } from './Radio.types';

export const RadioGroup = React.forwardRef<React.ElementRef<typeof RadioGroupPrimitive.Root>, RadioGroupProps>(
  ({ sx, className, ...props }, ref) => {
    return (
      <RadioGroupPrimitive.Root ref={ref} css={[getRadioGroupStyles(), sx]} className={className} {...props} />
    );
  }
);

RadioGroup.displayName = 'RadioGroup';

export const Radio = React.forwardRef<React.ElementRef<typeof RadioGroupPrimitive.Item>, RadioProps>(
  ({ size = 'md', error, sx, className, ...props }, ref) => {
    const hasError = Boolean(error);

    return (
      <div css={radioWrapper} className={className}>
        <RadioGroupPrimitive.Item ref={ref} css={[getRadioItemStyles({ size, error: hasError }), sx]} {...props}>
          <RadioGroupPrimitive.Indicator css={getRadioIndicatorStyles()} />
        </RadioGroupPrimitive.Item>

        {typeof error === 'string' && (
          <div css={errorTextStyles} role="alert">
            {error}
          </div>
        )}
      </div>
    );
  }
);

Radio.displayName = 'Radio';