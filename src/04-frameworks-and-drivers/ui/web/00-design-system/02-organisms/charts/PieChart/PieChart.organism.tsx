/** @jsxImportSource @emotion/react */
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import { Box, Text, LoadingSpinner } from '../../../00-atoms';
import { COLORS } from '../../../00-atoms/00-core/tokens-constants';
import * as styles from './PieChart.styles';
import type { PieChartProps } from './PieChart.types';

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload || payload.length === 0) return null;
  const data = payload[0].payload;

  return (
    <Box css={styles.tooltip}>
      <Box css={styles.tooltipItem}>
        <Box w={8} h={8} radius="full" bg={data.color || COLORS.PRIMARY} />
        <Text size="sm">
          {data.name}: <strong>{data.value}</strong>
        </Text>
      </Box>
    </Box>
  );
};

export const PieChart = ({
  data,
  width = '100%',
  height = 300,
  isLoading = false,
  emptyMessage = 'Không có dữ liệu',
}: PieChartProps) => {
  /* ================= Loading ================= */
  if (isLoading) {
    return (
      <Box w={width} h={height} display="flex" alignItems="center" justifyContent="center">
        <LoadingSpinner size="lg" />
      </Box>
    );
  }

  /* ================= Empty ================= */
  if (!data || data.length === 0) {
    return (
      <Box w={width} h={height} display="flex" alignItems="center" justifyContent="center" bg="LIGHT" radius="md">
        <Text color="SECONDARY">{emptyMessage}</Text>
      </Box>
    );
  }

  /* ================= Chart ================= */
  // Tự động gán màu nếu thiếu
  const DEFAULT_COLORS = [COLORS.PRIMARY, COLORS.SUCCESS, COLORS.WARNING, COLORS.DANGER, COLORS.INFO];
  const chartData = data.map((item, index) => ({
    ...item,
    color: item.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length],
  }));

  return (
    <Box w={width} h={height} sx={{ minWidth: 0, minHeight: 0 }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            verticalAlign="bottom" 
            height={36} 
            iconType="circle"
            formatter={(value) => <Text as="span" size="sm" color="SECONDARY">{value}</Text>}
          />
        </RechartsPieChart>
      </ResponsiveContainer>
    </Box>
  );
};

PieChart.displayName = 'PieChart';