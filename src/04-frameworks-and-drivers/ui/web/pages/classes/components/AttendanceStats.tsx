/** @jsxImportSource @emotion/react */
import { Box, Text } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms';
import { COLORS } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms/00-core/tokens-constants';
import { PieChart } from '@/04-frameworks-and-drivers/ui/web/00-design-system/02-organisms/charts/PieChart';

interface AttendanceStatsProps {
  statsData: any[];
  selectedDate: string;
}

export const AttendanceStats = ({ statsData, selectedDate }: AttendanceStatsProps) => {
  if (statsData.length === 0) return null;

  return (
    <Box mb="lg" p="md" bg="BACKGROUND_PAPER" borderRadius="md" border={`1px solid ${COLORS.NEUTRAL_BORDER}`}>
      <Text weight="semibold" mb="md">Thống kê ngày {new Date(selectedDate).toLocaleDateString('vi-VN')}</Text>
      <Box height="300px">
        <PieChart data={statsData} />
      </Box>
    </Box>
  );
};