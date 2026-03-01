/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Filter, Search, Mail, Phone, MoreHorizontal } from 'lucide-react';
import { Box, Text, Button, Icon, Input } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms';
import { COLORS, SPACING, RADIUS } from '@/04-frameworks-and-drivers/ui/web/01-ui-core/constants/tokens-constants';
import { AppContext } from '@/00-core/app-context';
import { Pagination } from '@/04-frameworks-and-drivers/ui/web/00-design-system/02-organisms/navigation/Pagination';
import { type StudentListItem } from '@/02-usecases/students/ports/output/ListStudentsByBranch.output';
import { PaymentStatusBadge } from './components/StudentSharedComponents';

export const StudentListPage = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState<StudentListItem[]>([]);
  const [branches, setBranches] = useState<any[]>([]);
  const [selectedBranchId, setSelectedBranchId] = useState<string>('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // 1. Fetch Branches
        const branchController = AppContext.getBranchController();
        const branchResult = await branchController.listBranches({});
        if (branchResult.isSuccess) {
          setBranches(branchResult.getValue());
        }

        // 2. Fetch Students
        const studentController = AppContext.getStudentsController();
        const result = await studentController.listStudentsByBranch({ branchId: selectedBranchId });
        
        if (result.isSuccess) {
          setStudents(result.getValue());
        }
      } catch (error) {
        console.error('Failed to fetch data', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedBranchId]);

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
    s.email.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  // Reset về trang 1 khi thay đổi bộ lọc
  useEffect(() => {
    setCurrentPage(1);
  }, [searchKeyword, selectedBranchId]);

  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

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
          <select 
            value={selectedBranchId}
            onChange={(e) => setSelectedBranchId(e.target.value)}
            style={{
              padding: SPACING.sm,
              borderRadius: RADIUS.sm,
              border: `1px solid ${COLORS.NEUTRAL_BORDER}`,
              outline: 'none',
              backgroundColor: 'white',
              minWidth: '150px'
            }}
          >
            <option value="">Tất cả chi nhánh</option>
            {branches.map(b => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select>
        </Box>
      </Box>

      {/* List */}
      <Box bg="BACKGROUND_PAPER" borderRadius="lg" border={`1px solid ${COLORS.NEUTRAL_BORDER}`} overflow="hidden">
        {/* Table Header */}
        <Box 
          display="grid" 
          px="md" 
          py="sm"
          bg="NEUTRAL_LIGHT"
          sx={{
            gridTemplateColumns: "2fr 2fr 1fr 1fr 1fr 50px",
            borderBottom: `1px solid ${COLORS.NEUTRAL_BORDER}`
          }}
        >
          <Text weight="semibold" size="sm">Học viên</Text>
          <Text weight="semibold" size="sm">Liên hệ</Text>
          <Text weight="semibold" size="sm">Trạng thái</Text>
          <Text weight="semibold" size="sm">Ngày tham gia</Text>
          <Text weight="semibold" size="sm">Học phí</Text>
          <Box />
        </Box>

        {/* Table Body */}
        {isLoading ? (
          <Box p="xl" textAlign="center"><Text color="SECONDARY">Đang tải...</Text></Box>
        ) : filteredStudents.length === 0 ? (
          <Box p="xl" textAlign="center"><Text color="SECONDARY">Không tìm thấy học viên nào.</Text></Box>
        ) : (
          paginatedStudents.map(student => {
            // Lấy thông tin học phí từ enrollment active đầu tiên (nếu có)
            const activeEnrollment = student.enrollments?.find(e => e.status === 'active');
            const paymentStatus = activeEnrollment?.paymentStatus || 'unknown';
            const tuitionAmount = activeEnrollment?.tuitionAmount || 0;

            return (
              <Box 
                key={student.id} 
                display="grid" 
                px="md" py="md"
                alignItems="center"
                onClick={() => navigate(`/students/${student.id}`)}
                sx={{
                  gridTemplateColumns: "2fr 2fr 1fr 1fr 1fr 50px",
                  borderBottom: `1px solid ${COLORS.NEUTRAL_BORDER}`,
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                  '&:hover': { backgroundColor: COLORS.NEUTRAL_LIGHT }
                }}
              >
                <Box>
                  <Text weight="medium">{student.name}</Text>
                  <Text size="xs" color="SECONDARY">{student.id}</Text>
                </Box>
                <Box display="flex" flexDirection="column" gap="xs">
                  <Box display="flex" alignItems="center" gap="xs"><Icon size="xs" color="SECONDARY"><Mail /></Icon><Text size="sm">{student.email}</Text></Box>
                  <Box display="flex" alignItems="center" gap="xs"><Icon size="xs" color="SECONDARY"><Phone /></Icon><Text size="sm">{student.phone}</Text></Box>
                </Box>
                <Text size="sm">{student.status}</Text>
                <Text size="sm">{new Date(student.joinedDate).toLocaleDateString('vi-VN')}</Text>
                <Box>
                  {activeEnrollment ? (
                    <Box display="flex" flexDirection="column" gap="xxs">
                      <Text size="sm" weight="medium">{tuitionAmount.toLocaleString('vi-VN')} đ</Text>
                      <PaymentStatusBadge status={paymentStatus} />
                    </Box>
                  ) : <Text size="sm" color="SECONDARY">-</Text>}
                </Box>
                <Box textAlign="right"><Button variant="ghost" size="sm"><Icon><MoreHorizontal /></Icon></Button></Box>
              </Box>
            );
          })
        )}
      </Box>

      {/* Pagination */}
      {!isLoading && filteredStudents.length > ITEMS_PER_PAGE && (
        <Box display="flex" justifyContent="center" mt="md">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredStudents.length / ITEMS_PER_PAGE)}
            onPageChange={setCurrentPage}
          />
        </Box>
      )}
    </Box>
  );
};
