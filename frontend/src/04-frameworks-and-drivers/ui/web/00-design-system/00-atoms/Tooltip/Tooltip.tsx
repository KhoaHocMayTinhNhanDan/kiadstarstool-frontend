/** @jsxImportSource @emotion/react */
import React from 'react';
import { Box } from '../Box';
import * as styles from './Tooltip.styles';
import type { TooltipProps } from './Tooltip.types';

export const Tooltip = ({ children, content, className, sx }: TooltipProps) => {
  return (
    <Box css={styles.wrapper} className={className} sx={sx}>
      {children}
      <Box css={styles.tooltipContent}>
        {content}
      </Box>
    </Box>
  );
};