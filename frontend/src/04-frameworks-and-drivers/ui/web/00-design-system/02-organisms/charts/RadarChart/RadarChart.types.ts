export interface RadarSeries {
  key: string;
  name: string;
  color?: string;
  fillOpacity?: number;
}

export interface RadarChartProps {
  data: Record<string, number | string>[];
  angleKey: string;
  series: RadarSeries[];

  width?: string;
  height?: number;

  isLoading?: boolean;
  emptyMessage?: string;

  showLegend?: boolean;
  showGrid?: boolean;
  showAxis?: boolean;
}