export interface PieChartData {
  name: string;
  value: number;
  color?: string;
}

export interface PieChartProps {
  data: PieChartData[];
  width?: string | number;
  height?: string | number;
  isLoading?: boolean;
  emptyMessage?: string;
}