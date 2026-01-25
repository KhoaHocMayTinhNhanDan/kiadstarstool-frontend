import type { BoxStyleProps } from './Box.types';

const styleKeys = new Set([
  'm', 'mt', 'mr', 'mb', 'ml', 'mx', 'my',
  'p', 'pt', 'pr', 'pb', 'pl', 'px', 'py',
  'w', 'h', 'bg', 'color', 'minW', 'maxW', 'minH', 'maxH',
  'display', 'flexDirection', 'alignItems', 'justifyContent', 'gap', 'flexWrap', 'flex'
]);

export const splitBoxProps = (props: any) => {
  const styleProps: any = {};
  const restProps: any = {};

  Object.keys(props).forEach(key => {
    if (styleKeys.has(key)) {
      styleProps[key] = props[key];
    } else {
      restProps[key] = props[key];
    }
  });

  return { styleProps, restProps };
};