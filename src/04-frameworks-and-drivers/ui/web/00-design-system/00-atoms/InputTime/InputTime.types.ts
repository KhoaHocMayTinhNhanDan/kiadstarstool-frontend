// d:\DEV\learning\kiadstarstool-frontend\src\04-frameworks-and-drivers\ui\web\00-design-system\00-atoms\InputTime\InputTime.types.ts
import type { SelectHTMLAttributes } from 'react';
import type { SerializedStyles } from '@emotion/react';

export type InputTimeSize = 'sm' | 'md' | 'lg';

export interface InputTimeProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size' | 'onChange' | 'value'> {
  value: string; // Format: HH:mm
  onChange: (value: string) => void;
  label?: string;
  size?: InputTimeSize;
  error?: string | boolean;
  disabled?: boolean;
  minuteStep?: number; // Bước nhảy phút (mặc định 15)
  sx?: SerializedStyles;
  className?: string;
}
