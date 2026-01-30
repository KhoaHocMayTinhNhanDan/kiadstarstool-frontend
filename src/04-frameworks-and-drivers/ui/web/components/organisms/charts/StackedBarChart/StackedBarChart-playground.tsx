import { StackedBarChart } from './StackedBarChart.organism';
import { Box } from '../../../atoms/Box/Box';
import { Text } from '../../../atoms/Text/Text';

const monthlyData = [
  { name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Apr', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'May', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Jun', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Jul', uv: 3490, pv: 4300, amt: 2100 },
];

const series = [
  { key: 'uv', name: 'Unique Visitors', color: '#8884d8' },
  { key: 'pv', name: 'Page Views', color: '#82ca9d' },
  { key: 'amt', name: 'Amount', color: '#ffc658' },
];

export const StackedBarChartPlayground = () => {
  return (
    <Box p="lg">
      <Text as="h2" size="2xl" weight="bold" sx={{ marginBottom: '24px' }}>
        📊 StackedBarChart Demo
      </Text>

      <Box display="flex" flexDirection="column" gap="3xl">
        
        <Box>
          <Box mb="sm"><Text weight="semibold">Horizontal Stacked</Text></Box>
          <Text size="sm" color="SECONDARY" sx={{ marginBottom: '16px' }}>
            The default layout, ideal for comparing totals across categories.
          </Text>
          <StackedBarChart 
            data={monthlyData}
            xAxisKey="name"
            series={series}
          />
        </Box>

        <Box>
          <Box mb="sm"><Text weight="semibold">Vertical Stacked</Text></Box>
          <Text size="sm" color="SECONDARY" sx={{ marginBottom: '16px' }}>
            Useful for showing parts of a whole over time.
          </Text>
          <StackedBarChart 
            data={monthlyData}
            xAxisKey="name"
            series={series}
            layout="vertical"
            height={400}
          />
        </Box>

      </Box>
    </Box>
  );
};