/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';
import { 
  Plus, 
  Filter, 
  BookOpen, 
  Users, 
  Clock, 
  Building
} from 'lucide-react';
import { Box, Text, Button, Icon, Input } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms';
import { COLORS, SPACING, RADIUS, SHADOWS } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms/00-core/tokens-constants';
import { AppContext } from '@/00-core/app-context';

// Định nghĩa kiểu dữ liệu cho một lớp học và chi nhánh trong danh sách
interface ClassListItem {
  id: string;
  name: string;
  students: number;
  schedule: string;
  branchName: string;
  teacherName: string;
}

type BranchListItem = { id: string; name: string };

export const ClassesListPage = () => {
  const navigate = useNavigate();
  const [classes, setClasses] = useState<ClassListItem[]>([]);
  const [branches, setBranches] = useState<BranchListItem[]>([]);
  const [selectedBranchId, setSelectedBranchId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState('');

  // 1. Fetch Branches để làm bộ lọc
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const controller = AppContext.getBranchController();
        const result = await controller.listBranches({});
        if (result.isSuccess) {
          setBranches(result.getValue());
        }
      } catch (error) {
        console.error('Failed to fetch branches', error);
      }
    };
    fetchBranches();
  }, []);

  // 2. Fetch Classes
  useEffect(() => {
    const fetchClasses = async () => {
      setIsLoading(true);
      try {
        const controller = AppContext.getClassesController();
        // Truyền trực tiếp branchId (string) thay vì một object
        const result = await controller.listClassesByBranch(selectedBranchId);
        
        if (result.isSuccess) {
          const data = result.getValue();
          // Map Entity -> View Model
          const mappedData = data.map((c: any) => ({
            id: String(c.id),
            name: c.name,
            students: c.currentStudents || 0,
            schedule: c.schedule || 'Chưa có lịch',
            branchName: branches.find(b => String(b.id) === String(c.branchId))?.name || 'Unknown Branch',
            teacherName: c.teacherName || 'Chưa phân công'
          }));
          setClasses(mappedData);
        } else {
           // Fallback mock data nếu API chưa trả về dữ liệu hoặc lỗi
           setClasses(MOCK_CLASSES);
        }
      } catch (error) {
        console.error('Failed to fetch classes', error);
        setClasses(MOCK_CLASSES);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClasses();
  }, [selectedBranchId, branches]);

  // Client-side filtering
  const filteredClasses = classes.filter(c => 
    c.name.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <Box display="flex" flexDirection="column" gap="lg">
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Text as="h1" variant="heading-lg" weight="bold">Danh sách lớp học</Text>
          <Text color="SECONDARY">Quản lý các lớp học và lịch giảng dạy.</Text>
        </Box>
        <Button 
          variant="primary" 
          leftIcon={<Icon><Plus /></Icon>}
          onClick={() => navigate('/classes/new')}
        >
          Tạo lớp mới
        </Button>
      </Box>

      {/* Filters Bar */}
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
        <Box flex="1" minWidth="200px">
          <Input 
            placeholder="Tìm kiếm lớp học..." 
            value={searchKeyword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchKeyword(e.target.value)}
          />
        </Box>
        
        <Box display="flex" gap="sm" alignItems="center">
          <Icon color="SECONDARY" size="sm"><Filter /></Icon>
          <Text size="sm" weight="medium">Chi nhánh:</Text>
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

      {/* Grid List */}
      <Box 
        css={css`
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: ${SPACING.md};
        `}
      >
        {filteredClasses.map(cls => (
          <ClassCard key={cls.id} data={cls} onClick={() => navigate(`/classes/${cls.id}`)} />
        ))}
        
        {!isLoading && filteredClasses.length === 0 && (
          <Box gridColumn="1/-1" p="xl" display="flex" justifyContent="center">
            <Text color="SECONDARY">Không tìm thấy lớp học nào phù hợp.</Text>
          </Box>
        )}
      </Box>
    </Box>
  );
};

// Helper Component: Class Card
const ClassCard = ({ data, onClick }: { data: ClassListItem, onClick: () => void }) => {
  return (
    <Box 
      p="md" 
      bg="BACKGROUND_PAPER"
      border={`1px solid ${COLORS.NEUTRAL_BORDER}`}
      borderRadius="md"
      onClick={onClick}
      css={css`
        cursor: pointer;
        transition: all 0.2s;
        &:hover {
          border-color: ${COLORS.PRIMARY};
          box-shadow: ${SHADOWS.md};
          transform: translateY(-2px);
        }
      `}
    >
      <Box display="flex" justifyContent="space-between" mb="sm">
        <Box display="flex" gap="sm" alignItems="center">
          <Box p="xs" bg="PRIMARY_LIGHT" borderRadius="sm" color="PRIMARY" display="flex">
            <Icon size="sm"><BookOpen /></Icon>
          </Box>
          <Text weight="bold" size="md">{data.name}</Text>
        </Box>
        <Box px="sm" py="xxs" borderRadius="full" bg="SUCCESS_LIGHT">
          <Text size="xs" weight="bold" color="SUCCESS">Đang học</Text>
        </Box>
      </Box>

      <Box display="flex" flexDirection="column" gap="xs" mb="md">
        <InfoRow icon={<Users />} text={`${data.students || 0} Học viên`} />
        <InfoRow icon={<Clock />} text={data.schedule || 'Chưa có lịch'} />
        <InfoRow icon={<Building />} text={data.branchName || 'Chi nhánh chính'} />
      </Box>

      <Box pt="sm" borderTop={`1px solid ${COLORS.NEUTRAL_BORDER}`} display="flex" justifyContent="space-between" alignItems="center">
        <Text size="sm" color="SECONDARY">GV: {data.teacherName || 'Chưa phân công'}</Text>
        <Button size="sm" variant="ghost">Chi tiết</Button>
      </Box>
    </Box>
  );
};

const InfoRow = ({ icon, text }: { icon: React.ReactNode, text: string }) => (
  <Box display="flex" gap="xs" alignItems="center">
    <Icon size="xs" color="SECONDARY">{icon}</Icon>
    <Text size="sm" color="SECONDARY">{text}</Text>
  </Box>
);

// Mock Data for fallback
const MOCK_CLASSES = [
  { id: 'mock-class-1', name: 'Tiếng Anh Giao Tiếp K12', students: 12, schedule: 'T2-T4-T6 (18:00-19:30)', branchName: 'Cơ sở A', teacherName: 'Nguyễn Văn A' },
  { id: 'mock-class-2', name: 'IELTS Intensive 6.5+', students: 8, schedule: 'T3-T5-T7 (19:30-21:00)', branchName: 'Cơ sở B', teacherName: 'Trần Thị B' },
  { id: 'mock-class-3', name: 'Tiếng Anh Thiếu Nhi - Starters', students: 15, schedule: 'T7-CN (08:00-10:00)', branchName: 'Cơ sở A', teacherName: 'Lê Văn C' },
];