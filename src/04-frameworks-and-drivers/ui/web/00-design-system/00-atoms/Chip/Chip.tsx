/** @jsxImportSource @emotion/react */
import React from 'react';
import { getChipStyles, getDeleteIconStyles, chipWrapper } from './Chip.styles';
import { Icon } from '../Icon/Icon';
import type { ChipProps } from './Chip.types';
import { Box } from '../Box/Box';

export const Chip = React.forwardRef<HTMLSpanElement, ChipProps>(
  ({ label, variant = 'filled', color = 'neutral', icon, onDelete, onClick, sx, className, ...props }, ref) => {
    return (
      <span css={chipWrapper} className={className}>
        <span 
          ref={ref}
          css={[getChipStyles(variant, color, !!onClick), sx]} 
          onClick={onClick}
          {...props}
        >
          {icon && <Box as="span" sx={{ marginRight: '4px', display: 'flex' }}>{icon}</Box>}
          {label}
          {onDelete && (
            <span css={getDeleteIconStyles()} onClick={(e) => { e.stopPropagation(); onDelete(); }}>
              <Icon size="xs"><svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg></Icon>
            </span>
          )}
        </span>
      </span>
    );
  }
);

Chip.displayName = 'Chip';