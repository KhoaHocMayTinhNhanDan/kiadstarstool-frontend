import type { CSSObject } from '@emotion/react';
import type { TextareaHTMLAttributes } from 'react';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * If `true`, the textarea will take up the full width of its container.
   * @deprecated Layout should be handled by the parent container or wrapper. This prop is kept for backward compatibility.
   */
  fullWidth?: boolean;
  error?: boolean | string;
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';
  /** Custom styles using Emotion CSSObject */
  sx?: CSSObject;
}