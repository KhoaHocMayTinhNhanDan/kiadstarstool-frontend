/** @jsxImportSource @emotion/react */
import React from 'react';
import { getCodeStyles } from './Code.styles';
import type { CodeProps } from './Code.types';

export const Code = React.forwardRef<HTMLElement, CodeProps>(
  ({ children, block = false, sx, className, ...props }, ref) => {
    const Component = block ? 'pre' : 'code';

    return (
      <Component
        ref={ref as any}
        css={[getCodeStyles(block), sx]}
        className={className}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Code.displayName = 'Code';