/** @jsxImportSource @emotion/react */
import React from 'react';
import { getChipStyles, getDeleteIconStyles } from './Chip.styles';
import { Icon } from '../Icon/Icon';

export type ChipVariant = 'filled' | 'outlined' | 'ghost';
export type ChipColor = 'primary' | 'success' | 'danger' | 'warning' | 'neutral';

export interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  label: string;
  variant?: ChipVariant;
  color?: ChipColor;
  icon?: React.ReactNode;
  onDelete?: () => void;
  onClick?: () => void;
}

export const Chip = ({ 
  label, 
  variant = 'filled', 
  color = 'neutral', 
  icon, 
  onDelete, 
  onClick,
  className,
  ...props 
}: ChipProps) => {
  return (
    <span 
      css={getChipStyles(variant, color, !!onClick)} 
      className={className}
      onClick={onClick}
      {...props}
    >
      {icon && <span style={{ marginRight: 4, display: 'flex' }}>{icon}</span>}
      {label}
      {onDelete && (
        <span css={getDeleteIconStyles()} onClick={(e) => { e.stopPropagation(); onDelete(); }}>
          <Icon size="xs"><svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg></Icon>
        </span>
      )}
    </span>
  );
};