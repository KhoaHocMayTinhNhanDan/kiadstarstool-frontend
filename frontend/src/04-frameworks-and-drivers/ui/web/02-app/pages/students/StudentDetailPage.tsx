/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Plus, Edit } from 'lucide-react';
import { Box, Text, Button, Icon } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms';
import { AppContext } from '@/05-bootstrap/app-context';
import { useToast } from '../../../01-ui-core/hooks/useToast';
import { type GetStudentDetailsOutput } from '@/02-usecases/students/ports/output/GetStudentDetails.output';
import { StudentProfileCard } from './components/StudentProfileCard';
import { StudentEnrollmentsTable } from './components/StudentEnrollmentsTable';
import { StudentAttendanceHistory } from './components/StudentAttendanceHistory';
import { EnrollStudentModal } from './components/EnrollStudentModal';
import { EditStudentModal } from './components/EditStudentModal';

export const StudentDetailPage = () => {
  const { studentId } = useParams<{ studentId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [student, setStudent] = useState<GetStudentDetailsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [classMap, setClassMap] = useState<Map<string, string>>(new Map());
  
  // Enroll Modal State
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [availableClasses, setAvailableClasses] = useState<any[]>([]);

  // Edit Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const fetchStudentDetails = async () => {
    if (!studentId) return;
    setIsLoading(true);
    try {
      const studentController = AppContext.getStudentsController();
      const classController = AppContext.getClassesController();

      // Fetch song song: Chi tiết học viên và Danh sách lớp (để map tên lớp trong dropdown/table)
      const [detailsResult, classesResult] = await Promise.all([
        studentController.getStudentDetails({ studentId }),
        classController.listClassesByBranch('')
      ]);

      if (classesResult.isSuccess) {
        const classesData = classesResult.getValue();
        setAvailableClasses(classesData); // Lưu danh sách lớp để dùng cho dropdown
        const map = new Map<string, string>();
        classesData.forEach((c: any) => map.set(c.id, c.name));
        setClassMap(map);
      }

      if (detailsResult.isSuccess) {
        const details = detailsResult.getValue();
        console.log('[StudentDetailPage] Enrollments for UI:', JSON.stringify(details.enrollments, null, 2));
        setStudent(details);
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

  useEffect(() => {
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

  // Xác định chi nhánh hiện tại của học viên để lọc lớp học
  // Ưu tiên lấy từ enrollment active, nếu không thì lấy cái đầu tiên tìm thấy
  const currentBranchId = student.enrollments?.find(e => e.status === 'active')?.branchId || student.enrollments?.[0]?.branchId;

  return (
    <Box display="flex" flexDirection="column" gap="lg">
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate('/students')}
          leftIcon={<Icon><ArrowLeft /></Icon>}
        >
          Quay lại danh sách
        </Button>
        <Box display="flex" gap="sm">
          <Button
            variant="outline"
            leftIcon={<Icon><Edit /></Icon>}
            onClick={() => setIsEditModalOpen(true)}
          >
            Chỉnh sửa thông tin
          </Button>
          <Button 
            variant="primary" 
            leftIcon={<Icon><Plus /></Icon>}
            onClick={() => setIsEnrollModalOpen(true)}
          >
            Ghi danh vào lớp
          </Button>
        </Box>
      </Box>

      <StudentProfileCard student={student} />

      <StudentEnrollmentsTable 
        enrollments={student.enrollments} 
        classMap={classMap} 
        onPayment={handlePayment} 
      />

      <StudentAttendanceHistory history={student.attendanceHistory} />

      <EnrollStudentModal 
        isOpen={isEnrollModalOpen}
        onClose={() => setIsEnrollModalOpen(false)}
        studentId={studentId || ''}
        studentBranchId={currentBranchId}
        availableClasses={availableClasses}
        onSuccess={fetchStudentDetails}
      />

      <EditStudentModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        student={student}
        onSuccess={fetchStudentDetails}
      />
    </Box>
  );
};
