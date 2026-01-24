/* ==========================================================================
 * Box Styles Generator
 * ========================================================================== */

import { SPACING, COLORS } from '../00-core';
import type { BoxStyleProps, ResponsiveValue } from './Box.types';

// Giả định bạn có hàm này trong responsive-values.utils.ts
// Nếu chưa có, dùng implementation đơn giản dưới đây
import { resolveResponsiveValue } from '../00-core/utils/responsive/responsive-values.utils';

// Nếu chưa có hàm resolveResponsiveValue, dùng tạm cái này (cải tiến sau)
function resolveResponsiveValue<T>(
  value: ResponsiveValue<T> | undefined,
  defaultValue?: T
): T | undefined {
  if (!value) return defaultValue;
  if (typeof value !== 'object') return value as T;
  // Logic responsive thực tế cần dùng media query hoặc theme context
  // Ở đây tạm trả base (bạn nên nâng cấp bằng useBreakpoint hoặc css variables)
  return (value as any).base ?? defaultValue;
}

export function createBoxStyles(props: BoxStyleProps): React.CSSProperties {
  const styles: React.CSSProperties = {};

  // Spacing (hỗ trợ responsive object)
  const addSpacing = (cssProp: keyof React.CSSProperties, value?: ResponsiveValue<SpacingKey>) => {
    const resolved = resolveResponsiveValue(value);
    if (resolved) {
      styles[cssProp] = SPACING[resolved];
    }
  };

  addSpacing('padding', props.p);
  addSpacing('paddingInline', props.px);
  addSpacing('paddingBlock', props.py);
  addSpacing('paddingTop', props.pt);
  addSpacing('paddingRight', props.pr);
  addSpacing('paddingBottom', props.pb);
  addSpacing('paddingLeft', props.pl);

  addSpacing('margin', props.m);
  addSpacing('marginInline', props.mx);
  addSpacing('marginBlock', props.my);
  addSpacing('marginTop', props.mt);
  addSpacing('marginRight', props.mr);
  addSpacing('marginBottom', props.mb);
  addSpacing('marginLeft', props.ml);
  addSpacing('gap', props.gap);

  // Colors
  if (props.bg) styles.backgroundColor = COLORS[props.bg];
  if (props.color) styles.color = COLORS[props.color];

  // Các prop CSS trực tiếp
  Object.assign(styles, {
    width: props.width,
    height: props.height,
    display: props.display,
    position: props.position,
    top: props.top,
    right: props.right,
    bottom: props.bottom,
    left: props.left,
    zIndex: props.zIndex,
    flex: props.flex,
    flexDirection: props.flexDirection,
    // ... thêm các prop khác nếu cần
  });

  return styles;
}