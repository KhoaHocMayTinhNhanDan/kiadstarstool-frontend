export interface BarSeries {
  key: string;
  name: string;
  color?: string;
  stackId?: string; // Dùng để tạo stacked bar chart
}

export interface BarChartProps {
  data: Record<string, number | string>[];
  xAxisKey: string;
  series: BarSeries[];

  width?: string;
  height?: number;

  isLoading?: boolean;
  emptyMessage?: string;

  showLegend?: boolean;
  showGrid?: boolean;
  showXAxis?: boolean;
  showYAxis?: boolean;
  layout?: 'horizontal' | 'vertical';
}