// src/04-frameworks-and-drivers/ui/web/components/02-organisms/navigation/AppFooter/AppFooter.types.ts
import type { ReactNode } from 'react';
import type { SerializedStyles } from '@emotion/react';

export interface FooterLink {
  /** Text hiển thị */
  label: string;
  /** URL destination */
  href: string;
  /** Link target - dùng tổng quát HTML target values */
  target?: '_blank' | '_self' | '_parent' | '_top';
  /** ARIA label nếu cần override */
  ariaLabel?: string;
  /** Icon (ReactNode) */
  icon?: ReactNode;
  /** Custom rel attribute */
  rel?: string;
}

export interface AppFooterProps {
  /** Nội dung copyright */
  copyright?: ReactNode;
  /** Danh sách links */
  links?: FooterLink[];
  /** Nội dung phụ (version, disclaimer, etc.) */
  children?: ReactNode;
  /** Test ID cho testing */
  testId?: string;
  /** Custom className */
  className?: string;
  /** Custom styles */
  sx?: SerializedStyles;
}