/** @jsxImportSource @emotion/react */
import { useState, useMemo, useEffect } from 'react';
import { Box, Text, Icon, Select } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms';
import { COLORS } from '@/04-frameworks-and-drivers/ui/web/01-ui-core/constants/tokens-constants';
import { StatusBadge } from './StudentSharedComponents';
import { User, Filter } from 'lucide-react';
import { DataTable } from '@/04-frameworks-and-drivers/ui/web/00-design-system/02-organisms/data/DataTable/DataTable.organism';

interface AttendanceHistoryItem {
  classId: string;
  className: string;
  date: string;
  status: string;
  markedBy?: string; // Tên người thực hiện
  markedByAvatarUrl?: string;
  score?: number;
}

interface StudentAttendanceHistoryProps {
  history: AttendanceHistoryItem[];
}

// A simple Avatar component
const Avatar = ({ src, name }: { src?: string, name?: string }) => {
  if (src) {
    return (
      <img 
        src={src} 
        alt={name || 'avatar'} 
        style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover' }} 
      />
    );
  }
  // Fallback
  return (
    <Box 
      display="flex" 
      alignItems="center" 
      justifyContent="center" 
      width="24px" 
      height="24px" 
      borderRadius="50%" 
      bg="NEUTRAL_LIGHT" 
      color="SECONDARY"
    >
      <User size={14} />
    </Box>
  );
};

export const StudentAttendanceHistory = ({ history }: StudentAttendanceHistoryProps) => {
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  
  // State cho phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Số dòng mỗi trang

  // Lấy danh sách các năm có trong dữ liệu để hiển thị trong dropdown
  const availableYears = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const years = new Set([currentYear]);
    history.forEach(item => {
      years.add(new Date(item.date).getFullYear());
    });
    return Array.from(years).sort((a, b) => b - a);
  }, [history]);

  // Lọc dữ liệu theo tháng và năm đã chọn
  const filteredHistory = useMemo(() => {
    return history.filter(item => {
      const date = new Date(item.date);
      return (
        date.getMonth() + 1 === selectedMonth &&
        date.getFullYear() === selectedYear
      );
    });
  }, [history, selectedMonth, selectedYear]);

  // Tự động quay về trang 1 khi bộ lọc thay đổi
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedMonth, selectedYear]);

  // Logic phân trang
  const totalPages = Math.ceil(filteredHistory.length / itemsPerPage);
  const paginatedHistory = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredHistory.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredHistory, currentPage]);

  const columns = [
    {
      key: 'date',
      header: 'Ngày',
      render: (record: AttendanceHistoryItem) => (
        <Text size="sm">{new Date(record.date).toLocaleDateString('vi-VN')}</Text>
      )
    },
    {
      key: 'className',
      header: 'Lớp học',
      render: (record: AttendanceHistoryItem) => (
        <Text size="sm" weight="medium">{record.className}</Text>
      )
    },
    {
      key: 'status',
      header: 'Trạng thái',
      render: (record: AttendanceHistoryItem) => (
        <StatusBadge status={record.status} />
      )
    },
    {
      key: 'score',
      header: 'Điểm số',
      render: (record: AttendanceHistoryItem) => <Text size="sm">{record.score ?? '-'}</Text>
    },
    {
      key: 'markedBy',
      header: 'Người thực hiện',
      render: (record: AttendanceHistoryItem) => (
        <Box display="flex" alignItems="center" gap="sm">
          <Avatar src={record.markedByAvatarUrl} name={record.markedBy} />
          <Text size="sm" color="SECONDARY">{record.markedBy || '-'}</Text>
        </Box>
      )
    }
  ];

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb="md">
        <Text as="h2" variant="heading-lg" weight="bold">Lịch sử điểm danh</Text>
        
        {/* Bộ lọc Tháng/Năm */}
        <Box display="flex" gap="sm">
          <Box display="flex" alignItems="center" gap="xs" px="sm" py="xs" bg="BACKGROUND_PAPER" border={`1px solid ${COLORS.NEUTRAL_BORDER}`} borderRadius="md">
            <Icon size="xs" color="SECONDARY"><Filter /></Icon>
            <Select 
              value={selectedMonth} 
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
              options={Array.from({ length: 12 }, (_, i) => i + 1).map(m => ({ label: `Tháng ${m}`, value: m }))}
              sx={{ border: 'none', outline: 'none', background: 'transparent', fontSize: '14px' }}
            />
          </Box>

          <Box display="flex" alignItems="center" px="sm" py="xs" bg="BACKGROUND_PAPER" border={`1px solid ${COLORS.NEUTRAL_BORDER}`} borderRadius="md">
            <Select 
              value={selectedYear} 
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              options={availableYears.map(y => ({ label: `Năm ${y}`, value: y }))}
              sx={{ border: 'none', outline: 'none', background: 'transparent', fontSize: '14px' }}
            />
          </Box>
        </Box>
      </Box>
      
      <DataTable
        data={paginatedHistory}
        columns={columns}
        keyExtractor={(item) => item.classId + item.date}
        emptyMessage={`Không có dữ liệu trong tháng ${selectedMonth}/${selectedYear}.`}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </Box>
  );
};