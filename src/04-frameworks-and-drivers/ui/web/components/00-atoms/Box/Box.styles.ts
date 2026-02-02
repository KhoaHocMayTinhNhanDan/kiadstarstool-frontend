import { css } from '@emotion/react';
import { SPACING, RADIUS, COLORS } from '../00-core/tokens-constants';
import type { BoxOwnProps } from './Box.types';

const getSpacing = (v?: string | number) => {
  if (v == null) return undefined;
  if (typeof v === 'string' && v in SPACING) return SPACING[v as keyof typeof SPACING];
  if (typeof v === 'number') return `${v}px`;
  return v;
};

export const getBoxStyles = (props: BoxOwnProps) => css`
  box-sizing: border-box;
  display: ${props.display ?? 'block'};

  flex-direction: ${props.flexDirection};
  align-items: ${props.alignItems};
  justify-content: ${props.justifyContent};
  flex-wrap: ${props.flexWrap};
  flex: ${props.flex};
  gap: ${getSpacing(props.gap)};

  width: ${props.w};
  height: ${props.h};
  min-width: ${props.minW};
  max-width: ${props.maxW};
  min-height: ${props.minH};
  max-height: ${props.maxH};

  ${props.m != null && `margin: ${getSpacing(props.m)};`}
  ${props.mx != null && `
    margin-left: ${getSpacing(props.mx)};
    margin-right: ${getSpacing(props.mx)};
  `}
  ${props.my != null && `
    margin-top: ${getSpacing(props.my)};
    margin-bottom: ${getSpacing(props.my)};
  `}
  margin-top: ${getSpacing(props.mt)};
  margin-right: ${getSpacing(props.mr)};
  margin-bottom: ${getSpacing(props.mb)};
  margin-left: ${getSpacing(props.ml)};

  padding: ${getSpacing(props.p)};
  padding-top: ${getSpacing(props.pt ?? props.py)};
  padding-bottom: ${getSpacing(props.pb ?? props.py)};
  padding-left: ${getSpacing(props.pl ?? props.px)};
  padding-right: ${getSpacing(props.pr ?? props.px)};

  background-color: ${props.bg && COLORS[props.bg as keyof typeof COLORS]};
  border: ${props.border};
  border-radius: ${props.radius && RADIUS[props.radius as keyof typeof RADIUS]};
`;
