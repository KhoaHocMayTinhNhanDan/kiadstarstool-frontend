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
      // Tách các props style ra khỏi props HTML
      display, flexDirection, alignItems, justifyContent, flexWrap, flex, gap,
      w, h, minW, maxW, minH, maxH,
      m, mt, mr, mb, ml, mx, my,
      p, pt, pr, pb, pl, px, py,
      bg, border, radius,
      ...rest // rest bây giờ chỉ chứa các attribute HTML hợp lệ (onClick, id, title...)
    } = props;

    const Component = as || 'div';

    // Group style props to pass to getBoxStyles
    const styleProps = {
      display, flexDirection, alignItems, justifyContent, flexWrap, flex, gap,
      w, h, minW, maxW, minH, maxH,
      m, mt, mr, mb, ml, mx, my,
      p, pt, pr, pb, pl, px, py,
      bg, border, radius,
    };

    return (
      <Component
        ref={ref}
        css={[getBoxStyles(styleProps), sx]}
        className={className}
        {...rest} // Pass remaining props (onClick, id, etc.) to the DOM element
      >
        {children}
      </Component>
    );
  }
);

Box.displayName = 'Box';
