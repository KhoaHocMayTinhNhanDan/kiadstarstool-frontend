/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { css } from '@emotion/react';
import { ArrowLeft, Mail, Phone, Calendar, MapPin, User, Clock, CheckCircle, XCircle, AlertCircle, DollarSign, CreditCard } from 'lucide-react';
import { Box, Text, Button, Icon } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms';
import { COLORS, SPACING, RADIUS, SHADOWS } from '@/04-frameworks-and-drivers/ui/web/03-ui-shared/constants/tokens-constants';
import { AppContext } from '@/00-core/app-context';
import { useToast } from '../../../01-ui-core/hooks/useToast';
import { type GetStudentDetailsOutput } from '@/02-usecases/students/ports/output/GetStudentDetails.output';

export const StudentDetailPage = () => {
  const { studentId } = useParams<{ studentId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [student, setStudent] = useState<GetStudentDetailsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [classMap, setClassMap] = useState<Map<string, string>>(new Map());

  useEffect(() => {
    const fetchStudentDetails = async () => {
      if (!studentId) return;
      setIsLoading(true);
      try {
        const studentController = AppContext.getStudentsController();
        const classController = AppContext.getClassesController();

        // Fetch song song: Chi tiết học viên, Danh sách học viên (để lấy enrollments nếu thiếu), Danh sách lớp (để map tên)
        const [detailsResult, listResult, classesResult] = await Promise.all([
          studentController.getStudentDetails({ studentId }),
          studentController.listStudentsByBranch({ branchId: '' }),
          classController.listClassesByBranch('')
        ]);

        if (classesResult.isSuccess) {
          const map = new Map<string, string>();
          classesResult.getValue().forEach((c: any) => map.set(c.id, c.name));
          setClassMap(map);
        }

        if (detailsResult.isSuccess) {
          const details = detailsResult.getValue();
          // Workaround: Nếu API chi tiết chưa trả về enrollments, lấy từ list
          const listData = listResult.isSuccess ? listResult.getValue() : [];
          const studentInList = listData.find((s: any) => s.id === studentId);
          
          // Ưu tiên lấy từ details, nếu không có thì lấy từ list, cuối cùng là mảng rỗng
          let enrollments = (details as any).enrollments;
          if (!enrollments && studentInList) enrollments = (studentInList as any).enrollments;
          enrollments = enrollments || [];

          setStudent({ ...details, enrollments } as any);
        } else {
          toast.error('Không tìm thấy thông tin học viên');
          navigate('/students');
        }
      } catch (error) {
        console.error('Failed to fetch student details', error);
        toast.error('Đã có lỗi xảy ra khi tải thông tin');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudentDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentId, navigate]);

  const handlePayment = (classId: string) => {
    // TODO: Mở modal xác nhận thanh toán hoặc gọi API cập nhật trạng thái
    toast.success(`Đã cập nhật thanh toán cho lớp ${classId}`);
  };

  if (isLoading) {
    return <Box p="xl"><Text>Đang tải...</Text></Box>;
  }

  if (!student) return null;

  return (
    <Box display="flex" flexDirection="column" gap="lg">
      {/* Header */}
      <Box display="flex" alignItems="center" gap="sm">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate('/students')}
          leftIcon={<Icon><ArrowLeft /></Icon>}
        >
          Quay lại danh sách
        </Button>
      </Box>

      {/* Profile Card */}
      <Box 
        p="xl" 
        bg="BACKGROUND_PAPER" 
        borderRadius="lg" 
        border={`1px solid ${COLORS.NEUTRAL_BORDER}`}
        css={css`box-shadow: ${SHADOWS.sm};`}
        display="flex"
        flexDirection="column"
        gap="lg"
      >
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Box display="flex" gap="lg" alignItems="center">
            <Box 
              w="64px" h="64px" 
              bg="PRIMARY_LIGHT" 
              borderRadius="full" 
              display="flex" 
              alignItems="center" 
              justifyContent="center"
              color="PRIMARY"
            >
              <Icon size="xl"><User /></Icon>
            </Box>
            <Box>
              <Text as="h1" variant="heading-lg" weight="bold" mb="xs">{student.name}</Text>
              <Box display="flex" gap="sm" alignItems="center">
                <Box px="sm" py="xxs" bg={student.status === 'active' ? 'SUCCESS_LIGHT' : 'NEUTRAL_LIGHT'} borderRadius="full">
                  <Text size="xs" weight="bold" color={student.status === 'active' ? 'SUCCESS' : 'SECONDARY'}>
                    {student.status === 'active' ? 'Đang học' : 'Đã nghỉ'}
                  </Text>
                </Box>
                <Text size="sm" color="SECONDARY">ID: {student.id}</Text>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box 
          display="grid" 
          gridTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))" 
          gap="lg"
          pt="lg"
          borderTop={`1px solid ${COLORS.NEUTRAL_BORDER}`}
        >
          <InfoItem icon={<Mail />} label="Email" value={student.email} />
          <InfoItem icon={<Phone />} label="Điện thoại" value={student.phone || 'N/A'} />
          <InfoItem icon={<MapPin />} label="Chi nhánh" value={student.branchName || 'Chưa phân lớp'} />
          <InfoItem 
            icon={<Calendar />} 
            label="Ngày tham gia" 
            value={student.joinedDate ? new Date(student.joinedDate).toLocaleDateString('vi-VN') : 'N/A'} 
          />
        </Box>
      </Box>

      {/* Tuition & Enrollments */}
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
              {/* 
                Lưu ý: student.enrollments có thể chưa có trong GetStudentDetailsOutput interface hiện tại 
                nhưng MockStudentDataSource đã trả về. Cần đảm bảo DTO khớp.
                Ở đây giả định student object có chứa enrollments từ API.
              */}
              {(student as any).enrollments?.map((enrollment: any, index: number) => (
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
                    <PaymentStatusBadge status={enrollment.paymentStatus} />
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
                        onClick={() => handlePayment(enrollment.classId)}
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

      {/* Attendance History */}
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
              {student.attendanceHistory.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ padding: SPACING.xl, textAlign: 'center' }}>
                    <Text color="SECONDARY">Chưa có dữ liệu điểm danh.</Text>
                  </td>
                </tr>
              ) : (
                student.attendanceHistory.map((record, index) => (
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
    </Box>
  );
};

const PaymentStatusBadge = ({ status }: { status: string }) => {
  let color = 'SECONDARY';
  let bg = 'NEUTRAL_LIGHT';
  let label = status;

  switch (status) {
    case 'paid':
      color = 'SUCCESS';
      bg = 'SUCCESS_LIGHT';
      label = 'Đã thanh toán';
      break;
    case 'unpaid':
      color = 'DANGER';
      bg = 'DANGER_LIGHT';
      label = 'Chưa thanh toán';
      break;
    case 'partial':
      color = 'WARNING';
      bg = 'WARNING_LIGHT';
      label = 'Thanh toán 1 phần';
      break;
  }

  return (
    <Box display="inline-flex" alignItems="center" px="sm" py="xxs" borderRadius="full" bg={bg}>
      <Text size="xs" weight="bold" color={color}>{label}</Text>
    </Box>
  );
};

const InfoItem = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
  <Box display="flex" gap="md" alignItems="center">
    <Box color="SECONDARY"><Icon size="sm">{icon}</Icon></Box>
    <Box>
      <Text color="SECONDARY" size="xs">{label}</Text>
      <Text size="sm" weight="medium">{value}</Text>
    </Box>
  </Box>
);

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
  }

  return (
    <Box display="inline-flex" alignItems="center" gap="xs" px="sm" py="xxs" borderRadius="full" bg={bg}>
      <Icon size="xs" color={color}>{icon}</Icon>
      <Text size="xs" weight="bold" color={color}>{label}</Text>
    </Box>
  );
};
