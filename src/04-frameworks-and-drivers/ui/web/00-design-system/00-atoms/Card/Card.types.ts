import type { BoxProps } from '../Box';

// CardProps kế thừa tất cả props từ BoxProps, cho phép nó nhận onClick, sx, v.v.
export type CardProps = BoxProps<'div'> & {
  /** Màu của hiệu ứng gợn sóng khi click. Mặc định: rgba(0, 0, 0, 0.1) */
  rippleColor?: string;
};