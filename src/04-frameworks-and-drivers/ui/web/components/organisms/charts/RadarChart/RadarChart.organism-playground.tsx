// src/04-frameworks-and-drivers/ui/web/components/organisms/charts/RadarChart/RadarChart.organism-playground.tsx
import { RadarChart } from './RadarChart.organism';
import { Box, Text } from '../../../atoms';

const MOCK_DATA = [
  { subject: 'Toán', A: 120, B: 110, fullMark: 150 },
  { subject: 'Văn', A: 98, B: 130, fullMark: 150 },
  { subject: 'Anh', A: 86, B: 130, fullMark: 150 },
  { subject: 'Lý', A: 99, B: 100, fullMark: 150 },
  { subject: 'Hóa', A: 85, B: 90, fullMark: 150 },
  { subject: 'Sử', A: 65, B: 85, fullMark: 150 },
];

const SERIES = [
  { key: 'A', name: 'Học sinh A', color: '#8884d8', fillOpacity: 0.6 },
  { key: 'B', name: 'Học sinh B', color: '#82ca9d', fillOpacity: 0.6 },
];

export const RadarChartPlayground = () => {
  return (
    <Box p="lg">
      {/* Page title */}
      <Box mb="lg">
        <Text as="h2" size="2xl" weight="bold">
          🕸️ RadarChart Demo
        </Text>
      </Box>

      <Box display="flex" flexDirection="column" gap="xl">
        {/* ===================== BASIC ===================== */}
        <Box p="lg" border="1px solid #e2e8f0" radius="md">
          <Box mb="md">
            <Text weight="semibold">
              So sánh năng lực học tập
            </Text>
          </Box>

          <RadarChart
            data={MOCK_DATA}
            angleKey="subject"
            series={SERIES}
            height={400}
          />
        </Box>

        {/* ===================== LOADING ===================== */}
        <Box p="lg" border="1px solid #e2e8f0" radius="md">
          <Box mb="md">
            <Text weight="semibold">
              Trạng thái Loading
            </Text>
          </Box>

          <RadarChart
            data={MOCK_DATA}
            angleKey="subject"
            series={SERIES}
            height={300}
            isLoading
          />
        </Box>

        {/* ===================== EMPTY ===================== */}
        <Box p="lg" border="1px solid #e2e8f0" radius="md">
          <Box mb="md">
            <Text weight="semibold">
              Trạng thái Empty
            </Text>
          </Box>

          <RadarChart
            data={[]}
            angleKey="subject"
            series={SERIES}
            height={300}
            emptyMessage="Chưa có dữ liệu đánh giá"
          />
        </Box>
      </Box>
    </Box>
  );
};
