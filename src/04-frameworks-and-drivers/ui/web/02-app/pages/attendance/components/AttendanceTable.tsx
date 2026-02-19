/** @jsxImportSource @emotion/react */
import { Box, Text, Icon } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms';
import { COLORS, SPACING } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms/00-core/tokens-constants';
import { CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';

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

interface AttendanceTableProps {
  attendanceList: any[];
  isLoading: boolean;
}

export const AttendanceTable = ({ attendanceList, isLoading }: AttendanceTableProps) => {
  return (
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
  );
};