/** @jsxImportSource @emotion/react */
import React from 'react';
import { Box } from '../../atoms/Box';
import { Text } from '../../atoms/Text';
import { SPACING } from '../../atoms/00-core/tokens-constants';

export interface FormFieldProps {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  id?: string; // Để link label với input
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export const FormField = ({ 
  label, 
  error, 
  helperText,
  required, 
  id, 
  children,
  className,
  disabled
}: FormFieldProps) => {
  return (
    <Box display="flex" flexDirection="column" gap={SPACING.xs} className={className}>
      {label && (
        <Text 
          as="label" 
          {...({ htmlFor: id } as any)}
          size="sm" 
          weight="medium" 
          color={disabled ? 'SECONDARY' : 'TEXT'} 
          style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
        >
          {label} {required && <Text as="span" color="DANGER">*</Text>}
        </Text>
      )}
      
      {children}
      
      {error ? (
        <Text size="xs" color="DANGER" role="alert">{error}</Text>
      ) : helperText ? (
        <Text size="xs" color="SECONDARY">{helperText}</Text>
      ) : null}
    </Box>
  );
};