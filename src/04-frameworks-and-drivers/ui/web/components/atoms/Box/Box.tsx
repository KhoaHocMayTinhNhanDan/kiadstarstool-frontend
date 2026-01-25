/** @jsxImportSource @emotion/react */
import React, { forwardRef } from 'react';
import type { ElementType } from 'react';
import clsx from 'clsx';

import { createBoxStyles } from './Box.styles';
import { splitBoxProps } from './Box.utils';
import type { BoxProps } from './Box.types';

export const Box = forwardRef(<T extends ElementType = 'div'>(
  props: BoxProps<T>,
  ref: React.Ref<any>
) => {
  const {
    as,
    children,
    className,
    style,
    ...rest
  } = props;

  const Component = (as ?? 'div') as ElementType;

  const { styleProps, restProps } = splitBoxProps(rest);

  return (
    <Component
      ref={ref}
      css={createBoxStyles(styleProps)}
      className={clsx(className)}
      style={style}
      {...restProps}
    >
      {children}
    </Component>
  );
});

Box.displayName = 'Box';