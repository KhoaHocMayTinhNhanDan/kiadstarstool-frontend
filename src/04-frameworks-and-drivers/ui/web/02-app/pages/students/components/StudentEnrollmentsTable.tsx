/** @jsxImportSource @emotion/react */
import { CreditCard } from 'lucide-react';
import { Box, Text, Button, Icon } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms';
import { COLORS, SPACING } from '@/04-frameworks-and-drivers/ui/web/01-ui-core/constants/tokens-constants';
import { type StudentEnrollmentDetail } from '@/02-usecases/students/ports/output/GetStudentDetails.output';
import { PaymentStatusBadge } from './StudentSharedComponents';

interface StudentEnrollmentsTableProps {
  enrollments: StudentEnrollmentDetail[];
  classMap: Map<string, string>;
  onPayment: (classId: string) => void;
}

export const StudentEnrollmentsTable = ({ enrollments, classMap, onPayment }: StudentEnrollmentsTableProps) => {
  return (
    <Box>
      <Text as="h2" variant="heading-lg" weight="bold" mb="md">Thông tin học phí</Text>
      <Box bg="BACKGROUND_PAPER" borderRadius="md" border={`1px solid ${COLORS.NEUTRAL_BORDER}`} overflow="hidden">
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${COLORS.NEUTRAL_BORDER}`, backgroundColor: COLORS.NEUTRAL_LIGHT }}>
              <th style={{ padding: SPACING.md, textAlign: 'left' }}><Text weight="semibold" size="sm">Lớp học</Text></th>
              <th style={{ padding: SPACING.md, textAlign: 'left' }}><Text weight="semibold" size="sm">Ngày đăng ký</Text></th>
              <th style={{ padding: SPACING.md, textAlign: 'left' }}><Text weight="semibold" size="sm">Học phí</Text></th>
              <th style={{ padding: SPACING.md, textAlign: 'left' }}><Text weight="semibold" size="sm">Trạng thái</Text></th>
              <th style={{ padding: SPACING.md, textAlign: 'left' }}><Text weight="semibold" size="sm">Số buổi (Đã dùng/Tổng)</Text></th>
              <th style={{ padding: SPACING.md, textAlign: 'right' }}></th>
            </tr>
          </thead>
          <tbody>
            {enrollments?.map((enrollment, index) => (
              <tr key={index} style={{ borderBottom: `1px solid ${COLORS.NEUTRAL_BORDER}` }}>
                <td style={{ padding: SPACING.md }}>
                  <Text size="sm" weight="medium">{classMap.get(enrollment.classId) || enrollment.classId}</Text>
                  <Text size="xs" color="SECONDARY">{enrollment.branchId}</Text>
                </td>
                <td style={{ padding: SPACING.md }}>
                  <Text size="sm">{new Date(enrollment.joinedDate).toLocaleDateString('vi-VN')}</Text>
                </td>
                <td style={{ padding: SPACING.md }}>
                  <Text size="sm" weight="bold">{enrollment.tuitionAmount?.toLocaleString('vi-VN')} đ</Text>
                </td>
                <td style={{ padding: SPACING.md }}>
                  <PaymentStatusBadge status={enrollment.paymentStatus || 'unknown'} />
                </td>
                <td style={{ padding: SPACING.md }}>
                  {enrollment.prepaidSessions ? (
                    <Text size="sm">{enrollment.usedSessions || 0} / {enrollment.prepaidSessions}</Text>
                  ) : <Text size="sm" color="SECONDARY">-</Text>}
                </td>
                <td style={{ padding: SPACING.md, textAlign: 'right' }}>
                  {enrollment.paymentStatus !== 'paid' && (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      leftIcon={<Icon><CreditCard /></Icon>}
                      onClick={() => onPayment(enrollment.classId)}
                    >
                      Thanh toán
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </Box>
  );
};