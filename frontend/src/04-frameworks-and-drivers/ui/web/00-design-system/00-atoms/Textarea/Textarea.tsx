/** @jsxImportSource @emotion/react */
import React from 'react';
import { getTextareaStyles, textareaWrapper, errorTextStyles } from './Textarea.styles';
import type { TextareaProps } from './Textarea.types';

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ error, fullWidth, resize = 'vertical', disabled, readOnly, className, sx, ...props }, ref) => {
    const hasError = Boolean(error);

    return (
      <div css={textareaWrapper} className={className}>
        <textarea
          ref={ref}
          css={[
            getTextareaStyles({ error: hasError, disabled, readOnly, resize }),
            sx
          ]}
          disabled={disabled}
          readOnly={readOnly}
          aria-invalid={hasError}
          aria-readonly={readOnly}
          {...props}
        />
        
        {typeof error === 'string' && (
          <div css={errorTextStyles} role="alert">
            {error}
          </div>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';