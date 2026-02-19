/** @jsxImportSource @emotion/react */
import { Box, Button, Icon, Input } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms';
import { COLORS, SPACING } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms/00-core/tokens-constants';
import { Calendar } from 'lucide-react';
import { useClassAttendance } from '../../../hooks/class/useClassAttendance';
import { AttendanceStats } from './AttendanceStats';
import { AttendanceTable } from './AttendanceTable';

interface ClassAttendanceListProps {
  classId: string;
}

export const AttendanceList = ({ classId }: ClassAttendanceListProps) => {
  const { 
    attendanceList, 
    isLoading, 
    selectedDate, 
    setSelectedDate, 
    fetchAttendance, 
    statsData 
  } = useClassAttendance(classId);

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb="md">
        <Box display="flex" alignItems="center" gap="sm">
          <Icon size="sm" color="SECONDARY"><Calendar /></Icon>
          <Input 
            type="date" 
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            style={{ 
              padding: SPACING.sm, 
              borderRadius: '4px', 
              border: `1px solid ${COLORS.NEUTRAL_BORDER}` 
            }}
          />
        </Box>
        <Button size="sm" onClick={fetchAttendance} isLoading={isLoading}>
          Làm mới
        </Button>
      </Box>

      {/* Biểu đồ thống kê */}
      {!isLoading && <AttendanceStats statsData={statsData} selectedDate={selectedDate} />}

      <AttendanceTable attendanceList={attendanceList} isLoading={isLoading} />
    </Box>
  );
};