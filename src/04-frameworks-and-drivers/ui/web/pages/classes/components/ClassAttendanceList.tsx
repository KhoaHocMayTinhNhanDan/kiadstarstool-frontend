/** @jsxImportSource @emotion/react */
import { useState, useEffect, useMemo } from 'react';
import { Box, Text, Button, Icon, Input } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms';
import { COLORS, SPACING } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms/00-core/tokens-constants';
import { AppContext } from '@/00-core/app-context';
import { useToast } from '@/04-frameworks-and-drivers/ui/web/app/hooks/user/useToast';
import { CheckCircle, XCircle, Clock, AlertCircle, Calendar } from 'lucide-react';
import { PieChart } from '@/04-frameworks-and-drivers/ui/web/00-design-system/02-organisms/charts/PieChart';

interface ClassAttendanceListProps {
  classId: string;
}

export const ClassAttendanceList = ({ classId }: ClassAttendanceListProps) => {
  const { toast } = useToast();
  const [attendanceList, setAttendanceList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const fetchAttendance = async () => {
    setIsLoading(true);
    try {
      const controller = AppContext.getAttendanceController();
      const result = await controller.listAttendanceByClass({
        classId,
        date: selectedDate
      });

      if (result.isSuccess) {
        setAttendanceList(result.getValue());
      } else {
        toast.error(result.getErrorValue() as string);
      }
    } catch (error) {
      console.error('Failed to fetch attendance', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (classId) {
      fetchAttendance();
    }
  }, [classId, selectedDate]);

  // Tính toán dữ liệu cho biểu đồ
  const statsData = useMemo(() => {
    const counts: Record<string, number> = {
      present: 0,
      absent: 0,
      late: 0,
      excused: 0,
      not_marked: 0
    };

    attendanceList.forEach((record: any) => {
      if (counts[record.status] !== undefined) {
        counts[record.status]++;
      }
    });

    return [
      { name: 'Có mặt', value: counts.present, color: COLORS.SUCCESS },
      { name: 'Vắng mặt', value: counts.absent, color: COLORS.DANGER },
      { name: 'Đi muộn', value: counts.late, color: COLORS.WARNING },
      { name: 'Có phép', value: counts.excused, color: COLORS.INFO },
      { name: 'Chưa điểm danh', value: counts.not_marked, color: COLORS.SECONDARY },
    ].filter(item => item.value > 0);
  }, [attendanceList]);

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
      {!isLoading && attendanceList.length > 0 && (
        <Box mb="lg" p="md" bg="BACKGROUND_PAPER" borderRadius="md" border={`1px solid ${COLORS.NEUTRAL_BORDER}`}>
          <Text weight="semibold" mb="md">Thống kê ngày {new Date(selectedDate).toLocaleDateString('vi-VN')}</Text>
          <Box height="300px">
            <PieChart data={statsData} />
          </Box>
        </Box>
      )}

      <Box bg="BACKGROUND_PAPER" borderRadius="md" border={`1px solid ${COLORS.NEUTRAL_BORDER}`} overflow="hidden">
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${COLORS.NEUTRAL_BORDER}`, backgroundColor: COLORS.NEUTRAL_LIGHT }}>
              <th style={{ padding: SPACING.md, textAlign: 'left' }}><Text weight="semibold" size="sm">Học viên</Text></th>
              <th style={{ padding: SPACING.md, textAlign: 'left' }}><Text weight="semibold" size="sm">Trạng thái</Text></th>
              <th style={{ padding: SPACING.md, textAlign: 'left' }}><Text weight="semibold" size="sm">Giờ vào/ra</Text></th>
              <th style={{ padding: SPACING.md, textAlign: 'left' }}><Text weight="semibold" size="sm">Ghi chú</Text></th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={4} style={{ padding: SPACING.xl, textAlign: 'center' }}><Text color="SECONDARY">Đang tải...</Text></td></tr>
            ) : attendanceList.length === 0 ? (
              <tr><td colSpan={4} style={{ padding: SPACING.xl, textAlign: 'center' }}><Text color="SECONDARY">Chưa có dữ liệu điểm danh.</Text></td></tr>
            ) : (
              attendanceList.map((record) => (
                <tr key={record.studentId} style={{ borderBottom: `1px solid ${COLORS.NEUTRAL_BORDER}` }}>
                  <td style={{ padding: SPACING.md }}>
                    <Text weight="medium">{record.studentName}</Text>
                  </td>
                  <td style={{ padding: SPACING.md }}>
                    <StatusBadge status={record.status} />
                  </td>
                  <td style={{ padding: SPACING.md }}>
                    <Text size="sm">{record.checkInTime ? `${record.checkInTime} - ${record.checkOutTime || '...'}` : '-'}</Text>
                  </td>
                  <td style={{ padding: SPACING.md }}>
                    <Text size="sm" color="SECONDARY">{record.notes || '-'}</Text>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </Box>
    </Box>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  let color = 'SECONDARY';
  let bg = 'NEUTRAL_LIGHT';
  let icon = <Clock />;
  let label = status;

  switch (status) {
    case 'present':
      color = 'SUCCESS';
      bg = 'SUCCESS_LIGHT';
      icon = <CheckCircle />;
      label = 'Có mặt';
      break;
    case 'absent':
      color = 'DANGER';
      bg = 'DANGER_LIGHT';
      icon = <XCircle />;
      label = 'Vắng mặt';
      break;
    case 'late':
      color = 'WARNING';
      bg = 'WARNING_LIGHT';
      icon = <AlertCircle />;
      label = 'Đi muộn';
      break;
    case 'excused':
      color = 'INFO';
      bg = 'INFO_LIGHT';
      icon = <CheckCircle />;
      label = 'Có phép';
      break;
    case 'not_marked':
      color = 'SECONDARY';
      bg = 'NEUTRAL_LIGHT';
      icon = <Clock />;
      label = 'Chưa điểm danh';
      break;
  }

  return (
    <Box display="inline-flex" alignItems="center" gap="xs" px="sm" py="xxs" borderRadius="full" bg={bg}>
      <Icon size="xs" color={color}>{icon}</Icon>
      <Text size="xs" weight="bold" color={color}>{label}</Text>
    </Box>
  );
};