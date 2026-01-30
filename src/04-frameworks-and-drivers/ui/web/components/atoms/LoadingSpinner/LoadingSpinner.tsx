/** @jsxImportSource @emotion/react */
import { spinnerStyles } from './LoadingSpinner.styles';
import type { LoadingSpinnerProps } from './LoadingSpinner.types';

export const LoadingSpinner = ({ size = 'md', color, sx, ...props }: LoadingSpinnerProps) => {
  return (
    <div css={[spinnerStyles(size, color), sx]} role="status" aria-label="loading" {...props} />
  );
};

LoadingSpinner.displayName = 'LoadingSpinner';