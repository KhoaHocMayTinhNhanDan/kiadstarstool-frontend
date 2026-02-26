/** @jsxImportSource @emotion/react */
import { useState, useMemo, useEffect } from 'react';
import { Box, Text, Icon, Button } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms';
import { COLORS, SPACING, RADIUS } from '@/04-frameworks-and-drivers/ui/web/01-ui-core/constants/tokens-constants';
import { StatusBadge } from './StudentSharedComponents';
import { User, Filter, ChevronLeft, ChevronRight } from 'lucide-react';

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

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb="md">
        <Text as="h2" variant="heading-lg" weight="bold">Lịch sử điểm danh</Text>
        
        {/* Bộ lọc Tháng/Năm */}
        <Box display="flex" gap="sm">
          <Box display="flex" alignItems="center" gap="xs" px="sm" py="xs" bg="BACKGROUND_PAPER" border={`1px solid ${COLORS.NEUTRAL_BORDER}`} borderRadius="md">
            <Icon size="xs" color="SECONDARY"><Filter /></Icon>
            <select 
              value={selectedMonth} 
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
              style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: '14px' }}
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
                <option key={m} value={m}>Tháng {m}</option>
              ))}
            </select>
          </Box>

          <Box display="flex" alignItems="center" px="sm" py="xs" bg="BACKGROUND_PAPER" border={`1px solid ${COLORS.NEUTRAL_BORDER}`} borderRadius="md">
            <select 
              value={selectedYear} 
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: '14px' }}
            >
              {availableYears.map(y => (
                <option key={y} value={y}>Năm {y}</option>
              ))}
            </select>
          </Box>
        </Box>
      </Box>
      
      <Box bg="BACKGROUND_PAPER" borderRadius="md" border={`1px solid ${COLORS.NEUTRAL_BORDER}`} overflow="hidden">
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${COLORS.NEUTRAL_BORDER}`, backgroundColor: COLORS.NEUTRAL_LIGHT }}>
              <th style={{ padding: SPACING.md, textAlign: 'left' }}><Text weight="semibold" size="sm">Ngày</Text></th>
              <th style={{ padding: SPACING.md, textAlign: 'left' }}><Text weight="semibold" size="sm">Lớp học</Text></th>
              <th style={{ padding: SPACING.md, textAlign: 'left' }}><Text weight="semibold" size="sm">Trạng thái</Text></th>
              <th style={{ padding: SPACING.md, textAlign: 'left' }}><Text weight="semibold" size="sm">Điểm số</Text></th>
              <th style={{ padding: SPACING.md, textAlign: 'left' }}><Text weight="semibold" size="sm">Người thực hiện</Text></th>
            </tr>
          </thead>
          <tbody>
            {paginatedHistory.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: SPACING.xl, textAlign: 'center' }}>
                  <Text color="SECONDARY">Không có dữ liệu trong tháng {selectedMonth}/{selectedYear}.</Text>
                </td>
              </tr>
            ) : (
              paginatedHistory.map((record, index) => (
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
                  <td style={{ padding: SPACING.md }}>
                    <Box display="flex" alignItems="center" gap="sm">
                      <Avatar src={record.markedByAvatarUrl} name={record.markedBy} />
                      <Text size="sm" color="SECONDARY">{record.markedBy || '-'}</Text>
                    </Box>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </Box>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <Box display="flex" justifyContent="flex-end" alignItems="center" mt="md" gap="sm">
          <Text size="sm" color="SECONDARY">
            Trang {currentPage} / {totalPages}
          </Text>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handlePrevPage} 
            disabled={currentPage === 1}
            leftIcon={<Icon><ChevronLeft /></Icon>}
          >
            Trước
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleNextPage} 
            disabled={currentPage === totalPages}
            rightIcon={<Icon><ChevronRight /></Icon>}
          >
            Sau
          </Button>
        </Box>
      )}
    </Box>
  );
};