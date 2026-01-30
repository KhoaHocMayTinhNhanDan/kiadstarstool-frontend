import { HeatmapChart } from './HeatmapChart.organism';
import { Box } from '../../../atoms/Box/Box';
import { Text } from '../../../atoms/Text/Text';
import { COLORS } from '../../../atoms/00-core/tokens-constants';

// Mock Data: Weekly Activity (GitHub style)
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const weeks = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10', 'W11', 'W12'];

const activityData = weeks.flatMap(week => 
  days.map(day => ({
    x: week,
    y: day,
    value: Math.floor(Math.random() * 10) // 0-9 commits
  }))
);

// Mock Data: Server Load (24h x 7d)
const hours = Array.from({ length: 24 }, (_, i) => `${i}h`);
const serverLoadData = days.flatMap(day => 
  hours.map(hour => ({
    x: hour,
    y: day,
    value: Math.floor(Math.random() * 100) // 0-100% load
  }))
);

export const HeatmapChartPlayground = () => {
  return (
    <Box p="lg">
      <Text as="h2" size="2xl" weight="bold" sx={{ marginBottom: '24px' }}>
        🔥 HeatmapChart Demo
      </Text>

      <Box display="flex" flexDirection="column" gap="3xl">
        
        {/* Basic Usage */}
        <Box>
          <Box mb="sm"><Text weight="semibold">Weekly Activity (GitHub Style)</Text></Box>
          <Box mb="md"><Text size="sm" color="SECONDARY">
            Visualizing commit activity over 12 weeks.
          </Text></Box>
          <HeatmapChart 
            data={activityData}
            xLabels={weeks}
            yLabels={days}
            colors={[COLORS.NEUTRAL_LIGHT, COLORS.SUCCESS]} // Light gray to Green
            height={250}
          />
        </Box>

        {/* Custom Colors & Dense Data */}
        <Box>
          <Box mb="sm"><Text weight="semibold">Server Load (24h x 7 Days)</Text></Box>
          <Box mb="md"><Text size="sm" color="SECONDARY">
            Visualizing server CPU usage. Red indicates high load.
          </Text></Box>
          <HeatmapChart 
            data={serverLoadData}
            xLabels={hours}
            yLabels={days}
            colors={['#fff7ed', '#c2410c']} // Orange scale
            height={300}
          />
        </Box>

        {/* Loading State */}
        <Box>
          <Box mb="sm"><Text weight="semibold">Loading State</Text></Box>
          <HeatmapChart 
            data={[]}
            isLoading
            height={200}
          />
        </Box>

        {/* Empty State */}
        <Box>
          <Box mb="sm"><Text weight="semibold">Empty State</Text></Box>
          <HeatmapChart 
            data={[]}
            height={200}
          />
        </Box>

      </Box>
    </Box>
  );
};