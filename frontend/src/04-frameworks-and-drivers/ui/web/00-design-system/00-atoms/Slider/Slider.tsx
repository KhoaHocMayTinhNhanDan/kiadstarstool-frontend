/** @jsxImportSource @emotion/react */
import React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { 
  getSliderRootStyles, 
  getSliderTrackStyles, 
  getSliderRangeStyles, 
  sliderThumbStyles, 
  sliderWrapper, 
  errorTextStyles 
} from './Slider.styles';
import type { SliderProps } from './Slider.types';

export const Slider = React.forwardRef<React.ElementRef<typeof SliderPrimitive.Root>, SliderProps>(
  ({ error, sx, className, ...props }, ref) => {
    const hasError = Boolean(error);

    return (
      <div css={sliderWrapper} className={className}>
        <SliderPrimitive.Root
          ref={ref}
          css={[getSliderRootStyles(hasError), sx]}
          {...props}
        >
          <SliderPrimitive.Track css={getSliderTrackStyles(hasError)}>
            <SliderPrimitive.Range css={getSliderRangeStyles(hasError)} />
          </SliderPrimitive.Track>
          <SliderPrimitive.Thumb css={sliderThumbStyles} />
        </SliderPrimitive.Root>

        {typeof error === 'string' && (
          <div css={errorTextStyles} role="alert">
            {error}
          </div>
        )}
      </div>
    );
  }
);

Slider.displayName = 'Slider';