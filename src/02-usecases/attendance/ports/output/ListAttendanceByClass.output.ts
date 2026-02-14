import { type AttendanceStatus } from '@/shared/constants/classes.constant';

export interface AttendanceListItem {
  id: string;
  studentId: string;
  studentName: string; // Tên học viên (đã được map)
  status: AttendanceStatus | 'not_marked';
  checkInTime?: string;
  checkOutTime?: string;
  score: number;
  notes?: string;
}

export type ListAttendanceByClassOutput = AttendanceListItem[];