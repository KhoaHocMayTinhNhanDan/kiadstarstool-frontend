/** @jsxImportSource @emotion/react */
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import { Box, Text, LoadingSpinner } from '../../../atoms';
import { COLORS } from '../../../atoms/00-core/tokens-constants';
import * as styles from './BarChart.organism.styles';
import type { BarChartProps } from './BarChart.types';

/* ==========================================================================
 * Tooltip
 * ========================================================================== */

const CustomTooltip = ({ active, label, payload }: any) => {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <Box css={styles.tooltip}>
      <Box mb="sm">
        <Text size="sm" weight="semibold">{label}</Text>
      </Box>

      <Box display="flex" flexDirection="column" gap="xs">
        {payload.map((item: any, index: number) => (
          <Box key={index} css={styles.tooltipItem}>
            <Box
              w={8}
              h={8}
              radius="sm"
              bg={item.color || 'PRIMARY'}
            />
            <Text size="sm">
              {item.name}: <strong>{item.value}</strong>
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

/* ==========================================================================
 * Component
 * ========================================================================== */

export const BarChart = ({
  data,
  xAxisKey,
  series,

  width = '100%',
  height = 360,

  isLoading = false,
  emptyMessage = 'Không có dữ liệu',

  showLegend = true,
  showGrid = true,
  showXAxis = true,
  showYAxis = true,
  layout = 'horizontal',
}: BarChartProps) => {
  /* ================= Loading ================= */
  if (isLoading) {
    return (
      <Box
        w={width}
        h={height}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <LoadingSpinner size="lg" />
      </Box>
    );
  }

  /* ================= Empty ================= */
  if (!data || data.length === 0) {
    return (
      <Box
        w={width}
        h={height}
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="LIGHT"
        radius="md"
      >
        <Text color="SECONDARY">{emptyMessage}</Text>
      </Box>
    );
  }

  /* ================= Chart ================= */
  return (
    <Box w={width}>
      <div
        css={styles.chartContainer}
        style={{ width: '100%', height }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart
            data={data}
            layout={layout}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            {showGrid && (
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke={COLORS.NEUTRAL_LIGHT} 
                vertical={layout === 'vertical'} 
                horizontal={layout === 'horizontal'} 
              />
            )}

            {showXAxis && (
              <XAxis
                dataKey={layout === 'horizontal' ? xAxisKey : undefined}
                type={layout === 'horizontal' ? 'category' : 'number'}
                tick={{ fill: COLORS.SECONDARY, fontSize: 12 }}
                axisLine={{ stroke: COLORS.NEUTRAL_LIGHT }}
                tickLine={false}
              />
            )}

            {showYAxis && (
              <YAxis
                dataKey={layout === 'vertical' ? xAxisKey : undefined}
                type={layout === 'vertical' ? 'category' : 'number'}
                tick={{ fill: COLORS.SECONDARY, fontSize: 12 }}
                axisLine={{ stroke: COLORS.NEUTRAL_LIGHT }}
                tickLine={false}
              />
            )}

            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
            {showLegend && <Legend />}

            {series.map((s) => (
              <Bar
                key={s.key}
                dataKey={s.key}
                name={s.name}
                fill={s.color || COLORS.PRIMARY}
                stackId={s.stackId}
                radius={layout === 'horizontal' ? [4, 4, 0, 0] : [0, 4, 4, 0]}
              />
            ))}
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </Box>
  );
};

BarChart.displayName = 'BarChart';
export default BarChart;