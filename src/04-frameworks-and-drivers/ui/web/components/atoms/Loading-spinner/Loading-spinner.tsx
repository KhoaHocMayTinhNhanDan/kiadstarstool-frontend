/** @jsxImportSource @emotion/react */
import React from 'react';
import { getSpinnerStyles } from './Loading-spinner.styles';

export type LoadingSpinnerSize = 'sm' | 'md' | 'lg' | 'xl';
export type LoadingSpinnerVariant = 'primary' | 'secondary' | 'white' | 'neutral';

export interface LoadingSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: LoadingSpinnerSize;
  variant?: LoadingSpinnerVariant;
}

export const LoadingSpinner = ({ size = 'md', variant = 'primary', className, ...props }: LoadingSpinnerProps) => {
  return (
    <div
      css={getSpinnerStyles(size, variant)}
      className={className}
      role="status"
      aria-label="loading"
      {...props}
    />
  );
};