/** @jsxImportSource @emotion/react */
import { ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { Box, Text } from '../../../00-atoms';
import { COLORS } from '../../../../01-ui-core/constants/tokens-constants';
import { type PieChartProps } from './PieChart.types';
import * as styles from './PieChart.styles';

const DEFAULT_COLORS = [COLORS.PRIMARY, COLORS.SECONDARY, COLORS.SUCCESS, COLORS.DANGER, COLORS.WARNING, COLORS.INFO];

const CustomTooltip = ({ active, payload, formatter }: any) => {
  if (!active || !payload || payload.length === 0) return null;
  const data = payload[0];
  
  return (
    <div css={styles.tooltip}>
      <div css={styles.tooltipItem}>
        <Box w="8px" h="8px" borderRadius="full" bg={data.payload.fill || data.fill} />
        <Text size="sm">
          {data.name}: <strong>{formatter ? formatter(data.value) : data.value}</strong>
        </Text>
      </div>
    </div>
  );
};

export const PieChart = ({
  data,
  height = 300,
  colors = DEFAULT_COLORS,
  valueFormatter,
  showLegend = true,
  showTooltip = true,
  isLoading = false,
  emptyMessage = 'Chưa có dữ liệu',
  innerRadius = 0,
  outerRadius = 80,
}: PieChartProps) => {
  // 1. Loading State
  if (isLoading) {
    return (
      <Box w="100%" h={height} display="flex" alignItems="center" justifyContent="center" bg="NEUTRAL_LIGHT" borderRadius="md">
        <Text color="SECONDARY">Đang tải biểu đồ...</Text>
      </Box>
    );
  }

  // 2. Empty State
  if (!data || data.length === 0 || data.every(d => d.value === 0)) {
    return (
      <Box w="100%" h={height} display="flex" alignItems="center" justifyContent="center" bg="NEUTRAL_LIGHT" borderRadius="md">
        <Text color="SECONDARY">{emptyMessage}</Text>
      </Box>
    );
  }

  return (
    <Box w="100%" h={height}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart>
          <Pie
            data={data}
            cx="50%" cy="50%"
            labelLine={false}
            outerRadius={outerRadius}
            innerRadius={innerRadius}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color || colors[index % colors.length]} />
            ))}
          </Pie>
          {showTooltip && <Tooltip content={<CustomTooltip formatter={valueFormatter} />} cursor={{ fill: 'transparent' }} />}
          {showLegend && <Legend verticalAlign="bottom" height={36} iconType="circle" />}
        </RechartsPieChart>
      </ResponsiveContainer>
    </Box>
  );
};