/** @jsxImportSource @emotion/react */
import React from 'react';
import { getTextStyles } from './Text.styles';
import type { TextProps } from './Text.types';

function TextInner<T extends React.ElementType = 'p'>(
  {
    as,
    sx,
    // Destructure all custom styling props to prevent them from being passed to the DOM
    variant,
    size,
    weight,
    color,
    align,
    truncate,
    lineHeight,
    ...rest // `rest` now only contains valid HTML attributes
  }: TextProps<T>,
  ref: React.Ref<any>
) {
  const Component = as || 'p';

  return (
    <Component
      ref={ref}
      css={[
        getTextStyles({ variant, size, weight, color, align, truncate, lineHeight }),
        sx,
      ]}
      {...rest}
    />
  );
}

export const Text = React.forwardRef(TextInner) as <
  T extends React.ElementType = 'p'
>(
  props: TextProps<T> & { ref?: React.Ref<any> }
) => React.ReactElement;


(Text as any).displayName  = 'Text';
