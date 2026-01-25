/** @jsxImportSource @emotion/react */
import React, { forwardRef } from 'react';
import { getTextareaStyles, getTextareaWrapperStyles, getErrorMessageStyles } from './Textarea.styles';

export type TextareaSize = 'sm' | 'md' | 'lg';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  size?: TextareaSize;
  fullWidth?: boolean;
  error?: boolean | string;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ 
    size = 'md', 
    fullWidth = false, 
    error, 
    resize = 'vertical', 
    className, 
    style, 
    ...props 
  }, ref) => {
    const hasError = !!error;
    const errorMessage = typeof error === 'string' ? error : null;

    return (
      <div css={getTextareaWrapperStyles(fullWidth)} className={className} style={style}>
        <textarea
          ref={ref}
          css={getTextareaStyles(size, hasError, resize)}
          {...props}
        />
        {errorMessage && <span css={getErrorMessageStyles()}>{errorMessage}</span>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';