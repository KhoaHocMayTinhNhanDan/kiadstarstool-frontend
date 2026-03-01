export interface PieChartData {
  name: string;
  value: number;
  color?: string; // Cho phép override màu từng phần tử nếu cần
}

export interface PieChartProps {
  data: PieChartData[];
  height?: string | number;
  colors?: string[]; // Mảng màu chủ đạo
  valueFormatter?: (value: number) => string;
  showLegend?: boolean;
  showTooltip?: boolean;
  isLoading?: boolean;
  emptyMessage?: string;
  innerRadius?: number; // Để tạo Donut chart nếu muốn
  outerRadius?: number;
}