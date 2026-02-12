// src/04-frameworks-and-drivers/ui/web/components/02-organisms/navigation/Tabs/Tabs.types.ts
import type { ReactNode } from 'react';
import type { SerializedStyles } from '@emotion/react';

export type TabsVariant = 'line' | 'pills' | 'enclosed';
export type TabsOrientation = 'horizontal' | 'vertical';
export type TabsSize = 'sm' | 'md' | 'lg';

export interface TabItem {
  /** Unique ID cho tab */
  id: string;
  /** Label hiển thị */
  label: ReactNode;
  /** Icon hiển thị trước label */
  icon?: ReactNode;
  /** Trạng thái disabled */
  disabled?: boolean;
  /** Nội dung của tab (Render khi tab active) */
  content?: ReactNode;
  /** Badge hiển thị số lượng hoặc trạng thái */
  badge?: ReactNode;
}

export interface TabsProps {
  /** Danh sách các tabs */
  items: TabItem[];

  /** ID của tab đang active (Controlled) */
  activeTabId?: string;

  /** ID của tab mặc định (Uncontrolled) */
  defaultActiveTabId?: string;

  /** Callback khi thay đổi tab */
  onChange?: (tabId: string) => void;

  /** Kiểu hiển thị (Mặc định: 'line') */
  variant?: TabsVariant;

  /** Hướng hiển thị (Mặc định: 'horizontal') */
  orientation?: TabsOrientation;

  /** Kích thước (Mặc định: 'md') */
  size?: TabsSize;

  /** Tabs chiếm hết chiều rộng container */
  fullWidth?: boolean;

  /** Custom class name */
  className?: string;

  /** Emotion styles */
  sx?: SerializedStyles;

  /** Test ID */
  testId?: string;
}