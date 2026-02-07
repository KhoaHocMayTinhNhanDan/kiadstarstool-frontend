// src/04-frameworks-and-drivers/ui/web/components/02-organisms/settings/SettingsForm/SettingsForm.types.ts
import type { SerializedStyles } from '@emotion/react';

export type SettingFieldType = 
  | 'text' 
  | 'email' 
  | 'password' 
  | 'textarea' 
  | 'switch' 
  | 'select';

export interface SettingOption {
  label: string;
  value: string | number | boolean;
}

export interface SettingField {
  /** Unique ID cho field (dùng làm key trong values object) */
  id: string;
  /** Label hiển thị */
  label: string;
  /** Mô tả chi tiết bên dưới label */
  description?: string;
  /** Loại input */
  type: SettingFieldType;
  /** Placeholder text */
  placeholder?: string;
  /** Giá trị mặc định */
  defaultValue?: any;
  /** Options cho select */
  options?: SettingOption[];
  /** Trạng thái disabled */
  disabled?: boolean;
  /** Bắt buộc nhập */
  required?: boolean;
  /** Hàm validate custom */
  validation?: (value: any) => string | undefined;
}

export interface SettingSection {
  id: string;
  title: string;
  description?: string;
  fields: SettingField[];
}

export interface SettingsFormProps {
  sections: SettingSection[];
  initialValues?: Record<string, any>;
  onSave?: (values: Record<string, any>) => Promise<void> | void;
  onCancel?: () => void;
  isLoading?: boolean;
  className?: string;
  sx?: SerializedStyles;
  testId?: string;
}