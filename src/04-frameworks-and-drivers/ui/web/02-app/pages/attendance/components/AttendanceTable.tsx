/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { 
  DataTable
} from '@/04-frameworks-and-drivers/ui/web/00-design-system/02-organisms/data/DataTable';
import { type Column } from '@/04-frameworks-and-drivers/ui/web/00-design-system/02-organisms/data/DataTable/DataTable.types';
import { Box } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms/Box';
import { Badge } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms/Badge';
import { Icon } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms/Icon';
import { Tooltip } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms/Tooltip';
import { AlertTriangle, CheckCircle, XCircle, Clock } from 'lucide-react';
import { type AttendanceListItem } from '@/02-usecases/attendance/ports/output/ListAttendanceByClass.output';
import { COLORS } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms/00-core/tokens-constants';
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
        <div css={css`display: flex; gap: 4px;`}>
          <button onClick={() => onMarkAttendance(item.studentId, ATTENDANCE_STATUS.PRESENT)} title="Có mặt">
            <Icon size="sm" color="success"><CheckCircle /></Icon>
          </button>
          <button onClick={() => onMarkAttendance(item.studentId, ATTENDANCE_STATUS.ABSENT)} title="Vắng">
            <Icon size="sm" color="danger"><XCircle /></Icon>
          </button>
          <button onClick={() => onMarkAttendance(item.studentId, ATTENDANCE_STATUS.LATE)} title="Muộn">
            <Icon size="sm" color="warning"><Clock /></Icon>
          </button>
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