/** @jsxImportSource @emotion/react */
import { useMemo } from 'react';
import { BarChart } from '../BarChart/BarChart.organism';
import { Box } from '../../../atoms';
import * as styles from './StackedBarChart.organism.styles';
import type { StackedBarChartProps } from './StackedBarChart.types';
import type { BarSeries } from '../BarChart/BarChart.types';

/**
 * A specialized wrapper around BarChart that automatically stacks all series.
 */
export const StackedBarChart = ({ series, width, ...props }: StackedBarChartProps) => {
  // Automatically add the same stackId to all series to enable stacking.
  const stackedSeries = useMemo(
    (): BarSeries[] => series.map((s) => ({ ...s, stackId: 'a' })),
    [series]
  );

  return (
    <Box css={styles.container} w={width}>
      <BarChart {...props} width="100%" series={stackedSeries} />
    </Box>
  );
};

StackedBarChart.displayName = 'StackedBarChart';
export default StackedBarChart;