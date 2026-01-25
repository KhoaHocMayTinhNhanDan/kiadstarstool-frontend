import { css } from '@emotion/react';
import { type BoxStyleProps } from './Box.types';

export const createBoxStyles = (props: BoxStyleProps) => {
  return css`
    margin: ${props.m};
    margin-top: ${props.mt ?? props.my};
    margin-right: ${props.mr ?? props.mx};
    margin-bottom: ${props.mb ?? props.my};
    margin-left: ${props.ml ?? props.mx};
    
    padding: ${props.p};
    padding-top: ${props.pt ?? props.py};
    padding-right: ${props.pr ?? props.px};
    padding-bottom: ${props.pb ?? props.py};
    padding-left: ${props.pl ?? props.px};
    
    display: ${props.display};
    flex-direction: ${props.flexDirection};
    align-items: ${props.alignItems};
    justify-content: ${props.justifyContent};
    gap: ${props.gap};
    flex-wrap: ${props.flexWrap};
    flex: ${props.flex};
    
    width: ${props.w};
    height: ${props.h};
    min-width: ${props.minW};
    max-width: ${props.maxW};
    min-height: ${props.minH};
    max-height: ${props.maxH};
    background-color: ${props.bg};
    color: ${props.color};
  `;
};