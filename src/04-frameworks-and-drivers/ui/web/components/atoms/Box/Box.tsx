import React, { forwardRef, memo } from 'react';
import type { ElementType } from 'react';
import clsx from 'clsx';

import { createBoxStyles } from './Box.styles';
import { splitBoxProps } from './Box.utils';
import type { BoxProps } from './Box.types';

export const Box = memo(forwardRef(<T extends ElementType = 'div'>(
  props: BoxProps<T>,
  ref: ForwardedRef<any>
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

  const boxStyles = React.useMemo(
    () => createBoxStyles(styleProps),
    [styleProps]
  );

  return (
    <Component
      ref={ref}
      {...restProps}
      className={clsx(className)}
      style={{ ...boxStyles, ...style }}
      data-testid={props['data-testid']}
    >
      {children}
    </Component>
  );
}));

Box.displayName = 'Box';