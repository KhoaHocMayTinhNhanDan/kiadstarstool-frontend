/** @jsxImportSource @emotion/react */
import { CreditCard } from 'lucide-react';
import { Box, Text, Button, Icon } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms';
import { COLORS } from '@/04-frameworks-and-drivers/ui/web/01-ui-core/constants/tokens-constants';
import { type StudentEnrollmentDetail } from '@/02-usecases/students/ports/output/GetStudentDetails.output';
import { PaymentStatusBadge } from './StudentSharedComponents';
import { DataTable } from '@/04-frameworks-and-drivers/ui/web/00-design-system/02-organisms/data/DataTable/DataTable.organism';

interface StudentEnrollmentsTableProps {
  enrollments: StudentEnrollmentDetail[];
  classMap: Map<string, string>;
  onPayment: (classId: string) => void;
}

export const StudentEnrollmentsTable = ({ enrollments, classMap, onPayment }: StudentEnrollmentsTableProps) => {
  // FIX: Lọc bỏ các enrollment không có classId (đây là enrollment khởi tạo để gắn học viên vào chi nhánh)
  const classEnrollments = enrollments?.filter(e => e.classId);

  if (!classEnrollments || classEnrollments.length === 0) {
    return (
      <Box>
        <Text as="h2" variant="heading-lg" weight="bold" mb="md">Thông tin học phí</Text>
        <Box p="lg" bg="BACKGROUND_PAPER" borderRadius="md" border={`1px solid ${COLORS.NEUTRAL_BORDER}`}>
           <Text color="SECONDARY">Học viên chưa đăng ký lớp học nào.</Text>
        </Box>
      </Box>
    );
  }

  const columns = [
    {
      key: 'classInfo',
      header: 'Lớp học',
      render: (enrollment: StudentEnrollmentDetail) => (
        <Box>
          <Text size="sm" weight="medium">{classMap.get(enrollment.classId) || enrollment.classId}</Text>
          <Text size="xs" color="SECONDARY">{enrollment.branchId}</Text>
        </Box>
      )
    },
    {
      key: 'joinedDate',
      header: 'Ngày đăng ký',
      render: (enrollment: StudentEnrollmentDetail) => (
        <Text size="sm">{new Date(enrollment.joinedDate).toLocaleDateString('vi-VN')}</Text>
      )
    },
    {
      key: 'tuition',
      header: 'Học phí',
      render: (enrollment: StudentEnrollmentDetail) => (
        <Text size="sm" weight="bold">{enrollment.tuitionAmount?.toLocaleString('vi-VN')} đ</Text>
      )
    },
    {
      key: 'status',
      header: 'Trạng thái',
      render: (enrollment: StudentEnrollmentDetail) => (
        <PaymentStatusBadge status={enrollment.paymentStatus || 'unknown'} />
      )
    },
    {
      key: 'sessions',
      header: 'Số buổi (Đã dùng/Tổng)',
      render: (enrollment: StudentEnrollmentDetail) => (
        enrollment.prepaidSessions ? (
          <Text size="sm">{enrollment.usedSessions || 0} / {enrollment.prepaidSessions}</Text>
        ) : <Text size="sm" color="SECONDARY">-</Text>
      )
    },
    {
      key: 'actions',
      header: '',
      align: 'right' as const,
      render: (enrollment: StudentEnrollmentDetail) => (
        enrollment.paymentStatus !== 'paid' && (
          <Button 
            size="sm" 
            variant="outline" 
            leftIcon={<Icon><CreditCard /></Icon>}
            onClick={() => onPayment(enrollment.classId)}
          >
            Thanh toán
          </Button>
        )
      )
    }
  ];

  return (
    <Box>
      <Text as="h2" variant="heading-lg" weight="bold" mb="md">Thông tin học phí</Text>
      <DataTable
        data={classEnrollments}
        columns={columns}
        keyExtractor={(item) => item.classId + item.joinedDate} // Unique key
        totalPages={0} // No pagination needed here
      />
    </Box>
  );
};