/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { 
  DataTable
} from '@/04-frameworks-and-drivers/ui/web/00-design-system/02-organisms/data/DataTable';
import { type Column } from '@/04-frameworks-and-drivers/ui/web/00-design-system/02-organisms/data/DataTable/DataTable.types';
import { Box, Button } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms';
import { Badge } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms/Badge';
import { Icon } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms/Icon';
import { Tooltip } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms/Tooltip';
import { AlertTriangle, CheckCircle, XCircle, Clock } from 'lucide-react';
import { type AttendanceListItem } from '@/02-usecases/attendance/ports/output/ListAttendanceByClass.output';
import { COLORS } from '@/04-frameworks-and-drivers/ui/web/03-ui-shared/constants/tokens-constants';
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
        <div css={css`display: flex; align-items: center; gap: 8px;`}>
          <span css={css`font-weight: 500;`}>{item.studentName}</span>
          {item.isLowBalance && (
            <Tooltip content={`Sắp hết hạn! Còn lại ${item.remainingSessions} buổi.`}>
              <span css={css`
                display: inline-flex; 
                color: COLORS.WARNING;
                cursor: help;
              `}>
                <Icon size="sm"><AlertTriangle size={16} /></Icon>
              </span>
            </Tooltip>
          )}
        </div>
      )
    },
    {
      key: 'status',
      header: 'Trạng thái',
      render: (item) => getStatusBadge(item.status)
    },
    {
      key: 'checkInTime',
      header: 'Giờ vào/ra',
      render: (item) => item.checkInTime ? (
        <div css={css`font-size: 0.875rem;`}>
          <div>In: {item.checkInTime}</div>
          {item.checkOutTime && <div>Out: {item.checkOutTime}</div>}
        </div>
      ) : '-'
    },
    {
      key: 'remainingSessions',
      header: 'Số buổi còn lại',
      render: (item) => item.remainingSessions !== undefined ? (
        <span css={css`
          font-weight: ${item.isLowBalance ? 'bold' : 'normal'};
          color: ${item.isLowBalance ? COLORS.WARNING : 'inherit'};
        `}>
          {item.remainingSessions} buổi
        </span>
      ) : (
        <span css={css`color: #9ca3af; font-style: italic;`}>N/A</span>
      )
    },
    {
      key: 'notes',
      header: 'Ghi chú',
      render: (item) => item.notes || '-'
    },
    {
      key: 'actions',
      header: 'Thao tác',
      render: (item) => (
        <div css={css`display: flex; gap: 8px;`}>
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
        </div>
      )
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