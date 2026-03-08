/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Filter, Search, Mail, Phone, MapPin } from 'lucide-react';
import { Box, Text, Button, Icon, Input, Select } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms';
import { COLORS } from '@/04-frameworks-and-drivers/ui/web/01-ui-core/constants/tokens-constants';
import { AppContext } from '@/05-bootstrap/app-context';
import { type StudentListItem } from '@/02-usecases/students/ports/output/ListStudentsByBranch.output';
import { PaymentStatusBadge } from './components/StudentSharedComponents';
import { DataTable } from '@/04-frameworks-and-drivers/ui/web/00-design-system/02-organisms/data/DataTable/DataTable.organism';

export const StudentListPage = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState<StudentListItem[]>([]);
  const [branches, setBranches] = useState<any[]>([]);
  const [selectedBranchId, setSelectedBranchId] = useState<string>('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  // Pagination State
  const [lastId, setLastId] = useState<string | undefined>(undefined);
  const [hasMore, setHasMore] = useState(true);
  const ITEMS_PER_PAGE = 10; // Tăng số lượng mỗi lần tải

  // 1. Fetch Branches on mount
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const branchController = AppContext.getBranchController();
        const branchResult = await branchController.listBranches({});
        if (branchResult.isSuccess) {
          const branchList = branchResult.getValue();
          setBranches(branchList);
        }
      } catch (error) {
        console.error('Failed to fetch branches', error);
      }
    };
    fetchBranches();
  }, []);

  // 2. Fetch Students when selectedBranchId changes
  useEffect(() => {
    // Reset list khi đổi chi nhánh
    setStudents([]);
    setLastId(undefined);
    setHasMore(true);
    fetchStudents(false);
  }, [selectedBranchId]);

  // 3. Fetch Students when searchKeyword changes (Debounce could be added here)
  useEffect(() => {
    setStudents([]);
    setLastId(undefined);
    setHasMore(true);
    fetchStudents(false);
  }, [searchKeyword]);

  const fetchStudents = async (isLoadMore = false) => {
      setIsLoading(true);
      try {
        const studentController = AppContext.getStudentsController();
        
        // Lưu ý: Bạn cần cập nhật Interactor/Repository để truyền limit và lastId xuống DataSource
        // Ở đây ta ép kiểu (as any) để tạm thời bypass check type nếu chưa cập nhật interface
        const result = await studentController.listStudentsByBranch({ 
          branchId: selectedBranchId,
          limit: ITEMS_PER_PAGE,
          lastId: isLoadMore ? lastId : undefined,
          keyword: searchKeyword || undefined
        } as any);
        
        if (result.isSuccess) {
          const newStudents = result.getValue();
          if (newStudents.length < ITEMS_PER_PAGE) setHasMore(false);
          else setHasMore(true);

          if (newStudents.length > 0) {
            setLastId(newStudents[newStudents.length - 1].id);
          }

          if (isLoadMore) {
            setStudents(prev => [...prev, ...newStudents]);
          } else {
            setStudents(newStudents);
          }
        }
      } catch (error) {
        console.error('Failed to fetch students', error);
      } finally {
        setIsLoading(false);
      }
    };

  const columns = [
    {
      key: 'name',
      header: 'Học viên',
      width: '25%',
      render: (student: StudentListItem) => (
        <Box>
          <Text weight="medium">{student.name}</Text>
          <Text size="xs" color="SECONDARY">{student.id}</Text>
        </Box>
      )
    },
    {
      key: 'branch',
      header: 'Chi nhánh',
      width: '15%',
      render: (student: StudentListItem) => {
        // Tìm tên chi nhánh từ danh sách branches đã fetch
        // Lưu ý: StudentListItem hiện tại có thể chưa trả về branchName trực tiếp,
        // ta tạm thời lấy từ active enrollment hoặc hiển thị ID nếu cần thiết.
        // Tốt nhất là Interactor nên trả về branchName.
        // Ở đây ta map từ state 'branches'
        const branchName = branches.find(b => student.enrollments?.some(e => e.branchId === b.id))?.name;
        return <Text size="sm" color="SECONDARY" truncate>{branchName || 'Chưa phân lớp'}</Text>;
      }
    },
    {
      key: 'contact',
      header: 'Liên hệ',
      width: '25%',
      render: (student: StudentListItem) => (
        <Box display="flex" flexDirection="column" gap="xs">
          <Box display="flex" alignItems="center" gap="xs"><Icon size="xs" color="SECONDARY"><Mail /></Icon><Text size="sm">{student.email}</Text></Box>
          <Box display="flex" alignItems="center" gap="xs"><Icon size="xs" color="SECONDARY"><Phone /></Icon><Text size="sm">{student.phone}</Text></Box>
        </Box>
      )
    },
    { key: 'status', header: 'Trạng thái', width: '10%' },
    { 
      key: 'joinedDate', 
      header: 'Ngày tham gia', 
      width: '15%',
      render: (student: StudentListItem) => (
        <Text size="sm">{new Date(student.joinedDate).toLocaleDateString('vi-VN')}</Text>
      )
    },
    {
      key: 'tuition',
      header: 'Học phí',
      width: '20%',
      render: (student: StudentListItem) => {
        const activeEnrollment = student.enrollments?.find(e => e.status === 'active');
        const paymentStatus = activeEnrollment?.paymentStatus || 'unknown';
        const tuitionAmount = activeEnrollment?.tuitionAmount || 0;
        
        // Chỉ hiển thị thông tin học phí nếu có enrollment active VÀ có học phí cần đóng
        // Nếu chưa đăng ký lớp (activeEnrollment = undefined) hoặc học phí = 0 (có thể là lớp free hoặc chưa set giá),
        // ta cần xử lý hiển thị phù hợp hơn.
        return activeEnrollment && tuitionAmount > 0 ? (
          <Box display="flex" flexDirection="column" gap="xxs">
            <Text size="sm" weight="medium">{tuitionAmount.toLocaleString('vi-VN')} đ</Text>
            <PaymentStatusBadge status={paymentStatus} />
          </Box>
        ) : <Text size="sm" color="SECONDARY">-</Text>;
      }
    }
  ];

  return (
    <Box display="flex" flexDirection="column" gap="lg">
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Text as="h1" variant="heading-lg" weight="bold">Danh sách học viên</Text>
          <Text color="SECONDARY">Quản lý hồ sơ và thông tin học viên.</Text>
        </Box>
        <Button 
          variant="primary" 
          leftIcon={<Icon><Plus /></Icon>}
          onClick={() => navigate('/students/new')}
        >
          Thêm học viên
        </Button>
      </Box>

      {/* Filters */}
      <Box 
        display="flex" 
        gap="md" 
        alignItems="center" 
        flexWrap="wrap"
        p="md"
        bg="BACKGROUND_PAPER"
        borderRadius="md"
        border={`1px solid ${COLORS.NEUTRAL_BORDER}`}
      >
        <Box flex="1" minWidth="200px" display="flex" alignItems="center" gap="sm" bg="BACKGROUND_NEUTRAL" px="md" borderRadius="md">
          <Icon color="SECONDARY" size="sm"><Search /></Icon>
          <Input 
            placeholder="Tìm kiếm theo tên, email..." 
            value={searchKeyword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchKeyword(e.target.value)}
            style={{ border: 'none', background: 'transparent', padding: '8px 0' }}
          />
        </Box>
        
        <Box display="flex" gap="sm" alignItems="center">
          <Icon color="SECONDARY" size="sm"><Filter /></Icon>
          <Select
            value={selectedBranchId}
            onChange={(e) => setSelectedBranchId(e.target.value)}
            options={[
              { label: 'Tất cả chi nhánh', value: '' },
              ...branches.map(b => ({ label: b.name, value: b.id }))
            ]}
            sx={{ minWidth: '150px' }}
          />
        </Box>
      </Box>

      <DataTable
        data={students}
        columns={columns}
        keyExtractor={(item) => item.id}
        isLoading={isLoading && students.length === 0}
        emptyMessage="Không tìm thấy học viên nào."
        onRowClick={(student) => navigate(`/students/${student.id}`)}
        // DataTable hiện tại hỗ trợ pagination kiểu trang (1, 2, 3), 
        // nhưng logic của chúng ta là Load More. Ta sẽ dùng nút Load More riêng bên dưới.
        totalPages={0} 
      />

      {/* Load More Button */}
      {hasMore && (
        <Box display="flex" justifyContent="center" mt="md">
          <Button variant="outline" onClick={() => fetchStudents(true)} isLoading={isLoading}>
            Tải thêm học viên
          </Button>
        </Box>
      )}
    </Box>
  );
};
