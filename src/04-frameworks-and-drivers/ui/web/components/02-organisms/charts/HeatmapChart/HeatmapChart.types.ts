import type { CSSObject } from '@emotion/react';

export interface HeatmapItem {
  x: string;
  y: string;
  value: number;
}

export interface HeatmapChartProps {
  data: HeatmapItem[];
  
  /**
   * Optional explicit labels to control order. 
   * If not provided, they are derived from data.
   */
  xLabels?: string[];
  yLabels?: string[];

  /**
   * Color range [minColor, maxColor]
   * @default [COLORS.PRIMARY_LIGHT, COLORS.PRIMARY_DARK]
   */
  colors?: [string, string];

  isLoading?: boolean;
  emptyMessage?: string;

  height?: number | string;
  sx?: CSSObject;
}