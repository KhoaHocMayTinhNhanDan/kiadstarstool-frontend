/** @jsxImportSource @emotion/react */
import React from 'react';
import { getLogoStyles } from './Logo.styles';

export type LogoSize = 'sm' | 'md' | 'lg' | 'xl';
export type LogoVariant = 'color' | 'white' | 'black';

export interface LogoProps extends React.SVGProps<SVGSVGElement> {
  size?: LogoSize;
  variant?: LogoVariant;
}

export const Logo = ({ size = 'md', variant = 'color', className, ...props }: LogoProps) => {
  return (
    <svg
      css={getLogoStyles(size, variant)}
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Placeholder Logo: A Star shape for "KiadStars" */}
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
    </svg>
  );
};