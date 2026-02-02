import type { BarChartProps, BarSeries } from '../BarChart/BarChart.types';

// For StackedBarChart, stackId is an implementation detail, so we omit it.
export interface StackedBarSeries extends Omit<BarSeries, 'stackId'> {}

export interface StackedBarChartProps extends Omit<BarChartProps, 'series'> {
  series: StackedBarSeries[];
}