/** @jsxImportSource @emotion/react */
import React from 'react';
import { getBoxStyles } from './Box.styles';
import type { BoxProps } from './Box.types';

export const Box = React.forwardRef(
  <T extends React.ElementType = 'div'>(
    { as, sx, className, children, ...rest }: BoxProps<T>,
    ref: React.Ref<any>
  ) => {
    const Component = as || 'div';

    return (
      <Component
        ref={ref}
        css={[getBoxStyles(rest), sx]}
        className={className}
      >
        {children}
      </Component>
    );
  }
);

Box.displayName = 'Box';
