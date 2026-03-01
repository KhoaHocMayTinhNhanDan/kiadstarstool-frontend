import { type AttendanceStatus } from '@/shared/constants/classes.constant';

export interface MarkBatchAttendanceInput {
  classId: string;
  date: string;
  studentIds: string[];
  status: AttendanceStatus;
  performedBy: string; // ID của người thực hiện
}