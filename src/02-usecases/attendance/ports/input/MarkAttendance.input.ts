import { type AttendanceStatus } from '@/shared/constants/classes.constant';

export interface MarkAttendanceInput {
  classId: string;
  studentId: string;
  date: string; // YYYY-MM-DD
  status: AttendanceStatus;
  note?: string;
}