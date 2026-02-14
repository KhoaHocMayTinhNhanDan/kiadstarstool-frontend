import { type ClassSession } from '@/01-entities/classes/ClassSession';

export interface GetClassDetailsOutput {
  id: string;
  name: string;
  code: string;
  branchId: string;
  status: string;
  maxStudents: number;
  currentStudents: number;
  startDate: Date;
  schedule: string; // Chuỗi hiển thị
  sessions: ClassSession[]; // Dữ liệu cấu trúc
  teacherName?: string;
}