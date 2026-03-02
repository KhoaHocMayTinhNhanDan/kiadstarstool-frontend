/** @jsxImportSource @emotion/react */
import { 
  DataTable
} from '@/04-frameworks-and-drivers/ui/web/00-design-system/02-organisms/data/DataTable';
import { type Column } from '@/04-frameworks-and-drivers/ui/web/00-design-system/02-organisms/data/DataTable/DataTable.types';
import { Box, Button, Text } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms';
import { Badge } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms/Badge';
import { Icon } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms/Icon';
import { Tooltip } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms/Tooltip';
import { AlertTriangle, CheckCircle, XCircle, Clock } from 'lucide-react';
import { type AttendanceListItem } from '@/02-usecases/attendance/ports/output/ListAttendanceByClass.output';
import { COLORS } from '@/04-frameworks-and-drivers/ui/web/01-ui-core/constants/tokens-constants';
import { ATTENDANCE_STATUS } from '@/shared/constants/classes.constant';

interface AttendanceTableProps {
  data: AttendanceListItem[];
  onMarkAttendance: (studentId: string, status: string) => void;
  isLoading?: boolean;
}

export const AttendanceTable = ({ data, onMarkAttendance, isLoading }: AttendanceTableProps) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case ATTENDANCE_STATUS.PRESENT:
        return <Badge color="success">Có mặt</Badge>;
      case ATTENDANCE_STATUS.ABSENT:
        return <Badge color="danger">Vắng</Badge>;
      case ATTENDANCE_STATUS.LATE:
        return <Badge color="warning">Muộn</Badge>;
      case ATTENDANCE_STATUS.EXCUSED:
        return <Badge color="info">Có phép</Badge>;
      default:
        return <Badge color="neutral">Chưa điểm danh</Badge>;
    }
  };

  const columns: Column<AttendanceListItem>[] = [
    {
      key: 'studentName',
      header: 'Học viên',
      render: (item) => (
        <Box display="flex" alignItems="center" gap="xs">
          <Text weight="medium">{item.studentName}</Text>
          {item.isLowBalance && (
            <Tooltip content={`Sắp hết hạn! Còn lại ${item.remainingSessions} buổi.`}>
              <Box as="span" color="WARNING" css={{ display: 'inline-flex', cursor: 'help' }}>
                <Icon size="sm"><AlertTriangle size={16} /></Icon>
              </Box>
            </Tooltip>
          )}
        </Box>
      )
    },
    {
      key: 'status',
      header: 'Trạng thái',
      render: (item) => getStatusBadge(item.status)
    },
    {
      key: 'actions',
      header: 'Thao tác',
      render: (item) => (
        <Box display="flex" gap="xs">
          <Button 
            size="sm" 
            variant={item.status === ATTENDANCE_STATUS.PRESENT ? 'primary' : 'ghost'}
            onClick={() => onMarkAttendance(item.studentId, ATTENDANCE_STATUS.PRESENT)} 
            title="Có mặt"
            sx={{ padding: '4px 8px', minWidth: 'auto' }}
          >
            <Icon size="sm" color={item.status === ATTENDANCE_STATUS.PRESENT ? 'white' : 'SUCCESS'}><CheckCircle /></Icon>
          </Button>
          <Button 
            size="sm" 
            variant={item.status === ATTENDANCE_STATUS.ABSENT ? 'danger' : 'ghost'}
            onClick={() => onMarkAttendance(item.studentId, ATTENDANCE_STATUS.ABSENT)} 
            title="Vắng"
            sx={{ padding: '4px 8px', minWidth: 'auto' }}
          >
            <Icon size="sm" color={item.status === ATTENDANCE_STATUS.ABSENT ? 'white' : 'DANGER'}><XCircle /></Icon>
          </Button>
          <Button 
            size="sm" 
            variant={item.status === ATTENDANCE_STATUS.LATE ? 'outline' : 'ghost'}
            onClick={() => onMarkAttendance(item.studentId, ATTENDANCE_STATUS.LATE)} 
            title="Muộn"
            sx={{ padding: '4px 8px', minWidth: 'auto', borderColor: item.status === ATTENDANCE_STATUS.LATE ? COLORS.WARNING : 'transparent' }}
          >
            <Icon size="sm" color={item.status === ATTENDANCE_STATUS.LATE ? 'WARNING' : 'WARNING'}><Clock /></Icon>
          </Button>
        </Box>
      )
    },
    {
      key: 'checkInTime',
      header: 'Giờ vào/ra',
      render: (item) => item.checkInTime ? (
        <Box>
          <Text size="sm">In: {item.checkInTime}</Text>
          {item.checkOutTime && <Text size="sm">Out: {item.checkOutTime}</Text>}
        </Box>
      ) : <Text>-</Text>
    },
    {
      key: 'remainingSessions',
      header: 'Số buổi còn lại',
      render: (item) => item.remainingSessions !== undefined ? (
        <Text
          weight={item.isLowBalance ? 'bold' : 'normal'}
          color={item.isLowBalance ? 'WARNING' : undefined}
        >
          {item.remainingSessions} buổi
        </Text>
      ) : (
        <Text color="SECONDARY" sx={{ fontStyle: 'italic' }}>N/A</Text>
      )
    },
    {
      key: 'notes',
      header: 'Ghi chú',
      render: (item) => <Text>{item.notes || '-'}</Text>
    }
  ];

  return (
    <DataTable
      data={data}
      columns={columns}
      isLoading={isLoading}
      keyExtractor={(item) => item.id}
      emptyMessage="Chưa có dữ liệu điểm danh"
    />
  );
};