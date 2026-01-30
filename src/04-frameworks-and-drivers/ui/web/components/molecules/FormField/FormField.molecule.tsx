// src/04-frameworks-and-drivers/ui/web/components/molecules/FormField/FormField.molecule.tsx
/** @jsxImportSource @emotion/react */
import React, { useId, isValidElement, cloneElement } from 'react';
import { Box } from '../../atoms/Box';
import { Text } from '../../atoms/Text';
import * as styles from './FormField.molecule.styles';
import type { FormFieldProps } from './FormField.types';

export const FormField = ({
  label,
  error,
  helperText,
  required,
  id,
  children,
  className,
  disabled = false,
  sx,
  orientation = 'vertical',
}: FormFieldProps) => {
  const isHorizontal = orientation === 'horizontal';
  const generatedId = useId();
  const fieldId = id ?? generatedId;

  const control =
    isValidElement(children)
      ? cloneElement(children as React.ReactElement<any>, {
          id: fieldId,
          disabled,
        })
      : children;

  return (
    <Box css={[styles.container(isHorizontal), sx]} className={className}>
      {label && (
        <Text
          as="label"
          htmlFor={fieldId}
          css={styles.label(isHorizontal, disabled)}
        >
          {label}
          {required && (
            <Text as="span" color="DANGER">
              {' '}*
            </Text>
          )}
        </Text>
      )}

      <Box css={styles.control}>
        {control}

        <Box css={styles.messageSlot}>
          {error ? (
            <Text size="xs" css={styles.errorText} role="alert">
              {error}
            </Text>
          ) : helperText ? (
            <Text size="xs" css={styles.helperText}>
              {helperText}
            </Text>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
};

FormField.displayName = 'FormField';
export default FormField;
