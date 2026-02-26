/** @jsxImportSource @emotion/react */
import React from 'react';
import { getBoxStyles } from './Box.styles';
import type { BoxProps } from './Box.types';

export const Box = React.forwardRef(
  <T extends React.ElementType = 'div'>(
    props: BoxProps<T>,
    ref: React.Ref<any>
  ) => {
    const {
      as,
      sx,
      className,
      children,
      // Destructure all style-related props to separate them from standard HTML attributes
      display, flexDirection, alignItems, justifyContent, flexWrap, flex, gap,
      w, h, minW, maxW, minH, maxH,
      m, mt, mr, mb, ml, mx, my,
      p, pt, pr, pb, pl, px, py,
      bg, border, radius, color,
      ...rest // `rest` now only contains valid HTML attributes (e.g., onClick, id, title)
    } = props;

    const Component = as || 'div';

    // Group all style props to pass them to the style generation function
    const styleProps = {
      display, flexDirection, alignItems, justifyContent, flexWrap, flex, gap,
      w, h, minW, maxW, minH, maxH,
      m, mt, mr, mb, ml, mx, my,
      p, pt, pr, pb, pl, px, py,
      bg, border, radius, color,
    };

    return (
      <Component
        ref={ref}
        css={[getBoxStyles(styleProps), sx]}
        className={className}
        {...rest} // Pass only the remaining valid HTML attributes to the DOM element
      >
        {children}
      </Component>
    );
  }
);

Box.displayName = 'Box';
