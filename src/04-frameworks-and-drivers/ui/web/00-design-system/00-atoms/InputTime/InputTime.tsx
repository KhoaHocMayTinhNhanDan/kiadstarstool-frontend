// d:\DEV\learning\kiadstarstool-frontend\src\04-frameworks-and-drivers\ui\web\00-design-system\00-atoms\InputTime\InputTime.tsx
/** @jsxImportSource @emotion/react */
import React from 'react';
import {
  wrapper,
  labelText,
  container,
  selectStyles,
  separator,
  errorText,
} from './InputTime.styles';
import type { InputTimeProps } from './InputTime.types';

export const InputTime = React.forwardRef<HTMLDivElement, InputTimeProps>(
  (
    {
      value,
      onChange,
      label,
      size = 'md',
      error,
      disabled,
      minuteStep = 15,
      className,
      sx,
      ...props
    },
    ref
  ) => {
    // Parse giá trị hiện tại, fallback về 00:00 nếu lỗi hoặc rỗng
    const safeValue = value && value.includes(':') ? value : '00:00';
    const [h, m] = safeValue.split(':');

    // Tạo danh sách giờ (00-23)
    const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
    
    // Tạo danh sách phút theo bước nhảy
    const minutes = [];
    for (let i = 0; i < 60; i += minuteStep) {
      minutes.push(i.toString().padStart(2, '0'));
    }

    const handleChange = (type: 'h' | 'm', val: string) => {
      if (type === 'h') {
        onChange(`${val}:${m}`);
      } else {
        onChange(`${h}:${val}`);
      }
    };

    const hasError = Boolean(error);

    return (
      <div css={[wrapper, sx]} className={className} ref={ref}>
        {label && <label css={labelText}>{label}</label>}
        <div css={container}>
          <select
            value={h}
            disabled={disabled}
            onChange={(e) => handleChange('h', e.target.value)}
            css={selectStyles({ size, error: hasError, disabled })}
            {...props}
          >
            {hours.map((hour) => (
              <option key={hour} value={hour}>
                {hour}
              </option>
            ))}
          </select>
          <span css={separator(disabled)}>:</span>
          <select
            value={m}
            disabled={disabled}
            onChange={(e) => handleChange('m', e.target.value)}
            css={selectStyles({ size, error: hasError, disabled })}
            {...props}
          >
            {minutes.map((min) => (
              <option key={min} value={min}>
                {min}
              </option>
            ))}
          </select>
        </div>
        {typeof error === 'string' && <div css={errorText}>{error}</div>}
      </div>
    );
  }
);

InputTime.displayName = 'InputTime';
export default InputTime;
