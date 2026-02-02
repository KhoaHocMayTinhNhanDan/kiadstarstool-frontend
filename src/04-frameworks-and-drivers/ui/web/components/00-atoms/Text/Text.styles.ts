import { css } from '@emotion/react';
import { COLORS, FONT_SIZES, FONT_WEIGHTS } from '../00-core/tokens-constants';
import type { TextProps, TextVariant } from './Text.types';

const variantStyles: Record<TextVariant, ReturnType<typeof css>> = {
  'heading-2xl': css`
    font-size: ${FONT_SIZES['2xl']};
    font-weight: ${FONT_WEIGHTS.bold};
  `,
  'heading-xl': css`
    font-size: ${FONT_SIZES.xl};
    font-weight: ${FONT_WEIGHTS.bold};
  `,
  'heading-lg': css`
    font-size: ${FONT_SIZES.lg};
    font-weight: ${FONT_WEIGHTS.bold};
  `,
  'heading-md': css`
    font-size: ${FONT_SIZES.md};
    font-weight: ${FONT_WEIGHTS.semibold};
  `,
  'heading-sm': css`
    font-size: ${FONT_SIZES.sm};
    font-weight: ${FONT_WEIGHTS.semibold};
  `,
  'body-lg': css`
    font-size: ${FONT_SIZES.lg};
    font-weight: ${FONT_WEIGHTS.normal};
  `,
  'body-md': css`
    font-size: ${FONT_SIZES.md};
    font-weight: ${FONT_WEIGHTS.normal};
  `,
  'body-sm': css`
    font-size: ${FONT_SIZES.sm};
    font-weight: ${FONT_WEIGHTS.normal};
  `,
  caption: css`
    font-size: ${FONT_SIZES.xs};
    font-weight: ${FONT_WEIGHTS.normal};
    color: ${COLORS.SECONDARY};
  `,
  code: css`
    font-family: 'monospace';
    font-size: ${FONT_SIZES.sm};
    background-color: ${COLORS.LIGHT};
    padding: 2px 4px;
    border-radius: 4px;
  `,
};

export const getTextStyles = ({
  variant,
  size,
  weight,
  color = 'TEXT',
  align = 'left',
  truncate = false,
  lineHeight,
}: Partial<TextProps<'p'>>) => { // Use a default element for styling props
  // Xử lý màu: Nếu là key trong COLORS thì lấy giá trị, không thì dùng nguyên chuỗi (hex/rgb)
  const colorValue = color && color in COLORS ? COLORS[color as keyof typeof COLORS] : color;

  return css`
    margin: 0;
    font-family: inherit;
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

    /* Ưu tiên variant, nếu không có thì fallback về size/weight */
    ${variant ? variantStyles[variant] : css`
      font-size: ${FONT_SIZES[size || 'md']};
      font-weight: ${FONT_WEIGHTS[weight || 'normal']};
    `}
  `;
};