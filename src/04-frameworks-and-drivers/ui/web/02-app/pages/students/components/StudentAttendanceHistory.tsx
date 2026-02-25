/** @jsxImportSource @emotion/react */
import { Box, Text } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms';
import { COLORS, SPACING } from '@/04-frameworks-and-drivers/ui/web/01-ui-core/constants/tokens-constants';
import { StatusBadge } from './StudentSharedComponents';

interface AttendanceHistoryItem {
  classId: string;
  className: string;
  date: string;
  status: string;
  score?: number;
}

interface StudentAttendanceHistoryProps {
  history: AttendanceHistoryItem[];
}

export const StudentAttendanceHistory = ({ history }: StudentAttendanceHistoryProps) => {
  return (
    <Box>
      <Text as="h2" variant="heading-lg" weight="bold" mb="md">Lịch sử điểm danh</Text>
      
      <Box bg="BACKGROUND_PAPER" borderRadius="md" border={`1px solid ${COLORS.NEUTRAL_BORDER}`} overflow="hidden">
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${COLORS.NEUTRAL_BORDER}`, backgroundColor: COLORS.NEUTRAL_LIGHT }}>
              <th style={{ padding: SPACING.md, textAlign: 'left' }}><Text weight="semibold" size="sm">Ngày</Text></th>
              <th style={{ padding: SPACING.md, textAlign: 'left' }}><Text weight="semibold" size="sm">Lớp học</Text></th>
              <th style={{ padding: SPACING.md, textAlign: 'left' }}><Text weight="semibold" size="sm">Trạng thái</Text></th>
              <th style={{ padding: SPACING.md, textAlign: 'left' }}><Text weight="semibold" size="sm">Điểm số</Text></th>
            </tr>
          </thead>
          <tbody>
            {history.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ padding: SPACING.xl, textAlign: 'center' }}>
                  <Text color="SECONDARY">Chưa có dữ liệu điểm danh.</Text>
                </td>
              </tr>
            ) : (
              history.map((record, index) => (
                <tr key={index} style={{ borderBottom: `1px solid ${COLORS.NEUTRAL_BORDER}` }}>
                  <td style={{ padding: SPACING.md }}>
                    <Text size="sm">{new Date(record.date).toLocaleDateString('vi-VN')}</Text>
                  </td>
                  <td style={{ padding: SPACING.md }}>
                    <Text size="sm" weight="medium">{record.className}</Text>
                  </td>
                  <td style={{ padding: SPACING.md }}>
                    <StatusBadge status={record.status} />
                  </td>
                  <td style={{ padding: SPACING.md }}>
                    <Text size="sm">{record.score ?? '-'}</Text>
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