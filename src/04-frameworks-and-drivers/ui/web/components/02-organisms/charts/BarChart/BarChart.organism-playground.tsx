import { BarChart } from './BarChart.organism';
import { Box, Text } from '../../../atoms';

const MOCK_DATA = [
  { month: 'Jan', revenue: 4000, profit: 2400 },
  { month: 'Feb', revenue: 3000, profit: 1398 },
  { month: 'Mar', revenue: 2000, profit: 9800 },
  { month: 'Apr', revenue: 2780, profit: 3908 },
  { month: 'May', revenue: 1890, profit: 4800 },
  { month: 'Jun', revenue: 2390, profit: 3800 },
  { month: 'Jul', revenue: 3490, profit: 4300 },
];

const SERIES = [
  { key: 'revenue', name: 'Doanh thu', color: '#8884d8' },
  { key: 'profit', name: 'Lợi nhuận', color: '#82ca9d' },
];

export const BarChartPlayground = () => {
  return (
    <Box p="lg">
      <Box mb="lg">
        <Text as="h2" size="2xl" weight="bold">
          📊 BarChart Demo
        </Text>
      </Box>

      <Box display="flex" flexDirection="column" gap="xl">
        <Box p="lg" border="1px solid #e2e8f0" radius="md">
          <Box mb="md">
            <Text weight="semibold">Doanh thu theo tháng</Text>
          </Box>
          <BarChart
            data={MOCK_DATA}
            xAxisKey="month"
            series={SERIES}
            height={400}
          />
        </Box>

        <Box p="lg" border="1px solid #e2e8f0" radius="md">
          <Box mb="md">
            <Text weight="semibold">Stacked Bar Chart</Text>
          </Box>
          <BarChart
            data={MOCK_DATA}
            xAxisKey="month"
            series={[
              { key: 'revenue', name: 'Doanh thu', color: '#8884d8', stackId: 'a' },
              { key: 'profit', name: 'Lợi nhuận', color: '#82ca9d', stackId: 'a' },
            ]}
            height={400}
          />
        </Box>
      </Box>
    </Box>
  );
};