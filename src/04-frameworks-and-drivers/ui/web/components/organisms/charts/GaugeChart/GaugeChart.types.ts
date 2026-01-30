import type { GaugeSize } from './GaugeChart.size';

export interface GaugeSegment {
  percent: number;
  color: string;
  name?: string;
  gradient?: { start: string; end: string };
}

export interface GaugeChartProps {
  value: number;
  min?: number;
  max?: number;
  segments?: GaugeSegment[];
  units?: string;
  label?: string;

  size?: GaugeSize;
  width?: string | number;
  height?: number;

  isLoading?: boolean;
  showMinMax?: boolean;
}