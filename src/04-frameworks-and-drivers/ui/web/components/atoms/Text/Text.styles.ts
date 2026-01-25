import { css } from '@emotion/react';
import { COLORS, FONT_SIZES, FONT_WEIGHTS } from '../00-core/tokens-constants';
import { type TextProps } from './Text';

export const getTextStyles = ({
  size = 'md',
  weight = 'normal',
  color = 'TEXT',
  align = 'left',
  truncate = false,
  lineHeight,
}: Partial<TextProps>) => {
  // Xử lý màu: Nếu là key trong COLORS thì lấy giá trị, không thì dùng nguyên chuỗi (hex/rgb)
  const colorValue = color && color in COLORS ? COLORS[color as keyof typeof COLORS] : color;

  return css`
    margin: 0;
    font-family: inherit;
    font-size: ${FONT_SIZES[size!]};
    font-weight: ${FONT_WEIGHTS[weight!]};
    color: ${colorValue};
    text-align: ${align};
    line-height: ${lineHeight || 1.5};

    ${truncate &&
    css`
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
    `}
  `;
};